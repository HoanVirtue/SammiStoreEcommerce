using MediatR;
using Microsoft.AspNetCore.Mvc;
using SAMMI.ECOM.Domain.DomainModels.Shipping;
using SAMMI.ECOM.Infrastructure.Repositories.AddressCategory;
using SAMMI.ECOM.Infrastructure.Services.GHN_API;

namespace SAMMI.ECOM.API.Controllers
{
    public class GHNController : CustomBaseController
    {
        private readonly IGHNService _ghnService;
        private readonly IWardRepository _wardRepository;
        public GHNController(
            IGHNService ghnService,
            IWardRepository wardRepository,
            IMediator mediator,
            ILogger<GHNController> logger) : base(mediator, logger)
        {
            _ghnService = ghnService;
            _wardRepository = wardRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetProvince()
        {
            return Ok(await _ghnService.GetProvinces());
        }

        [HttpGet("calculate-fee")]
        public async Task<IActionResult> CalculateFee(int wardId, decimal? totalAmount)
        {
            var ward = await _wardRepository.GetById(wardId);
            if (ward == null)
                return BadRequest("Mã phường không tồn tại.");
            var request = new FeeRequestDTO
            {
                InnsuranceValue = totalAmount,
                ToDistrictID = ward.DistrictId ?? 0,
                ToWardCode = ward.Code
            };
            var response = await _ghnService.CalculateFee(request);
            if (response == null)
                return BadRequest();
            return Ok(response);
        }
    }
}
