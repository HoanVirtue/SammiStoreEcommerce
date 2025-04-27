using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SAMMI.ECOM.Core.Models.RequestModels.QueryParams;
using SAMMI.ECOM.Domain.DomainModels.Reports;
using SAMMI.ECOM.Infrastructure.Queries.Auth;
using SAMMI.ECOM.Infrastructure.Queries.OrderBy;
using SAMMI.ECOM.Infrastructure.Queries.Products;
using SAMMI.ECOM.Infrastructure.Repositories;
using SAMMI.ECOM.Infrastructure.Repositories.OrderBy;
using SAMMI.ECOM.Infrastructure.Repositories.Products;

namespace SAMMI.ECOM.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportsController : CustomBaseController
    {
        private readonly IOrderQueries _orderQueries;
        private readonly IPurchaseOrderQueries _purchaseQueries;
        private readonly IProductRepository _productRepository;
        private readonly IPaymentMethodRepository _methodRepository;
        private readonly IUsersRepository _userRepository;
        private readonly IProductQueries _productQueries;
        private readonly IOrderRepository _orderRepository;
        public ReportsController(
            IOrderQueries orderQueries,
            IPurchaseOrderQueries purchaseQueries,
            IProductRepository productRepository,
            IPaymentMethodRepository methodRepository,
            IUsersRepository userRepository,
            IProductQueries productQueries,
            IOrderRepository orderRepository,
            IMediator mediator,
            ILogger<ReportsController> logger) : base(mediator, logger)
        {
            _orderQueries = orderQueries;
            _purchaseQueries = purchaseQueries;
            _productRepository = productRepository;
            _methodRepository = methodRepository;
            _userRepository = userRepository;
            _productQueries = productQueries;
            _orderRepository = orderRepository;
        }

        [HttpGet("sales-revenue")]
        public async Task<IActionResult> SalesRevenueAsync([FromQuery]SaleRevenueFilterModel request)
        {
            if(request.PaymentMethodId != null && !_methodRepository.IsExisted(request.PaymentMethodId))
            {
                return BadRequest("Phương thức thanh toán không tồn tại.");
            }
            return Ok(await _orderQueries.RevenueOrder(request));
        }

        [HttpGet("get-import-statistics")]
        public async Task<IActionResult> ImportStatisticsAsync([FromQuery] ImportStatisticFilterModel request)
        {
            if(request.EmployeeId != null
                && request.EmployeeId != 0
                && !await _userRepository.IsExistedType(request.EmployeeId??0, Domain.Enums.TypeUserEnum.Employee))
            {
                return BadRequest("Nhân viên không tồn tại.");
            }

            if (request.SupplierId != null
                && request.SupplierId != 0
                && !await _userRepository.IsExistedType(request.SupplierId ?? 0, Domain.Enums.TypeUserEnum.Supplier))
            {
                return BadRequest("Nhà cung cấp không tồn tại.");
            }
            return Ok(await _purchaseQueries.GetImportStatistic(request));
        }

        [HttpGet("inventory-statistics")]
        public async Task<IActionResult> InventoryStatistics([FromQuery]InventoryFilterModel request)
        {
            return Ok(await _productQueries.GetListInventory(request));
        }

        [HttpGet("best-selling-product")]
        public async Task<IActionResult> BestSellingProductAsync([FromQuery] int numberTop = 5)
        {
            return Ok(await _productQueries.GetListBetSellingProduct(numberTop));
        }

        [HttpGet("general-statistics")]
        public async Task<IActionResult> GeneralStatistic()
        {
            var statistic = new DashboardResponse();
            statistic.TotalCustomer = await _userRepository.GetCustomerCount();
            statistic.TotalRevenue = await _orderQueries.GetTotalRevenueInDay() ?? 0;
            return Ok(statistic);
        }
    }
}
