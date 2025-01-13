using SAMMI.ECOM.Domain.AggregateModels.Others;
using SAMMI.ECOM.Domain.AggregateModels.Products;
using SAMMI.ECOM.Domain.Seeds;

namespace SAMMI.ECOM.Domain.AggregateModels.OrderBuy;

public partial class Review : Entity
{

    public int ProductId { get; set; }

    public int UserId { get; set; }

    public int Rating { get; set; }

    public string? Comment { get; set; }



    public virtual Product Product { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
