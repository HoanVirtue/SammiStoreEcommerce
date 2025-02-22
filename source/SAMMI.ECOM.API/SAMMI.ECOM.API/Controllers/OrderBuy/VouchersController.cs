using MediatR;
using Microsoft.AspNetCore.Mvc;
using SAMMI.ECOM.Core.Models;
using SAMMI.ECOM.Domain.Commands.OrderBuy;
using SAMMI.ECOM.Infrastructure.Queries.OrderBy;
using SAMMI.ECOM.Infrastructure.Repositories.OrderBy;

namespace SAMMI.ECOM.API.Controllers.OrderBuy
{
    [Route("api/[controller]")]
    [ApiController]
    public class VouchersController : CustomBaseController
    {
        private readonly IVoucherQueries _voucherQueries;
        private readonly IVoucherRepository _voucherRepository;
        public VouchersController(
            IVoucherQueries voucherQueries,
            IVoucherRepository voucherRepository,
            IMediator mediator,
            ILogger<UsersController> logger) : base(mediator, logger)
        {
            _voucherQueries = voucherQueries;
            _voucherRepository = voucherRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] RequestFilterModel request)
        {
            if (request.Type == RequestType.SimpleAll)
            {
                return Ok(await _voucherQueries.GetAll(request));
            }
            return Ok(await _voucherQueries.GetList(request));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(await _voucherQueries.GetById(id));
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CUVoucherCommand request)
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
        public async Task<IActionResult> Put(int id, [FromBody] CUVoucherCommand request)
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
            if (!_voucherRepository.IsExisted(id))
            {
                return NotFound();
            }
            return Ok(_voucherRepository.DeleteAndSave(id));
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
                if (!_voucherRepository.IsExisted(id) && !listError.TryGetValue(id, out var error))
                {
                    listError[id] = $"Không tồn tại phiếu giảm giá có mã {id}";
                }
            }
            if (listError.Count > 0)
            {
                actErrorResponse.SetResult(listError.Select(x => x.Value).ToList());
                return BadRequest(actErrorResponse);
            }
            return Ok(_voucherRepository.DeleteRangeAndSave(ids.Cast<object>().ToArray()));
        }

        [HttpGet("get-code-by-last-id")]
        public async Task<IActionResult> GetCodeByLastId()
        {
            return Ok(await _voucherQueries.GetCodeByLastId());
        }
    }
}
