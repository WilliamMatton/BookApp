using Api.Data;
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
    public async Task<ActionResult<List<Quote>>> GetQuotes()
    {
        return Ok(await _context.Quotes.ToListAsync());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Quote>> GetQuoteById(int id)
    {
        var quote = await _context.Quotes.FindAsync(id);
        if (quote is null)
            return NotFound();
        return Ok(quote);
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<Quote>> AddQuote(Quote newQuote)
    {
        if (newQuote is null)
            return BadRequest();
        _context.Quotes.Add(newQuote);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetQuoteById), new { id = newQuote.Id }, newQuote);
    }

    [Authorize]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateQuote(int id, Quote updatedQuote)
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