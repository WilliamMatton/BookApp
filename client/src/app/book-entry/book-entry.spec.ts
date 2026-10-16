import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookEntry } from './book-entry';

describe('BookEntry', () => {
  let component: BookEntry;
  let fixture: ComponentFixture<BookEntry>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookEntry]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookEntry);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
