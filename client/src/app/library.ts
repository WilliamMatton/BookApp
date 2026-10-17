import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book, NewBook } from './book';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

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

  addBook(newBook: NewBook) : Observable<Book> {
    return this.http.post<Book>(`${this.url}/books`, newBook, {
      timeout: 10000
    });
  }

  deleteBook(id: number) : Observable<void> {
    return this.http.delete<void>(`${this.url}/books/${id}`);
  }
}
