using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;

namespace collatask_api
{
    /// <summary></summary>
    public class Program
    {
        /// <summary></summary>
        public static void Main(string[] args) => CreateWebHostBuilder(args).Build().Run();

        /// <summary></summary>
        public static IWebHostBuilder CreateWebHostBuilder(string[] args) => WebHost.CreateDefaultBuilder(args).UseStartup<Startup>();
    }
}
