using SAMMI.ECOM.Domain.AggregateModels.EventVoucher;
using SAMMI.ECOM.Repository.GenericRepositories;

namespace SAMMI.ECOM.Infrastructure.Repositories.OrderBy
{
    public interface IVoucherConditionRepository : ICrudRepository<VoucherCondition>
    {
    }
    public class VoucherConditionRepository : CrudRepository<VoucherCondition>, IVoucherConditionRepository, IDisposable
    {
        private readonly SammiEcommerceContext _context;
        private bool _disposed;
        public VoucherConditionRepository(SammiEcommerceContext context) : base(context)
        {
            _context = context;
        }


        public void Dispose()
        {
            _disposed = true;
        }
    }
}
