using SAMMI.ECOM.Domain.AggregateModels.Others;
using SAMMI.ECOM.Domain.Seeds;

namespace SAMMI.ECOM.Domain.AggregateModels.OrderBuy;

public partial class Notification : Entity
{
    public string Name { get; set; } = null!;

    public int ReceiverId { get; set; }

    public int? OrderId { get; set; }


    public virtual Order? Order { get; set; }

    public virtual User Receiver { get; set; } = null!;
}
