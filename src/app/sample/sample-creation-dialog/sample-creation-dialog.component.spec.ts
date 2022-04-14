import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleCreationDialogComponent } from './sample-creation-dialog.component';

describe('SampleCreationDialogComponent', () => {
  let component: SampleCreationDialogComponent;
  let fixture: ComponentFixture<SampleCreationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SampleCreationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleCreationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
