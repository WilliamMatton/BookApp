import { Routes } from '@angular/router';
import { AddBook } from '@/features/books/add-book/add-book';
import { UpdateBook } from '@/features/books/update-book/update-book';

export const bookRoutes: Routes = [
  { path: 'add', component: AddBook, title: 'Add Book' },
  { path: 'update/:id', component: UpdateBook, title: 'Update Book' },
];
