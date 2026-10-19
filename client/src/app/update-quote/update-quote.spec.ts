import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateQuote } from './update-quote';

describe('UpdateQuote', () => {
  let component: UpdateQuote;
  let fixture: ComponentFixture<UpdateQuote>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateQuote]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateQuote);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
