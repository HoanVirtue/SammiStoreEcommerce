using AutoMapper;
using FluentValidation;
using MediatR;
using SAMMI.ECOM.Core.Authorizations;
using SAMMI.ECOM.Core.Models;
using SAMMI.ECOM.Domain.Commands.OrderBuy;
using SAMMI.ECOM.Domain.DomainModels.OrderBuy;
using SAMMI.ECOM.Domain.DomainModels.Products;
using SAMMI.ECOM.Domain.Enums;
using SAMMI.ECOM.Infrastructure.Repositories.OrderBy;
using SAMMI.ECOM.Infrastructure.Repositories.Products;

namespace SAMMI.ECOM.API.Application.CommandHandlers.OrderBuy
{
    public class CreateEventCommandHandler : CustombaseCommandHandler<CreateEventCommand, EventDTO>
    {
        private readonly IEventRepository _eventRepository;
        private readonly IMediator _mediator;
        private readonly IImageRepository _imageRepository;
        public CreateEventCommandHandler(
            IEventRepository eventRepository,
            IMediator mediator,
            IImageRepository imageRepository,
            UserIdentity currentUser,
            IMapper mapper) : base(currentUser, mapper)
        {
            _eventRepository = eventRepository;
            _mediator = mediator;
            _imageRepository = imageRepository;
        }

        public override async Task<ActionResponse<EventDTO>> Handle(CreateEventCommand request, CancellationToken cancellationToken)
        {
            var actResponse = new ActionResponse<EventDTO>();
            if (await _eventRepository.CheckExistCode(request.Code, request.Id))
            {
                actResponse.AddError("Mã chương trình khuyến mãi đã tồn tại");
                return actResponse;
            }

            request.ImageId = null;
            if (request.ImageCommand != null && !string.IsNullOrEmpty(request.ImageCommand.ImageBase64))
            {
                request.ImageCommand.TypeImage = ImageEnum.Event.ToString();
                request.ImageCommand.Value = "";
                var imageRes = await _mediator.Send(request.ImageCommand);
                if (!imageRes.IsSuccess)
                {
                    actResponse.AddError(imageRes.Message);
                    return actResponse;
                }
                request.ImageId = imageRes.Result.Id;
            }

            request.CreatedDate = DateTime.Now;
            request.CreatedBy = _currentUser.UserName;
            var createResponse = await _eventRepository.CreateAndSave(request);
            actResponse.Combine(createResponse);
            var eventCreated = createResponse.Result;

            foreach(var voucher in request.Vouchers)
            {
                voucher.Id = 0;
                voucher.EventId = eventCreated.Id;
                var createVoucherRes = await _mediator.Send(voucher);
                actResponse.Combine(createVoucherRes);
                if(!createVoucherRes.IsSuccess)
                {
                    return actResponse;
                }
            }

            actResponse.SetResult(_mapper.Map<EventDTO>(eventCreated));

            return actResponse;
        }
    }

    public class CreateEventCommandValidator : AbstractValidator<CreateEventCommand>
    {
        public CreateEventCommandValidator()
        {
            RuleFor(x => x.Code)
                .NotEmpty()
                .WithMessage("Mã chương trình khuyến mãi không được bỏ trống");

            RuleFor(x => x.Name)
                .NotEmpty()
                .WithMessage("Tên chương trình khuyến mãi không được bỏ trống");

            RuleFor(x => x.StartDate)
                .NotEmpty()
                .WithMessage("Ngày bắt đầu không được bỏ trống")
                .Must(x => x > DateTime.Now)
                .WithMessage("Ngày bắt đầu phải lớn hơn ngày hiện tại");

            RuleFor(x => x.EndDate)
                .NotEmpty()
                .WithMessage("Ngày kết thúc không được bỏ trống")
                .Must(x => x > DateTime.Now)
                .WithMessage("Ngày kết thúc phải lớn hơn ngày hiện tại")
                .GreaterThan(x => x.StartDate)
                .WithMessage("Ngày kết thúc phải lớn hơn ngày bắt đầu");

            RuleFor(x => x.Vouchers)
                .Must(x => x != null && x.Count > 0)
                .WithMessage("Danh sách phiếu giảm phải có ít nhất 1 phiếu giảm giá");
        }
    }

    public class UpdateEventCommandHandler : CustombaseCommandHandler<UpdateEventCommand, EventDTO>
    {
        private readonly IEventRepository _eventRepository;
        private readonly IMediator _mediator;
        private readonly IImageRepository _imageRepository;
        public UpdateEventCommandHandler(
            IEventRepository eventRepository,
            IMediator mediator,
            IImageRepository imageRepository,
            UserIdentity currentUser,
            IMapper mapper) : base(currentUser, mapper)
        {
            _eventRepository = eventRepository;
            _mediator = mediator;
            _imageRepository = imageRepository;
        }

        public override async Task<ActionResponse<EventDTO>> Handle(UpdateEventCommand request, CancellationToken cancellationToken)
        {
            var actResponse = new ActionResponse<EventDTO>();
            if (await _eventRepository.CheckExistCode(request.Code, request.Id))
            {
                actResponse.AddError("Mã chương trình khuyến mãi đã tồn tại");
                return actResponse;
            }


            ImageDTO imageDTO = null;
            var eventEntity = await _eventRepository.GetByIdAsync(request.Id);
            if (eventEntity.ImageId != request.ImageId)
            {
                actResponse.AddError("Không được thay đổi ImageId");
                return actResponse;
            }
            if (request.ImageCommand != null && !string.IsNullOrEmpty(request.ImageCommand.ImageBase64))
            {
                _imageRepository.DeleteAndSave(request.ImageId);
                request.ImageCommand.TypeImage = ImageEnum.Banner.ToString();
                request.ImageCommand.Value = "";
                request.ImageCommand.Id = 0;
                var imageRes = await _mediator.Send(request.ImageCommand);
                if (!imageRes.IsSuccess)
                {
                    actResponse.AddError(imageRes.Message);
                    return actResponse;
                }
                imageDTO = imageRes.Result;
            }

            if (imageDTO != null)
            {
                request.ImageId = imageDTO.Id;
            }
            request.UpdatedDate = DateTime.Now;
            request.UpdatedBy = _currentUser.UserName;

            var updateRes = await _eventRepository.UpdateAndSave(request);
            actResponse.Combine(updateRes);
            actResponse.SetResult(_mapper.Map<EventDTO>(updateRes.Result));

            return actResponse;
        }
    }

    public class UpdateEventCommandValidator : AbstractValidator<UpdateEventCommand>
    {
        public UpdateEventCommandValidator()
        {
            RuleFor(x => x.Code)
                .NotEmpty()
                .WithMessage("Mã chương trình khuyến mãi không được bỏ trống");

            RuleFor(x => x.Name)
                .NotEmpty()
                .WithMessage("Tên chương trình khuyến mãi không được bỏ trống");

            RuleFor(x => x.StartDate)
                .NotEmpty()
                .WithMessage("Ngày bắt đầu không được bỏ trống")
                .Must(x => x > DateTime.Now)
                .WithMessage("Ngày bắt đầu phải lớn hơn ngày hiện tại");

            RuleFor(x => x.EndDate)
                .NotEmpty()
                .WithMessage("Ngày kết thúc không được bỏ trống")
                .Must(x => x > DateTime.Now)
                .WithMessage("Ngày kết thúc phải lớn hơn ngày hiện tại")
                .GreaterThan(x => x.StartDate)
                .WithMessage("Ngày kết thúc phải lớn hơn ngày bắt đầu");
        }
    }
}
