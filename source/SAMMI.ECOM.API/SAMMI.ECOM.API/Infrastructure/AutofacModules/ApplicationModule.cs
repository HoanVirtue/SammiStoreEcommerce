using Autofac;
using SAMMI.ECOM.API.Controllers;
using SAMMI.ECOM.API.Services.MediaResource;
using SAMMI.ECOM.Core.Authorizations;
using SAMMI.ECOM.Core.Models.GlobalConfigs;
using SAMMI.ECOM.Domain.AggregateModels.Others;
using SAMMI.ECOM.Infrastructure.Queries;
using SAMMI.ECOM.Infrastructure.Repositories;
using SAMMI.ECOM.Infrastructure.Services.Auth;
using SAMMI.ECOM.Infrastructure.Services.Auth.Helpers.PasswordVerification;
using SAMMI.ECOM.Repository.GenericRepositories;
using System.Reflection;

namespace SAMMI.ECOM.API.Infrastructure.AutofacModules
{
    public class ApplicationModule : Autofac.Module
    {
        private IConfiguration configuration;

        public ApplicationModule(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        protected override void Load(ContainerBuilder builder)
        {
            builder.Register(c => c.Resolve<HttpContext>())
               .As<HttpContext>()
               .SingleInstance();

            builder.RegisterType<HttpContextAccessor>()
                .As<IHttpContextAccessor>()
                .SingleInstance();

            builder.RegisterType<UserIdentity>()
                .AsSelf()
                .UsingConstructor(typeof(IHttpContextAccessor));

            builder.Register(s => configuration.GetSection("PasswordOptions")
                .Get<PasswordOptions>() ?? new PasswordOptions())
                .SingleInstance();
            builder.Register(s => configuration.GetSection("TokenProvideOptions")
                .Get<AccessTokenProvideOptions>() ?? new AccessTokenProvideOptions())
                .SingleInstance();
            builder.Register(s => configuration.GetSection("RefreshTokenProvideOptions")
                .Get<RefreshTokenProvideOptions>() ?? new RefreshTokenProvideOptions())
                .SingleInstance();


            builder.RegisterGeneric(typeof(PasswordHasher<>))
                .As(typeof(IPasswordHasher<>))
                .SingleInstance();

            builder.RegisterType<EFAuthenticationService>().As<IAuthenticationService<User>>();

            builder.RegisterType<FileStorageService>().As<IFileStorageService>();


            // Register all the Repository classes (they implement CrudRepository) in assembly holding the Repositories
            builder.RegisterAssemblyTypes(typeof(UsersRepository).GetTypeInfo().Assembly)
                .AsClosedTypesOf(typeof(ICrudRepository<>));

            // Register all the Queries classes (they implement QueryRepository) in assembly holding the QueryRepositories
            builder.RegisterAssemblyTypes(typeof(UsersQueries).GetTypeInfo().Assembly)
                .AsImplementedInterfaces();

            builder.RegisterAssemblyTypes(typeof(CustomBaseController).Assembly).PropertiesAutowired();
            base.Load(builder);
        }
    }
}
