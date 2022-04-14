import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniXrdComponent } from './mini-xrd.component';

describe('MiniXrdComponent', () => {
  let component: MiniXrdComponent;
  let fixture: ComponentFixture<MiniXrdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiniXrdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniXrdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
