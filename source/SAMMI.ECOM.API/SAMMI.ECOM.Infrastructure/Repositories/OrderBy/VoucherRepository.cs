using Microsoft.EntityFrameworkCore;
using SAMMI.ECOM.Core.Models;
using SAMMI.ECOM.Domain.AggregateModels.EventVoucher;
using SAMMI.ECOM.Domain.Commands.OrderBuy;
using SAMMI.ECOM.Domain.Enums;
using SAMMI.ECOM.Infrastructure.Repositories.AddressCategory;
using SAMMI.ECOM.Infrastructure.Repositories.Products;
using SAMMI.ECOM.Repository.GenericRepositories;
using SAMMI.ECOM.Utility;

namespace SAMMI.ECOM.Infrastructure.Repositories.OrderBy
{
    public interface IVoucherRepository : ICrudRepository<Voucher>
    {
        Task<bool> CheckExistCode(string code, int? id = 0);
        Task<Voucher> GetByCode(string code);
        //Task<ActionResponse<bool>> ValidVoucher(string orderCode, string voucherCode);
        Task<ActionResponse<bool>> ValidVoucher(int voucherId, CreateOrderCommand order);
        Task<decimal> CalculateDiscount(int voucherId, decimal costShip, decimal totalPrice);
    }
    public class VoucherRepository : CrudRepository<Voucher>, IVoucherRepository, IDisposable
    {
        private readonly SammiEcommerceContext _context;
        private readonly IOrderRepository _orderRepository;
        private readonly IDiscountTypeRepository _typeRepository;
        private readonly IProductRepository _productRepository;
        private readonly IWardRepository _wardRepository;
        private bool _disposed;
        private static readonly Dictionary<DiscountTypeEnum, List<ConditionTypeEnum>> ValidConditionsByType = new()
        {
            { DiscountTypeEnum.Percentage, new List<ConditionTypeEnum> { ConditionTypeEnum.MinOrderValue, ConditionTypeEnum.MaxDiscountAmount } },
            { DiscountTypeEnum.FixedAmount, new List<ConditionTypeEnum> { ConditionTypeEnum.MinOrderValue } },
            { DiscountTypeEnum.FreeShipping, new List<ConditionTypeEnum> { ConditionTypeEnum.MinOrderValue, ConditionTypeEnum.AllowedRegions } },
            //{ DiscountTypeEnum.TieredDiscount, new List<ConditionTypeEnum> { ConditionTypeEnum.TierLevels } },
            //{ DiscountTypeEnum.BundleDiscount, new List<ConditionTypeEnum> { ConditionTypeEnum.RequiredProducts } }
        };

        public VoucherRepository(
            SammiEcommerceContext context,
            IOrderRepository orderRepository,
            IDiscountTypeRepository typeRepository,
            IProductRepository productRepository,
            IWardRepository wardRepository) : base(context)
        {
            _context = context;
            _orderRepository = orderRepository;
            _typeRepository = typeRepository;
            _productRepository = productRepository;
            _wardRepository = wardRepository;
        }

        public async Task<bool> CheckExistCode(string code, int? id = 0)
        {
            return await _context.Vouchers.AnyAsync(x => x.Code.ToLower() == code.ToLower() && x.Id != id && x.IsDeleted != true);
        }


        public void Dispose()
        {
            _disposed = true;
        }

        public async Task<Voucher> GetByCode(string code)
        {
            return await _context.Vouchers.SingleOrDefaultAsync(x => x.Code.ToLower() == code.ToLower() && x.IsDeleted != true);
        }

        /*
        public async Task<ActionResponse<bool>> ValidVoucher(string orderCode, string voucherCode)
        {
            var actResponse = new ActionResponse<bool>();
            var order = await _orderRepository.GetByCode(orderCode);
            var voucher = await GetByCode(voucherCode);
            var discountType = await _typeRepository.FindById(voucher.DiscountTypeId);
            var conditions = await _context.VoucherConditions
                .Where(x => x.VoucherId == voucher.Id && x.IsDeleted != true)
                .ToListAsync();
            if (!Enum.TryParse(discountType.Code, true, out DiscountTypeEnum discountTypeEnum))
            {
                actResponse.AddError("Error convert to DiscountTypeEnum");
                return actResponse;
            }
            foreach (var con in conditions)
            {
                if (Enum.TryParse(con.ConditionType, true, out ConditionTypeEnum conType))
                    conType = ConditionTypeEnum.MinOrderValue;
                switch (conType)
                {
                    case ConditionTypeEnum.MinOrderValue:
                        var minValue = Convert.ToDecimal(con.ConditionValue);
                        if (order.TotalPrice < minValue)
                        {
                            actResponse.AddError($"Áp dụng voucher không hợp lệ. Áp dụng cho đơn hàng tối thiểu {minValue.FormatCurrency()}");
                            return actResponse;
                        }
                        break;
                    case ConditionTypeEnum.MaxDiscountAmount:
                        if (discountTypeEnum == DiscountTypeEnum.Percentage)
                        {
                            decimal maxDiscount = Convert.ToDecimal(con.ConditionValue);
                            decimal discountAmount = (decimal)(order.TotalPrice * voucher.DiscountValue) / 100;
                            if (discountAmount > maxDiscount)
                            {
                                actResponse.AddError($"");
                                return actResponse;
                            }
                        }
                        break;
                        //case ConditionTypeEnum.RequiredQuantity:
                        //    if (order.TotalQuantity < Convert.ToInt32(con.ConditionValue))
                        //        return false;
                        //    break;

                        //case ConditionTypeEnum.AllowedRegions:
                        //    var allowedRegions = con.ConditionValue.Split(',');
                        //    if (!allowedRegions.Contains(order.ShippingRegion))
                        //        return false;
                        //    break;

                        //case ConditionTypeEnum.TierLevels:
                        //    var tierLevels = JsonConvert.DeserializeObject<List<TierLevel>>(con.ConditionValue);
                        //    var applicableDiscount = tierLevels
                        //        .Where(tl => order.TotalQuantity >= tl.Level)
                        //        .OrderByDescending(tl => tl.Level)
                        //        .FirstOrDefault();

                        //    if (applicableDiscount != null)
                        //    {
                        //        decimal discountAmount = (order.TotalPrice * applicableDiscount.Discount) / 100;
                        //        order.DiscountAmount = discountAmount;
                        //    }
                        //    break;

                        //case ConditionTypeEnum.RequiredProducts:
                        //    var requiredProducts = con.ConditionValue.Split(',').Select(int.Parse);
                        //    if (!order.Items.Any(item => requiredProducts.Contains(item.ProductId)))
                        //        return false;
                        //    break;
                }
            }

            return actResponse;
        }
        */

        /// <summary>
        /// Kiểm tra voucher có hợp lệ hay không
        /// </summary>
        /// <param name="voucherId"></param>
        /// <param name="order"></param>
        /// <returns></returns>
        public async Task<ActionResponse<bool>> ValidVoucher(int voucherId, CreateOrderCommand order)
        {
            var actResponse = new ActionResponse<bool>();
            var voucher = await GetByIdAsync(voucherId);
            var discountType = await _typeRepository.FindById(voucher.DiscountTypeId);
            var conditions = await _context.VoucherConditions
                .Where(x => x.VoucherId == voucher.Id && x.IsDeleted != true)
                .ToListAsync();
            order.TotalAmount = 0;
            order.TotalQuantity = 0;
            foreach (var detail in order.Details)
            {
                if (!_productRepository.IsExisted(detail.ProductId))
                {
                    actResponse.AddError("Mã sản phẩm không tồn tại.");
                    return actResponse;
                }
                var amount = await _productRepository.CalAmount(detail.ProductId, detail.Quantity);
                order.TotalAmount += amount;
                order.TotalQuantity += detail.Quantity;
            }
            var wardCustomer = await _wardRepository.GetById(order.WardId ?? 0);

            if (!Enum.TryParse(discountType.Code, true, out DiscountTypeEnum discountTypeEnum))
            {
                actResponse.AddError("Lỗi không thể chuyển đổi thành DiscountTypeEnum");
                return actResponse;
            }
            foreach (var con in conditions)
            {
                if (Enum.TryParse(con.ConditionType, true, out ConditionTypeEnum conType))
                    conType = ConditionTypeEnum.MinOrderValue;
                switch (conType)
                {
                    case ConditionTypeEnum.MinOrderValue:
                        var minValue = Convert.ToDecimal(con.ConditionValue);
                        if (order.TotalAmount < minValue)
                        {
                            actResponse.AddError($"Áp dụng voucher không hợp lệ. Áp dụng cho đơn hàng tối thiểu {minValue.FormatCurrency()}");
                            return actResponse;
                        }
                        break;
                    //case ConditionTypeEnum.MaxDiscountAmount:
                    //    if (discountTypeEnum == DiscountTypeEnum.Percentage)
                    //    {
                    //        decimal maxDiscount = Convert.ToDecimal(con.ConditionValue);
                    //        decimal discountAmount = (decimal)(order.TotalAmount * voucher.DiscountValue) / 100;
                    //        if (discountAmount > maxDiscount)
                    //        {
                    //            maxDiscount = discountAmount;
                    //        }
                    //        order.DiscountAmount = maxDiscount;
                    //    }
                    //    break;
                    case ConditionTypeEnum.RequiredQuantity:
                        int requiredQuantity = Convert.ToInt32(con.ConditionValue);
                        if (order.TotalQuantity < requiredQuantity)
                        {
                            actResponse.AddError($"Áp dụng voucher không hợp lệ. Áp dụng cho đơn hàng có tổng số lượng sản phẩm tối thiểu là {requiredQuantity}");
                            return actResponse;
                        }
                        break;

                    case ConditionTypeEnum.AllowedRegions:
                        var allowedRegions = con.ConditionValue.Split(',');
                        if (!allowedRegions.Contains(wardCustomer.ProvinceId.ToString()))
                        {
                            actResponse.AddError($"Áp dụng voucher không hợp lệ. Không áp dụng cho đơn hàng thuộc tỉnh {wardCustomer.ProvinceName}");
                            return actResponse;
                        }
                        break;
                    //case ConditionTypeEnum.TierLevels:
                    //    var tierLevels = JsonConvert.DeserializeObject<List<TierLevelCommand>>(con.ConditionValue);
                    //    var applicableDiscount = tierLevels
                    //        .Where(tl => order.TotalQuantity >= tl.Level)
                    //        .OrderByDescending(tl => tl.Level)
                    //        .FirstOrDefault();

                    //    if (applicableDiscount != null)
                    //    {
                    //        decimal discountAmount = (decimal)(order.TotalAmount * applicableDiscount.Discount) / 100;
                    //        order.DiscountAmount = discountAmount;
                    //    }
                    //    else
                    //    {
                    //        actResponse.AddError($"Áp dụng voucher không hợp lệ. Tổng số lượng sản phẩm không thỏa mãn!");
                    //        return actResponse;
                    //    }
                    //    break;

                    case ConditionTypeEnum.RequiredProducts:
                        var requiredProducts = con.ConditionValue.Split(',').Select(int.Parse);
                        if (!order.Details.Any(item => requiredProducts.Contains(item.ProductId)))
                        {
                            actResponse.AddError($"Áp dụng voucher không hợp lệ. Sản phẩm không nằm trong khuyến mãi");
                            return actResponse;
                        }
                        break;
                }
            }

            return actResponse;
        }

        public async Task<decimal> CalculateDiscount(int voucherId, decimal costShip, decimal totalPrice)
        {
            decimal totalDiscount = 0;
            var voucher = await GetByIdAsync(voucherId);
            var discountType = await _typeRepository.FindById(voucher.DiscountTypeId);
            var conditions = await _context.VoucherConditions
                .Where(x => x.VoucherId == voucher.Id && x.IsDeleted != true)
                .ToListAsync();

            if (!Enum.TryParse(discountType.Code, true, out DiscountTypeEnum discountTypeEnum))
            {
                return 0;
            }

            if (discountType.Code == DiscountTypeEnum.Percentage.ToString())
            {
                totalDiscount = totalPrice * voucher.DiscountValue;
            }
            else if (discountType.Code == DiscountTypeEnum.FixedAmount.ToString())
            {
                totalDiscount = voucher.DiscountValue;
            }
            else if (discountType.Code == DiscountTypeEnum.FreeShipping.ToString())
            {
                totalDiscount = costShip;
            }

            foreach (var con in conditions)
            {
                if (Enum.TryParse(con.ConditionType, true, out ConditionTypeEnum conType) && conType == ConditionTypeEnum.MaxDiscountAmount)
                {
                    if (decimal.TryParse(con.ConditionValue, out decimal maxDiscount) && maxDiscount >= 0)
                    {
                        totalDiscount = Math.Min(totalDiscount, maxDiscount);
                    }
                    break;
                }
            }

            return totalDiscount > 0 ? totalDiscount : 0;
        }
    }
}
