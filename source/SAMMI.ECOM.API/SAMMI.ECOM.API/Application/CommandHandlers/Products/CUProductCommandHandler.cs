using AutoMapper;
using FluentValidation;
using SAMMI.ECOM.Core.Authorizations;
using SAMMI.ECOM.Core.Models;
using SAMMI.ECOM.Domain.Commands.Products;
using SAMMI.ECOM.Domain.DomainModels.Products;
using SAMMI.ECOM.Infrastructure.Repositories.Brands;
using SAMMI.ECOM.Infrastructure.Repositories.ProductCategorys;
using SAMMI.ECOM.Infrastructure.Repositories.ProductImages;
using SAMMI.ECOM.Infrastructure.Repositories.Products;

namespace SAMMI.ECOM.API.Application.CommandHandlers.Products
{
    public class CUProductCommandHandler : CustombaseCommandHandler<CUProductCommand, ProductDTO>
    {
        private readonly IProductRepository _productRepository;
        private readonly IBrandRepository _brandRepository;
        private readonly IProductCategoryRepository _categoryRepository;
        private readonly IProductImageRepository _imageRepository;

        public CUProductCommandHandler(
            IProductRepository productRepository,
            IBrandRepository brandRepository,
            IProductCategoryRepository categoryRepository,
            IProductImageRepository imageRepository,
            UserIdentity currentUser,
            IMapper mapper) : base(currentUser, mapper)
        {
            _productRepository = productRepository;
            _brandRepository = brandRepository;
            _categoryRepository = categoryRepository;
            _imageRepository = imageRepository;
        }

        public override async Task<ActionResponse<ProductDTO>> Handle(CUProductCommand request, CancellationToken cancellationToken)
        {
            var actResponse = new ActionResponse<ProductDTO>();
            if (await _productRepository.IsExistCode(request.Code, request.Id))
            {
                actResponse.AddError("Mã sản phẩm đã tồn tại");
                return actResponse;
            }

            if (!_brandRepository.IsExisted(request.BrandId))
            {
                actResponse.AddError("Mã thương hiệu không tồn tại");
                return actResponse;
            }

            if (!_categoryRepository.IsExisted(request.CategoryId))
            {
                actResponse.AddError("Mã loại sản phẩm không tồn tại");
                return actResponse;
            }

            if (request.Id == 0)
            {
                request.CreatedDate = DateTime.Now;
                request.CreatedBy = _currentUser.UserName;

                var createRes = _productRepository.Create(request);
                actResponse.Combine(createRes);
                if (!createRes.IsSuccess)
                {
                    return actResponse;
                }

                if (request.Images != null && request.Images.Count > 0)
                {

                }

                await _productRepository.SaveChangeAsync();
                actResponse.SetResult(_mapper.Map<ProductDTO>(createRes.Result));
            }
            else
            {
                request.UpdatedDate = DateTime.Now;
                request.UpdatedBy = _currentUser.UserName;

                var updateRes = await _productRepository.UpdateAndSave(request);
                actResponse.Combine(updateRes);
                actResponse.SetResult(_mapper.Map<ProductDTO>(updateRes.Result));
            }


            return actResponse;
        }

    }

    public class CUProductCommandValidator : AbstractValidator<CUProductCommand>
    {
        public CUProductCommandValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty()
                .WithMessage("Tên sản phẩm là bắt buộc");

            RuleFor(x => x.Code)
                .NotEmpty()
                .WithMessage("Mã sản phẩm là bắt buộc");
        }
    }
}
