import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateShiftSelectComponent } from './date-shift-select.component';

describe('DateShiftSelectComponent', () => {
  let component: DateShiftSelectComponent;
  let fixture: ComponentFixture<DateShiftSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateShiftSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateShiftSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
