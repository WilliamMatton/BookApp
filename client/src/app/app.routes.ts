import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Quotes } from './quotes/quotes';
import { AddBook } from './add-book/add-book';
import { UpdateBook } from './update-book/update-book';
import { PageNotFound } from './page-not-found/page-not-found';
import { Login } from './login/login';
import { SignUp } from './sign-up/sign-up';
import { AddQuote } from './add-quote/add-quote';

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
    path: 'books/add',
    component: AddBook,
    title: 'Add Book',
  },
  {
    path: 'books/update/:id',
    component: UpdateBook,
    title: 'Update Book',
  },
  {
    path: 'signup',
    component: SignUp,
    title: 'Sign Up',
  },
  {
    path: 'login',
    component: Login,
    title: 'Sign In',
  },
  {
    path: 'quotes/add',
    component: AddQuote,
    title: 'Add Quote',
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
