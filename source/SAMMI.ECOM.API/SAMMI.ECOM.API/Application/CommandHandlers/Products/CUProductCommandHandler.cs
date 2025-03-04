using AutoMapper;
using FluentValidation;
using MediatR;
using SAMMI.ECOM.API.Services.MediaResource;
using SAMMI.ECOM.Core.Authorizations;
using SAMMI.ECOM.Core.Models;
using SAMMI.ECOM.Domain.AggregateModels.Products;
using SAMMI.ECOM.Domain.Commands.Products;
using SAMMI.ECOM.Domain.DomainModels.Products;
using SAMMI.ECOM.Domain.Enums;
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
        private readonly IMediator _mediator;
        private readonly IProductImageRepository _productImageRepository;
        public CUProductCommandHandler(
            IProductRepository productRepository,
            IBrandRepository brandRepository,
            IProductCategoryRepository categoryRepository,
            IImageRepository imageRepository,
            IFileStorageService fileStoreService,
            ICloudinaryService cloudinaryService,
            IConfiguration config,
            IMediator mediator,
            IProductImageRepository productImageRepository,
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
            _productImageRepository = productImageRepository;
            _mediator = mediator;
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

            request.Discount = 1 > request.Discount ? request.Discount : request.Discount / 100;
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
                    foreach (var image in request.Images)
                    {
                        if (image.DisplayOrder == null || image.DisplayOrder == 0)
                        {
                            actResponse.AddError("Thứ tự hình ảnh phải > 0");
                            return actResponse;
                        }
                        image.Value = product.Id;
                        image.TypeImage = ImageEnum.Product.ToString();
                        var createImage = await _mediator.Send(image);
                        if (createImage.IsSuccess)
                        {
                            var createProductImage = new ProductImage()
                            {
                                ProductId = product.Id,
                                ImageId = createImage.Result.Id,
                                CreatedDate = DateTime.Now,
                                CreatedBy = "System"
                            };
                            actResponse.Combine(await _productImageRepository.CreateAndSave(createProductImage));
                            if (!actResponse.IsSuccess)
                            {
                                return actResponse;
                            }
                        }
                        else
                        {
                            actResponse.AddError(createImage.Message);
                            return actResponse;
                        }
                    }
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

            RuleFor(x => x.Discount)
                .GreaterThan(0)
                .WithMessage("Giảm giá phải lớn hơn 0 nếu có ngày bắt đầu và ngày kết thúc")
                .When(x => x.StartDate.HasValue && x.EndDate.HasValue);

            RuleFor(x => x.StartDate)
                .NotEmpty()
                .WithMessage("Phải nhập ngày bắt đầu nếu đã nhập ngày kết thúc hoặc có giảm giá")
                .When(x => x.EndDate.HasValue || (x.Discount.HasValue && x.Discount > 0));

            RuleFor(x => x.EndDate)
                .NotEmpty()
                .WithMessage("Phải nhập ngày kết thúc nếu đã nhập ngày bắt đầu hoặc có giảm giá")
                .When(x => x.StartDate.HasValue || (x.Discount.HasValue && x.Discount > 0));

            RuleFor(x => x.EndDate)
                .GreaterThanOrEqualTo(x => x.StartDate)
                .WithMessage("Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu")
                .When(x => x.StartDate.HasValue);


            RuleFor(x => x.StartDate)
                .NotEmpty()
                .WithMessage("Ngày bắt đầu không được để trống khi có giảm giá")
                .Must(x => x.HasValue && x > DateTime.Now)
                .WithMessage("Ngày bắt đầu phải lớn hơn ngày hiện tại")
                .When(x => x.Discount.HasValue && x.Discount > 0);

            RuleFor(x => x.EndDate)
                .NotEmpty()
                .WithMessage("Ngày kết thúc không được để trống khi có giảm giá")
                .Must(x => x.HasValue && x > DateTime.Now)
                .WithMessage("Ngày kết thúc phải lớn hơn ngày hiện tại")
                .When(x => x.Discount.HasValue && x.Discount > 0);

            RuleFor(x => x.Images)
                .NotEmpty()
                .WithMessage("Danh sách hình ảnh không được bỏ trống")
                .Must(x => x != null && x.Any())
                .WithMessage("Phải có ít nhất 1 hình ảnh")
                .Must(images => images.All(image => IsValidBase64(image.ImageBase64)))
                .WithMessage("Tất cả hình ảnh phải là chuỗi Base64 hợp lệ.");
        }

        public static bool IsValidBase64(string base64)
        {
            Span<byte> buffer = new Span<byte>(new byte[base64.Length]);
            return Convert.TryFromBase64String(base64, buffer, out int bytesParsed);
        }
    }
}
