import { Routes } from '@angular/router';
import { Quotes } from './quotes/quotes';
import { AddQuote } from './add-quote/add-quote';
import { UpdateQuote } from './update-quote/update-quote';

export const quoteRoutes: Routes = [
  { path: '', component: Quotes, title: 'Quotes', },
  { path: 'add', component: AddQuote, title: 'Add Quote', },
  { path: 'update/:id', component: UpdateQuote, title: 'Update Quote', },
];
