import { Routes } from '@angular/router';
import { Home } from './home/home';
import { PageNotFound } from './page-not-found/page-not-found';
import { bookRoutes } from './features/books/books.route';
import { quoteRoutes } from './features/quotes/quotes.routes';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Home Page',
  },
  { path: '', loadChildren: () => import('./features/quotes/quotes.routes').then(m => m.quoteRoutes) },
  { path: '', loadChildren: () => import('./features/books/books.route').then(m => m.bookRoutes) },
  { path: '', loadChildren: () => import('./features/auth/auth.routes').then(m => m.authRoutes) },
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
