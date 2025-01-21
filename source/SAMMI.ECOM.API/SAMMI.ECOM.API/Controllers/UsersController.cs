using MediatR;
using Microsoft.AspNetCore.Mvc;
using SAMMI.ECOM.Core.Models;
using SAMMI.ECOM.Domain.Commands.User;
using SAMMI.ECOM.Infrastructure.Queries;

namespace SAMMI.ECOM.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : CustomBaseController
    {
        private readonly IUsersQueries _usersQueries;

        public UsersController(
            IUsersQueries usersQueries,
            IMediator mediator,
            ILogger<UsersController> logger) : base(mediator, logger)
        {
            _usersQueries = usersQueries;
        }

        [HttpGet("employee")]
        public async Task<IActionResult> GetEmployee([FromQuery] RequestFilterModel request)
        {
            if (request.Type == RequestType.Grid)
            {
                return Ok(await _usersQueries.GetEmployeeList(request));
            }
            return Ok(await _usersQueries.GetEmployeeAll(request));
        }

        [HttpGet("employee/{id}")]
        public async Task<IActionResult> GetEmployeeById(int id)
        {
            return Ok(await _usersQueries.GetEmployeeById(id));
        }

        [HttpPost("employee")]
        public async Task<IActionResult> PostEmployee(CUEmployeeCommand request)
        {
            var response = await _mediator.Send(request);
            if (!response.IsSuccess)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }
    }
}
