import { XpsModule } from './xps.module';

describe('XpsModule', () => {
  let xpsModule: XpsModule;

  beforeEach(() => {
    xpsModule = new XpsModule();
  });

  it('should create an instance', () => {
    expect(xpsModule).toBeTruthy();
  });
});
