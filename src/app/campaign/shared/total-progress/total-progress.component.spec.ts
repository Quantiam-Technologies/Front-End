import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalProgressComponent } from './total-progress.component';

describe('TotalProgressComponent', () => {
  let component: TotalProgressComponent;
  let fixture: ComponentFixture<TotalProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalProgressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
