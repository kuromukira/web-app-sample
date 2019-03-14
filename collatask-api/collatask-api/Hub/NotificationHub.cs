using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace collatask_api.TaskHub
{
    /// <summary></summary>
    public static class UserHandler
    {
        /// <summary></summary>
        public static IDictionary<string, string> ConnectedIds { get; set; } = new Dictionary<string, string>();

        /// <summary></summary>
        public static HashSet<string> Groups { get; set; } = new HashSet<string>();
    }

    /// <summary></summary>
    public class NotificationHub : Hub
    {
        /// <summary></summary>
        public string GetConnectionId()
        {
            return Context.ConnectionId;
        }

        /// <summary></summary>
        public override Task OnConnectedAsync()
        {
            UserHandler.ConnectedIds.Add(Context.ConnectionId, Guid.NewGuid().ToString());
            return base.OnConnectedAsync();
        }

        /// <summary></summary>
        public override Task OnDisconnectedAsync(Exception exception)
        {
            UserHandler.ConnectedIds.Remove(Context.ConnectionId);
            return base.OnDisconnectedAsync(exception);
        }
    }
}
