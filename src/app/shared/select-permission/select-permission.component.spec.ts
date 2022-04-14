import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPermissionComponent } from './select-permission.component';

describe('SelectPermissionComponent', () => {
  let component: SelectPermissionComponent;
  let fixture: ComponentFixture<SelectPermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectPermissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
