using Microsoft.AspNetCore.Mvc;
using SAMMI.ECOM.Core.Models;
using SAMMI.ECOM.Infrastructure.Queries.CategoryAddress;

namespace SAMMI.ECOM.API.Controllers.CategoryAddress
{
    [Route("api/[controller]")]
    [ApiController]
    public class DistrictsController : CustomBaseController
    {
        private readonly IDistrictQueries _DistrictQueries;
        public DistrictsController(IDistrictQueries DistrictQueries)
        {
            _DistrictQueries = DistrictQueries;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] RequestFilterModel request)
        {
            if (request.Type == RequestType.Grid)
            {
                return Ok(await _DistrictQueries.GetList(request));
            }
            else if (request.Type == RequestType.Selection)
            {
                return Ok(await _DistrictQueries.GetSelectionList(request));
            }

            return Ok();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(await _DistrictQueries.GetById(id));
        }
    }
}
