﻿using Microsoft.Build.Framework;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using ProtaskerBackend.Data;
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<ProtaskerBackendContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("ProtaskerBackendContext") ?? throw new InvalidOperationException("Connection string 'ProtaskerBackendContext' not found.")));

// Add CORS
var allowOriginPolicy = "AllowOriginPolicy";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: allowOriginPolicy, policy =>
    {
        policy
            .WithOrigins("http://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
}
);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(allowOriginPolicy);

app.UseAuthorization();

app.MapControllers();

app.Run();
