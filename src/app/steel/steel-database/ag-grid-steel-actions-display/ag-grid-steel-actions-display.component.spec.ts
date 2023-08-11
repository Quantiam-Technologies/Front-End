import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridSteelActionsDisplayComponent } from './ag-grid-steel-actions-display.component';

describe('AgGridSteelActionsDisplayComponent', () => {
  let component: AgGridSteelActionsDisplayComponent;
  let fixture: ComponentFixture<AgGridSteelActionsDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgGridSteelActionsDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgGridSteelActionsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
