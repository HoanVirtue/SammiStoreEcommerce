using SAMMI.ECOM.Domain.AggregateModels.EventVoucher;
using SAMMI.ECOM.Domain.Seeds;

namespace SAMMI.ECOM.Domain.AggregateModels.Products;

public partial class Brand : Entity
{
    public string Code { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string? Image { get; set; }


    public virtual ICollection<Discount> Discounts { get; set; } = new List<Discount>();

    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}
