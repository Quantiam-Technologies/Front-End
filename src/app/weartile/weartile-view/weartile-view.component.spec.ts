import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeartileViewComponent } from './weartile-view.component';

describe('WeartileViewComponent', () => {
  let component: WeartileViewComponent;
  let fixture: ComponentFixture<WeartileViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeartileViewComponent]
    });
    fixture = TestBed.createComponent(WeartileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
