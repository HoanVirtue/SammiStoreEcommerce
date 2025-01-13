using SAMMI.ECOM.Domain.AggregateModels.OrderBuy;
using SAMMI.ECOM.Domain.AggregateModels.Products;
using SAMMI.ECOM.Domain.Seeds;

namespace SAMMI.ECOM.Domain.AggregateModels.EventVoucher;

public partial class Discount : Entity
{
    public string Code { get; set; } = null!;

    public string Name { get; set; } = null!;

    public int? CategoryId { get; set; }

    public int? BrandId { get; set; }

    public int? ProductId { get; set; }

    public string DiscountType { get; set; } = null!;

    public decimal DiscountValue { get; set; }

    public int UsageLimit { get; set; }

    public int UsedCount { get; set; }

    public int? EventId { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }


    public virtual Brand? Brand { get; set; }

    public virtual ProductCategory? Category { get; set; }

    public virtual Event? Event { get; set; }

    public virtual ICollection<MyVoucher> MyVouchers { get; set; } = new List<MyVoucher>();

    public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual Product? Product { get; set; }
}
