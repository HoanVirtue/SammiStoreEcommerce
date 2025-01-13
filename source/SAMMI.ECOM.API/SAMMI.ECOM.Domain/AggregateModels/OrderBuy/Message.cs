using SAMMI.ECOM.Domain.AggregateModels.Others;
using SAMMI.ECOM.Domain.Seeds;

namespace SAMMI.ECOM.Domain.AggregateModels.OrderBuy;

public partial class Message : Entity
{

    public int EmployeeId { get; set; }

    public int CustomerId { get; set; }

    public string MessageContent { get; set; } = null!;

    public string? MessageType { get; set; }

    public bool? IsRead { get; set; }


    public virtual User Customer { get; set; } = null!;

    public virtual User Employee { get; set; } = null!;
}
