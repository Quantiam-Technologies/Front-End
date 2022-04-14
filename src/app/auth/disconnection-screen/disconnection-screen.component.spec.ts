import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisconnectionScreenComponent } from './disconnection-screen.component';

describe('DisconnectionScreenComponent', () => {
  let component: DisconnectionScreenComponent;
  let fixture: ComponentFixture<DisconnectionScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisconnectionScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisconnectionScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
