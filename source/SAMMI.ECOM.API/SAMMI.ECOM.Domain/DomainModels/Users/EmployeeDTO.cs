namespace SAMMI.ECOM.Domain.DomainModels.Users
{
    public class EmployeeDTO
    {
        public int Id { get; set; }
        public string Code { get; set; } = null!;

        public string? Type { get; set; }

        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public string? FullName { get; set; }

        public string? Email { get; set; }

        public string? Phone { get; set; }

        public string? StreetAddress { get; set; }

        public int? WardId { get; set; }

        public bool? IsAdmin { get; set; }


        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public string? CreatedBy { get; set; }
        public string? UpdatedBy { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public int? DisplayOrder { get; set; }
    }
}
