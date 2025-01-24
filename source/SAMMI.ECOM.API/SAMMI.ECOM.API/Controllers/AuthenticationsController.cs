using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SAMMI.ECOM.Domain.AggregateModels.Others;
using SAMMI.ECOM.Domain.Commands.Auth;
using SAMMI.ECOM.Domain.ModelViews;
using SAMMI.ECOM.I18N.Auths;
using SAMMI.ECOM.Infrastructure.Repositories;
using SAMMI.ECOM.Infrastructure.Services.Auth;

namespace SAMMI.ECOM.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationsController : CustomBaseController
    {
        private readonly IUsersRepository _userRepository;
        private readonly IAuthenticationService<User> _authService;
        public AuthenticationsController(
            IUsersRepository userRepository,
            IAuthenticationService<User> authService,
            IMediator mediator,
            ILogger<AuthenticationsController> logger) : base(mediator, logger)
        {
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
                var genrateTokenResult = _mediator.Send(new GenerateTokenCommand
                {
                    Username = request.Username,
                });

            }

            return Ok();
        }
    }
}
