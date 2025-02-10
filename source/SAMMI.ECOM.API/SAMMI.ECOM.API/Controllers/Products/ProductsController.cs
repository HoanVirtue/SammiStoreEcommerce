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
            ILogger<ProductsController> logger) : base(mediator, logger)
        {
            _productQueries = productQueries;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] RequestFilterModel request)
        {
            return Ok(await _productQueries.GetList(request));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            return Ok(await _productQueries.GetById(id));
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CUProductCommand request)
        {
            if (request.Id != 0)
            {
                return BadRequest();
            }
            var response = await _mediator.Send(request);
            if (!response.IsSuccess)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] CUProductCommand request)
        {
            if ((id == 0 || request.Id == 0) || id != request.Id)
            {
                return BadRequest();
            }

            var response = await _mediator.Send(request);
            if (!response.IsSuccess)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }
    }
}
