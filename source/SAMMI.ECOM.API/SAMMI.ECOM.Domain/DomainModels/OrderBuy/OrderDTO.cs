namespace SAMMI.ECOM.Domain.DomainModels.OrderBuy
{
    public class OrderDTO
    {
        public string Code { get; set; } = null!;
        public int CustomerId { get; set; }
        public string? PaymentStatus { get; set; }
        public string? OrderStatus { get; set; }
        public string? ShippingStatus { get; set; }
        public int? DiscountId { get; set; }
        public string? CustomerAddress { get; set; }

        public int Id { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public string? CreatedBy { get; set; }
        public string? UpdatedBy { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public int? DisplayOrder { get; set; }
    }
}
