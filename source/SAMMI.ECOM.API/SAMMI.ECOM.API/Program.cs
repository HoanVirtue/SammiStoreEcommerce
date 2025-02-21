using Autofac;
using Autofac.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using SAMMI.ECOM.API.Infrastructure;
using SAMMI.ECOM.API.Infrastructure.AutofacModules;
using SAMMI.ECOM.Core.Models.GlobalConfigs;
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

// Configure lowercase routes
builder.Services.Configure<RouteOptions>(options =>
{
    options.LowercaseUrls = true;
});

var tokenOptionSettingsSection = builder.Configuration.GetSection("TokenProvideOptions");
var tokenOptionSettings = tokenOptionSettingsSection.Get<AccessTokenProvideOptions>();

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, x =>
    {
        x.SaveToken = true;
        x.RequireHttpsMetadata = false;
        x.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
        {
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuer = true,
            ValidateIssuerSigningKey = true,
            ClockSkew = TimeSpan.Zero,
            ValidIssuer = tokenOptionSettings!.JWTIssuer,
            IssuerSigningKey = tokenOptionSettings!.SigningCredentials.Key
        };
    });

await builder.Services.AddElasticSearch(builder.Configuration);

builder.Services.AddAuthorization();
var app = builder.Build();

app.UseCors("CorsPolicy");

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<SammiEcommerceContext>();
    var dataSeed = new DataSeeder(context);
    await dataSeed.SeedAsync();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
