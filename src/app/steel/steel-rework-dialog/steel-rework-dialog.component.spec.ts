import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SteelReworkDialogComponent } from './steel-rework-dialog.component';

describe('SteelReworkDialogComponent', () => {
  let component: SteelReworkDialogComponent;
  let fixture: ComponentFixture<SteelReworkDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SteelReworkDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SteelReworkDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
