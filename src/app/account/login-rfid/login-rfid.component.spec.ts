import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRfidComponent } from './login-rfid.component';

describe('LoginRfidComponent', () => {
  let component: LoginRfidComponent;
  let fixture: ComponentFixture<LoginRfidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginRfidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginRfidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
