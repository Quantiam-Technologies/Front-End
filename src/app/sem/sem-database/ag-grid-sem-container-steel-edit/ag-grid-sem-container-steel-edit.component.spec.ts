import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridSemContainerSteelEditComponent } from './ag-grid-sem-container-steel-edit.component';

describe('AgGridSemContainerSteelEditComponent', () => {
  let component: AgGridSemContainerSteelEditComponent;
  let fixture: ComponentFixture<AgGridSemContainerSteelEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgGridSemContainerSteelEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgGridSemContainerSteelEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
