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
    public class WardsController : CustomBaseController
    {
        private readonly IWardQueries _wardQueries;
        private readonly IWardRepository _wardRepository;
        public WardsController(
            IMediator mediator,
            ILogger<WardsController> logger,
            IWardQueries WardQueries,
            IWardRepository wardRepository) : base(mediator, logger)
        {
            _wardQueries = WardQueries;
            _wardRepository = wardRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] RequestFilterModel request)
        {
            if (request.Type == RequestType.Grid)
            {
                return Ok(await _wardQueries.GetList(request));
            }
            else if (request.Type == RequestType.Selection)
            {
                return Ok(await _wardQueries.GetSelectionList(request));
            }

            return Ok();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(await _wardQueries.GetById(id));
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CUWardCommand request)
        {
            var response = await _mediator.Send(request);
            if (response.IsSuccess)
            {
                return Ok(response);
            }
            return BadRequest(response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] CUWardCommand request)
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
            return Ok(_wardRepository.DeleteAndSave(id));
        }
    }
}
