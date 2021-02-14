import { PriceService } from '../../../src/services/PriceService';

describe('PriceService', () => {
  let service: PriceService;

  const buildService = (storage: number) => {
    service = new PriceService(storage);
  };

  beforeEach(() => {
    buildService(2);
  });

  it('returns the correct price when rate is less than or equal to 10', () => {
    buildService(10);
    expect(service.priceInPennies()).toEqual(4000);
  });

  it('returns the correct price when rate is less than or equal to 100', () => {
    buildService(100);
    expect(service.priceInPennies()).toEqual(20000);
  });

  it('returns the correct price when rate is greater than 100', () => {
    buildService(101);
    expect(service.priceInPennies()).toEqual(10100);
  });
});
