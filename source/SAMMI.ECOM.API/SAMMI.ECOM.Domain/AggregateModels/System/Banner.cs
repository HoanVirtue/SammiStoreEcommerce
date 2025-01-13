using SAMMI.ECOM.Domain.Seeds;

namespace SAMMI.ECOM.Domain.AggregateModels.System;

public partial class Banner : Entity
{
    public string Name { get; set; } = null!;

    public string? ImageUrl { get; set; }

    public int Level { get; set; }

}
