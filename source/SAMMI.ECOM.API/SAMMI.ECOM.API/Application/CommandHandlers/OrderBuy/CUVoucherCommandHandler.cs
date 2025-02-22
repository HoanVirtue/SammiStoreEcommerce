using AutoMapper;
using FluentValidation;
using SAMMI.ECOM.Core.Authorizations;
using SAMMI.ECOM.Core.Models;
using SAMMI.ECOM.Domain.Commands.OrderBuy;
using SAMMI.ECOM.Domain.DomainModels.OrderBuy;
using SAMMI.ECOM.Infrastructure.Repositories.OrderBy;
using SAMMI.ECOM.Infrastructure.Repositories.Products;

namespace SAMMI.ECOM.API.Application.CommandHandlers.OrderBuy
{
    public class CUVoucherCommandHandler : CustombaseCommandHandler<CUVoucherCommand, VoucherDTO>
    {
        private readonly IVoucherRepository _voucherRepository;
        private readonly IProductCategoryRepository _categoryRepository;
        private readonly IBrandRepository _brandRepository;
        private readonly IProductRepository _productRepository;
        private readonly IEventRepository _eventRepository;
        private readonly IDiscountTypeRepository _typeRepository;

        public CUVoucherCommandHandler(
            IVoucherRepository voucherRepository,
            IProductCategoryRepository categoryRepository,
            IBrandRepository brandRepository,
            IProductRepository productRepository,
            IEventRepository eventRepository,
            IDiscountTypeRepository discountTypeRepository,
            UserIdentity currentUser,
            IMapper mapper) : base(currentUser, mapper)
        {
            _voucherRepository = voucherRepository;
            _categoryRepository = categoryRepository;
            _brandRepository = brandRepository;
            _productRepository = productRepository;
            _eventRepository = eventRepository;
            _typeRepository = discountTypeRepository;
        }

        public override async Task<ActionResponse<VoucherDTO>> Handle(CUVoucherCommand request, CancellationToken cancellationToken)
        {
            var actResponse = new ActionResponse<VoucherDTO>();

            if (request.StartDate > request.EndDate)
            {
                actResponse.AddError("Ngày bắt đầu không thể lớn hơn ngày kết thúc");
                return actResponse;
            }

            if (await _voucherRepository.CheckExistCode(request.Code, request.Id))
            {
                actResponse.AddError("Mã chương trình khuyến mãi đã tồn tại");
                return actResponse;
            }

            if (request.CategoryId == null &&
                request.BrandId == null &&
                request.ProductId == null &&
                request.BrandId == null &&
                request.EventId == null)
            {
                actResponse.AddError("Phiếu giảm giá phải áp dụng cho ít nhất một danh mục, thương hiệu, sản phẩm hoặc sự kiện.");
                return actResponse;
            }

            if (request.CategoryId != null && !_categoryRepository.IsExisted(request.CategoryId))
            {
                actResponse.AddError("Loại sản phẩm không tồn tại");
                return actResponse;
            }
            if (request.BrandId != null && !_brandRepository.IsExisted(request.BrandId))
            {
                actResponse.AddError("Thương hiệu không tồn tại");
                return actResponse;
            }
            if (request.ProductId != null && !_productRepository.IsExisted(request.ProductId))
            {
                actResponse.AddError("Sản phẩm không tồn tại");
                return actResponse;
            }
            if (request.EventId != null && !_eventRepository.IsExisted(request.EventId))
            {
                actResponse.AddError("Chương trình khuyến mãi không tồn tại");
                return actResponse;
            }
            if (!_typeRepository.IsExisted(request.DiscountTypeId))
            {
                actResponse.AddError("Loại phiếu giảm giá không tồn tại");
                return actResponse;
            }

            if (request.Id == 0)
            {
                request.CreatedDate = DateTime.Now;
                request.CreatedBy = _currentUser.UserName;
                var createResponse = await _voucherRepository.CreateAndSave(request);
                actResponse.Combine(createResponse);
                actResponse.SetResult(_mapper.Map<VoucherDTO>(createResponse.Result));
            }
            else
            {
                request.UpdatedDate = DateTime.Now;
                request.UpdatedBy = _currentUser.UserName;

                var updateRes = await _voucherRepository.UpdateAndSave(request);
                actResponse.Combine(updateRes);
                actResponse.SetResult(_mapper.Map<VoucherDTO>(updateRes.Result));
            }

            return actResponse;
        }
    }

    public class CUVoucherCommandValidator : AbstractValidator<CUVoucherCommand>
    {
        public CUVoucherCommandValidator()
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

            RuleFor(x => x.UsageLimit)
                .Must(x => x >= 1)
                .WithMessage("Số lượng sử dụng phải lớn hơn 0");

            RuleFor(x => x.DiscountTypeId)
                .NotEmpty()
                .WithMessage("Loại phiếu giảm giá bắt buộc chọn");
        }
    }
}
