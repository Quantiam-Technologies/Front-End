import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridSelectSteelOrContainerComponent } from './ag-grid-select-steel-or-container.component';

describe('AgGridSelectSteelOrContainerComponent', () => {
  let component: AgGridSelectSteelOrContainerComponent;
  let fixture: ComponentFixture<AgGridSelectSteelOrContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgGridSelectSteelOrContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgGridSelectSteelOrContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
