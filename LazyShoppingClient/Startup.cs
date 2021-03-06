using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using LazyShoppingClient.Infrastructures;
using Newtonsoft.Json.Serialization;

namespace LazyShoppingClient
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
            services.AddCors(o => o.AddPolicy("CorsPolicy", builder =>
            {
                builder
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowAnyOrigin();
            }));
            services.AddMvc(p => p.EnableEndpointRouting = false);
            services.Configure<ClientConfig>(Configuration.GetSection("ClientConfig"));
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddControllers()
              .AddNewtonsoftJson(option =>
              {
                  option.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
              });
            services.Addmy8Authentication(Configuration, "my8.Client");
            services.AddDistributedMemoryCache();
            services.AddSession();
            MapConfig.Config(services);
            _configServices(services);
        }
        private void _configServices(IServiceCollection services)
        {
            services.AddSingleton(new HttpClient(new HttpClientHandler()
            {
                AllowAutoRedirect = false,
                AutomaticDecompression = DecompressionMethods.Deflate | DecompressionMethods.GZip
            })
            { Timeout = TimeSpan.FromSeconds(15) });
            services.AddScoped<CurrentProcess>();
            //services.AddScoped<ChatHub>();
        }
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment() || env.IsEnvironment("local"))
            {
                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true,
                    ReactHotModuleReplacement = true
                });
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();
            app.UseAuthentication();
            app.UseSession();
            app.UseMiddleware<SessionHandler>();
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
            });
        }
    }
}
