using Microsoft.EntityFrameworkCore;
using SAMMI.ECOM.Domain.AggregateModels.OrderBuy;
using SAMMI.ECOM.Repository.GenericRepositories;

namespace SAMMI.ECOM.Infrastructure.Repositories.OrderBy
{
    public interface ICartDetailRepository : ICrudRepository<CartDetail>
    {
        Task<CartDetail> GetByCartIdAndProductId(int cartId, int productId);
    }
    public class CartDetailRepository : CrudRepository<CartDetail>, ICartDetailRepository, IDisposable
    {
        private readonly SammiEcommerceContext _context;
        private bool _disposed;
        public CartDetailRepository(SammiEcommerceContext context) : base(context)
        {
            _context = context;
        }

        public void Dispose()
        {
            _disposed = true;
        }

        public async Task<CartDetail> GetByCartIdAndProductId(int cartId, int productId)
        {
            return await _context.CartDetails.SingleOrDefaultAsync(x => x.CartId == cartId && x.ProductId == productId && x.IsDeleted != true);
        }
    }
}
