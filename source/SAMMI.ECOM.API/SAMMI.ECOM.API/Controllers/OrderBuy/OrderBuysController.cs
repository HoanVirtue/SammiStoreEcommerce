using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SAMMI.ECOM.Domain.Commands.OrderBuy;
using SAMMI.ECOM.Domain.DomainModels.VNPay;
using SAMMI.ECOM.Domain.Enums;
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
        public OrderBuysController(IMediator mediator,
            IVNPayService vNPayService,
            IPaymentRepository paymentRepository,
            IOrderRepository orderRepository,
            ILogger<OrderBuysController> logger) : base(mediator, logger)
        {
            _vnpayService = vNPayService;
            _paymentRepository = paymentRepository;
            _orderRepository = orderRepository;
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
            payment.ReponseCode = paymentResult.VnPayResponseCode;
            payment.PaymentStatus = PaymentStatusEnum.Paid.ToString();
            payment.PaymentDate = paymentResult.PaymentDate;
            var paymentUpdateRes = await _paymentRepository.UpdateAndSave(payment);
            _orderRepository.UpdateStatus(OrderStatusEnum.Processing, code: orderCode);
            if (paymentUpdateRes.IsSuccess)
                return Ok(paymentResult);
            return BadRequest(paymentUpdateRes);
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
                payment.ReponseCode = model.vnp_ResponseCode;
                payment.PaymentStatus = PaymentStatusEnum.Paid.ToString();
                payment.PaymentDate = DateTime.Parse(model.vnp_PayDate);
                _paymentRepository.UpdateAndSave(payment);
                _orderRepository.UpdateStatus(OrderStatusEnum.Processing, code: orderCode);
            }
            else
            {
                _paymentRepository.UpdateStatus(payment.Id, PaymentStatusEnum.Unpaid);
            }

            return Ok();
        }
    }
}
