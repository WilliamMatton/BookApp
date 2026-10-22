import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Quotes } from './quotes/quotes';
import { PageNotFound } from './page-not-found/page-not-found';
import { AddQuote } from './add-quote/add-quote';
import { UpdateQuote } from './update-quote/update-quote';
import { bookRoutes } from './features/books/books.route';

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
  { path: '', loadChildren: () => import('./features/books/books.route').then(m => bookRoutes) },
  { path: '', loadChildren: () => import('./features/auth/auth.routes').then(m => m.authRoutes) },
  {
    path: 'quotes/add',
    component: AddQuote,
    title: 'Add Quote',
  },
  {
    path: 'quotes/update/:id',
    component: UpdateQuote,
    title: 'Update Quote',
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
