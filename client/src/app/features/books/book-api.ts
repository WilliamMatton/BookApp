import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book, NewBook } from '@/features/books/book';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookApi {
  private url = environment.apiUrl;
  private http = inject(HttpClient);

  constructor() {}

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.url}/books`, {
      timeout: 10000,
    });
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.url}/books/${id}`, {
      timeout: 10000,
    });
  }

  addBook(newBook: NewBook): Observable<Book> {
    return this.http.post<Book>(`${this.url}/books`, newBook, {
      timeout: 10000,
    });
  }

  updateBook(id: number, newBook: NewBook): Observable<void> {
    return this.http.put<void>(`${this.url}/books/${id}`, newBook);
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/books/${id}`);
  }
}
