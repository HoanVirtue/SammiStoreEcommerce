using Serilog;

namespace SAMMI.ECOM.API.Infrastructure.Configuration
{
    public static class SerialLogConfiguration
    {
        public static void UseSerialLog(this WebApplicationBuilder builder)
        {
            Log.Logger = new LoggerConfiguration()
                .ReadFrom.Configuration(builder.Configuration)
                .Enrich.FromLogContext()
                .WriteTo.Console()
                .CreateLogger();

            builder.Host.UseSerilog();
        }
    }
}