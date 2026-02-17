export class PhoneNumber {
  private readonly value: string;

  private constructor(phone: string) {
    this.value = phone;
  }

  static create(phone: string): PhoneNumber {
    const cleaned = phone.replace(/\D/g, '');

    if (!PhoneNumber.isValid(cleaned)) {
      throw new Error(`Invalid phone number: ${phone}`);
    }

    return new PhoneNumber(cleaned);
  }

  static isValid(phone: string): boolean {
    const cleaned = phone.replace(/\D/g, '');
    // Brazilian phone: country code (55) + DDD (2 digits) + number (8-9 digits)
    // Without country code: DDD (2 digits) + number (8-9 digits)
    return /^(55)?(\d{2})(\d{8,9})$/.test(cleaned);
  }

  toString(): string {
    return this.value;
  }

  toE164(): string {
    const cleaned = this.value;
    if (cleaned.startsWith('55')) {
      return `+${cleaned}`;
    }
    return `+55${cleaned}`;
  }

  getDdd(): string {
    const cleaned = this.value;
    if (cleaned.startsWith('55')) {
      return cleaned.substring(2, 4);
    }
    return cleaned.substring(0, 2);
  }

  toFormatted(): string {
    const e164 = this.toE164().replace('+', '');
    const ddd = e164.substring(2, 4);
    const number = e164.substring(4);

    if (number.length === 9) {
      return `+55 (${ddd}) ${number.substring(0, 5)}-${number.substring(5)}`;
    }
    return `+55 (${ddd}) ${number.substring(0, 4)}-${number.substring(4)}`;
  }

  equals(other: PhoneNumber): boolean {
    return this.toE164() === other.toE164();
  }

  toJSON(): string {
    return this.value;
  }
}
