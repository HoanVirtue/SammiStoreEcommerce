using SAMMI.ECOM.Domain.Seeds;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SAMMI.ECOM.Domain.AggregateModels.Products;

[Table("ProductImage")]
public partial class ProductImage : Entity
{
    [ForeignKey("Product")]
    public int ProductId { get; set; }

    [Column("ImageUrl")]
    [StringLength(255)]
    public string? ImageUrl { get; set; }



    public virtual Product Product { get; set; } = null!;
}
