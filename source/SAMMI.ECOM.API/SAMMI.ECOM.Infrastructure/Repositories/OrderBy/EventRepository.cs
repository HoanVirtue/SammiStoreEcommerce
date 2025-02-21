using SAMMI.ECOM.Domain.AggregateModels.EventVoucher;
using SAMMI.ECOM.Repository.GenericRepositories;

namespace SAMMI.ECOM.Infrastructure.Repositories.OrderBy
{
    public interface IEventRepository : ICrudRepository<Event>
    {
    }
    public class EventRepository : CrudRepository<Event>, IEventRepository, IDisposable
    {
        private readonly SammiEcommerceContext _context;
        private bool _disposed;
        public EventRepository(SammiEcommerceContext context) : base(context)
        {
            _context = context;
        }

        public void Dispose()
        {
            _disposed = true;
        }
    }
}
