using System.ComponentModel.DataAnnotations;

namespace Api.Models;
public class CreateBookDto
{
    [Required(ErrorMessage = "Title is required")]
    [StringLength(200, MinimumLength = 1, ErrorMessage = "Title must include at least one character")]
    public string Title { get; set; } = string.Empty;
    
    [Required(ErrorMessage = "Author is required")]
    [StringLength(200, MinimumLength = 1, ErrorMessage = "Author must include at least one character")]
    public string Author { get; set; } = string.Empty;
    
    [Range(1, 2099, ErrorMessage = "Book must be published between years 1 and 2099")]
    public int YearPublished { get; set; }
    
    [EnumDataType(typeof(ReadingStatus))]
    public ReadingStatus Status { get; set; } = ReadingStatus.ToRead;
}
