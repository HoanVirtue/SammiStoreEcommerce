using System.ComponentModel;

namespace SAMMI.ECOM.Domain.Enums
{
    public enum PromotionEventType
    {
        [Description("Giảm giá trực tiếp trên sản phẩm hoặc hóa đơn.")]
        DirectDiscount,       // Giảm giá trực tiếp

        [Description("Ưu đãi khi đạt điều kiện về đơn hàng, ví dụ: mua X tặng Y, miễn phí vận chuyển.")]
        OrderBasedPromotion,  // Ưu đãi theo đơn hàng

        [Description("Chương trình tích điểm hoặc ưu đãi dành riêng cho thành viên VIP.")]
        LoyaltyProgram,       // Chương trình tích điểm & thành viên

        [Description("Chương trình giảm giá mạnh trong thời gian ngắn như Flash Sale, Giờ vàng.")]
        FlashSale,            // Flash Sale & Giờ vàng

        [Description("Khuyến mãi nhân các dịp đặc biệt như lễ Tết, sinh nhật khách hàng, kỷ niệm thương hiệu.")]
        SpecialOccasion,      // Khuyến mãi theo dịp đặc biệt

        [Description("Sự kiện tương tác như vòng quay may mắn, thử thách mua sắm, check-in nhận quà.")]
        MiniGameEvent         // Sự kiện thử thách & minigame
    }
}
