using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace SAMMI.ECOM.API.Controllers.OrderBuy
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class OrderBuysController : CustomBaseController
    {
        public OrderBuysController(IMediator mediator, ILogger logger) : base(mediator, logger)
        {
        }


    }
}
