export class PriceService {
  constructor(private storage: number) {}

  private get rate(): number {
    if (this.storage <= 10) {
      return 4;
    }
    if (this.storage <= 100) {
      return 2;
    }
    return 1;
  }

  public priceInPennies(): number {
    return this.rate * this.storage * 100;
  }
}
