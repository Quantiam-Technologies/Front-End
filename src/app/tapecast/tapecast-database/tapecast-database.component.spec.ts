import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TapecastDatabaseComponent } from './tapecast-database.component';

describe('TapecastDatabaseComponent', () => {
  let component: TapecastDatabaseComponent;
  let fixture: ComponentFixture<TapecastDatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TapecastDatabaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TapecastDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
