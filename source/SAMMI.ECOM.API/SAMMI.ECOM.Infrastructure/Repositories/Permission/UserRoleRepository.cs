using SAMMI.ECOM.Domain.AggregateModels.System;
using SAMMI.ECOM.Repository.GenericRepositories;

namespace SAMMI.ECOM.Infrastructure.Repositories.Permission
{
    public interface IUserRoleRepository : ICrudRepository<UserRole>
    {

    }
    public class UserRoleRepository : CrudRepository<UserRole>, IUserRoleRepository, IDisposable
    {
        private readonly SammiEcommerceContext _context;
        private bool _disposed;
        public UserRoleRepository(SammiEcommerceContext context) : base(context)
        {
            _context = context;
        }

        public void Dispose()
        {
            _disposed = true;
        }
    }
}
