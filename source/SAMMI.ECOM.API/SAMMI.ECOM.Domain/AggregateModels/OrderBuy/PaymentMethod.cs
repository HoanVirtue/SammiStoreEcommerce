using SAMMI.ECOM.Domain.Seeds;

namespace SAMMI.ECOM.Domain.AggregateModels.OrderBuy;

public partial class PaymentMethod : Entity
{
    public string Name { get; set; } = null!;


    public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();
}
