namespace SAMMI.ECOM.Domain.Enums
{
    public enum OperationTypeEnum
    {
        Add,
        Subtract,
        Replace
    }

    public enum PaymentMethodEnum
    {
        COD,
        VNPAY
    }

    public enum PaymentStatusEnum
    {
        Pending, // (Chờ thanh toán)	Đơn hàng đã được tạo nhưng chưa thanh toán.
        Unpaid, // (Chưa thanh toán)	Người mua chưa thực hiện thanh toán.
        Paid, // (Đã thanh toán)	Thanh toán đã được xác nhận thành công.
        Failed, // (Thanh toán thất bại)	Thanh toán không thành công do lỗi.
    }

    public enum OrderStatusEnum
    {
        Pending, // (Chờ xử lý)	Đơn hàng mới được tạo và đang chờ xác nhận.
        WaitingForPayment, // (Chờ thanh toán)	Đơn hàng đã tạo nhưng chưa thanh toán. Chờ khách hàng hoàn tất thanh toán.
        Processing, // (Đang xử lý)	Đơn hàng đang được xử lý, có thể đang chuẩn bị hàng.
        WaitingForShipment, // (Chờ vận chuyển)	Đơn hàng đã được xác nhận và đang chờ giao cho đơn vị vận chuyển.
        Completed, // (Hoàn tất)	Đơn hàng đã hoàn tất và giao dịch thành công.
        Cancelled, // (Đã hủy)	Đơn hàng đã bị hủy bởi người dùng hoặc hệ thống.
    }

    public enum ShippingStatusEnum
    {
        NotShipped, // (Chưa giao)	Đơn hàng chưa được vận chuyển.
        Processing, // (Đang xử lý)	Đơn hàng đang được chuẩn bị để vận chuyển.
        Delivered, // (Đã nhận)	Khách hàng đã nhận được hàng.
        Lost, // (Mất hàng)	Đơn hàng bị thất lạc trong quá trình vận chuyển.
    }

    public enum PurchaseOrderStatus
    {
        Draft,          // Bản nháp
        PendingApproval, // Chờ duyệt
        Approved,       // Duyệt
        Processing,      // Đang xử lý
        Completed,        // Hoàn tất
        Canceled        // Hủy
    }
}
