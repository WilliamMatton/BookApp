import { Component } from '@angular/core';

@Component({
  selector: 'app-book-list',
  imports: [],
  template: `
    <div class="container ps-0 pe-0 pt-5 pb-5 d-flex flex-column align-items-center gap-3 bg-white rounded-4 border" style="--bs-border-style: dashed;">
      <span class="fs-2"><i class="fa-solid fa-book align-middle"></i></span>
      <p class="p-0 m-0 fs-5 fw-semibold">Your shelf is empty</p>
      <p class="p-0 m-0 text-secondary">Add your first book to start your collection</p>
      <button type="button" class="btn btn-link fw-semibold fs-7 text-success">Add a book</button>
    </div>
  `,
  styleUrl: './book-list.scss',
})
export class BookList {

}
