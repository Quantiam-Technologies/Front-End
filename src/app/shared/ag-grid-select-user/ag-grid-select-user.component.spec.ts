import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridSelectUserComponent } from './ag-grid-select-user.component';

describe('AgGridSelectUserComponent', () => {
  let component: AgGridSelectUserComponent;
  let fixture: ComponentFixture<AgGridSelectUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgGridSelectUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgGridSelectUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
