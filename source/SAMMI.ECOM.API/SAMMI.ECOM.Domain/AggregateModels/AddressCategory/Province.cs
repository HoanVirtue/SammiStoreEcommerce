using SAMMI.ECOM.Domain.Seeds;

namespace SAMMI.ECOM.Domain.AggregateModels.AddressCategory;

public partial class Province : Entity
{
    public string? Name { get; set; }

    public string? PostalCode { get; set; }

    public string? Country { get; set; }


    public virtual ICollection<District> Districts { get; set; } = new List<District>();
}
