import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Quote, NewQuote } from './quote';

@Injectable({
  providedIn: 'root',
})
export class QuoteApi {
  private url = environment.apiUrl;
  private http = inject(HttpClient);

  constructor() {}

  getAllQuotes(): Observable<Quote[]> {
    return this.http.get<Quote[]>(`${this.url}/quotes`, {
      timeout: 10000,
    });
  }

  getQuoteById(id: number): Observable<Quote> {
    return this.http.get<Quote>(`${this.url}/quotes/${id}`, {
      timeout: 10000,
    });
  }

  addQuote(newQuote: NewQuote): Observable<Quote> {
    return this.http.post<Quote>(`${this.url}/quotes`, newQuote, {
      timeout: 10000,
    });
  }

  updateQuote(id: number, newQuote: NewQuote): Observable<void> {
    return this.http.put<void>(`${this.url}/quotes/${id}`, newQuote);
  }

  deleteQuote(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/quotes/${id}`);
  }
}
