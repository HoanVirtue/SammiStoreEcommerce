using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Authentication.OAuth;
using Microsoft.EntityFrameworkCore;
using SAMMI.ECOM.Domain.AggregateModels.Others;
using SAMMI.ECOM.Infrastructure.Repositories;
using System.Security.Claims;

namespace SAMMI.ECOM.API.Infrastructure.Configuration
{
    public class GoogleAuthenticationHandler
    {
        private readonly IUsersRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IMediator _mediator;
        public GoogleAuthenticationHandler(
            IUsersRepository userRepository,
            IMapper mapper,
            IMediator mediator
            )
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _mediator = mediator;
        }
        public async Task HandleOnCreatingTicket(OAuthCreatingTicketContext context)
        {
            // Lấy thông tin từ Google
            var googleId = context.Principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var email = context.Principal.FindFirst(ClaimTypes.Email)?.Value;
            var name = context.Principal.FindFirst(ClaimTypes.Name)?.Value;
            var surname = context.Principal.FindFirst(ClaimTypes.Surname)?.Value;
            var picture = context.Principal.FindFirst("picture")?.Value;

            if (string.IsNullOrEmpty(googleId) || string.IsNullOrEmpty(email))
            {
                context.Fail("Không thể lấy thông tin người dùng từ Google.");
                return;
            }

            // Tìm hoặc tạo người dùng
            var user = await _userRepository.GetByEmail(email);
            if (user == null)
            {
                user = new User
                {
                    Email = email,
                    FullName = name
                };
                //_dbContext.Users.Add(user);
                //await _dbContext.SaveChangesAsync();
            }

            // Thêm claims tùy chỉnh
            var claims = new List<Claim>
            {
                new Claim("UserId", user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                //new Claim(ClaimTypes.Name, user.Name ?? user.Email)
            };

            context.Principal.AddIdentity(new ClaimsIdentity(claims));
        }
    }
}
