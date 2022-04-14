import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SgxCreationDialogComponent } from './sgx-creation-dialog.component';

describe('SgxCreationDialogComponent', () => {
  let component: SgxCreationDialogComponent;
  let fixture: ComponentFixture<SgxCreationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SgxCreationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SgxCreationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
