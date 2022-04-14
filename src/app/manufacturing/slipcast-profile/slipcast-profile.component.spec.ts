import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlipcastProfileComponent } from './slipcast-profile.component';

describe('SlipcastProfileComponent', () => {
  let component: SlipcastProfileComponent;
  let fixture: ComponentFixture<SlipcastProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlipcastProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlipcastProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
