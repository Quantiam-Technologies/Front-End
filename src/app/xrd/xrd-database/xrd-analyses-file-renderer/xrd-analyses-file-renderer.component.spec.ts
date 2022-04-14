import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XrdAnalysesFileRendererComponent } from './xrd-analyses-file-renderer.component';

describe('XrdAnalysesFileRendererComponent', () => {
  let component: XrdAnalysesFileRendererComponent;
  let fixture: ComponentFixture<XrdAnalysesFileRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XrdAnalysesFileRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XrdAnalysesFileRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
