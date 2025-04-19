using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SAMMI.ECOM.Core.Models.RequestModels.QueryParams;
using SAMMI.ECOM.Infrastructure.Queries.OrderBy;
using SAMMI.ECOM.Infrastructure.Repositories.OrderBy;
using SAMMI.ECOM.Infrastructure.Repositories.Products;

namespace SAMMI.ECOM.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportsController : CustomBaseController
    {
        private readonly IOrderQueries _orderQueries;
        private readonly IPurchaseOrderRepository _purchaseRepository;
        private readonly IProductRepository _productRepository;
        public ReportsController(
            IOrderQueries orderQueries,
            IPurchaseOrderRepository purchaseRepository,
            IProductRepository productRepository,
            IMediator mediator,
            ILogger<ReportsController> logger) : base(mediator, logger)
        {
            _orderQueries = orderQueries;
            _purchaseRepository = purchaseRepository;
            _productRepository = productRepository;
        }

        [HttpGet("sales-revenue")]
        public async Task<IActionResult> SalesRevenueAsync([FromQuery]SaleRevenueFilterModel request)
        {
            return Ok(await _orderQueries.RevenueOrder(request));
        }
    }
}
