
using OpenAI.Chat;
using QuestPDF.Infrastructure;
using server.Repositories;
using server.Services;

namespace server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            QuestPDF.Settings.License = LicenseType.Community;
            
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            builder.Services.AddScoped<TorahRepository>();
            builder.Services.AddSingleton<ChatClient>(serviceProvider =>
            {
                var configuration = serviceProvider.GetRequiredService<IConfiguration>();
                var apiKey = configuration["OpenAI:ApiKey"];
                var model = configuration["OpenAI:Model"] ?? "gpt-4o";
                return new ChatClient(model, apiKey);
            });
            builder.Services.AddSingleton<DrashaService>(sp =>
            {
                var env = sp.GetRequiredService<IWebHostEnvironment>();
                var path = Path.Combine(env.ContentRootPath, "Utils", "DrashaStyles.json");
                return new DrashaService(path);
            });

            // Configure CORS to allow all origins (for development)
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("allowAll" ,policy =>
                {
                    policy.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader();
                });
            });
            
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            // Enforce HTTPS redirection before everything else
            app.UseHttpsRedirection();

            // Enable CORS (must be before UseAuthorization and MapControllers)
            app.UseCors("allowAll");

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
