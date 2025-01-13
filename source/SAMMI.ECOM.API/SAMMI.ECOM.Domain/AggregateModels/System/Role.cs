using SAMMI.ECOM.Domain.AggregateModels.Others;
using SAMMI.ECOM.Domain.Seeds;

namespace SAMMI.ECOM.Domain.AggregateModels.System;

public partial class Role : Entity
{
    public string Name { get; set; } = null!;

    public int EmployeeId { get; set; }

    public int CategoryRoleId { get; set; }

    public bool? RoleView { get; set; }

    public bool? RoleUpdate { get; set; }

    public bool? RoleDelete { get; set; }


    public virtual RoleCategory CategoryRole { get; set; } = null!;

    public virtual User Employee { get; set; } = null!;
}
