using SAMMI.ECOM.Domain.AggregateModels.OrderBuy;
using SAMMI.ECOM.Repository.GenericRepositories;

namespace SAMMI.ECOM.Infrastructure.Repositories.OrderBy
{
    public interface IOrderDetailRepository : ICrudRepository<OrderDetail>
    {
    }
    public class OrderDetailRepository : CrudRepository<OrderDetail>, IOrderDetailRepository, IDisposable
    {
        private readonly SammiEcommerceContext _context;
        private bool _disposed;
        public OrderDetailRepository(SammiEcommerceContext context) : base(context)
        {
            _context = context;
        }

        public void Dispose()
        {
            _disposed = true;
        }
    }
}
