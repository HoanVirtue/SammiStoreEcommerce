using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SAMMI.ECOM.Core.Authorizations;
using SAMMI.ECOM.Core.Models;
using SAMMI.ECOM.Domain.AggregateModels.Others;
using SAMMI.ECOM.Domain.Commands.Auth;
using SAMMI.ECOM.Domain.Enums;
using SAMMI.ECOM.Domain.ModelViews;
using SAMMI.ECOM.I18N.Auths;
using SAMMI.ECOM.Infrastructure.Repositories;
using SAMMI.ECOM.Infrastructure.Services.Auth;

namespace SAMMI.ECOM.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : CustomBaseController
    {
        private readonly IUsersRepository _userRepository;
        private readonly IAuthenticationService<User> _authService;
        public AuthController(
            IUsersRepository userRepository,
            IAuthenticationService<User> authService,
            UserIdentity currentUser,
            IMediator mediator,
            ILogger<UsersController> logger) : base(mediator, logger)
        {
            UserIdentity = currentUser;
            _userRepository = userRepository;
            _authService = authService;
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("login")]
        public async Task<IActionResult> Login(LoginViewModel request)
        {
            if (string.IsNullOrEmpty(request.Username))
            {
                return BadRequest(string.Format(SignInError.UserNameEmpty, request.Username));
            }

            if (string.IsNullOrEmpty(request.Password))
            {
                return BadRequest(string.Format(SignInError.PaswordEmpty, request.Username));
            }

            var signInRes = await _authService.PasswordSignInAsync(request.Username,
                request.Password,
                request.RememberMe,
                false);
            if (signInRes.Succeeded)
            {
                var genrateTokenResult = await _mediator.Send(new GenerateTokenCommand
                {
                    Username = request.Username,
                    TypeUser = request.IsEmployee == true ? TypeUserEnum.Employee : TypeUserEnum.Customer,
                });

                if (genrateTokenResult.IsSuccess)
                {
                    return Ok(genrateTokenResult);
                }

                return BadRequest(genrateTokenResult);
            }

            if (signInRes.IsLockedOut)
            {
                return BadRequest(string.Format(SignInError.UserIsLocked, request.Username));
            }
            if (signInRes.IsNotExisted)
            {
                return BadRequest(string.Format(SignInError.UserNotExisted, request.Username));
            }
            return BadRequest(SignInError.PasswordMismatch);
        }

        [HttpPost("refreshtoken")]
        [AllowAnonymous]
        public async Task<IActionResult> RefreshTokenAsync(RefreshTokenCommand request)
        {
            var refreshTokenResult = await _mediator.Send(request);
            if (refreshTokenResult.IsSuccess)
            {
                return BadRequest(refreshTokenResult);
            }

            return Ok(refreshTokenResult);
        }


        [HttpPost("change-password")]
        [AllowAnonymous]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordModelView request)
        {
            if (string.IsNullOrEmpty(UserIdentity!.UserName))
            {
                return BadRequest(ActionResponse<ChangePasswordModelView>.Failed("Vui lòng đăng nhập hệ thống."));
            }
            if (string.IsNullOrEmpty(request.OldPassword))
            {
                return BadRequest(ActionResponse<ChangePasswordModelView>.Failed("Mật khẩu cũ không được bỏ trống"));
            }
            if (string.IsNullOrEmpty(request.NewPassword))
            {
                return BadRequest(ActionResponse<ChangePasswordModelView>.Failed("Mật khẩu mới không được bỏ trống"));
            }
            if (string.IsNullOrEmpty(request.ConfirmPassword))
            {
                return BadRequest(ActionResponse<ChangePasswordModelView>.Failed("Xác nhận mật khẩu không được bỏ trống"));
            }
            if (string.Compare(request.NewPassword, request.ConfirmPassword) != 0)
            {
                return BadRequest(ActionResponse<ChangePasswordModelView>.Failed("Xác nhận mật khẩu mới không đúng"));
            }

            var actionResponse = await _authService.ChangePassword(UserIdentity!.UserName!, request.OldPassword!, request.NewPassword!);
            if (!actionResponse.Succeeded)
            {
                return BadRequest(actionResponse);
            }
            return Ok(actionResponse);
        }

        [HttpPost("change-password-user")]
        public async Task<IActionResult> ChangePasswordForUser([FromBody] ChangePasswordUserModelView request)
        {
            if (string.IsNullOrEmpty(request.NewPassword))
            {
                return BadRequest(ActionResponse<ChangePasswordModelView>.Failed("Mật khẩu mới không được bỏ trống"));
            }
            if (string.IsNullOrEmpty(request.ConfirmPassword))
            {
                return BadRequest(ActionResponse<ChangePasswordModelView>.Failed("Xác nhận mật khẩu không được bỏ trống"));
            }
            if (string.Compare(request.NewPassword, request.ConfirmPassword) != 0)
            {
                return BadRequest(ActionResponse<ChangePasswordModelView>.Failed("Xác nhận mật khẩu mới không đúng"));
            }

            var actResponse = await _authService.ChangePasswordUser(request.Username, request.NewPassword);
            if (!actResponse.Succeeded)
                return BadRequest(actResponse);
            return Ok(actResponse);
        }
    }
}
