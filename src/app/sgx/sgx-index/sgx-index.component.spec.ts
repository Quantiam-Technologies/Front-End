import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SgxIndexComponent } from './sgx-index.component';

describe('SgxIndexComponent', () => {
  let component: SgxIndexComponent;
  let fixture: ComponentFixture<SgxIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SgxIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SgxIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
