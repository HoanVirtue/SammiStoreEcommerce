using Microsoft.EntityFrameworkCore;
using SAMMI.ECOM.Core.Models;
using SAMMI.ECOM.Domain.AggregateModels.System;
using SAMMI.ECOM.Domain.Enums;
using SAMMI.ECOM.Repository.GenericRepositories;

namespace SAMMI.ECOM.Infrastructure.Repositories.Permission
{
    public interface IRoleRepository : ICrudRepository<Role>
    {
        Task<Role> FindByCode(string code);
    }
    public class RoleRepository : CrudRepository<Role>, IRoleRepository, IDisposable
    {
        private readonly SammiEcommerceContext _context;
        private bool _disposed;
        public RoleRepository(SammiEcommerceContext context) : base(context)
        {
            _context = context;
        }

        public void Dispose()
        {
            _disposed = true;
        }

        public async Task<Role> FindByCode(string code)
        {
            return await DbSet.SingleOrDefaultAsync(x => x.Code.ToLower() == code.ToLower() && x.IsDeleted != true);
        }
    }
}
