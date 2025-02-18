using SAMMI.ECOM.Domain.AggregateModels.EventVoucher;
using SAMMI.ECOM.Domain.AggregateModels.Others;
using SAMMI.ECOM.Domain.Seeds;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SAMMI.ECOM.Domain.AggregateModels.OrderBuy;


[Table("Order")]
public partial class Order : Entity
{
    [Column("Code")]
    [MaxLength(256)]
    public string Code { get; set; } = null!;

    [ForeignKey("Customer")]
    public int CustomerId { get; set; }

    [Column("PaymentStatus")]
    [MaxLength(50)]
    public string? PaymentStatus { get; set; }

    [Column("OrderStatus")]
    [MaxLength(50)]
    public string? OrderStatus { get; set; }

    [Column("ShippingStatus")]
    [MaxLength(50)]
    public string? ShippingStatus { get; set; }

    [ForeignKey("Discount")]
    public int? DiscountId { get; set; }

    [Column("CustomerAddress")]
    [MaxLength(255)]
    public string? CustomerAddress { get; set; }

    public virtual User Customer { get; set; } = null!;

    public virtual Voucher? Discount { get; set; }

    public virtual ICollection<Notification> Notifications { get; set; } = new List<Notification>();

    public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();

    public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();

    public virtual ICollection<ShippingInfo> ShippingInfos { get; set; } = new List<ShippingInfo>();
}
