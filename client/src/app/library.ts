import { Injectable } from '@angular/core';
import { Book } from './book';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Library {
  url = environment.apiUrl;

  constructor() { }

  async getAllBooks() : Promise<Book[]> {
    const data = await fetch(`${this.url}/books`);
    return await data.json() ?? [];
  }
}
