using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SAMMI.ECOM.Domain.AggregateModels;
using SAMMI.ECOM.Domain.DomainModels.CategoryAddress;
using SAMMI.ECOM.Repository.GenericRepositories;

namespace SAMMI.ECOM.Infrastructure.Repositories.AddressCategory
{
    public interface ICustomerAddressRepository : ICrudRepository<CustomerAddress>
    {
        Task<CustomerAddressDTO> GetDefaultByUserId(int userId);
    }
    public class CustomerAddressRepository : CrudRepository<CustomerAddress>, ICustomerAddressRepository, IDisposable
    {
        private readonly SammiEcommerceContext _context;
        private bool _disposed;
        private readonly IMapper _mapper;
        public CustomerAddressRepository(
            SammiEcommerceContext context,
            IMapper mapper
            ) : base(context)
        {
            _context = context;
            _mapper = mapper;
        }

        public void Dispose()
        {
            _disposed = true;
        }

        public async Task<CustomerAddressDTO> GetDefaultByUserId(int userId)
        {
            var addressDefault = await DbSet.SingleOrDefaultAsync(x => x.CustomerId == userId && x.IsDefault == true && x.IsDeleted != true);
            if (addressDefault == null)
            {
                addressDefault = await DbSet.SingleOrDefaultAsync(x => x.CustomerId == userId && x.IsDeleted != true);
            }
            return _mapper.Map<CustomerAddressDTO>(addressDefault);
        }
    }
}
