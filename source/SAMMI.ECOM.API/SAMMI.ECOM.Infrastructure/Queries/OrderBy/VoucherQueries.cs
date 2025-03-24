using Dapper;
using SAMMI.ECOM.Core.Models;
using SAMMI.ECOM.Core.Models.ResponseModels.PagingList;
using SAMMI.ECOM.Domain.AggregateModels.EventVoucher;
using SAMMI.ECOM.Domain.DomainModels.OrderBuy;
using SAMMI.ECOM.Domain.Enums;
using SAMMI.ECOM.Domain.GlobalModels.Common;
using SAMMI.ECOM.Repository.GenericRepositories;
using SAMMI.ECOM.Utility;

namespace SAMMI.ECOM.Infrastructure.Queries.OrderBy
{
    public interface IVoucherQueries : IQueryRepository
    {
        Task<IPagedList<VoucherDTO>> GetList(RequestFilterModel filterModel);
        Task<IEnumerable<SelectionItem>> GetSelectionList(RequestFilterModel? request);
        Task<IEnumerable<VoucherDTO>> GetAll(RequestFilterModel? filterModel = null);
        Task<VoucherDTO> GetById(int id);
        Task<string?> GetCodeByLastId(CodeEnum? type = CodeEnum.Voucher);
        Task<IEnumerable<VoucherDTO>> GetVoucherOfCustomer(int customerId);
    }
    public class VoucherQueries : QueryRepository<Voucher>, IVoucherQueries
    {
        public VoucherQueries(SammiEcommerceContext context) : base(context)
        {
        }

        public Task<IEnumerable<VoucherDTO>> GetAll(RequestFilterModel? filterModel = null)
        {
            return WithDefaultTemplateAsync(
                (conn, sqlBuilder, sqlTemplate) =>
                {

                    return conn.QueryAsync<VoucherDTO>(sqlTemplate.RawSql, sqlTemplate.Parameters);
                }, filterModel);
        }

        public async Task<VoucherDTO> GetById(int id)
        {
            return await WithDefaultTemplateAsync(
                (conn, sqlBuilder, sqlTemplate) =>
                {

                    sqlBuilder.Where("t1.Id = @id", new { id });
                    return conn.QueryFirstOrDefaultAsync<VoucherDTO>(sqlTemplate.RawSql, sqlTemplate.Parameters);
                }
            );
        }

        public Task<IPagedList<VoucherDTO>> GetList(RequestFilterModel filterModel)
        {
            return WithPagingTemplateAsync(
                (conn, sqlBuilder, sqlTemplate) =>
                {
                    sqlBuilder.Select("t2.Name AS CategoryName");
                    sqlBuilder.Select("t3.Name AS EventName");
                    sqlBuilder.Select("t4.Name AS BrandName");
                    sqlBuilder.Select("t5.Name AS ProductName");
                    sqlBuilder.Select("t6.Name AS DiscountName");

                    sqlBuilder.LeftJoin("ProductCategory t2 ON t1.CategoryId = t2.Id AND t2.IsDeleted != 1");
                    sqlBuilder.LeftJoin("Event t3 ON t1.EventId = t3.Id AND t3.IsDeleted != 1");
                    sqlBuilder.LeftJoin("Brand t4 ON t1.BrandId = t4.Id AND t4.IsDeleted != 1");
                    sqlBuilder.LeftJoin("Product t5 ON t1.ProductId = t5.Id AND t5.IsDeleted != 1");
                    sqlBuilder.LeftJoin("DiscountType t6 ON t1.DiscountTypeId = t6.Id AND t6.IsDeleted != 1");

                    return conn.QueryAsync<VoucherDTO>(sqlTemplate.RawSql, sqlTemplate.Parameters);
                },
                filterModel);
        }

        public Task<IEnumerable<SelectionItem>> GetSelectionList(RequestFilterModel? request)
        {
            return WithDefaultTemplateAsync(
                (conn, sqlBuilder, sqlTemplate) =>
                {
                    sqlBuilder.Select("t1.Id as Value");
                    sqlBuilder.Select("t1.Name as Text");

                    return conn.QueryAsync<SelectionItem>(sqlTemplate.RawSql, sqlTemplate.Parameters);
                }, request
            );
        }

        public async Task<string?> GetCodeByLastId(CodeEnum? type = CodeEnum.Voucher)
        {
            int idLast = 0;
            string code = type.GetDescription();
            idLast = await WithDefaultNoSelectTemplateAsync(
                async (conn, sqlBuilder, sqlTemplate) =>
                {
                    sqlBuilder.Select("CASE WHEN MAX(t1.Id) IS NOT NULL THEN  MAX(t1.Id) ELSE 0 END");
                    sqlBuilder.OrderDescBy("t1.Id");

                    return await conn.QueryFirstOrDefaultAsync<int>(sqlTemplate.RawSql, sqlTemplate.Parameters);
                }
                );

            return $"{code}{(idLast + 1).ToString("D6")}";
        }

        public Task<IEnumerable<VoucherDTO>> GetVoucherOfCustomer(int customerId)
        {
            return WithDefaultTemplateAsync(
                (conn, sqlBuilder, sqlTemplate) =>
                {
                    sqlBuilder.InnerJoin("MyVoucher t2 ON t1.Id = t2.VoucherId AND t2.IsDeleted != 1");

                    sqlBuilder.Where("t1.StartDate <= NOW() AND t1.EndDate > NOW()");
                    sqlBuilder.Where("t2.CustomerId = @customerId", new { customerId });
                    return conn.QueryAsync<VoucherDTO>(sqlTemplate.RawSql, sqlTemplate.Parameters);
                });
        }
    }
}
