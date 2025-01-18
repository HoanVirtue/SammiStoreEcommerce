using SAMMI.ECOM.Domain.AggregateModels.EventVoucher;
using SAMMI.ECOM.Domain.Seeds;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SAMMI.ECOM.Domain.AggregateModels.Products;

[Table("Brand")]
public partial class Brand : Entity
{
    [Column("Code")]
    [Required]
    [StringLength(256)]
    public string Code { get; set; } = null!;

    [Column("Name")]
    [Required]
    [StringLength(100)]
    public string Name { get; set; } = null!;

    [Column("Image")]
    [StringLength(255)]
    public string? Image { get; set; }

    public virtual ICollection<Discount> Discounts { get; set; } = new List<Discount>();

    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}