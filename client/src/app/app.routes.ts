import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Quotes } from './quotes/quotes';
import { AddBook } from './add-book/add-book';
import { UpdateBook } from './update-book/update-book';
import { PageNotFound } from './page-not-found/page-not-found';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Home Page',
  },
  {
    path: 'quotes',
    component: Quotes,
    title: 'Quotes',
  },
  {
    path: 'add',
    component: AddBook,
    title: 'Add Book',
  },
  {
    path: 'not-found',
    component: PageNotFound,
    title: 'Page Not Found',
  },
  {
    path: '**',
    component: PageNotFound,
    title: 'Page Not Found',
  },
];
