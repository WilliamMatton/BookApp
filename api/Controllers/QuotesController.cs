using Api.Data;
using Api.Entities;
using Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class QuotesController(AppDbContext context) : ControllerBase
{
    private readonly AppDbContext _context = context;

    [HttpGet]
    public async Task<ActionResult<List<QuoteResponseDto>>> GetQuotes()
    {
        var quotes = await _context.Quotes.Select(quote =>
            new QuoteResponseDto
            {
                Id = quote.Id,
                QuoteText = quote.QuoteText,
                Source = quote.Source
            }
        ).ToListAsync();

        return Ok(quotes);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<QuoteResponseDto>> GetQuoteById(int id)
    {
        var quote = await _context.Quotes.FindAsync(id);
        if (quote is null)
            return NotFound();

        return Ok(new QuoteResponseDto
        {
            Id = quote.Id,
            QuoteText = quote.QuoteText,
            Source = quote.Source
        });
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<QuoteResponseDto>> AddQuote(CreateQuoteDto newQuote)
    {
        if (newQuote is null)
            return BadRequest();

        var quote = new Quote
        {
            QuoteText = newQuote.QuoteText,
            Source = newQuote.Source
        };

        _context.Quotes.Add(quote);
        await _context.SaveChangesAsync();
        return CreatedAtAction(
            nameof(GetQuoteById),
            new { id = quote.Id },
            new QuoteResponseDto
            {
                Id = quote.Id,
                QuoteText = quote.QuoteText,
                Source = quote.Source
            });
    }

    [Authorize]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateQuote(int id, CreateQuoteDto updatedQuote)
    {
        var quote = await _context.Quotes.FindAsync(id);
        if (quote is null)
            return NotFound();

        quote.QuoteText = updatedQuote.QuoteText;
        quote.Source = updatedQuote.Source;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    [Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteQuote(int id)
    {
        var quote = await _context.Quotes.FindAsync(id);
        if (quote is null)
            return NotFound();
        _context.Quotes.Remove(quote);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}