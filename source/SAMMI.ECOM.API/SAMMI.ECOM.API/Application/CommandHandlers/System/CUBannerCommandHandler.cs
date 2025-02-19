using AutoMapper;
using MediatR;
using SAMMI.ECOM.Core.Authorizations;
using SAMMI.ECOM.Core.Models;
using SAMMI.ECOM.Domain.Commands.System;
using SAMMI.ECOM.Domain.DomainModels.System;
using SAMMI.ECOM.Infrastructure.Repositories.Products;
using SAMMI.ECOM.Infrastructure.Repositories.System;

namespace SAMMI.ECOM.API.Application.CommandHandlers.System
{
    public class CUBannerCommandHandler : CustombaseCommandHandler<CUBannerCommand, BannerDTO>
    {
        private readonly IBannerRepository _bannerRepository;
        private readonly IMediator _mediator;
        private readonly IImageRepository _imageRepository;

        public CUBannerCommandHandler(
            IBannerRepository bannerRepository,
            IMediator mediator,
            IImageRepository imageRepository,
            UserIdentity currentUser, IMapper mapper) : base(currentUser, mapper)
        {
            _bannerRepository = bannerRepository;
            _mediator = mediator;
            _imageRepository = imageRepository;
        }

        public override async Task<ActionResponse<BannerDTO>> Handle(CUBannerCommand request, CancellationToken cancellationToken)
        {
            var actResponse = new ActionResponse<BannerDTO>();


            if (request.Id == 0)
            {
                if (request.Image == null || string.IsNullOrEmpty(request.Image.ImageBase64))
                {
                    actResponse.AddError("Hình ảnh banner không được bỏ trống");
                    return actResponse;
                }
                request.CreatedDate = DateTime.Now;
                request.CreatedBy = _currentUser.UserName;
                var createResponse = await _bannerRepository.CreateAndSave(request);
                actResponse.Combine(createResponse);
                if (!actResponse.IsSuccess)
                {
                    return actResponse;
                }
                var banner = createResponse.Result;

                var imageRes = await _mediator.Send(request.Image);
                if (!imageRes.IsSuccess)
                {
                    actResponse.AddError(imageRes.Message);
                    return actResponse;
                }
                banner.ImageId = imageRes.Result.Id;
                await _bannerRepository.SaveChangeAsync();

                actResponse.SetResult(_mapper.Map<BannerDTO>(banner));
            }
            else
            {
                if (!_imageRepository.IsExisted(request.ImageId))
                {
                    actResponse.AddError($"Không tồn tại hình ảnh có mã {request.ImageId}");
                    return actResponse;
                }

                request.UpdatedDate = DateTime.Now;
                request.UpdatedBy = _currentUser.UserName;

                var updateRes = await _bannerRepository.UpdateAndSave(request);
                actResponse.Combine(updateRes);
                if (!actResponse.IsSuccess)
                {
                    return actResponse;
                }

                var banner = updateRes.Result;
                if (request.Image != null && !string.IsNullOrEmpty(request.Image.ImageBase64))
                {
                    _imageRepository.DeleteAndSave(request.ImageId);
                    var imageRes = await _mediator.Send(request.Image);
                    if (!imageRes.IsSuccess)
                    {
                        actResponse.AddError(imageRes.Message);
                        return actResponse;
                    }
                    banner.ImageId = imageRes.Result.Id;
                    await _bannerRepository.SaveChangeAsync();
                }
                actResponse.SetResult(_mapper.Map<BannerDTO>(updateRes.Result));
            }

            return actResponse;
        }
    }
}
