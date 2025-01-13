using SAMMI.ECOM.Domain.AggregateModels.Products;
using SAMMI.ECOM.Domain.Seeds;

namespace SAMMI.ECOM.Domain.AggregateModels.Others;

public partial class FavouriteProduct : Entity
{
    public int CustomerId { get; set; }

    public int ProductId { get; set; }


    public virtual User Customer { get; set; } = null!;

    public virtual Product Product { get; set; } = null!;
}
