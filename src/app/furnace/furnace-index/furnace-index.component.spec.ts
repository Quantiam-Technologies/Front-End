import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FurnaceIndexComponent } from './furnace-index.component';

describe('FurnaceIndexComponent', () => {
  let component: FurnaceIndexComponent;
  let fixture: ComponentFixture<FurnaceIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FurnaceIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FurnaceIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
