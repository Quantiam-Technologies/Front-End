import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FurnaceRunComponent } from './furnace-run.component';

describe('FurnaceRunComponent', () => {
  let component: FurnaceRunComponent;
  let fixture: ComponentFixture<FurnaceRunComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FurnaceRunComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FurnaceRunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
