using SAMMI.ECOM.Domain.AggregateModels.EventVoucher;
using SAMMI.ECOM.Repository.GenericRepositories;

namespace SAMMI.ECOM.Infrastructure.Repositories.OrderBy
{
    public interface IVoucherRepository : ICrudRepository<Voucher>
    {
    }
    public class VoucherRepository : CrudRepository<Voucher>, IVoucherRepository, IDisposable
    {
        private readonly SammiEcommerceContext _context;
        private bool _disposed;
        public VoucherRepository(SammiEcommerceContext context) : base(context)
        {
            _context = context;
        }

        public void Dispose()
        {
            _disposed = true;
        }
    }
}
