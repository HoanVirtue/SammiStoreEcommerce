using Microsoft.EntityFrameworkCore;
using SAMMI.ECOM.Domain.AggregateModels.EventVoucher;
using SAMMI.ECOM.Repository.GenericRepositories;

namespace SAMMI.ECOM.Infrastructure.Repositories.OrderBy
{
    public interface IVoucherRepository : ICrudRepository<Voucher>
    {
        Task<bool> CheckExistCode(string code, int? id = 0);
    }
    public class VoucherRepository : CrudRepository<Voucher>, IVoucherRepository, IDisposable
    {
        private readonly SammiEcommerceContext _context;
        private bool _disposed;
        public VoucherRepository(SammiEcommerceContext context) : base(context)
        {
            _context = context;
        }

        public async Task<bool> CheckExistCode(string code, int? id = 0)
        {
            return await _context.Vouchers.AnyAsync(x => x.Code.ToLower() == code.ToLower() && x.Id != id && x.IsDeleted != true);
        }
        public void Dispose()
        {
            _disposed = true;
        }
    }
}
