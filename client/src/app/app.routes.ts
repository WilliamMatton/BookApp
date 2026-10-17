import { Routes } from '@angular/router';
import { Home } from './home/home'; 
import { Quotes } from './quotes/quotes';
import { AddBook } from './add-book/add-book';

export const routes: Routes = [
    {
        path: '',
        component: Home,
        title: 'Home Page'
    },
    {
        path: 'quotes',
        component: Quotes,
        title: 'Quotes'
    },
    {
        path: 'add',
        component: AddBook,
        title: 'Add Book'
    }
];
