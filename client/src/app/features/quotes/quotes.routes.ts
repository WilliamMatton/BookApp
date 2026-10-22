import { Routes } from '@angular/router';
import { Quotes } from './quotes/quotes';
import { AddQuote } from './add-quote/add-quote';
import { UpdateQuote } from './update-quote/update-quote';

export const quoteRoutes: Routes = [
  { path: 'quotes', component: Quotes, title: 'Quotes', },
  { path: 'quotes/add', component: AddQuote, title: 'Add Quote', },
  { path: 'quotes/update/:id', component: UpdateQuote, title: 'Update Quote', },
];
