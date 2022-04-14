import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridSemTypeComponent } from './ag-grid-sem-type.component';

describe('AgGridSemTypeComponent', () => {
  let component: AgGridSemTypeComponent;
  let fixture: ComponentFixture<AgGridSemTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgGridSemTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgGridSemTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
