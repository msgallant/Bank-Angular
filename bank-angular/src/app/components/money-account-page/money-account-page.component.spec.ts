import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyAccountPageComponent } from './money-account-page.component';

describe('MoneyAccountPageComponent', () => {
  let component: MoneyAccountPageComponent;
  let fixture: ComponentFixture<MoneyAccountPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoneyAccountPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyAccountPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
