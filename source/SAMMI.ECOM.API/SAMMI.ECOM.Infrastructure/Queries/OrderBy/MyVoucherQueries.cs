using Dapper;
using SAMMI.ECOM.Domain.AggregateModels.EventVoucher;
using SAMMI.ECOM.Domain.DomainModels.OrderBuy;
using SAMMI.ECOM.Infrastructure.Repositories;
using SAMMI.ECOM.Infrastructure.Repositories.AddressCategory;
using SAMMI.ECOM.Infrastructure.Repositories.OrderBy;
using SAMMI.ECOM.Repository.GenericRepositories;

namespace SAMMI.ECOM.Infrastructure.Queries.OrderBy
{
    public interface IMyVoucherQueries : IQueryRepository
    {
        Task<List<MyVoucherDTO>> GetDataInCheckout(int customerId, decimal totalAmount, List<CartDetailDTO> details);
        Task<MyVoucherDTO> AppyVoucherByVoucherCode(string voucherCode, int customerId, decimal totalAmount, List<CartDetailDTO> details);
    }
    public class MyVoucherQueries : QueryRepository<MyVoucher>, IMyVoucherQueries
    {
        private readonly IVoucherRepository _voucherRepository;
        private readonly IUsersRepository _userRepository;
        private readonly ICustomerAddressRepository _addressRepository;
        public MyVoucherQueries(
            SammiEcommerceContext context,
            IVoucherRepository voucherRepository,
            IUsersRepository userRepository,
            ICustomerAddressRepository addressRepository
            ) : base(context)
        {
            _voucherRepository = voucherRepository;
            _userRepository = userRepository;
            _addressRepository = addressRepository;
        }

        public async Task<MyVoucherDTO> AppyVoucherByVoucherCode(string voucherCode, int customerId, decimal totalAmount, List<CartDetailDTO> details)
        {
            return await WithDefaultTemplateAsync(
                async (conn, sqlBuilder, sqlTemplate) =>
                {
                    sqlBuilder.Select("t1.*");
                    sqlBuilder.Select("t2.Code, t2.Name, t2.DiscountTypeId, t2.DiscountValue, t2.UsageLimit, t2.UsedCount, t2.StartDate, t2.EndDate");
                    sqlBuilder.Select("t3.Name AS DicountName");

                    sqlBuilder.InnerJoin("Voucher t2 ON t1.VoucherId = t2.Id AND t2.IsDeleted != 1 AND t2.StartDate <= NOW() AND t2.EndDate > NOW()");
                    sqlBuilder.InnerJoin("DiscountType t3 ON t2.DiscountTypeId = t3.Id AND t3.IsDeleted != 1");

                    sqlBuilder.Where("t1.CustomerId = @customerId", new { customerId });
                    sqlBuilder.Where("t2.Code = @voucherCode", new { voucherCode });
                    var voucher = await conn.QueryFirstOrDefaultAsync<MyVoucherDTO>(sqlTemplate.RawSql, sqlTemplate.Parameters);

                    if (voucher == null)
                        return voucher;
                    var address = await _addressRepository.GetDefaultByUserId(customerId);
                    voucher.IsValid = await _voucherRepository.ValidVoucher(voucher.VoucherId, customerId, address.WardId ?? 0, totalAmount, details);

                    return voucher;
                });
        }

        public async Task<List<MyVoucherDTO>> GetDataInCheckout(int customerId, decimal totalAmount, List<CartDetailDTO> details)
        {
            return await WithDefaultTemplateAsync(
                async (conn, sqlBuilder, sqlTemplate) =>
                {
                    sqlBuilder.Select("t1.*");
                    sqlBuilder.Select("t2.Code, t2.Name, t2.DiscountTypeId, t2.DiscountValue, t2.UsageLimit, t2.UsedCount, t2.StartDate, t2.EndDate");
                    sqlBuilder.Select("t3.Name AS DicountName");

                    sqlBuilder.InnerJoin("Voucher t2 ON t1.VoucherId = t2.Id AND t2.IsDeleted != 1 AND t2.StartDate <= NOW() AND t2.EndDate > NOW()");
                    sqlBuilder.InnerJoin("DiscountType t3 ON t2.DiscountTypeId = t3.Id AND t3.IsDeleted != 1");

                    sqlBuilder.Where("t1.CustomerId = @customerId", new { customerId });
                    var vouchers = await conn.QueryAsync<MyVoucherDTO>(sqlTemplate.RawSql, sqlTemplate.Parameters);

                    var address = await _addressRepository.GetDefaultByUserId(customerId);
                    foreach (var voucher in vouchers)
                    {
                        voucher.IsValid = await _voucherRepository.ValidVoucher(voucher.VoucherId, customerId, address.WardId ?? 0, totalAmount, details);
                    }

                    return vouchers.ToList();
                });
        }


    }
}
