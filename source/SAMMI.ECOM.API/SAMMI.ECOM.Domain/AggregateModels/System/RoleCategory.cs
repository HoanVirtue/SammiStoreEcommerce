using SAMMI.ECOM.Domain.Seeds;

namespace SAMMI.ECOM.Domain.AggregateModels.System;

public partial class RoleCategory : Entity
{
    public string Name { get; set; } = null!;



    public virtual ICollection<Role> Roles { get; set; } = new List<Role>();
}
