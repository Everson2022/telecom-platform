import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

/**
 * Valida que o campo anotado é uma data posterior ao campo referenciado.
 * Ambos os campos devem ser strings no formato ISO 8601.
 * Retorna true se o campo anotado for undefined/null (use @IsOptional() para campos opcionais).
 *
 * @example
 * @IsOptional()
 * @IsDateString()
 * @IsAfterDate('validFrom')
 * validUntil?: string;
 */
export function IsAfterDate(property: string, options?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isAfterDate',
      target: object.constructor,
      propertyName,
      constraints: [property],
      options,
      validator: {
        validate(value: unknown, args: ValidationArguments): boolean {
          const [otherField] = args.constraints as [string];
          const otherValue = (args.object as Record<string, unknown>)[otherField];
          if (value === undefined || value === null) return true;
          if (!otherValue) return true;
          return new Date(value as string) > new Date(otherValue as string);
        },
        defaultMessage(args: ValidationArguments): string {
          const [otherField] = args.constraints as [string];
          return `${args.property} must be after ${otherField}`;
        },
      },
    });
  };
}
