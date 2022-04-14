import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineUserDialogComponent } from './machine-user-dialog.component';

describe('MachineUserDialogComponent', () => {
  let component: MachineUserDialogComponent;
  let fixture: ComponentFixture<MachineUserDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachineUserDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
