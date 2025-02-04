using SAMMI.ECOM.Domain.AggregateModels.Products;
using SAMMI.ECOM.Repository.GenericRepositories;

namespace SAMMI.ECOM.Infrastructure.Repositories.Brands
{
    public interface IBrandRepository : ICrudRepository<Brand>
    {
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
    }
}
