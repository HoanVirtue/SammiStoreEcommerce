using Nest;

namespace SAMMI.ECOM.Domain.DomainModels.Products
{
    public class ProductDTO
    {
        public string Code { get; set; } = null!;
        public string Name { get; set; } = null!;
        public int StockQuantity { get; set; }
        public decimal? ImportPrice { get; set; }
        public decimal? Price { get; set; }
        public decimal? Discount { get; set; }
        public decimal? NewPrice { get; set; }
        public string? Ingredient { get; set; }
        public string? Uses { get; set; }
        public string? UsageGuide { get; set; }
        public int? BrandId { get; set; }
        public string? BrandCode { get; set; }
        public string? BrandName { get; set; }
        public int? Status { get; set; }
        public int? CategoryId { get; set; }
        public string? CategoryCode { get; set; }
        public string? CategoryName { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public List<ImageDTO>? Images { get; set; }
        public int? TotalSold { get; set; }


        public int Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public string? CreatedBy { get; set; }
        public string? UpdatedBy { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public int? DisplayOrder { get; set; }


        // suggest
        public CompletionField? Suggest { get; set; }
    }
}
