using AutoMapper;
using FluentValidation;
using SAMMI.ECOM.Core.Authorizations;
using SAMMI.ECOM.Core.Models;
using SAMMI.ECOM.Domain.Commands.OrderBuy;
using SAMMI.ECOM.Domain.DomainModels.OrderBuy;
using SAMMI.ECOM.Infrastructure.Repositories.OrderBy;

namespace SAMMI.ECOM.API.Application.CommandHandlers.OrderBuy
{
    public class CUEventCommandHandler : CustombaseCommandHandler<CUEventCommand, EventDTO>
    {
        private readonly IEventRepository _eventRepository;

        public CUEventCommandHandler(
            IEventRepository eventRepository,
            UserIdentity currentUser,
            IMapper mapper) : base(currentUser, mapper)
        {
            _eventRepository = eventRepository;
        }

        public override async Task<ActionResponse<EventDTO>> Handle(CUEventCommand request, CancellationToken cancellationToken)
        {
            var actResponse = new ActionResponse<EventDTO>();

            if (request.StartDate > request.EndDate)
            {
                actResponse.AddError("Ngày bắt đầu phải nhỏ hơn ngày kết thúc");
                return actResponse;
            }

            if (await _eventRepository.CheckExistCode(request.Code, request.Id))
            {
                actResponse.AddError("Mã chương trình khuyến mãi đã tồn tại");
                return actResponse;
            }


            if (request.Id == 0)
            {
                request.CreatedDate = DateTime.Now;
                request.CreatedBy = _currentUser.UserName;
                var createResponse = await _eventRepository.CreateAndSave(request);
                actResponse.Combine(createResponse);
                actResponse.SetResult(_mapper.Map<EventDTO>(createResponse.Result));
            }
            else
            {
                request.UpdatedDate = DateTime.Now;
                request.UpdatedBy = _currentUser.UserName;

                var updateRes = await _eventRepository.UpdateAndSave(request);
                actResponse.Combine(updateRes);
                actResponse.SetResult(_mapper.Map<EventDTO>(updateRes.Result));
            }

            return actResponse;
        }
    }

    public class CUEventCommandValidator : AbstractValidator<CUEventCommand>
    {
        public CUEventCommandValidator()
        {
            RuleFor(x => x.Code)
                .NotEmpty()
                .WithMessage("Mã chương trình khuyến mãi không được bỏ trống");

            RuleFor(x => x.Name)
                .NotEmpty()
                .WithMessage("Tên chương trình khuyến mãi không được bỏ trống");

            RuleFor(x => x.StartDate)
                .NotEmpty()
                .WithMessage("Ngày bắt đầu không được bỏ trống");

            RuleFor(x => x.EndDate)
                .NotEmpty()
                .WithMessage("Ngày kết thúc không được bỏ trống");
        }
    }
}
