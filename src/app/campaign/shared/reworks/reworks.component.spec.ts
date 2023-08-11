import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReworksComponent } from './reworks.component';

describe('ReworksComponent', () => {
  let component: ReworksComponent;
  let fixture: ComponentFixture<ReworksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReworksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReworksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
