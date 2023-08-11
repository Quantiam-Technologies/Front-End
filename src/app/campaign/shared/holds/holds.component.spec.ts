import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoldsComponent } from './holds.component';

describe('HoldsComponent', () => {
  let component: HoldsComponent;
  let fixture: ComponentFixture<HoldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HoldsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HoldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
