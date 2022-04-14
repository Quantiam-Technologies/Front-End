import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SteelCreationDialogComponent } from './steel-creation-dialog.component';

describe('SteelCreationDialogComponent', () => {
  let component: SteelCreationDialogComponent;
  let fixture: ComponentFixture<SteelCreationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SteelCreationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SteelCreationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
