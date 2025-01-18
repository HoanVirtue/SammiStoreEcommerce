using SAMMI.ECOM.Domain.AggregateModels.OrderBuy;
using SAMMI.ECOM.Domain.AggregateModels.Products;
using SAMMI.ECOM.Domain.Seeds;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SAMMI.ECOM.Domain.AggregateModels.EventVoucher;

[Table("Discount")]
public partial class Discount : Entity
{
    [Column("Code")]
    [MaxLength(256)]
    public string Code { get; set; } = null!;

    [Column("Name")]
    [MaxLength(100)]
    public string Name { get; set; } = null!;

    [ForeignKey("Category")]
    public int? CategoryId { get; set; }

    [ForeignKey("Brand")]
    public int? BrandId { get; set; }

    [ForeignKey("Product")]
    public int? ProductId { get; set; }

    [ForeignKey("DiscountType")]
    public int DiscountTypeId { get; set; }

    [Column("DiscountValue")]
    public decimal DiscountValue { get; set; }

    [Column("UsageLimit")]
    public int UsageLimit { get; set; }

    [Column("UsedCount")]
    public int UsedCount { get; set; }

    [Column("EventId")]
    public int? EventId { get; set; }

    [Column("StartDate")]
    public DateTime StartDate { get; set; }

    [Column("EndDate")]
    public DateTime EndDate { get; set; }

    public virtual Brand? Brand { get; set; }

    public virtual ProductCategory? Category { get; set; }

    public virtual Event? Event { get; set; }

    public virtual ICollection<MyVoucher> MyVouchers { get; set; } = new List<MyVoucher>();

    public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual Product? Product { get; set; }

    public virtual DiscountType? DiscountType { get; set; }
}