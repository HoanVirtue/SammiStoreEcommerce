using Microsoft.EntityFrameworkCore;
using SAMMI.ECOM.Domain.AggregateModels.OrderBuy;
using SAMMI.ECOM.Domain.DomainModels.OrderBuy;
using SAMMI.ECOM.Repository.GenericRepositories;

namespace SAMMI.ECOM.Infrastructure.Repositories.OrderBy
{
    public interface IOrderRepository : ICrudRepository<Order>
    {
        Task<OrderDTO> GetByCode(string code);
    }
    public class OrderRepository : CrudRepository<Order>, IOrderRepository, IDisposable
    {
        private readonly SammiEcommerceContext _context;
        private bool _disposed;
        public OrderRepository(SammiEcommerceContext context) : base(context)
        {
            _context = context;
        }

        public void Dispose()
        {
            _disposed = true;
        }

        public async Task<OrderDTO> GetByCode(string code)
        {
            var orderQuery = from t1 in _context.Orders
                             join t2 in _context.OrderDetails on t1.Id equals t2.OrderId
                             join t3 in _context.Users on t1.CustomerId equals t3.Id
                             join t4 in _context.Products on t2.ProductId equals t4.Id
                             where t1.Code.ToLower() == code.ToLower()
                                && t1.IsDeleted != true
                                && t2.IsDeleted != true
                                && t3.IsDeleted != true && t3.IsActive == true
                                && t4.IsDeleted != true && t4.IsActive == true
                             group new { t2, t4 } by new
                             {
                                 t1.Id,
                                 t1.Code,
                                 t1.PaymentStatus,
                                 t1.OrderStatus,
                                 t1.ShippingStatus,
                                 t1.VoucherId,
                                 t1.CustomerAddress,
                                 t1.CreatedDate,
                                 t1.CreatedBy,
                                 t1.UpdatedBy,
                                 t1.UpdatedDate,
                                 t1.IsActive,
                                 t1.IsDeleted,
                                 t1.DisplayOrder,
                                 t1.CustomerId,
                                 t3.FullName,
                                 t3.Phone
                             } into gr
                             select new OrderDTO
                             {
                                 Code = gr.Key.Code,
                                 CustomerId = gr.Key.CustomerId,
                                 CustomerName = gr.Key.FullName,
                                 PhoneNumber = gr.Key.Phone,
                                 PaymentStatus = gr.Key.PaymentStatus,
                                 OrderStatus = gr.Key.OrderStatus,
                                 ShippingStatus = gr.Key.ShippingStatus,
                                 VoucherId = gr.Key.VoucherId,
                                 CustomerAddress = gr.Key.CustomerAddress,
                                 Id = gr.Key.Id,
                                 CreatedDate = gr.Key.CreatedDate,
                                 UpdatedDate = gr.Key.UpdatedDate,
                                 CreatedBy = gr.Key.CreatedBy,
                                 UpdatedBy = gr.Key.UpdatedBy,
                                 IsActive = gr.Key.IsActive,
                                 IsDeleted = gr.Key.IsDeleted,
                                 DisplayOrder = gr.Key.DisplayOrder,
                                 TotalPrice = gr.Sum(x => x.t2.Quantity * x.t4.NewPrice),
                                 TotalQuantity = gr.Sum(x => x.t2.Quantity)
                             };

            return await orderQuery.FirstAsync();
        }
    }
}
