using SAMMI.ECOM.Domain.AggregateModels.OrderBuy;
using SAMMI.ECOM.Repository.GenericRepositories;

namespace SAMMI.ECOM.Infrastructure.Repositories.OrderBy
{
    public interface IPaymentRepository : ICrudRepository<Payment>
    {
    }
    public class PaymentRepository : CrudRepository<Payment>, IPaymentRepository, IDisposable
    {
        private readonly SammiEcommerceContext _context;
        private bool _disposed;
        public PaymentRepository(SammiEcommerceContext context) : base(context)
        {
            _context = context;
        }

        public void Dispose()
        {
            _disposed = true;
        }
    }
}
