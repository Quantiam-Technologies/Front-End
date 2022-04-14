import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SemIndexComponent } from './sem-index.component';

describe('SemIndexComponent', () => {
  let component: SemIndexComponent;
  let fixture: ComponentFixture<SemIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SemIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SemIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
