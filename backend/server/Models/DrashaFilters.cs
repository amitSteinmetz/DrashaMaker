namespace server.Models
{
    public class DrashaFilters
    {
        public string Parasha { get; set; } = string.Empty;
        public string? Commentator { get; set; }
        public string? Topic { get; set; }
        public string? Category { get; set; }
        public string? Length { get; set; }
        public string? Style { get; set; }
    }
}
