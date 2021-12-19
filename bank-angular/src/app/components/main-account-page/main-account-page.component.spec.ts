import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainAccountPageComponent } from './main-account-page.component';

describe('MainAccountPageComponent', () => {
  let component: MainAccountPageComponent;
  let fixture: ComponentFixture<MainAccountPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainAccountPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainAccountPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
