using AutoMapper;
using FluentValidation;
using SAMMI.ECOM.Core.Authorizations;
using SAMMI.ECOM.Core.Models;
using SAMMI.ECOM.Domain.AggregateModels.EventVoucher;
using SAMMI.ECOM.Domain.Commands.OrderBuy;
using SAMMI.ECOM.Domain.DomainModels.OrderBuy;
using SAMMI.ECOM.Domain.Enums;
using SAMMI.ECOM.Infrastructure.Repositories.OrderBy;
using SAMMI.ECOM.Infrastructure.Repositories.Products;
using SAMMI.ECOM.Utility;

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
        private readonly IVoucherConditionRepository _conditionRepository;
        private readonly Dictionary<DiscountTypeEnum, List<ConditionTypeEnum>> validConditions = new Dictionary<DiscountTypeEnum, List<ConditionTypeEnum>>()
        {
            { DiscountTypeEnum.Percentage, new List<ConditionTypeEnum> { ConditionTypeEnum.MinOrderValue, ConditionTypeEnum.MaxDiscountAmount } },
            { DiscountTypeEnum.FixedAmount, new List<ConditionTypeEnum> { ConditionTypeEnum.MinOrderValue } },
            { DiscountTypeEnum.FreeShipping, new List<ConditionTypeEnum> { ConditionTypeEnum.MinOrderValue, ConditionTypeEnum.AllowedRegions } },
            { DiscountTypeEnum.TieredDiscount, new List<ConditionTypeEnum> { ConditionTypeEnum.TierLevels } },
            { DiscountTypeEnum.BundleDiscount, new List<ConditionTypeEnum> { ConditionTypeEnum.RequiredProducts } }
        };
        public CUVoucherCommandHandler(
            IVoucherRepository voucherRepository,
            IProductCategoryRepository categoryRepository,
            IBrandRepository brandRepository,
            IProductRepository productRepository,
            IEventRepository eventRepository,
            IDiscountTypeRepository discountTypeRepository,
            IVoucherConditionRepository voucherConditionRepository,
            UserIdentity currentUser,
            IMapper mapper) : base(currentUser, mapper)
        {
            _voucherRepository = voucherRepository;
            _categoryRepository = categoryRepository;
            _brandRepository = brandRepository;
            _productRepository = productRepository;
            _eventRepository = eventRepository;
            _typeRepository = discountTypeRepository;
            _conditionRepository = voucherConditionRepository;
        }

        public override async Task<ActionResponse<VoucherDTO>> Handle(CUVoucherCommand request, CancellationToken cancellationToken)
        {
            var actResponse = new ActionResponse<VoucherDTO>();

            if (request.StartDate >= request.EndDate)
            {
                actResponse.AddError("Ngày bắt đầu phải nhỏ hơn ngày kết thúc");
                return actResponse;
            }

            if (await _voucherRepository.CheckExistCode(request.Code, request.Id))
            {
                actResponse.AddError("Mã chương trình khuyến mãi đã tồn tại");
                return actResponse;
            }
            if ((request.CategoryId == null || request.CategoryId == 0) &&
                (request.BrandId == null || request.BrandId == 0) &&
                (request.ProductId == null || request.ProductId == 0) &&
                (request.EventId == null || request.EventId == 0))
            {
                actResponse.AddError("Phiếu giảm giá phải áp dụng cho ít nhất một danh mục, thương hiệu, sản phẩm hoặc sự kiện.");
                return actResponse;
            }

            request.CategoryId = request.CategoryId == 0 ? null : request.CategoryId;
            request.BrandId = request.BrandId == 0 ? null : request.BrandId;
            request.ProductId = request.ProductId == 0 ? null : request.ProductId;
            request.EventId = request.EventId == 0 ? null : request.EventId;

            if ((request.CategoryId != null && request.CategoryId != 0) && !_categoryRepository.IsExisted(request.CategoryId))
            {
                actResponse.AddError("Loại sản phẩm không tồn tại");
                return actResponse;
            }
            if ((request.BrandId != null && request.BrandId != 0) && !_brandRepository.IsExisted(request.BrandId))
            {
                actResponse.AddError("Thương hiệu không tồn tại");
                return actResponse;
            }
            if ((request.ProductId != null && request.ProductId != 0) && !_productRepository.IsExisted(request.ProductId))
            {
                actResponse.AddError("Sản phẩm không tồn tại");
                return actResponse;
            }
            if ((request.EventId != null && request.EventId != 0) && !_eventRepository.IsExisted(request.EventId))
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
                if (!actResponse.IsSuccess)
                {
                    return actResponse;
                }
                var voucher = createResponse.Result;

                // check condition
                var discountType = await _typeRepository.FindById(voucher.DiscountTypeId);
                if (!Enum.TryParse<DiscountTypeEnum>(discountType.Code, out var discountTypeEnum))
                {
                    actResponse.AddError("Loại voucher không hợp lệ.");
                    return actResponse;
                }
                if (!validConditions.TryGetValue(discountTypeEnum, out var allowedConditions))
                {
                    actResponse.AddError("Loại voucher không hợp lệ.");
                    return actResponse;
                }

                foreach (var condition in request.Conditions)
                {
                    if (!allowedConditions.Contains(condition.ConditionType))
                    {
                        actResponse.AddError($"Điều kiện {condition.ConditionType} không hợp lệ với loại voucher {voucher.DiscountType}.");
                        return actResponse;
                    }
                }

                //add condition
                var conditions = FormatCondition(request.Conditions, voucher.Id);
                foreach (var c in conditions)
                {
                    c.CreatedDate = DateTime.Now;
                    c.CreatedBy = _currentUser.UserName;
                    actResponse.Combine(_conditionRepository.Create(c));
                    if (!actResponse.IsSuccess)
                    {
                        return actResponse;
                    }
                }
                await _conditionRepository.SaveChangeAsync();

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

        private List<VoucherCondition> FormatCondition(List<VoucherConditionCommand> conditions, int? voucherId)
        {
            var listCondition = new List<VoucherCondition>();
            foreach (var c in conditions)
            {
                VoucherCondition vCondi = _mapper.Map<VoucherCondition>(c);
                vCondi.VoucherId = voucherId ?? 0;
                switch (c.ConditionType)
                {
                    case ConditionTypeEnum.AllowedRegions:
                        var regions = c.ConditionType.ToString().DeserializeJson<List<AllowedRegionCommand>>();
                        string regionFormated = string.Join(",", regions.Select(r => r.RegionId));

                        vCondi.ConditionValue = regionFormated;
                        break;
                    case ConditionTypeEnum.TierLevels:
                        var tierLevels = c.ConditionType.ToString().DeserializeJson<List<TierLevelCommand>>();
                        string valueFormated = string.Join(",", tierLevels.Select(t => $"{t.Level}:{t.Discount}"));

                        vCondi.ConditionValue = valueFormated;
                        break;
                    case ConditionTypeEnum.RequiredProducts:
                        var products = c.ConditionType.ToString().DeserializeJson<List<RequiredProductCommand>>();
                        string productFormated = string.Join(",", products.Select(r => r.ProductId));

                        vCondi.ConditionValue = productFormated;
                        break;
                }

                listCondition.Add(vCondi);
            }
            return listCondition;
        }

        private async Task<bool> ValidateVoucherConditions(CUVoucherCommand voucher)
        {



            return true;
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
