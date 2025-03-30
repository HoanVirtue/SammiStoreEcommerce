using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SAMMI.ECOM.Core.Authorizations;
using SAMMI.ECOM.Core.Models;
using SAMMI.ECOM.Domain.Commands.OrderBuy;
using SAMMI.ECOM.Domain.DomainModels.OrderBuy;
using SAMMI.ECOM.Domain.DomainModels.VNPay;
using SAMMI.ECOM.Domain.Enums;
using SAMMI.ECOM.Infrastructure.Repositories;
using SAMMI.ECOM.Infrastructure.Repositories.OrderBy;
using SAMMI.ECOM.Infrastructure.Services.VNPay;

namespace SAMMI.ECOM.API.Controllers.OrderBuy
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Authorize]
    [Route("api/order-buy")]
    [ApiController]
    public class OrderBuysController : CustomBaseController
    {
        private readonly IVNPayService _vnpayService;
        private readonly IPaymentRepository _paymentRepository;
        private readonly IOrderRepository _orderRepository;
        private readonly IPaymentMethodRepository _paymentMethodRepository;
        private readonly IVNPayService _vnpService;
        private readonly IMapper _mapper;
        private readonly IUsersRepository _userRepository;
        private readonly IConfiguration _config;
        public OrderBuysController(IMediator mediator,
            IVNPayService vNPayService,
            IPaymentRepository paymentRepository,
            IOrderRepository orderRepository,
            IPaymentMethodRepository paymentMethodRepository,
            IVNPayService vnpService,
            UserIdentity currentUser,
            IUsersRepository usersRepository,
            IConfiguration config,
            IMapper mapper,
            ILogger<OrderBuysController> logger) : base(mediator, logger)
        {
            _vnpayService = vNPayService;
            _paymentRepository = paymentRepository;
            _orderRepository = orderRepository;
            _paymentMethodRepository = paymentMethodRepository;
            _vnpayService = vnpService;
            _mapper = mapper;
            UserIdentity = currentUser;
            _userRepository = usersRepository;
            _config = config;
        }

        [HttpPost("create-order")]
        public async Task<IActionResult> CreateOrder([FromBody] CreateOrderCommand request)
        {
            if (request.Id != 0)
                return BadRequest();

            var response = await _mediator.Send(request);
            if (response.IsSuccess)
            {
                return Ok(response);
            }
            return BadRequest(response);
        }

        [AllowAnonymous]
        [HttpGet("vnpay/payment-callback")]
        public async Task<IActionResult> PaymentCallback()
        {
            var paymentResponse = _vnpayService.PaymentExecute(Request.Query);
            if (!paymentResponse.IsSuccess)
            {
                return BadRequest(paymentResponse);
            }
            var paymentResult = paymentResponse.Result;
            string[] paymentInfos = paymentResult.OrderDescription.Split('#')[1].Split('_');
            string orderCode = paymentInfos[0];
            var payment = await _paymentRepository.GetByOrderCode(orderCode);
            if (payment == null)
            {
                return BadRequest("Không tồn tại giao dịch");
            }
            if (paymentResult.VnPayResponseCode != "00")
            {
                _paymentRepository.UpdateStatus(payment.Id, PaymentStatusEnum.Unpaid);
                return BadRequest(paymentResult);
            }

            // update info payment
            payment.TransactionId = paymentResult.TransactionId;
            payment.PaymentStatus = PaymentStatusEnum.Paid.ToString();
            payment.PaymentDate = paymentResult.PaymentDate;
            var paymentUpdateRes = await _paymentRepository.UpdateAndSave(payment);
            _orderRepository.UpdateStatus(OrderStatusEnum.Processing, code: orderCode);
            if (!paymentUpdateRes.IsSuccess)
                return Redirect($"{_config.GetValue<string>("VNPAYOptions:RedirectUrl")}?payment-status=0");

            return Redirect($"{_config.GetValue<string>("VNPAYOptions:RedirectUrl")}?payment-status=1");
        }

        [HttpPost("pay-back")]
        public async Task<IActionResult> Payback([FromBody] CreatePayback model)
        {
            var actRes = new ActionResponse<PaymentDTO>();
            var order = await _orderRepository.GetByCode(code: model.OrderCode);
            if (order == null)
            {
                actRes.AddError($"Đơn hàng có mã {model.OrderCode} không tồn tại");
                return BadRequest(actRes);
            }
            var payment = await _paymentRepository.GetByOrderCode(model.OrderCode);
            if (payment == null || payment.PaymentStatus == PaymentStatusEnum.Failed.ToString())
            {
                var paymentRequest = new CreatePaymentCommand
                {
                    OrderId = order.Id,
                    OrderCode = order.Code,
                    PaymentAmount = await _orderRepository.CalculateTotalPrice(order.Id),
                    PaymentStatus = PaymentStatusEnum.Pending.ToString(),
                    PaymentMethodId = (await _paymentMethodRepository.GetByCode(PaymentMethodEnum.VNPAY.ToString())).Id
                };
                var createPaymentRes = await _mediator.Send(paymentRequest);
                if (!createPaymentRes.IsSuccess)
                {
                    actRes.AddError(createPaymentRes.Message);
                    return BadRequest(actRes);
                }
                return Ok(createPaymentRes);
            }
            else
            {
                var paymentMethod = await _paymentMethodRepository.GetByIdAsync(payment.PaymentMethodId);
                if (paymentMethod.Code != PaymentMethodEnum.VNPAY.ToString())
                {
                    actRes.AddError("Không thể thanh toán! Chỉ áp dụng cho thanh toán VNPay");
                    return BadRequest(actRes);
                }
                if (payment.PaymentStatus == PaymentStatusEnum.Paid.ToString())
                {
                    actRes.AddError("Đơn hàng đã được thanh toán");
                    return BadRequest(actRes);
                }
                var paymentCreate = _mapper.Map<CreatePaymentCommand>(payment);
                paymentCreate.OrderCode = order.Code;
                paymentCreate.UserIdentity = (await _userRepository.FindById(UserIdentity.Id)).IdentityGuid;
                var paymentUrl = _vnpayService.CreatePaymentUrl(paymentCreate, HttpContext);
                if (string.IsNullOrEmpty(paymentUrl))
                {
                    actRes.AddError("Không thể liên kết tới VNPay");
                    return BadRequest(actRes);
                }

                var paymentDTO = _mapper.Map<PaymentDTO>(payment);
                paymentDTO.ReturnUrl = paymentUrl;
                actRes.SetResult(paymentDTO);
                return Ok(actRes);
            }
        }

        [AllowAnonymous]
        [HttpGet("vnpay/ipn")]
        public async Task<IActionResult> VNPayIPN([FromForm] VNPayIPNDTO model)
        {
            if (!_vnpayService.ValidateChecksum(model.vnp_SecureHash))
            {
                return BadRequest("Invalid checksum");
            }

            string[] paymentInfos = model.vnp_OrderInfo.Split('#')[1].Split('_');
            string orderCode = paymentInfos[0];
            var payment = await _paymentRepository.GetByOrderCode(orderCode);
            if (model.vnp_ResponseCode == "00") // 00 là mã thành công
            {
                payment.TransactionId = model.vnp_TransactionNo;
                payment.PaymentDate = DateTime.Parse(model.vnp_PayDate);
                await _paymentRepository.UpdateAndSave(payment);
                await _orderRepository.UpdateStatus(OrderStatusEnum.Processing, code: orderCode);
            }
            else
            {
                await _paymentRepository.UpdateStatus(payment.Id, PaymentStatusEnum.Unpaid);
            }

            return Ok();
        }
    }
}
