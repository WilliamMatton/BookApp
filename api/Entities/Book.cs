using Api.Models;

namespace Api.Entities;

public class Book
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public string Author { get; set; } = null!;
    public int YearPublished { get; set; }
    public ReadingStatus Status { get; set; } = ReadingStatus.ToRead;
}