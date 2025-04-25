using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using SAMMI.ECOM.Core.Authorizations;
using SAMMI.ECOM.Core.Models;
using SAMMI.ECOM.Domain.Commands.Products;
using SAMMI.ECOM.Domain.Commands.User;
using SAMMI.ECOM.Domain.DomainModels.Products;
using SAMMI.ECOM.Domain.Enums;
using SAMMI.ECOM.Infrastructure.Queries;
using SAMMI.ECOM.Infrastructure.Queries.Auth;
using SAMMI.ECOM.Infrastructure.Repositories;
using SAMMI.ECOM.Infrastructure.Repositories.Permission;
using SAMMI.ECOM.Infrastructure.Repositories.Products;

namespace SAMMI.ECOM.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : CustomBaseController
    {
        private readonly IUsersQueries _usersQueries;
        private readonly IUsersRepository _userRepository;
        private readonly IImageRepository _imageRepository;
        private readonly IRoleRepository _roleRepository;
        public UsersController(
            IUsersQueries usersQueries,
            IUsersRepository usersRepository,
            IImageRepository imageRepository,
            IMapper mapper,
            UserIdentity currentUser,
            IMediator mediator,
            ILogger<UsersController> logger) : base(mediator, logger)
        {
            _usersQueries = usersQueries;
            _userRepository = usersRepository;
            Mapper = mapper;
            UserIdentity = currentUser;
            _imageRepository = imageRepository;
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

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserAsync(int id)
        {
            if (!_userRepository.IsExisted(id))
            {
                return BadRequest("Người dùng không tồn tại");
            }
            var user = await _userRepository.FindById(id);
            var role = await _roleRepository.FindById(user.RoleId);
            if(Enum.TryParse(role.Code, true, out TypeUserEnum type))
            {
                var checkRes = await _userRepository.IsExistAnotherTable(id, type);
                if(!checkRes.IsSuccess)
                {
                    return BadRequest(checkRes);
                }
            }

            return Ok(_userRepository.DeleteAndSave(id));
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteRangeAsync([FromBody] List<int> ids)
        {
            var actErrorResponse = new ActionResponse();
            if (ids == null || ids.Count == 0)
            {
                return BadRequest();
            }
            foreach (var id in ids)
            {
                var user = await _userRepository.FindById(id);
                if (user == null)
                {
                    actErrorResponse.AddError($"Không tồn tại người dùng có mã {id}");
                    return BadRequest(actErrorResponse);
                }
                var role = await _roleRepository.FindById(user.RoleId);
                if (Enum.TryParse(role.Code, true, out TypeUserEnum type))
                {
                    var checkRes = await _userRepository.IsExistAnotherTable(id, type);
                    if (!checkRes.IsSuccess)
                    {
                        return BadRequest(checkRes);
                    }
                }
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
            return Ok(await _usersQueries.GetDataByIdV2(UserIdentity.Id));
        }

        [HttpPost("update-customer-info")]
        public async Task<IActionResult> UpdateCustomerInfo([FromBody]UpdateCustomerInfoRequest request)
        {
            var updateRes = await _mediator.Send(request);
            if(updateRes.IsSuccess)
            {
                return Ok(updateRes);
            }
            return BadRequest(updateRes);
        }

        [HttpPost("update-employee-info")]
        public async Task<IActionResult> UpdateEmployeeInfo([FromBody] UpdateEmployeeInfoRequest request)
        {
            var updateRes = await _mediator.Send(request);
            if (updateRes.IsSuccess)
            {
                return Ok(updateRes);
            }
            return BadRequest(updateRes);
        }

        [HttpGet("get-avatars")]
        public async Task<IActionResult> GetListAvatarAsync()
        {
            return Ok(await _imageRepository.GetDataByUserId(UserIdentity.Id));
        }

        [HttpPost("update-avatar")]
        public async Task<IActionResult> UpdateAvatarAsync([FromBody]string ImageBase64)
        {
            var actionRes = new ActionResponse<ImageDTO>();
            if (string.IsNullOrEmpty(ImageBase64))
            {
                actionRes.AddError("Hình ảnh không được bỏ trống");
                return BadRequest(actionRes);
            }
            var user = await _userRepository.GetByIdAsync(UserIdentity.Id);
            if(user == null)
            {
                actionRes.AddError("Người dùng không tồn tại");
                return BadRequest(actionRes);
            }
            var request = new CreateImageCommand
            {
                ImageBase64 = ImageBase64,
                TypeImage = ImageEnum.User.ToString(),
                Value = UserIdentity.Id.ToString()
            };
            var imageRes = await _mediator.Send(request);
            if (!imageRes.IsSuccess)
            {
                actionRes.AddError(imageRes.Message);
                return BadRequest(actionRes);
            }
            user.AvatarId = imageRes.Result.Id;
            actionRes.Combine(await _userRepository.UpdateAndSave(user));
            if(!actionRes.IsSuccess)
            { return BadRequest(actionRes); }

            actionRes.SetResult(imageRes.Result);
            return Ok(actionRes);
        }

        [HttpPost("update-avatar-byid")]
        public async Task<IActionResult> UpdateAvatarAsync([FromBody] int imageId)
        {
            var actionRes = new ActionResponse<ImageDTO>();
            if (imageId == null)
            {
                actionRes.AddError("Hình ảnh không được bỏ trống");
                return BadRequest(actionRes);
            }
            var image = await _imageRepository.GetDataByUserIdAndImageId(UserIdentity.Id, imageId);
            if (image == null)
            {
                actionRes.AddError("Hình ảnh không tồn tại");
                return BadRequest(actionRes);
            }

            var user = await _userRepository.GetByIdAsync(UserIdentity.Id);
            if (user == null)
            {
                actionRes.AddError("Người dùng không tồn tại");
                return BadRequest(actionRes);
            }
            
            user.AvatarId = image.Id;
            actionRes.Combine(await _userRepository.UpdateAndSave(user));
            if (!actionRes.IsSuccess)
            { return BadRequest(actionRes); }

            actionRes.SetResult(Mapper.Map<ImageDTO>(image));
            return Ok(actionRes);
        }
    }
}
