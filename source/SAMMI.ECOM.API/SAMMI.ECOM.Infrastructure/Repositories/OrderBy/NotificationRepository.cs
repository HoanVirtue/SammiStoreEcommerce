using SAMMI.ECOM.Domain.AggregateModels.OrderBuy;
using SAMMI.ECOM.Repository.GenericRepositories;

namespace SAMMI.ECOM.Infrastructure.Repositories.OrderBy
{
    public interface INotificationRepository : ICrudRepository<Notification>
    {
    }
    public class NotificationRepository : CrudRepository<Notification>, INotificationRepository, IDisposable
    {
        private readonly SammiEcommerceContext _context;
        private bool _disposed;
        public NotificationRepository(SammiEcommerceContext context) : base(context)
        {
            _context = context;
        }

        public void Dispose()
        {
            _disposed = true;
        }
    }
}
