using MediatR;
using Microsoft.AspNetCore.Mvc;
using SAMMI.ECOM.Core.Models;
using SAMMI.ECOM.Domain.Commands.Products;
using SAMMI.ECOM.Infrastructure.Queries.Products;

namespace SAMMI.ECOM.API.Controllers.Products
{
    public class ProductsController : CustomBaseController
    {
        private readonly IProductQueries _productQueries;
        public ProductsController(
            IProductQueries productQueries,
            IMediator mediator,
            ILogger logger) : base(mediator, logger)
        {
            _productQueries = productQueries;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] RequestFilterModel request)
        {
            return Ok(await _productQueries.GetList(request));
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            return Ok();
        }

        [HttpPost]
        public IActionResult Post([FromBody] CUProductCommand model)
        {
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] CUProductCommand model)
        {
            return Ok();
        }
    }
}
