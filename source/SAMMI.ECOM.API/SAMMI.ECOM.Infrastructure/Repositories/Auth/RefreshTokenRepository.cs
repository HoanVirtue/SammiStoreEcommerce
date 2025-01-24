using SAMMI.ECOM.Domain.AggregateModels.System;
using SAMMI.ECOM.Repository.GenericRepositories;

namespace SAMMI.ECOM.Infrastructure.Repositories.Auth
{
    public interface IRefreshTokenRepository : ICrudRepository<RefreshToken>
    {
    }
    public class RefreshTokenRepository : CrudRepository<RefreshToken>, IRefreshTokenRepository, IDisposable
    {
        private readonly SammiEcommerceContext _context;
        private bool _disposed;
        public RefreshTokenRepository(SammiEcommerceContext context) : base(context)
        {
            _context = context;
        }

        public void Dispose()
        {
            _disposed = true;
        }
    }
}
