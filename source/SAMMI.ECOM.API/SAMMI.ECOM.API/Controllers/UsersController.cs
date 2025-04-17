using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using SAMMI.ECOM.Core.Authorizations;
using SAMMI.ECOM.Core.Models;
using SAMMI.ECOM.Domain.Commands.User;
using SAMMI.ECOM.Domain.Enums;
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
            IMapper mapper,
            UserIdentity currentUser,
            IMediator mediator,
            ILogger<UsersController> logger) : base(mediator, logger)
        {
            _usersQueries = usersQueries;
            _userRepository = usersRepository;
            Mapper = mapper;
            UserIdentity = currentUser;
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
            if ((id == 0 || request.Id == 0) || id != request.Id)
            {
                return BadRequest();
            }
            if (!await _userRepository.IsExistedType(id, TypeUserEnum.Employee))
            {
                return BadRequest("Nhân viên không tồn tại.");
            }
            var response = await _mediator.Send(request);
            if (!response.IsSuccess)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            if (!_userRepository.IsExisted(id))
            {
                return BadRequest("Người dùng không tồn tại");
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
            if ((id == 0 || request.Id == 0) || id != request.Id)
            {
                return BadRequest();
            }
            if (!await _userRepository.IsExistedType(id, TypeUserEnum.Customer))
            {
                return BadRequest("Khách hàng không tồn tại.");
            }
            var response = await _mediator.Send(request);
            if (!response.IsSuccess)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }


        // supplier
        [HttpGet("supplier")]
        public async Task<IActionResult> GetSupplier([FromQuery] RequestFilterModel request)
        {
            if (request.Type == RequestType.SimpleAll)
                return Ok(await _usersQueries.GetSupplierAll(request));
            return Ok(await _usersQueries.GetSupplierList(request));
        }

        [HttpGet("supplier/{id}")]
        public async Task<IActionResult> GetSupplierById(int id)
        {
            return Ok(await _usersQueries.GetSupplierById(id));
        }

        [HttpPost("supplier")]
        public async Task<IActionResult> PostSupplier([FromBody] CUSupplierCommand request)
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

        [HttpPut("supplier/{id}")]
        public async Task<IActionResult> PutSupplier(int id, [FromBody] CUSupplierCommand request)
        {
            if ((id == 0 || request.Id == 0) || id != request.Id)
            {
                return BadRequest();
            }
            if (!await _userRepository.IsExistedType(id, TypeUserEnum.Supplier))
            {
                return BadRequest("Nhà cung cấp không tồn tại.");
            }
            var response = await _mediator.Send(request);
            if (!response.IsSuccess)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }

        [HttpDelete]
        public IActionResult DeleteRange([FromBody] List<int> ids)
        {
            var actErrorResponse = new ActionResponse<List<string>>();
            var listError = new Dictionary<int, string>();
            if (ids == null || ids.Count == 0)
            {
                return BadRequest();
            }
            foreach (var id in ids)
            {
                if (!_userRepository.IsExisted(id) && !listError.TryGetValue(id, out var error))
                {
                    listError[id] = $"Không tồn tại người dùng có mã {id}";
                }
            }
            if (listError.Count > 0)
            {
                actErrorResponse.SetResult(listError.Select(x => x.Value).ToList());
                return BadRequest(actErrorResponse);
            }
            return Ok(_userRepository.DeleteRangeAndSave(ids.Cast<object>().ToArray()));
        }

        [HttpGet("get-code-by-last-id")]
        public async Task<IActionResult> GetCodeByLastIdAsync([FromQuery] CodeEnum type = CodeEnum.Employee)
        {
            if (type != CodeEnum.Employee && type != CodeEnum.Customer && type != CodeEnum.Supplier)
            {
                return BadRequest();
            }
            return Ok(await _usersQueries.GetCodeByLastId(type));
        }

        [HttpGet("get-current-user")]
        public async Task<IActionResult> GetCurrentUser()
        {
            return Ok(await _userRepository.GetUserById(UserIdentity.Id));
        }


    }
}
