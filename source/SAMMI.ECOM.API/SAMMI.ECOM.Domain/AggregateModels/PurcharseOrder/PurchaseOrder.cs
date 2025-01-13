using SAMMI.ECOM.Domain.AggregateModels.Others;
using SAMMI.ECOM.Domain.Seeds;

namespace SAMMI.ECOM.Domain.AggregateModels.PurcharseOrder;

public partial class PurchaseOrder : Entity
{

    public int EmployeeId { get; set; }

    public int SupplierId { get; set; }

    public string? Status { get; set; }


    public virtual User Employee { get; set; } = null!;

    public virtual ICollection<PurchaseOrderDetail> PurchaseOrderDetails { get; set; } = new List<PurchaseOrderDetail>();

    public virtual User Supplier { get; set; } = null!;
}
