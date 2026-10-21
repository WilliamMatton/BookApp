using System.ComponentModel.DataAnnotations;

namespace Api.Models;

public class CreateQuoteDto
{
    [Required(ErrorMessage = "Quote text is required")]
    [StringLength(500, MinimumLength = 1, ErrorMessage = "Quote text must include at least one character")]
    public string QuoteText { get; set; } = string.Empty;

    [Required(ErrorMessage = "Source is required")]
    [StringLength(500, MinimumLength = 1, ErrorMessage = "Source must include at least one character")]
    public string Source { get; set; } = string.Empty;
}