using MediatR;
using Microsoft.AspNetCore.Mvc;
using SAMMI.ECOM.Core.Models;
using SAMMI.ECOM.Domain.Commands.OrderBuy;
using SAMMI.ECOM.Domain.Enums;
using SAMMI.ECOM.Infrastructure.Queries.OrderBy;
using SAMMI.ECOM.Infrastructure.Repositories.OrderBy;

namespace SAMMI.ECOM.API.Controllers.PurcharseOrder
{
    [Route("api/purchase-order")]
    [ApiController]
    public class PurchaseOrdersController : CustomBaseController
    {
        private readonly IPurchaseOrderQueries _purchaseQueries;
        private readonly IPurchaseOrderRepository _purchaseRepository;
        public PurchaseOrdersController(
            IPurchaseOrderQueries purchaseQueries,
            IPurchaseOrderRepository purchaseOrderRepository,
            IMediator mediator,
            ILogger<PurchaseOrdersController> logger) : base(mediator, logger)
        {
            _purchaseQueries = purchaseQueries;
            _purchaseRepository = purchaseOrderRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetsAsync([FromQuery] RequestFilterModel request)
        {
            return Ok(await _purchaseQueries.GetList(request));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAsync(int id)
        {
            if (!_purchaseRepository.IsExisted(id))
            {
                return BadRequest("Mã đơn nhập không tồn tại");
            }
            return Ok(await _purchaseQueries.GetPurchaseOrder(id));
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] CreatePurchaseOrderCommand request)
        {
            if (request.Id != 0)
            {
                return BadRequest();
            }
            var response = await _mediator.Send(request);
            if (response.IsSuccess)
            {
                return Ok(response);
            }
            return BadRequest(response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] UpdatePurchaseOrderCommand request)
        {
            if (id != request.Id)
            {
                return BadRequest();
            }
            var purchase = await _purchaseRepository.GetByIdAsync(id);
            if (purchase == null)
            {
                return BadRequest("Phiếu nhập hàng không tồn tại.");
            }
            if(purchase.Status != PurchaseOrderStatus.Draft.ToString())
            {
                return BadRequest("Không thể sửa thông tin đơn nhập! Chỉ được sửa khi trạng thái đang ở bản nháp");
            }
            var response = await _mediator.Send(request);
            if (response.IsSuccess)
            {
                return Ok(response);
            }
            return BadRequest(response);
        }

        [HttpPost("update-status")]
        public async Task<IActionResult> UpdateStatusAsync([FromBody] UpdatePurchaseStatusCommand request)
        {
            var actRes = new ActionResponse();
            if (!_purchaseRepository.IsExisted(request.PurchaseOrderId))
            {
                actRes.AddError("Mã đơn nhập không tồn tại");
                return BadRequest(actRes);
            }

            var updateStatusRes = await _purchaseRepository.UpdateStatus(request.PurchaseOrderId, request.NewStatus);
            if (!updateStatusRes.IsSuccess)
            {
                return BadRequest(updateStatusRes);
            }
            return Ok(updateStatusRes);
        }

        [HttpPost("update-purchases-status")]
        public async Task<IActionResult> UpdatePurchasesStatus([FromBody] UpdatePurchasesStatusCommand request)
        {
            var actRes = new ActionResponse();
            if (!request.PurchaseOrderIds.All(x => _purchaseRepository.IsExisted(x)))
            {
                actRes.AddError("Một số mã đơn nhập không tồn tại");
                return BadRequest(actRes);
            }

            foreach(var id in request.PurchaseOrderIds)
            {
                var updateStatusRes = await _purchaseRepository.UpdateStatus(id, request.NewStatus);
                if (!updateStatusRes.IsSuccess)
                {
                    return BadRequest(updateStatusRes);
                }
            }
            
            return Ok(ActionResponse.Success);
        }

        [HttpGet("get-code-by-last-id")]
        public async Task<IActionResult> GetCodeByLastIdAsync()
        {
            return Ok(await _purchaseQueries.GetCodeByLastId());
        }
    }
}
