using Microsoft.EntityFrameworkCore;
using SAMMI.ECOM.Domain.AggregateModels.Products;
using SAMMI.ECOM.Repository.GenericRepositories;

namespace SAMMI.ECOM.Infrastructure.Repositories.Products
{
    public interface IBrandRepository : ICrudRepository<Brand>
    {
        Task<bool> IsExistCode(string code, int? id = 0);
        Task<bool> IsExistName(string name, int? id = 0);
    }

    public class BrandRepository : CrudRepository<Brand>, IBrandRepository, IDisposable
    {
        private readonly SammiEcommerceContext _context;
        private bool _disposed;
        public BrandRepository(SammiEcommerceContext context) : base(context)
        {
            _context = context;
        }

        public void Dispose()
        {
            _disposed = true;
        }

        public async Task<bool> IsExistCode(string code, int? id = 0)
        {
            return await _context.Brands.AnyAsync(x => x.Code.ToLower() == code.ToLower() && x.Id != id && x.IsDeleted != true);
        }

        public async Task<bool> IsExistName(string name, int? id = 0)
        {
            return await _context.Brands.AnyAsync(x => x.Name.ToLower() == name.ToLower() && x.Id != id && x.IsDeleted != true);
        }
    }
}
