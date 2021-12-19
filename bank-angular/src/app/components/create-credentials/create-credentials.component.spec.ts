import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCredentialsComponent } from './create-credentials.component';

describe('CreateCredentialsComponent', () => {
  let component: CreateCredentialsComponent;
  let fixture: ComponentFixture<CreateCredentialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCredentialsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
