using SAMMI.ECOM.Domain.AggregateModels.Others;
using SAMMI.ECOM.Repository.GenericRepositories;

namespace SAMMI.ECOM.Infrastructure.Repositories
{
    public interface IUsersRepository : ICrudRepository<User>
    {

    }
    public class UsersRepository : CrudRepository<User>, IUsersRepository, IDisposable
    {
        private readonly SammiEcommerceContext _context;
        private bool _disposed;
        public UsersRepository(SammiEcommerceContext context) : base(context)
        {
            _context = context;
        }

        public void Dispose()
        {
            _disposed = true;
        }
    }
}
