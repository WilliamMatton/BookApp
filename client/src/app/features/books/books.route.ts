import { Routes } from '@angular/router';
import { AddBook } from './add-book/add-book';
import { UpdateBook } from './update-book/update-book';

export const bookRoutes: Routes = [
  { path: 'books/add', component: AddBook, title: 'Add Book' },
  { path: 'books/update/:id', component: UpdateBook, title: 'Update Book' },
];
