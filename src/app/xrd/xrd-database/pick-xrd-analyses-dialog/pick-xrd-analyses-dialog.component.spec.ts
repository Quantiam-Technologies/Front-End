import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickXrdAnalysesDialogComponent } from './pick-xrd-analyses-dialog.component';

describe('PickXrdAnalysesDialogComponent', () => {
  let component: PickXrdAnalysesDialogComponent;
  let fixture: ComponentFixture<PickXrdAnalysesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickXrdAnalysesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickXrdAnalysesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
