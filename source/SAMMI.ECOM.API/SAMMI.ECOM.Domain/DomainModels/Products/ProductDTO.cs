namespace SAMMI.ECOM.Domain.DomainModels.Products
{
    public class ProductDTO
    {
        public string Code { get; set; } = null!;
        public string Name { get; set; } = null!;

        public int StockQuantity { get; set; }

        public decimal? OldPrice { get; set; }

        public decimal NewPrice { get; set; }

        public string? Ingredient { get; set; }

        public string? Uses { get; set; }

        public string? UsageGuide { get; set; }

        public int? BrandId { get; set; }
        public int? Status { get; set; }
        public int? CategoryId { get; set; }
        public List<ProductImageDTO>? Images { get; set; }


        public int Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public string? CreatedBy { get; set; }
        public string? UpdatedBy { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public int? DisplayOrder { get; set; }
    }
}
