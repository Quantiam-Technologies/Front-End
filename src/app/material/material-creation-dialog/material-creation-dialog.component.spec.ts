import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialCreationDialogComponent } from './material-creation-dialog.component';

describe('MaterialCreationDialogComponent', () => {
  let component: MaterialCreationDialogComponent;
  let fixture: ComponentFixture<MaterialCreationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialCreationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialCreationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
