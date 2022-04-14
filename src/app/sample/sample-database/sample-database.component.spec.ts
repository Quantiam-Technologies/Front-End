import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleDatabaseComponent } from './sample-database.component';

describe('SampleDatabaseComponent', () => {
  let component: SampleDatabaseComponent;
  let fixture: ComponentFixture<SampleDatabaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SampleDatabaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
