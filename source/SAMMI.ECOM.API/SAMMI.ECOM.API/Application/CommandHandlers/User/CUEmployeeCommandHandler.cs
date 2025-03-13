using AutoMapper;
using FluentValidation;
using SAMMI.ECOM.Core.Authorizations;
using SAMMI.ECOM.Core.Models;
using SAMMI.ECOM.Domain.AggregateModels.System;
using SAMMI.ECOM.Domain.Commands.User;
using SAMMI.ECOM.Domain.DomainModels.Users;
using SAMMI.ECOM.Domain.Enums;
using SAMMI.ECOM.Infrastructure.Repositories;
using SAMMI.ECOM.Infrastructure.Repositories.AddressCategory;
using SAMMI.ECOM.Infrastructure.Repositories.Permission;
using SAMMI.ECOM.Infrastructure.Services.Auth;
using SAMMI.ECOM.Infrastructure.Services.Auth.Helpers;
using System.Security.Cryptography;

namespace SAMMI.ECOM.API.Application.CommandHandlers.User
{
    public class CreateEmployeeCommandHandler : CustombaseCommandHandler<CreateEmployeeCommand, EmployeeDTO>
    {
        private readonly IUsersRepository _userRepository;
        private readonly IAuthenticationService<SAMMI.ECOM.Domain.AggregateModels.Others.User> _authService;
        private readonly IWardRepository _wardRepository;
        private readonly IUserRoleRepository _userRoleRepository;
        private readonly IRoleRepository _roleRepository;
        public CreateEmployeeCommandHandler(
            IUsersRepository userRepository,
            IAuthenticationService<SAMMI.ECOM.Domain.AggregateModels.Others.User> authService,
            IWardRepository wardRepository,
            IUserRoleRepository userRoleRepository,
            IRoleRepository roleRepository,
            UserIdentity currentUser,
            IMapper mapper) : base(currentUser, mapper)
        {
            _authService = authService;
            _userRepository = userRepository;
            _wardRepository = wardRepository;
            _userRoleRepository = userRoleRepository;
            _roleRepository = roleRepository;
        }

        private static readonly RandomNumberGenerator _rng = RandomNumberGenerator.Create();


        public override async Task<ActionResponse<EmployeeDTO>> Handle(CreateEmployeeCommand request, CancellationToken cancellationToken)
        {
            var actionResponse = new ActionResponse<EmployeeDTO>();

            #region validate
            if (await _userRepository.IsExistCode(request.Code, request.Id))
            {
                actionResponse.AddError("Mã nhân viên đã tồn tại");
                return actionResponse;
            }

            if (!string.IsNullOrEmpty(request.Email) && await _userRepository.IsExistEmail(request.Email, request.Id))
            {
                actionResponse.AddError("Email đã tồn tại");
                return actionResponse;
            }

            if (!string.IsNullOrEmpty(request.Phone) && await _userRepository.IsExistPhone(request.Phone, request.Id))
            {
                actionResponse.AddError("Số điện thoại đã tồn tại");
                return actionResponse;
            }

            if (request.RoleIds == null || request.RoleIds.Count == 0)
            {
                actionResponse.AddError("Vai trò của người dùng không được bỏ trống");
                return actionResponse;
            }
            #endregion

            // check foreign key
            if (!_wardRepository.IsExisted(request.WardId))
            {
                actionResponse.AddError("Không tìm thấy xã");
                return actionResponse;
            }

            request.CreatedDate = DateTime.Now;
            request.CreatedBy = _currentUser.UserName;
            request.FullName = $"{request.FirstName.Trim()} {request.LastName.Trim()}";
            request.Type = TypeUserEnum.Employee.ToString();
            request.IdentityGuid = Guid.NewGuid().ToString();

            var createResponse = _userRepository.Create(request);
            actionResponse.Combine(createResponse);
            if (!createResponse.IsSuccess)
            {
                return actionResponse;
            }

            var employee = createResponse.Result;

            var validateUserResp = await _authService.ValidateUserAsync(employee!);
            if (!validateUserResp.Succeeded)
            {
                foreach (var err in validateUserResp.Errors)
                {
                    actionResponse.AddError(err.Description, err.Code);
                }
                return actionResponse;
            }

            employee.SecurityStamp = this.NewSecurityStamp();
            //mã hóa thuật toán PBKDF2
            employee.Password = _authService.EncryptPassword(employee.Password!);
            await _userRepository.SaveChangeAsync();

            // add role và send password email(nếu có)
            if (actionResponse.IsSuccess && request.RoleIds != null && request.RoleIds.Count > 0)
            {
                if (!request.RoleIds.All(x => _roleRepository.IsExisted(x)))
                {
                    actionResponse.AddError("Mã vai trò không tồn tại");
                    return actionResponse;
                }
                foreach (var rId in request.RoleIds)
                {
                    UserRole userRole = new UserRole
                    {
                        UserId = employee.Id,
                        RoleId = rId
                    };
                    _userRoleRepository.Create(userRole);
                }
                await _userRoleRepository.SaveChangeAsync();
            }


            actionResponse.SetResult(_mapper.Map<EmployeeDTO>(employee));
            return actionResponse;
        }

        private string NewSecurityStamp()
        {
            byte[] bytes = new byte[20];
            _rng.GetBytes(bytes);
            return Base32.ToBase32(bytes);
        }
    }


    public class UpdateEmployeeCommandHandler : CustombaseCommandHandler<UpdateEmployeeCommand, EmployeeDTO>
    {
        private readonly IUsersRepository _userRepository;
        private readonly IWardRepository _wardRepository;
        public UpdateEmployeeCommandHandler(IUsersRepository userRepository,
            IWardRepository wardRepository,
            UserIdentity currentUser,
            IMapper mapper) : base(currentUser, mapper)
        {
            _userRepository = userRepository;
            _wardRepository = wardRepository;
        }


        public override async Task<ActionResponse<EmployeeDTO>> Handle(UpdateEmployeeCommand request, CancellationToken cancellationToken)
        {
            var actionResponse = new ActionResponse<EmployeeDTO>();

            #region validate
            if (await _userRepository.IsExistCode(request.Code, request.Id))
            {
                actionResponse.AddError("Mã nhân viên đã tồn tại");
                return actionResponse;
            }

            if (!string.IsNullOrEmpty(request.Email) && await _userRepository.IsExistEmail(request.Email, request.Id))
            {
                actionResponse.AddError("Email đã tồn tại");
                return actionResponse;
            }

            if (!string.IsNullOrEmpty(request.Phone) && await _userRepository.IsExistPhone(request.Phone, request.Id))
            {
                actionResponse.AddError("Số điện thoại đã tồn tại");
                return actionResponse;
            }
            #endregion

            // check foreign key
            if (!_wardRepository.IsExisted(request.WardId))
            {
                actionResponse.AddError("Không tìm thấy xã");
                return actionResponse;
            }

            var employee = await _userRepository.FindByUserNameAsync(request.Username);

            employee.UpdatedDate = DateTime.Now;
            employee.UpdatedBy = _currentUser.UserName;
            employee.Code = request.Code;
            employee.FirstName = request.FirstName;
            employee.LastName = request.LastName;
            employee.FullName = $"{request.FirstName.Trim()} {request.LastName.Trim()}";
            employee.Email = request.Email;
            employee.Phone = request.Phone;
            employee.StreetAddress = request.StreetAddress;
            employee.WardId = request.WardId;
            employee.Gender = request.Gender;

            var employeeUpdate = await _userRepository.UpdateAndSave(employee);
            actionResponse.Combine(employeeUpdate);
            if (!employeeUpdate.IsSuccess)
            {
                return actionResponse;
            }
            actionResponse.SetResult(_mapper.Map<EmployeeDTO>(employeeUpdate.Result));
            return actionResponse;
        }
    }

    public class CreateEmployeeCommandValidator : AbstractValidator<CreateEmployeeCommand>
    {
        public CreateEmployeeCommandValidator()
        {
            RuleFor(x => x.Phone)
                .NotEmpty()
                .WithMessage("Điện thoại không được bỏ trống");

            RuleFor(x => x.Email)
                .NotEmpty()
                .WithMessage("Email không được bỏ trống");

            RuleFor(x => x.IdCardNumber)
                .NotEmpty()
                .WithMessage("CCCD không được bỏ trống");
        }
    }

    public class UpdateEmployeeCommandValidator : AbstractValidator<UpdateEmployeeCommand>
    {
        public UpdateEmployeeCommandValidator()
        {
            RuleFor(x => x.Phone)
                .NotEmpty()
                .WithMessage("Điện thoại không được bỏ trống");

            RuleFor(x => x.Email)
                .NotEmpty()
                .WithMessage("Email không được bỏ trống");

            RuleFor(x => x.IdCardNumber)
                .NotEmpty()
                .WithMessage("CCCD không được bỏ trống");
        }
    }
}
