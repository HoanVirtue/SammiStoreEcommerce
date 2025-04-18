﻿using Autofac;
using Autofac.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication.OAuth;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.EntityFrameworkCore;
using SAMMI.ECOM.API.Infrastructure;
using SAMMI.ECOM.API.Infrastructure.AutofacModules;
using SAMMI.ECOM.API.Infrastructure.Configuration;
using SAMMI.ECOM.Core.Models.GlobalConfigs;
using SAMMI.ECOM.Infrastructure;
using SAMMI.ECOM.Infrastructure.Services.Caching;
using SAMMI.ECOM.Infrastructure.Services.GHN_API;
using StackExchange.Redis;

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
var serverVersion = new MySqlServerVersion(new Version(9, 2, 0));
builder.Services.AddDbContext<SammiEcommerceContext>(
    dbContextOptions => dbContextOptions
        .UseMySql(configuration.GetConnectionString("DefaultConnection"), serverVersion)
        .LogTo(Console.WriteLine, Microsoft.Extensions.Logging.LogLevel.Information)
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
    .AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = GoogleDefaults.AuthenticationScheme;
    })
    .AddCookie().AddGoogle(options =>
    {
        IConfigurationSection googleSection = builder.Configuration.GetSection("Authentication:Google");
        options.ClientId = googleSection["ClientId"];
        options.ClientSecret = googleSection["ClientSecret"];
        options.SignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
        options.CallbackPath = "/api/auth/google-login";
        options.SaveTokens = true;
        options.Scope.Add("profile");
        options.Scope.Add("https://www.googleapis.com/auth/user.phonenumbers.read");
        options.Events = new OAuthEvents
        {
            OnCreatingTicket = async context =>
            {
                var serviceProvider = context.HttpContext.RequestServices;
                var googleHandler = serviceProvider.GetRequiredService<GoogleAuthenticationHandler>();
                await googleHandler.HandleOnCreatingTicket(context);
            }
        };

    })
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
try
{
    var multiplexer = ConnectionMultiplexer.Connect(builder.Configuration.GetValue<string>("RedisOptions:ConnectionString"));
    builder.Services.AddSingleton<IConnectionMultiplexer>(multiplexer);
    builder.Services.AddScoped(typeof(IRedisService<>), typeof(RedisService<>));
}
catch (Exception ex)
{
    Console.WriteLine($"Error connect Redis: {ex.Message}");
}

builder.Services.AddDataProtection()
    .PersistKeysToFileSystem(new DirectoryInfo("/root/.aspnet/DataProtection-Keys"));

builder.Services.AddHttpClient();

var app = builder.Build();

app.UseCors("CorsPolicy");

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<SammiEcommerceContext>();
    var ghnService = scope.ServiceProvider.GetRequiredService<IGHNService>();
    var dataSeed = new DataSeeder(context, ghnService);
    if (!context.Database.CanConnect())
    {
        // Nếu DB chưa tồn tại, tạo DB và chạy migration
        Console.WriteLine("Database does not exist. Creating and applying migrations...");
        context.Database.EnsureCreated(); // Tạo DB nếu chưa có (không áp dụng migration)
        context.Database.Migrate();       // Áp dụng các migration
    }
    else
    {
        // Nếu DB đã tồn tại, chỉ áp dụng migration nếu cần
        Console.WriteLine("Database exists. Applying migrations if pending...");
        context.Database.Migrate();
    }
    await dataSeed.SeedAsync();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
//app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
