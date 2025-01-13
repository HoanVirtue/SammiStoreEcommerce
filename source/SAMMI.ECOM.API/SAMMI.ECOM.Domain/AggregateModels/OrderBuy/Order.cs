using SAMMI.ECOM.Domain.AggregateModels.EventVoucher;
using SAMMI.ECOM.Domain.AggregateModels.Others;
using SAMMI.ECOM.Domain.Seeds;

namespace SAMMI.ECOM.Domain.AggregateModels.OrderBuy;

public partial class Order : Entity
{
    public int CustomerId { get; set; }

    public string? PaymentStatus { get; set; }

    public string? OrderStatus { get; set; }

    public string? ShippingStatus { get; set; }

    public int? DiscountId { get; set; }

    public string? CustomerAddress { get; set; }



    public virtual User Customer { get; set; } = null!;

    public virtual Discount? Discount { get; set; }

    public virtual ICollection<Notification> Notifications { get; set; } = new List<Notification>();

    public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();

    public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();

    public virtual ICollection<ShippingInfo> ShippingInfos { get; set; } = new List<ShippingInfo>();
}
