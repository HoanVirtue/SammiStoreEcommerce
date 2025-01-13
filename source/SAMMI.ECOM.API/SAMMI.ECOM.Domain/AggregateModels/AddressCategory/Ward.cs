using SAMMI.ECOM.Domain.AggregateModels.Others;
using SAMMI.ECOM.Domain.Seeds;

namespace SAMMI.ECOM.Domain.AggregateModels.AddressCategory;

public partial class Ward : Entity
{
    public string? Name { get; set; }

    public int? DistrictId { get; set; }



    public virtual ICollection<CustomerAddress> CustomerAddresses { get; set; } = new List<CustomerAddress>();

    public virtual District? District { get; set; }

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
