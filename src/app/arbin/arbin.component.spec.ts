import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbinComponent } from './arbin.component';

describe('ArbinComponent', () => {
  let component: ArbinComponent;
  let fixture: ComponentFixture<ArbinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArbinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArbinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
