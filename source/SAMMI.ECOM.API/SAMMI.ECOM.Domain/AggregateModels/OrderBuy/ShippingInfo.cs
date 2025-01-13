using SAMMI.ECOM.Domain.Seeds;

namespace SAMMI.ECOM.Domain.AggregateModels.OrderBuy;

public partial class ShippingInfo : Entity
{
    public int OrderId { get; set; }

    public int ShippingCompanyId { get; set; }

    public string? ShippingMethod { get; set; }

    public decimal? Cost { get; set; }

    public string? TrackingNumber { get; set; }

    public string? ShippingStatus { get; set; }

    public DateTime? EstimatedDeliveryDate { get; set; }

    public DateTime? ActualDeliveryDate { get; set; }



    public virtual Order Order { get; set; } = null!;

    public virtual ShippingCompany ShippingCompany { get; set; } = null!;
}
