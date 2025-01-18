using SAMMI.ECOM.Domain.Seeds;
using System.ComponentModel.DataAnnotations.Schema;

namespace SAMMI.ECOM.Domain.AggregateModels.System;

[Table("RolePermission")]
public partial class RolePermission : Entity
{
    [ForeignKey("Role")]
    public int RoleId { get; set; }

    [ForeignKey("Permission")]
    public int PermissionId { get; set; }

    [Column("Allow")]
    public bool Allow { get; set; }

    [Column("RoleView")]
    public bool RoleView { get; set; }

    [Column("RoleCreate")]
    public bool RoleCreate { get; set; }

    [Column("RoleUpdate")]
    public bool RoleUpdate { get; set; }

    [Column("RoleDelete")]
    public bool RoleDelete { get; set; }

    public virtual Role Role { get; set; } = null!;
    public virtual Permission Permission { get; set; } = null!;
}
