using Microsoft.EntityFrameworkCore;
using System;
using System.Data.Common;
using System.Collections.Generic;

using DotNetEnv;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;

var builder = WebApplication.CreateBuilder(args);

Env.Load();

builder.Services.AddOpenApi();
builder.Services.AddControllers();

builder.Services.AddIdentity<IdentityUser, IdentityRole>(options =>
    {
        options.Password.RequireDigit = true;
        options.Password.RequiredLength = 6;
        options.Password.RequireNonAlphanumeric = false;
        options.Password.RequireUppercase = false;
    })
    .AddEntityFrameworkStores<AppDbContext>()
    .AddDefaultTokenProviders();

builder.Services.AddDbContext<AppDbContext>(options =>
{
   
    var envHost = Environment.GetEnvironmentVariable("DB_HOST");
    string cs;
    if (!string.IsNullOrEmpty(envHost))
    {
        var host = envHost;
        var port = Environment.GetEnvironmentVariable("DB_PORT") ?? "3306";
        var user = Environment.GetEnvironmentVariable("DB_USER") ?? "";
        var pass = Environment.GetEnvironmentVariable("DB_PASSWORD") ?? "";
        var db = Environment.GetEnvironmentVariable("DB_NAME") ?? "";
        cs = $"Server={host};Port={port};Database={db};User={user};Password={pass};TreatTinyAsBoolean=true";
    }
    else
    {
        cs = builder.Configuration.GetConnectionString("DefaultConnection");
    }

    options.UseMySql(cs, ServerVersion.AutoDetect(cs));
});
var app = builder.Build();



if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}
app.MapControllers();
app.UseAuthentication();
app.UseAuthorization();

app.UseHttpsRedirection();






app.Run();
