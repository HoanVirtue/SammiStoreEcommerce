using SAMMI.ECOM.Domain.Seeds;

namespace SAMMI.ECOM.Domain.AggregateModels.Products;

public partial class ProductImage : Entity
{
    public int ProductId { get; set; }

    public string? ImageUrl { get; set; }



    public virtual Product Product { get; set; } = null!;
}
