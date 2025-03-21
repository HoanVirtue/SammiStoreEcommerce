using AutoMapper;
using FluentValidation;
using SAMMI.ECOM.Core.Authorizations;
using SAMMI.ECOM.Core.Models;
using SAMMI.ECOM.Domain.Commands;
using SAMMI.ECOM.Domain.DomainModels.CategoryAddress;
using SAMMI.ECOM.Infrastructure.Repositories.AddressCategory;

namespace SAMMI.ECOM.API.Application.CommandHandlers
{
    public class CUCustomerAddressCommandHandler : CustombaseCommandHandler<CUCustomerAddressCommand, CustomerAddressDTO>
    {
        private readonly ICustomerAddressRepository _addressRepository;
        private readonly IWardRepository _wardRepository;

        public CUCustomerAddressCommandHandler(
            ICustomerAddressRepository addressRepository,
            IWardRepository wardRepository,
            UserIdentity currentUser,
            IMapper mapper) : base(currentUser, mapper)
        {
            _addressRepository = addressRepository;
            _wardRepository = wardRepository;
        }

        public override async Task<ActionResponse<CustomerAddressDTO>> Handle(CUCustomerAddressCommand request, CancellationToken cancellationToken)
        {
            var actResponse = new ActionResponse<CustomerAddressDTO>();

            if (!_wardRepository.IsExisted(request.WardId))
            {
                actResponse.AddError("Mã xã phường không tồn tại.");
                return actResponse;
            }

            if (request.Id == 0)
            {
                request.CustomerId = _currentUser.Id;
                request.CreatedDate = DateTime.Now;
                request.CreatedBy = _currentUser.UserName;
                var createResponse = await _addressRepository.CreateAndSave(request);
                actResponse.Combine(createResponse);
                actResponse.SetResult(_mapper.Map<CustomerAddressDTO>(createResponse.Result));
            }
            else
            {
                request.UpdatedDate = DateTime.Now;
                request.UpdatedBy = _currentUser.UserName;

                var updateRes = await _addressRepository.UpdateAndSave(request);
                actResponse.Combine(updateRes);
                actResponse.SetResult(_mapper.Map<CustomerAddressDTO>(updateRes.Result));
            }

            return actResponse;
        }
    }

    public class CUCustomerAddressCommandValidator : AbstractValidator<CUCustomerAddressCommand>
    {
        public CUCustomerAddressCommandValidator()
        {
            RuleFor(x => x.StreetAddress)
                .NotEmpty()
                .WithMessage("Địa chỉ cụ thể là bắt buộc");

            RuleFor(x => x.WardId)
                .Must(x => x != null && x != 0)
                .WithMessage("Chọn địa chỉ nhận là bắt buộc");
        }
    }
}
