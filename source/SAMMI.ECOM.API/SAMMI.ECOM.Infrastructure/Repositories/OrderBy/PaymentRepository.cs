using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SAMMI.ECOM.Core.Models;
using SAMMI.ECOM.Domain.AggregateModels.OrderBuy;
using SAMMI.ECOM.Domain.Enums;
using SAMMI.ECOM.Repository.GenericRepositories;

namespace SAMMI.ECOM.Infrastructure.Repositories.OrderBy
{
    public interface IPaymentRepository : ICrudRepository<Payment>
    {
        Task<Payment> GetByOrderCode(string orderCode);
        Task<ActionResponse<Payment>> UpdateStatus(int id, PaymentStatusEnum status);
        bool IsValidPaymentStatus(PaymentStatusEnum currentStatus, PaymentStatusEnum newStatus);
    }
    public class PaymentRepository : CrudRepository<Payment>, IPaymentRepository, IDisposable
    {
        private readonly SammiEcommerceContext _context;
        private bool _disposed;
        private IMapper _mapper;
        public PaymentRepository(SammiEcommerceContext context,
            IMapper mapper) : base(context)
        {
            _context = context;
            _mapper = mapper;
        }

        public void Dispose()
        {
            _disposed = true;
        }

        public Task<Payment> GetByOrderCode(string orderCode)
        {
            var paymentQuery = from p in DbSet
                               join o in _context.Orders on p.OrderId equals o.Id
                               where o.Code.ToLower() == orderCode.ToLower()
                               && p.IsDeleted != true
                               && o.IsDeleted != true
                               select p;
            return paymentQuery.FirstAsync();
        }

        private bool IsValidPaymentStatus(PaymentStatusEnum currentStatus, PaymentStatusEnum newStatus)
        {
            switch (currentStatus)
            {
                case PaymentStatusEnum.Pending:
                    return newStatus == PaymentStatusEnum.Unpaid || newStatus == PaymentStatusEnum.Failed || newStatus == PaymentStatusEnum.Paid;
                case PaymentStatusEnum.Unpaid:
                    return true;
                case PaymentStatusEnum.Paid:
                    return false;
                case PaymentStatusEnum.Failed:
                    return false;
                default:
                    return false;
            }
        }

        public async Task<ActionResponse<Payment>> UpdateStatus(int id, PaymentStatusEnum status)
        {
            var actRes = new ActionResponse<Payment>();
            var payment = await FindById(id);
            if (payment != null
                && Enum.TryParse<PaymentStatusEnum>(payment.PaymentStatus, true, out PaymentStatusEnum currentStatus)
                && IsValidPaymentStatus(currentStatus, status))
            {
                payment.PaymentStatus = status.ToString();
                payment.UpdatedDate = DateTime.Now;
                payment.UpdatedBy = "System";
                var paymentUpdate = await UpdateAndSave(payment);
                actRes.Combine(paymentUpdate);
                actRes.SetResult(paymentUpdate.Result);
            }
            else
            {
                actRes.AddError("Không tìm thấy thông tin thanh toán/trạng thái thanh toán không hợp lệ");
            }
            return actRes;
        }

        bool IPaymentRepository.IsValidPaymentStatus(PaymentStatusEnum currentStatus, PaymentStatusEnum newStatus)
        {
            return (currentStatus, newStatus) switch
            {
                (PaymentStatusEnum.Pending, PaymentStatusEnum.Unpaid) => true,
                (PaymentStatusEnum.Pending, PaymentStatusEnum.Failed) => true,
                (PaymentStatusEnum.Pending, PaymentStatusEnum.Paid) => true,
                (PaymentStatusEnum.Unpaid, PaymentStatusEnum.Unpaid) => true,
                (PaymentStatusEnum.Unpaid, PaymentStatusEnum.Paid) => true,
                (PaymentStatusEnum.Unpaid, PaymentStatusEnum.Failed) => true,
                (PaymentStatusEnum.Paid, PaymentStatusEnum.Paid) => true,
                (PaymentStatusEnum.Failed, _) => false,
                _ => false
            };
        }
    }
}
