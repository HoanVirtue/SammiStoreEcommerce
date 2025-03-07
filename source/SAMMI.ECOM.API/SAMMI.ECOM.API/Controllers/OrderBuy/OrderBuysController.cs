using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SAMMI.ECOM.Domain.Commands.OrderBuy;

namespace SAMMI.ECOM.API.Controllers.OrderBuy
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Authorize]
    [Route("api/order-buy")]
    [ApiController]
    public class OrderBuysController : CustomBaseController
    {
        public OrderBuysController(IMediator mediator, ILogger logger) : base(mediator, logger)
        {
        }

        [HttpPost("create-order")]
        public async Task<IActionResult> CreateOrder([FromBody] CreateOrderCommand request)
        {
            if (request.Id != 0)
                return BadRequest();

            var response = await _mediator.Send(request);
            if (response.IsSuccess)
            {
                return Ok(response);
            }
            return BadRequest(response);
        }
    }
}
