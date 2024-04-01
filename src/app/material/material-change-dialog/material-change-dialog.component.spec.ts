import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialChangeDialogComponent } from './material-change-dialog.component';

describe('MaterialChangeDialogComponent', () => {
  let component: MaterialChangeDialogComponent;
  let fixture: ComponentFixture<MaterialChangeDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaterialChangeDialogComponent]
    });
    fixture = TestBed.createComponent(MaterialChangeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
