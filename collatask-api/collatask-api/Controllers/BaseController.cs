using collatask_api.TaskHub;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;

namespace collatask_api.Controllers
{
    /// <summary></summary>
    public abstract class BaseController : ControllerBase
    {
        private readonly IHubContext<NotificationHub> lContext;

        /// <summary></summary>
        public BaseController(IHubContext<NotificationHub> context) => lContext = context;
        
        internal async Task PostNotif(string currentUser, bool refresh)
        {
            await lContext.Clients.All.SendAsync("notifEventHandler", new
            {
                Sender = currentUser,
                Message = currentUser + " made changes to the database. Your view is being refreshed.",
                Refresh = refresh
            });
        }
    }
}