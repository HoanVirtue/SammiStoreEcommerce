using SAMMI.ECOM.Domain.AggregateModels.OrderBuy;
using SAMMI.ECOM.Repository.GenericRepositories;

namespace SAMMI.ECOM.Infrastructure.Repositories.OrderBy
{
    public interface IOrderRepository : ICrudRepository<Order>
    {
    }
    public class OrderRepository : CrudRepository<Order>, IOrderRepository, IDisposable
    {
        private readonly SammiEcommerceContext _context;
        private bool _disposed;
        public OrderRepository(SammiEcommerceContext context) : base(context)
        {
            _context = context;
        }

        public void Dispose()
        {
            _disposed = true;
        }
    }
}
