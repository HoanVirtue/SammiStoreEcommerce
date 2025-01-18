using Microsoft.AspNetCore.Mvc;
using SAMMI.ECOM.Core.Models;
using SAMMI.ECOM.Infrastructure.Queries;

namespace SAMMI.ECOM.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : CustomBaseController
    {
        private readonly IUsersQueries _usersQueries;
        public UsersController(IUsersQueries usersQueries)
        {
            _usersQueries = usersQueries;
        }

        [HttpGet]
        public async Task<IActionResult> GetAsync([FromQuery] RequestFilterModel request)
        {
            return Ok(await _usersQueries.GetEmployeeAll(request));
        }
    }
}
