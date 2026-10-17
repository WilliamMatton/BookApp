import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBookModal } from './delete-book-modal';

describe('DeleteBookModal', () => {
  let component: DeleteBookModal;
  let fixture: ComponentFixture<DeleteBookModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteBookModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteBookModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
