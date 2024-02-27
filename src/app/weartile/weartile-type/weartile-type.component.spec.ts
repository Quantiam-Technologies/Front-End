import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeartileTypeComponent } from './weartile-type.component';

describe('WeartileTypeComponent', () => {
  let component: WeartileTypeComponent;
  let fixture: ComponentFixture<WeartileTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeartileTypeComponent]
    });
    fixture = TestBed.createComponent(WeartileTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
