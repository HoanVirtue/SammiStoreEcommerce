using Dapper;
using SAMMI.ECOM.Core.Models;
using SAMMI.ECOM.Core.Models.ResponseModels.PagingList;
using SAMMI.ECOM.Domain.AggregateModels.PurcharseOrder;
using SAMMI.ECOM.Domain.DomainModels.OrderBuy;
using SAMMI.ECOM.Repository.GenericRepositories;

namespace SAMMI.ECOM.Infrastructure.Queries.OrderBy
{
    public interface IPurchaseOrderQueries : IQueryRepository
    {
        Task<IPagedList<PurchaseOrderDTO>> GetList(RequestFilterModel filterModel);
        Task<PurchaseOrderDTO> GetPurchaseOrder(int id);
    }
    public class PurchaseOrderQueries : QueryRepository<PurchaseOrder>, IPurchaseOrderQueries
    {
        public PurchaseOrderQueries(SammiEcommerceContext context) : base(context)
        {
        }

        public Task<IPagedList<PurchaseOrderDTO>> GetList(RequestFilterModel filterModel)
        {
            return WithPagingTemplateAsync(
                (conn, sqlBuilder, sqlTemplate) =>
                {
                    sqlBuilder.Select("t2.FullName AS EmployeeName");
                    sqlBuilder.Select("t3.FullName AS SupplierName");
                    sqlBuilder.Select("SUM(t4.Quantity) AS TotalQuantity, SUM(t4.Quantity * t4.UnitPrice) AS TotalPrice");

                    sqlBuilder.InnerJoin("Users t2 ON t1.EmployeeId = t2.Id");
                    sqlBuilder.InnerJoin("Users t3 ON t1.SupplierId = t3.Id");
                    sqlBuilder.LeftJoin("PurchaseOrderDetail t4 ON t1.Id = t4.PurchaseOrderId");

                    sqlBuilder.GroupBy(@"t1.Id,
                    t1.EmployeeId,
                    t1.SupplierId,
                    t1.Status,
                    t1.Note,
                    t1.CreatedDate,
                    t1.UpdatedDate,
                    t1.CreatedBy,
                    t1.UpdatedBy,
                    t1.IsActive,
                    t1.IsDeleted,
                    t2.FullName, t3.FullName");

                    return conn.QueryAsync<PurchaseOrderDTO>(sqlTemplate.RawSql, sqlTemplate.Parameters);
                }, filterModel);
        }

        public async Task<PurchaseOrderDTO> GetPurchaseOrder(int id)
        {
            return await WithDefaultTemplateAsync(
                async (conn, sqlBuilder, sqlTemplate) =>
                {
                    sqlBuilder.Select("t2.FullName AS EmployeeName");
                    sqlBuilder.Select("t3.FullName AS SupplierName");
                    sqlBuilder.Select("t4.*");
                    sqlBuilder.Select("t5.Name AS ProductName");

                    sqlBuilder.InnerJoin("Users t2 ON t1.EmployeeId = t2.Id");
                    sqlBuilder.InnerJoin("Users t3 ON t1.SupplierId = t3.Id");
                    sqlBuilder.LeftJoin("PurchaseOrderDetail t4 ON t1.Id = t4.PurchaseOrderId");
                    sqlBuilder.LeftJoin("Product t5 ON t4.ProductId = t5.Id");

                    sqlBuilder.Where("t1.Id = @id", new { id });
                    var purchaseDictionary = new Dictionary<int, PurchaseOrderDTO>();
                    var iePurchase = await conn.QueryAsync<PurchaseOrderDTO, PurchaseOrderDetailDTO, PurchaseOrderDTO>(sqlTemplate.RawSql,
                        (purchase, detail) =>
                        {
                            if (!purchaseDictionary.TryGetValue(purchase.Id, out var purchaseEntity))
                            {
                                purchaseEntity = purchase;
                                purchaseEntity.Details = new List<PurchaseOrderDetailDTO>();
                                purchaseDictionary.Add(purchase.Id, purchaseEntity);
                            }

                            if (detail != null && purchaseEntity.Details.All(x => x.Id != detail.Id))
                            {
                                purchaseEntity.Details ??= new();
                                purchaseEntity.Details.Add(detail);
                            }
                            return purchaseEntity;
                        },
                        sqlTemplate.Parameters,
                        splitOn: "Id");

                    var purchaseDTO = iePurchase.FirstOrDefault();
                    purchaseDTO.TotalQuantity = purchaseDTO.Details.Sum(x => x.Quantity);
                    purchaseDTO.TotalPrice = purchaseDTO.Details.Sum(x => x.Quantity * x.UnitPrice);
                    return purchaseDTO;
                });
        }
    }
}
