using SAMMI.ECOM.Domain.AggregateModels.EventVoucher;
using SAMMI.ECOM.Domain.AggregateModels.OrderBuy;
using SAMMI.ECOM.Domain.AggregateModels.Others;
using SAMMI.ECOM.Domain.AggregateModels.PurcharseOrder;
using SAMMI.ECOM.Domain.Seeds;

namespace SAMMI.ECOM.Domain.AggregateModels.Products;

public partial class Product : Entity
{
    public string Code { get; set; } = null!;

    public string Name { get; set; } = null!;

    public int StockQuantity { get; set; }

    public decimal? OldPrice { get; set; }

    public decimal NewPrice { get; set; }

    public string? Ingredient { get; set; }

    public string? Uses { get; set; }

    public string? UsageGuide { get; set; }

    public int? BrandId { get; set; }
    public int? CategoryId { get; set; }





    public virtual Brand? Brand { get; set; }

    public virtual ProductCategory? Category { get; set; }

    public virtual ICollection<Discount> Discounts { get; set; } = new List<Discount>();

    public virtual ICollection<FavouriteProduct> FavouriteProducts { get; set; } = new List<FavouriteProduct>();

    public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();

    public virtual ICollection<ProductImage> ProductImages { get; set; } = new List<ProductImage>();

    public virtual ICollection<PurchaseOrderDetail> PurchaseOrderDetails { get; set; } = new List<PurchaseOrderDetail>();

    public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();
}
