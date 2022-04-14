import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialContainerLogComponent } from './material-container-log.component';

describe('MaterialContainerLogComponent', () => {
  let component: MaterialContainerLogComponent;
  let fixture: ComponentFixture<MaterialContainerLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialContainerLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialContainerLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
