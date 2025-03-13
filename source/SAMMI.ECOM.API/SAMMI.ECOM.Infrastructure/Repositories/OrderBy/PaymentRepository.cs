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

        public async Task<ActionResponse<Payment>> UpdateStatus(int id, PaymentStatusEnum status)
        {
            var payment = await FindById(id);
            payment.PaymentStatus = status.ToString();
            payment.UpdatedDate = DateTime.Now;
            payment.UpdatedBy = "System";
            var paymentUpdate = await UpdateAndSave(payment);
            return paymentUpdate;
        }
    }
}
