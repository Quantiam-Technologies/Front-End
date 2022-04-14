import { SteelModule } from './steel.module';

describe('SteelModule', () => {
  let steelModule: SteelModule;

  beforeEach(() => {
    steelModule = new SteelModule();
  });

  it('should create an instance', () => {
    expect(steelModule).toBeTruthy();
  });
});
