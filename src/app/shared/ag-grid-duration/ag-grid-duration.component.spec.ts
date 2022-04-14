import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridDurationComponent } from './ag-grid-duration.component';

describe('AgGridDurationComponent', () => {
  let component: AgGridDurationComponent;
  let fixture: ComponentFixture<AgGridDurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgGridDurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgGridDurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
