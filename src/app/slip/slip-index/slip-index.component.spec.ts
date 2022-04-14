import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlipIndexComponent } from './slip-index.component';

describe('SlipIndexComponent', () => {
  let component: SlipIndexComponent;
  let fixture: ComponentFixture<SlipIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlipIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlipIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
