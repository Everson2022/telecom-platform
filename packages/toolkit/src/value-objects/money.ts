export class Money {
  private constructor(
    public readonly amountCents: number,
    public readonly currency: string,
  ) {
    if (!Number.isInteger(amountCents)) {
      throw new Error('Money amount must be an integer (cents)');
    }
  }

  static fromCents(amountCents: number, currency: string = 'BRL'): Money {
    return new Money(amountCents, currency);
  }

  static fromDecimal(amount: number, currency: string = 'BRL'): Money {
    return new Money(Math.round(amount * 100), currency);
  }

  static zero(currency: string = 'BRL'): Money {
    return new Money(0, currency);
  }

  add(other: Money): Money {
    this.assertSameCurrency(other);
    return new Money(this.amountCents + other.amountCents, this.currency);
  }

  subtract(other: Money): Money {
    this.assertSameCurrency(other);
    return new Money(this.amountCents - other.amountCents, this.currency);
  }

  multiply(factor: number): Money {
    return new Money(Math.round(this.amountCents * factor), this.currency);
  }

  isPositive(): boolean {
    return this.amountCents > 0;
  }

  isZero(): boolean {
    return this.amountCents === 0;
  }

  isNegative(): boolean {
    return this.amountCents < 0;
  }

  greaterThan(other: Money): boolean {
    this.assertSameCurrency(other);
    return this.amountCents > other.amountCents;
  }

  equals(other: Money): boolean {
    return this.amountCents === other.amountCents && this.currency === other.currency;
  }

  toDecimal(): number {
    return this.amountCents / 100;
  }

  toFormattedString(): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: this.currency,
    }).format(this.toDecimal());
  }

  toJSON(): { amountCents: number; currency: string } {
    return { amountCents: this.amountCents, currency: this.currency };
  }

  private assertSameCurrency(other: Money): void {
    if (this.currency !== other.currency) {
      throw new Error(
        `Cannot operate on different currencies: ${this.currency} vs ${other.currency}`,
      );
    }
  }
}
