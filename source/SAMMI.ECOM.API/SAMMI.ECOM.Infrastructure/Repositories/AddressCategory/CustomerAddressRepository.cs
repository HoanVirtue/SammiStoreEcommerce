using SAMMI.ECOM.Domain.AggregateModels;
using SAMMI.ECOM.Repository.GenericRepositories;

namespace SAMMI.ECOM.Infrastructure.Repositories.AddressCategory
{
    public interface ICustomerAddressRepository : ICrudRepository<CustomerAddress>
    {
    }
    public class CustomerAddressRepository : CrudRepository<CustomerAddress>, ICustomerAddressRepository, IDisposable
    {
        private readonly SammiEcommerceContext _context;
        private bool _disposed;
        public CustomerAddressRepository(SammiEcommerceContext context) : base(context)
        {
            _context = context;
        }

        public void Dispose()
        {
            _disposed = true;
        }
    }
}
