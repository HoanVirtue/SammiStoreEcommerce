using SAMMI.ECOM.Domain.Seeds;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SAMMI.ECOM.Domain.AggregateModels.OrderBuy;
[Table("ShippingInfo")]
public partial class ShippingInfo : Entity
{
    [ForeignKey("Order")]
    public int OrderId { get; set; }

    [ForeignKey("ShippingCompany")]
    public int ShippingCompanyId { get; set; }

    [Column("ShippingMethod")]
    [MaxLength(100)]
    public string? ShippingMethod { get; set; }

    [Column("Cost")]
    public decimal? Cost { get; set; }

    [Column("TrackingNumber")]
    [MaxLength(100)]
    public string? TrackingNumber { get; set; }

    [Column("ShippingStatus")]
    [MaxLength(50)]
    public string? ShippingStatus { get; set; }

    [Column("EstimatedDeliveryDate")]
    public DateTime? EstimatedDeliveryDate { get; set; }

    [Column("ActualDeliveryDate")]
    public DateTime? ActualDeliveryDate { get; set; }

    public virtual Order Order { get; set; } = null!;

    public virtual ShippingCompany ShippingCompany { get; set; } = null!;
}