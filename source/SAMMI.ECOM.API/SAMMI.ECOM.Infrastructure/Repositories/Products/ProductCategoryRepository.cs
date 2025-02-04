using SAMMI.ECOM.Domain.AggregateModels.Products;
using SAMMI.ECOM.Repository.GenericRepositories;

namespace SAMMI.ECOM.Infrastructure.Repositories.ProductCategorys
{
    public interface IProductCategoryRepository : ICrudRepository<ProductCategory>
    {
    }

    public class ProductCategoryRepository : CrudRepository<ProductCategory>, IProductCategoryRepository, IDisposable
    {
        private readonly SammiEcommerceContext _context;
        private bool _disposed;
        public ProductCategoryRepository(SammiEcommerceContext context) : base(context)
        {
            _context = context;
        }

        public void Dispose()
        {
            _disposed = true;
        }
    }
}
