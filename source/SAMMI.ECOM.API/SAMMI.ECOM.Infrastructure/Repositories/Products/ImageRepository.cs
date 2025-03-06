using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SAMMI.ECOM.Domain.AggregateModels.Products;
using SAMMI.ECOM.Domain.DomainModels.Products;
using SAMMI.ECOM.Repository.GenericRepositories;

namespace SAMMI.ECOM.Infrastructure.Repositories.Products
{
    public interface IImageRepository : ICrudRepository<Image>
    {
        Task<List<ImageDTO>> GetDataByProductId(int productId);
    }

    public class ImageRepository : CrudRepository<Image>, IImageRepository, IDisposable
    {
        private readonly SammiEcommerceContext _context;
        private readonly IMapper _mapper;
        private bool _disposed;
        public ImageRepository(SammiEcommerceContext context,
            IMapper mapper) : base(context)
        {
            _context = context;
            _mapper = mapper;
        }

        public void Dispose()
        {
            _disposed = true;
        }

        public async Task<List<ImageDTO>> GetDataByProductId(int productId)
        {
            var result = from img in _context.Images
                         join pi in _context.ProductImages on img.Id equals pi.ImageId
                         where pi.ProductId == productId
                         && img.IsDeleted != true
                         && pi.IsDeleted != true
                         select img;
            var images = await result.ToListAsync();
            return _mapper.Map<List<ImageDTO>>(images);
        }
    }
}
