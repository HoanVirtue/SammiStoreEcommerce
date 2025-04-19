using AutoMapper;
using FluentValidation;
using SAMMI.ECOM.Core.Authorizations;
using SAMMI.ECOM.Core.Models;
using SAMMI.ECOM.Domain.Commands.OrderBuy;
using SAMMI.ECOM.Domain.DomainModels.OrderBuy;
using SAMMI.ECOM.Domain.Enums;
using SAMMI.ECOM.Infrastructure.Repositories;
using SAMMI.ECOM.Infrastructure.Repositories.OrderBy;
using SAMMI.ECOM.Infrastructure.Repositories.Permission;
using SAMMI.ECOM.Infrastructure.Repositories.Products;

namespace SAMMI.ECOM.API.Application.CommandHandlers.OrderBuy
{
    public class CreatePurchaseOrderCommandHandler : CustombaseCommandHandler<CreatePurchaseOrderCommand, PurchaseOrderDTO>
    {
        private readonly IUsersRepository _userRepository;
        private readonly IPurchaseOrderRepository _purchaseRepository;
        private readonly IProductRepository _productRepository;
        private readonly IPurchaseOrderDetailRepository _purchaseDetailRepository;
        private readonly IRoleRepository _roleRepository;
        public CreatePurchaseOrderCommandHandler(
            IUsersRepository usersRepository,
            IPurchaseOrderRepository purchaseOrderRepository,
            IProductRepository productRepository,
            IPurchaseOrderDetailRepository purchaseDetailRepository,
            IRoleRepository roleRepository,
            UserIdentity currentUser,
            IMapper mapper) : base(currentUser, mapper)
        {
            _userRepository = usersRepository;
            _purchaseRepository = purchaseOrderRepository;
            _productRepository = productRepository;
            _purchaseDetailRepository = purchaseDetailRepository;
            _roleRepository = roleRepository;
        }

        public override async Task<ActionResponse<PurchaseOrderDTO>> Handle(CreatePurchaseOrderCommand request, CancellationToken cancellationToken)
        {
            var actRes = new ActionResponse<PurchaseOrderDTO>();

            var role = await _roleRepository.GetByIdAsync(int.Parse(_currentUser.Roles.FirstOrDefault()));
            // nếu không là admin
            // nếu mà khác bản nháp hoặc chờ duyệt
            if ((role != null && role.Code != RoleTypeEnum.ADMIN.ToString()) && (request.Status != PurchaseOrderStatus.Draft && request.Status != PurchaseOrderStatus.PendingApproval))
            {
                actRes.AddError("Trạng thái đơn nhập không hợp lệ, trạng thái hợp lệ là bản nháp hoặc đang chờ duyệt");
                return actRes;
            }

            if (!await _userRepository.IsExistedType(request.EmployeeId))
            {
                actRes.AddError("Mã nhân viên không tồn tại.");
                return actRes;
            }

            if (!await _userRepository.IsExistedType(request.SupplierId, TypeUserEnum.Supplier))
            {
                actRes.AddError("Mã nhà cung cấp không tồn tại.");
                return actRes;
            }

            foreach(var detail in request.Details)
            {
                if (!_productRepository.IsExisted(detail.ProductId))
                {
                    actRes.AddError($"Mã sản phẩm không tồn tại.");
                    return actRes;
                }
            }


            request.Code = Guid.NewGuid().ToString();
            request.CreatedDate = DateTime.Now;
            request.CreatedBy = _currentUser.UserName;
            var createPurchaseRes = await _purchaseRepository.CreateAndSave(request);
            actRes.Combine(createPurchaseRes);
            if (!actRes.IsSuccess)
            {
                return actRes;
            }
            var purchaseCreated = createPurchaseRes.Result;
            foreach (var detail in request.Details)
            {
                detail.PurchaseOrderId = purchaseCreated.Id;
                var createDetailRes = await _purchaseDetailRepository.CreateAndSave(detail);
                actRes.Combine(createDetailRes);
                if (!createPurchaseRes.IsSuccess)
                {
                    return actRes;
                }
            }

            actRes.SetResult(_mapper.Map<PurchaseOrderDTO>(purchaseCreated));
            return actRes;
        }
    }

    public class CreatePurchaseOrderCommandValidator : AbstractValidator<CreatePurchaseOrderCommand>
    {
        public CreatePurchaseOrderCommandValidator()
        {
            RuleFor(x => x.EmployeeId)
                .NotNull()
                .WithMessage("Nhân viên lập phiếu bắt buộc chọn");

            RuleFor(x => x.SupplierId)
                .NotNull()
                .WithMessage("Nhà cung cấp bắt buộc chọn");

            RuleFor(x => x.Details)
                .NotNull()
                .WithMessage("Danh sách sản phẩm không được bỏ trống")
                .Must(x => x.Count > 0)
                .WithMessage("Danh sách sản phẩm phải có ít nhất 1 sản phẩm");

            RuleFor(x => x.Status)
                .NotNull()
                .WithMessage("Trạng thái đơn nhập không được bỏ trống")
                .IsInEnum()
                .WithMessage("Trạng thái không đúng định dạng");

            RuleForEach(x => x.Details)
                .SetValidator(new PurchaseOrderDetailCommandValidator());
        }
    }

    public class PurchaseOrderDetailCommandValidator : AbstractValidator<PurchaseOrderDetailCommand>
    {
        public PurchaseOrderDetailCommandValidator()
        {
            RuleFor(x => x.ProductId)
                .NotNull()
                .WithMessage("Mã sản phẩm bắt buộc chọn");

            RuleFor(x => x.Quantity)
                .NotNull()
                .WithMessage("Số lượng không được bỏ trống")
                .GreaterThan(0)
                .WithMessage("Số lượng phải lớn hơn 0");

            RuleFor(x => x.UnitPrice)
                .NotNull()
                .WithMessage("Giá nhập không được bỏ trống")
                .GreaterThan(0)
                .WithMessage("Giá nhập phải lớn hơn 0");
        }
    }
}
