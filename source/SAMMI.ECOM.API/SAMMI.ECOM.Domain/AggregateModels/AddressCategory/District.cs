using SAMMI.ECOM.Domain.Seeds;

namespace SAMMI.ECOM.Domain.AggregateModels.AddressCategory;

public partial class District : Entity
{

    public string? Name { get; set; }

    public int? ProvinceId { get; set; }


    public virtual Province? Province { get; set; }

    public virtual ICollection<Ward> Wards { get; set; } = new List<Ward>();
}
