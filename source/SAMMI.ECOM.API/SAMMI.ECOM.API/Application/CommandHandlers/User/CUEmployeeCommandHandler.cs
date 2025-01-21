using AutoMapper;
using SAMMI.ECOM.Core.Authorizations;
using SAMMI.ECOM.Core.Models;
using SAMMI.ECOM.Domain.Commands.User;
using SAMMI.ECOM.Domain.DomainModels.Users;
using SAMMI.ECOM.Domain.Enums;
using SAMMI.ECOM.Infrastructure.Repositories;
using SAMMI.ECOM.Infrastructure.Repositories.AddressCategory;
using SAMMI.ECOM.Infrastructure.Services.Auth;
using SAMMI.ECOM.Infrastructure.Services.Auth.Helpers;
using System.Security.Cryptography;

namespace SAMMI.ECOM.API.Application.CommandHandlers.User
{
    public class CUEmployeeCommandHandler : CustombaseCommandHandler<CUEmployeeCommand, EmployeeDTO>
    {
        private readonly IUsersRepository _userRepository;
        private readonly IAuthenticationService<SAMMI.ECOM.Domain.AggregateModels.Others.User> _authService;
        private readonly IWardRepository _wardRepository;
        public CUEmployeeCommandHandler(IUsersRepository userRepository,
            IAuthenticationService<SAMMI.ECOM.Domain.AggregateModels.Others.User> authService,
            IWardRepository wardRepository,
            UserIdentity currentUser,
            IMapper mapper) : base(currentUser, mapper)
        {
            _authService = authService;
            _userRepository = userRepository;
            _wardRepository = wardRepository;
        }

        private static readonly RandomNumberGenerator _rng = RandomNumberGenerator.Create();


        public override async Task<ActionResponse<EmployeeDTO>> Handle(CUEmployeeCommand request, CancellationToken cancellationToken)
        {
            var actionResponse = new ActionResponse<EmployeeDTO>();

            #region validate
            if (await _userRepository.IsExistCode(request.Code, request.Id))
            {
                actionResponse.AddError("Mã nhân viên đã tồn tại");
                return actionResponse;
            }

            if (await _userRepository.IsExistUsername(request.Username, request.Id))
            {
                actionResponse.AddError("Tên tài khoản đã tồn tại");
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

            if (request.Id == 0)
            {
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


                actionResponse.SetResult(_mapper.Map<EmployeeDTO>(employee));
            }
            else
            {

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
