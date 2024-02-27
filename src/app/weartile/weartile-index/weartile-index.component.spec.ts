import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeartileIndexComponent } from './weartile-index.component';

describe('WeartileIndexComponent', () => {
  let component: WeartileIndexComponent;
  let fixture: ComponentFixture<WeartileIndexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeartileIndexComponent]
    });
    fixture = TestBed.createComponent(WeartileIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
