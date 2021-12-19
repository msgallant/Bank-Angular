import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticateCredentialsComponent } from './authenticate-credentials.component';

describe('AuthenticateCredentialsComponent', () => {
  let component: AuthenticateCredentialsComponent;
  let fixture: ComponentFixture<AuthenticateCredentialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthenticateCredentialsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticateCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
