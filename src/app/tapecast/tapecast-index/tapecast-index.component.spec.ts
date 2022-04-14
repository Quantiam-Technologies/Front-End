import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TapecastIndexComponent } from './tapecast-index.component';

describe('TapecastIndexComponent', () => {
  let component: TapecastIndexComponent;
  let fixture: ComponentFixture<TapecastIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TapecastIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TapecastIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
