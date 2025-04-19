using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SAMMI.ECOM.Infrastructure.Repositories.OrderBy;
using SAMMI.ECOM.Infrastructure.Repositories.Products;

namespace SAMMI.ECOM.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportsController : CustomBaseController
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IPurchaseOrderRepository _purchaseRepository;
        private readonly IProductRepository _productRepository;
        public ReportsController(
            IOrderRepository orderRepository,
            IPurchaseOrderRepository purchaseRepository,
            IProductRepository productRepository,
            IMediator mediator,
            ILogger logger) : base(mediator, logger)
        {
            _orderRepository = orderRepository;
            _purchaseRepository = purchaseRepository;
            _productRepository = productRepository;
        }

        [HttpGet("sales-revenue")]
        public IActionResult SalesRevenue()
        {
            return Ok();
        }
    }
}
