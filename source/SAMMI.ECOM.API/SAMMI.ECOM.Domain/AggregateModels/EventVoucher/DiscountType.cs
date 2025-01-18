using SAMMI.ECOM.Domain.Seeds;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SAMMI.ECOM.Domain.AggregateModels.EventVoucher;

[Table("DiscountType")]
public partial class DiscountType : Entity
{
    [Column("Name")]
    [MaxLength(100)]
    public string Name { get; set; } = null!;

    public virtual ICollection<Discount> Discounts { get; set; } = new List<Discount>();
}
