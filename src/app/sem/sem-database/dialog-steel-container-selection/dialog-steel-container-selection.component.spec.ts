import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSteelContainerSelectionComponent } from './dialog-steel-container-selection.component';

describe('DialogSteelContainerSelectionComponent', () => {
  let component: DialogSteelContainerSelectionComponent;
  let fixture: ComponentFixture<DialogSteelContainerSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogSteelContainerSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSteelContainerSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
