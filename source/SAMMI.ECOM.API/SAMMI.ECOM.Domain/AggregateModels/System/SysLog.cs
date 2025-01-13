using SAMMI.ECOM.Domain.Seeds;

namespace SAMMI.ECOM.Domain.AggregateModels.System;

public partial class SysLog : Entity
{
    public string Username { get; set; } = null!;

    public int ActionId { get; set; }

    public int FunctionId { get; set; }

    public string? Ipaddress { get; set; }




    public virtual SysAction Action { get; set; } = null!;

    public virtual SysFunction Function { get; set; } = null!;
}
