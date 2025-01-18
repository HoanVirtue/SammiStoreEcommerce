using Microsoft.AspNetCore.Mvc;
using SAMMI.ECOM.Core.Models;
using SAMMI.ECOM.Infrastructure.Queries.CategoryAddress;

namespace SAMMI.ECOM.API.Controllers.CategoryAddress
{
    [Route("api/[controller]")]
    [ApiController]
    public class WardsController : CustomBaseController
    {
        private readonly IWardQueries _WardQueries;
        public WardsController(IWardQueries WardQueries)
        {
            _WardQueries = WardQueries;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] RequestFilterModel request)
        {
            if (request.Type == RequestType.Grid)
            {
                return Ok(await _WardQueries.GetList(request));
            }
            else if (request.Type == RequestType.Selection)
            {
                return Ok(await _WardQueries.GetSelectionList(request));
            }

            return Ok();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(await _WardQueries.GetById(id));
        }
    }
}
