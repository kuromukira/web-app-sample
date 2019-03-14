using collatask_api.TaskHub;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;

namespace collatask_api.Controllers
{
    /// <summary></summary>
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationController : ControllerBase
    {
        private readonly IHubContext<NotificationHub> lContext;

        /// <summary></summary>
        public NotificationController(IHubContext<NotificationHub> context) => lContext = context;

        /// <summary></summary>
        [Authorize]
        [HttpPost]
        [Route("send")]
        public async Task<IActionResult> SendUpdateNotification(NotificationModel notif)
        {
            try
            {
                await lContext.Clients.All.SendAsync("notifEventHandler", new
                {
                    notif.Sender,
                    Message = notif.Sender + " made changes to the database. Your view is being refreshed.",
                    Refresh = true
                });
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary></summary>
        [Authorize]
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> SendLoginNotification(NotificationModel notif)
        {
            try
            {
                await lContext.Clients.All.SendAsync("notifEventHandler", new
                {
                    notif.Sender,
                    Message = notif.Sender + " has logged in.",
                    Refresh = false
                });
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}