using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using SAMMI.ECOM.API.Infrastructure.VNPay;
using SAMMI.ECOM.Domain.DomainModels.VNPay;

namespace SAMMI.ECOM.Infrastructure.Services.VNPay
{
    public interface IVNPayService
    {
        string CreatePaymentUrl(PaymentInfoDTO model, HttpContext context);
        VNPayReponseDTO PaymentExecute(IQueryCollection collections);
    }
    public class VNPayService : IVNPayService
    {
        private readonly IConfiguration _configuration;

        public VNPayService(IConfiguration configuration)
        {
            _configuration = configuration.GetSection("VNPAYOptions");
        }
        public string CreatePaymentUrl(PaymentInfoDTO model, HttpContext context)
        {
            var timeZoneById = TimeZoneInfo.FindSystemTimeZoneById(_configuration["TimeZoneId"]);
            var timeNow = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, timeZoneById);
            var tick = DateTime.Now.Ticks.ToString();
            var pay = new VNPayLibrary();

            var urlCallBack = _configuration["ReturnUrl"];
            pay.AddRequestData("vnp_Version", _configuration["Version"]);
            pay.AddRequestData("vnp_Command", _configuration["Command"]);
            pay.AddRequestData("vnp_TmnCode", _configuration["TmnCode"]);
            pay.AddRequestData("vnp_Amount", ((int)model.Amount * 100).ToString());
            pay.AddRequestData("vnp_CreateDate", timeNow.ToString("yyyyMMddHHmmss"));
            pay.AddRequestData("vnp_CurrCode", _configuration["CurrCode"]);
            pay.AddRequestData("vnp_IpAddr", pay.GetIpAddress(context));
            pay.AddRequestData("vnp_Locale", _configuration["Locale"]);
            pay.AddRequestData("vnp_OrderInfo", $"{model.UserId}_{model.OrderId}_{model.Name}_{model.OrderType}_{model.OrderDescription}_{model.Amount}");
            pay.AddRequestData("vnp_OrderType", model.OrderType);
            pay.AddRequestData("vnp_ReturnUrl", urlCallBack);
            pay.AddRequestData("vnp_TxnRef", tick);

            var paymentUrl =
                pay.CreateRequestUrl(_configuration["BaseUrl"], _configuration["HashSecret"]);

            return paymentUrl;
        }

        public VNPayReponseDTO PaymentExecute(IQueryCollection collections)
        {
            var pay = new VNPayLibrary();
            var response = pay.GetFullResponseData(collections, _configuration["Vnpay:HashSecret"]);

            return response;
        }
    }
}
