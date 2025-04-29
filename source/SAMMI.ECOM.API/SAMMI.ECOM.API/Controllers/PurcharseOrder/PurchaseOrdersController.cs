using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using SAMMI.ECOM.API.Application;
using SAMMI.ECOM.Core.Models;
using SAMMI.ECOM.Domain.Commands.OrderBuy;
using SAMMI.ECOM.Domain.Enums;
using SAMMI.ECOM.Infrastructure.Queries.OrderBy;
using SAMMI.ECOM.Infrastructure.Repositories.OrderBy;
using SAMMI.ECOM.Infrastructure.Repositories.Permission;

namespace SAMMI.ECOM.API.Controllers.PurcharseOrder
{
    [Route("api/purchase-order")]
    [ApiController]
    public class PurchaseOrdersController : CustomBaseController
    {
        private readonly IPurchaseOrderQueries _purchaseQueries;
        private readonly IPurchaseOrderRepository _purchaseRepository;
        private readonly IRoleRepository _roleRepository;
        public PurchaseOrdersController(
            IPurchaseOrderQueries purchaseQueries,
            IPurchaseOrderRepository purchaseOrderRepository,
            IRoleRepository roleRepository,
            IMediator mediator,
            ILogger<PurchaseOrdersController> logger) : base(mediator, logger)
        {
            _purchaseQueries = purchaseQueries;
            _purchaseRepository = purchaseOrderRepository;
            _roleRepository = roleRepository;
        }

        [AuthorizePermission(PermissionEnum.ImportView)]
        [HttpGet]
        public async Task<IActionResult> GetsAsync([FromQuery] RequestFilterModel request)
        {
            return Ok(await _purchaseQueries.GetList(request));
        }

        [AuthorizePermission(PermissionEnum.ImportView)]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAsync(int id)
        {
            if (!_purchaseRepository.IsExisted(id))
            {
                return BadRequest("Mã đơn nhập không tồn tại");
            }
            return Ok(await _purchaseQueries.GetPurchaseOrder(id));
        }

        [AuthorizePermission(PermissionEnum.ImportCreate)]
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

        [AuthorizePermission(PermissionEnum.ImportUpdate)]
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
                return BadRequest("Không thể sửa thông tin đơn nhập! Chỉ được sửa đơn nhập khi trạng thái đang ở bản nháp");
            }
            var response = await _mediator.Send(request);
            if (response.IsSuccess)
            {
                return Ok(response);
            }
            return BadRequest(response);
        }

        [AuthorizePermission(PermissionEnum.ImportUpdateStatus)]
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

        [AuthorizePermission(PermissionEnum.ImportUpdateStatus)]
        [HttpPost("update-purchases-status")]
        public async Task<IActionResult> UpdatePurchasesStatus([FromBody] UpdatePurchasesStatusCommand request)
        {
            var actRes = new ActionResponse();
            foreach (var id in request.PurchaseOrderIds)
            {
                if (!_purchaseRepository.IsExisted(id))
                {
                    actRes.AddError($"Đơn nhập có id {id} không tồn tại");
                    return BadRequest(actRes);
                }
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

        [AuthorizePermission(PermissionEnum.ImportDelete)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var purchase = await _purchaseRepository.GetByIdAsync(id);
            if (purchase == null)
            {
                return BadRequest("Đơn nhập hàng không tồn tại");
            }
            var role = await _roleRepository.GetByIdAsync(UserIdentity.Roles.FirstOrDefault());
            if (role != null && role.Code == RoleTypeEnum.ADMIN.ToString())
            {
                if (purchase.Status != PurchaseOrderStatus.Draft.ToString() && purchase.Status != PurchaseOrderStatus.PendingApproval.ToString())
                {
                    return BadRequest("Không thể xóa đơn nhập hàng, đơn đã được phê duyệt hoặc đang xử lý");
                }
            }
            else
            {
                if (purchase.Status != PurchaseOrderStatus.Draft.ToString())
                {
                    return BadRequest("Không thể xóa đơn nhập hàng, chỉ có thể xóa đơn nhập hàng khi trạng thái là bản nháp");
                }
            }

            return Ok(_purchaseRepository.DeleteAndSave(id));
        }

        [HttpGet("get-code-by-last-id")]
        public async Task<IActionResult> GetCodeByLastIdAsync()
        {
            return Ok(await _purchaseQueries.GetCodeByLastId());
        }
    }
}
