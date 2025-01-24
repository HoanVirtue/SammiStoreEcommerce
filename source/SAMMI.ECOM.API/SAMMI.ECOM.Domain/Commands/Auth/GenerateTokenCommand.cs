using MediatR;
using SAMMI.ECOM.Core.Models;
using SAMMI.ECOM.Domain.DomainModels.Auth;

namespace SAMMI.ECOM.Domain.Commands.Auth
{
    public class GenerateTokenCommand : IRequest<ActionResponse<AuthTokenResult>>
    {
        public string? Username { get; set; }
        public int? UserId { get; set; }
        public GenerateTokenCommand()
        {

        }
    }
}
