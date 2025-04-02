using MediatR;
using Microsoft.AspNetCore.Mvc;
using SAMMI.ECOM.Core.Models;
using SAMMI.ECOM.Domain.Commands;
using SAMMI.ECOM.Infrastructure.Queries.CategoryAddress;
using SAMMI.ECOM.Infrastructure.Repositories.AddressCategory;

namespace SAMMI.ECOM.API.Controllers.CategoryAddress
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProvincesController : CustomBaseController
    {
        private readonly IProvinceQueries _provinceQueries;
        private readonly IProvinceRepository _provinRepository;
        public ProvincesController(
            IProvinceQueries provinceQueries,
            IProvinceRepository provinRepository,
            IMediator mediator,
            ILogger<ProvincesController> logger) : base(mediator, logger)
        {
            _provinceQueries = provinceQueries;
            _provinRepository = provinRepository;
        }

        [HttpGet]
        // đây là quyền xem: Xem tỉnh/thành phố, mã code: PROVINCE_VIEW
        public async Task<IActionResult> Get([FromQuery] RequestFilterModel request)
        {
            if (request.Type == RequestType.Grid)
            {
                return Ok(await _provinceQueries.GetList(request));
            }
            else if (request.Type == RequestType.Selection)
            {
                return Ok(await _provinceQueries.GetSelectionList(request));
            }

            return Ok();
        }

        [HttpGet("{id}")]
        // PROVINCE_VIEW
        public async Task<IActionResult> Get(int id)
        {
            return Ok(await _provinceQueries.GetById(id));
        }

        [HttpPost]
        // PROVINCE_CREATE
        public async Task<IActionResult> Post([FromBody] CUProvinceCommand request)
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
        public async Task<IActionResult> Put(int id, [FromBody] CUProvinceCommand request)
        {
            if (id != request.Id)
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

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (!_provinRepository.IsExisted(id))
            {
                return NotFound();
            }
            return Ok(_provinRepository.DeleteAndSave(id));
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
                if (!_provinRepository.IsExisted(id) && !listError.TryGetValue(id, out var error))
                {
                    listError[id] = $"Không tồn tại tỉnh/thành phố có mã {id}";
                }
            }
            if (listError.Count > 0)
            {
                actErrorResponse.SetResult(listError.Select(x => x.Value).ToList());
                return BadRequest(actErrorResponse);
            }
            return Ok(_provinRepository.DeleteRangeAndSave(ids.Cast<object>().ToArray()));
        }
    }
}
