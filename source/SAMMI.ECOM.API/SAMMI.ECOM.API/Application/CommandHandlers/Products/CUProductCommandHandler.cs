using AutoMapper;
using FluentValidation;
using SAMMI.ECOM.API.Services.MediaResource;
using SAMMI.ECOM.Core.Authorizations;
using SAMMI.ECOM.Core.Models;
using SAMMI.ECOM.Domain.Commands.Products;
using SAMMI.ECOM.Domain.DomainModels.Products;
using SAMMI.ECOM.Domain.Enums;
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
        private readonly IImageRepository _imageRepository;
        private readonly IFileStorageService _fileStoreService;
        private readonly ICloudinaryService _cloudinaryService;
        private readonly IConfiguration _config;
        public CUProductCommandHandler(
            IProductRepository productRepository,
            IBrandRepository brandRepository,
            IProductCategoryRepository categoryRepository,
            IImageRepository imageRepository,
            IFileStorageService fileStoreService,
            ICloudinaryService cloudinaryService,
            IConfiguration config,
            UserIdentity currentUser,
            IMapper mapper) : base(currentUser, mapper)
        {
            _productRepository = productRepository;
            _brandRepository = brandRepository;
            _categoryRepository = categoryRepository;
            _imageRepository = imageRepository;
            _fileStoreService = fileStoreService;
            _cloudinaryService = cloudinaryService;
            _config = config;
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

                var createRes = await _productRepository.CreateAndSave(request);
                actResponse.Combine(createRes);
                if (!createRes.IsSuccess)
                {
                    return actResponse;
                }

                var product = createRes.Result;

                if (request.Images != null && request.Images.Count > 0)
                {
                    foreach (var file in request.Images)
                    {
                        if (string.IsNullOrEmpty(file.ImageBase64))
                        {
                            actResponse.AddError("Chuỗi ImageBase64 không được bỏ trống");
                            return actResponse;
                        }
                        if (file.DisplayOrder == null || file.DisplayOrder == 0)
                        {
                            actResponse.AddError("Chuỗi ImageBase64 không được bỏ trống");
                            return actResponse;
                        }
                        string fileName = $"product_{product.Id}_{Guid.NewGuid()}";
                        string urlImage = await _cloudinaryService.UploadBase64Image(file.ImageBase64, fileName, ImageEnum.Product.ToString());
                        if (urlImage == null)
                        {
                            actResponse.AddError("Lỗi upload ảnh lên cloudinary");
                            return actResponse;
                        }
                        //var imageProduct = new Image()
                        //{
                        //    ProductId = product.Id,
                        //    ImageUrl = urlImage,
                        //    PublicId = $"{_config["CloundSettings:ImageProductFolder"]}/{fileName}",
                        //    CreatedDate = DateTime.Now,
                        //    CreatedBy = _currentUser.UserName,
                        //    IsActive = true,
                        //    IsDeleted = false,
                        //    DisplayOrder = file.DisplayOrder
                        //};
                        //await _imageRepository.CreateAndSave(imageProduct);
                    }
                    // upload server
                    //var listImage = new List<string>();
                    //foreach (var file in request.ImageFiles)
                    //{
                    //    string urlImage = await _fileStoreService.SaveFileImage(file);
                    //    if (urlImage != null)
                    //    {
                    //        var imageProduct = new ProductImage()
                    //        {
                    //            ProductId = product.Id,
                    //            ImageUrl = urlImage,
                    //        };
                    //        await _imageRepository.CreateAndSave(imageProduct);
                    //    }
                    //}
                }

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
        private readonly string[] _allowedExtensions = { ".jpg", ".jpeg", ".png", ".gif", ".bmp" };
        private readonly string[] _allowedMimeTypes = { "image/jpeg", "image/png", "image/gif", "image/bmp" };
        private const int MaxFileSize = 5 * 1024 * 1024;
        public CUProductCommandValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty()
                .WithMessage("Tên sản phẩm không được bỏ trống");

            RuleFor(x => x.Code)
                .NotEmpty()
                .WithMessage("Mã sản phẩm không được bỏ trống");

            //RuleFor(x => x.ImageFiles)
            //    .NotEmpty().WithMessage("Vui lòng tải lên ít nhất 1 hình ảnh")
            //    .Must(files => files.All(IsValidFile))
            //    .WithMessage("File tải lên phải là hình ảnh hợp lệ và không quá 5MB");
        }

        private bool IsValidFile(IFormFile file)
        {
            if (file == null || file.Length == 0) return false;

            var extension = Path.GetExtension(file.FileName)?.ToLower();
            if (!_allowedExtensions.Contains(extension)) return false;

            if (!_allowedMimeTypes.Contains(file.ContentType.ToLower())) return false;

            if (file.Length > MaxFileSize) return false;

            return true;
        }
    }
}
