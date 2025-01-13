using SAMMI.ECOM.Domain.Seeds;

namespace SAMMI.ECOM.Domain.AggregateModels.OrderBuy;

public partial class Payment : Entity
{

    public int OrderId { get; set; }

    public int PaymentMethodId { get; set; }

    public decimal PaymentAmount { get; set; }

    public string? PaymentStatus { get; set; }

    public string? TransactionId { get; set; }


    public virtual Order Order { get; set; } = null!;

    public virtual PaymentMethod PaymentMethod { get; set; } = null!;
}
