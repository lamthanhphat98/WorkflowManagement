using EntityContext;
using IRepository;
using IService;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json.Serialization;
using Repository;
using Service;
using Swagger;
using Swashbuckle.AspNetCore.Swagger;
using WorkflowManagement.IRepository;
using WorkflowManagement.IService;
using WorkflowManagement.Repository;
using WorkflowManagement.Service;

namespace WorkflowManagement
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
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
            //database azure
            //  services.AddDbContext<WorkflowContext>(options =>
            //options.UseSqlServer("Server=tcp:workflow3idbserver.database.windows.net," +
            //"1433; Initial Catalog = WorkflowManegement; Persist Security Info = False; User ID = workflowadmin; Password = faker01@123;" +
            //"MultipleActiveResultSets = False; Encrypt = True; TrustServerCertificate = False; Connection Timeout = 30; "));
            // => Localhost database
            services.AddDbContext<WorkflowContext>(options =>
             options.UseSqlServer("Server = PHATLTSE62882\\SQLEXPRESS; Database = Workflow; Trusted_Connection = True;"));

            //services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1)
                .AddJsonOptions(options =>
                {
                    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                });

            //services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1)
            //    .AddJsonOptions(options =>
            //    {
            //        var resolver = options.SerializerSettings.ContractResolver;
            //        if (resolver != null)
            //        {
            //            (resolver as DefaultContractResolver).NamingStrategy = null;
            //        }
            //    });
            services.AddSwaggerGen(x =>
            {
                x.SwaggerDoc("v1", new Info { Title = "Workflow API", Version = "v1" });
            });
            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<IUserService, UserService>();
   
            services.AddTransient<ICommentRepository, CommentRepository>();
            services.AddTransient<ICommentService, CommentService>();
            services.AddTransient<IUserOrganizationRepository, UserOrganizationRepository>();
            services.AddTransient<IUserOrganizationService, UserOrganizationService>();
            services.AddTransient<ITaskMemberRepository, TaskMemberRepository>();
            services.AddTransient<ITaskMemberService, TaskMemberService>();
            services.AddTransient<IOrganizationService, OrganizationService>();
            services.AddTransient<IOrganizationRepository, OrganizationRepository>();
            services.AddTransient<IChecklistService, ChecklistService>();
            services.AddTransient<IChecklistRepository, ChecklistRepository>();
            services.AddTransient<ITaskItemRepository, TaskItemRepository>();
            services.AddTransient<ITaskItemService, TaskItemService>();
            services.AddCors();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            var swaggerOptions = new SwaggerOption();
            Configuration.GetSection(nameof(SwaggerOptions)).Bind(swaggerOptions);
            app.UseSwagger(options =>
            {
                options.RouteTemplate = swaggerOptions.JsonRoute;
            });
            app.UseSwaggerUI(options =>
            {
                options.SwaggerEndpoint(swaggerOptions.UIEndpoint, swaggerOptions.Description);
            });

            app.UseCors(options => options.WithOrigins("http://localhost:4200")
            .AllowAnyMethod()
            .AllowAnyHeader());

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}
