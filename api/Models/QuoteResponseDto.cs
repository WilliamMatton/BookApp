namespace Api.Models;

public class QuoteResponseDto
{
    public required int Id { get; set; }
    public required string QuoteText { get; set; }
    public required string Source { get; set; }
}