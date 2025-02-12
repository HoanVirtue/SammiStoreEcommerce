using SAMMI.ECOM.Domain.AggregateModels.Products;
using SAMMI.ECOM.Repository.GenericRepositories;

namespace SAMMI.ECOM.Infrastructure.Repositories.ProductImages
{
    public interface IImageRepository : ICrudRepository<Image>
    {
    }

    public class ImageRepository : CrudRepository<Image>, IImageRepository, IDisposable
    {
        private readonly SammiEcommerceContext _context;
        private bool _disposed;
        public ImageRepository(SammiEcommerceContext context) : base(context)
        {
            _context = context;
        }

        public void Dispose()
        {
            _disposed = true;
        }
    }
}
