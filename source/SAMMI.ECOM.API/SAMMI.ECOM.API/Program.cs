using Autofac;
using Autofac.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using SAMMI.ECOM.API.Infrastructure.AutofacModules;
using SAMMI.ECOM.Infrastructure;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy",
        builder => builder
            .SetIsOriginAllowed((host) => true)
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials());
});
builder.Services.AddAutoMapper(typeof(Program));
var serverVersion = new MySqlServerVersion(new Version(8, 0, 2));
builder.Services.AddDbContext<SammiEcommerceContext>(
    dbContextOptions => dbContextOptions
        .UseMySql(configuration.GetConnectionString("EComConnection"), serverVersion)
        .LogTo(Console.WriteLine, LogLevel.Information)
        .EnableSensitiveDataLogging()
        .EnableDetailedErrors()
);

builder.Host.UseServiceProviderFactory(new AutofacServiceProviderFactory());
builder.Host.ConfigureContainer<ContainerBuilder>(
    b => b.RegisterModule(new ApplicationModule(builder.Configuration))
        .RegisterModule<MediatorModule>()
);



var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<SammiEcommerceContext>();
    await DataSeeder.SeedAsync(context);
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
