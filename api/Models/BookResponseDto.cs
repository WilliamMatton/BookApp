namespace Api.Models;

public class BookResponseDto
{
    public required int Id { get; set; }
    public required string Title { get; set; }
    public required string Author { get; set; }
    public required int YearPublished { get; set; }
    public required ReadingStatus Status { get; set; }
}