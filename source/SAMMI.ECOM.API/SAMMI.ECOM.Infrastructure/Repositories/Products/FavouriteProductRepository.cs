using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SAMMI.ECOM.Domain.AggregateModels.Others;
using SAMMI.ECOM.Domain.AggregateModels.Products;
using SAMMI.ECOM.Domain.DomainModels.Products;
using SAMMI.ECOM.Repository.GenericRepositories;

namespace SAMMI.ECOM.Infrastructure.Repositories.Products
{
    public interface IFavouriteProductRepository : ICrudRepository<FavouriteProduct>
    {
        Task<FavouriteProductDTO> GetByCustomerAndProduct(int customerId, int productId);
    }

    public class FavouriteProductRepository : CrudRepository<FavouriteProduct>, IFavouriteProductRepository, IDisposable
    {
        private readonly SammiEcommerceContext _context;
        private bool _disposed;
        private readonly IMapper _mapper;
        public FavouriteProductRepository(SammiEcommerceContext context, IMapper mapper) : base(context)
        {
            _context = context;
            _mapper = mapper;
        }

        public void Dispose()
        {
            _disposed = true;
        }

        public async Task<FavouriteProductDTO> GetByCustomerAndProduct(int customerId, int productId)
        {
            return _mapper.Map<FavouriteProductDTO>(await DbSet.SingleOrDefaultAsync(x => x.CustomerId == customerId && x.ProductId == productId && x.IsDeleted != true));
        }
    }
}
