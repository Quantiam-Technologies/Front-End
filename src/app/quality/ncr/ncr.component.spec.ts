import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NcrComponent } from './ncr.component';

describe('NcrComponent', () => {
  let component: NcrComponent;
  let fixture: ComponentFixture<NcrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NcrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NcrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
