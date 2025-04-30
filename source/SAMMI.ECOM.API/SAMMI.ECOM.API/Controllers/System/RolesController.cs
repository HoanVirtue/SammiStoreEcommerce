using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SAMMI.ECOM.API.Application;
using SAMMI.ECOM.Core.Models;
using SAMMI.ECOM.Domain.Enums;
using SAMMI.ECOM.Infrastructure.Queries.System;

namespace SAMMI.ECOM.API.Controllers.System
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : CustomBaseController
    {
        private readonly IRoleQueries _roleQueries;
        public RolesController(
            IRoleQueries roleQueries,
            IMediator mediator,
            ILogger<RolesController> logger) : base(mediator, logger)
        {
            _roleQueries = roleQueries;
        }

        [AuthorizePermission(PermissionEnum.RoleView)]
        [HttpGet]
        public async Task<IActionResult> GetAsync([FromQuery]RequestFilterModel request)
        {
            if (request.Type == RequestType.Grid)
            {
                return Ok(await _roleQueries.GetList(request));
            }
            else if(request.Type == RequestType.Selection)
            {
                return Ok(await _roleQueries.GetSelectionList(request));
            }    
            return Ok();
        }

        [AuthorizePermission(PermissionEnum.RoleCreate)]
        [HttpPost]
        public IActionResult Post()
        {
            return default;
        }

        [AuthorizePermission(PermissionEnum.RoleUpdate)]
        [HttpPut]
        public IActionResult Put()
        {
            return default;
        }

        [AuthorizePermission(PermissionEnum.RoleDelete)]
        [HttpDelete]
        public IActionResult Delete()
        {
            return default;
        }
    }
}
