import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpSteelCardComponent } from './pop-up-steel-card.component';

describe('PopUpSteelCardComponent', () => {
  let component: PopUpSteelCardComponent;
  let fixture: ComponentFixture<PopUpSteelCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopUpSteelCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpSteelCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
