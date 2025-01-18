using SAMMI.ECOM.Domain.AggregateModels.Others;
using SAMMI.ECOM.Domain.Seeds;
using System.ComponentModel.DataAnnotations.Schema;

namespace SAMMI.ECOM.Domain.AggregateModels.System
{
    [Table("UserRole")]
    public class UserRole : Entity
    {
        [ForeignKey("User")]
        public int UserId { get; set; }

        [ForeignKey("Role")]
        public int RoleId { get; set; }


        public virtual User User { get; set; } = null!;
        public virtual Role Role { get; set; } = null!;
    }
}
