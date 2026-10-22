import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book, NewBook } from './features/books/book';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Quote, NewQuote } from './features/quotes/quote';

@Injectable({
  providedIn: 'root',
})
export class Library {
  private url = environment.apiUrl;
  private http = inject(HttpClient);

  constructor() { }

  getAllBooks() : Observable<Book[]> {
    return this.http.get<Book[]>(`${this.url}/books`, {
      timeout: 10000
    });
  }

  getBookById(id: number) : Observable<Book> {
    return this.http.get<Book>(`${this.url}/books/${id}`, {
      timeout: 10000
    });
  }

  addBook(newBook: NewBook) : Observable<Book> {
    return this.http.post<Book>(`${this.url}/books`, newBook, {
      timeout: 10000
    });
  }

  updateBook(id: number, newBook: NewBook) : Observable<void> {
    return this.http.put<void>(`${this.url}/books/${id}`, newBook);
  }

  deleteBook(id: number) : Observable<void> {
    return this.http.delete<void>(`${this.url}/books/${id}`);
  }

  getAllQuotes() : Observable<Quote[]> {
    return this.http.get<Quote[]>(`${this.url}/quotes`, {
      timeout: 10000
    });
  }

  getQuoteById(id: number) : Observable<Quote> {
    return this.http.get<Quote>(`${this.url}/quotes/${id}`, {
      timeout: 10000
    });
  }

  addQuote(newQuote: NewQuote) : Observable<Quote> {
    return this.http.post<Quote>(`${this.url}/quotes`, newQuote, {
      timeout: 10000
    });
  }

  updateQuote(id: number, newQuote: NewQuote) : Observable<void> {
    return this.http.put<void>(`${this.url}/quotes/${id}`, newQuote);
  }

  deleteQuote(id: number) : Observable<void> {
    return this.http.delete<void>(`${this.url}/quotes/${id}`);
  }
}
