using AutoMapper;
using FluentValidation;
using SAMMI.ECOM.Core.Authorizations;
using SAMMI.ECOM.Core.Models;
using SAMMI.ECOM.Domain.Commands.Products;
using SAMMI.ECOM.Domain.DomainModels.Products;
using SAMMI.ECOM.Infrastructure.Repositories.Products;

namespace SAMMI.ECOM.API.Application.CommandHandlers.Products
{
    public class CUBrandCommandHandler : CustombaseCommandHandler<CUBrandCommand, BrandDTO>
    {
        private readonly IBrandRepository _brandRepository;
        public CUBrandCommandHandler(
            IBrandRepository brandRepository,
            UserIdentity currentUser,
            IMapper mapper) : base(currentUser, mapper)
        {
            _brandRepository = brandRepository;
        }

        public override async Task<ActionResponse<BrandDTO>> Handle(CUBrandCommand request, CancellationToken cancellationToken)
        {
            var actResponse = new ActionResponse<BrandDTO>();
            if (await _brandRepository.IsExistCode(request.Code, request.Id))
            {
                actResponse.AddError("Mã thương hiệu đã tồn tại");
                return actResponse;
            }
            if (await _brandRepository.IsExistName(request.Name, request.Id))
            {
                actResponse.AddError("Tên thương hiệu đã tồn tại");
                return actResponse;
            }

            if (request.Id == 0)
            {
                request.CreatedDate = DateTime.Now;
                request.CreatedBy = _currentUser.UserName;

                var createResponse = await _brandRepository.CreateAndSave(request);
                actResponse.Combine(createResponse);
                actResponse.SetResult(_mapper.Map<BrandDTO>(createResponse.Result));
            }
            else
            {
                request.UpdatedDate = DateTime.Now;
                request.UpdatedBy = _currentUser.UserName;

                var updateRes = await _brandRepository.UpdateAndSave(request);
                actResponse.Combine(updateRes);
                actResponse.SetResult(_mapper.Map<BrandDTO>(updateRes.Result));
            }

            return actResponse;
        }
    }


    public class CUBrandCommandValidator : AbstractValidator<CUBrandCommand>
    {
        public CUBrandCommandValidator()
        {
            RuleFor(x => x.Code)
                .NotEmpty()
                .WithMessage("Mã thương hiệu là bắt buộc");

            RuleFor(x => x.Name)
                .NotEmpty()
                .WithMessage("Tên thương hiệu là bắt buộc");
        }
    }
}
