import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TapecastComponent } from './tapecast.component';

describe('TapecastComponent', () => {
  let component: TapecastComponent;
  let fixture: ComponentFixture<TapecastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TapecastComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TapecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
