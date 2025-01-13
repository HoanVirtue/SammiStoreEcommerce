using SAMMI.ECOM.Domain.Seeds;

namespace SAMMI.ECOM.Domain.AggregateModels.OrderBuy;

public partial class ShippingCompany : Entity
{
    public string Name { get; set; } = null!;

    public string? ContactInfo { get; set; }

    public string? Website { get; set; }



    public virtual ICollection<ShippingInfo> ShippingInfos { get; set; } = new List<ShippingInfo>();
}
