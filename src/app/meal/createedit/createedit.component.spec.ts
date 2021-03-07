import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateeditComponent } from './createedit.component';

describe('CreateeditComponent', () => {
  let component: CreateeditComponent;
  let fixture: ComponentFixture<CreateeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
