using Api.Data;
using Api.Entities;
using Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BooksController(AppDbContext context) : ControllerBase
{
    private readonly AppDbContext _context = context;

    [HttpGet]
    public async Task<ActionResult<List<BookResponseDto>>> GetBooks()
    {
        var books = await _context.Books.Select(book =>
            new BookResponseDto
            {
                Id = book.Id,
                Title = book.Title,
                Author = book.Author,
                YearPublished = book.YearPublished,
                Status = book.Status
            }
        ).ToListAsync();

        return Ok(books);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<BookResponseDto>> GetBookById(int id)
    {
        var book = await _context.Books.FindAsync(id);
        if (book == null)
            return NotFound();

        return Ok(new BookResponseDto
        {
            Id = book.Id,
            Title = book.Title,
            Author = book.Author,
            YearPublished = book.YearPublished,
            Status = book.Status
        });
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<BookResponseDto>> AddBook(CreateBookDto newBook)
    {
        if (newBook == null)
            return BadRequest();

        var book = new Book
        {
            Title = newBook.Title,
            Author = newBook.Author,
            YearPublished = newBook.YearPublished,
            Status = newBook.Status
        };

        _context.Books.Add(book);
        await _context.SaveChangesAsync();
        return CreatedAtAction(
            nameof(GetBookById),
            new { id = book.Id },
            new BookResponseDto
            {
                Id = book.Id,
                Title = book.Title,
                Author = book.Author,
                YearPublished = book.YearPublished,
                Status = book.Status
            });
    }

    [Authorize]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateBook(int id, CreateBookDto updatedBook)
    {
        var book = await _context.Books.FindAsync(id);
        if (book == null)
            return NotFound();

        book.Title = updatedBook.Title;
        book.Author = updatedBook.Author;
        book.YearPublished = updatedBook.YearPublished;
        book.Status = updatedBook.Status;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    [Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBook(int id)
    {
        var book = await _context.Books.FindAsync(id);
        if (book == null)
            return NotFound();
        _context.Books.Remove(book);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}