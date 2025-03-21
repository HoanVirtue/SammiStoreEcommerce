using Microsoft.EntityFrameworkCore;
using SAMMI.ECOM.Domain.AggregateModels.Products;
using SAMMI.ECOM.Repository.GenericRepositories;

namespace SAMMI.ECOM.Infrastructure.Repositories.Products
{
    public interface IProductCategoryRepository : ICrudRepository<ProductCategory>
    {
        Task<bool> IsExistCode(string code, int? id = 0);
        Task<bool> IsExistName(string name, int? id = 0);
    }

    public class ProductCategoryRepository : CrudRepository<ProductCategory>, IProductCategoryRepository, IDisposable
    {
        private readonly SammiEcommerceContext _context;
        private bool _disposed;
        public ProductCategoryRepository(SammiEcommerceContext context) : base(context)
        {
            _context = context;
        }

        public async Task<bool> IsExistCode(string code, int? id = 0)
        {
            return await _context.ProductCategories.AnyAsync(x => x.Code.ToLower() == code.ToLower() && x.Id != id && x.IsDeleted != true);
        }

        public async Task<bool> IsExistName(string name, int? id = 0)
        {
            return await _context.ProductCategories.AnyAsync(x => x.Name.ToLower() == name.ToLower() && x.Id != id && x.IsDeleted != true);
        }

        public void Dispose()
        {
            _disposed = true;
        }
    }
}
