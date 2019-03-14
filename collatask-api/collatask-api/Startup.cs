using collatask_api.TaskHub;
using collatask_repository.Interface;
using collatask_repository.Repository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Swashbuckle.AspNetCore.Swagger;
using System;
using System.IO;
using System.Reflection;

namespace collatask_api
{
    /// <summary></summary>
    public class Startup
    {
        /// <summary></summary>
        public Startup(IConfiguration configuration) => Configuration = configuration;

        /// <summary></summary>
        public IConfiguration Configuration { get; }

        /// <summary>This method gets called by the runtime. Use this method to add services to the container.</summary>
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            services.AddCors(options =>
            {
                options.AddPolicy("CollaTaskCors", builder => builder
                    .WithOrigins("https://localhost:4200", "http://localhost:4200", "https://localhost:4201", "http://localhost:4201")
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials());
            });

            services.AddSignalR();

            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new Info { Title = "API", Version = "1.0.0" });
                // Set the comments path for the Swagger JSON and UI.
                options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, $"{Assembly.GetExecutingAssembly().GetName().Name}.xml"));
            });

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.Authority = "https://securetoken.google.com/collatask";
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidIssuer = "https://securetoken.google.com/collatask",
                        ValidateAudience = true,
                        ValidAudience = "collatask",
                        ValidateLifetime = true
                    };
                });

            #region DEPENDENCY INJECTION
            const string LiteDbLocation = "collatask.db";

            services.AddScoped<ITodoRepository>(repo => new TodoRepository(LiteDbLocation));
            services.AddScoped<ISubTodoRepository>(repo => new SubTodoRepository(LiteDbLocation));
            #endregion
        }

        /// <summary>This method gets called by the runtime. Use this method to configure the HTTP request pipeline.</summary>
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseCors("CollaTaskCors");

            if (env.IsDevelopment())
                app.UseDeveloperExceptionPage();
            else app.UseHsts();

            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.), 
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(options =>
            {
                options.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1.0.0");
                options.RoutePrefix = string.Empty;
            });

            app.UseAuthentication();

            app.UseSignalR(routes =>
            {
                routes.MapHub<NotificationHub>("/task-notif");
            });

            app.UseHttpsRedirection();
            app.UseMvc();
        }
    }
}
