using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using SAMMI.ECOM.API.Application;
using SAMMI.ECOM.Core.Models;
using SAMMI.ECOM.Domain.Commands.Products;
using SAMMI.ECOM.Domain.Enums;
using SAMMI.ECOM.Infrastructure.Queries.Brands;
using SAMMI.ECOM.Infrastructure.Repositories.Products;

namespace SAMMI.ECOM.API.Controllers.Brands
{
    public class BrandsController : CustomBaseController
    {
        private readonly IBrandQueries _brandQueries;
        private readonly IBrandRepository _brandRepository;
        public BrandsController(
            IBrandQueries brandQueries,
            IBrandRepository brandRepository,
            IMediator mediator,
            ILogger<BrandsController> logger) : base(mediator, logger)
        {
            _brandQueries = brandQueries;
            _brandRepository = brandRepository;
        }

        [AuthorizePermission(PermissionEnum.BrandView)]
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] RequestFilterModel request)
        {
            if (request.Type == RequestType.SimpleAll)
            {
                return Ok(await _brandQueries.GetAll(request));
            }
            else if (request.Type == RequestType.Selection)
            {
                return Ok(await _brandQueries.GetSelectionList(request));
            }
            return Ok(await _brandQueries.GetList(request));
        }

        [AuthorizePermission(PermissionEnum.BrandView)]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            return Ok(await _brandQueries.GetById(id));
        }

        [AuthorizePermission(PermissionEnum.BrandCreate)]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CUBrandCommand request)
        {
            if (request.Id != 0)
            {
                return BadRequest();
            }
            var response = await _mediator.Send(request);
            if (!response.IsSuccess)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }

        [AuthorizePermission(PermissionEnum.BrandUpdate)]
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] CUBrandCommand request)
        {
            if ((id == 0 || request.Id == 0) || id != request.Id)
            {
                return BadRequest();
            }
            if (!_brandRepository.IsExisted(id))
            {
                return BadRequest("Thương hiệu không tồn tại.");
            }
            var response = await _mediator.Send(request);
            if (!response.IsSuccess)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }

        [AuthorizePermission(PermissionEnum.BrandDelete)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (!_brandRepository.IsExisted(id))
            {
                return BadRequest("Thương hiệu không tồn tại.");
            }
            var checkRes = await _brandRepository.IsExistAnotherTbl(id);
            if (!checkRes.IsSuccess)
            {
                return BadRequest(checkRes);
            }
            return Ok(_brandRepository.DeleteAndSave(id));
        }

        [AuthorizePermission(PermissionEnum.BrandDelete)]
        [HttpDelete]
        public async Task<IActionResult> DeleteRangeAsync([FromBody] List<int> ids)
        {
            var actErrorResponse = new ActionResponse();
            if (ids == null || ids.Count == 0)
            {
                return BadRequest();
            }

            foreach (var id in ids)
            {
                if (!_brandRepository.IsExisted(id))
                {
                    actErrorResponse.AddError($"Thương hiệu có id {id} không tồn tại.");
                    return BadRequest(actErrorResponse);
                }

                var checkRes = await _brandRepository.IsExistAnotherTbl(id);
                if (!checkRes.IsSuccess)
                {
                    return BadRequest(checkRes);
                }
            }

            return Ok(_brandRepository.DeleteRangeAndSave(ids.Cast<object>().ToArray()));
        }

        [HttpGet("get-code-by-last-id")]
        public async Task<IActionResult> GetCodeByLastId()
        {
            return Ok(await _brandQueries.GetCodeByLastId());
        }
    }
}
