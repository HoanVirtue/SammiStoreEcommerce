using Autofac;
using SAMMI.ECOM.Core.Authorizations;
using SAMMI.ECOM.Infrastructure.Queries;
using SAMMI.ECOM.Infrastructure.Repositories;
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

            // Register all the Repository classes (they implement CrudRepository) in assembly holding the Repositories
            builder.RegisterAssemblyTypes(typeof(UsersRepository).GetTypeInfo().Assembly)
                .AsClosedTypesOf(typeof(ICrudRepository<>));

            // Register all the Queries classes (they implement QueryRepository) in assembly holding the QueryRepositories
            builder.RegisterAssemblyTypes(typeof(UsersQueries).GetTypeInfo().Assembly)
                .AsImplementedInterfaces();
            base.Load(builder);
        }
    }
}
