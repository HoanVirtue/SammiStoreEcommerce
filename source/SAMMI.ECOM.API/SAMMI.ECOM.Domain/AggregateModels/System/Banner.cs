using SAMMI.ECOM.Domain.Seeds;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SAMMI.ECOM.Domain.AggregateModels.System;

[Table("Banner")]
public partial class Banner : Entity
{
    [Column("Name")]
    [StringLength(100)]
    public string Name { get; set; } = null!;

    [Column("ImageUrl")]
    [StringLength(255)]
    public string? ImageUrl { get; set; }

    [Column("Level")]
    public int Level { get; set; }

}
