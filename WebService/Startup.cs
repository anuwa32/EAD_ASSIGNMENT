/***************************************************************
 * Filename: Startup.cs
 * Author: Dilanka Weerasekara
 * Date: 23/09/2023
 *
 * Description: This file contains the Startup class, which is
 * responsible for configuring the ASP.NET Core application.
 *
 ***************************************************************/

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TransportManagmentSystemAPI.DBconfig;
using TransportManagmentSystemAPI.Services;

namespace TransportManagmentSystemAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddCors();
            
            // Configure the database settings using appsettings.json
            services.Configure<DatabaseSettings>(Configuration.GetSection(nameof(DatabaseSettings)));
            
            // Configure the schema settings using appsettings.json
            services.Configure<Scheama>(Configuration.GetSection(nameof(Scheama)));
            
            // Register the database settings as a singleton
            services.AddSingleton<IDatabaseSettings>(x => x.GetRequiredService<IOptions<DatabaseSettings>>().Value);
            
            // Register the schema settings as a singleton
            services.AddSingleton<ISchema>(x => x.GetRequiredService<IOptions<Scheama>>().Value);
            
            // Register various services as singletons
            services.AddSingleton<UserProfileService>();
            services.AddSingleton<TrainService>();
            services.AddSingleton<TicketBookingService>();
            services.AddSingleton<LoginService>();
            
            // Configure CORS policies
            services.AddCors(options =>
            {
                options.AddDefaultPolicy(
                    builder =>
                    {
                        builder.WithOrigins("*")
                               .AllowAnyHeader()
                               .AllowAnyMethod();
                    });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();
            app.UseAuthorization();
            app.UseCors();
            
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
