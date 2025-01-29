using MediatR;
using Microsoft.AspNetCore.Mvc;
using SAMMI.ECOM.Core.Models;
using SAMMI.ECOM.Domain.Commands.User;
using SAMMI.ECOM.Infrastructure.Queries;
using SAMMI.ECOM.Infrastructure.Repositories;

namespace SAMMI.ECOM.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : CustomBaseController
    {
        private readonly IUsersQueries _usersQueries;
        private readonly IUsersRepository _userRepository;
        public UsersController(
            IUsersQueries usersQueries,
            IUsersRepository usersRepository,
            IMediator mediator,
            ILogger<UsersController> logger) : base(mediator, logger)
        {
            _usersQueries = usersQueries;
            _userRepository = usersRepository;
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
        public async Task<IActionResult> PostEmployee([FromBody] CreateEmployeeCommand request)
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

        [HttpPut("employee/{id}")]
        public async Task<IActionResult> PutEmployee(int id, [FromBody] UpdateEmployeeCommand request)
        {
            if ((id == 0 || request.Id == 0) && id != request.Id)
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

        [HttpDelete("employee/{id}")]
        public IActionResult DeleteEmployee(int id)
        {
            if (!_userRepository.IsExisted(id))
            {
                return NotFound();
            }
            return Ok(_userRepository.DeleteAndSave(id));
        }


        [HttpGet("customer")]
        public async Task<IActionResult> GetCustomer([FromQuery] RequestFilterModel request)
        {
            if (request.Type == RequestType.SimpleAll)
                return Ok(await _usersQueries.GetCustomerAll(request));
            return Ok(await _usersQueries.GetCustomerList(request));
        }

        [HttpGet("customer/{id}")]
        public async Task<IActionResult> GetCustomerById(int id)
        {
            return Ok(await _usersQueries.GetCustomerById(id));
        }

        [HttpPost("customer")]
        public async Task<IActionResult> PostCustomer([FromBody] CUCustomerCommand request)
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

        [HttpPut("customer/{id}")]
        public async Task<IActionResult> PutCustomer(int id, [FromBody] CUCustomerCommand request)
        {
            if ((id == 0 || request.Id == 0) && id != request.Id)
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
