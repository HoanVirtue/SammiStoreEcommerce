using SAMMI.ECOM.Domain.AggregateModels.PurcharseOrder;
using SAMMI.ECOM.Repository.GenericRepositories;

namespace SAMMI.ECOM.Infrastructure.Repositories.OrderBy
{
    public interface IPurchaseOrderDetailRepository : ICrudRepository<PurchaseOrderDetail>
    {
    }
    public class PurchaseOrderDetailRepository : CrudRepository<PurchaseOrderDetail>, IPurchaseOrderDetailRepository, IDisposable
    {
        private readonly SammiEcommerceContext _context;
        private bool _disposed;
        public PurchaseOrderDetailRepository(SammiEcommerceContext context) : base(context)
        {
            _context = context;
        }

        public void Dispose()
        {
            _disposed = true;
        }
    }
}
