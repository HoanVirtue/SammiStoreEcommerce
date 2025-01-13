using SAMMI.ECOM.Domain.AggregateModels.Others;
using SAMMI.ECOM.Domain.Seeds;

namespace SAMMI.ECOM.Domain.AggregateModels.EventVoucher;

public partial class MyVoucher : Entity
{
    public int Id { get; set; }

    public int CustomerId { get; set; }

    public int VoucherId { get; set; }

    public bool IsUsed { get; set; }

    public string? Culture { get; set; }

    public DateTime? CreatedDate { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public string? CreatedBy { get; set; }

    public string? UpdatedBy { get; set; }

    public bool? IsActive { get; set; }

    public bool? IsDeleted { get; set; }

    public int? DisplayOrder { get; set; }

    public virtual User Customer { get; set; } = null!;

    public virtual Discount Voucher { get; set; } = null!;
}
