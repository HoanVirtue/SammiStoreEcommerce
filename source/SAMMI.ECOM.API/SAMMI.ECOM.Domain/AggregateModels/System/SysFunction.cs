using SAMMI.ECOM.Domain.Seeds;

namespace SAMMI.ECOM.Domain.AggregateModels.System;

public partial class SysFunction : Entity
{
    public string Name { get; set; } = null!;



    public virtual ICollection<SysLog> SysLogs { get; set; } = new List<SysLog>();
}
