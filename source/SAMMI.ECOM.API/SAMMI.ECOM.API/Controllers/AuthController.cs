using System.Security.Claims;
using MediatR;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Nest;
using SAMMI.ECOM.Core.Authorizations;
using SAMMI.ECOM.Core.Models;
using SAMMI.ECOM.Core.Utillity;
using SAMMI.ECOM.Domain.AggregateModels.Others;
using SAMMI.ECOM.Domain.Commands.Auth;
using SAMMI.ECOM.Domain.Enums;
using SAMMI.ECOM.Domain.ModelViews;
using SAMMI.ECOM.I18N.Auths;
using SAMMI.ECOM.Infrastructure.Queries.Auth;
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
        private readonly EmailHelper emailHelper;
        private readonly IConfiguration _config;
        public AuthController(
            IUsersRepository userRepository,
            IAuthenticationService<User> authService,
            IConfiguration config,
            UserIdentity currentUser,
            IMediator mediator,
            ILogger<UsersController> logger) : base(mediator, logger)
        {
            UserIdentity = currentUser;
            _userRepository = userRepository;
            _authService = authService;
            emailHelper = new EmailHelper(config);
            _config = config;
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

            if (signInRes.IsNotExisted)
            {
                return BadRequest(string.Format(SignInError.UserNotExisted, request.Username));
            }
            if(signInRes.IsNotVerify)
            {
                return BadRequest(SignInError.UserNotVerify);
            }
            if (signInRes.IsLockedOut)
            {
                return BadRequest(string.Format(SignInError.UserIsLocked, request.Username));
            }
            
            return BadRequest(SignInError.PasswordMismatch);
        }

        [AllowAnonymous]
        [HttpGet("external-login")]
        public IActionResult ExternalLogin(string provider = "Google")
        {
            var properties = new AuthenticationProperties { RedirectUri = "" };
            var _baseUrl = _config["ApplicationSettings:BaseUrl"];
            var _clientId = _config["Authentication:Google:ClientId"];
            var _scope = _config["Authentication:Google:Scope"];
            var redirectUri = $"{_baseUrl}/api/auth/google-login";

            var parameters = new Dictionary<string, string>
                {
                    { "client_id", _clientId },
                    { "response_type", "code" },
                    { "redirect_uri", redirectUri },
                    { "scope", _scope },
                    { "state", Guid.NewGuid().ToString() }, // Tạo state ngẫu nhiên để bảo mật
                    { "access_type", "offline" }, // Để nhận refresh token (tùy chọn)
                    { "prompt", "consent" } // Yêu cầu người dùng đồng ý (tùy chọn)
                };

            var queryString = string.Join("&", parameters.Select(p => $"{p.Key}={Uri.EscapeDataString(p.Value)}"));
            var redirectUrl = $"https://accounts.google.com/o/oauth2/v2/auth?{queryString}";

            return Ok(new { RedirectUrl = redirectUrl });
        }

        [HttpGet("google-login")]
        public async Task<IActionResult> GoogleLoginAsync()
        {
            _logger.LogInformation("Processing GoogleLoginAsync for UserId: {UserId}", UserIdentity?.Id);
            var userIdClaim = HttpContext.User.FindFirst(GlobalClaimsTypes.LocalId)?.Value;
            var userNameClaim = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (UserIdentity?.Id == 0 || UserIdentity?.Id == null)
            {
                return Unauthorized("Không tìm thấy thông tin đăng nhập từ Google. Vui lòng thử lại.");
            }

            if(string.IsNullOrEmpty(UserIdentity.UserName))
            {
                return BadRequest("Thông tin người dùng không hợp lệ. Vui lòng thử lại sau");
            }

            var generateTokenRes = await _mediator.Send(new GenerateTokenCommand()
            {
                Username = UserIdentity.UserName,
                TypeUser = TypeUserEnum.Customer,
            });

            if (generateTokenRes.IsSuccess)
            {
                return Ok(generateTokenRes);
            }

            return BadRequest(generateTokenRes);
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("register")]
        public async Task<IActionResult> RegisterAsync([FromBody]RegisterCommand request)
        {
            var registerRes = await _mediator.Send(request);
            if(!registerRes.IsSuccess)
            {
                return BadRequest(registerRes);
            }
            return Ok(registerRes);
        }

        [AllowAnonymous]
        [HttpGet("verify-email")]
        public async Task<IActionResult> VerifyEmail([FromQuery]string token)
        {
            if(string.IsNullOrEmpty(token))
            {
                return Redirect($"{_config["EmailSettings:ErrorUrl"]}?message={Uri.EscapeUriString("Liên kết xác nhận không hợp lệ.")}");
            }    
            var verifyRes = await _userRepository.VerifyToken(token);
            if (!verifyRes.IsSuccess)
            {
                return Redirect($"{_config["EmailSettings:ErrorUrl"]}?message={Uri.EscapeUriString(verifyRes.Message)}");
            }

            return Redirect($"{_config["EmailSettings:RedirectUrl"]}?message={Uri.EscapeUriString("Email của bạn đã được xác nhận thành công. Vui lòng đăng nhập để tiếp tục.")}");
        }

        [AllowAnonymous]
        [HttpGet("resend-verify-code")]
        public async Task<IActionResult> ResendVerifyEmailAsync([FromQuery]string email)
        {
            var actionRes = new ActionResponse();
            if (string.IsNullOrEmpty(email))
            {
                actionRes.AddError("Email không được bỏ trống");
                return BadRequest(actionRes);
            }
            var user = await _userRepository.GetByEmail(email);
            if (user == null)
            {
                actionRes.AddError("Email không tồn tại trong hệ thống.");
                return BadRequest(actionRes);
            }

            if (user.IsVerify == true)
            {
                actionRes.AddError("Tài khoản đã được xác minh. Vui lòng đăng nhập.");
                return BadRequest(actionRes);
            }

            user.VerifyToken = _authService.CreateVerifyToken();
            user.VerifiedAt = DateTime.Now;
            actionRes.Combine(await _userRepository.UpdateAndSave(user));
            if (!actionRes.IsSuccess)
            {
                return BadRequest(actionRes);
            }

            emailHelper.SendEmailVerify(user.Email, user.FullName, user.VerifyToken);
            return Ok(actionRes);
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
