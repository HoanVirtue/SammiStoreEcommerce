using Microsoft.EntityFrameworkCore;
using SAMMI.ECOM.Domain.AggregateModels.AddressCategory;
using SAMMI.ECOM.Repository.GenericRepositories;

namespace SAMMI.ECOM.Infrastructure.Repositories.AddressCategory
{
    public interface IWardRepository : ICrudRepository<Ward>
    {
        Task<bool> CheckExistName(string name, int? id = 0);
    }
    public class WardRepository : CrudRepository<Ward>, IWardRepository, IDisposable
    {
        private readonly SammiEcommerceContext _context;
        private bool _disposed;
        public WardRepository(SammiEcommerceContext context) : base(context)
        {
            _context = context;
        }

        public async Task<bool> CheckExistName(string name, int? id = 0)
        {
            return await _context.Wards.AnyAsync(x => x.Name.ToLower() == name.ToLower() && x.Id != id && x.IsDeleted != true);
        }

        public void Dispose()
        {
            _disposed = true;
        }
    }
}
