using AutoMapper;
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
    public class CUCustomerCommandHandler : CustombaseCommandHandler<CUCustomerCommand, CustomerDTO>
    {
        private readonly IUsersRepository _userRepository;
        private readonly IAuthenticationService<SAMMI.ECOM.Domain.AggregateModels.Others.User> _authService;
        private readonly IWardRepository _wardRepository;
        private readonly IRoleRepository _roleRepository;
        private readonly IUserRoleRepository _userRoleRepository;

        private static readonly RandomNumberGenerator _rng = RandomNumberGenerator.Create();

        public CUCustomerCommandHandler(
            IUsersRepository userRepository,
            IAuthenticationService<SAMMI.ECOM.Domain.AggregateModels.Others.User> authService,
            IWardRepository wardRepository,
            IRoleRepository roleRepository,
            IUserRoleRepository userRoleRepository,
            UserIdentity currentUser, IMapper mapper) : base(currentUser, mapper)
        {
            _authService = authService;
            _userRepository = userRepository;
            _wardRepository = wardRepository;
            _roleRepository = roleRepository;
            _userRoleRepository = userRoleRepository;
        }

        public override async Task<ActionResponse<CustomerDTO>> Handle(CUCustomerCommand request, CancellationToken cancellationToken)
        {
            var actionResponse = new ActionResponse<CustomerDTO>();
            #region validate
            if (await _userRepository.IsExistCode(request.Code, request.Id))
            {
                actionResponse.AddError("Mã khách hàng đã tồn tại");
                return actionResponse;
            }

            if (!string.IsNullOrEmpty(request.Email) && await _userRepository.IsExistEmail(request.Email, request.Id, TypeUserEnum.Customer))
            {
                actionResponse.AddError("Email đã tồn tại");
                return actionResponse;
            }

            if (!string.IsNullOrEmpty(request.Phone) && await _userRepository.IsExistPhone(request.Phone, request.Id, TypeUserEnum.Customer))
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

            if (request.Id == 0)
            {
                request.CreatedDate = DateTime.Now;
                request.CreatedBy = _currentUser.UserName;
                request.FullName = $"{request.FirstName.Trim()} {request.LastName.Trim()}";
                request.Type = TypeUserEnum.Customer.ToString();
                request.IdentityGuid = Guid.NewGuid().ToString();

                var createResponse = _userRepository.Create(request);
                actionResponse.Combine(createResponse);
                if (!createResponse.IsSuccess)
                {
                    return actionResponse;
                }

                var customer = createResponse.Result;

                var validateUserResp = await _authService.ValidateUserAsync(customer!);
                if (!validateUserResp.Succeeded)
                {
                    foreach (var err in validateUserResp.Errors)
                    {
                        actionResponse.AddError(err.Description, err.Code);
                    }
                    return actionResponse;
                }

                customer.SecurityStamp = this.NewSecurityStamp();
                //mã hóa thuật toán PBKDF2
                customer.Password = _authService.EncryptPassword(customer.Password!);
                await _userRepository.SaveChangeAsync();

                UserRole userRole = new UserRole
                {
                    UserId = customer.Id,
                    RoleId = (await _roleRepository.FindByCode(RoleTypeEnum.CUSTOMER.ToString())).Id
                };
                await _userRoleRepository.CreateAndSave(userRole);

                actionResponse.SetResult(_mapper.Map<CustomerDTO>(customer));
            }
            else
            {
                var customer = await _userRepository.FindByUserNameAsync(request.Username);

                customer.UpdatedDate = DateTime.Now;
                customer.UpdatedBy = _currentUser.UserName;
                customer.Code = request.Code;
                customer.FirstName = request.FirstName;
                customer.LastName = request.LastName;
                customer.FullName = $"{request.FirstName.Trim()} {request.LastName.Trim()}";
                customer.Email = request.Email;
                customer.Phone = request.Phone;
                customer.StreetAddress = request.StreetAddress;
                customer.WardId = request.WardId;
                customer.Gender = request.Gender;

                var customerUpdate = await _userRepository.UpdateAndSave(customer);
                actionResponse.Combine(customerUpdate);
                if (!customerUpdate.IsSuccess)
                {
                    return actionResponse;
                }
                actionResponse.SetResult(_mapper.Map<CustomerDTO>(customerUpdate.Result));
            }
            return actionResponse;
        }

        private string NewSecurityStamp()
        {
            byte[] bytes = new byte[20];
            _rng.GetBytes(bytes);
            return Base32.ToBase32(bytes);
        }
    }
}
