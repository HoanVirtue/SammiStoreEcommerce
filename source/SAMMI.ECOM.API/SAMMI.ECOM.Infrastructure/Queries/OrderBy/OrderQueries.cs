using Dapper;
using Nest;
using SAMMI.ECOM.Core.Models;
using SAMMI.ECOM.Core.Models.ResponseModels.PagingList;
using SAMMI.ECOM.Domain.AggregateModels.OrderBuy;
using SAMMI.ECOM.Domain.DomainModels.OrderBuy;
using SAMMI.ECOM.Domain.DomainModels.Products;
using SAMMI.ECOM.Domain.Enums;
using SAMMI.ECOM.Domain.GlobalModels.Common;
using SAMMI.ECOM.Repository.GenericRepositories;

namespace SAMMI.ECOM.Infrastructure.Queries.OrderBy
{
    public interface IOrderQueries : IQueryRepository
    {
        Task<IPagedList<OrderDTO>> GetList(RequestFilterModel filterModel);
        Task<IEnumerable<SelectionItem>> GetSelectionList(RequestFilterModel? request);
        Task<IEnumerable<OrderDTO>> GetAll(RequestFilterModel? filterModel = null);
        Task<OrderDTO> GetById(int id);
        Task<IEnumerable<OrderDTO>> GetOrdersByCustomerId(int customerId, RequestFilterModel request);
        Task<IPagedList<OrderDTO>> GetListOrdersByCustomerId(int customerId, RequestFilterModel request);
    }
    public class OrderQueries : QueryRepository<Order>, IOrderQueries
    {
        public OrderQueries(SammiEcommerceContext context) : base(context)
        {
        }

        public Task<IEnumerable<OrderDTO>> GetAll(RequestFilterModel? filterModel = null)
        {
            return WithDefaultTemplateAsync(
                (conn, sqlBuilder, sqlTemplate) =>
                {
                    return conn.QueryAsync<OrderDTO>(sqlTemplate.RawSql, sqlTemplate.Parameters);
                }, filterModel);
        }

        public async Task<OrderDTO> GetById(int id)
        {
            return await WithDefaultTemplateAsync(
                async (conn, sqlBuilder, sqlTemplate) =>
                {
                    sqlBuilder.Select("t2.FullName AS CustomerName, t2.Phone AS PhoneNumber");
                    sqlBuilder.Select("CONCAT(t1.CustomerAddress, ', ', t4.Name, ', ', t5.Name, ', ', t6.Name) AS CustomerAddress");
                    sqlBuilder.Select("t8.PaymentStatus");
                    sqlBuilder.Select("t10.Name AS PaymentMethod");
                    sqlBuilder.Select("t7.*");
                    sqlBuilder.Select("t9.Name AS ProductName");
                    sqlBuilder.Select("t11.ImageUrl");

                    sqlBuilder.InnerJoin("Users t2 ON t1.CustomerId = t2.Id");
                    sqlBuilder.LeftJoin("Voucher t3 ON t1.VoucherId = t3.Id");
                    sqlBuilder.InnerJoin("Ward t4 ON t1.WardId = t4.Id");
                    sqlBuilder.LeftJoin("District t5 ON t4.DistrictId = t5.Id");
                    sqlBuilder.LeftJoin("Province t6 ON t5.ProvinceId = t5.Id");
                    sqlBuilder.InnerJoin("OrderDetail t7 ON t1.Id = t7.OrderId");
                    sqlBuilder.LeftJoin("Payment t8 ON t1.Id = t8.OrderId AND t8.IsDeleted != 1");
                    sqlBuilder.LeftJoin("Product t9 ON t7.ProductId = t9.Id");
                    sqlBuilder.LeftJoin("PaymentMethod t10 ON t8.PaymentMethodId = t10.Id");
                    sqlBuilder.LeftJoin(@"(SELECT pi.ProductId, i.ImageUrl
                                        FROM ProductImage pi
                                        INNER JOIN Image i ON pi.ImageId = i.Id AND i.IsDeleted != 1
                                        WHERE pi.IsDeleted != 1
                                        AND i.DisplayOrder = (SELECT MIN(DisplayOrder) FROM Image WHERE Id = i.Id AND IsDeleted != 1)
                                        ) t11 ON t9.Id = t11.ProductId");

                    sqlBuilder.Where("t1.Id = @id", new { id });
                    var orderDictonary = new Dictionary<int, OrderDTO>();
                    var orders = await conn.QueryAsync<OrderDTO, OrderDetailDTO, OrderDTO>(sqlTemplate.RawSql,
                        (order, detail) =>
                        {
                            if (!orderDictonary.TryGetValue(order.Id, out var orderEntry))
                            {
                                orderEntry = order;
                                orderEntry.Details = new List<OrderDetailDTO>();
                                orderDictonary[order.Id] = orderEntry;
                            }


                            if (detail != null && orderEntry.Details.All(x => x.Id != detail.Id))
                            {
                                orderEntry.Details ??= new();
                                orderEntry.Details.Add(detail);
                            }

                            return orderEntry;
                        },
                        sqlTemplate.Parameters,
                        splitOn: "Id");

                    var orderDTO = orders.FirstOrDefault();
                    orderDTO.TotalQuantity = orderDTO.Details.Sum(x => x.Quantity);
                    orderDTO.TotalPrice = orderDTO.Details.Sum(x => x.Quantity * x.Price);
                    
                    return orderDTO;
                }
            );
        }

        public Task<IPagedList<OrderDTO>> GetList(RequestFilterModel filterModel)
        {
            return WithPagingTemplateAsync(
                (conn, sqlBuilder, sqlTemplate) =>
                {
                    sqlBuilder.Select("t2.FullName AS CustomerName, t2.Phone AS PhoneNumber");
                    sqlBuilder.Select("CONCAT(t1.CustomerAddress, ', ', t4.Name, ', ', t5.Name, ', ', t6.Name) AS CustomerAddress");
                    sqlBuilder.Select("SUM(t7.Quantity) AS TotalQuantity, SUM(t7.Quantity * t7.Price) AS TotalPrice");
                    sqlBuilder.Select("t8.PaymentStatus");
                    sqlBuilder.Select("t9.Name AS PaymentMethod");

                    sqlBuilder.InnerJoin("Users t2 ON t1.CustomerId = t2.Id");
                    sqlBuilder.LeftJoin("Voucher t3 ON t1.VoucherId = t3.Id");
                    sqlBuilder.InnerJoin("Ward t4 ON t1.WardId = t4.Id");
                    sqlBuilder.LeftJoin("District t5 ON t4.DistrictId = t5.Id");
                    sqlBuilder.LeftJoin("Province t6 ON t5.ProvinceId = t5.Id");
                    sqlBuilder.InnerJoin("OrderDetail t7 ON t1.Id = t7.OrderId");
                    sqlBuilder.LeftJoin("Payment t8 ON t1.Id = t8.OrderId AND t8.IsDeleted != 1");
                    sqlBuilder.LeftJoin("PaymentMethod t9 ON t8.PaymentMethodId = t9.Id");

                    if (filterModel.Any("PaymentStatus"))
                    {
                        sqlBuilder.Where("t8.PaymentStatus = @PaymentStatus", new { PaymentStatus = filterModel.Get("PaymentStatus") });
                    }

                    sqlBuilder.GroupBy(@"t1.Id,
                        t1.Code,
                        t1.CustomerId,
                        t1.OrderStatus,
                        t1.ShippingStatus,
                        t1.VoucherId,
                        t1.WardId,
                        t1.CustomerAddress,
                        t1.CostShip,
                        t1.TrackingNumber,
                        t1.EstimatedDeliveryDate,
                        t1.ActualDeliveryDate,
                        t1.ShippingCompanyId,
                        t1.CreatedDate,
                        t1.UpdatedDate,
                        t1.CreatedBy,
                        t1.UpdatedBy,
                        t1.IsActive,
                        t1.IsDeleted,
                        t1.DisplayOrder");
                    sqlBuilder.GroupBy("t2.FullName, t2.Phone, t4.Name, t5.Name, t6.Name, t8.PaymentStatus, t9.Name");
                    return conn.QueryAsync<OrderDTO>(sqlTemplate.RawSql, sqlTemplate.Parameters);
                },
                filterModel);
        }

        public async Task<IPagedList<OrderDTO>> GetListOrdersByCustomerId(int customerId, RequestFilterModel request)
        {
            return await WithPagingTemplateAsync(
                async (conn, sqlBuilder, sqlTemplate) =>
                {
                    sqlBuilder.Select("t2.FullName AS CustomerName, t2.Phone AS PhoneNumber");
                    sqlBuilder.Select("CONCAT(t1.CustomerAddress, ', ', t4.Name, ', ', t5.Name, ', ', t6.Name) AS CustomerAddress");
                    sqlBuilder.Select("t8.PaymentStatus");
                    sqlBuilder.Select("t10.Name AS PaymentMethod");
                    sqlBuilder.Select("t7.*");
                    sqlBuilder.Select("t9.Name AS ProductName");
                    sqlBuilder.Select("t11.ImageUrl");

                    sqlBuilder.InnerJoin("Users t2 ON t1.CustomerId = t2.Id");
                    sqlBuilder.LeftJoin("Voucher t3 ON t1.VoucherId = t3.Id");
                    sqlBuilder.InnerJoin("Ward t4 ON t1.WardId = t4.Id");
                    sqlBuilder.LeftJoin("District t5 ON t4.DistrictId = t5.Id");
                    sqlBuilder.LeftJoin("Province t6 ON t5.ProvinceId = t5.Id");
                    sqlBuilder.InnerJoin("OrderDetail t7 ON t1.Id = t7.OrderId");
                    sqlBuilder.LeftJoin("Payment t8 ON t1.Id = t8.OrderId AND t8.IsDeleted != 1");
                    sqlBuilder.LeftJoin("Product t9 ON t7.ProductId = t9.Id");
                    sqlBuilder.LeftJoin("PaymentMethod t10 ON t8.PaymentMethodId = t10.Id");
                    sqlBuilder.LeftJoin(@"(SELECT pi.ProductId, i.ImageUrl
                                        FROM ProductImage pi
                                        INNER JOIN Image i ON pi.ImageId = i.Id AND i.IsDeleted != 1
                                        WHERE pi.IsDeleted != 1
                                        AND i.DisplayOrder = (SELECT MIN(DisplayOrder) FROM Image WHERE Id = i.Id AND IsDeleted != 1)
                                        ) t11 ON t9.Id = t11.ProductId"
                    );

                    sqlBuilder.Where("t2.Id = @customerId", new { customerId });
                    if(request.Any("PaymentStatus"))
                    {
                        sqlBuilder.Where("t8.PaymentStatus = @PaymentStatus", new { PaymentStatus = request.Get("PaymentStatus") });
                    }

                    var orderDictonary = new Dictionary<int, OrderDTO>();
                    var orders = await conn.QueryAsync<OrderDTO, OrderDetailDTO, OrderDTO>(sqlTemplate.RawSql,
                        (order, detail) =>
                        {
                            if (!orderDictonary.TryGetValue(order.Id, out var orderEntry))
                            {
                                orderEntry = order;
                                orderEntry.Details = new List<OrderDetailDTO>();
                                orderDictonary[order.Id] = orderEntry;
                            }


                            if (detail != null && orderEntry.Details.All(x => x.Id != detail.Id))
                            {
                                orderEntry.Details ??= new();
                                orderEntry.Details.Add(detail);
                            }

                            return orderEntry;
                        },
                        sqlTemplate.Parameters,
                        splitOn: "Id");

                    foreach (var order in orders)
                    {
                        order.TotalQuantity = order.Details.Sum(x => x.Quantity);
                        order.TotalPrice = order.Details.Sum(x => x.Quantity * x.Price);
                    }
                    return orders;
                }, request
            );
        }

        public async Task<IEnumerable<OrderDTO>> GetOrdersByCustomerId(int customerId, RequestFilterModel request)
        {
            return await WithDefaultTemplateAsync(
                async (conn, sqlBuilder, sqlTemplate) =>
                {
                    sqlBuilder.Select("t2.FullName AS CustomerName, t2.Phone AS PhoneNumber");
                    sqlBuilder.Select("CONCAT(t1.CustomerAddress, ', ', t4.Name, ', ', t5.Name, ', ', t6.Name) AS CustomerAddress");
                    sqlBuilder.Select("t8.PaymentStatus");
                    sqlBuilder.Select("t10.Name AS PaymentMethod");
                    sqlBuilder.Select("t7.*");
                    sqlBuilder.Select("t9.Name AS ProductName");
                    sqlBuilder.Select("t11.ImageUrl");

                    sqlBuilder.InnerJoin("Users t2 ON t1.CustomerId = t2.Id");
                    sqlBuilder.LeftJoin("Voucher t3 ON t1.VoucherId = t3.Id");
                    sqlBuilder.InnerJoin("Ward t4 ON t1.WardId = t4.Id");
                    sqlBuilder.LeftJoin("District t5 ON t4.DistrictId = t5.Id");
                    sqlBuilder.LeftJoin("Province t6 ON t5.ProvinceId = t5.Id");
                    sqlBuilder.InnerJoin("OrderDetail t7 ON t1.Id = t7.OrderId");
                    sqlBuilder.LeftJoin("Payment t8 ON t1.Id = t8.OrderId AND t8.IsDeleted != 1");
                    sqlBuilder.LeftJoin("Product t9 ON t7.ProductId = t9.Id");
                    sqlBuilder.LeftJoin("PaymentMethod t10 ON t8.PaymentMethodId = t10.Id");
                    sqlBuilder.LeftJoin(@"(SELECT pi.ProductId, i.ImageUrl
                                        FROM ProductImage pi
                                        INNER JOIN Image i ON pi.ImageId = i.Id AND i.IsDeleted != 1
                                        WHERE pi.IsDeleted != 1
                                        AND i.DisplayOrder = (SELECT MIN(DisplayOrder) FROM Image WHERE Id = i.Id AND IsDeleted != 1)
                                        ) t11 ON t9.Id = t11.ProductId"
                    );

                    sqlBuilder.Where("t2.Id = @customerId", new { customerId });
                    if (request.Any("PaymentStatus"))
                    {
                        sqlBuilder.Where("t8.PaymentStatus = @PaymentStatus", new { PaymentStatus = request.Get("PaymentStatus") });
                    }
                    var orderDictonary = new Dictionary<int, OrderDTO>();
                    var orders = await conn.QueryAsync<OrderDTO, OrderDetailDTO, OrderDTO>(sqlTemplate.RawSql,
                        (order, detail) =>
                        {
                            if (!orderDictonary.TryGetValue(order.Id, out var orderEntry))
                            {
                                orderEntry = order;
                                orderEntry.Details = new List<OrderDetailDTO>();
                                orderDictonary[order.Id] = orderEntry;
                            }


                            if (detail != null && orderEntry.Details.All(x => x.Id != detail.Id))
                            {
                                orderEntry.Details ??= new();
                                orderEntry.Details.Add(detail);
                            }

                            return orderEntry;
                        },
                        sqlTemplate.Parameters,
                        splitOn: "Id");

                    foreach (var order in orders)
                    {
                        order.TotalQuantity = order.Details.Sum(x => x.Quantity);
                        order.TotalPrice = order.Details.Sum(x => x.Quantity * x.Price);
                    }
                    return orders;
                }
            );
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
    }
}
