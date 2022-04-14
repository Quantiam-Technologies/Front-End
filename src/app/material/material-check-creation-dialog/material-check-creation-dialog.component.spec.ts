import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialCheckCreationDialogComponent } from './material-check-creation-dialog.component';

describe('MaterialCheckCreationDialogComponent', () => {
  let component: MaterialCheckCreationDialogComponent;
  let fixture: ComponentFixture<MaterialCheckCreationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialCheckCreationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialCheckCreationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
