namespace SAMMI.ECOM.Domain.DomainModels.Auth
{
    public class PermissionDTO
    {
        public int PermissionId { get; set; }
        public string PermissionName { get; set; }
        public int RoleId { get; set; }
        public string RoleName { get; set; }
        public bool Allow { get; set; }
    }
}
