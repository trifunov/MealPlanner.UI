import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDetailedComponent } from './report-detailed.component';

describe('ReportDetailedComponent', () => {
  let component: ReportDetailedComponent;
  let fixture: ComponentFixture<ReportDetailedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportDetailedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
