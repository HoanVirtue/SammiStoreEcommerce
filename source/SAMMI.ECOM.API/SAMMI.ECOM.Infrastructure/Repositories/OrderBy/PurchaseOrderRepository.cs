using SAMMI.ECOM.Core.Authorizations;
using SAMMI.ECOM.Core.Models;
using SAMMI.ECOM.Domain.AggregateModels.PurcharseOrder;
using SAMMI.ECOM.Domain.Enums;
using SAMMI.ECOM.Repository.GenericRepositories;

namespace SAMMI.ECOM.Infrastructure.Repositories.OrderBy
{
    public interface IPurchaseOrderRepository : ICrudRepository<PurchaseOrder>
    {
        Task<ActionResponse> UpdateStatus(int id, PurchaseOrderStatus status);
    }
    public class PurchaseOrderRepository : CrudRepository<PurchaseOrder>, IPurchaseOrderRepository, IDisposable
    {
        private readonly SammiEcommerceContext _context;
        private bool _disposed;
        public PurchaseOrderRepository(
            SammiEcommerceContext context,
            UserIdentity currentUser) : base(context)
        {
            _context = context;
            UserIdentity = currentUser;
        }

        public void Dispose()
        {
            _disposed = true;
        }

        private bool IsValidStatusTransaction(PurchaseOrderStatus currentStatus, PurchaseOrderStatus newStatus)
        {
            switch (currentStatus)
            {
                case PurchaseOrderStatus.Draft:
                    return newStatus == PurchaseOrderStatus.PendingApproval || newStatus == PurchaseOrderStatus.Canceled;
                case PurchaseOrderStatus.PendingApproval:
                    return newStatus == PurchaseOrderStatus.Approved || newStatus == PurchaseOrderStatus.Canceled;
                case PurchaseOrderStatus.Approved:
                    return newStatus == PurchaseOrderStatus.Processing || newStatus == PurchaseOrderStatus.Canceled;
                case PurchaseOrderStatus.Processing:
                    return newStatus == PurchaseOrderStatus.Completed || newStatus == PurchaseOrderStatus.Canceled;
                case PurchaseOrderStatus.Completed:
                    return false;
                case PurchaseOrderStatus.Canceled:
                    return false;
                default:
                    return false;
            }
        }

        public async Task<ActionResponse> UpdateStatus(int id, PurchaseOrderStatus status)
        {
            var actRes = new ActionResponse();
            var purchase = await GetByIdAsync(id);
            if (Enum.TryParse<PurchaseOrderStatus>(purchase.Status, true, out PurchaseOrderStatus currentStatus)
                && IsValidStatusTransaction(currentStatus, status))
            {
                purchase.Status = status.ToString();
                purchase.UpdatedBy = UserIdentity.UserName;
                purchase.UpdatedDate = DateTime.Now;
                actRes.Combine(await UpdateAndSave(purchase));
            }
            else
            {
                actRes.AddError("Trạng thái cập nhật không hợp lệ.");
            }
            return actRes;
        }
    }
}
