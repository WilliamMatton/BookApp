import { Routes } from '@angular/router';
import { AddBook } from './add-book/add-book';
import { UpdateBook } from './update-book/update-book';

export const bookRoutes: Routes = [
  { path: 'add', component: AddBook, title: 'Add Book' },
  { path: 'update/:id', component: UpdateBook, title: 'Update Book' },
];
