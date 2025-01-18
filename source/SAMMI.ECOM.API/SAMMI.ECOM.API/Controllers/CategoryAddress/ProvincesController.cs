using Microsoft.AspNetCore.Mvc;
using SAMMI.ECOM.Core.Models;
using SAMMI.ECOM.Infrastructure.Queries.CategoryAddress;

namespace SAMMI.ECOM.API.Controllers.CategoryAddress
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProvincesController : CustomBaseController
    {
        private readonly IProvinceQueries _provinceQueries;
        public ProvincesController(IProvinceQueries provinceQueries)
        {
            _provinceQueries = provinceQueries;
        }

        [HttpGet]
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
        public async Task<IActionResult> Get(int id)
        {
            return Ok(await _provinceQueries.GetById(id));
        }
    }
}
