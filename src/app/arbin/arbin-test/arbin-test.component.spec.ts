import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbinTestComponent } from './arbin-test.component';

describe('ArbinTestComponent', () => {
  let component: ArbinTestComponent;
  let fixture: ComponentFixture<ArbinTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArbinTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArbinTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
