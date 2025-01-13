using SAMMI.ECOM.Domain.AggregateModels.AddressCategory;
using SAMMI.ECOM.Domain.AggregateModels.Others;
using SAMMI.ECOM.Domain.Seeds;

namespace SAMMI.ECOM.Domain.AggregateModels;

public partial class CustomerAddress : Entity
{
    public int? CustomerId { get; set; }

    public string? StreetAddress { get; set; }

    public int? WardId { get; set; }

    public bool? IsDefault { get; set; }


    public virtual User? Customer { get; set; }

    public virtual Ward? Ward { get; set; }
}
