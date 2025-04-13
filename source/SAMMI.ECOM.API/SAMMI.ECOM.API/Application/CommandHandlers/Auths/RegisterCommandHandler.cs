using AutoMapper;
using MediatR;
using SAMMI.ECOM.Core.Authorizations;
using SAMMI.ECOM.Core.Models;
using SAMMI.ECOM.Core.Models.GlobalConfigs;
using SAMMI.ECOM.Domain.Commands.Auth;
using SAMMI.ECOM.Infrastructure.Queries.Auth;
using SAMMI.ECOM.Infrastructure.Repositories.Auth;
using SAMMI.ECOM.Infrastructure;
using SAMMI.ECOM.Domain.DomainModels.Auth;
using FluentValidation;
using SAMMI.ECOM.Utility;
using SAMMI.ECOM.Infrastructure.Services.Auth.Helpers.PasswordVerification;
using Microsoft.AspNetCore.Identity;
using SAMMI.ECOM.Infrastructure.Services.Auth;

namespace SAMMI.ECOM.API.Application.CommandHandlers.Auths
{
    public class RegisterCommandHandler : CustombaseCommandHandler<RegisterCommand, RegisterResult>
    {
        private readonly IAuthenticationService<SAMMI.ECOM.Domain.AggregateModels.Others.User> _authService;
        public RegisterCommandHandler(
            UserIdentity currentUser,
            IMapper mapper) : base(currentUser, mapper)
        {
        }

        public override async Task<ActionResponse<RegisterResult>> Handle(RegisterCommand request, CancellationToken cancellationToken)
        {
            var actResponse = new ActionResponse<RegisterResult>();
            var errors = new List<UserIdentityError>();

            //var result = await PasswordValidator<User>.ValidateAsync(request.Password);
            //if (!result.Succeeded)
            //{
            //    errors.AddRange(result.Errors);
            //}
            //if (await PasswordValidator.ValidateAsync(request.Password))
            //{

            //}    
            return actResponse;
        }
    }

    public class RegisterCommandValidator : AbstractValidator<RegisterCommand>
    {
        public RegisterCommandValidator()
        {
            RuleFor(x => x.FirstName)
                .NotEmpty()
                .WithMessage("Họ không được bỏ trống.");

            RuleFor(x => x.LastName)
                .NotEmpty()
                .WithMessage("Tên không được bỏ trống.");

            RuleFor(x => x.Phone)
                .NotEmpty()
                .WithMessage("Điện thoại không được bỏ trống")
                .Length(10)
                .WithMessage("Điện thoại phải có đúng 10 chữ số")
                .Matches(@"^\d{10}$")
                .WithMessage("Điện thoại chỉ được chứa chữ số");

            RuleFor(x => x.Email)
                .Must(x => StringExtensions.IsValidEmail(x))
                .WithMessage("Email không đúng định dạng")
                .When(x => !string.IsNullOrEmpty(x.Email));

            RuleFor(x => x.Password)
                .NotEmpty()
                .WithMessage("Mật khẩu không được bỏ trống.");

            RuleFor(x => x.RePassword)
                .NotEmpty()
                .WithMessage("Xác nhận mật khẩu không được bỏ trống.")
                .Equal(x => x.Password)
                .WithMessage("Xác nhận mật khẩu không khớp với mật khẩu");
        }
    }
}
