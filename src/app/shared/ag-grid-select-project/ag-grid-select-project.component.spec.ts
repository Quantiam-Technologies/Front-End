import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridSelectProjectComponent } from './ag-grid-select-project.component';

describe('AgGridSelectProjectComponent', () => {
  let component: AgGridSelectProjectComponent;
  let fixture: ComponentFixture<AgGridSelectProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgGridSelectProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgGridSelectProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
