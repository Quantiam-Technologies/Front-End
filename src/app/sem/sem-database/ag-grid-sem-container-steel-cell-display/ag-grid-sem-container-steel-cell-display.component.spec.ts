import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridSemContainerSteelCellDisplayComponent } from './ag-grid-sem-container-steel-cell-display.component';

describe('AgGridSemContainerSteelCellDisplayComponent', () => {
  let component: AgGridSemContainerSteelCellDisplayComponent;
  let fixture: ComponentFixture<AgGridSemContainerSteelCellDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgGridSemContainerSteelCellDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgGridSemContainerSteelCellDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
