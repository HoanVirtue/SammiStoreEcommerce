namespace SAMMI.ECOM.Domain.DomainModels.Auth
{
    public class PermissionDTO
    {
        public int PermissionId { get; set; }
        public string PermissionName { get; set; }
        public int RoleId { get; set; }
        public string RoleName { get; set; }
        public bool RoleView { get; set; }
        public bool RoleCreate { get; set; }
        public bool RoleUpdate { get; set; }
        public bool RoleDelete { get; set; }
    }
}
