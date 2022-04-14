import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbinIndexComponent } from './arbin-index.component';

describe('ArbinIndexComponent', () => {
  let component: ArbinIndexComponent;
  let fixture: ComponentFixture<ArbinIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArbinIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArbinIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
