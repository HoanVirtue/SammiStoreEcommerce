using Microsoft.EntityFrameworkCore;
using SAMMI.ECOM.Domain.AggregateModels.Products;
using SAMMI.ECOM.Repository.GenericRepositories;

namespace SAMMI.ECOM.Infrastructure.Repositories.Products
{
    public interface IProductRepository : ICrudRepository<Product>
    {
        Task<bool> IsExistCode(string code, int? id = 0);
        Task<decimal> CalAmount(int productId, int quantity);
        Task<decimal> GetPrice(int productId);
    }

    public class ProductRepository : CrudRepository<Product>, IProductRepository, IDisposable
    {
        private readonly SammiEcommerceContext _context;
        private bool _disposed;
        public ProductRepository(SammiEcommerceContext context) : base(context)
        {
            _context = context;
        }

        public async Task<decimal> CalAmount(int productId, int quantity)
        {
            var product = await GetByIdAsync(productId);
            if (product == null)
                return 0;
            return quantity *
                (product.StartDate <= DateTime.Now && product.EndDate >= DateTime.Now
                    ? (decimal)(product.Price * (1 - product.Discount))
                    : product.Price);
        }

        public async Task<decimal> GetPrice(int productId)
        {
            var product = await GetByIdAsync(productId);
            if (product == null)
                return 0;
            return (product.StartDate <= DateTime.Now && product.EndDate >= DateTime.Now
                    ? (decimal)(product.Price * (1 - product.Discount))
                    : product.Price);
        }

        public void Dispose()
        {
            _disposed = true;
        }

        public async Task<bool> IsExistCode(string code, int? id = 0)
        {
            return await DbSet.AnyAsync(x => x.Code.ToLower() == code.ToLower() && x.Id != id && x.IsDeleted != true);
        }
    }
}
