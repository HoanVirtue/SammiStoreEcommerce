using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SAMMI.ECOM.Core.Authorizations;
using SAMMI.ECOM.Infrastructure.Queries.System;
using SAMMI.ECOM.Infrastructure.Repositories.System;

namespace SAMMI.ECOM.API.Controllers.System
{
    public class NotificationsController : CustomBaseController
    {
        private readonly INotificationRepository _notifiRepostory;
        private readonly INotificationQueries _notificationQueries;
        public NotificationsController(
            INotificationRepository notificationRepostory,
            INotificationQueries notificationQueries,
            UserIdentity userIdentity,
            IMediator mediator,
            ILogger<NotificationsController> logger) : base(mediator, logger)
        {
            _notifiRepostory = notificationRepostory;
            _notificationQueries = notificationQueries;
            UserIdentity = userIdentity;
        }

        [HttpGet]
        public async Task<IActionResult> GetAsync()
        {
            return Ok(await _notificationQueries.GetAll(UserIdentity.Id));
        }

        [HttpPut]
        public async Task<IActionResult> Put()
        {
            _notifiRepostory.IsReadAll(UserIdentity.Id);
            return Ok();
        }
    }
}
