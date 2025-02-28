using Microsoft.EntityFrameworkCore;
using SAMMI.ECOM.Core.Models;
using SAMMI.ECOM.Domain.AggregateModels.EventVoucher;
using SAMMI.ECOM.Domain.Enums;
using SAMMI.ECOM.Repository.GenericRepositories;
using SAMMI.ECOM.Utility;

namespace SAMMI.ECOM.Infrastructure.Repositories.OrderBy
{
    public interface IVoucherRepository : ICrudRepository<Voucher>
    {
        Task<bool> CheckExistCode(string code, int? id = 0);
        Task<Voucher> GetByCode(string code);
        Task<ActionResponse<bool>> ValidVoucher(string orderCode, string voucherCode);
    }
    public class VoucherRepository : CrudRepository<Voucher>, IVoucherRepository, IDisposable
    {
        private readonly SammiEcommerceContext _context;
        private readonly IOrderRepository _orderRepository;
        private readonly IDiscountTypeRepository _typeRepository;
        private bool _disposed;
        private static readonly Dictionary<DiscountTypeEnum, List<ConditionTypeEnum>> ValidConditionsByType = new()
        {
            { DiscountTypeEnum.Percentage, new List<ConditionTypeEnum> { ConditionTypeEnum.MinOrderValue, ConditionTypeEnum.MaxDiscountAmount } },
            { DiscountTypeEnum.FixedAmount, new List<ConditionTypeEnum> { ConditionTypeEnum.MinOrderValue } },
            { DiscountTypeEnum.BuyXGetY, new List<ConditionTypeEnum> { ConditionTypeEnum.RequiredQuantity } },
            { DiscountTypeEnum.FreeShipping, new List<ConditionTypeEnum> { ConditionTypeEnum.MinOrderValue, ConditionTypeEnum.AllowedRegions } },
            { DiscountTypeEnum.TieredDiscount, new List<ConditionTypeEnum> { ConditionTypeEnum.TierLevels } },
            { DiscountTypeEnum.BundleDiscount, new List<ConditionTypeEnum> { ConditionTypeEnum.RequiredProducts } }
        };

        public VoucherRepository(SammiEcommerceContext context,
            IOrderRepository orderRepository,
            IDiscountTypeRepository typeRepository) : base(context)
        {
            _context = context;
            _orderRepository = orderRepository;
            _typeRepository = typeRepository;
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
                        //    if (order.TotalQuantity < Convert.ToInt32(condition.ConditionValue))
                        //        return false;
                        //    break;

                        //case ConditionTypeEnum.AllowedRegions:
                        //    var allowedRegions = condition.ConditionValue.Split(',');
                        //    if (!allowedRegions.Contains(order.ShippingRegion))
                        //        return false;
                        //    break;

                        //case ConditionTypeEnum.TierLevels:
                        //    var tierLevels = JsonConvert.DeserializeObject<List<TierLevel>>(condition.ConditionValue);
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
                        //    var requiredProducts = condition.ConditionValue.Split(',').Select(int.Parse);
                        //    if (!order.Items.Any(item => requiredProducts.Contains(item.ProductId)))
                        //        return false;
                        //    break;
                }
            }

            return actResponse;
        }
    }
}
