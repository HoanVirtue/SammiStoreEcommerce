using SAMMI.ECOM.Domain.AggregateModels.Others;
using SAMMI.ECOM.Domain.Seeds;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SAMMI.ECOM.Domain.AggregateModels.Products;

[Table("Image")]
public partial class Image : Entity
{
    [ForeignKey("Product")]
    public int? ProductId { get; set; }
    [ForeignKey("Brand")]
    public int? BrandId { get; set; }
    [ForeignKey("User")]
    public int? UserId { get; set; }

    [Column("ImageUrl")]
    [StringLength(255)]
    public string? ImageUrl { get; set; }

    [Column("PublicId")]
    [StringLength(255)]
    public string? PublicId { get; set; }

    public virtual Product Product { get; set; } = null!;
    public virtual Brand Brand { get; set; } = null!;
    public virtual User User { get; set; } = null!;
}
