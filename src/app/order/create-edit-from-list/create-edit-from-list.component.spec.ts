import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditFromListComponent } from './create-edit-from-list.component';

describe('CreateEditFromListComponent', () => {
  let component: CreateEditFromListComponent;
  let fixture: ComponentFixture<CreateEditFromListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEditFromListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditFromListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
