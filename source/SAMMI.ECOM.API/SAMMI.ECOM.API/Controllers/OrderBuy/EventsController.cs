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
    public class EventsController : CustomBaseController
    {
        private readonly IEventQueries _eventQueries;
        private readonly IEventRepository _eventRepository;
        private readonly IVoucherRepository _voucherRepository;
        public EventsController(
            IEventQueries eventQueries,
            IEventRepository eventRepository,
            IVoucherRepository voucherRepository,
            IMediator mediator,
            ILogger<UsersController> logger) : base(mediator, logger)
        {
            _eventQueries = eventQueries;
            _eventRepository = eventRepository;
            _voucherRepository = voucherRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] RequestFilterModel request)
        {
            if (request.Type == RequestType.SimpleAll)
            {
                return Ok(await _eventQueries.GetAll(request));
            }
            return Ok(await _eventQueries.GetList(request));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(await _eventQueries.GetById(id));
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CreateEventCommand request)
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
        public async Task<IActionResult> Put(int id, [FromBody] UpdateEventCommand request)
        {
            if (id != request.Id)
            {
                return BadRequest();
            }
            if (!_eventRepository.IsExisted(id))
            {
                return BadRequest("Chương trình khuyến mãi không tồn tại.");
            }
            var response = await _mediator.Send(request);
            if (response.IsSuccess)
            {
                return Ok(response);
            }
            return BadRequest(response);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var actResponse = new ActionResponse();
            if (!_eventRepository.IsExisted(id))
            {
                return NotFound();
            }
            if(!await _eventRepository.IsExistAnother(id))
            {
                actResponse.AddError("Không thể xóa! Phiếu giảm giá của chương trình đã được sử dụng");
                return BadRequest(actResponse);
            }
            var vouchers = await _voucherRepository.GetByEventId(id);
            foreach(var v in vouchers)
            {
                actResponse.Combine(_voucherRepository.DeleteAndSave(v.Id));
                if(!actResponse.IsSuccess)
                {
                    return BadRequest(actResponse);
                }    
            }
            return Ok(_eventRepository.DeleteAndSave(id));
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteRange([FromBody] List<int> ids)
        {
            var actErrorResponse = new ActionResponse();
            if (ids == null || ids.Count == 0)
            {
                return BadRequest();
            }
            if (!ids.All(id => _eventRepository.IsExisted(id)))
            {
                actErrorResponse.AddError("Một số chương trình khuyến mãi không tồn tại.");
                return BadRequest(actErrorResponse);
            }
            var exists = await Task.WhenAll(ids.Select(id => _eventRepository.IsExistAnother(id)));
            if (!exists.All(x => x))
            {
                actErrorResponse.AddError("Một số chương trình khuyến mãi đã được áp dụng ở bảng khác.");
                return BadRequest(actErrorResponse);
            }
            foreach(int id in ids)
            {
                var vouchers = await _voucherRepository.GetByEventId(id);
                foreach (var v in vouchers)
                {
                    actErrorResponse.Combine(_voucherRepository.DeleteAndSave(v.Id));
                    if (!actErrorResponse.IsSuccess)
                    {
                        return BadRequest(actErrorResponse);
                    }
                }
            }    
            return Ok(_eventRepository.DeleteRangeAndSave(ids.Cast<object>().ToArray()));
        }

        [HttpGet("get-code-by-last-id")]
        public async Task<IActionResult> GetCodeByLastId()
        {
            return Ok(await _eventQueries.GetCodeByLastId());
        }
    }
}
