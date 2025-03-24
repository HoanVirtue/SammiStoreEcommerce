using AutoMapper;
using FluentValidation;
using MediatR;
using SAMMI.ECOM.Core.Authorizations;
using SAMMI.ECOM.Core.Models;
using SAMMI.ECOM.Domain.AggregateModels.OrderBuy;
using SAMMI.ECOM.Domain.Commands.OrderBuy;
using SAMMI.ECOM.Domain.DomainModels.OrderBuy;
using SAMMI.ECOM.Domain.Enums;
using SAMMI.ECOM.Infrastructure.Repositories.AddressCategory;
using SAMMI.ECOM.Infrastructure.Repositories.OrderBy;
using SAMMI.ECOM.Infrastructure.Repositories.Products;

namespace SAMMI.ECOM.API.Application.CommandHandlers.OrderBuy
{
    public class CreateOrderCommandHandler : CustombaseCommandHandler<CreateOrderCommand, OrderDTO>
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IOrderDetailRepository _detailRepository;
        private readonly IVoucherRepository _voucherRepository;
        private readonly IWardRepository _wardRepository;
        private readonly ICartRepository _cartRepository;
        private readonly ICartDetailRepository _cartDetailRepository;
        private readonly IProductRepository _productRepository;
        private readonly IMediator _mediator;
        private readonly IPaymentMethodRepository _methodRepository;
        private readonly IShippingCompanyRepository _shippingRepository;
        public CreateOrderCommandHandler(
            IOrderRepository orderRepository,
            IOrderDetailRepository detailRepository,
            IVoucherRepository voucherRepository,
            IWardRepository wardRepository,
            ICartRepository cartRepository,
            ICartDetailRepository cartDetailRepository,
            IProductRepository productRepository,
            IMediator mediator,
            IPaymentMethodRepository methodRepository,
            IShippingCompanyRepository shippingCompanyRepository,
            UserIdentity currentUser,
            IMapper mapper) : base(currentUser, mapper)
        {
            _orderRepository = orderRepository;
            _detailRepository = detailRepository;
            _voucherRepository = voucherRepository;
            _wardRepository = wardRepository;
            _cartRepository = cartRepository;
            _cartDetailRepository = cartDetailRepository;
            _productRepository = productRepository;
            _mediator = mediator;
            _methodRepository = methodRepository;
            _shippingRepository = shippingCompanyRepository;
        }

        public override async Task<ActionResponse<OrderDTO>> Handle(CreateOrderCommand request, CancellationToken cancellationToken)
        {
            var actResponse = new ActionResponse<OrderDTO>();
            if (_currentUser.Id == null && request.Id == 0)
            {
                actResponse.AddError("Vui lòng đăng nhập hệ thống");
                return actResponse;
            }

            if (!_wardRepository.IsExisted(request.WardId))
            {
                actResponse.AddError("Mã phường không tồn tại.");
                return actResponse;
            }

            if (!request.Details.All(x => _productRepository.IsExisted(x.ProductId)))
            {
                actResponse.AddError("Có ít nhất 1 sản phẩm không tồn tại");
                return actResponse;
            }
            decimal totalAmount = 0;
            foreach (var item in request.Details)
            {
                item.Price = await _productRepository.GetPrice(item.ProductId);
                totalAmount += item.Price * item.Quantity;
            }

            // create order from ship & cal shipcost
            request.ShippingCompanyId = (await _shippingRepository.GetShipDefault()).Id;
            request.CostShip = 30000;
            totalAmount += request.CostShip ?? 0;

            request.VoucherId = request.VoucherId == 0 ? null : request.VoucherId;
            if (request.VoucherId != null)
            {
                var validVoucherResponse = await _voucherRepository.ValidVoucher(request.VoucherId ?? 0, request.WardId ?? 0, totalAmount, request.Details);
                if (!validVoucherResponse.IsSuccess)
                {
                    actResponse.AddError(validVoucherResponse.Message);
                    return actResponse;
                }
            }

            // create order
            request.CustomerId = _currentUser.Id;
            request.Code = Guid.NewGuid().ToString();
            request.PaymentStatus = PaymentStatusEnum.Pending.ToString();
            request.OrderStatus = OrderStatusEnum.WaitingForPayment.ToString();
            request.ShippingStatus = ShippingStatusEnum.NotShipped.ToString();
            request.CreatedDate = DateTime.Now;
            request.CreatedBy = "System";

            var createOrderRes = await _orderRepository.CreateAndSave(request);
            actResponse.Combine(createOrderRes);
            if (!actResponse.IsSuccess)
            {
                return actResponse;
            }
            var orderCreated = createOrderRes.Result;

            //create order detai
            foreach (var detail in request.Details)
            {
                var product = await _productRepository.GetByIdAsync(detail.ProductId);
                if (detail.Quantity > product.StockQuantity)
                {
                    actResponse.AddError("Số lượng hàng trong kho không đủ! Vui lòng đặt lại đơn hàng");
                    return actResponse;
                }
                detail.OrderId = orderCreated.Id;
                detail.CreatedDate = DateTime.Now;
                detail.CreatedBy = "System";
                var createDetailRes = await _detailRepository.CreateAndSave(_mapper.Map<OrderDetail>(detail));
                actResponse.Combine(createDetailRes);
                if (!actResponse.IsSuccess)
                    return actResponse;

                // update cart && update stock quantity
                if (!request.IsBuyNow)
                {
                    var cartDetail = await _cartDetailRepository.GetByUserIdAndProductId(_currentUser.Id, detail.ProductId);
                    if (cartDetail != null)
                    {
                        actResponse.Combine(_cartDetailRepository.DeleteAndSave(cartDetail.Id));
                        if (!actResponse.IsSuccess)
                            return actResponse;

                        product.StockQuantity -= cartDetail.Quantity;
                    }
                }
                else
                {
                    product.StockQuantity -= detail.Quantity;
                }
                actResponse.Combine(await _productRepository.UpdateAndSave(product));
                if (!actResponse.IsSuccess)
                {
                    return actResponse;
                }
            }

            // calculate discount
            if (request.VoucherId != 0 && request.VoucherId != null)
            {
                var totalDiscount = await _voucherRepository.CalculateDiscount(request.VoucherId ?? 0, request.CostShip ?? 0, totalAmount);
                totalAmount -= totalDiscount;
            }

            //create payment
            var paymentRequest = new CreatePaymentCommand
            {
                OrderId = orderCreated.Id,
                OrderCode = orderCreated.Code,
                PaymentAmount = totalAmount,
                PaymentStatus = PaymentStatusEnum.Pending.ToString(),
                PaymentMethodId = request.PaymentMethodId
            };

            var paymentReponse = await _mediator.Send(paymentRequest);
            actResponse.Combine(paymentReponse);
            if (!actResponse.IsSuccess)
            {
                return actResponse;
            }
            var orderResult = _mapper.Map<OrderDTO>(orderCreated);
            var paymentMethod = await _methodRepository.GetByIdAsync(request.PaymentMethodId);
            if (paymentMethod.Code == PaymentMethodEnum.VNPAY.ToString())
                orderResult.ReturnUrl = paymentReponse.Result.ReturnUrl;
            actResponse.SetResult(orderResult);

            return actResponse;
        }
    }

    public class CreateOrderCommandValidator : AbstractValidator<CreateOrderCommand>
    {
        public CreateOrderCommandValidator()
        {
            RuleFor(x => x.WardId)
                .NotEmpty()
                .WithMessage("Mã phường không được bỏ trống");

            RuleFor(x => x.PaymentMethodId)
                .NotEmpty()
                .WithMessage("Phương thức thanh toán không được bỏ trống");

        }
    }
}
