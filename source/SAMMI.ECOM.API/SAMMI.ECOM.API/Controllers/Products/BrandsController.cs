using MediatR;
using Microsoft.AspNetCore.Mvc;
using SAMMI.ECOM.Core.Models;
using SAMMI.ECOM.Domain.Commands.Products;
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

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            return Ok(await _brandQueries.GetById(id));
        }

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

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] CUBrandCommand request)
        {
            if ((id == 0 || request.Id == 0) || id != request.Id)
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

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (!_brandRepository.IsExisted(id))
            {
                return NotFound();
            }
            return Ok(_brandRepository.DeleteAndSave(id));
        }

        [HttpDelete]
        public IActionResult DeleteRange([FromBody] List<int> ids)
        {
            var actErrorResponse = new ActionResponse<List<string>>();
            var listError = new Dictionary<int, string>();
            if (ids == null || ids.Count == 0)
            {
                return BadRequest();
            }
            foreach (var id in ids)
            {
                if (!_brandRepository.IsExisted(id) && !listError.TryGetValue(id, out var error))
                {
                    listError[id] = $"Không tồn tại thương hiệu có mã {id}";
                }
            }
            if (listError.Count > 0)
            {
                actErrorResponse.SetResult(listError.Select(x => x.Value).ToList());
                return BadRequest(actErrorResponse);
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
