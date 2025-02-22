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

    public enum DiscountTypeEnum
    {
        Percentage,       // Giảm giá theo %
        FixedAmount,      // Giảm giá số tiền cố định
        BuyXGetY,        // Mua X tặng Y
        FreeShipping,    // Miễn phí vận chuyển
        TieredDiscount,  // Giảm theo cấp bậc
        BundleDiscount   // Giảm giá khi mua theo combo
    }

    public enum ConditionTypeEnum
    {
        MinOrderValue, // đơn hàng tối thiểu
        MaxDiscountAmount, // Giảm tối đa
        RequiredQuantity, // Mua ít nhất
        AllowedRegions, // Chỉ áp dụng cho tại địa chỉ cụ thể
        TierLevels, // VALUES (5, 'TierLevels', '2:5%,3:10%');  -- Mua 2 sản phẩm giảm 5%, mua 3 giảm 10%
        RequiredProducts // Chỉ áp dụng khi mua sản phẩm ID 101, 102
    }
}
