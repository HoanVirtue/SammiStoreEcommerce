namespace SAMMI.ECOM.Domain.Commands;

public partial class CUCustomerAddressCommand
{
    public int? CustomerId { get; set; }
    public string? StreetAddress { get; set; }
    public int? WardId { get; set; }
    public bool? IsDefault { get; set; }


    public int Id { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? UpdatedDate { get; set; }
    public string? CreatedBy { get; set; }
    public string? UpdatedBy { get; set; }
    public bool IsActive { get; set; }
    public bool IsDeleted { get; set; }
    public int? DisplayOrder { get; set; }
}
