namespace Api.Models;

public class Quote
{
    public int Id { get; set; }
    public string QuoteText { get; set; } = null!;
    public string Source { get; set; } = null!;
}