
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Plan
 * 
 */
export type Plan = $Result.DefaultSelection<Prisma.$PlanPayload>
/**
 * Model PlanFeature
 * 
 */
export type PlanFeature = $Result.DefaultSelection<Prisma.$PlanFeaturePayload>
/**
 * Model Offer
 * 
 */
export type Offer = $Result.DefaultSelection<Prisma.$OfferPayload>
/**
 * Model EligibilityRule
 * 
 */
export type EligibilityRule = $Result.DefaultSelection<Prisma.$EligibilityRulePayload>
/**
 * Model PriceLocality
 * 
 */
export type PriceLocality = $Result.DefaultSelection<Prisma.$PriceLocalityPayload>
/**
 * Model OutboxEvent
 * 
 */
export type OutboxEvent = $Result.DefaultSelection<Prisma.$OutboxEventPayload>
/**
 * Model ProcessedEvent
 * 
 */
export type ProcessedEvent = $Result.DefaultSelection<Prisma.$ProcessedEventPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const PlanType: {
  CONTROL: 'CONTROL',
  PREPAID: 'PREPAID',
  POSTPAID: 'POSTPAID'
};

export type PlanType = (typeof PlanType)[keyof typeof PlanType]


export const PlanStatus: {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  DEPRECATED: 'DEPRECATED'
};

export type PlanStatus = (typeof PlanStatus)[keyof typeof PlanStatus]


export const OfferStatus: {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE'
};

export type OfferStatus = (typeof OfferStatus)[keyof typeof OfferStatus]


export const PriceLocalityStatus: {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE'
};

export type PriceLocalityStatus = (typeof PriceLocalityStatus)[keyof typeof PriceLocalityStatus]


export const PaymentMethodType: {
  CARD: 'CARD',
  PIX: 'PIX'
};

export type PaymentMethodType = (typeof PaymentMethodType)[keyof typeof PaymentMethodType]


export const FeatureUnit: {
  GB: 'GB',
  MIN: 'MIN',
  UNIT: 'UNIT'
};

export type FeatureUnit = (typeof FeatureUnit)[keyof typeof FeatureUnit]

}

export type PlanType = $Enums.PlanType

export const PlanType: typeof $Enums.PlanType

export type PlanStatus = $Enums.PlanStatus

export const PlanStatus: typeof $Enums.PlanStatus

export type OfferStatus = $Enums.OfferStatus

export const OfferStatus: typeof $Enums.OfferStatus

export type PriceLocalityStatus = $Enums.PriceLocalityStatus

export const PriceLocalityStatus: typeof $Enums.PriceLocalityStatus

export type PaymentMethodType = $Enums.PaymentMethodType

export const PaymentMethodType: typeof $Enums.PaymentMethodType

export type FeatureUnit = $Enums.FeatureUnit

export const FeatureUnit: typeof $Enums.FeatureUnit

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Plans
 * const plans = await prisma.plan.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Plans
   * const plans = await prisma.plan.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.plan`: Exposes CRUD operations for the **Plan** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Plans
    * const plans = await prisma.plan.findMany()
    * ```
    */
  get plan(): Prisma.PlanDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.planFeature`: Exposes CRUD operations for the **PlanFeature** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PlanFeatures
    * const planFeatures = await prisma.planFeature.findMany()
    * ```
    */
  get planFeature(): Prisma.PlanFeatureDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.offer`: Exposes CRUD operations for the **Offer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Offers
    * const offers = await prisma.offer.findMany()
    * ```
    */
  get offer(): Prisma.OfferDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.eligibilityRule`: Exposes CRUD operations for the **EligibilityRule** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EligibilityRules
    * const eligibilityRules = await prisma.eligibilityRule.findMany()
    * ```
    */
  get eligibilityRule(): Prisma.EligibilityRuleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.priceLocality`: Exposes CRUD operations for the **PriceLocality** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PriceLocalities
    * const priceLocalities = await prisma.priceLocality.findMany()
    * ```
    */
  get priceLocality(): Prisma.PriceLocalityDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.outboxEvent`: Exposes CRUD operations for the **OutboxEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OutboxEvents
    * const outboxEvents = await prisma.outboxEvent.findMany()
    * ```
    */
  get outboxEvent(): Prisma.OutboxEventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.processedEvent`: Exposes CRUD operations for the **ProcessedEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProcessedEvents
    * const processedEvents = await prisma.processedEvent.findMany()
    * ```
    */
  get processedEvent(): Prisma.ProcessedEventDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.2
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Plan: 'Plan',
    PlanFeature: 'PlanFeature',
    Offer: 'Offer',
    EligibilityRule: 'EligibilityRule',
    PriceLocality: 'PriceLocality',
    OutboxEvent: 'OutboxEvent',
    ProcessedEvent: 'ProcessedEvent'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "plan" | "planFeature" | "offer" | "eligibilityRule" | "priceLocality" | "outboxEvent" | "processedEvent"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Plan: {
        payload: Prisma.$PlanPayload<ExtArgs>
        fields: Prisma.PlanFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlanFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlanFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          findFirst: {
            args: Prisma.PlanFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlanFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          findMany: {
            args: Prisma.PlanFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>[]
          }
          create: {
            args: Prisma.PlanCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          createMany: {
            args: Prisma.PlanCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PlanCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>[]
          }
          delete: {
            args: Prisma.PlanDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          update: {
            args: Prisma.PlanUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          deleteMany: {
            args: Prisma.PlanDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlanUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PlanUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>[]
          }
          upsert: {
            args: Prisma.PlanUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          aggregate: {
            args: Prisma.PlanAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlan>
          }
          groupBy: {
            args: Prisma.PlanGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlanGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlanCountArgs<ExtArgs>
            result: $Utils.Optional<PlanCountAggregateOutputType> | number
          }
        }
      }
      PlanFeature: {
        payload: Prisma.$PlanFeaturePayload<ExtArgs>
        fields: Prisma.PlanFeatureFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlanFeatureFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanFeaturePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlanFeatureFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanFeaturePayload>
          }
          findFirst: {
            args: Prisma.PlanFeatureFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanFeaturePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlanFeatureFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanFeaturePayload>
          }
          findMany: {
            args: Prisma.PlanFeatureFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanFeaturePayload>[]
          }
          create: {
            args: Prisma.PlanFeatureCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanFeaturePayload>
          }
          createMany: {
            args: Prisma.PlanFeatureCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PlanFeatureCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanFeaturePayload>[]
          }
          delete: {
            args: Prisma.PlanFeatureDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanFeaturePayload>
          }
          update: {
            args: Prisma.PlanFeatureUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanFeaturePayload>
          }
          deleteMany: {
            args: Prisma.PlanFeatureDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlanFeatureUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PlanFeatureUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanFeaturePayload>[]
          }
          upsert: {
            args: Prisma.PlanFeatureUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanFeaturePayload>
          }
          aggregate: {
            args: Prisma.PlanFeatureAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlanFeature>
          }
          groupBy: {
            args: Prisma.PlanFeatureGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlanFeatureGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlanFeatureCountArgs<ExtArgs>
            result: $Utils.Optional<PlanFeatureCountAggregateOutputType> | number
          }
        }
      }
      Offer: {
        payload: Prisma.$OfferPayload<ExtArgs>
        fields: Prisma.OfferFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OfferFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfferPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OfferFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfferPayload>
          }
          findFirst: {
            args: Prisma.OfferFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfferPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OfferFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfferPayload>
          }
          findMany: {
            args: Prisma.OfferFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfferPayload>[]
          }
          create: {
            args: Prisma.OfferCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfferPayload>
          }
          createMany: {
            args: Prisma.OfferCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OfferCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfferPayload>[]
          }
          delete: {
            args: Prisma.OfferDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfferPayload>
          }
          update: {
            args: Prisma.OfferUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfferPayload>
          }
          deleteMany: {
            args: Prisma.OfferDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OfferUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OfferUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfferPayload>[]
          }
          upsert: {
            args: Prisma.OfferUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfferPayload>
          }
          aggregate: {
            args: Prisma.OfferAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOffer>
          }
          groupBy: {
            args: Prisma.OfferGroupByArgs<ExtArgs>
            result: $Utils.Optional<OfferGroupByOutputType>[]
          }
          count: {
            args: Prisma.OfferCountArgs<ExtArgs>
            result: $Utils.Optional<OfferCountAggregateOutputType> | number
          }
        }
      }
      EligibilityRule: {
        payload: Prisma.$EligibilityRulePayload<ExtArgs>
        fields: Prisma.EligibilityRuleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EligibilityRuleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EligibilityRulePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EligibilityRuleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EligibilityRulePayload>
          }
          findFirst: {
            args: Prisma.EligibilityRuleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EligibilityRulePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EligibilityRuleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EligibilityRulePayload>
          }
          findMany: {
            args: Prisma.EligibilityRuleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EligibilityRulePayload>[]
          }
          create: {
            args: Prisma.EligibilityRuleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EligibilityRulePayload>
          }
          createMany: {
            args: Prisma.EligibilityRuleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EligibilityRuleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EligibilityRulePayload>[]
          }
          delete: {
            args: Prisma.EligibilityRuleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EligibilityRulePayload>
          }
          update: {
            args: Prisma.EligibilityRuleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EligibilityRulePayload>
          }
          deleteMany: {
            args: Prisma.EligibilityRuleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EligibilityRuleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EligibilityRuleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EligibilityRulePayload>[]
          }
          upsert: {
            args: Prisma.EligibilityRuleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EligibilityRulePayload>
          }
          aggregate: {
            args: Prisma.EligibilityRuleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEligibilityRule>
          }
          groupBy: {
            args: Prisma.EligibilityRuleGroupByArgs<ExtArgs>
            result: $Utils.Optional<EligibilityRuleGroupByOutputType>[]
          }
          count: {
            args: Prisma.EligibilityRuleCountArgs<ExtArgs>
            result: $Utils.Optional<EligibilityRuleCountAggregateOutputType> | number
          }
        }
      }
      PriceLocality: {
        payload: Prisma.$PriceLocalityPayload<ExtArgs>
        fields: Prisma.PriceLocalityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PriceLocalityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceLocalityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PriceLocalityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceLocalityPayload>
          }
          findFirst: {
            args: Prisma.PriceLocalityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceLocalityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PriceLocalityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceLocalityPayload>
          }
          findMany: {
            args: Prisma.PriceLocalityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceLocalityPayload>[]
          }
          create: {
            args: Prisma.PriceLocalityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceLocalityPayload>
          }
          createMany: {
            args: Prisma.PriceLocalityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PriceLocalityCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceLocalityPayload>[]
          }
          delete: {
            args: Prisma.PriceLocalityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceLocalityPayload>
          }
          update: {
            args: Prisma.PriceLocalityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceLocalityPayload>
          }
          deleteMany: {
            args: Prisma.PriceLocalityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PriceLocalityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PriceLocalityUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceLocalityPayload>[]
          }
          upsert: {
            args: Prisma.PriceLocalityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceLocalityPayload>
          }
          aggregate: {
            args: Prisma.PriceLocalityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePriceLocality>
          }
          groupBy: {
            args: Prisma.PriceLocalityGroupByArgs<ExtArgs>
            result: $Utils.Optional<PriceLocalityGroupByOutputType>[]
          }
          count: {
            args: Prisma.PriceLocalityCountArgs<ExtArgs>
            result: $Utils.Optional<PriceLocalityCountAggregateOutputType> | number
          }
        }
      }
      OutboxEvent: {
        payload: Prisma.$OutboxEventPayload<ExtArgs>
        fields: Prisma.OutboxEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OutboxEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboxEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OutboxEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboxEventPayload>
          }
          findFirst: {
            args: Prisma.OutboxEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboxEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OutboxEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboxEventPayload>
          }
          findMany: {
            args: Prisma.OutboxEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboxEventPayload>[]
          }
          create: {
            args: Prisma.OutboxEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboxEventPayload>
          }
          createMany: {
            args: Prisma.OutboxEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OutboxEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboxEventPayload>[]
          }
          delete: {
            args: Prisma.OutboxEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboxEventPayload>
          }
          update: {
            args: Prisma.OutboxEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboxEventPayload>
          }
          deleteMany: {
            args: Prisma.OutboxEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OutboxEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OutboxEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboxEventPayload>[]
          }
          upsert: {
            args: Prisma.OutboxEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboxEventPayload>
          }
          aggregate: {
            args: Prisma.OutboxEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOutboxEvent>
          }
          groupBy: {
            args: Prisma.OutboxEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<OutboxEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.OutboxEventCountArgs<ExtArgs>
            result: $Utils.Optional<OutboxEventCountAggregateOutputType> | number
          }
        }
      }
      ProcessedEvent: {
        payload: Prisma.$ProcessedEventPayload<ExtArgs>
        fields: Prisma.ProcessedEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProcessedEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProcessedEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedEventPayload>
          }
          findFirst: {
            args: Prisma.ProcessedEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProcessedEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedEventPayload>
          }
          findMany: {
            args: Prisma.ProcessedEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedEventPayload>[]
          }
          create: {
            args: Prisma.ProcessedEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedEventPayload>
          }
          createMany: {
            args: Prisma.ProcessedEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProcessedEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedEventPayload>[]
          }
          delete: {
            args: Prisma.ProcessedEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedEventPayload>
          }
          update: {
            args: Prisma.ProcessedEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedEventPayload>
          }
          deleteMany: {
            args: Prisma.ProcessedEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProcessedEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProcessedEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedEventPayload>[]
          }
          upsert: {
            args: Prisma.ProcessedEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedEventPayload>
          }
          aggregate: {
            args: Prisma.ProcessedEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProcessedEvent>
          }
          groupBy: {
            args: Prisma.ProcessedEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProcessedEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProcessedEventCountArgs<ExtArgs>
            result: $Utils.Optional<ProcessedEventCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    plan?: PlanOmit
    planFeature?: PlanFeatureOmit
    offer?: OfferOmit
    eligibilityRule?: EligibilityRuleOmit
    priceLocality?: PriceLocalityOmit
    outboxEvent?: OutboxEventOmit
    processedEvent?: ProcessedEventOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type PlanCountOutputType
   */

  export type PlanCountOutputType = {
    features: number
    offers: number
  }

  export type PlanCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    features?: boolean | PlanCountOutputTypeCountFeaturesArgs
    offers?: boolean | PlanCountOutputTypeCountOffersArgs
  }

  // Custom InputTypes
  /**
   * PlanCountOutputType without action
   */
  export type PlanCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanCountOutputType
     */
    select?: PlanCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PlanCountOutputType without action
   */
  export type PlanCountOutputTypeCountFeaturesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlanFeatureWhereInput
  }

  /**
   * PlanCountOutputType without action
   */
  export type PlanCountOutputTypeCountOffersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OfferWhereInput
  }


  /**
   * Count Type OfferCountOutputType
   */

  export type OfferCountOutputType = {
    eligibilityRules: number
    localityPrices: number
  }

  export type OfferCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    eligibilityRules?: boolean | OfferCountOutputTypeCountEligibilityRulesArgs
    localityPrices?: boolean | OfferCountOutputTypeCountLocalityPricesArgs
  }

  // Custom InputTypes
  /**
   * OfferCountOutputType without action
   */
  export type OfferCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfferCountOutputType
     */
    select?: OfferCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OfferCountOutputType without action
   */
  export type OfferCountOutputTypeCountEligibilityRulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EligibilityRuleWhereInput
  }

  /**
   * OfferCountOutputType without action
   */
  export type OfferCountOutputTypeCountLocalityPricesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PriceLocalityWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Plan
   */

  export type AggregatePlan = {
    _count: PlanCountAggregateOutputType | null
    _avg: PlanAvgAggregateOutputType | null
    _sum: PlanSumAggregateOutputType | null
    _min: PlanMinAggregateOutputType | null
    _max: PlanMaxAggregateOutputType | null
  }

  export type PlanAvgAggregateOutputType = {
    maxLines: number | null
  }

  export type PlanSumAggregateOutputType = {
    maxLines: number | null
  }

  export type PlanMinAggregateOutputType = {
    id: string | null
    name: string | null
    type: $Enums.PlanType | null
    maxLines: number | null
    status: $Enums.PlanStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PlanMaxAggregateOutputType = {
    id: string | null
    name: string | null
    type: $Enums.PlanType | null
    maxLines: number | null
    status: $Enums.PlanStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PlanCountAggregateOutputType = {
    id: number
    name: number
    type: number
    maxLines: number
    status: number
    allowedPaymentMethods: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PlanAvgAggregateInputType = {
    maxLines?: true
  }

  export type PlanSumAggregateInputType = {
    maxLines?: true
  }

  export type PlanMinAggregateInputType = {
    id?: true
    name?: true
    type?: true
    maxLines?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PlanMaxAggregateInputType = {
    id?: true
    name?: true
    type?: true
    maxLines?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PlanCountAggregateInputType = {
    id?: true
    name?: true
    type?: true
    maxLines?: true
    status?: true
    allowedPaymentMethods?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PlanAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Plan to aggregate.
     */
    where?: PlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Plans to fetch.
     */
    orderBy?: PlanOrderByWithRelationInput | PlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Plans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Plans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Plans
    **/
    _count?: true | PlanCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PlanAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PlanSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlanMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlanMaxAggregateInputType
  }

  export type GetPlanAggregateType<T extends PlanAggregateArgs> = {
        [P in keyof T & keyof AggregatePlan]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlan[P]>
      : GetScalarType<T[P], AggregatePlan[P]>
  }




  export type PlanGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlanWhereInput
    orderBy?: PlanOrderByWithAggregationInput | PlanOrderByWithAggregationInput[]
    by: PlanScalarFieldEnum[] | PlanScalarFieldEnum
    having?: PlanScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlanCountAggregateInputType | true
    _avg?: PlanAvgAggregateInputType
    _sum?: PlanSumAggregateInputType
    _min?: PlanMinAggregateInputType
    _max?: PlanMaxAggregateInputType
  }

  export type PlanGroupByOutputType = {
    id: string
    name: string
    type: $Enums.PlanType
    maxLines: number
    status: $Enums.PlanStatus
    allowedPaymentMethods: $Enums.PaymentMethodType[]
    createdAt: Date
    updatedAt: Date
    _count: PlanCountAggregateOutputType | null
    _avg: PlanAvgAggregateOutputType | null
    _sum: PlanSumAggregateOutputType | null
    _min: PlanMinAggregateOutputType | null
    _max: PlanMaxAggregateOutputType | null
  }

  type GetPlanGroupByPayload<T extends PlanGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlanGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlanGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlanGroupByOutputType[P]>
            : GetScalarType<T[P], PlanGroupByOutputType[P]>
        }
      >
    >


  export type PlanSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    maxLines?: boolean
    status?: boolean
    allowedPaymentMethods?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    features?: boolean | Plan$featuresArgs<ExtArgs>
    offers?: boolean | Plan$offersArgs<ExtArgs>
    _count?: boolean | PlanCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["plan"]>

  export type PlanSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    maxLines?: boolean
    status?: boolean
    allowedPaymentMethods?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["plan"]>

  export type PlanSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    maxLines?: boolean
    status?: boolean
    allowedPaymentMethods?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["plan"]>

  export type PlanSelectScalar = {
    id?: boolean
    name?: boolean
    type?: boolean
    maxLines?: boolean
    status?: boolean
    allowedPaymentMethods?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PlanOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "type" | "maxLines" | "status" | "allowedPaymentMethods" | "createdAt" | "updatedAt", ExtArgs["result"]["plan"]>
  export type PlanInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    features?: boolean | Plan$featuresArgs<ExtArgs>
    offers?: boolean | Plan$offersArgs<ExtArgs>
    _count?: boolean | PlanCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PlanIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PlanIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PlanPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Plan"
    objects: {
      features: Prisma.$PlanFeaturePayload<ExtArgs>[]
      offers: Prisma.$OfferPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      type: $Enums.PlanType
      maxLines: number
      status: $Enums.PlanStatus
      allowedPaymentMethods: $Enums.PaymentMethodType[]
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["plan"]>
    composites: {}
  }

  type PlanGetPayload<S extends boolean | null | undefined | PlanDefaultArgs> = $Result.GetResult<Prisma.$PlanPayload, S>

  type PlanCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PlanFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PlanCountAggregateInputType | true
    }

  export interface PlanDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Plan'], meta: { name: 'Plan' } }
    /**
     * Find zero or one Plan that matches the filter.
     * @param {PlanFindUniqueArgs} args - Arguments to find a Plan
     * @example
     * // Get one Plan
     * const plan = await prisma.plan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlanFindUniqueArgs>(args: SelectSubset<T, PlanFindUniqueArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Plan that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PlanFindUniqueOrThrowArgs} args - Arguments to find a Plan
     * @example
     * // Get one Plan
     * const plan = await prisma.plan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlanFindUniqueOrThrowArgs>(args: SelectSubset<T, PlanFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Plan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanFindFirstArgs} args - Arguments to find a Plan
     * @example
     * // Get one Plan
     * const plan = await prisma.plan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlanFindFirstArgs>(args?: SelectSubset<T, PlanFindFirstArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Plan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanFindFirstOrThrowArgs} args - Arguments to find a Plan
     * @example
     * // Get one Plan
     * const plan = await prisma.plan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlanFindFirstOrThrowArgs>(args?: SelectSubset<T, PlanFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Plans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Plans
     * const plans = await prisma.plan.findMany()
     * 
     * // Get first 10 Plans
     * const plans = await prisma.plan.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const planWithIdOnly = await prisma.plan.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PlanFindManyArgs>(args?: SelectSubset<T, PlanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Plan.
     * @param {PlanCreateArgs} args - Arguments to create a Plan.
     * @example
     * // Create one Plan
     * const Plan = await prisma.plan.create({
     *   data: {
     *     // ... data to create a Plan
     *   }
     * })
     * 
     */
    create<T extends PlanCreateArgs>(args: SelectSubset<T, PlanCreateArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Plans.
     * @param {PlanCreateManyArgs} args - Arguments to create many Plans.
     * @example
     * // Create many Plans
     * const plan = await prisma.plan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlanCreateManyArgs>(args?: SelectSubset<T, PlanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Plans and returns the data saved in the database.
     * @param {PlanCreateManyAndReturnArgs} args - Arguments to create many Plans.
     * @example
     * // Create many Plans
     * const plan = await prisma.plan.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Plans and only return the `id`
     * const planWithIdOnly = await prisma.plan.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PlanCreateManyAndReturnArgs>(args?: SelectSubset<T, PlanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Plan.
     * @param {PlanDeleteArgs} args - Arguments to delete one Plan.
     * @example
     * // Delete one Plan
     * const Plan = await prisma.plan.delete({
     *   where: {
     *     // ... filter to delete one Plan
     *   }
     * })
     * 
     */
    delete<T extends PlanDeleteArgs>(args: SelectSubset<T, PlanDeleteArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Plan.
     * @param {PlanUpdateArgs} args - Arguments to update one Plan.
     * @example
     * // Update one Plan
     * const plan = await prisma.plan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlanUpdateArgs>(args: SelectSubset<T, PlanUpdateArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Plans.
     * @param {PlanDeleteManyArgs} args - Arguments to filter Plans to delete.
     * @example
     * // Delete a few Plans
     * const { count } = await prisma.plan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlanDeleteManyArgs>(args?: SelectSubset<T, PlanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Plans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Plans
     * const plan = await prisma.plan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlanUpdateManyArgs>(args: SelectSubset<T, PlanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Plans and returns the data updated in the database.
     * @param {PlanUpdateManyAndReturnArgs} args - Arguments to update many Plans.
     * @example
     * // Update many Plans
     * const plan = await prisma.plan.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Plans and only return the `id`
     * const planWithIdOnly = await prisma.plan.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PlanUpdateManyAndReturnArgs>(args: SelectSubset<T, PlanUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Plan.
     * @param {PlanUpsertArgs} args - Arguments to update or create a Plan.
     * @example
     * // Update or create a Plan
     * const plan = await prisma.plan.upsert({
     *   create: {
     *     // ... data to create a Plan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Plan we want to update
     *   }
     * })
     */
    upsert<T extends PlanUpsertArgs>(args: SelectSubset<T, PlanUpsertArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Plans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanCountArgs} args - Arguments to filter Plans to count.
     * @example
     * // Count the number of Plans
     * const count = await prisma.plan.count({
     *   where: {
     *     // ... the filter for the Plans we want to count
     *   }
     * })
    **/
    count<T extends PlanCountArgs>(
      args?: Subset<T, PlanCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlanCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Plan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PlanAggregateArgs>(args: Subset<T, PlanAggregateArgs>): Prisma.PrismaPromise<GetPlanAggregateType<T>>

    /**
     * Group by Plan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PlanGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlanGroupByArgs['orderBy'] }
        : { orderBy?: PlanGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PlanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Plan model
   */
  readonly fields: PlanFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Plan.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlanClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    features<T extends Plan$featuresArgs<ExtArgs> = {}>(args?: Subset<T, Plan$featuresArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanFeaturePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    offers<T extends Plan$offersArgs<ExtArgs> = {}>(args?: Subset<T, Plan$offersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OfferPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Plan model
   */
  interface PlanFieldRefs {
    readonly id: FieldRef<"Plan", 'String'>
    readonly name: FieldRef<"Plan", 'String'>
    readonly type: FieldRef<"Plan", 'PlanType'>
    readonly maxLines: FieldRef<"Plan", 'Int'>
    readonly status: FieldRef<"Plan", 'PlanStatus'>
    readonly allowedPaymentMethods: FieldRef<"Plan", 'PaymentMethodType[]'>
    readonly createdAt: FieldRef<"Plan", 'DateTime'>
    readonly updatedAt: FieldRef<"Plan", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Plan findUnique
   */
  export type PlanFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter, which Plan to fetch.
     */
    where: PlanWhereUniqueInput
  }

  /**
   * Plan findUniqueOrThrow
   */
  export type PlanFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter, which Plan to fetch.
     */
    where: PlanWhereUniqueInput
  }

  /**
   * Plan findFirst
   */
  export type PlanFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter, which Plan to fetch.
     */
    where?: PlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Plans to fetch.
     */
    orderBy?: PlanOrderByWithRelationInput | PlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Plans.
     */
    cursor?: PlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Plans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Plans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Plans.
     */
    distinct?: PlanScalarFieldEnum | PlanScalarFieldEnum[]
  }

  /**
   * Plan findFirstOrThrow
   */
  export type PlanFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter, which Plan to fetch.
     */
    where?: PlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Plans to fetch.
     */
    orderBy?: PlanOrderByWithRelationInput | PlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Plans.
     */
    cursor?: PlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Plans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Plans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Plans.
     */
    distinct?: PlanScalarFieldEnum | PlanScalarFieldEnum[]
  }

  /**
   * Plan findMany
   */
  export type PlanFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter, which Plans to fetch.
     */
    where?: PlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Plans to fetch.
     */
    orderBy?: PlanOrderByWithRelationInput | PlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Plans.
     */
    cursor?: PlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Plans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Plans.
     */
    skip?: number
    distinct?: PlanScalarFieldEnum | PlanScalarFieldEnum[]
  }

  /**
   * Plan create
   */
  export type PlanCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * The data needed to create a Plan.
     */
    data: XOR<PlanCreateInput, PlanUncheckedCreateInput>
  }

  /**
   * Plan createMany
   */
  export type PlanCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Plans.
     */
    data: PlanCreateManyInput | PlanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Plan createManyAndReturn
   */
  export type PlanCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * The data used to create many Plans.
     */
    data: PlanCreateManyInput | PlanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Plan update
   */
  export type PlanUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * The data needed to update a Plan.
     */
    data: XOR<PlanUpdateInput, PlanUncheckedUpdateInput>
    /**
     * Choose, which Plan to update.
     */
    where: PlanWhereUniqueInput
  }

  /**
   * Plan updateMany
   */
  export type PlanUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Plans.
     */
    data: XOR<PlanUpdateManyMutationInput, PlanUncheckedUpdateManyInput>
    /**
     * Filter which Plans to update
     */
    where?: PlanWhereInput
    /**
     * Limit how many Plans to update.
     */
    limit?: number
  }

  /**
   * Plan updateManyAndReturn
   */
  export type PlanUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * The data used to update Plans.
     */
    data: XOR<PlanUpdateManyMutationInput, PlanUncheckedUpdateManyInput>
    /**
     * Filter which Plans to update
     */
    where?: PlanWhereInput
    /**
     * Limit how many Plans to update.
     */
    limit?: number
  }

  /**
   * Plan upsert
   */
  export type PlanUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * The filter to search for the Plan to update in case it exists.
     */
    where: PlanWhereUniqueInput
    /**
     * In case the Plan found by the `where` argument doesn't exist, create a new Plan with this data.
     */
    create: XOR<PlanCreateInput, PlanUncheckedCreateInput>
    /**
     * In case the Plan was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlanUpdateInput, PlanUncheckedUpdateInput>
  }

  /**
   * Plan delete
   */
  export type PlanDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter which Plan to delete.
     */
    where: PlanWhereUniqueInput
  }

  /**
   * Plan deleteMany
   */
  export type PlanDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Plans to delete
     */
    where?: PlanWhereInput
    /**
     * Limit how many Plans to delete.
     */
    limit?: number
  }

  /**
   * Plan.features
   */
  export type Plan$featuresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanFeature
     */
    select?: PlanFeatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanFeature
     */
    omit?: PlanFeatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanFeatureInclude<ExtArgs> | null
    where?: PlanFeatureWhereInput
    orderBy?: PlanFeatureOrderByWithRelationInput | PlanFeatureOrderByWithRelationInput[]
    cursor?: PlanFeatureWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PlanFeatureScalarFieldEnum | PlanFeatureScalarFieldEnum[]
  }

  /**
   * Plan.offers
   */
  export type Plan$offersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Offer
     */
    select?: OfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Offer
     */
    omit?: OfferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfferInclude<ExtArgs> | null
    where?: OfferWhereInput
    orderBy?: OfferOrderByWithRelationInput | OfferOrderByWithRelationInput[]
    cursor?: OfferWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OfferScalarFieldEnum | OfferScalarFieldEnum[]
  }

  /**
   * Plan without action
   */
  export type PlanDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
  }


  /**
   * Model PlanFeature
   */

  export type AggregatePlanFeature = {
    _count: PlanFeatureCountAggregateOutputType | null
    _avg: PlanFeatureAvgAggregateOutputType | null
    _sum: PlanFeatureSumAggregateOutputType | null
    _min: PlanFeatureMinAggregateOutputType | null
    _max: PlanFeatureMaxAggregateOutputType | null
  }

  export type PlanFeatureAvgAggregateOutputType = {
    quota: number | null
  }

  export type PlanFeatureSumAggregateOutputType = {
    quota: number | null
  }

  export type PlanFeatureMinAggregateOutputType = {
    id: string | null
    planId: string | null
    name: string | null
    quota: number | null
    unit: $Enums.FeatureUnit | null
    unlimited: boolean | null
    createdAt: Date | null
  }

  export type PlanFeatureMaxAggregateOutputType = {
    id: string | null
    planId: string | null
    name: string | null
    quota: number | null
    unit: $Enums.FeatureUnit | null
    unlimited: boolean | null
    createdAt: Date | null
  }

  export type PlanFeatureCountAggregateOutputType = {
    id: number
    planId: number
    name: number
    quota: number
    unit: number
    unlimited: number
    createdAt: number
    _all: number
  }


  export type PlanFeatureAvgAggregateInputType = {
    quota?: true
  }

  export type PlanFeatureSumAggregateInputType = {
    quota?: true
  }

  export type PlanFeatureMinAggregateInputType = {
    id?: true
    planId?: true
    name?: true
    quota?: true
    unit?: true
    unlimited?: true
    createdAt?: true
  }

  export type PlanFeatureMaxAggregateInputType = {
    id?: true
    planId?: true
    name?: true
    quota?: true
    unit?: true
    unlimited?: true
    createdAt?: true
  }

  export type PlanFeatureCountAggregateInputType = {
    id?: true
    planId?: true
    name?: true
    quota?: true
    unit?: true
    unlimited?: true
    createdAt?: true
    _all?: true
  }

  export type PlanFeatureAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PlanFeature to aggregate.
     */
    where?: PlanFeatureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlanFeatures to fetch.
     */
    orderBy?: PlanFeatureOrderByWithRelationInput | PlanFeatureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlanFeatureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlanFeatures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlanFeatures.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PlanFeatures
    **/
    _count?: true | PlanFeatureCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PlanFeatureAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PlanFeatureSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlanFeatureMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlanFeatureMaxAggregateInputType
  }

  export type GetPlanFeatureAggregateType<T extends PlanFeatureAggregateArgs> = {
        [P in keyof T & keyof AggregatePlanFeature]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlanFeature[P]>
      : GetScalarType<T[P], AggregatePlanFeature[P]>
  }




  export type PlanFeatureGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlanFeatureWhereInput
    orderBy?: PlanFeatureOrderByWithAggregationInput | PlanFeatureOrderByWithAggregationInput[]
    by: PlanFeatureScalarFieldEnum[] | PlanFeatureScalarFieldEnum
    having?: PlanFeatureScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlanFeatureCountAggregateInputType | true
    _avg?: PlanFeatureAvgAggregateInputType
    _sum?: PlanFeatureSumAggregateInputType
    _min?: PlanFeatureMinAggregateInputType
    _max?: PlanFeatureMaxAggregateInputType
  }

  export type PlanFeatureGroupByOutputType = {
    id: string
    planId: string
    name: string
    quota: number
    unit: $Enums.FeatureUnit
    unlimited: boolean
    createdAt: Date
    _count: PlanFeatureCountAggregateOutputType | null
    _avg: PlanFeatureAvgAggregateOutputType | null
    _sum: PlanFeatureSumAggregateOutputType | null
    _min: PlanFeatureMinAggregateOutputType | null
    _max: PlanFeatureMaxAggregateOutputType | null
  }

  type GetPlanFeatureGroupByPayload<T extends PlanFeatureGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlanFeatureGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlanFeatureGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlanFeatureGroupByOutputType[P]>
            : GetScalarType<T[P], PlanFeatureGroupByOutputType[P]>
        }
      >
    >


  export type PlanFeatureSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    planId?: boolean
    name?: boolean
    quota?: boolean
    unit?: boolean
    unlimited?: boolean
    createdAt?: boolean
    plan?: boolean | PlanDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["planFeature"]>

  export type PlanFeatureSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    planId?: boolean
    name?: boolean
    quota?: boolean
    unit?: boolean
    unlimited?: boolean
    createdAt?: boolean
    plan?: boolean | PlanDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["planFeature"]>

  export type PlanFeatureSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    planId?: boolean
    name?: boolean
    quota?: boolean
    unit?: boolean
    unlimited?: boolean
    createdAt?: boolean
    plan?: boolean | PlanDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["planFeature"]>

  export type PlanFeatureSelectScalar = {
    id?: boolean
    planId?: boolean
    name?: boolean
    quota?: boolean
    unit?: boolean
    unlimited?: boolean
    createdAt?: boolean
  }

  export type PlanFeatureOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "planId" | "name" | "quota" | "unit" | "unlimited" | "createdAt", ExtArgs["result"]["planFeature"]>
  export type PlanFeatureInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    plan?: boolean | PlanDefaultArgs<ExtArgs>
  }
  export type PlanFeatureIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    plan?: boolean | PlanDefaultArgs<ExtArgs>
  }
  export type PlanFeatureIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    plan?: boolean | PlanDefaultArgs<ExtArgs>
  }

  export type $PlanFeaturePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PlanFeature"
    objects: {
      plan: Prisma.$PlanPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      planId: string
      name: string
      quota: number
      unit: $Enums.FeatureUnit
      unlimited: boolean
      createdAt: Date
    }, ExtArgs["result"]["planFeature"]>
    composites: {}
  }

  type PlanFeatureGetPayload<S extends boolean | null | undefined | PlanFeatureDefaultArgs> = $Result.GetResult<Prisma.$PlanFeaturePayload, S>

  type PlanFeatureCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PlanFeatureFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PlanFeatureCountAggregateInputType | true
    }

  export interface PlanFeatureDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PlanFeature'], meta: { name: 'PlanFeature' } }
    /**
     * Find zero or one PlanFeature that matches the filter.
     * @param {PlanFeatureFindUniqueArgs} args - Arguments to find a PlanFeature
     * @example
     * // Get one PlanFeature
     * const planFeature = await prisma.planFeature.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlanFeatureFindUniqueArgs>(args: SelectSubset<T, PlanFeatureFindUniqueArgs<ExtArgs>>): Prisma__PlanFeatureClient<$Result.GetResult<Prisma.$PlanFeaturePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PlanFeature that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PlanFeatureFindUniqueOrThrowArgs} args - Arguments to find a PlanFeature
     * @example
     * // Get one PlanFeature
     * const planFeature = await prisma.planFeature.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlanFeatureFindUniqueOrThrowArgs>(args: SelectSubset<T, PlanFeatureFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlanFeatureClient<$Result.GetResult<Prisma.$PlanFeaturePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PlanFeature that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanFeatureFindFirstArgs} args - Arguments to find a PlanFeature
     * @example
     * // Get one PlanFeature
     * const planFeature = await prisma.planFeature.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlanFeatureFindFirstArgs>(args?: SelectSubset<T, PlanFeatureFindFirstArgs<ExtArgs>>): Prisma__PlanFeatureClient<$Result.GetResult<Prisma.$PlanFeaturePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PlanFeature that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanFeatureFindFirstOrThrowArgs} args - Arguments to find a PlanFeature
     * @example
     * // Get one PlanFeature
     * const planFeature = await prisma.planFeature.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlanFeatureFindFirstOrThrowArgs>(args?: SelectSubset<T, PlanFeatureFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlanFeatureClient<$Result.GetResult<Prisma.$PlanFeaturePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PlanFeatures that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanFeatureFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PlanFeatures
     * const planFeatures = await prisma.planFeature.findMany()
     * 
     * // Get first 10 PlanFeatures
     * const planFeatures = await prisma.planFeature.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const planFeatureWithIdOnly = await prisma.planFeature.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PlanFeatureFindManyArgs>(args?: SelectSubset<T, PlanFeatureFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanFeaturePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PlanFeature.
     * @param {PlanFeatureCreateArgs} args - Arguments to create a PlanFeature.
     * @example
     * // Create one PlanFeature
     * const PlanFeature = await prisma.planFeature.create({
     *   data: {
     *     // ... data to create a PlanFeature
     *   }
     * })
     * 
     */
    create<T extends PlanFeatureCreateArgs>(args: SelectSubset<T, PlanFeatureCreateArgs<ExtArgs>>): Prisma__PlanFeatureClient<$Result.GetResult<Prisma.$PlanFeaturePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PlanFeatures.
     * @param {PlanFeatureCreateManyArgs} args - Arguments to create many PlanFeatures.
     * @example
     * // Create many PlanFeatures
     * const planFeature = await prisma.planFeature.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlanFeatureCreateManyArgs>(args?: SelectSubset<T, PlanFeatureCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PlanFeatures and returns the data saved in the database.
     * @param {PlanFeatureCreateManyAndReturnArgs} args - Arguments to create many PlanFeatures.
     * @example
     * // Create many PlanFeatures
     * const planFeature = await prisma.planFeature.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PlanFeatures and only return the `id`
     * const planFeatureWithIdOnly = await prisma.planFeature.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PlanFeatureCreateManyAndReturnArgs>(args?: SelectSubset<T, PlanFeatureCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanFeaturePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PlanFeature.
     * @param {PlanFeatureDeleteArgs} args - Arguments to delete one PlanFeature.
     * @example
     * // Delete one PlanFeature
     * const PlanFeature = await prisma.planFeature.delete({
     *   where: {
     *     // ... filter to delete one PlanFeature
     *   }
     * })
     * 
     */
    delete<T extends PlanFeatureDeleteArgs>(args: SelectSubset<T, PlanFeatureDeleteArgs<ExtArgs>>): Prisma__PlanFeatureClient<$Result.GetResult<Prisma.$PlanFeaturePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PlanFeature.
     * @param {PlanFeatureUpdateArgs} args - Arguments to update one PlanFeature.
     * @example
     * // Update one PlanFeature
     * const planFeature = await prisma.planFeature.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlanFeatureUpdateArgs>(args: SelectSubset<T, PlanFeatureUpdateArgs<ExtArgs>>): Prisma__PlanFeatureClient<$Result.GetResult<Prisma.$PlanFeaturePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PlanFeatures.
     * @param {PlanFeatureDeleteManyArgs} args - Arguments to filter PlanFeatures to delete.
     * @example
     * // Delete a few PlanFeatures
     * const { count } = await prisma.planFeature.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlanFeatureDeleteManyArgs>(args?: SelectSubset<T, PlanFeatureDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PlanFeatures.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanFeatureUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PlanFeatures
     * const planFeature = await prisma.planFeature.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlanFeatureUpdateManyArgs>(args: SelectSubset<T, PlanFeatureUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PlanFeatures and returns the data updated in the database.
     * @param {PlanFeatureUpdateManyAndReturnArgs} args - Arguments to update many PlanFeatures.
     * @example
     * // Update many PlanFeatures
     * const planFeature = await prisma.planFeature.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PlanFeatures and only return the `id`
     * const planFeatureWithIdOnly = await prisma.planFeature.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PlanFeatureUpdateManyAndReturnArgs>(args: SelectSubset<T, PlanFeatureUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanFeaturePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PlanFeature.
     * @param {PlanFeatureUpsertArgs} args - Arguments to update or create a PlanFeature.
     * @example
     * // Update or create a PlanFeature
     * const planFeature = await prisma.planFeature.upsert({
     *   create: {
     *     // ... data to create a PlanFeature
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PlanFeature we want to update
     *   }
     * })
     */
    upsert<T extends PlanFeatureUpsertArgs>(args: SelectSubset<T, PlanFeatureUpsertArgs<ExtArgs>>): Prisma__PlanFeatureClient<$Result.GetResult<Prisma.$PlanFeaturePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PlanFeatures.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanFeatureCountArgs} args - Arguments to filter PlanFeatures to count.
     * @example
     * // Count the number of PlanFeatures
     * const count = await prisma.planFeature.count({
     *   where: {
     *     // ... the filter for the PlanFeatures we want to count
     *   }
     * })
    **/
    count<T extends PlanFeatureCountArgs>(
      args?: Subset<T, PlanFeatureCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlanFeatureCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PlanFeature.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanFeatureAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PlanFeatureAggregateArgs>(args: Subset<T, PlanFeatureAggregateArgs>): Prisma.PrismaPromise<GetPlanFeatureAggregateType<T>>

    /**
     * Group by PlanFeature.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanFeatureGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PlanFeatureGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlanFeatureGroupByArgs['orderBy'] }
        : { orderBy?: PlanFeatureGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PlanFeatureGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlanFeatureGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PlanFeature model
   */
  readonly fields: PlanFeatureFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PlanFeature.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlanFeatureClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    plan<T extends PlanDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PlanDefaultArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PlanFeature model
   */
  interface PlanFeatureFieldRefs {
    readonly id: FieldRef<"PlanFeature", 'String'>
    readonly planId: FieldRef<"PlanFeature", 'String'>
    readonly name: FieldRef<"PlanFeature", 'String'>
    readonly quota: FieldRef<"PlanFeature", 'Int'>
    readonly unit: FieldRef<"PlanFeature", 'FeatureUnit'>
    readonly unlimited: FieldRef<"PlanFeature", 'Boolean'>
    readonly createdAt: FieldRef<"PlanFeature", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PlanFeature findUnique
   */
  export type PlanFeatureFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanFeature
     */
    select?: PlanFeatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanFeature
     */
    omit?: PlanFeatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanFeatureInclude<ExtArgs> | null
    /**
     * Filter, which PlanFeature to fetch.
     */
    where: PlanFeatureWhereUniqueInput
  }

  /**
   * PlanFeature findUniqueOrThrow
   */
  export type PlanFeatureFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanFeature
     */
    select?: PlanFeatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanFeature
     */
    omit?: PlanFeatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanFeatureInclude<ExtArgs> | null
    /**
     * Filter, which PlanFeature to fetch.
     */
    where: PlanFeatureWhereUniqueInput
  }

  /**
   * PlanFeature findFirst
   */
  export type PlanFeatureFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanFeature
     */
    select?: PlanFeatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanFeature
     */
    omit?: PlanFeatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanFeatureInclude<ExtArgs> | null
    /**
     * Filter, which PlanFeature to fetch.
     */
    where?: PlanFeatureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlanFeatures to fetch.
     */
    orderBy?: PlanFeatureOrderByWithRelationInput | PlanFeatureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PlanFeatures.
     */
    cursor?: PlanFeatureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlanFeatures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlanFeatures.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlanFeatures.
     */
    distinct?: PlanFeatureScalarFieldEnum | PlanFeatureScalarFieldEnum[]
  }

  /**
   * PlanFeature findFirstOrThrow
   */
  export type PlanFeatureFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanFeature
     */
    select?: PlanFeatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanFeature
     */
    omit?: PlanFeatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanFeatureInclude<ExtArgs> | null
    /**
     * Filter, which PlanFeature to fetch.
     */
    where?: PlanFeatureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlanFeatures to fetch.
     */
    orderBy?: PlanFeatureOrderByWithRelationInput | PlanFeatureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PlanFeatures.
     */
    cursor?: PlanFeatureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlanFeatures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlanFeatures.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlanFeatures.
     */
    distinct?: PlanFeatureScalarFieldEnum | PlanFeatureScalarFieldEnum[]
  }

  /**
   * PlanFeature findMany
   */
  export type PlanFeatureFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanFeature
     */
    select?: PlanFeatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanFeature
     */
    omit?: PlanFeatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanFeatureInclude<ExtArgs> | null
    /**
     * Filter, which PlanFeatures to fetch.
     */
    where?: PlanFeatureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlanFeatures to fetch.
     */
    orderBy?: PlanFeatureOrderByWithRelationInput | PlanFeatureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PlanFeatures.
     */
    cursor?: PlanFeatureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlanFeatures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlanFeatures.
     */
    skip?: number
    distinct?: PlanFeatureScalarFieldEnum | PlanFeatureScalarFieldEnum[]
  }

  /**
   * PlanFeature create
   */
  export type PlanFeatureCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanFeature
     */
    select?: PlanFeatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanFeature
     */
    omit?: PlanFeatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanFeatureInclude<ExtArgs> | null
    /**
     * The data needed to create a PlanFeature.
     */
    data: XOR<PlanFeatureCreateInput, PlanFeatureUncheckedCreateInput>
  }

  /**
   * PlanFeature createMany
   */
  export type PlanFeatureCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PlanFeatures.
     */
    data: PlanFeatureCreateManyInput | PlanFeatureCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PlanFeature createManyAndReturn
   */
  export type PlanFeatureCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanFeature
     */
    select?: PlanFeatureSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PlanFeature
     */
    omit?: PlanFeatureOmit<ExtArgs> | null
    /**
     * The data used to create many PlanFeatures.
     */
    data: PlanFeatureCreateManyInput | PlanFeatureCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanFeatureIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PlanFeature update
   */
  export type PlanFeatureUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanFeature
     */
    select?: PlanFeatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanFeature
     */
    omit?: PlanFeatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanFeatureInclude<ExtArgs> | null
    /**
     * The data needed to update a PlanFeature.
     */
    data: XOR<PlanFeatureUpdateInput, PlanFeatureUncheckedUpdateInput>
    /**
     * Choose, which PlanFeature to update.
     */
    where: PlanFeatureWhereUniqueInput
  }

  /**
   * PlanFeature updateMany
   */
  export type PlanFeatureUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PlanFeatures.
     */
    data: XOR<PlanFeatureUpdateManyMutationInput, PlanFeatureUncheckedUpdateManyInput>
    /**
     * Filter which PlanFeatures to update
     */
    where?: PlanFeatureWhereInput
    /**
     * Limit how many PlanFeatures to update.
     */
    limit?: number
  }

  /**
   * PlanFeature updateManyAndReturn
   */
  export type PlanFeatureUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanFeature
     */
    select?: PlanFeatureSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PlanFeature
     */
    omit?: PlanFeatureOmit<ExtArgs> | null
    /**
     * The data used to update PlanFeatures.
     */
    data: XOR<PlanFeatureUpdateManyMutationInput, PlanFeatureUncheckedUpdateManyInput>
    /**
     * Filter which PlanFeatures to update
     */
    where?: PlanFeatureWhereInput
    /**
     * Limit how many PlanFeatures to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanFeatureIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PlanFeature upsert
   */
  export type PlanFeatureUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanFeature
     */
    select?: PlanFeatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanFeature
     */
    omit?: PlanFeatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanFeatureInclude<ExtArgs> | null
    /**
     * The filter to search for the PlanFeature to update in case it exists.
     */
    where: PlanFeatureWhereUniqueInput
    /**
     * In case the PlanFeature found by the `where` argument doesn't exist, create a new PlanFeature with this data.
     */
    create: XOR<PlanFeatureCreateInput, PlanFeatureUncheckedCreateInput>
    /**
     * In case the PlanFeature was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlanFeatureUpdateInput, PlanFeatureUncheckedUpdateInput>
  }

  /**
   * PlanFeature delete
   */
  export type PlanFeatureDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanFeature
     */
    select?: PlanFeatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanFeature
     */
    omit?: PlanFeatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanFeatureInclude<ExtArgs> | null
    /**
     * Filter which PlanFeature to delete.
     */
    where: PlanFeatureWhereUniqueInput
  }

  /**
   * PlanFeature deleteMany
   */
  export type PlanFeatureDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PlanFeatures to delete
     */
    where?: PlanFeatureWhereInput
    /**
     * Limit how many PlanFeatures to delete.
     */
    limit?: number
  }

  /**
   * PlanFeature without action
   */
  export type PlanFeatureDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanFeature
     */
    select?: PlanFeatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanFeature
     */
    omit?: PlanFeatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanFeatureInclude<ExtArgs> | null
  }


  /**
   * Model Offer
   */

  export type AggregateOffer = {
    _count: OfferCountAggregateOutputType | null
    _avg: OfferAvgAggregateOutputType | null
    _sum: OfferSumAggregateOutputType | null
    _min: OfferMinAggregateOutputType | null
    _max: OfferMaxAggregateOutputType | null
  }

  export type OfferAvgAggregateOutputType = {
    basePriceAmountCents: number | null
  }

  export type OfferSumAggregateOutputType = {
    basePriceAmountCents: number | null
  }

  export type OfferMinAggregateOutputType = {
    id: string | null
    planId: string | null
    name: string | null
    basePriceAmountCents: number | null
    basePriceCurrency: string | null
    status: $Enums.OfferStatus | null
    validFrom: Date | null
    validUntil: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OfferMaxAggregateOutputType = {
    id: string | null
    planId: string | null
    name: string | null
    basePriceAmountCents: number | null
    basePriceCurrency: string | null
    status: $Enums.OfferStatus | null
    validFrom: Date | null
    validUntil: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OfferCountAggregateOutputType = {
    id: number
    planId: number
    name: number
    basePriceAmountCents: number
    basePriceCurrency: number
    status: number
    validFrom: number
    validUntil: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type OfferAvgAggregateInputType = {
    basePriceAmountCents?: true
  }

  export type OfferSumAggregateInputType = {
    basePriceAmountCents?: true
  }

  export type OfferMinAggregateInputType = {
    id?: true
    planId?: true
    name?: true
    basePriceAmountCents?: true
    basePriceCurrency?: true
    status?: true
    validFrom?: true
    validUntil?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OfferMaxAggregateInputType = {
    id?: true
    planId?: true
    name?: true
    basePriceAmountCents?: true
    basePriceCurrency?: true
    status?: true
    validFrom?: true
    validUntil?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OfferCountAggregateInputType = {
    id?: true
    planId?: true
    name?: true
    basePriceAmountCents?: true
    basePriceCurrency?: true
    status?: true
    validFrom?: true
    validUntil?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type OfferAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Offer to aggregate.
     */
    where?: OfferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Offers to fetch.
     */
    orderBy?: OfferOrderByWithRelationInput | OfferOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OfferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Offers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Offers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Offers
    **/
    _count?: true | OfferCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OfferAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OfferSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OfferMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OfferMaxAggregateInputType
  }

  export type GetOfferAggregateType<T extends OfferAggregateArgs> = {
        [P in keyof T & keyof AggregateOffer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOffer[P]>
      : GetScalarType<T[P], AggregateOffer[P]>
  }




  export type OfferGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OfferWhereInput
    orderBy?: OfferOrderByWithAggregationInput | OfferOrderByWithAggregationInput[]
    by: OfferScalarFieldEnum[] | OfferScalarFieldEnum
    having?: OfferScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OfferCountAggregateInputType | true
    _avg?: OfferAvgAggregateInputType
    _sum?: OfferSumAggregateInputType
    _min?: OfferMinAggregateInputType
    _max?: OfferMaxAggregateInputType
  }

  export type OfferGroupByOutputType = {
    id: string
    planId: string
    name: string
    basePriceAmountCents: number
    basePriceCurrency: string
    status: $Enums.OfferStatus
    validFrom: Date
    validUntil: Date | null
    createdAt: Date
    updatedAt: Date
    _count: OfferCountAggregateOutputType | null
    _avg: OfferAvgAggregateOutputType | null
    _sum: OfferSumAggregateOutputType | null
    _min: OfferMinAggregateOutputType | null
    _max: OfferMaxAggregateOutputType | null
  }

  type GetOfferGroupByPayload<T extends OfferGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OfferGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OfferGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OfferGroupByOutputType[P]>
            : GetScalarType<T[P], OfferGroupByOutputType[P]>
        }
      >
    >


  export type OfferSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    planId?: boolean
    name?: boolean
    basePriceAmountCents?: boolean
    basePriceCurrency?: boolean
    status?: boolean
    validFrom?: boolean
    validUntil?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    plan?: boolean | PlanDefaultArgs<ExtArgs>
    eligibilityRules?: boolean | Offer$eligibilityRulesArgs<ExtArgs>
    localityPrices?: boolean | Offer$localityPricesArgs<ExtArgs>
    _count?: boolean | OfferCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["offer"]>

  export type OfferSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    planId?: boolean
    name?: boolean
    basePriceAmountCents?: boolean
    basePriceCurrency?: boolean
    status?: boolean
    validFrom?: boolean
    validUntil?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    plan?: boolean | PlanDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["offer"]>

  export type OfferSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    planId?: boolean
    name?: boolean
    basePriceAmountCents?: boolean
    basePriceCurrency?: boolean
    status?: boolean
    validFrom?: boolean
    validUntil?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    plan?: boolean | PlanDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["offer"]>

  export type OfferSelectScalar = {
    id?: boolean
    planId?: boolean
    name?: boolean
    basePriceAmountCents?: boolean
    basePriceCurrency?: boolean
    status?: boolean
    validFrom?: boolean
    validUntil?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type OfferOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "planId" | "name" | "basePriceAmountCents" | "basePriceCurrency" | "status" | "validFrom" | "validUntil" | "createdAt" | "updatedAt", ExtArgs["result"]["offer"]>
  export type OfferInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    plan?: boolean | PlanDefaultArgs<ExtArgs>
    eligibilityRules?: boolean | Offer$eligibilityRulesArgs<ExtArgs>
    localityPrices?: boolean | Offer$localityPricesArgs<ExtArgs>
    _count?: boolean | OfferCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type OfferIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    plan?: boolean | PlanDefaultArgs<ExtArgs>
  }
  export type OfferIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    plan?: boolean | PlanDefaultArgs<ExtArgs>
  }

  export type $OfferPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Offer"
    objects: {
      plan: Prisma.$PlanPayload<ExtArgs>
      eligibilityRules: Prisma.$EligibilityRulePayload<ExtArgs>[]
      localityPrices: Prisma.$PriceLocalityPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      planId: string
      name: string
      basePriceAmountCents: number
      basePriceCurrency: string
      status: $Enums.OfferStatus
      validFrom: Date
      validUntil: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["offer"]>
    composites: {}
  }

  type OfferGetPayload<S extends boolean | null | undefined | OfferDefaultArgs> = $Result.GetResult<Prisma.$OfferPayload, S>

  type OfferCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OfferFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OfferCountAggregateInputType | true
    }

  export interface OfferDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Offer'], meta: { name: 'Offer' } }
    /**
     * Find zero or one Offer that matches the filter.
     * @param {OfferFindUniqueArgs} args - Arguments to find a Offer
     * @example
     * // Get one Offer
     * const offer = await prisma.offer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OfferFindUniqueArgs>(args: SelectSubset<T, OfferFindUniqueArgs<ExtArgs>>): Prisma__OfferClient<$Result.GetResult<Prisma.$OfferPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Offer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OfferFindUniqueOrThrowArgs} args - Arguments to find a Offer
     * @example
     * // Get one Offer
     * const offer = await prisma.offer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OfferFindUniqueOrThrowArgs>(args: SelectSubset<T, OfferFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OfferClient<$Result.GetResult<Prisma.$OfferPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Offer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfferFindFirstArgs} args - Arguments to find a Offer
     * @example
     * // Get one Offer
     * const offer = await prisma.offer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OfferFindFirstArgs>(args?: SelectSubset<T, OfferFindFirstArgs<ExtArgs>>): Prisma__OfferClient<$Result.GetResult<Prisma.$OfferPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Offer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfferFindFirstOrThrowArgs} args - Arguments to find a Offer
     * @example
     * // Get one Offer
     * const offer = await prisma.offer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OfferFindFirstOrThrowArgs>(args?: SelectSubset<T, OfferFindFirstOrThrowArgs<ExtArgs>>): Prisma__OfferClient<$Result.GetResult<Prisma.$OfferPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Offers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfferFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Offers
     * const offers = await prisma.offer.findMany()
     * 
     * // Get first 10 Offers
     * const offers = await prisma.offer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const offerWithIdOnly = await prisma.offer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OfferFindManyArgs>(args?: SelectSubset<T, OfferFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OfferPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Offer.
     * @param {OfferCreateArgs} args - Arguments to create a Offer.
     * @example
     * // Create one Offer
     * const Offer = await prisma.offer.create({
     *   data: {
     *     // ... data to create a Offer
     *   }
     * })
     * 
     */
    create<T extends OfferCreateArgs>(args: SelectSubset<T, OfferCreateArgs<ExtArgs>>): Prisma__OfferClient<$Result.GetResult<Prisma.$OfferPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Offers.
     * @param {OfferCreateManyArgs} args - Arguments to create many Offers.
     * @example
     * // Create many Offers
     * const offer = await prisma.offer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OfferCreateManyArgs>(args?: SelectSubset<T, OfferCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Offers and returns the data saved in the database.
     * @param {OfferCreateManyAndReturnArgs} args - Arguments to create many Offers.
     * @example
     * // Create many Offers
     * const offer = await prisma.offer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Offers and only return the `id`
     * const offerWithIdOnly = await prisma.offer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OfferCreateManyAndReturnArgs>(args?: SelectSubset<T, OfferCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OfferPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Offer.
     * @param {OfferDeleteArgs} args - Arguments to delete one Offer.
     * @example
     * // Delete one Offer
     * const Offer = await prisma.offer.delete({
     *   where: {
     *     // ... filter to delete one Offer
     *   }
     * })
     * 
     */
    delete<T extends OfferDeleteArgs>(args: SelectSubset<T, OfferDeleteArgs<ExtArgs>>): Prisma__OfferClient<$Result.GetResult<Prisma.$OfferPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Offer.
     * @param {OfferUpdateArgs} args - Arguments to update one Offer.
     * @example
     * // Update one Offer
     * const offer = await prisma.offer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OfferUpdateArgs>(args: SelectSubset<T, OfferUpdateArgs<ExtArgs>>): Prisma__OfferClient<$Result.GetResult<Prisma.$OfferPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Offers.
     * @param {OfferDeleteManyArgs} args - Arguments to filter Offers to delete.
     * @example
     * // Delete a few Offers
     * const { count } = await prisma.offer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OfferDeleteManyArgs>(args?: SelectSubset<T, OfferDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Offers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfferUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Offers
     * const offer = await prisma.offer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OfferUpdateManyArgs>(args: SelectSubset<T, OfferUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Offers and returns the data updated in the database.
     * @param {OfferUpdateManyAndReturnArgs} args - Arguments to update many Offers.
     * @example
     * // Update many Offers
     * const offer = await prisma.offer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Offers and only return the `id`
     * const offerWithIdOnly = await prisma.offer.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OfferUpdateManyAndReturnArgs>(args: SelectSubset<T, OfferUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OfferPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Offer.
     * @param {OfferUpsertArgs} args - Arguments to update or create a Offer.
     * @example
     * // Update or create a Offer
     * const offer = await prisma.offer.upsert({
     *   create: {
     *     // ... data to create a Offer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Offer we want to update
     *   }
     * })
     */
    upsert<T extends OfferUpsertArgs>(args: SelectSubset<T, OfferUpsertArgs<ExtArgs>>): Prisma__OfferClient<$Result.GetResult<Prisma.$OfferPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Offers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfferCountArgs} args - Arguments to filter Offers to count.
     * @example
     * // Count the number of Offers
     * const count = await prisma.offer.count({
     *   where: {
     *     // ... the filter for the Offers we want to count
     *   }
     * })
    **/
    count<T extends OfferCountArgs>(
      args?: Subset<T, OfferCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OfferCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Offer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfferAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OfferAggregateArgs>(args: Subset<T, OfferAggregateArgs>): Prisma.PrismaPromise<GetOfferAggregateType<T>>

    /**
     * Group by Offer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfferGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OfferGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OfferGroupByArgs['orderBy'] }
        : { orderBy?: OfferGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OfferGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOfferGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Offer model
   */
  readonly fields: OfferFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Offer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OfferClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    plan<T extends PlanDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PlanDefaultArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    eligibilityRules<T extends Offer$eligibilityRulesArgs<ExtArgs> = {}>(args?: Subset<T, Offer$eligibilityRulesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EligibilityRulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    localityPrices<T extends Offer$localityPricesArgs<ExtArgs> = {}>(args?: Subset<T, Offer$localityPricesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PriceLocalityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Offer model
   */
  interface OfferFieldRefs {
    readonly id: FieldRef<"Offer", 'String'>
    readonly planId: FieldRef<"Offer", 'String'>
    readonly name: FieldRef<"Offer", 'String'>
    readonly basePriceAmountCents: FieldRef<"Offer", 'Int'>
    readonly basePriceCurrency: FieldRef<"Offer", 'String'>
    readonly status: FieldRef<"Offer", 'OfferStatus'>
    readonly validFrom: FieldRef<"Offer", 'DateTime'>
    readonly validUntil: FieldRef<"Offer", 'DateTime'>
    readonly createdAt: FieldRef<"Offer", 'DateTime'>
    readonly updatedAt: FieldRef<"Offer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Offer findUnique
   */
  export type OfferFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Offer
     */
    select?: OfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Offer
     */
    omit?: OfferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfferInclude<ExtArgs> | null
    /**
     * Filter, which Offer to fetch.
     */
    where: OfferWhereUniqueInput
  }

  /**
   * Offer findUniqueOrThrow
   */
  export type OfferFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Offer
     */
    select?: OfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Offer
     */
    omit?: OfferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfferInclude<ExtArgs> | null
    /**
     * Filter, which Offer to fetch.
     */
    where: OfferWhereUniqueInput
  }

  /**
   * Offer findFirst
   */
  export type OfferFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Offer
     */
    select?: OfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Offer
     */
    omit?: OfferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfferInclude<ExtArgs> | null
    /**
     * Filter, which Offer to fetch.
     */
    where?: OfferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Offers to fetch.
     */
    orderBy?: OfferOrderByWithRelationInput | OfferOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Offers.
     */
    cursor?: OfferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Offers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Offers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Offers.
     */
    distinct?: OfferScalarFieldEnum | OfferScalarFieldEnum[]
  }

  /**
   * Offer findFirstOrThrow
   */
  export type OfferFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Offer
     */
    select?: OfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Offer
     */
    omit?: OfferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfferInclude<ExtArgs> | null
    /**
     * Filter, which Offer to fetch.
     */
    where?: OfferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Offers to fetch.
     */
    orderBy?: OfferOrderByWithRelationInput | OfferOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Offers.
     */
    cursor?: OfferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Offers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Offers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Offers.
     */
    distinct?: OfferScalarFieldEnum | OfferScalarFieldEnum[]
  }

  /**
   * Offer findMany
   */
  export type OfferFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Offer
     */
    select?: OfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Offer
     */
    omit?: OfferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfferInclude<ExtArgs> | null
    /**
     * Filter, which Offers to fetch.
     */
    where?: OfferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Offers to fetch.
     */
    orderBy?: OfferOrderByWithRelationInput | OfferOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Offers.
     */
    cursor?: OfferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Offers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Offers.
     */
    skip?: number
    distinct?: OfferScalarFieldEnum | OfferScalarFieldEnum[]
  }

  /**
   * Offer create
   */
  export type OfferCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Offer
     */
    select?: OfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Offer
     */
    omit?: OfferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfferInclude<ExtArgs> | null
    /**
     * The data needed to create a Offer.
     */
    data: XOR<OfferCreateInput, OfferUncheckedCreateInput>
  }

  /**
   * Offer createMany
   */
  export type OfferCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Offers.
     */
    data: OfferCreateManyInput | OfferCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Offer createManyAndReturn
   */
  export type OfferCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Offer
     */
    select?: OfferSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Offer
     */
    omit?: OfferOmit<ExtArgs> | null
    /**
     * The data used to create many Offers.
     */
    data: OfferCreateManyInput | OfferCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfferIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Offer update
   */
  export type OfferUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Offer
     */
    select?: OfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Offer
     */
    omit?: OfferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfferInclude<ExtArgs> | null
    /**
     * The data needed to update a Offer.
     */
    data: XOR<OfferUpdateInput, OfferUncheckedUpdateInput>
    /**
     * Choose, which Offer to update.
     */
    where: OfferWhereUniqueInput
  }

  /**
   * Offer updateMany
   */
  export type OfferUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Offers.
     */
    data: XOR<OfferUpdateManyMutationInput, OfferUncheckedUpdateManyInput>
    /**
     * Filter which Offers to update
     */
    where?: OfferWhereInput
    /**
     * Limit how many Offers to update.
     */
    limit?: number
  }

  /**
   * Offer updateManyAndReturn
   */
  export type OfferUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Offer
     */
    select?: OfferSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Offer
     */
    omit?: OfferOmit<ExtArgs> | null
    /**
     * The data used to update Offers.
     */
    data: XOR<OfferUpdateManyMutationInput, OfferUncheckedUpdateManyInput>
    /**
     * Filter which Offers to update
     */
    where?: OfferWhereInput
    /**
     * Limit how many Offers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfferIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Offer upsert
   */
  export type OfferUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Offer
     */
    select?: OfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Offer
     */
    omit?: OfferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfferInclude<ExtArgs> | null
    /**
     * The filter to search for the Offer to update in case it exists.
     */
    where: OfferWhereUniqueInput
    /**
     * In case the Offer found by the `where` argument doesn't exist, create a new Offer with this data.
     */
    create: XOR<OfferCreateInput, OfferUncheckedCreateInput>
    /**
     * In case the Offer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OfferUpdateInput, OfferUncheckedUpdateInput>
  }

  /**
   * Offer delete
   */
  export type OfferDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Offer
     */
    select?: OfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Offer
     */
    omit?: OfferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfferInclude<ExtArgs> | null
    /**
     * Filter which Offer to delete.
     */
    where: OfferWhereUniqueInput
  }

  /**
   * Offer deleteMany
   */
  export type OfferDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Offers to delete
     */
    where?: OfferWhereInput
    /**
     * Limit how many Offers to delete.
     */
    limit?: number
  }

  /**
   * Offer.eligibilityRules
   */
  export type Offer$eligibilityRulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EligibilityRule
     */
    select?: EligibilityRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EligibilityRule
     */
    omit?: EligibilityRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EligibilityRuleInclude<ExtArgs> | null
    where?: EligibilityRuleWhereInput
    orderBy?: EligibilityRuleOrderByWithRelationInput | EligibilityRuleOrderByWithRelationInput[]
    cursor?: EligibilityRuleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EligibilityRuleScalarFieldEnum | EligibilityRuleScalarFieldEnum[]
  }

  /**
   * Offer.localityPrices
   */
  export type Offer$localityPricesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceLocality
     */
    select?: PriceLocalitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceLocality
     */
    omit?: PriceLocalityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceLocalityInclude<ExtArgs> | null
    where?: PriceLocalityWhereInput
    orderBy?: PriceLocalityOrderByWithRelationInput | PriceLocalityOrderByWithRelationInput[]
    cursor?: PriceLocalityWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PriceLocalityScalarFieldEnum | PriceLocalityScalarFieldEnum[]
  }

  /**
   * Offer without action
   */
  export type OfferDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Offer
     */
    select?: OfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Offer
     */
    omit?: OfferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfferInclude<ExtArgs> | null
  }


  /**
   * Model EligibilityRule
   */

  export type AggregateEligibilityRule = {
    _count: EligibilityRuleCountAggregateOutputType | null
    _min: EligibilityRuleMinAggregateOutputType | null
    _max: EligibilityRuleMaxAggregateOutputType | null
  }

  export type EligibilityRuleMinAggregateOutputType = {
    id: string | null
    offerId: string | null
    ruleType: string | null
    createdAt: Date | null
  }

  export type EligibilityRuleMaxAggregateOutputType = {
    id: string | null
    offerId: string | null
    ruleType: string | null
    createdAt: Date | null
  }

  export type EligibilityRuleCountAggregateOutputType = {
    id: number
    offerId: number
    ruleType: number
    ruleValue: number
    createdAt: number
    _all: number
  }


  export type EligibilityRuleMinAggregateInputType = {
    id?: true
    offerId?: true
    ruleType?: true
    createdAt?: true
  }

  export type EligibilityRuleMaxAggregateInputType = {
    id?: true
    offerId?: true
    ruleType?: true
    createdAt?: true
  }

  export type EligibilityRuleCountAggregateInputType = {
    id?: true
    offerId?: true
    ruleType?: true
    ruleValue?: true
    createdAt?: true
    _all?: true
  }

  export type EligibilityRuleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EligibilityRule to aggregate.
     */
    where?: EligibilityRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EligibilityRules to fetch.
     */
    orderBy?: EligibilityRuleOrderByWithRelationInput | EligibilityRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EligibilityRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EligibilityRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EligibilityRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EligibilityRules
    **/
    _count?: true | EligibilityRuleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EligibilityRuleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EligibilityRuleMaxAggregateInputType
  }

  export type GetEligibilityRuleAggregateType<T extends EligibilityRuleAggregateArgs> = {
        [P in keyof T & keyof AggregateEligibilityRule]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEligibilityRule[P]>
      : GetScalarType<T[P], AggregateEligibilityRule[P]>
  }




  export type EligibilityRuleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EligibilityRuleWhereInput
    orderBy?: EligibilityRuleOrderByWithAggregationInput | EligibilityRuleOrderByWithAggregationInput[]
    by: EligibilityRuleScalarFieldEnum[] | EligibilityRuleScalarFieldEnum
    having?: EligibilityRuleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EligibilityRuleCountAggregateInputType | true
    _min?: EligibilityRuleMinAggregateInputType
    _max?: EligibilityRuleMaxAggregateInputType
  }

  export type EligibilityRuleGroupByOutputType = {
    id: string
    offerId: string
    ruleType: string
    ruleValue: JsonValue
    createdAt: Date
    _count: EligibilityRuleCountAggregateOutputType | null
    _min: EligibilityRuleMinAggregateOutputType | null
    _max: EligibilityRuleMaxAggregateOutputType | null
  }

  type GetEligibilityRuleGroupByPayload<T extends EligibilityRuleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EligibilityRuleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EligibilityRuleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EligibilityRuleGroupByOutputType[P]>
            : GetScalarType<T[P], EligibilityRuleGroupByOutputType[P]>
        }
      >
    >


  export type EligibilityRuleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    offerId?: boolean
    ruleType?: boolean
    ruleValue?: boolean
    createdAt?: boolean
    offer?: boolean | OfferDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eligibilityRule"]>

  export type EligibilityRuleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    offerId?: boolean
    ruleType?: boolean
    ruleValue?: boolean
    createdAt?: boolean
    offer?: boolean | OfferDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eligibilityRule"]>

  export type EligibilityRuleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    offerId?: boolean
    ruleType?: boolean
    ruleValue?: boolean
    createdAt?: boolean
    offer?: boolean | OfferDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eligibilityRule"]>

  export type EligibilityRuleSelectScalar = {
    id?: boolean
    offerId?: boolean
    ruleType?: boolean
    ruleValue?: boolean
    createdAt?: boolean
  }

  export type EligibilityRuleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "offerId" | "ruleType" | "ruleValue" | "createdAt", ExtArgs["result"]["eligibilityRule"]>
  export type EligibilityRuleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    offer?: boolean | OfferDefaultArgs<ExtArgs>
  }
  export type EligibilityRuleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    offer?: boolean | OfferDefaultArgs<ExtArgs>
  }
  export type EligibilityRuleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    offer?: boolean | OfferDefaultArgs<ExtArgs>
  }

  export type $EligibilityRulePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EligibilityRule"
    objects: {
      offer: Prisma.$OfferPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      offerId: string
      ruleType: string
      ruleValue: Prisma.JsonValue
      createdAt: Date
    }, ExtArgs["result"]["eligibilityRule"]>
    composites: {}
  }

  type EligibilityRuleGetPayload<S extends boolean | null | undefined | EligibilityRuleDefaultArgs> = $Result.GetResult<Prisma.$EligibilityRulePayload, S>

  type EligibilityRuleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EligibilityRuleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EligibilityRuleCountAggregateInputType | true
    }

  export interface EligibilityRuleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EligibilityRule'], meta: { name: 'EligibilityRule' } }
    /**
     * Find zero or one EligibilityRule that matches the filter.
     * @param {EligibilityRuleFindUniqueArgs} args - Arguments to find a EligibilityRule
     * @example
     * // Get one EligibilityRule
     * const eligibilityRule = await prisma.eligibilityRule.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EligibilityRuleFindUniqueArgs>(args: SelectSubset<T, EligibilityRuleFindUniqueArgs<ExtArgs>>): Prisma__EligibilityRuleClient<$Result.GetResult<Prisma.$EligibilityRulePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EligibilityRule that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EligibilityRuleFindUniqueOrThrowArgs} args - Arguments to find a EligibilityRule
     * @example
     * // Get one EligibilityRule
     * const eligibilityRule = await prisma.eligibilityRule.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EligibilityRuleFindUniqueOrThrowArgs>(args: SelectSubset<T, EligibilityRuleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EligibilityRuleClient<$Result.GetResult<Prisma.$EligibilityRulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EligibilityRule that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EligibilityRuleFindFirstArgs} args - Arguments to find a EligibilityRule
     * @example
     * // Get one EligibilityRule
     * const eligibilityRule = await prisma.eligibilityRule.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EligibilityRuleFindFirstArgs>(args?: SelectSubset<T, EligibilityRuleFindFirstArgs<ExtArgs>>): Prisma__EligibilityRuleClient<$Result.GetResult<Prisma.$EligibilityRulePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EligibilityRule that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EligibilityRuleFindFirstOrThrowArgs} args - Arguments to find a EligibilityRule
     * @example
     * // Get one EligibilityRule
     * const eligibilityRule = await prisma.eligibilityRule.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EligibilityRuleFindFirstOrThrowArgs>(args?: SelectSubset<T, EligibilityRuleFindFirstOrThrowArgs<ExtArgs>>): Prisma__EligibilityRuleClient<$Result.GetResult<Prisma.$EligibilityRulePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EligibilityRules that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EligibilityRuleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EligibilityRules
     * const eligibilityRules = await prisma.eligibilityRule.findMany()
     * 
     * // Get first 10 EligibilityRules
     * const eligibilityRules = await prisma.eligibilityRule.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const eligibilityRuleWithIdOnly = await prisma.eligibilityRule.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EligibilityRuleFindManyArgs>(args?: SelectSubset<T, EligibilityRuleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EligibilityRulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EligibilityRule.
     * @param {EligibilityRuleCreateArgs} args - Arguments to create a EligibilityRule.
     * @example
     * // Create one EligibilityRule
     * const EligibilityRule = await prisma.eligibilityRule.create({
     *   data: {
     *     // ... data to create a EligibilityRule
     *   }
     * })
     * 
     */
    create<T extends EligibilityRuleCreateArgs>(args: SelectSubset<T, EligibilityRuleCreateArgs<ExtArgs>>): Prisma__EligibilityRuleClient<$Result.GetResult<Prisma.$EligibilityRulePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EligibilityRules.
     * @param {EligibilityRuleCreateManyArgs} args - Arguments to create many EligibilityRules.
     * @example
     * // Create many EligibilityRules
     * const eligibilityRule = await prisma.eligibilityRule.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EligibilityRuleCreateManyArgs>(args?: SelectSubset<T, EligibilityRuleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EligibilityRules and returns the data saved in the database.
     * @param {EligibilityRuleCreateManyAndReturnArgs} args - Arguments to create many EligibilityRules.
     * @example
     * // Create many EligibilityRules
     * const eligibilityRule = await prisma.eligibilityRule.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EligibilityRules and only return the `id`
     * const eligibilityRuleWithIdOnly = await prisma.eligibilityRule.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EligibilityRuleCreateManyAndReturnArgs>(args?: SelectSubset<T, EligibilityRuleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EligibilityRulePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EligibilityRule.
     * @param {EligibilityRuleDeleteArgs} args - Arguments to delete one EligibilityRule.
     * @example
     * // Delete one EligibilityRule
     * const EligibilityRule = await prisma.eligibilityRule.delete({
     *   where: {
     *     // ... filter to delete one EligibilityRule
     *   }
     * })
     * 
     */
    delete<T extends EligibilityRuleDeleteArgs>(args: SelectSubset<T, EligibilityRuleDeleteArgs<ExtArgs>>): Prisma__EligibilityRuleClient<$Result.GetResult<Prisma.$EligibilityRulePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EligibilityRule.
     * @param {EligibilityRuleUpdateArgs} args - Arguments to update one EligibilityRule.
     * @example
     * // Update one EligibilityRule
     * const eligibilityRule = await prisma.eligibilityRule.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EligibilityRuleUpdateArgs>(args: SelectSubset<T, EligibilityRuleUpdateArgs<ExtArgs>>): Prisma__EligibilityRuleClient<$Result.GetResult<Prisma.$EligibilityRulePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EligibilityRules.
     * @param {EligibilityRuleDeleteManyArgs} args - Arguments to filter EligibilityRules to delete.
     * @example
     * // Delete a few EligibilityRules
     * const { count } = await prisma.eligibilityRule.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EligibilityRuleDeleteManyArgs>(args?: SelectSubset<T, EligibilityRuleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EligibilityRules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EligibilityRuleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EligibilityRules
     * const eligibilityRule = await prisma.eligibilityRule.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EligibilityRuleUpdateManyArgs>(args: SelectSubset<T, EligibilityRuleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EligibilityRules and returns the data updated in the database.
     * @param {EligibilityRuleUpdateManyAndReturnArgs} args - Arguments to update many EligibilityRules.
     * @example
     * // Update many EligibilityRules
     * const eligibilityRule = await prisma.eligibilityRule.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EligibilityRules and only return the `id`
     * const eligibilityRuleWithIdOnly = await prisma.eligibilityRule.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EligibilityRuleUpdateManyAndReturnArgs>(args: SelectSubset<T, EligibilityRuleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EligibilityRulePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EligibilityRule.
     * @param {EligibilityRuleUpsertArgs} args - Arguments to update or create a EligibilityRule.
     * @example
     * // Update or create a EligibilityRule
     * const eligibilityRule = await prisma.eligibilityRule.upsert({
     *   create: {
     *     // ... data to create a EligibilityRule
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EligibilityRule we want to update
     *   }
     * })
     */
    upsert<T extends EligibilityRuleUpsertArgs>(args: SelectSubset<T, EligibilityRuleUpsertArgs<ExtArgs>>): Prisma__EligibilityRuleClient<$Result.GetResult<Prisma.$EligibilityRulePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EligibilityRules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EligibilityRuleCountArgs} args - Arguments to filter EligibilityRules to count.
     * @example
     * // Count the number of EligibilityRules
     * const count = await prisma.eligibilityRule.count({
     *   where: {
     *     // ... the filter for the EligibilityRules we want to count
     *   }
     * })
    **/
    count<T extends EligibilityRuleCountArgs>(
      args?: Subset<T, EligibilityRuleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EligibilityRuleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EligibilityRule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EligibilityRuleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EligibilityRuleAggregateArgs>(args: Subset<T, EligibilityRuleAggregateArgs>): Prisma.PrismaPromise<GetEligibilityRuleAggregateType<T>>

    /**
     * Group by EligibilityRule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EligibilityRuleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EligibilityRuleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EligibilityRuleGroupByArgs['orderBy'] }
        : { orderBy?: EligibilityRuleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EligibilityRuleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEligibilityRuleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EligibilityRule model
   */
  readonly fields: EligibilityRuleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EligibilityRule.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EligibilityRuleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    offer<T extends OfferDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OfferDefaultArgs<ExtArgs>>): Prisma__OfferClient<$Result.GetResult<Prisma.$OfferPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EligibilityRule model
   */
  interface EligibilityRuleFieldRefs {
    readonly id: FieldRef<"EligibilityRule", 'String'>
    readonly offerId: FieldRef<"EligibilityRule", 'String'>
    readonly ruleType: FieldRef<"EligibilityRule", 'String'>
    readonly ruleValue: FieldRef<"EligibilityRule", 'Json'>
    readonly createdAt: FieldRef<"EligibilityRule", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EligibilityRule findUnique
   */
  export type EligibilityRuleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EligibilityRule
     */
    select?: EligibilityRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EligibilityRule
     */
    omit?: EligibilityRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EligibilityRuleInclude<ExtArgs> | null
    /**
     * Filter, which EligibilityRule to fetch.
     */
    where: EligibilityRuleWhereUniqueInput
  }

  /**
   * EligibilityRule findUniqueOrThrow
   */
  export type EligibilityRuleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EligibilityRule
     */
    select?: EligibilityRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EligibilityRule
     */
    omit?: EligibilityRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EligibilityRuleInclude<ExtArgs> | null
    /**
     * Filter, which EligibilityRule to fetch.
     */
    where: EligibilityRuleWhereUniqueInput
  }

  /**
   * EligibilityRule findFirst
   */
  export type EligibilityRuleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EligibilityRule
     */
    select?: EligibilityRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EligibilityRule
     */
    omit?: EligibilityRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EligibilityRuleInclude<ExtArgs> | null
    /**
     * Filter, which EligibilityRule to fetch.
     */
    where?: EligibilityRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EligibilityRules to fetch.
     */
    orderBy?: EligibilityRuleOrderByWithRelationInput | EligibilityRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EligibilityRules.
     */
    cursor?: EligibilityRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EligibilityRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EligibilityRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EligibilityRules.
     */
    distinct?: EligibilityRuleScalarFieldEnum | EligibilityRuleScalarFieldEnum[]
  }

  /**
   * EligibilityRule findFirstOrThrow
   */
  export type EligibilityRuleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EligibilityRule
     */
    select?: EligibilityRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EligibilityRule
     */
    omit?: EligibilityRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EligibilityRuleInclude<ExtArgs> | null
    /**
     * Filter, which EligibilityRule to fetch.
     */
    where?: EligibilityRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EligibilityRules to fetch.
     */
    orderBy?: EligibilityRuleOrderByWithRelationInput | EligibilityRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EligibilityRules.
     */
    cursor?: EligibilityRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EligibilityRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EligibilityRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EligibilityRules.
     */
    distinct?: EligibilityRuleScalarFieldEnum | EligibilityRuleScalarFieldEnum[]
  }

  /**
   * EligibilityRule findMany
   */
  export type EligibilityRuleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EligibilityRule
     */
    select?: EligibilityRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EligibilityRule
     */
    omit?: EligibilityRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EligibilityRuleInclude<ExtArgs> | null
    /**
     * Filter, which EligibilityRules to fetch.
     */
    where?: EligibilityRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EligibilityRules to fetch.
     */
    orderBy?: EligibilityRuleOrderByWithRelationInput | EligibilityRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EligibilityRules.
     */
    cursor?: EligibilityRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EligibilityRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EligibilityRules.
     */
    skip?: number
    distinct?: EligibilityRuleScalarFieldEnum | EligibilityRuleScalarFieldEnum[]
  }

  /**
   * EligibilityRule create
   */
  export type EligibilityRuleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EligibilityRule
     */
    select?: EligibilityRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EligibilityRule
     */
    omit?: EligibilityRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EligibilityRuleInclude<ExtArgs> | null
    /**
     * The data needed to create a EligibilityRule.
     */
    data: XOR<EligibilityRuleCreateInput, EligibilityRuleUncheckedCreateInput>
  }

  /**
   * EligibilityRule createMany
   */
  export type EligibilityRuleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EligibilityRules.
     */
    data: EligibilityRuleCreateManyInput | EligibilityRuleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EligibilityRule createManyAndReturn
   */
  export type EligibilityRuleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EligibilityRule
     */
    select?: EligibilityRuleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EligibilityRule
     */
    omit?: EligibilityRuleOmit<ExtArgs> | null
    /**
     * The data used to create many EligibilityRules.
     */
    data: EligibilityRuleCreateManyInput | EligibilityRuleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EligibilityRuleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * EligibilityRule update
   */
  export type EligibilityRuleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EligibilityRule
     */
    select?: EligibilityRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EligibilityRule
     */
    omit?: EligibilityRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EligibilityRuleInclude<ExtArgs> | null
    /**
     * The data needed to update a EligibilityRule.
     */
    data: XOR<EligibilityRuleUpdateInput, EligibilityRuleUncheckedUpdateInput>
    /**
     * Choose, which EligibilityRule to update.
     */
    where: EligibilityRuleWhereUniqueInput
  }

  /**
   * EligibilityRule updateMany
   */
  export type EligibilityRuleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EligibilityRules.
     */
    data: XOR<EligibilityRuleUpdateManyMutationInput, EligibilityRuleUncheckedUpdateManyInput>
    /**
     * Filter which EligibilityRules to update
     */
    where?: EligibilityRuleWhereInput
    /**
     * Limit how many EligibilityRules to update.
     */
    limit?: number
  }

  /**
   * EligibilityRule updateManyAndReturn
   */
  export type EligibilityRuleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EligibilityRule
     */
    select?: EligibilityRuleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EligibilityRule
     */
    omit?: EligibilityRuleOmit<ExtArgs> | null
    /**
     * The data used to update EligibilityRules.
     */
    data: XOR<EligibilityRuleUpdateManyMutationInput, EligibilityRuleUncheckedUpdateManyInput>
    /**
     * Filter which EligibilityRules to update
     */
    where?: EligibilityRuleWhereInput
    /**
     * Limit how many EligibilityRules to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EligibilityRuleIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * EligibilityRule upsert
   */
  export type EligibilityRuleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EligibilityRule
     */
    select?: EligibilityRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EligibilityRule
     */
    omit?: EligibilityRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EligibilityRuleInclude<ExtArgs> | null
    /**
     * The filter to search for the EligibilityRule to update in case it exists.
     */
    where: EligibilityRuleWhereUniqueInput
    /**
     * In case the EligibilityRule found by the `where` argument doesn't exist, create a new EligibilityRule with this data.
     */
    create: XOR<EligibilityRuleCreateInput, EligibilityRuleUncheckedCreateInput>
    /**
     * In case the EligibilityRule was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EligibilityRuleUpdateInput, EligibilityRuleUncheckedUpdateInput>
  }

  /**
   * EligibilityRule delete
   */
  export type EligibilityRuleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EligibilityRule
     */
    select?: EligibilityRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EligibilityRule
     */
    omit?: EligibilityRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EligibilityRuleInclude<ExtArgs> | null
    /**
     * Filter which EligibilityRule to delete.
     */
    where: EligibilityRuleWhereUniqueInput
  }

  /**
   * EligibilityRule deleteMany
   */
  export type EligibilityRuleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EligibilityRules to delete
     */
    where?: EligibilityRuleWhereInput
    /**
     * Limit how many EligibilityRules to delete.
     */
    limit?: number
  }

  /**
   * EligibilityRule without action
   */
  export type EligibilityRuleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EligibilityRule
     */
    select?: EligibilityRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EligibilityRule
     */
    omit?: EligibilityRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EligibilityRuleInclude<ExtArgs> | null
  }


  /**
   * Model PriceLocality
   */

  export type AggregatePriceLocality = {
    _count: PriceLocalityCountAggregateOutputType | null
    _avg: PriceLocalityAvgAggregateOutputType | null
    _sum: PriceLocalitySumAggregateOutputType | null
    _min: PriceLocalityMinAggregateOutputType | null
    _max: PriceLocalityMaxAggregateOutputType | null
  }

  export type PriceLocalityAvgAggregateOutputType = {
    priceAmountCents: number | null
  }

  export type PriceLocalitySumAggregateOutputType = {
    priceAmountCents: number | null
  }

  export type PriceLocalityMinAggregateOutputType = {
    id: string | null
    offerId: string | null
    dddCode: string | null
    city: string | null
    priceAmountCents: number | null
    priceCurrency: string | null
    status: $Enums.PriceLocalityStatus | null
    createdAt: Date | null
  }

  export type PriceLocalityMaxAggregateOutputType = {
    id: string | null
    offerId: string | null
    dddCode: string | null
    city: string | null
    priceAmountCents: number | null
    priceCurrency: string | null
    status: $Enums.PriceLocalityStatus | null
    createdAt: Date | null
  }

  export type PriceLocalityCountAggregateOutputType = {
    id: number
    offerId: number
    dddCode: number
    city: number
    priceAmountCents: number
    priceCurrency: number
    status: number
    createdAt: number
    _all: number
  }


  export type PriceLocalityAvgAggregateInputType = {
    priceAmountCents?: true
  }

  export type PriceLocalitySumAggregateInputType = {
    priceAmountCents?: true
  }

  export type PriceLocalityMinAggregateInputType = {
    id?: true
    offerId?: true
    dddCode?: true
    city?: true
    priceAmountCents?: true
    priceCurrency?: true
    status?: true
    createdAt?: true
  }

  export type PriceLocalityMaxAggregateInputType = {
    id?: true
    offerId?: true
    dddCode?: true
    city?: true
    priceAmountCents?: true
    priceCurrency?: true
    status?: true
    createdAt?: true
  }

  export type PriceLocalityCountAggregateInputType = {
    id?: true
    offerId?: true
    dddCode?: true
    city?: true
    priceAmountCents?: true
    priceCurrency?: true
    status?: true
    createdAt?: true
    _all?: true
  }

  export type PriceLocalityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PriceLocality to aggregate.
     */
    where?: PriceLocalityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PriceLocalities to fetch.
     */
    orderBy?: PriceLocalityOrderByWithRelationInput | PriceLocalityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PriceLocalityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PriceLocalities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PriceLocalities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PriceLocalities
    **/
    _count?: true | PriceLocalityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PriceLocalityAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PriceLocalitySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PriceLocalityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PriceLocalityMaxAggregateInputType
  }

  export type GetPriceLocalityAggregateType<T extends PriceLocalityAggregateArgs> = {
        [P in keyof T & keyof AggregatePriceLocality]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePriceLocality[P]>
      : GetScalarType<T[P], AggregatePriceLocality[P]>
  }




  export type PriceLocalityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PriceLocalityWhereInput
    orderBy?: PriceLocalityOrderByWithAggregationInput | PriceLocalityOrderByWithAggregationInput[]
    by: PriceLocalityScalarFieldEnum[] | PriceLocalityScalarFieldEnum
    having?: PriceLocalityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PriceLocalityCountAggregateInputType | true
    _avg?: PriceLocalityAvgAggregateInputType
    _sum?: PriceLocalitySumAggregateInputType
    _min?: PriceLocalityMinAggregateInputType
    _max?: PriceLocalityMaxAggregateInputType
  }

  export type PriceLocalityGroupByOutputType = {
    id: string
    offerId: string
    dddCode: string
    city: string | null
    priceAmountCents: number
    priceCurrency: string
    status: $Enums.PriceLocalityStatus
    createdAt: Date
    _count: PriceLocalityCountAggregateOutputType | null
    _avg: PriceLocalityAvgAggregateOutputType | null
    _sum: PriceLocalitySumAggregateOutputType | null
    _min: PriceLocalityMinAggregateOutputType | null
    _max: PriceLocalityMaxAggregateOutputType | null
  }

  type GetPriceLocalityGroupByPayload<T extends PriceLocalityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PriceLocalityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PriceLocalityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PriceLocalityGroupByOutputType[P]>
            : GetScalarType<T[P], PriceLocalityGroupByOutputType[P]>
        }
      >
    >


  export type PriceLocalitySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    offerId?: boolean
    dddCode?: boolean
    city?: boolean
    priceAmountCents?: boolean
    priceCurrency?: boolean
    status?: boolean
    createdAt?: boolean
    offer?: boolean | OfferDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["priceLocality"]>

  export type PriceLocalitySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    offerId?: boolean
    dddCode?: boolean
    city?: boolean
    priceAmountCents?: boolean
    priceCurrency?: boolean
    status?: boolean
    createdAt?: boolean
    offer?: boolean | OfferDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["priceLocality"]>

  export type PriceLocalitySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    offerId?: boolean
    dddCode?: boolean
    city?: boolean
    priceAmountCents?: boolean
    priceCurrency?: boolean
    status?: boolean
    createdAt?: boolean
    offer?: boolean | OfferDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["priceLocality"]>

  export type PriceLocalitySelectScalar = {
    id?: boolean
    offerId?: boolean
    dddCode?: boolean
    city?: boolean
    priceAmountCents?: boolean
    priceCurrency?: boolean
    status?: boolean
    createdAt?: boolean
  }

  export type PriceLocalityOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "offerId" | "dddCode" | "city" | "priceAmountCents" | "priceCurrency" | "status" | "createdAt", ExtArgs["result"]["priceLocality"]>
  export type PriceLocalityInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    offer?: boolean | OfferDefaultArgs<ExtArgs>
  }
  export type PriceLocalityIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    offer?: boolean | OfferDefaultArgs<ExtArgs>
  }
  export type PriceLocalityIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    offer?: boolean | OfferDefaultArgs<ExtArgs>
  }

  export type $PriceLocalityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PriceLocality"
    objects: {
      offer: Prisma.$OfferPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      offerId: string
      dddCode: string
      city: string | null
      priceAmountCents: number
      priceCurrency: string
      status: $Enums.PriceLocalityStatus
      createdAt: Date
    }, ExtArgs["result"]["priceLocality"]>
    composites: {}
  }

  type PriceLocalityGetPayload<S extends boolean | null | undefined | PriceLocalityDefaultArgs> = $Result.GetResult<Prisma.$PriceLocalityPayload, S>

  type PriceLocalityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PriceLocalityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PriceLocalityCountAggregateInputType | true
    }

  export interface PriceLocalityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PriceLocality'], meta: { name: 'PriceLocality' } }
    /**
     * Find zero or one PriceLocality that matches the filter.
     * @param {PriceLocalityFindUniqueArgs} args - Arguments to find a PriceLocality
     * @example
     * // Get one PriceLocality
     * const priceLocality = await prisma.priceLocality.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PriceLocalityFindUniqueArgs>(args: SelectSubset<T, PriceLocalityFindUniqueArgs<ExtArgs>>): Prisma__PriceLocalityClient<$Result.GetResult<Prisma.$PriceLocalityPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PriceLocality that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PriceLocalityFindUniqueOrThrowArgs} args - Arguments to find a PriceLocality
     * @example
     * // Get one PriceLocality
     * const priceLocality = await prisma.priceLocality.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PriceLocalityFindUniqueOrThrowArgs>(args: SelectSubset<T, PriceLocalityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PriceLocalityClient<$Result.GetResult<Prisma.$PriceLocalityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PriceLocality that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceLocalityFindFirstArgs} args - Arguments to find a PriceLocality
     * @example
     * // Get one PriceLocality
     * const priceLocality = await prisma.priceLocality.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PriceLocalityFindFirstArgs>(args?: SelectSubset<T, PriceLocalityFindFirstArgs<ExtArgs>>): Prisma__PriceLocalityClient<$Result.GetResult<Prisma.$PriceLocalityPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PriceLocality that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceLocalityFindFirstOrThrowArgs} args - Arguments to find a PriceLocality
     * @example
     * // Get one PriceLocality
     * const priceLocality = await prisma.priceLocality.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PriceLocalityFindFirstOrThrowArgs>(args?: SelectSubset<T, PriceLocalityFindFirstOrThrowArgs<ExtArgs>>): Prisma__PriceLocalityClient<$Result.GetResult<Prisma.$PriceLocalityPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PriceLocalities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceLocalityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PriceLocalities
     * const priceLocalities = await prisma.priceLocality.findMany()
     * 
     * // Get first 10 PriceLocalities
     * const priceLocalities = await prisma.priceLocality.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const priceLocalityWithIdOnly = await prisma.priceLocality.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PriceLocalityFindManyArgs>(args?: SelectSubset<T, PriceLocalityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PriceLocalityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PriceLocality.
     * @param {PriceLocalityCreateArgs} args - Arguments to create a PriceLocality.
     * @example
     * // Create one PriceLocality
     * const PriceLocality = await prisma.priceLocality.create({
     *   data: {
     *     // ... data to create a PriceLocality
     *   }
     * })
     * 
     */
    create<T extends PriceLocalityCreateArgs>(args: SelectSubset<T, PriceLocalityCreateArgs<ExtArgs>>): Prisma__PriceLocalityClient<$Result.GetResult<Prisma.$PriceLocalityPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PriceLocalities.
     * @param {PriceLocalityCreateManyArgs} args - Arguments to create many PriceLocalities.
     * @example
     * // Create many PriceLocalities
     * const priceLocality = await prisma.priceLocality.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PriceLocalityCreateManyArgs>(args?: SelectSubset<T, PriceLocalityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PriceLocalities and returns the data saved in the database.
     * @param {PriceLocalityCreateManyAndReturnArgs} args - Arguments to create many PriceLocalities.
     * @example
     * // Create many PriceLocalities
     * const priceLocality = await prisma.priceLocality.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PriceLocalities and only return the `id`
     * const priceLocalityWithIdOnly = await prisma.priceLocality.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PriceLocalityCreateManyAndReturnArgs>(args?: SelectSubset<T, PriceLocalityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PriceLocalityPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PriceLocality.
     * @param {PriceLocalityDeleteArgs} args - Arguments to delete one PriceLocality.
     * @example
     * // Delete one PriceLocality
     * const PriceLocality = await prisma.priceLocality.delete({
     *   where: {
     *     // ... filter to delete one PriceLocality
     *   }
     * })
     * 
     */
    delete<T extends PriceLocalityDeleteArgs>(args: SelectSubset<T, PriceLocalityDeleteArgs<ExtArgs>>): Prisma__PriceLocalityClient<$Result.GetResult<Prisma.$PriceLocalityPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PriceLocality.
     * @param {PriceLocalityUpdateArgs} args - Arguments to update one PriceLocality.
     * @example
     * // Update one PriceLocality
     * const priceLocality = await prisma.priceLocality.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PriceLocalityUpdateArgs>(args: SelectSubset<T, PriceLocalityUpdateArgs<ExtArgs>>): Prisma__PriceLocalityClient<$Result.GetResult<Prisma.$PriceLocalityPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PriceLocalities.
     * @param {PriceLocalityDeleteManyArgs} args - Arguments to filter PriceLocalities to delete.
     * @example
     * // Delete a few PriceLocalities
     * const { count } = await prisma.priceLocality.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PriceLocalityDeleteManyArgs>(args?: SelectSubset<T, PriceLocalityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PriceLocalities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceLocalityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PriceLocalities
     * const priceLocality = await prisma.priceLocality.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PriceLocalityUpdateManyArgs>(args: SelectSubset<T, PriceLocalityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PriceLocalities and returns the data updated in the database.
     * @param {PriceLocalityUpdateManyAndReturnArgs} args - Arguments to update many PriceLocalities.
     * @example
     * // Update many PriceLocalities
     * const priceLocality = await prisma.priceLocality.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PriceLocalities and only return the `id`
     * const priceLocalityWithIdOnly = await prisma.priceLocality.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PriceLocalityUpdateManyAndReturnArgs>(args: SelectSubset<T, PriceLocalityUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PriceLocalityPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PriceLocality.
     * @param {PriceLocalityUpsertArgs} args - Arguments to update or create a PriceLocality.
     * @example
     * // Update or create a PriceLocality
     * const priceLocality = await prisma.priceLocality.upsert({
     *   create: {
     *     // ... data to create a PriceLocality
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PriceLocality we want to update
     *   }
     * })
     */
    upsert<T extends PriceLocalityUpsertArgs>(args: SelectSubset<T, PriceLocalityUpsertArgs<ExtArgs>>): Prisma__PriceLocalityClient<$Result.GetResult<Prisma.$PriceLocalityPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PriceLocalities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceLocalityCountArgs} args - Arguments to filter PriceLocalities to count.
     * @example
     * // Count the number of PriceLocalities
     * const count = await prisma.priceLocality.count({
     *   where: {
     *     // ... the filter for the PriceLocalities we want to count
     *   }
     * })
    **/
    count<T extends PriceLocalityCountArgs>(
      args?: Subset<T, PriceLocalityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PriceLocalityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PriceLocality.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceLocalityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PriceLocalityAggregateArgs>(args: Subset<T, PriceLocalityAggregateArgs>): Prisma.PrismaPromise<GetPriceLocalityAggregateType<T>>

    /**
     * Group by PriceLocality.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceLocalityGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PriceLocalityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PriceLocalityGroupByArgs['orderBy'] }
        : { orderBy?: PriceLocalityGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PriceLocalityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPriceLocalityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PriceLocality model
   */
  readonly fields: PriceLocalityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PriceLocality.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PriceLocalityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    offer<T extends OfferDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OfferDefaultArgs<ExtArgs>>): Prisma__OfferClient<$Result.GetResult<Prisma.$OfferPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PriceLocality model
   */
  interface PriceLocalityFieldRefs {
    readonly id: FieldRef<"PriceLocality", 'String'>
    readonly offerId: FieldRef<"PriceLocality", 'String'>
    readonly dddCode: FieldRef<"PriceLocality", 'String'>
    readonly city: FieldRef<"PriceLocality", 'String'>
    readonly priceAmountCents: FieldRef<"PriceLocality", 'Int'>
    readonly priceCurrency: FieldRef<"PriceLocality", 'String'>
    readonly status: FieldRef<"PriceLocality", 'PriceLocalityStatus'>
    readonly createdAt: FieldRef<"PriceLocality", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PriceLocality findUnique
   */
  export type PriceLocalityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceLocality
     */
    select?: PriceLocalitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceLocality
     */
    omit?: PriceLocalityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceLocalityInclude<ExtArgs> | null
    /**
     * Filter, which PriceLocality to fetch.
     */
    where: PriceLocalityWhereUniqueInput
  }

  /**
   * PriceLocality findUniqueOrThrow
   */
  export type PriceLocalityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceLocality
     */
    select?: PriceLocalitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceLocality
     */
    omit?: PriceLocalityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceLocalityInclude<ExtArgs> | null
    /**
     * Filter, which PriceLocality to fetch.
     */
    where: PriceLocalityWhereUniqueInput
  }

  /**
   * PriceLocality findFirst
   */
  export type PriceLocalityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceLocality
     */
    select?: PriceLocalitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceLocality
     */
    omit?: PriceLocalityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceLocalityInclude<ExtArgs> | null
    /**
     * Filter, which PriceLocality to fetch.
     */
    where?: PriceLocalityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PriceLocalities to fetch.
     */
    orderBy?: PriceLocalityOrderByWithRelationInput | PriceLocalityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PriceLocalities.
     */
    cursor?: PriceLocalityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PriceLocalities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PriceLocalities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PriceLocalities.
     */
    distinct?: PriceLocalityScalarFieldEnum | PriceLocalityScalarFieldEnum[]
  }

  /**
   * PriceLocality findFirstOrThrow
   */
  export type PriceLocalityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceLocality
     */
    select?: PriceLocalitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceLocality
     */
    omit?: PriceLocalityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceLocalityInclude<ExtArgs> | null
    /**
     * Filter, which PriceLocality to fetch.
     */
    where?: PriceLocalityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PriceLocalities to fetch.
     */
    orderBy?: PriceLocalityOrderByWithRelationInput | PriceLocalityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PriceLocalities.
     */
    cursor?: PriceLocalityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PriceLocalities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PriceLocalities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PriceLocalities.
     */
    distinct?: PriceLocalityScalarFieldEnum | PriceLocalityScalarFieldEnum[]
  }

  /**
   * PriceLocality findMany
   */
  export type PriceLocalityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceLocality
     */
    select?: PriceLocalitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceLocality
     */
    omit?: PriceLocalityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceLocalityInclude<ExtArgs> | null
    /**
     * Filter, which PriceLocalities to fetch.
     */
    where?: PriceLocalityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PriceLocalities to fetch.
     */
    orderBy?: PriceLocalityOrderByWithRelationInput | PriceLocalityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PriceLocalities.
     */
    cursor?: PriceLocalityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PriceLocalities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PriceLocalities.
     */
    skip?: number
    distinct?: PriceLocalityScalarFieldEnum | PriceLocalityScalarFieldEnum[]
  }

  /**
   * PriceLocality create
   */
  export type PriceLocalityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceLocality
     */
    select?: PriceLocalitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceLocality
     */
    omit?: PriceLocalityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceLocalityInclude<ExtArgs> | null
    /**
     * The data needed to create a PriceLocality.
     */
    data: XOR<PriceLocalityCreateInput, PriceLocalityUncheckedCreateInput>
  }

  /**
   * PriceLocality createMany
   */
  export type PriceLocalityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PriceLocalities.
     */
    data: PriceLocalityCreateManyInput | PriceLocalityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PriceLocality createManyAndReturn
   */
  export type PriceLocalityCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceLocality
     */
    select?: PriceLocalitySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PriceLocality
     */
    omit?: PriceLocalityOmit<ExtArgs> | null
    /**
     * The data used to create many PriceLocalities.
     */
    data: PriceLocalityCreateManyInput | PriceLocalityCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceLocalityIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PriceLocality update
   */
  export type PriceLocalityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceLocality
     */
    select?: PriceLocalitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceLocality
     */
    omit?: PriceLocalityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceLocalityInclude<ExtArgs> | null
    /**
     * The data needed to update a PriceLocality.
     */
    data: XOR<PriceLocalityUpdateInput, PriceLocalityUncheckedUpdateInput>
    /**
     * Choose, which PriceLocality to update.
     */
    where: PriceLocalityWhereUniqueInput
  }

  /**
   * PriceLocality updateMany
   */
  export type PriceLocalityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PriceLocalities.
     */
    data: XOR<PriceLocalityUpdateManyMutationInput, PriceLocalityUncheckedUpdateManyInput>
    /**
     * Filter which PriceLocalities to update
     */
    where?: PriceLocalityWhereInput
    /**
     * Limit how many PriceLocalities to update.
     */
    limit?: number
  }

  /**
   * PriceLocality updateManyAndReturn
   */
  export type PriceLocalityUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceLocality
     */
    select?: PriceLocalitySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PriceLocality
     */
    omit?: PriceLocalityOmit<ExtArgs> | null
    /**
     * The data used to update PriceLocalities.
     */
    data: XOR<PriceLocalityUpdateManyMutationInput, PriceLocalityUncheckedUpdateManyInput>
    /**
     * Filter which PriceLocalities to update
     */
    where?: PriceLocalityWhereInput
    /**
     * Limit how many PriceLocalities to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceLocalityIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PriceLocality upsert
   */
  export type PriceLocalityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceLocality
     */
    select?: PriceLocalitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceLocality
     */
    omit?: PriceLocalityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceLocalityInclude<ExtArgs> | null
    /**
     * The filter to search for the PriceLocality to update in case it exists.
     */
    where: PriceLocalityWhereUniqueInput
    /**
     * In case the PriceLocality found by the `where` argument doesn't exist, create a new PriceLocality with this data.
     */
    create: XOR<PriceLocalityCreateInput, PriceLocalityUncheckedCreateInput>
    /**
     * In case the PriceLocality was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PriceLocalityUpdateInput, PriceLocalityUncheckedUpdateInput>
  }

  /**
   * PriceLocality delete
   */
  export type PriceLocalityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceLocality
     */
    select?: PriceLocalitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceLocality
     */
    omit?: PriceLocalityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceLocalityInclude<ExtArgs> | null
    /**
     * Filter which PriceLocality to delete.
     */
    where: PriceLocalityWhereUniqueInput
  }

  /**
   * PriceLocality deleteMany
   */
  export type PriceLocalityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PriceLocalities to delete
     */
    where?: PriceLocalityWhereInput
    /**
     * Limit how many PriceLocalities to delete.
     */
    limit?: number
  }

  /**
   * PriceLocality without action
   */
  export type PriceLocalityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceLocality
     */
    select?: PriceLocalitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceLocality
     */
    omit?: PriceLocalityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceLocalityInclude<ExtArgs> | null
  }


  /**
   * Model OutboxEvent
   */

  export type AggregateOutboxEvent = {
    _count: OutboxEventCountAggregateOutputType | null
    _avg: OutboxEventAvgAggregateOutputType | null
    _sum: OutboxEventSumAggregateOutputType | null
    _min: OutboxEventMinAggregateOutputType | null
    _max: OutboxEventMaxAggregateOutputType | null
  }

  export type OutboxEventAvgAggregateOutputType = {
    retryCount: number | null
  }

  export type OutboxEventSumAggregateOutputType = {
    retryCount: number | null
  }

  export type OutboxEventMinAggregateOutputType = {
    id: string | null
    aggregateId: string | null
    aggregateType: string | null
    eventType: string | null
    correlationId: string | null
    causationId: string | null
    createdAt: Date | null
    publishedAt: Date | null
    status: string | null
    retryCount: number | null
  }

  export type OutboxEventMaxAggregateOutputType = {
    id: string | null
    aggregateId: string | null
    aggregateType: string | null
    eventType: string | null
    correlationId: string | null
    causationId: string | null
    createdAt: Date | null
    publishedAt: Date | null
    status: string | null
    retryCount: number | null
  }

  export type OutboxEventCountAggregateOutputType = {
    id: number
    aggregateId: number
    aggregateType: number
    eventType: number
    payload: number
    correlationId: number
    causationId: number
    createdAt: number
    publishedAt: number
    status: number
    retryCount: number
    _all: number
  }


  export type OutboxEventAvgAggregateInputType = {
    retryCount?: true
  }

  export type OutboxEventSumAggregateInputType = {
    retryCount?: true
  }

  export type OutboxEventMinAggregateInputType = {
    id?: true
    aggregateId?: true
    aggregateType?: true
    eventType?: true
    correlationId?: true
    causationId?: true
    createdAt?: true
    publishedAt?: true
    status?: true
    retryCount?: true
  }

  export type OutboxEventMaxAggregateInputType = {
    id?: true
    aggregateId?: true
    aggregateType?: true
    eventType?: true
    correlationId?: true
    causationId?: true
    createdAt?: true
    publishedAt?: true
    status?: true
    retryCount?: true
  }

  export type OutboxEventCountAggregateInputType = {
    id?: true
    aggregateId?: true
    aggregateType?: true
    eventType?: true
    payload?: true
    correlationId?: true
    causationId?: true
    createdAt?: true
    publishedAt?: true
    status?: true
    retryCount?: true
    _all?: true
  }

  export type OutboxEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OutboxEvent to aggregate.
     */
    where?: OutboxEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OutboxEvents to fetch.
     */
    orderBy?: OutboxEventOrderByWithRelationInput | OutboxEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OutboxEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OutboxEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OutboxEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OutboxEvents
    **/
    _count?: true | OutboxEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OutboxEventAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OutboxEventSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OutboxEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OutboxEventMaxAggregateInputType
  }

  export type GetOutboxEventAggregateType<T extends OutboxEventAggregateArgs> = {
        [P in keyof T & keyof AggregateOutboxEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOutboxEvent[P]>
      : GetScalarType<T[P], AggregateOutboxEvent[P]>
  }




  export type OutboxEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OutboxEventWhereInput
    orderBy?: OutboxEventOrderByWithAggregationInput | OutboxEventOrderByWithAggregationInput[]
    by: OutboxEventScalarFieldEnum[] | OutboxEventScalarFieldEnum
    having?: OutboxEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OutboxEventCountAggregateInputType | true
    _avg?: OutboxEventAvgAggregateInputType
    _sum?: OutboxEventSumAggregateInputType
    _min?: OutboxEventMinAggregateInputType
    _max?: OutboxEventMaxAggregateInputType
  }

  export type OutboxEventGroupByOutputType = {
    id: string
    aggregateId: string
    aggregateType: string
    eventType: string
    payload: JsonValue
    correlationId: string | null
    causationId: string | null
    createdAt: Date
    publishedAt: Date | null
    status: string
    retryCount: number
    _count: OutboxEventCountAggregateOutputType | null
    _avg: OutboxEventAvgAggregateOutputType | null
    _sum: OutboxEventSumAggregateOutputType | null
    _min: OutboxEventMinAggregateOutputType | null
    _max: OutboxEventMaxAggregateOutputType | null
  }

  type GetOutboxEventGroupByPayload<T extends OutboxEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OutboxEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OutboxEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OutboxEventGroupByOutputType[P]>
            : GetScalarType<T[P], OutboxEventGroupByOutputType[P]>
        }
      >
    >


  export type OutboxEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    aggregateId?: boolean
    aggregateType?: boolean
    eventType?: boolean
    payload?: boolean
    correlationId?: boolean
    causationId?: boolean
    createdAt?: boolean
    publishedAt?: boolean
    status?: boolean
    retryCount?: boolean
  }, ExtArgs["result"]["outboxEvent"]>

  export type OutboxEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    aggregateId?: boolean
    aggregateType?: boolean
    eventType?: boolean
    payload?: boolean
    correlationId?: boolean
    causationId?: boolean
    createdAt?: boolean
    publishedAt?: boolean
    status?: boolean
    retryCount?: boolean
  }, ExtArgs["result"]["outboxEvent"]>

  export type OutboxEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    aggregateId?: boolean
    aggregateType?: boolean
    eventType?: boolean
    payload?: boolean
    correlationId?: boolean
    causationId?: boolean
    createdAt?: boolean
    publishedAt?: boolean
    status?: boolean
    retryCount?: boolean
  }, ExtArgs["result"]["outboxEvent"]>

  export type OutboxEventSelectScalar = {
    id?: boolean
    aggregateId?: boolean
    aggregateType?: boolean
    eventType?: boolean
    payload?: boolean
    correlationId?: boolean
    causationId?: boolean
    createdAt?: boolean
    publishedAt?: boolean
    status?: boolean
    retryCount?: boolean
  }

  export type OutboxEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "aggregateId" | "aggregateType" | "eventType" | "payload" | "correlationId" | "causationId" | "createdAt" | "publishedAt" | "status" | "retryCount", ExtArgs["result"]["outboxEvent"]>

  export type $OutboxEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OutboxEvent"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      aggregateId: string
      aggregateType: string
      eventType: string
      payload: Prisma.JsonValue
      correlationId: string | null
      causationId: string | null
      createdAt: Date
      publishedAt: Date | null
      status: string
      retryCount: number
    }, ExtArgs["result"]["outboxEvent"]>
    composites: {}
  }

  type OutboxEventGetPayload<S extends boolean | null | undefined | OutboxEventDefaultArgs> = $Result.GetResult<Prisma.$OutboxEventPayload, S>

  type OutboxEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OutboxEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OutboxEventCountAggregateInputType | true
    }

  export interface OutboxEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OutboxEvent'], meta: { name: 'OutboxEvent' } }
    /**
     * Find zero or one OutboxEvent that matches the filter.
     * @param {OutboxEventFindUniqueArgs} args - Arguments to find a OutboxEvent
     * @example
     * // Get one OutboxEvent
     * const outboxEvent = await prisma.outboxEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OutboxEventFindUniqueArgs>(args: SelectSubset<T, OutboxEventFindUniqueArgs<ExtArgs>>): Prisma__OutboxEventClient<$Result.GetResult<Prisma.$OutboxEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OutboxEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OutboxEventFindUniqueOrThrowArgs} args - Arguments to find a OutboxEvent
     * @example
     * // Get one OutboxEvent
     * const outboxEvent = await prisma.outboxEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OutboxEventFindUniqueOrThrowArgs>(args: SelectSubset<T, OutboxEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OutboxEventClient<$Result.GetResult<Prisma.$OutboxEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OutboxEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutboxEventFindFirstArgs} args - Arguments to find a OutboxEvent
     * @example
     * // Get one OutboxEvent
     * const outboxEvent = await prisma.outboxEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OutboxEventFindFirstArgs>(args?: SelectSubset<T, OutboxEventFindFirstArgs<ExtArgs>>): Prisma__OutboxEventClient<$Result.GetResult<Prisma.$OutboxEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OutboxEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutboxEventFindFirstOrThrowArgs} args - Arguments to find a OutboxEvent
     * @example
     * // Get one OutboxEvent
     * const outboxEvent = await prisma.outboxEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OutboxEventFindFirstOrThrowArgs>(args?: SelectSubset<T, OutboxEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__OutboxEventClient<$Result.GetResult<Prisma.$OutboxEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OutboxEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutboxEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OutboxEvents
     * const outboxEvents = await prisma.outboxEvent.findMany()
     * 
     * // Get first 10 OutboxEvents
     * const outboxEvents = await prisma.outboxEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const outboxEventWithIdOnly = await prisma.outboxEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OutboxEventFindManyArgs>(args?: SelectSubset<T, OutboxEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OutboxEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OutboxEvent.
     * @param {OutboxEventCreateArgs} args - Arguments to create a OutboxEvent.
     * @example
     * // Create one OutboxEvent
     * const OutboxEvent = await prisma.outboxEvent.create({
     *   data: {
     *     // ... data to create a OutboxEvent
     *   }
     * })
     * 
     */
    create<T extends OutboxEventCreateArgs>(args: SelectSubset<T, OutboxEventCreateArgs<ExtArgs>>): Prisma__OutboxEventClient<$Result.GetResult<Prisma.$OutboxEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OutboxEvents.
     * @param {OutboxEventCreateManyArgs} args - Arguments to create many OutboxEvents.
     * @example
     * // Create many OutboxEvents
     * const outboxEvent = await prisma.outboxEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OutboxEventCreateManyArgs>(args?: SelectSubset<T, OutboxEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OutboxEvents and returns the data saved in the database.
     * @param {OutboxEventCreateManyAndReturnArgs} args - Arguments to create many OutboxEvents.
     * @example
     * // Create many OutboxEvents
     * const outboxEvent = await prisma.outboxEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OutboxEvents and only return the `id`
     * const outboxEventWithIdOnly = await prisma.outboxEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OutboxEventCreateManyAndReturnArgs>(args?: SelectSubset<T, OutboxEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OutboxEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OutboxEvent.
     * @param {OutboxEventDeleteArgs} args - Arguments to delete one OutboxEvent.
     * @example
     * // Delete one OutboxEvent
     * const OutboxEvent = await prisma.outboxEvent.delete({
     *   where: {
     *     // ... filter to delete one OutboxEvent
     *   }
     * })
     * 
     */
    delete<T extends OutboxEventDeleteArgs>(args: SelectSubset<T, OutboxEventDeleteArgs<ExtArgs>>): Prisma__OutboxEventClient<$Result.GetResult<Prisma.$OutboxEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OutboxEvent.
     * @param {OutboxEventUpdateArgs} args - Arguments to update one OutboxEvent.
     * @example
     * // Update one OutboxEvent
     * const outboxEvent = await prisma.outboxEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OutboxEventUpdateArgs>(args: SelectSubset<T, OutboxEventUpdateArgs<ExtArgs>>): Prisma__OutboxEventClient<$Result.GetResult<Prisma.$OutboxEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OutboxEvents.
     * @param {OutboxEventDeleteManyArgs} args - Arguments to filter OutboxEvents to delete.
     * @example
     * // Delete a few OutboxEvents
     * const { count } = await prisma.outboxEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OutboxEventDeleteManyArgs>(args?: SelectSubset<T, OutboxEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OutboxEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutboxEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OutboxEvents
     * const outboxEvent = await prisma.outboxEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OutboxEventUpdateManyArgs>(args: SelectSubset<T, OutboxEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OutboxEvents and returns the data updated in the database.
     * @param {OutboxEventUpdateManyAndReturnArgs} args - Arguments to update many OutboxEvents.
     * @example
     * // Update many OutboxEvents
     * const outboxEvent = await prisma.outboxEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OutboxEvents and only return the `id`
     * const outboxEventWithIdOnly = await prisma.outboxEvent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OutboxEventUpdateManyAndReturnArgs>(args: SelectSubset<T, OutboxEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OutboxEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OutboxEvent.
     * @param {OutboxEventUpsertArgs} args - Arguments to update or create a OutboxEvent.
     * @example
     * // Update or create a OutboxEvent
     * const outboxEvent = await prisma.outboxEvent.upsert({
     *   create: {
     *     // ... data to create a OutboxEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OutboxEvent we want to update
     *   }
     * })
     */
    upsert<T extends OutboxEventUpsertArgs>(args: SelectSubset<T, OutboxEventUpsertArgs<ExtArgs>>): Prisma__OutboxEventClient<$Result.GetResult<Prisma.$OutboxEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OutboxEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutboxEventCountArgs} args - Arguments to filter OutboxEvents to count.
     * @example
     * // Count the number of OutboxEvents
     * const count = await prisma.outboxEvent.count({
     *   where: {
     *     // ... the filter for the OutboxEvents we want to count
     *   }
     * })
    **/
    count<T extends OutboxEventCountArgs>(
      args?: Subset<T, OutboxEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OutboxEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OutboxEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutboxEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OutboxEventAggregateArgs>(args: Subset<T, OutboxEventAggregateArgs>): Prisma.PrismaPromise<GetOutboxEventAggregateType<T>>

    /**
     * Group by OutboxEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutboxEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OutboxEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OutboxEventGroupByArgs['orderBy'] }
        : { orderBy?: OutboxEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OutboxEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOutboxEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OutboxEvent model
   */
  readonly fields: OutboxEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OutboxEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OutboxEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OutboxEvent model
   */
  interface OutboxEventFieldRefs {
    readonly id: FieldRef<"OutboxEvent", 'String'>
    readonly aggregateId: FieldRef<"OutboxEvent", 'String'>
    readonly aggregateType: FieldRef<"OutboxEvent", 'String'>
    readonly eventType: FieldRef<"OutboxEvent", 'String'>
    readonly payload: FieldRef<"OutboxEvent", 'Json'>
    readonly correlationId: FieldRef<"OutboxEvent", 'String'>
    readonly causationId: FieldRef<"OutboxEvent", 'String'>
    readonly createdAt: FieldRef<"OutboxEvent", 'DateTime'>
    readonly publishedAt: FieldRef<"OutboxEvent", 'DateTime'>
    readonly status: FieldRef<"OutboxEvent", 'String'>
    readonly retryCount: FieldRef<"OutboxEvent", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * OutboxEvent findUnique
   */
  export type OutboxEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboxEvent
     */
    select?: OutboxEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutboxEvent
     */
    omit?: OutboxEventOmit<ExtArgs> | null
    /**
     * Filter, which OutboxEvent to fetch.
     */
    where: OutboxEventWhereUniqueInput
  }

  /**
   * OutboxEvent findUniqueOrThrow
   */
  export type OutboxEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboxEvent
     */
    select?: OutboxEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutboxEvent
     */
    omit?: OutboxEventOmit<ExtArgs> | null
    /**
     * Filter, which OutboxEvent to fetch.
     */
    where: OutboxEventWhereUniqueInput
  }

  /**
   * OutboxEvent findFirst
   */
  export type OutboxEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboxEvent
     */
    select?: OutboxEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutboxEvent
     */
    omit?: OutboxEventOmit<ExtArgs> | null
    /**
     * Filter, which OutboxEvent to fetch.
     */
    where?: OutboxEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OutboxEvents to fetch.
     */
    orderBy?: OutboxEventOrderByWithRelationInput | OutboxEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OutboxEvents.
     */
    cursor?: OutboxEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OutboxEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OutboxEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OutboxEvents.
     */
    distinct?: OutboxEventScalarFieldEnum | OutboxEventScalarFieldEnum[]
  }

  /**
   * OutboxEvent findFirstOrThrow
   */
  export type OutboxEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboxEvent
     */
    select?: OutboxEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutboxEvent
     */
    omit?: OutboxEventOmit<ExtArgs> | null
    /**
     * Filter, which OutboxEvent to fetch.
     */
    where?: OutboxEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OutboxEvents to fetch.
     */
    orderBy?: OutboxEventOrderByWithRelationInput | OutboxEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OutboxEvents.
     */
    cursor?: OutboxEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OutboxEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OutboxEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OutboxEvents.
     */
    distinct?: OutboxEventScalarFieldEnum | OutboxEventScalarFieldEnum[]
  }

  /**
   * OutboxEvent findMany
   */
  export type OutboxEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboxEvent
     */
    select?: OutboxEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutboxEvent
     */
    omit?: OutboxEventOmit<ExtArgs> | null
    /**
     * Filter, which OutboxEvents to fetch.
     */
    where?: OutboxEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OutboxEvents to fetch.
     */
    orderBy?: OutboxEventOrderByWithRelationInput | OutboxEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OutboxEvents.
     */
    cursor?: OutboxEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OutboxEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OutboxEvents.
     */
    skip?: number
    distinct?: OutboxEventScalarFieldEnum | OutboxEventScalarFieldEnum[]
  }

  /**
   * OutboxEvent create
   */
  export type OutboxEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboxEvent
     */
    select?: OutboxEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutboxEvent
     */
    omit?: OutboxEventOmit<ExtArgs> | null
    /**
     * The data needed to create a OutboxEvent.
     */
    data: XOR<OutboxEventCreateInput, OutboxEventUncheckedCreateInput>
  }

  /**
   * OutboxEvent createMany
   */
  export type OutboxEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OutboxEvents.
     */
    data: OutboxEventCreateManyInput | OutboxEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OutboxEvent createManyAndReturn
   */
  export type OutboxEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboxEvent
     */
    select?: OutboxEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OutboxEvent
     */
    omit?: OutboxEventOmit<ExtArgs> | null
    /**
     * The data used to create many OutboxEvents.
     */
    data: OutboxEventCreateManyInput | OutboxEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OutboxEvent update
   */
  export type OutboxEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboxEvent
     */
    select?: OutboxEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutboxEvent
     */
    omit?: OutboxEventOmit<ExtArgs> | null
    /**
     * The data needed to update a OutboxEvent.
     */
    data: XOR<OutboxEventUpdateInput, OutboxEventUncheckedUpdateInput>
    /**
     * Choose, which OutboxEvent to update.
     */
    where: OutboxEventWhereUniqueInput
  }

  /**
   * OutboxEvent updateMany
   */
  export type OutboxEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OutboxEvents.
     */
    data: XOR<OutboxEventUpdateManyMutationInput, OutboxEventUncheckedUpdateManyInput>
    /**
     * Filter which OutboxEvents to update
     */
    where?: OutboxEventWhereInput
    /**
     * Limit how many OutboxEvents to update.
     */
    limit?: number
  }

  /**
   * OutboxEvent updateManyAndReturn
   */
  export type OutboxEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboxEvent
     */
    select?: OutboxEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OutboxEvent
     */
    omit?: OutboxEventOmit<ExtArgs> | null
    /**
     * The data used to update OutboxEvents.
     */
    data: XOR<OutboxEventUpdateManyMutationInput, OutboxEventUncheckedUpdateManyInput>
    /**
     * Filter which OutboxEvents to update
     */
    where?: OutboxEventWhereInput
    /**
     * Limit how many OutboxEvents to update.
     */
    limit?: number
  }

  /**
   * OutboxEvent upsert
   */
  export type OutboxEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboxEvent
     */
    select?: OutboxEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutboxEvent
     */
    omit?: OutboxEventOmit<ExtArgs> | null
    /**
     * The filter to search for the OutboxEvent to update in case it exists.
     */
    where: OutboxEventWhereUniqueInput
    /**
     * In case the OutboxEvent found by the `where` argument doesn't exist, create a new OutboxEvent with this data.
     */
    create: XOR<OutboxEventCreateInput, OutboxEventUncheckedCreateInput>
    /**
     * In case the OutboxEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OutboxEventUpdateInput, OutboxEventUncheckedUpdateInput>
  }

  /**
   * OutboxEvent delete
   */
  export type OutboxEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboxEvent
     */
    select?: OutboxEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutboxEvent
     */
    omit?: OutboxEventOmit<ExtArgs> | null
    /**
     * Filter which OutboxEvent to delete.
     */
    where: OutboxEventWhereUniqueInput
  }

  /**
   * OutboxEvent deleteMany
   */
  export type OutboxEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OutboxEvents to delete
     */
    where?: OutboxEventWhereInput
    /**
     * Limit how many OutboxEvents to delete.
     */
    limit?: number
  }

  /**
   * OutboxEvent without action
   */
  export type OutboxEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboxEvent
     */
    select?: OutboxEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutboxEvent
     */
    omit?: OutboxEventOmit<ExtArgs> | null
  }


  /**
   * Model ProcessedEvent
   */

  export type AggregateProcessedEvent = {
    _count: ProcessedEventCountAggregateOutputType | null
    _min: ProcessedEventMinAggregateOutputType | null
    _max: ProcessedEventMaxAggregateOutputType | null
  }

  export type ProcessedEventMinAggregateOutputType = {
    eventId: string | null
    eventType: string | null
    processedAt: Date | null
  }

  export type ProcessedEventMaxAggregateOutputType = {
    eventId: string | null
    eventType: string | null
    processedAt: Date | null
  }

  export type ProcessedEventCountAggregateOutputType = {
    eventId: number
    eventType: number
    processedAt: number
    _all: number
  }


  export type ProcessedEventMinAggregateInputType = {
    eventId?: true
    eventType?: true
    processedAt?: true
  }

  export type ProcessedEventMaxAggregateInputType = {
    eventId?: true
    eventType?: true
    processedAt?: true
  }

  export type ProcessedEventCountAggregateInputType = {
    eventId?: true
    eventType?: true
    processedAt?: true
    _all?: true
  }

  export type ProcessedEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProcessedEvent to aggregate.
     */
    where?: ProcessedEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProcessedEvents to fetch.
     */
    orderBy?: ProcessedEventOrderByWithRelationInput | ProcessedEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProcessedEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProcessedEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProcessedEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProcessedEvents
    **/
    _count?: true | ProcessedEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProcessedEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProcessedEventMaxAggregateInputType
  }

  export type GetProcessedEventAggregateType<T extends ProcessedEventAggregateArgs> = {
        [P in keyof T & keyof AggregateProcessedEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProcessedEvent[P]>
      : GetScalarType<T[P], AggregateProcessedEvent[P]>
  }




  export type ProcessedEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProcessedEventWhereInput
    orderBy?: ProcessedEventOrderByWithAggregationInput | ProcessedEventOrderByWithAggregationInput[]
    by: ProcessedEventScalarFieldEnum[] | ProcessedEventScalarFieldEnum
    having?: ProcessedEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProcessedEventCountAggregateInputType | true
    _min?: ProcessedEventMinAggregateInputType
    _max?: ProcessedEventMaxAggregateInputType
  }

  export type ProcessedEventGroupByOutputType = {
    eventId: string
    eventType: string
    processedAt: Date
    _count: ProcessedEventCountAggregateOutputType | null
    _min: ProcessedEventMinAggregateOutputType | null
    _max: ProcessedEventMaxAggregateOutputType | null
  }

  type GetProcessedEventGroupByPayload<T extends ProcessedEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProcessedEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProcessedEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProcessedEventGroupByOutputType[P]>
            : GetScalarType<T[P], ProcessedEventGroupByOutputType[P]>
        }
      >
    >


  export type ProcessedEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    eventId?: boolean
    eventType?: boolean
    processedAt?: boolean
  }, ExtArgs["result"]["processedEvent"]>

  export type ProcessedEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    eventId?: boolean
    eventType?: boolean
    processedAt?: boolean
  }, ExtArgs["result"]["processedEvent"]>

  export type ProcessedEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    eventId?: boolean
    eventType?: boolean
    processedAt?: boolean
  }, ExtArgs["result"]["processedEvent"]>

  export type ProcessedEventSelectScalar = {
    eventId?: boolean
    eventType?: boolean
    processedAt?: boolean
  }

  export type ProcessedEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"eventId" | "eventType" | "processedAt", ExtArgs["result"]["processedEvent"]>

  export type $ProcessedEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProcessedEvent"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      eventId: string
      eventType: string
      processedAt: Date
    }, ExtArgs["result"]["processedEvent"]>
    composites: {}
  }

  type ProcessedEventGetPayload<S extends boolean | null | undefined | ProcessedEventDefaultArgs> = $Result.GetResult<Prisma.$ProcessedEventPayload, S>

  type ProcessedEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProcessedEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProcessedEventCountAggregateInputType | true
    }

  export interface ProcessedEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProcessedEvent'], meta: { name: 'ProcessedEvent' } }
    /**
     * Find zero or one ProcessedEvent that matches the filter.
     * @param {ProcessedEventFindUniqueArgs} args - Arguments to find a ProcessedEvent
     * @example
     * // Get one ProcessedEvent
     * const processedEvent = await prisma.processedEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProcessedEventFindUniqueArgs>(args: SelectSubset<T, ProcessedEventFindUniqueArgs<ExtArgs>>): Prisma__ProcessedEventClient<$Result.GetResult<Prisma.$ProcessedEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProcessedEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProcessedEventFindUniqueOrThrowArgs} args - Arguments to find a ProcessedEvent
     * @example
     * // Get one ProcessedEvent
     * const processedEvent = await prisma.processedEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProcessedEventFindUniqueOrThrowArgs>(args: SelectSubset<T, ProcessedEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProcessedEventClient<$Result.GetResult<Prisma.$ProcessedEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProcessedEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedEventFindFirstArgs} args - Arguments to find a ProcessedEvent
     * @example
     * // Get one ProcessedEvent
     * const processedEvent = await prisma.processedEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProcessedEventFindFirstArgs>(args?: SelectSubset<T, ProcessedEventFindFirstArgs<ExtArgs>>): Prisma__ProcessedEventClient<$Result.GetResult<Prisma.$ProcessedEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProcessedEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedEventFindFirstOrThrowArgs} args - Arguments to find a ProcessedEvent
     * @example
     * // Get one ProcessedEvent
     * const processedEvent = await prisma.processedEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProcessedEventFindFirstOrThrowArgs>(args?: SelectSubset<T, ProcessedEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProcessedEventClient<$Result.GetResult<Prisma.$ProcessedEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProcessedEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProcessedEvents
     * const processedEvents = await prisma.processedEvent.findMany()
     * 
     * // Get first 10 ProcessedEvents
     * const processedEvents = await prisma.processedEvent.findMany({ take: 10 })
     * 
     * // Only select the `eventId`
     * const processedEventWithEventIdOnly = await prisma.processedEvent.findMany({ select: { eventId: true } })
     * 
     */
    findMany<T extends ProcessedEventFindManyArgs>(args?: SelectSubset<T, ProcessedEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProcessedEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProcessedEvent.
     * @param {ProcessedEventCreateArgs} args - Arguments to create a ProcessedEvent.
     * @example
     * // Create one ProcessedEvent
     * const ProcessedEvent = await prisma.processedEvent.create({
     *   data: {
     *     // ... data to create a ProcessedEvent
     *   }
     * })
     * 
     */
    create<T extends ProcessedEventCreateArgs>(args: SelectSubset<T, ProcessedEventCreateArgs<ExtArgs>>): Prisma__ProcessedEventClient<$Result.GetResult<Prisma.$ProcessedEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProcessedEvents.
     * @param {ProcessedEventCreateManyArgs} args - Arguments to create many ProcessedEvents.
     * @example
     * // Create many ProcessedEvents
     * const processedEvent = await prisma.processedEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProcessedEventCreateManyArgs>(args?: SelectSubset<T, ProcessedEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProcessedEvents and returns the data saved in the database.
     * @param {ProcessedEventCreateManyAndReturnArgs} args - Arguments to create many ProcessedEvents.
     * @example
     * // Create many ProcessedEvents
     * const processedEvent = await prisma.processedEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProcessedEvents and only return the `eventId`
     * const processedEventWithEventIdOnly = await prisma.processedEvent.createManyAndReturn({
     *   select: { eventId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProcessedEventCreateManyAndReturnArgs>(args?: SelectSubset<T, ProcessedEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProcessedEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProcessedEvent.
     * @param {ProcessedEventDeleteArgs} args - Arguments to delete one ProcessedEvent.
     * @example
     * // Delete one ProcessedEvent
     * const ProcessedEvent = await prisma.processedEvent.delete({
     *   where: {
     *     // ... filter to delete one ProcessedEvent
     *   }
     * })
     * 
     */
    delete<T extends ProcessedEventDeleteArgs>(args: SelectSubset<T, ProcessedEventDeleteArgs<ExtArgs>>): Prisma__ProcessedEventClient<$Result.GetResult<Prisma.$ProcessedEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProcessedEvent.
     * @param {ProcessedEventUpdateArgs} args - Arguments to update one ProcessedEvent.
     * @example
     * // Update one ProcessedEvent
     * const processedEvent = await prisma.processedEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProcessedEventUpdateArgs>(args: SelectSubset<T, ProcessedEventUpdateArgs<ExtArgs>>): Prisma__ProcessedEventClient<$Result.GetResult<Prisma.$ProcessedEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProcessedEvents.
     * @param {ProcessedEventDeleteManyArgs} args - Arguments to filter ProcessedEvents to delete.
     * @example
     * // Delete a few ProcessedEvents
     * const { count } = await prisma.processedEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProcessedEventDeleteManyArgs>(args?: SelectSubset<T, ProcessedEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProcessedEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProcessedEvents
     * const processedEvent = await prisma.processedEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProcessedEventUpdateManyArgs>(args: SelectSubset<T, ProcessedEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProcessedEvents and returns the data updated in the database.
     * @param {ProcessedEventUpdateManyAndReturnArgs} args - Arguments to update many ProcessedEvents.
     * @example
     * // Update many ProcessedEvents
     * const processedEvent = await prisma.processedEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProcessedEvents and only return the `eventId`
     * const processedEventWithEventIdOnly = await prisma.processedEvent.updateManyAndReturn({
     *   select: { eventId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProcessedEventUpdateManyAndReturnArgs>(args: SelectSubset<T, ProcessedEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProcessedEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProcessedEvent.
     * @param {ProcessedEventUpsertArgs} args - Arguments to update or create a ProcessedEvent.
     * @example
     * // Update or create a ProcessedEvent
     * const processedEvent = await prisma.processedEvent.upsert({
     *   create: {
     *     // ... data to create a ProcessedEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProcessedEvent we want to update
     *   }
     * })
     */
    upsert<T extends ProcessedEventUpsertArgs>(args: SelectSubset<T, ProcessedEventUpsertArgs<ExtArgs>>): Prisma__ProcessedEventClient<$Result.GetResult<Prisma.$ProcessedEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProcessedEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedEventCountArgs} args - Arguments to filter ProcessedEvents to count.
     * @example
     * // Count the number of ProcessedEvents
     * const count = await prisma.processedEvent.count({
     *   where: {
     *     // ... the filter for the ProcessedEvents we want to count
     *   }
     * })
    **/
    count<T extends ProcessedEventCountArgs>(
      args?: Subset<T, ProcessedEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProcessedEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProcessedEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProcessedEventAggregateArgs>(args: Subset<T, ProcessedEventAggregateArgs>): Prisma.PrismaPromise<GetProcessedEventAggregateType<T>>

    /**
     * Group by ProcessedEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProcessedEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProcessedEventGroupByArgs['orderBy'] }
        : { orderBy?: ProcessedEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProcessedEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProcessedEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProcessedEvent model
   */
  readonly fields: ProcessedEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProcessedEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProcessedEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProcessedEvent model
   */
  interface ProcessedEventFieldRefs {
    readonly eventId: FieldRef<"ProcessedEvent", 'String'>
    readonly eventType: FieldRef<"ProcessedEvent", 'String'>
    readonly processedAt: FieldRef<"ProcessedEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProcessedEvent findUnique
   */
  export type ProcessedEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedEvent
     */
    select?: ProcessedEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedEvent
     */
    omit?: ProcessedEventOmit<ExtArgs> | null
    /**
     * Filter, which ProcessedEvent to fetch.
     */
    where: ProcessedEventWhereUniqueInput
  }

  /**
   * ProcessedEvent findUniqueOrThrow
   */
  export type ProcessedEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedEvent
     */
    select?: ProcessedEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedEvent
     */
    omit?: ProcessedEventOmit<ExtArgs> | null
    /**
     * Filter, which ProcessedEvent to fetch.
     */
    where: ProcessedEventWhereUniqueInput
  }

  /**
   * ProcessedEvent findFirst
   */
  export type ProcessedEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedEvent
     */
    select?: ProcessedEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedEvent
     */
    omit?: ProcessedEventOmit<ExtArgs> | null
    /**
     * Filter, which ProcessedEvent to fetch.
     */
    where?: ProcessedEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProcessedEvents to fetch.
     */
    orderBy?: ProcessedEventOrderByWithRelationInput | ProcessedEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProcessedEvents.
     */
    cursor?: ProcessedEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProcessedEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProcessedEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProcessedEvents.
     */
    distinct?: ProcessedEventScalarFieldEnum | ProcessedEventScalarFieldEnum[]
  }

  /**
   * ProcessedEvent findFirstOrThrow
   */
  export type ProcessedEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedEvent
     */
    select?: ProcessedEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedEvent
     */
    omit?: ProcessedEventOmit<ExtArgs> | null
    /**
     * Filter, which ProcessedEvent to fetch.
     */
    where?: ProcessedEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProcessedEvents to fetch.
     */
    orderBy?: ProcessedEventOrderByWithRelationInput | ProcessedEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProcessedEvents.
     */
    cursor?: ProcessedEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProcessedEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProcessedEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProcessedEvents.
     */
    distinct?: ProcessedEventScalarFieldEnum | ProcessedEventScalarFieldEnum[]
  }

  /**
   * ProcessedEvent findMany
   */
  export type ProcessedEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedEvent
     */
    select?: ProcessedEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedEvent
     */
    omit?: ProcessedEventOmit<ExtArgs> | null
    /**
     * Filter, which ProcessedEvents to fetch.
     */
    where?: ProcessedEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProcessedEvents to fetch.
     */
    orderBy?: ProcessedEventOrderByWithRelationInput | ProcessedEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProcessedEvents.
     */
    cursor?: ProcessedEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProcessedEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProcessedEvents.
     */
    skip?: number
    distinct?: ProcessedEventScalarFieldEnum | ProcessedEventScalarFieldEnum[]
  }

  /**
   * ProcessedEvent create
   */
  export type ProcessedEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedEvent
     */
    select?: ProcessedEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedEvent
     */
    omit?: ProcessedEventOmit<ExtArgs> | null
    /**
     * The data needed to create a ProcessedEvent.
     */
    data: XOR<ProcessedEventCreateInput, ProcessedEventUncheckedCreateInput>
  }

  /**
   * ProcessedEvent createMany
   */
  export type ProcessedEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProcessedEvents.
     */
    data: ProcessedEventCreateManyInput | ProcessedEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProcessedEvent createManyAndReturn
   */
  export type ProcessedEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedEvent
     */
    select?: ProcessedEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedEvent
     */
    omit?: ProcessedEventOmit<ExtArgs> | null
    /**
     * The data used to create many ProcessedEvents.
     */
    data: ProcessedEventCreateManyInput | ProcessedEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProcessedEvent update
   */
  export type ProcessedEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedEvent
     */
    select?: ProcessedEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedEvent
     */
    omit?: ProcessedEventOmit<ExtArgs> | null
    /**
     * The data needed to update a ProcessedEvent.
     */
    data: XOR<ProcessedEventUpdateInput, ProcessedEventUncheckedUpdateInput>
    /**
     * Choose, which ProcessedEvent to update.
     */
    where: ProcessedEventWhereUniqueInput
  }

  /**
   * ProcessedEvent updateMany
   */
  export type ProcessedEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProcessedEvents.
     */
    data: XOR<ProcessedEventUpdateManyMutationInput, ProcessedEventUncheckedUpdateManyInput>
    /**
     * Filter which ProcessedEvents to update
     */
    where?: ProcessedEventWhereInput
    /**
     * Limit how many ProcessedEvents to update.
     */
    limit?: number
  }

  /**
   * ProcessedEvent updateManyAndReturn
   */
  export type ProcessedEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedEvent
     */
    select?: ProcessedEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedEvent
     */
    omit?: ProcessedEventOmit<ExtArgs> | null
    /**
     * The data used to update ProcessedEvents.
     */
    data: XOR<ProcessedEventUpdateManyMutationInput, ProcessedEventUncheckedUpdateManyInput>
    /**
     * Filter which ProcessedEvents to update
     */
    where?: ProcessedEventWhereInput
    /**
     * Limit how many ProcessedEvents to update.
     */
    limit?: number
  }

  /**
   * ProcessedEvent upsert
   */
  export type ProcessedEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedEvent
     */
    select?: ProcessedEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedEvent
     */
    omit?: ProcessedEventOmit<ExtArgs> | null
    /**
     * The filter to search for the ProcessedEvent to update in case it exists.
     */
    where: ProcessedEventWhereUniqueInput
    /**
     * In case the ProcessedEvent found by the `where` argument doesn't exist, create a new ProcessedEvent with this data.
     */
    create: XOR<ProcessedEventCreateInput, ProcessedEventUncheckedCreateInput>
    /**
     * In case the ProcessedEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProcessedEventUpdateInput, ProcessedEventUncheckedUpdateInput>
  }

  /**
   * ProcessedEvent delete
   */
  export type ProcessedEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedEvent
     */
    select?: ProcessedEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedEvent
     */
    omit?: ProcessedEventOmit<ExtArgs> | null
    /**
     * Filter which ProcessedEvent to delete.
     */
    where: ProcessedEventWhereUniqueInput
  }

  /**
   * ProcessedEvent deleteMany
   */
  export type ProcessedEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProcessedEvents to delete
     */
    where?: ProcessedEventWhereInput
    /**
     * Limit how many ProcessedEvents to delete.
     */
    limit?: number
  }

  /**
   * ProcessedEvent without action
   */
  export type ProcessedEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedEvent
     */
    select?: ProcessedEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedEvent
     */
    omit?: ProcessedEventOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const PlanScalarFieldEnum: {
    id: 'id',
    name: 'name',
    type: 'type',
    maxLines: 'maxLines',
    status: 'status',
    allowedPaymentMethods: 'allowedPaymentMethods',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PlanScalarFieldEnum = (typeof PlanScalarFieldEnum)[keyof typeof PlanScalarFieldEnum]


  export const PlanFeatureScalarFieldEnum: {
    id: 'id',
    planId: 'planId',
    name: 'name',
    quota: 'quota',
    unit: 'unit',
    unlimited: 'unlimited',
    createdAt: 'createdAt'
  };

  export type PlanFeatureScalarFieldEnum = (typeof PlanFeatureScalarFieldEnum)[keyof typeof PlanFeatureScalarFieldEnum]


  export const OfferScalarFieldEnum: {
    id: 'id',
    planId: 'planId',
    name: 'name',
    basePriceAmountCents: 'basePriceAmountCents',
    basePriceCurrency: 'basePriceCurrency',
    status: 'status',
    validFrom: 'validFrom',
    validUntil: 'validUntil',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type OfferScalarFieldEnum = (typeof OfferScalarFieldEnum)[keyof typeof OfferScalarFieldEnum]


  export const EligibilityRuleScalarFieldEnum: {
    id: 'id',
    offerId: 'offerId',
    ruleType: 'ruleType',
    ruleValue: 'ruleValue',
    createdAt: 'createdAt'
  };

  export type EligibilityRuleScalarFieldEnum = (typeof EligibilityRuleScalarFieldEnum)[keyof typeof EligibilityRuleScalarFieldEnum]


  export const PriceLocalityScalarFieldEnum: {
    id: 'id',
    offerId: 'offerId',
    dddCode: 'dddCode',
    city: 'city',
    priceAmountCents: 'priceAmountCents',
    priceCurrency: 'priceCurrency',
    status: 'status',
    createdAt: 'createdAt'
  };

  export type PriceLocalityScalarFieldEnum = (typeof PriceLocalityScalarFieldEnum)[keyof typeof PriceLocalityScalarFieldEnum]


  export const OutboxEventScalarFieldEnum: {
    id: 'id',
    aggregateId: 'aggregateId',
    aggregateType: 'aggregateType',
    eventType: 'eventType',
    payload: 'payload',
    correlationId: 'correlationId',
    causationId: 'causationId',
    createdAt: 'createdAt',
    publishedAt: 'publishedAt',
    status: 'status',
    retryCount: 'retryCount'
  };

  export type OutboxEventScalarFieldEnum = (typeof OutboxEventScalarFieldEnum)[keyof typeof OutboxEventScalarFieldEnum]


  export const ProcessedEventScalarFieldEnum: {
    eventId: 'eventId',
    eventType: 'eventType',
    processedAt: 'processedAt'
  };

  export type ProcessedEventScalarFieldEnum = (typeof ProcessedEventScalarFieldEnum)[keyof typeof ProcessedEventScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'PlanType'
   */
  export type EnumPlanTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PlanType'>
    


  /**
   * Reference to a field of type 'PlanType[]'
   */
  export type ListEnumPlanTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PlanType[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'PlanStatus'
   */
  export type EnumPlanStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PlanStatus'>
    


  /**
   * Reference to a field of type 'PlanStatus[]'
   */
  export type ListEnumPlanStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PlanStatus[]'>
    


  /**
   * Reference to a field of type 'PaymentMethodType[]'
   */
  export type ListEnumPaymentMethodTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentMethodType[]'>
    


  /**
   * Reference to a field of type 'PaymentMethodType'
   */
  export type EnumPaymentMethodTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentMethodType'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'FeatureUnit'
   */
  export type EnumFeatureUnitFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FeatureUnit'>
    


  /**
   * Reference to a field of type 'FeatureUnit[]'
   */
  export type ListEnumFeatureUnitFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FeatureUnit[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'OfferStatus'
   */
  export type EnumOfferStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OfferStatus'>
    


  /**
   * Reference to a field of type 'OfferStatus[]'
   */
  export type ListEnumOfferStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OfferStatus[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'PriceLocalityStatus'
   */
  export type EnumPriceLocalityStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PriceLocalityStatus'>
    


  /**
   * Reference to a field of type 'PriceLocalityStatus[]'
   */
  export type ListEnumPriceLocalityStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PriceLocalityStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type PlanWhereInput = {
    AND?: PlanWhereInput | PlanWhereInput[]
    OR?: PlanWhereInput[]
    NOT?: PlanWhereInput | PlanWhereInput[]
    id?: UuidFilter<"Plan"> | string
    name?: StringFilter<"Plan"> | string
    type?: EnumPlanTypeFilter<"Plan"> | $Enums.PlanType
    maxLines?: IntFilter<"Plan"> | number
    status?: EnumPlanStatusFilter<"Plan"> | $Enums.PlanStatus
    allowedPaymentMethods?: EnumPaymentMethodTypeNullableListFilter<"Plan">
    createdAt?: DateTimeFilter<"Plan"> | Date | string
    updatedAt?: DateTimeFilter<"Plan"> | Date | string
    features?: PlanFeatureListRelationFilter
    offers?: OfferListRelationFilter
  }

  export type PlanOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    maxLines?: SortOrder
    status?: SortOrder
    allowedPaymentMethods?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    features?: PlanFeatureOrderByRelationAggregateInput
    offers?: OfferOrderByRelationAggregateInput
  }

  export type PlanWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: PlanWhereInput | PlanWhereInput[]
    OR?: PlanWhereInput[]
    NOT?: PlanWhereInput | PlanWhereInput[]
    type?: EnumPlanTypeFilter<"Plan"> | $Enums.PlanType
    maxLines?: IntFilter<"Plan"> | number
    status?: EnumPlanStatusFilter<"Plan"> | $Enums.PlanStatus
    allowedPaymentMethods?: EnumPaymentMethodTypeNullableListFilter<"Plan">
    createdAt?: DateTimeFilter<"Plan"> | Date | string
    updatedAt?: DateTimeFilter<"Plan"> | Date | string
    features?: PlanFeatureListRelationFilter
    offers?: OfferListRelationFilter
  }, "id" | "name">

  export type PlanOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    maxLines?: SortOrder
    status?: SortOrder
    allowedPaymentMethods?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PlanCountOrderByAggregateInput
    _avg?: PlanAvgOrderByAggregateInput
    _max?: PlanMaxOrderByAggregateInput
    _min?: PlanMinOrderByAggregateInput
    _sum?: PlanSumOrderByAggregateInput
  }

  export type PlanScalarWhereWithAggregatesInput = {
    AND?: PlanScalarWhereWithAggregatesInput | PlanScalarWhereWithAggregatesInput[]
    OR?: PlanScalarWhereWithAggregatesInput[]
    NOT?: PlanScalarWhereWithAggregatesInput | PlanScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Plan"> | string
    name?: StringWithAggregatesFilter<"Plan"> | string
    type?: EnumPlanTypeWithAggregatesFilter<"Plan"> | $Enums.PlanType
    maxLines?: IntWithAggregatesFilter<"Plan"> | number
    status?: EnumPlanStatusWithAggregatesFilter<"Plan"> | $Enums.PlanStatus
    allowedPaymentMethods?: EnumPaymentMethodTypeNullableListFilter<"Plan">
    createdAt?: DateTimeWithAggregatesFilter<"Plan"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Plan"> | Date | string
  }

  export type PlanFeatureWhereInput = {
    AND?: PlanFeatureWhereInput | PlanFeatureWhereInput[]
    OR?: PlanFeatureWhereInput[]
    NOT?: PlanFeatureWhereInput | PlanFeatureWhereInput[]
    id?: UuidFilter<"PlanFeature"> | string
    planId?: UuidFilter<"PlanFeature"> | string
    name?: StringFilter<"PlanFeature"> | string
    quota?: IntFilter<"PlanFeature"> | number
    unit?: EnumFeatureUnitFilter<"PlanFeature"> | $Enums.FeatureUnit
    unlimited?: BoolFilter<"PlanFeature"> | boolean
    createdAt?: DateTimeFilter<"PlanFeature"> | Date | string
    plan?: XOR<PlanScalarRelationFilter, PlanWhereInput>
  }

  export type PlanFeatureOrderByWithRelationInput = {
    id?: SortOrder
    planId?: SortOrder
    name?: SortOrder
    quota?: SortOrder
    unit?: SortOrder
    unlimited?: SortOrder
    createdAt?: SortOrder
    plan?: PlanOrderByWithRelationInput
  }

  export type PlanFeatureWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PlanFeatureWhereInput | PlanFeatureWhereInput[]
    OR?: PlanFeatureWhereInput[]
    NOT?: PlanFeatureWhereInput | PlanFeatureWhereInput[]
    planId?: UuidFilter<"PlanFeature"> | string
    name?: StringFilter<"PlanFeature"> | string
    quota?: IntFilter<"PlanFeature"> | number
    unit?: EnumFeatureUnitFilter<"PlanFeature"> | $Enums.FeatureUnit
    unlimited?: BoolFilter<"PlanFeature"> | boolean
    createdAt?: DateTimeFilter<"PlanFeature"> | Date | string
    plan?: XOR<PlanScalarRelationFilter, PlanWhereInput>
  }, "id">

  export type PlanFeatureOrderByWithAggregationInput = {
    id?: SortOrder
    planId?: SortOrder
    name?: SortOrder
    quota?: SortOrder
    unit?: SortOrder
    unlimited?: SortOrder
    createdAt?: SortOrder
    _count?: PlanFeatureCountOrderByAggregateInput
    _avg?: PlanFeatureAvgOrderByAggregateInput
    _max?: PlanFeatureMaxOrderByAggregateInput
    _min?: PlanFeatureMinOrderByAggregateInput
    _sum?: PlanFeatureSumOrderByAggregateInput
  }

  export type PlanFeatureScalarWhereWithAggregatesInput = {
    AND?: PlanFeatureScalarWhereWithAggregatesInput | PlanFeatureScalarWhereWithAggregatesInput[]
    OR?: PlanFeatureScalarWhereWithAggregatesInput[]
    NOT?: PlanFeatureScalarWhereWithAggregatesInput | PlanFeatureScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"PlanFeature"> | string
    planId?: UuidWithAggregatesFilter<"PlanFeature"> | string
    name?: StringWithAggregatesFilter<"PlanFeature"> | string
    quota?: IntWithAggregatesFilter<"PlanFeature"> | number
    unit?: EnumFeatureUnitWithAggregatesFilter<"PlanFeature"> | $Enums.FeatureUnit
    unlimited?: BoolWithAggregatesFilter<"PlanFeature"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"PlanFeature"> | Date | string
  }

  export type OfferWhereInput = {
    AND?: OfferWhereInput | OfferWhereInput[]
    OR?: OfferWhereInput[]
    NOT?: OfferWhereInput | OfferWhereInput[]
    id?: UuidFilter<"Offer"> | string
    planId?: UuidFilter<"Offer"> | string
    name?: StringFilter<"Offer"> | string
    basePriceAmountCents?: IntFilter<"Offer"> | number
    basePriceCurrency?: StringFilter<"Offer"> | string
    status?: EnumOfferStatusFilter<"Offer"> | $Enums.OfferStatus
    validFrom?: DateTimeFilter<"Offer"> | Date | string
    validUntil?: DateTimeNullableFilter<"Offer"> | Date | string | null
    createdAt?: DateTimeFilter<"Offer"> | Date | string
    updatedAt?: DateTimeFilter<"Offer"> | Date | string
    plan?: XOR<PlanScalarRelationFilter, PlanWhereInput>
    eligibilityRules?: EligibilityRuleListRelationFilter
    localityPrices?: PriceLocalityListRelationFilter
  }

  export type OfferOrderByWithRelationInput = {
    id?: SortOrder
    planId?: SortOrder
    name?: SortOrder
    basePriceAmountCents?: SortOrder
    basePriceCurrency?: SortOrder
    status?: SortOrder
    validFrom?: SortOrder
    validUntil?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    plan?: PlanOrderByWithRelationInput
    eligibilityRules?: EligibilityRuleOrderByRelationAggregateInput
    localityPrices?: PriceLocalityOrderByRelationAggregateInput
  }

  export type OfferWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OfferWhereInput | OfferWhereInput[]
    OR?: OfferWhereInput[]
    NOT?: OfferWhereInput | OfferWhereInput[]
    planId?: UuidFilter<"Offer"> | string
    name?: StringFilter<"Offer"> | string
    basePriceAmountCents?: IntFilter<"Offer"> | number
    basePriceCurrency?: StringFilter<"Offer"> | string
    status?: EnumOfferStatusFilter<"Offer"> | $Enums.OfferStatus
    validFrom?: DateTimeFilter<"Offer"> | Date | string
    validUntil?: DateTimeNullableFilter<"Offer"> | Date | string | null
    createdAt?: DateTimeFilter<"Offer"> | Date | string
    updatedAt?: DateTimeFilter<"Offer"> | Date | string
    plan?: XOR<PlanScalarRelationFilter, PlanWhereInput>
    eligibilityRules?: EligibilityRuleListRelationFilter
    localityPrices?: PriceLocalityListRelationFilter
  }, "id">

  export type OfferOrderByWithAggregationInput = {
    id?: SortOrder
    planId?: SortOrder
    name?: SortOrder
    basePriceAmountCents?: SortOrder
    basePriceCurrency?: SortOrder
    status?: SortOrder
    validFrom?: SortOrder
    validUntil?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: OfferCountOrderByAggregateInput
    _avg?: OfferAvgOrderByAggregateInput
    _max?: OfferMaxOrderByAggregateInput
    _min?: OfferMinOrderByAggregateInput
    _sum?: OfferSumOrderByAggregateInput
  }

  export type OfferScalarWhereWithAggregatesInput = {
    AND?: OfferScalarWhereWithAggregatesInput | OfferScalarWhereWithAggregatesInput[]
    OR?: OfferScalarWhereWithAggregatesInput[]
    NOT?: OfferScalarWhereWithAggregatesInput | OfferScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Offer"> | string
    planId?: UuidWithAggregatesFilter<"Offer"> | string
    name?: StringWithAggregatesFilter<"Offer"> | string
    basePriceAmountCents?: IntWithAggregatesFilter<"Offer"> | number
    basePriceCurrency?: StringWithAggregatesFilter<"Offer"> | string
    status?: EnumOfferStatusWithAggregatesFilter<"Offer"> | $Enums.OfferStatus
    validFrom?: DateTimeWithAggregatesFilter<"Offer"> | Date | string
    validUntil?: DateTimeNullableWithAggregatesFilter<"Offer"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Offer"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Offer"> | Date | string
  }

  export type EligibilityRuleWhereInput = {
    AND?: EligibilityRuleWhereInput | EligibilityRuleWhereInput[]
    OR?: EligibilityRuleWhereInput[]
    NOT?: EligibilityRuleWhereInput | EligibilityRuleWhereInput[]
    id?: UuidFilter<"EligibilityRule"> | string
    offerId?: UuidFilter<"EligibilityRule"> | string
    ruleType?: StringFilter<"EligibilityRule"> | string
    ruleValue?: JsonFilter<"EligibilityRule">
    createdAt?: DateTimeFilter<"EligibilityRule"> | Date | string
    offer?: XOR<OfferScalarRelationFilter, OfferWhereInput>
  }

  export type EligibilityRuleOrderByWithRelationInput = {
    id?: SortOrder
    offerId?: SortOrder
    ruleType?: SortOrder
    ruleValue?: SortOrder
    createdAt?: SortOrder
    offer?: OfferOrderByWithRelationInput
  }

  export type EligibilityRuleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EligibilityRuleWhereInput | EligibilityRuleWhereInput[]
    OR?: EligibilityRuleWhereInput[]
    NOT?: EligibilityRuleWhereInput | EligibilityRuleWhereInput[]
    offerId?: UuidFilter<"EligibilityRule"> | string
    ruleType?: StringFilter<"EligibilityRule"> | string
    ruleValue?: JsonFilter<"EligibilityRule">
    createdAt?: DateTimeFilter<"EligibilityRule"> | Date | string
    offer?: XOR<OfferScalarRelationFilter, OfferWhereInput>
  }, "id">

  export type EligibilityRuleOrderByWithAggregationInput = {
    id?: SortOrder
    offerId?: SortOrder
    ruleType?: SortOrder
    ruleValue?: SortOrder
    createdAt?: SortOrder
    _count?: EligibilityRuleCountOrderByAggregateInput
    _max?: EligibilityRuleMaxOrderByAggregateInput
    _min?: EligibilityRuleMinOrderByAggregateInput
  }

  export type EligibilityRuleScalarWhereWithAggregatesInput = {
    AND?: EligibilityRuleScalarWhereWithAggregatesInput | EligibilityRuleScalarWhereWithAggregatesInput[]
    OR?: EligibilityRuleScalarWhereWithAggregatesInput[]
    NOT?: EligibilityRuleScalarWhereWithAggregatesInput | EligibilityRuleScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"EligibilityRule"> | string
    offerId?: UuidWithAggregatesFilter<"EligibilityRule"> | string
    ruleType?: StringWithAggregatesFilter<"EligibilityRule"> | string
    ruleValue?: JsonWithAggregatesFilter<"EligibilityRule">
    createdAt?: DateTimeWithAggregatesFilter<"EligibilityRule"> | Date | string
  }

  export type PriceLocalityWhereInput = {
    AND?: PriceLocalityWhereInput | PriceLocalityWhereInput[]
    OR?: PriceLocalityWhereInput[]
    NOT?: PriceLocalityWhereInput | PriceLocalityWhereInput[]
    id?: UuidFilter<"PriceLocality"> | string
    offerId?: UuidFilter<"PriceLocality"> | string
    dddCode?: StringFilter<"PriceLocality"> | string
    city?: StringNullableFilter<"PriceLocality"> | string | null
    priceAmountCents?: IntFilter<"PriceLocality"> | number
    priceCurrency?: StringFilter<"PriceLocality"> | string
    status?: EnumPriceLocalityStatusFilter<"PriceLocality"> | $Enums.PriceLocalityStatus
    createdAt?: DateTimeFilter<"PriceLocality"> | Date | string
    offer?: XOR<OfferScalarRelationFilter, OfferWhereInput>
  }

  export type PriceLocalityOrderByWithRelationInput = {
    id?: SortOrder
    offerId?: SortOrder
    dddCode?: SortOrder
    city?: SortOrderInput | SortOrder
    priceAmountCents?: SortOrder
    priceCurrency?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    offer?: OfferOrderByWithRelationInput
  }

  export type PriceLocalityWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    offerId_dddCode_city?: PriceLocalityOfferIdDddCodeCityCompoundUniqueInput
    AND?: PriceLocalityWhereInput | PriceLocalityWhereInput[]
    OR?: PriceLocalityWhereInput[]
    NOT?: PriceLocalityWhereInput | PriceLocalityWhereInput[]
    offerId?: UuidFilter<"PriceLocality"> | string
    dddCode?: StringFilter<"PriceLocality"> | string
    city?: StringNullableFilter<"PriceLocality"> | string | null
    priceAmountCents?: IntFilter<"PriceLocality"> | number
    priceCurrency?: StringFilter<"PriceLocality"> | string
    status?: EnumPriceLocalityStatusFilter<"PriceLocality"> | $Enums.PriceLocalityStatus
    createdAt?: DateTimeFilter<"PriceLocality"> | Date | string
    offer?: XOR<OfferScalarRelationFilter, OfferWhereInput>
  }, "id" | "offerId_dddCode_city">

  export type PriceLocalityOrderByWithAggregationInput = {
    id?: SortOrder
    offerId?: SortOrder
    dddCode?: SortOrder
    city?: SortOrderInput | SortOrder
    priceAmountCents?: SortOrder
    priceCurrency?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    _count?: PriceLocalityCountOrderByAggregateInput
    _avg?: PriceLocalityAvgOrderByAggregateInput
    _max?: PriceLocalityMaxOrderByAggregateInput
    _min?: PriceLocalityMinOrderByAggregateInput
    _sum?: PriceLocalitySumOrderByAggregateInput
  }

  export type PriceLocalityScalarWhereWithAggregatesInput = {
    AND?: PriceLocalityScalarWhereWithAggregatesInput | PriceLocalityScalarWhereWithAggregatesInput[]
    OR?: PriceLocalityScalarWhereWithAggregatesInput[]
    NOT?: PriceLocalityScalarWhereWithAggregatesInput | PriceLocalityScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"PriceLocality"> | string
    offerId?: UuidWithAggregatesFilter<"PriceLocality"> | string
    dddCode?: StringWithAggregatesFilter<"PriceLocality"> | string
    city?: StringNullableWithAggregatesFilter<"PriceLocality"> | string | null
    priceAmountCents?: IntWithAggregatesFilter<"PriceLocality"> | number
    priceCurrency?: StringWithAggregatesFilter<"PriceLocality"> | string
    status?: EnumPriceLocalityStatusWithAggregatesFilter<"PriceLocality"> | $Enums.PriceLocalityStatus
    createdAt?: DateTimeWithAggregatesFilter<"PriceLocality"> | Date | string
  }

  export type OutboxEventWhereInput = {
    AND?: OutboxEventWhereInput | OutboxEventWhereInput[]
    OR?: OutboxEventWhereInput[]
    NOT?: OutboxEventWhereInput | OutboxEventWhereInput[]
    id?: UuidFilter<"OutboxEvent"> | string
    aggregateId?: StringFilter<"OutboxEvent"> | string
    aggregateType?: StringFilter<"OutboxEvent"> | string
    eventType?: StringFilter<"OutboxEvent"> | string
    payload?: JsonFilter<"OutboxEvent">
    correlationId?: StringNullableFilter<"OutboxEvent"> | string | null
    causationId?: StringNullableFilter<"OutboxEvent"> | string | null
    createdAt?: DateTimeFilter<"OutboxEvent"> | Date | string
    publishedAt?: DateTimeNullableFilter<"OutboxEvent"> | Date | string | null
    status?: StringFilter<"OutboxEvent"> | string
    retryCount?: IntFilter<"OutboxEvent"> | number
  }

  export type OutboxEventOrderByWithRelationInput = {
    id?: SortOrder
    aggregateId?: SortOrder
    aggregateType?: SortOrder
    eventType?: SortOrder
    payload?: SortOrder
    correlationId?: SortOrderInput | SortOrder
    causationId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    publishedAt?: SortOrderInput | SortOrder
    status?: SortOrder
    retryCount?: SortOrder
  }

  export type OutboxEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OutboxEventWhereInput | OutboxEventWhereInput[]
    OR?: OutboxEventWhereInput[]
    NOT?: OutboxEventWhereInput | OutboxEventWhereInput[]
    aggregateId?: StringFilter<"OutboxEvent"> | string
    aggregateType?: StringFilter<"OutboxEvent"> | string
    eventType?: StringFilter<"OutboxEvent"> | string
    payload?: JsonFilter<"OutboxEvent">
    correlationId?: StringNullableFilter<"OutboxEvent"> | string | null
    causationId?: StringNullableFilter<"OutboxEvent"> | string | null
    createdAt?: DateTimeFilter<"OutboxEvent"> | Date | string
    publishedAt?: DateTimeNullableFilter<"OutboxEvent"> | Date | string | null
    status?: StringFilter<"OutboxEvent"> | string
    retryCount?: IntFilter<"OutboxEvent"> | number
  }, "id">

  export type OutboxEventOrderByWithAggregationInput = {
    id?: SortOrder
    aggregateId?: SortOrder
    aggregateType?: SortOrder
    eventType?: SortOrder
    payload?: SortOrder
    correlationId?: SortOrderInput | SortOrder
    causationId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    publishedAt?: SortOrderInput | SortOrder
    status?: SortOrder
    retryCount?: SortOrder
    _count?: OutboxEventCountOrderByAggregateInput
    _avg?: OutboxEventAvgOrderByAggregateInput
    _max?: OutboxEventMaxOrderByAggregateInput
    _min?: OutboxEventMinOrderByAggregateInput
    _sum?: OutboxEventSumOrderByAggregateInput
  }

  export type OutboxEventScalarWhereWithAggregatesInput = {
    AND?: OutboxEventScalarWhereWithAggregatesInput | OutboxEventScalarWhereWithAggregatesInput[]
    OR?: OutboxEventScalarWhereWithAggregatesInput[]
    NOT?: OutboxEventScalarWhereWithAggregatesInput | OutboxEventScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"OutboxEvent"> | string
    aggregateId?: StringWithAggregatesFilter<"OutboxEvent"> | string
    aggregateType?: StringWithAggregatesFilter<"OutboxEvent"> | string
    eventType?: StringWithAggregatesFilter<"OutboxEvent"> | string
    payload?: JsonWithAggregatesFilter<"OutboxEvent">
    correlationId?: StringNullableWithAggregatesFilter<"OutboxEvent"> | string | null
    causationId?: StringNullableWithAggregatesFilter<"OutboxEvent"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"OutboxEvent"> | Date | string
    publishedAt?: DateTimeNullableWithAggregatesFilter<"OutboxEvent"> | Date | string | null
    status?: StringWithAggregatesFilter<"OutboxEvent"> | string
    retryCount?: IntWithAggregatesFilter<"OutboxEvent"> | number
  }

  export type ProcessedEventWhereInput = {
    AND?: ProcessedEventWhereInput | ProcessedEventWhereInput[]
    OR?: ProcessedEventWhereInput[]
    NOT?: ProcessedEventWhereInput | ProcessedEventWhereInput[]
    eventId?: StringFilter<"ProcessedEvent"> | string
    eventType?: StringFilter<"ProcessedEvent"> | string
    processedAt?: DateTimeFilter<"ProcessedEvent"> | Date | string
  }

  export type ProcessedEventOrderByWithRelationInput = {
    eventId?: SortOrder
    eventType?: SortOrder
    processedAt?: SortOrder
  }

  export type ProcessedEventWhereUniqueInput = Prisma.AtLeast<{
    eventId?: string
    AND?: ProcessedEventWhereInput | ProcessedEventWhereInput[]
    OR?: ProcessedEventWhereInput[]
    NOT?: ProcessedEventWhereInput | ProcessedEventWhereInput[]
    eventType?: StringFilter<"ProcessedEvent"> | string
    processedAt?: DateTimeFilter<"ProcessedEvent"> | Date | string
  }, "eventId">

  export type ProcessedEventOrderByWithAggregationInput = {
    eventId?: SortOrder
    eventType?: SortOrder
    processedAt?: SortOrder
    _count?: ProcessedEventCountOrderByAggregateInput
    _max?: ProcessedEventMaxOrderByAggregateInput
    _min?: ProcessedEventMinOrderByAggregateInput
  }

  export type ProcessedEventScalarWhereWithAggregatesInput = {
    AND?: ProcessedEventScalarWhereWithAggregatesInput | ProcessedEventScalarWhereWithAggregatesInput[]
    OR?: ProcessedEventScalarWhereWithAggregatesInput[]
    NOT?: ProcessedEventScalarWhereWithAggregatesInput | ProcessedEventScalarWhereWithAggregatesInput[]
    eventId?: StringWithAggregatesFilter<"ProcessedEvent"> | string
    eventType?: StringWithAggregatesFilter<"ProcessedEvent"> | string
    processedAt?: DateTimeWithAggregatesFilter<"ProcessedEvent"> | Date | string
  }

  export type PlanCreateInput = {
    id?: string
    name: string
    type: $Enums.PlanType
    maxLines: number
    status?: $Enums.PlanStatus
    allowedPaymentMethods?: PlanCreateallowedPaymentMethodsInput | $Enums.PaymentMethodType[]
    createdAt?: Date | string
    updatedAt?: Date | string
    features?: PlanFeatureCreateNestedManyWithoutPlanInput
    offers?: OfferCreateNestedManyWithoutPlanInput
  }

  export type PlanUncheckedCreateInput = {
    id?: string
    name: string
    type: $Enums.PlanType
    maxLines: number
    status?: $Enums.PlanStatus
    allowedPaymentMethods?: PlanCreateallowedPaymentMethodsInput | $Enums.PaymentMethodType[]
    createdAt?: Date | string
    updatedAt?: Date | string
    features?: PlanFeatureUncheckedCreateNestedManyWithoutPlanInput
    offers?: OfferUncheckedCreateNestedManyWithoutPlanInput
  }

  export type PlanUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumPlanTypeFieldUpdateOperationsInput | $Enums.PlanType
    maxLines?: IntFieldUpdateOperationsInput | number
    status?: EnumPlanStatusFieldUpdateOperationsInput | $Enums.PlanStatus
    allowedPaymentMethods?: PlanUpdateallowedPaymentMethodsInput | $Enums.PaymentMethodType[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    features?: PlanFeatureUpdateManyWithoutPlanNestedInput
    offers?: OfferUpdateManyWithoutPlanNestedInput
  }

  export type PlanUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumPlanTypeFieldUpdateOperationsInput | $Enums.PlanType
    maxLines?: IntFieldUpdateOperationsInput | number
    status?: EnumPlanStatusFieldUpdateOperationsInput | $Enums.PlanStatus
    allowedPaymentMethods?: PlanUpdateallowedPaymentMethodsInput | $Enums.PaymentMethodType[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    features?: PlanFeatureUncheckedUpdateManyWithoutPlanNestedInput
    offers?: OfferUncheckedUpdateManyWithoutPlanNestedInput
  }

  export type PlanCreateManyInput = {
    id?: string
    name: string
    type: $Enums.PlanType
    maxLines: number
    status?: $Enums.PlanStatus
    allowedPaymentMethods?: PlanCreateallowedPaymentMethodsInput | $Enums.PaymentMethodType[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PlanUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumPlanTypeFieldUpdateOperationsInput | $Enums.PlanType
    maxLines?: IntFieldUpdateOperationsInput | number
    status?: EnumPlanStatusFieldUpdateOperationsInput | $Enums.PlanStatus
    allowedPaymentMethods?: PlanUpdateallowedPaymentMethodsInput | $Enums.PaymentMethodType[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlanUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumPlanTypeFieldUpdateOperationsInput | $Enums.PlanType
    maxLines?: IntFieldUpdateOperationsInput | number
    status?: EnumPlanStatusFieldUpdateOperationsInput | $Enums.PlanStatus
    allowedPaymentMethods?: PlanUpdateallowedPaymentMethodsInput | $Enums.PaymentMethodType[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlanFeatureCreateInput = {
    id?: string
    name: string
    quota: number
    unit: $Enums.FeatureUnit
    unlimited?: boolean
    createdAt?: Date | string
    plan: PlanCreateNestedOneWithoutFeaturesInput
  }

  export type PlanFeatureUncheckedCreateInput = {
    id?: string
    planId: string
    name: string
    quota: number
    unit: $Enums.FeatureUnit
    unlimited?: boolean
    createdAt?: Date | string
  }

  export type PlanFeatureUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    quota?: IntFieldUpdateOperationsInput | number
    unit?: EnumFeatureUnitFieldUpdateOperationsInput | $Enums.FeatureUnit
    unlimited?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    plan?: PlanUpdateOneRequiredWithoutFeaturesNestedInput
  }

  export type PlanFeatureUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    planId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    quota?: IntFieldUpdateOperationsInput | number
    unit?: EnumFeatureUnitFieldUpdateOperationsInput | $Enums.FeatureUnit
    unlimited?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlanFeatureCreateManyInput = {
    id?: string
    planId: string
    name: string
    quota: number
    unit: $Enums.FeatureUnit
    unlimited?: boolean
    createdAt?: Date | string
  }

  export type PlanFeatureUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    quota?: IntFieldUpdateOperationsInput | number
    unit?: EnumFeatureUnitFieldUpdateOperationsInput | $Enums.FeatureUnit
    unlimited?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlanFeatureUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    planId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    quota?: IntFieldUpdateOperationsInput | number
    unit?: EnumFeatureUnitFieldUpdateOperationsInput | $Enums.FeatureUnit
    unlimited?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OfferCreateInput = {
    id?: string
    name: string
    basePriceAmountCents: number
    basePriceCurrency?: string
    status?: $Enums.OfferStatus
    validFrom: Date | string
    validUntil?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    plan: PlanCreateNestedOneWithoutOffersInput
    eligibilityRules?: EligibilityRuleCreateNestedManyWithoutOfferInput
    localityPrices?: PriceLocalityCreateNestedManyWithoutOfferInput
  }

  export type OfferUncheckedCreateInput = {
    id?: string
    planId: string
    name: string
    basePriceAmountCents: number
    basePriceCurrency?: string
    status?: $Enums.OfferStatus
    validFrom: Date | string
    validUntil?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    eligibilityRules?: EligibilityRuleUncheckedCreateNestedManyWithoutOfferInput
    localityPrices?: PriceLocalityUncheckedCreateNestedManyWithoutOfferInput
  }

  export type OfferUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    basePriceAmountCents?: IntFieldUpdateOperationsInput | number
    basePriceCurrency?: StringFieldUpdateOperationsInput | string
    status?: EnumOfferStatusFieldUpdateOperationsInput | $Enums.OfferStatus
    validFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    validUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    plan?: PlanUpdateOneRequiredWithoutOffersNestedInput
    eligibilityRules?: EligibilityRuleUpdateManyWithoutOfferNestedInput
    localityPrices?: PriceLocalityUpdateManyWithoutOfferNestedInput
  }

  export type OfferUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    planId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    basePriceAmountCents?: IntFieldUpdateOperationsInput | number
    basePriceCurrency?: StringFieldUpdateOperationsInput | string
    status?: EnumOfferStatusFieldUpdateOperationsInput | $Enums.OfferStatus
    validFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    validUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eligibilityRules?: EligibilityRuleUncheckedUpdateManyWithoutOfferNestedInput
    localityPrices?: PriceLocalityUncheckedUpdateManyWithoutOfferNestedInput
  }

  export type OfferCreateManyInput = {
    id?: string
    planId: string
    name: string
    basePriceAmountCents: number
    basePriceCurrency?: string
    status?: $Enums.OfferStatus
    validFrom: Date | string
    validUntil?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OfferUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    basePriceAmountCents?: IntFieldUpdateOperationsInput | number
    basePriceCurrency?: StringFieldUpdateOperationsInput | string
    status?: EnumOfferStatusFieldUpdateOperationsInput | $Enums.OfferStatus
    validFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    validUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OfferUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    planId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    basePriceAmountCents?: IntFieldUpdateOperationsInput | number
    basePriceCurrency?: StringFieldUpdateOperationsInput | string
    status?: EnumOfferStatusFieldUpdateOperationsInput | $Enums.OfferStatus
    validFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    validUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EligibilityRuleCreateInput = {
    id?: string
    ruleType: string
    ruleValue: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    offer: OfferCreateNestedOneWithoutEligibilityRulesInput
  }

  export type EligibilityRuleUncheckedCreateInput = {
    id?: string
    offerId: string
    ruleType: string
    ruleValue: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type EligibilityRuleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ruleType?: StringFieldUpdateOperationsInput | string
    ruleValue?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    offer?: OfferUpdateOneRequiredWithoutEligibilityRulesNestedInput
  }

  export type EligibilityRuleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    offerId?: StringFieldUpdateOperationsInput | string
    ruleType?: StringFieldUpdateOperationsInput | string
    ruleValue?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EligibilityRuleCreateManyInput = {
    id?: string
    offerId: string
    ruleType: string
    ruleValue: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type EligibilityRuleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    ruleType?: StringFieldUpdateOperationsInput | string
    ruleValue?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EligibilityRuleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    offerId?: StringFieldUpdateOperationsInput | string
    ruleType?: StringFieldUpdateOperationsInput | string
    ruleValue?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PriceLocalityCreateInput = {
    id?: string
    dddCode: string
    city?: string | null
    priceAmountCents: number
    priceCurrency?: string
    status?: $Enums.PriceLocalityStatus
    createdAt?: Date | string
    offer: OfferCreateNestedOneWithoutLocalityPricesInput
  }

  export type PriceLocalityUncheckedCreateInput = {
    id?: string
    offerId: string
    dddCode: string
    city?: string | null
    priceAmountCents: number
    priceCurrency?: string
    status?: $Enums.PriceLocalityStatus
    createdAt?: Date | string
  }

  export type PriceLocalityUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    dddCode?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    priceAmountCents?: IntFieldUpdateOperationsInput | number
    priceCurrency?: StringFieldUpdateOperationsInput | string
    status?: EnumPriceLocalityStatusFieldUpdateOperationsInput | $Enums.PriceLocalityStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    offer?: OfferUpdateOneRequiredWithoutLocalityPricesNestedInput
  }

  export type PriceLocalityUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    offerId?: StringFieldUpdateOperationsInput | string
    dddCode?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    priceAmountCents?: IntFieldUpdateOperationsInput | number
    priceCurrency?: StringFieldUpdateOperationsInput | string
    status?: EnumPriceLocalityStatusFieldUpdateOperationsInput | $Enums.PriceLocalityStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PriceLocalityCreateManyInput = {
    id?: string
    offerId: string
    dddCode: string
    city?: string | null
    priceAmountCents: number
    priceCurrency?: string
    status?: $Enums.PriceLocalityStatus
    createdAt?: Date | string
  }

  export type PriceLocalityUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    dddCode?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    priceAmountCents?: IntFieldUpdateOperationsInput | number
    priceCurrency?: StringFieldUpdateOperationsInput | string
    status?: EnumPriceLocalityStatusFieldUpdateOperationsInput | $Enums.PriceLocalityStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PriceLocalityUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    offerId?: StringFieldUpdateOperationsInput | string
    dddCode?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    priceAmountCents?: IntFieldUpdateOperationsInput | number
    priceCurrency?: StringFieldUpdateOperationsInput | string
    status?: EnumPriceLocalityStatusFieldUpdateOperationsInput | $Enums.PriceLocalityStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OutboxEventCreateInput = {
    id?: string
    aggregateId: string
    aggregateType: string
    eventType: string
    payload: JsonNullValueInput | InputJsonValue
    correlationId?: string | null
    causationId?: string | null
    createdAt?: Date | string
    publishedAt?: Date | string | null
    status?: string
    retryCount?: number
  }

  export type OutboxEventUncheckedCreateInput = {
    id?: string
    aggregateId: string
    aggregateType: string
    eventType: string
    payload: JsonNullValueInput | InputJsonValue
    correlationId?: string | null
    causationId?: string | null
    createdAt?: Date | string
    publishedAt?: Date | string | null
    status?: string
    retryCount?: number
  }

  export type OutboxEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    aggregateId?: StringFieldUpdateOperationsInput | string
    aggregateType?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    correlationId?: NullableStringFieldUpdateOperationsInput | string | null
    causationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    retryCount?: IntFieldUpdateOperationsInput | number
  }

  export type OutboxEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    aggregateId?: StringFieldUpdateOperationsInput | string
    aggregateType?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    correlationId?: NullableStringFieldUpdateOperationsInput | string | null
    causationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    retryCount?: IntFieldUpdateOperationsInput | number
  }

  export type OutboxEventCreateManyInput = {
    id?: string
    aggregateId: string
    aggregateType: string
    eventType: string
    payload: JsonNullValueInput | InputJsonValue
    correlationId?: string | null
    causationId?: string | null
    createdAt?: Date | string
    publishedAt?: Date | string | null
    status?: string
    retryCount?: number
  }

  export type OutboxEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    aggregateId?: StringFieldUpdateOperationsInput | string
    aggregateType?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    correlationId?: NullableStringFieldUpdateOperationsInput | string | null
    causationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    retryCount?: IntFieldUpdateOperationsInput | number
  }

  export type OutboxEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    aggregateId?: StringFieldUpdateOperationsInput | string
    aggregateType?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    correlationId?: NullableStringFieldUpdateOperationsInput | string | null
    causationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    retryCount?: IntFieldUpdateOperationsInput | number
  }

  export type ProcessedEventCreateInput = {
    eventId: string
    eventType: string
    processedAt?: Date | string
  }

  export type ProcessedEventUncheckedCreateInput = {
    eventId: string
    eventType: string
    processedAt?: Date | string
  }

  export type ProcessedEventUpdateInput = {
    eventId?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    processedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProcessedEventUncheckedUpdateInput = {
    eventId?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    processedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProcessedEventCreateManyInput = {
    eventId: string
    eventType: string
    processedAt?: Date | string
  }

  export type ProcessedEventUpdateManyMutationInput = {
    eventId?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    processedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProcessedEventUncheckedUpdateManyInput = {
    eventId?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    processedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumPlanTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PlanType | EnumPlanTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PlanType[] | ListEnumPlanTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PlanType[] | ListEnumPlanTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPlanTypeFilter<$PrismaModel> | $Enums.PlanType
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type EnumPlanStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PlanStatus | EnumPlanStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PlanStatus[] | ListEnumPlanStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PlanStatus[] | ListEnumPlanStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPlanStatusFilter<$PrismaModel> | $Enums.PlanStatus
  }

  export type EnumPaymentMethodTypeNullableListFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethodType[] | ListEnumPaymentMethodTypeFieldRefInput<$PrismaModel> | null
    has?: $Enums.PaymentMethodType | EnumPaymentMethodTypeFieldRefInput<$PrismaModel> | null
    hasEvery?: $Enums.PaymentMethodType[] | ListEnumPaymentMethodTypeFieldRefInput<$PrismaModel>
    hasSome?: $Enums.PaymentMethodType[] | ListEnumPaymentMethodTypeFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type PlanFeatureListRelationFilter = {
    every?: PlanFeatureWhereInput
    some?: PlanFeatureWhereInput
    none?: PlanFeatureWhereInput
  }

  export type OfferListRelationFilter = {
    every?: OfferWhereInput
    some?: OfferWhereInput
    none?: OfferWhereInput
  }

  export type PlanFeatureOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OfferOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PlanCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    maxLines?: SortOrder
    status?: SortOrder
    allowedPaymentMethods?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PlanAvgOrderByAggregateInput = {
    maxLines?: SortOrder
  }

  export type PlanMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    maxLines?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PlanMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    maxLines?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PlanSumOrderByAggregateInput = {
    maxLines?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumPlanTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PlanType | EnumPlanTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PlanType[] | ListEnumPlanTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PlanType[] | ListEnumPlanTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPlanTypeWithAggregatesFilter<$PrismaModel> | $Enums.PlanType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPlanTypeFilter<$PrismaModel>
    _max?: NestedEnumPlanTypeFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumPlanStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PlanStatus | EnumPlanStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PlanStatus[] | ListEnumPlanStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PlanStatus[] | ListEnumPlanStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPlanStatusWithAggregatesFilter<$PrismaModel> | $Enums.PlanStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPlanStatusFilter<$PrismaModel>
    _max?: NestedEnumPlanStatusFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumFeatureUnitFilter<$PrismaModel = never> = {
    equals?: $Enums.FeatureUnit | EnumFeatureUnitFieldRefInput<$PrismaModel>
    in?: $Enums.FeatureUnit[] | ListEnumFeatureUnitFieldRefInput<$PrismaModel>
    notIn?: $Enums.FeatureUnit[] | ListEnumFeatureUnitFieldRefInput<$PrismaModel>
    not?: NestedEnumFeatureUnitFilter<$PrismaModel> | $Enums.FeatureUnit
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type PlanScalarRelationFilter = {
    is?: PlanWhereInput
    isNot?: PlanWhereInput
  }

  export type PlanFeatureCountOrderByAggregateInput = {
    id?: SortOrder
    planId?: SortOrder
    name?: SortOrder
    quota?: SortOrder
    unit?: SortOrder
    unlimited?: SortOrder
    createdAt?: SortOrder
  }

  export type PlanFeatureAvgOrderByAggregateInput = {
    quota?: SortOrder
  }

  export type PlanFeatureMaxOrderByAggregateInput = {
    id?: SortOrder
    planId?: SortOrder
    name?: SortOrder
    quota?: SortOrder
    unit?: SortOrder
    unlimited?: SortOrder
    createdAt?: SortOrder
  }

  export type PlanFeatureMinOrderByAggregateInput = {
    id?: SortOrder
    planId?: SortOrder
    name?: SortOrder
    quota?: SortOrder
    unit?: SortOrder
    unlimited?: SortOrder
    createdAt?: SortOrder
  }

  export type PlanFeatureSumOrderByAggregateInput = {
    quota?: SortOrder
  }

  export type EnumFeatureUnitWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FeatureUnit | EnumFeatureUnitFieldRefInput<$PrismaModel>
    in?: $Enums.FeatureUnit[] | ListEnumFeatureUnitFieldRefInput<$PrismaModel>
    notIn?: $Enums.FeatureUnit[] | ListEnumFeatureUnitFieldRefInput<$PrismaModel>
    not?: NestedEnumFeatureUnitWithAggregatesFilter<$PrismaModel> | $Enums.FeatureUnit
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFeatureUnitFilter<$PrismaModel>
    _max?: NestedEnumFeatureUnitFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumOfferStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OfferStatus | EnumOfferStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OfferStatus[] | ListEnumOfferStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OfferStatus[] | ListEnumOfferStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOfferStatusFilter<$PrismaModel> | $Enums.OfferStatus
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type EligibilityRuleListRelationFilter = {
    every?: EligibilityRuleWhereInput
    some?: EligibilityRuleWhereInput
    none?: EligibilityRuleWhereInput
  }

  export type PriceLocalityListRelationFilter = {
    every?: PriceLocalityWhereInput
    some?: PriceLocalityWhereInput
    none?: PriceLocalityWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type EligibilityRuleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PriceLocalityOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OfferCountOrderByAggregateInput = {
    id?: SortOrder
    planId?: SortOrder
    name?: SortOrder
    basePriceAmountCents?: SortOrder
    basePriceCurrency?: SortOrder
    status?: SortOrder
    validFrom?: SortOrder
    validUntil?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OfferAvgOrderByAggregateInput = {
    basePriceAmountCents?: SortOrder
  }

  export type OfferMaxOrderByAggregateInput = {
    id?: SortOrder
    planId?: SortOrder
    name?: SortOrder
    basePriceAmountCents?: SortOrder
    basePriceCurrency?: SortOrder
    status?: SortOrder
    validFrom?: SortOrder
    validUntil?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OfferMinOrderByAggregateInput = {
    id?: SortOrder
    planId?: SortOrder
    name?: SortOrder
    basePriceAmountCents?: SortOrder
    basePriceCurrency?: SortOrder
    status?: SortOrder
    validFrom?: SortOrder
    validUntil?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OfferSumOrderByAggregateInput = {
    basePriceAmountCents?: SortOrder
  }

  export type EnumOfferStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OfferStatus | EnumOfferStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OfferStatus[] | ListEnumOfferStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OfferStatus[] | ListEnumOfferStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOfferStatusWithAggregatesFilter<$PrismaModel> | $Enums.OfferStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOfferStatusFilter<$PrismaModel>
    _max?: NestedEnumOfferStatusFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type OfferScalarRelationFilter = {
    is?: OfferWhereInput
    isNot?: OfferWhereInput
  }

  export type EligibilityRuleCountOrderByAggregateInput = {
    id?: SortOrder
    offerId?: SortOrder
    ruleType?: SortOrder
    ruleValue?: SortOrder
    createdAt?: SortOrder
  }

  export type EligibilityRuleMaxOrderByAggregateInput = {
    id?: SortOrder
    offerId?: SortOrder
    ruleType?: SortOrder
    createdAt?: SortOrder
  }

  export type EligibilityRuleMinOrderByAggregateInput = {
    id?: SortOrder
    offerId?: SortOrder
    ruleType?: SortOrder
    createdAt?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumPriceLocalityStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PriceLocalityStatus | EnumPriceLocalityStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PriceLocalityStatus[] | ListEnumPriceLocalityStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PriceLocalityStatus[] | ListEnumPriceLocalityStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPriceLocalityStatusFilter<$PrismaModel> | $Enums.PriceLocalityStatus
  }

  export type PriceLocalityOfferIdDddCodeCityCompoundUniqueInput = {
    offerId: string
    dddCode: string
    city: string
  }

  export type PriceLocalityCountOrderByAggregateInput = {
    id?: SortOrder
    offerId?: SortOrder
    dddCode?: SortOrder
    city?: SortOrder
    priceAmountCents?: SortOrder
    priceCurrency?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type PriceLocalityAvgOrderByAggregateInput = {
    priceAmountCents?: SortOrder
  }

  export type PriceLocalityMaxOrderByAggregateInput = {
    id?: SortOrder
    offerId?: SortOrder
    dddCode?: SortOrder
    city?: SortOrder
    priceAmountCents?: SortOrder
    priceCurrency?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type PriceLocalityMinOrderByAggregateInput = {
    id?: SortOrder
    offerId?: SortOrder
    dddCode?: SortOrder
    city?: SortOrder
    priceAmountCents?: SortOrder
    priceCurrency?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type PriceLocalitySumOrderByAggregateInput = {
    priceAmountCents?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumPriceLocalityStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PriceLocalityStatus | EnumPriceLocalityStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PriceLocalityStatus[] | ListEnumPriceLocalityStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PriceLocalityStatus[] | ListEnumPriceLocalityStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPriceLocalityStatusWithAggregatesFilter<$PrismaModel> | $Enums.PriceLocalityStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPriceLocalityStatusFilter<$PrismaModel>
    _max?: NestedEnumPriceLocalityStatusFilter<$PrismaModel>
  }

  export type OutboxEventCountOrderByAggregateInput = {
    id?: SortOrder
    aggregateId?: SortOrder
    aggregateType?: SortOrder
    eventType?: SortOrder
    payload?: SortOrder
    correlationId?: SortOrder
    causationId?: SortOrder
    createdAt?: SortOrder
    publishedAt?: SortOrder
    status?: SortOrder
    retryCount?: SortOrder
  }

  export type OutboxEventAvgOrderByAggregateInput = {
    retryCount?: SortOrder
  }

  export type OutboxEventMaxOrderByAggregateInput = {
    id?: SortOrder
    aggregateId?: SortOrder
    aggregateType?: SortOrder
    eventType?: SortOrder
    correlationId?: SortOrder
    causationId?: SortOrder
    createdAt?: SortOrder
    publishedAt?: SortOrder
    status?: SortOrder
    retryCount?: SortOrder
  }

  export type OutboxEventMinOrderByAggregateInput = {
    id?: SortOrder
    aggregateId?: SortOrder
    aggregateType?: SortOrder
    eventType?: SortOrder
    correlationId?: SortOrder
    causationId?: SortOrder
    createdAt?: SortOrder
    publishedAt?: SortOrder
    status?: SortOrder
    retryCount?: SortOrder
  }

  export type OutboxEventSumOrderByAggregateInput = {
    retryCount?: SortOrder
  }

  export type ProcessedEventCountOrderByAggregateInput = {
    eventId?: SortOrder
    eventType?: SortOrder
    processedAt?: SortOrder
  }

  export type ProcessedEventMaxOrderByAggregateInput = {
    eventId?: SortOrder
    eventType?: SortOrder
    processedAt?: SortOrder
  }

  export type ProcessedEventMinOrderByAggregateInput = {
    eventId?: SortOrder
    eventType?: SortOrder
    processedAt?: SortOrder
  }

  export type PlanCreateallowedPaymentMethodsInput = {
    set: $Enums.PaymentMethodType[]
  }

  export type PlanFeatureCreateNestedManyWithoutPlanInput = {
    create?: XOR<PlanFeatureCreateWithoutPlanInput, PlanFeatureUncheckedCreateWithoutPlanInput> | PlanFeatureCreateWithoutPlanInput[] | PlanFeatureUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: PlanFeatureCreateOrConnectWithoutPlanInput | PlanFeatureCreateOrConnectWithoutPlanInput[]
    createMany?: PlanFeatureCreateManyPlanInputEnvelope
    connect?: PlanFeatureWhereUniqueInput | PlanFeatureWhereUniqueInput[]
  }

  export type OfferCreateNestedManyWithoutPlanInput = {
    create?: XOR<OfferCreateWithoutPlanInput, OfferUncheckedCreateWithoutPlanInput> | OfferCreateWithoutPlanInput[] | OfferUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: OfferCreateOrConnectWithoutPlanInput | OfferCreateOrConnectWithoutPlanInput[]
    createMany?: OfferCreateManyPlanInputEnvelope
    connect?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
  }

  export type PlanFeatureUncheckedCreateNestedManyWithoutPlanInput = {
    create?: XOR<PlanFeatureCreateWithoutPlanInput, PlanFeatureUncheckedCreateWithoutPlanInput> | PlanFeatureCreateWithoutPlanInput[] | PlanFeatureUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: PlanFeatureCreateOrConnectWithoutPlanInput | PlanFeatureCreateOrConnectWithoutPlanInput[]
    createMany?: PlanFeatureCreateManyPlanInputEnvelope
    connect?: PlanFeatureWhereUniqueInput | PlanFeatureWhereUniqueInput[]
  }

  export type OfferUncheckedCreateNestedManyWithoutPlanInput = {
    create?: XOR<OfferCreateWithoutPlanInput, OfferUncheckedCreateWithoutPlanInput> | OfferCreateWithoutPlanInput[] | OfferUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: OfferCreateOrConnectWithoutPlanInput | OfferCreateOrConnectWithoutPlanInput[]
    createMany?: OfferCreateManyPlanInputEnvelope
    connect?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumPlanTypeFieldUpdateOperationsInput = {
    set?: $Enums.PlanType
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumPlanStatusFieldUpdateOperationsInput = {
    set?: $Enums.PlanStatus
  }

  export type PlanUpdateallowedPaymentMethodsInput = {
    set?: $Enums.PaymentMethodType[]
    push?: $Enums.PaymentMethodType | $Enums.PaymentMethodType[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PlanFeatureUpdateManyWithoutPlanNestedInput = {
    create?: XOR<PlanFeatureCreateWithoutPlanInput, PlanFeatureUncheckedCreateWithoutPlanInput> | PlanFeatureCreateWithoutPlanInput[] | PlanFeatureUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: PlanFeatureCreateOrConnectWithoutPlanInput | PlanFeatureCreateOrConnectWithoutPlanInput[]
    upsert?: PlanFeatureUpsertWithWhereUniqueWithoutPlanInput | PlanFeatureUpsertWithWhereUniqueWithoutPlanInput[]
    createMany?: PlanFeatureCreateManyPlanInputEnvelope
    set?: PlanFeatureWhereUniqueInput | PlanFeatureWhereUniqueInput[]
    disconnect?: PlanFeatureWhereUniqueInput | PlanFeatureWhereUniqueInput[]
    delete?: PlanFeatureWhereUniqueInput | PlanFeatureWhereUniqueInput[]
    connect?: PlanFeatureWhereUniqueInput | PlanFeatureWhereUniqueInput[]
    update?: PlanFeatureUpdateWithWhereUniqueWithoutPlanInput | PlanFeatureUpdateWithWhereUniqueWithoutPlanInput[]
    updateMany?: PlanFeatureUpdateManyWithWhereWithoutPlanInput | PlanFeatureUpdateManyWithWhereWithoutPlanInput[]
    deleteMany?: PlanFeatureScalarWhereInput | PlanFeatureScalarWhereInput[]
  }

  export type OfferUpdateManyWithoutPlanNestedInput = {
    create?: XOR<OfferCreateWithoutPlanInput, OfferUncheckedCreateWithoutPlanInput> | OfferCreateWithoutPlanInput[] | OfferUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: OfferCreateOrConnectWithoutPlanInput | OfferCreateOrConnectWithoutPlanInput[]
    upsert?: OfferUpsertWithWhereUniqueWithoutPlanInput | OfferUpsertWithWhereUniqueWithoutPlanInput[]
    createMany?: OfferCreateManyPlanInputEnvelope
    set?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
    disconnect?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
    delete?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
    connect?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
    update?: OfferUpdateWithWhereUniqueWithoutPlanInput | OfferUpdateWithWhereUniqueWithoutPlanInput[]
    updateMany?: OfferUpdateManyWithWhereWithoutPlanInput | OfferUpdateManyWithWhereWithoutPlanInput[]
    deleteMany?: OfferScalarWhereInput | OfferScalarWhereInput[]
  }

  export type PlanFeatureUncheckedUpdateManyWithoutPlanNestedInput = {
    create?: XOR<PlanFeatureCreateWithoutPlanInput, PlanFeatureUncheckedCreateWithoutPlanInput> | PlanFeatureCreateWithoutPlanInput[] | PlanFeatureUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: PlanFeatureCreateOrConnectWithoutPlanInput | PlanFeatureCreateOrConnectWithoutPlanInput[]
    upsert?: PlanFeatureUpsertWithWhereUniqueWithoutPlanInput | PlanFeatureUpsertWithWhereUniqueWithoutPlanInput[]
    createMany?: PlanFeatureCreateManyPlanInputEnvelope
    set?: PlanFeatureWhereUniqueInput | PlanFeatureWhereUniqueInput[]
    disconnect?: PlanFeatureWhereUniqueInput | PlanFeatureWhereUniqueInput[]
    delete?: PlanFeatureWhereUniqueInput | PlanFeatureWhereUniqueInput[]
    connect?: PlanFeatureWhereUniqueInput | PlanFeatureWhereUniqueInput[]
    update?: PlanFeatureUpdateWithWhereUniqueWithoutPlanInput | PlanFeatureUpdateWithWhereUniqueWithoutPlanInput[]
    updateMany?: PlanFeatureUpdateManyWithWhereWithoutPlanInput | PlanFeatureUpdateManyWithWhereWithoutPlanInput[]
    deleteMany?: PlanFeatureScalarWhereInput | PlanFeatureScalarWhereInput[]
  }

  export type OfferUncheckedUpdateManyWithoutPlanNestedInput = {
    create?: XOR<OfferCreateWithoutPlanInput, OfferUncheckedCreateWithoutPlanInput> | OfferCreateWithoutPlanInput[] | OfferUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: OfferCreateOrConnectWithoutPlanInput | OfferCreateOrConnectWithoutPlanInput[]
    upsert?: OfferUpsertWithWhereUniqueWithoutPlanInput | OfferUpsertWithWhereUniqueWithoutPlanInput[]
    createMany?: OfferCreateManyPlanInputEnvelope
    set?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
    disconnect?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
    delete?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
    connect?: OfferWhereUniqueInput | OfferWhereUniqueInput[]
    update?: OfferUpdateWithWhereUniqueWithoutPlanInput | OfferUpdateWithWhereUniqueWithoutPlanInput[]
    updateMany?: OfferUpdateManyWithWhereWithoutPlanInput | OfferUpdateManyWithWhereWithoutPlanInput[]
    deleteMany?: OfferScalarWhereInput | OfferScalarWhereInput[]
  }

  export type PlanCreateNestedOneWithoutFeaturesInput = {
    create?: XOR<PlanCreateWithoutFeaturesInput, PlanUncheckedCreateWithoutFeaturesInput>
    connectOrCreate?: PlanCreateOrConnectWithoutFeaturesInput
    connect?: PlanWhereUniqueInput
  }

  export type EnumFeatureUnitFieldUpdateOperationsInput = {
    set?: $Enums.FeatureUnit
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type PlanUpdateOneRequiredWithoutFeaturesNestedInput = {
    create?: XOR<PlanCreateWithoutFeaturesInput, PlanUncheckedCreateWithoutFeaturesInput>
    connectOrCreate?: PlanCreateOrConnectWithoutFeaturesInput
    upsert?: PlanUpsertWithoutFeaturesInput
    connect?: PlanWhereUniqueInput
    update?: XOR<XOR<PlanUpdateToOneWithWhereWithoutFeaturesInput, PlanUpdateWithoutFeaturesInput>, PlanUncheckedUpdateWithoutFeaturesInput>
  }

  export type PlanCreateNestedOneWithoutOffersInput = {
    create?: XOR<PlanCreateWithoutOffersInput, PlanUncheckedCreateWithoutOffersInput>
    connectOrCreate?: PlanCreateOrConnectWithoutOffersInput
    connect?: PlanWhereUniqueInput
  }

  export type EligibilityRuleCreateNestedManyWithoutOfferInput = {
    create?: XOR<EligibilityRuleCreateWithoutOfferInput, EligibilityRuleUncheckedCreateWithoutOfferInput> | EligibilityRuleCreateWithoutOfferInput[] | EligibilityRuleUncheckedCreateWithoutOfferInput[]
    connectOrCreate?: EligibilityRuleCreateOrConnectWithoutOfferInput | EligibilityRuleCreateOrConnectWithoutOfferInput[]
    createMany?: EligibilityRuleCreateManyOfferInputEnvelope
    connect?: EligibilityRuleWhereUniqueInput | EligibilityRuleWhereUniqueInput[]
  }

  export type PriceLocalityCreateNestedManyWithoutOfferInput = {
    create?: XOR<PriceLocalityCreateWithoutOfferInput, PriceLocalityUncheckedCreateWithoutOfferInput> | PriceLocalityCreateWithoutOfferInput[] | PriceLocalityUncheckedCreateWithoutOfferInput[]
    connectOrCreate?: PriceLocalityCreateOrConnectWithoutOfferInput | PriceLocalityCreateOrConnectWithoutOfferInput[]
    createMany?: PriceLocalityCreateManyOfferInputEnvelope
    connect?: PriceLocalityWhereUniqueInput | PriceLocalityWhereUniqueInput[]
  }

  export type EligibilityRuleUncheckedCreateNestedManyWithoutOfferInput = {
    create?: XOR<EligibilityRuleCreateWithoutOfferInput, EligibilityRuleUncheckedCreateWithoutOfferInput> | EligibilityRuleCreateWithoutOfferInput[] | EligibilityRuleUncheckedCreateWithoutOfferInput[]
    connectOrCreate?: EligibilityRuleCreateOrConnectWithoutOfferInput | EligibilityRuleCreateOrConnectWithoutOfferInput[]
    createMany?: EligibilityRuleCreateManyOfferInputEnvelope
    connect?: EligibilityRuleWhereUniqueInput | EligibilityRuleWhereUniqueInput[]
  }

  export type PriceLocalityUncheckedCreateNestedManyWithoutOfferInput = {
    create?: XOR<PriceLocalityCreateWithoutOfferInput, PriceLocalityUncheckedCreateWithoutOfferInput> | PriceLocalityCreateWithoutOfferInput[] | PriceLocalityUncheckedCreateWithoutOfferInput[]
    connectOrCreate?: PriceLocalityCreateOrConnectWithoutOfferInput | PriceLocalityCreateOrConnectWithoutOfferInput[]
    createMany?: PriceLocalityCreateManyOfferInputEnvelope
    connect?: PriceLocalityWhereUniqueInput | PriceLocalityWhereUniqueInput[]
  }

  export type EnumOfferStatusFieldUpdateOperationsInput = {
    set?: $Enums.OfferStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type PlanUpdateOneRequiredWithoutOffersNestedInput = {
    create?: XOR<PlanCreateWithoutOffersInput, PlanUncheckedCreateWithoutOffersInput>
    connectOrCreate?: PlanCreateOrConnectWithoutOffersInput
    upsert?: PlanUpsertWithoutOffersInput
    connect?: PlanWhereUniqueInput
    update?: XOR<XOR<PlanUpdateToOneWithWhereWithoutOffersInput, PlanUpdateWithoutOffersInput>, PlanUncheckedUpdateWithoutOffersInput>
  }

  export type EligibilityRuleUpdateManyWithoutOfferNestedInput = {
    create?: XOR<EligibilityRuleCreateWithoutOfferInput, EligibilityRuleUncheckedCreateWithoutOfferInput> | EligibilityRuleCreateWithoutOfferInput[] | EligibilityRuleUncheckedCreateWithoutOfferInput[]
    connectOrCreate?: EligibilityRuleCreateOrConnectWithoutOfferInput | EligibilityRuleCreateOrConnectWithoutOfferInput[]
    upsert?: EligibilityRuleUpsertWithWhereUniqueWithoutOfferInput | EligibilityRuleUpsertWithWhereUniqueWithoutOfferInput[]
    createMany?: EligibilityRuleCreateManyOfferInputEnvelope
    set?: EligibilityRuleWhereUniqueInput | EligibilityRuleWhereUniqueInput[]
    disconnect?: EligibilityRuleWhereUniqueInput | EligibilityRuleWhereUniqueInput[]
    delete?: EligibilityRuleWhereUniqueInput | EligibilityRuleWhereUniqueInput[]
    connect?: EligibilityRuleWhereUniqueInput | EligibilityRuleWhereUniqueInput[]
    update?: EligibilityRuleUpdateWithWhereUniqueWithoutOfferInput | EligibilityRuleUpdateWithWhereUniqueWithoutOfferInput[]
    updateMany?: EligibilityRuleUpdateManyWithWhereWithoutOfferInput | EligibilityRuleUpdateManyWithWhereWithoutOfferInput[]
    deleteMany?: EligibilityRuleScalarWhereInput | EligibilityRuleScalarWhereInput[]
  }

  export type PriceLocalityUpdateManyWithoutOfferNestedInput = {
    create?: XOR<PriceLocalityCreateWithoutOfferInput, PriceLocalityUncheckedCreateWithoutOfferInput> | PriceLocalityCreateWithoutOfferInput[] | PriceLocalityUncheckedCreateWithoutOfferInput[]
    connectOrCreate?: PriceLocalityCreateOrConnectWithoutOfferInput | PriceLocalityCreateOrConnectWithoutOfferInput[]
    upsert?: PriceLocalityUpsertWithWhereUniqueWithoutOfferInput | PriceLocalityUpsertWithWhereUniqueWithoutOfferInput[]
    createMany?: PriceLocalityCreateManyOfferInputEnvelope
    set?: PriceLocalityWhereUniqueInput | PriceLocalityWhereUniqueInput[]
    disconnect?: PriceLocalityWhereUniqueInput | PriceLocalityWhereUniqueInput[]
    delete?: PriceLocalityWhereUniqueInput | PriceLocalityWhereUniqueInput[]
    connect?: PriceLocalityWhereUniqueInput | PriceLocalityWhereUniqueInput[]
    update?: PriceLocalityUpdateWithWhereUniqueWithoutOfferInput | PriceLocalityUpdateWithWhereUniqueWithoutOfferInput[]
    updateMany?: PriceLocalityUpdateManyWithWhereWithoutOfferInput | PriceLocalityUpdateManyWithWhereWithoutOfferInput[]
    deleteMany?: PriceLocalityScalarWhereInput | PriceLocalityScalarWhereInput[]
  }

  export type EligibilityRuleUncheckedUpdateManyWithoutOfferNestedInput = {
    create?: XOR<EligibilityRuleCreateWithoutOfferInput, EligibilityRuleUncheckedCreateWithoutOfferInput> | EligibilityRuleCreateWithoutOfferInput[] | EligibilityRuleUncheckedCreateWithoutOfferInput[]
    connectOrCreate?: EligibilityRuleCreateOrConnectWithoutOfferInput | EligibilityRuleCreateOrConnectWithoutOfferInput[]
    upsert?: EligibilityRuleUpsertWithWhereUniqueWithoutOfferInput | EligibilityRuleUpsertWithWhereUniqueWithoutOfferInput[]
    createMany?: EligibilityRuleCreateManyOfferInputEnvelope
    set?: EligibilityRuleWhereUniqueInput | EligibilityRuleWhereUniqueInput[]
    disconnect?: EligibilityRuleWhereUniqueInput | EligibilityRuleWhereUniqueInput[]
    delete?: EligibilityRuleWhereUniqueInput | EligibilityRuleWhereUniqueInput[]
    connect?: EligibilityRuleWhereUniqueInput | EligibilityRuleWhereUniqueInput[]
    update?: EligibilityRuleUpdateWithWhereUniqueWithoutOfferInput | EligibilityRuleUpdateWithWhereUniqueWithoutOfferInput[]
    updateMany?: EligibilityRuleUpdateManyWithWhereWithoutOfferInput | EligibilityRuleUpdateManyWithWhereWithoutOfferInput[]
    deleteMany?: EligibilityRuleScalarWhereInput | EligibilityRuleScalarWhereInput[]
  }

  export type PriceLocalityUncheckedUpdateManyWithoutOfferNestedInput = {
    create?: XOR<PriceLocalityCreateWithoutOfferInput, PriceLocalityUncheckedCreateWithoutOfferInput> | PriceLocalityCreateWithoutOfferInput[] | PriceLocalityUncheckedCreateWithoutOfferInput[]
    connectOrCreate?: PriceLocalityCreateOrConnectWithoutOfferInput | PriceLocalityCreateOrConnectWithoutOfferInput[]
    upsert?: PriceLocalityUpsertWithWhereUniqueWithoutOfferInput | PriceLocalityUpsertWithWhereUniqueWithoutOfferInput[]
    createMany?: PriceLocalityCreateManyOfferInputEnvelope
    set?: PriceLocalityWhereUniqueInput | PriceLocalityWhereUniqueInput[]
    disconnect?: PriceLocalityWhereUniqueInput | PriceLocalityWhereUniqueInput[]
    delete?: PriceLocalityWhereUniqueInput | PriceLocalityWhereUniqueInput[]
    connect?: PriceLocalityWhereUniqueInput | PriceLocalityWhereUniqueInput[]
    update?: PriceLocalityUpdateWithWhereUniqueWithoutOfferInput | PriceLocalityUpdateWithWhereUniqueWithoutOfferInput[]
    updateMany?: PriceLocalityUpdateManyWithWhereWithoutOfferInput | PriceLocalityUpdateManyWithWhereWithoutOfferInput[]
    deleteMany?: PriceLocalityScalarWhereInput | PriceLocalityScalarWhereInput[]
  }

  export type OfferCreateNestedOneWithoutEligibilityRulesInput = {
    create?: XOR<OfferCreateWithoutEligibilityRulesInput, OfferUncheckedCreateWithoutEligibilityRulesInput>
    connectOrCreate?: OfferCreateOrConnectWithoutEligibilityRulesInput
    connect?: OfferWhereUniqueInput
  }

  export type OfferUpdateOneRequiredWithoutEligibilityRulesNestedInput = {
    create?: XOR<OfferCreateWithoutEligibilityRulesInput, OfferUncheckedCreateWithoutEligibilityRulesInput>
    connectOrCreate?: OfferCreateOrConnectWithoutEligibilityRulesInput
    upsert?: OfferUpsertWithoutEligibilityRulesInput
    connect?: OfferWhereUniqueInput
    update?: XOR<XOR<OfferUpdateToOneWithWhereWithoutEligibilityRulesInput, OfferUpdateWithoutEligibilityRulesInput>, OfferUncheckedUpdateWithoutEligibilityRulesInput>
  }

  export type OfferCreateNestedOneWithoutLocalityPricesInput = {
    create?: XOR<OfferCreateWithoutLocalityPricesInput, OfferUncheckedCreateWithoutLocalityPricesInput>
    connectOrCreate?: OfferCreateOrConnectWithoutLocalityPricesInput
    connect?: OfferWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumPriceLocalityStatusFieldUpdateOperationsInput = {
    set?: $Enums.PriceLocalityStatus
  }

  export type OfferUpdateOneRequiredWithoutLocalityPricesNestedInput = {
    create?: XOR<OfferCreateWithoutLocalityPricesInput, OfferUncheckedCreateWithoutLocalityPricesInput>
    connectOrCreate?: OfferCreateOrConnectWithoutLocalityPricesInput
    upsert?: OfferUpsertWithoutLocalityPricesInput
    connect?: OfferWhereUniqueInput
    update?: XOR<XOR<OfferUpdateToOneWithWhereWithoutLocalityPricesInput, OfferUpdateWithoutLocalityPricesInput>, OfferUncheckedUpdateWithoutLocalityPricesInput>
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumPlanTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PlanType | EnumPlanTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PlanType[] | ListEnumPlanTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PlanType[] | ListEnumPlanTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPlanTypeFilter<$PrismaModel> | $Enums.PlanType
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumPlanStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PlanStatus | EnumPlanStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PlanStatus[] | ListEnumPlanStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PlanStatus[] | ListEnumPlanStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPlanStatusFilter<$PrismaModel> | $Enums.PlanStatus
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedEnumPlanTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PlanType | EnumPlanTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PlanType[] | ListEnumPlanTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PlanType[] | ListEnumPlanTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPlanTypeWithAggregatesFilter<$PrismaModel> | $Enums.PlanType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPlanTypeFilter<$PrismaModel>
    _max?: NestedEnumPlanTypeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumPlanStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PlanStatus | EnumPlanStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PlanStatus[] | ListEnumPlanStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PlanStatus[] | ListEnumPlanStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPlanStatusWithAggregatesFilter<$PrismaModel> | $Enums.PlanStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPlanStatusFilter<$PrismaModel>
    _max?: NestedEnumPlanStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumFeatureUnitFilter<$PrismaModel = never> = {
    equals?: $Enums.FeatureUnit | EnumFeatureUnitFieldRefInput<$PrismaModel>
    in?: $Enums.FeatureUnit[] | ListEnumFeatureUnitFieldRefInput<$PrismaModel>
    notIn?: $Enums.FeatureUnit[] | ListEnumFeatureUnitFieldRefInput<$PrismaModel>
    not?: NestedEnumFeatureUnitFilter<$PrismaModel> | $Enums.FeatureUnit
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumFeatureUnitWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FeatureUnit | EnumFeatureUnitFieldRefInput<$PrismaModel>
    in?: $Enums.FeatureUnit[] | ListEnumFeatureUnitFieldRefInput<$PrismaModel>
    notIn?: $Enums.FeatureUnit[] | ListEnumFeatureUnitFieldRefInput<$PrismaModel>
    not?: NestedEnumFeatureUnitWithAggregatesFilter<$PrismaModel> | $Enums.FeatureUnit
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFeatureUnitFilter<$PrismaModel>
    _max?: NestedEnumFeatureUnitFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumOfferStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OfferStatus | EnumOfferStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OfferStatus[] | ListEnumOfferStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OfferStatus[] | ListEnumOfferStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOfferStatusFilter<$PrismaModel> | $Enums.OfferStatus
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumOfferStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OfferStatus | EnumOfferStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OfferStatus[] | ListEnumOfferStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OfferStatus[] | ListEnumOfferStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOfferStatusWithAggregatesFilter<$PrismaModel> | $Enums.OfferStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOfferStatusFilter<$PrismaModel>
    _max?: NestedEnumOfferStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumPriceLocalityStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PriceLocalityStatus | EnumPriceLocalityStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PriceLocalityStatus[] | ListEnumPriceLocalityStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PriceLocalityStatus[] | ListEnumPriceLocalityStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPriceLocalityStatusFilter<$PrismaModel> | $Enums.PriceLocalityStatus
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedEnumPriceLocalityStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PriceLocalityStatus | EnumPriceLocalityStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PriceLocalityStatus[] | ListEnumPriceLocalityStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PriceLocalityStatus[] | ListEnumPriceLocalityStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPriceLocalityStatusWithAggregatesFilter<$PrismaModel> | $Enums.PriceLocalityStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPriceLocalityStatusFilter<$PrismaModel>
    _max?: NestedEnumPriceLocalityStatusFilter<$PrismaModel>
  }

  export type PlanFeatureCreateWithoutPlanInput = {
    id?: string
    name: string
    quota: number
    unit: $Enums.FeatureUnit
    unlimited?: boolean
    createdAt?: Date | string
  }

  export type PlanFeatureUncheckedCreateWithoutPlanInput = {
    id?: string
    name: string
    quota: number
    unit: $Enums.FeatureUnit
    unlimited?: boolean
    createdAt?: Date | string
  }

  export type PlanFeatureCreateOrConnectWithoutPlanInput = {
    where: PlanFeatureWhereUniqueInput
    create: XOR<PlanFeatureCreateWithoutPlanInput, PlanFeatureUncheckedCreateWithoutPlanInput>
  }

  export type PlanFeatureCreateManyPlanInputEnvelope = {
    data: PlanFeatureCreateManyPlanInput | PlanFeatureCreateManyPlanInput[]
    skipDuplicates?: boolean
  }

  export type OfferCreateWithoutPlanInput = {
    id?: string
    name: string
    basePriceAmountCents: number
    basePriceCurrency?: string
    status?: $Enums.OfferStatus
    validFrom: Date | string
    validUntil?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    eligibilityRules?: EligibilityRuleCreateNestedManyWithoutOfferInput
    localityPrices?: PriceLocalityCreateNestedManyWithoutOfferInput
  }

  export type OfferUncheckedCreateWithoutPlanInput = {
    id?: string
    name: string
    basePriceAmountCents: number
    basePriceCurrency?: string
    status?: $Enums.OfferStatus
    validFrom: Date | string
    validUntil?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    eligibilityRules?: EligibilityRuleUncheckedCreateNestedManyWithoutOfferInput
    localityPrices?: PriceLocalityUncheckedCreateNestedManyWithoutOfferInput
  }

  export type OfferCreateOrConnectWithoutPlanInput = {
    where: OfferWhereUniqueInput
    create: XOR<OfferCreateWithoutPlanInput, OfferUncheckedCreateWithoutPlanInput>
  }

  export type OfferCreateManyPlanInputEnvelope = {
    data: OfferCreateManyPlanInput | OfferCreateManyPlanInput[]
    skipDuplicates?: boolean
  }

  export type PlanFeatureUpsertWithWhereUniqueWithoutPlanInput = {
    where: PlanFeatureWhereUniqueInput
    update: XOR<PlanFeatureUpdateWithoutPlanInput, PlanFeatureUncheckedUpdateWithoutPlanInput>
    create: XOR<PlanFeatureCreateWithoutPlanInput, PlanFeatureUncheckedCreateWithoutPlanInput>
  }

  export type PlanFeatureUpdateWithWhereUniqueWithoutPlanInput = {
    where: PlanFeatureWhereUniqueInput
    data: XOR<PlanFeatureUpdateWithoutPlanInput, PlanFeatureUncheckedUpdateWithoutPlanInput>
  }

  export type PlanFeatureUpdateManyWithWhereWithoutPlanInput = {
    where: PlanFeatureScalarWhereInput
    data: XOR<PlanFeatureUpdateManyMutationInput, PlanFeatureUncheckedUpdateManyWithoutPlanInput>
  }

  export type PlanFeatureScalarWhereInput = {
    AND?: PlanFeatureScalarWhereInput | PlanFeatureScalarWhereInput[]
    OR?: PlanFeatureScalarWhereInput[]
    NOT?: PlanFeatureScalarWhereInput | PlanFeatureScalarWhereInput[]
    id?: UuidFilter<"PlanFeature"> | string
    planId?: UuidFilter<"PlanFeature"> | string
    name?: StringFilter<"PlanFeature"> | string
    quota?: IntFilter<"PlanFeature"> | number
    unit?: EnumFeatureUnitFilter<"PlanFeature"> | $Enums.FeatureUnit
    unlimited?: BoolFilter<"PlanFeature"> | boolean
    createdAt?: DateTimeFilter<"PlanFeature"> | Date | string
  }

  export type OfferUpsertWithWhereUniqueWithoutPlanInput = {
    where: OfferWhereUniqueInput
    update: XOR<OfferUpdateWithoutPlanInput, OfferUncheckedUpdateWithoutPlanInput>
    create: XOR<OfferCreateWithoutPlanInput, OfferUncheckedCreateWithoutPlanInput>
  }

  export type OfferUpdateWithWhereUniqueWithoutPlanInput = {
    where: OfferWhereUniqueInput
    data: XOR<OfferUpdateWithoutPlanInput, OfferUncheckedUpdateWithoutPlanInput>
  }

  export type OfferUpdateManyWithWhereWithoutPlanInput = {
    where: OfferScalarWhereInput
    data: XOR<OfferUpdateManyMutationInput, OfferUncheckedUpdateManyWithoutPlanInput>
  }

  export type OfferScalarWhereInput = {
    AND?: OfferScalarWhereInput | OfferScalarWhereInput[]
    OR?: OfferScalarWhereInput[]
    NOT?: OfferScalarWhereInput | OfferScalarWhereInput[]
    id?: UuidFilter<"Offer"> | string
    planId?: UuidFilter<"Offer"> | string
    name?: StringFilter<"Offer"> | string
    basePriceAmountCents?: IntFilter<"Offer"> | number
    basePriceCurrency?: StringFilter<"Offer"> | string
    status?: EnumOfferStatusFilter<"Offer"> | $Enums.OfferStatus
    validFrom?: DateTimeFilter<"Offer"> | Date | string
    validUntil?: DateTimeNullableFilter<"Offer"> | Date | string | null
    createdAt?: DateTimeFilter<"Offer"> | Date | string
    updatedAt?: DateTimeFilter<"Offer"> | Date | string
  }

  export type PlanCreateWithoutFeaturesInput = {
    id?: string
    name: string
    type: $Enums.PlanType
    maxLines: number
    status?: $Enums.PlanStatus
    allowedPaymentMethods?: PlanCreateallowedPaymentMethodsInput | $Enums.PaymentMethodType[]
    createdAt?: Date | string
    updatedAt?: Date | string
    offers?: OfferCreateNestedManyWithoutPlanInput
  }

  export type PlanUncheckedCreateWithoutFeaturesInput = {
    id?: string
    name: string
    type: $Enums.PlanType
    maxLines: number
    status?: $Enums.PlanStatus
    allowedPaymentMethods?: PlanCreateallowedPaymentMethodsInput | $Enums.PaymentMethodType[]
    createdAt?: Date | string
    updatedAt?: Date | string
    offers?: OfferUncheckedCreateNestedManyWithoutPlanInput
  }

  export type PlanCreateOrConnectWithoutFeaturesInput = {
    where: PlanWhereUniqueInput
    create: XOR<PlanCreateWithoutFeaturesInput, PlanUncheckedCreateWithoutFeaturesInput>
  }

  export type PlanUpsertWithoutFeaturesInput = {
    update: XOR<PlanUpdateWithoutFeaturesInput, PlanUncheckedUpdateWithoutFeaturesInput>
    create: XOR<PlanCreateWithoutFeaturesInput, PlanUncheckedCreateWithoutFeaturesInput>
    where?: PlanWhereInput
  }

  export type PlanUpdateToOneWithWhereWithoutFeaturesInput = {
    where?: PlanWhereInput
    data: XOR<PlanUpdateWithoutFeaturesInput, PlanUncheckedUpdateWithoutFeaturesInput>
  }

  export type PlanUpdateWithoutFeaturesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumPlanTypeFieldUpdateOperationsInput | $Enums.PlanType
    maxLines?: IntFieldUpdateOperationsInput | number
    status?: EnumPlanStatusFieldUpdateOperationsInput | $Enums.PlanStatus
    allowedPaymentMethods?: PlanUpdateallowedPaymentMethodsInput | $Enums.PaymentMethodType[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    offers?: OfferUpdateManyWithoutPlanNestedInput
  }

  export type PlanUncheckedUpdateWithoutFeaturesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumPlanTypeFieldUpdateOperationsInput | $Enums.PlanType
    maxLines?: IntFieldUpdateOperationsInput | number
    status?: EnumPlanStatusFieldUpdateOperationsInput | $Enums.PlanStatus
    allowedPaymentMethods?: PlanUpdateallowedPaymentMethodsInput | $Enums.PaymentMethodType[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    offers?: OfferUncheckedUpdateManyWithoutPlanNestedInput
  }

  export type PlanCreateWithoutOffersInput = {
    id?: string
    name: string
    type: $Enums.PlanType
    maxLines: number
    status?: $Enums.PlanStatus
    allowedPaymentMethods?: PlanCreateallowedPaymentMethodsInput | $Enums.PaymentMethodType[]
    createdAt?: Date | string
    updatedAt?: Date | string
    features?: PlanFeatureCreateNestedManyWithoutPlanInput
  }

  export type PlanUncheckedCreateWithoutOffersInput = {
    id?: string
    name: string
    type: $Enums.PlanType
    maxLines: number
    status?: $Enums.PlanStatus
    allowedPaymentMethods?: PlanCreateallowedPaymentMethodsInput | $Enums.PaymentMethodType[]
    createdAt?: Date | string
    updatedAt?: Date | string
    features?: PlanFeatureUncheckedCreateNestedManyWithoutPlanInput
  }

  export type PlanCreateOrConnectWithoutOffersInput = {
    where: PlanWhereUniqueInput
    create: XOR<PlanCreateWithoutOffersInput, PlanUncheckedCreateWithoutOffersInput>
  }

  export type EligibilityRuleCreateWithoutOfferInput = {
    id?: string
    ruleType: string
    ruleValue: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type EligibilityRuleUncheckedCreateWithoutOfferInput = {
    id?: string
    ruleType: string
    ruleValue: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type EligibilityRuleCreateOrConnectWithoutOfferInput = {
    where: EligibilityRuleWhereUniqueInput
    create: XOR<EligibilityRuleCreateWithoutOfferInput, EligibilityRuleUncheckedCreateWithoutOfferInput>
  }

  export type EligibilityRuleCreateManyOfferInputEnvelope = {
    data: EligibilityRuleCreateManyOfferInput | EligibilityRuleCreateManyOfferInput[]
    skipDuplicates?: boolean
  }

  export type PriceLocalityCreateWithoutOfferInput = {
    id?: string
    dddCode: string
    city?: string | null
    priceAmountCents: number
    priceCurrency?: string
    status?: $Enums.PriceLocalityStatus
    createdAt?: Date | string
  }

  export type PriceLocalityUncheckedCreateWithoutOfferInput = {
    id?: string
    dddCode: string
    city?: string | null
    priceAmountCents: number
    priceCurrency?: string
    status?: $Enums.PriceLocalityStatus
    createdAt?: Date | string
  }

  export type PriceLocalityCreateOrConnectWithoutOfferInput = {
    where: PriceLocalityWhereUniqueInput
    create: XOR<PriceLocalityCreateWithoutOfferInput, PriceLocalityUncheckedCreateWithoutOfferInput>
  }

  export type PriceLocalityCreateManyOfferInputEnvelope = {
    data: PriceLocalityCreateManyOfferInput | PriceLocalityCreateManyOfferInput[]
    skipDuplicates?: boolean
  }

  export type PlanUpsertWithoutOffersInput = {
    update: XOR<PlanUpdateWithoutOffersInput, PlanUncheckedUpdateWithoutOffersInput>
    create: XOR<PlanCreateWithoutOffersInput, PlanUncheckedCreateWithoutOffersInput>
    where?: PlanWhereInput
  }

  export type PlanUpdateToOneWithWhereWithoutOffersInput = {
    where?: PlanWhereInput
    data: XOR<PlanUpdateWithoutOffersInput, PlanUncheckedUpdateWithoutOffersInput>
  }

  export type PlanUpdateWithoutOffersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumPlanTypeFieldUpdateOperationsInput | $Enums.PlanType
    maxLines?: IntFieldUpdateOperationsInput | number
    status?: EnumPlanStatusFieldUpdateOperationsInput | $Enums.PlanStatus
    allowedPaymentMethods?: PlanUpdateallowedPaymentMethodsInput | $Enums.PaymentMethodType[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    features?: PlanFeatureUpdateManyWithoutPlanNestedInput
  }

  export type PlanUncheckedUpdateWithoutOffersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumPlanTypeFieldUpdateOperationsInput | $Enums.PlanType
    maxLines?: IntFieldUpdateOperationsInput | number
    status?: EnumPlanStatusFieldUpdateOperationsInput | $Enums.PlanStatus
    allowedPaymentMethods?: PlanUpdateallowedPaymentMethodsInput | $Enums.PaymentMethodType[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    features?: PlanFeatureUncheckedUpdateManyWithoutPlanNestedInput
  }

  export type EligibilityRuleUpsertWithWhereUniqueWithoutOfferInput = {
    where: EligibilityRuleWhereUniqueInput
    update: XOR<EligibilityRuleUpdateWithoutOfferInput, EligibilityRuleUncheckedUpdateWithoutOfferInput>
    create: XOR<EligibilityRuleCreateWithoutOfferInput, EligibilityRuleUncheckedCreateWithoutOfferInput>
  }

  export type EligibilityRuleUpdateWithWhereUniqueWithoutOfferInput = {
    where: EligibilityRuleWhereUniqueInput
    data: XOR<EligibilityRuleUpdateWithoutOfferInput, EligibilityRuleUncheckedUpdateWithoutOfferInput>
  }

  export type EligibilityRuleUpdateManyWithWhereWithoutOfferInput = {
    where: EligibilityRuleScalarWhereInput
    data: XOR<EligibilityRuleUpdateManyMutationInput, EligibilityRuleUncheckedUpdateManyWithoutOfferInput>
  }

  export type EligibilityRuleScalarWhereInput = {
    AND?: EligibilityRuleScalarWhereInput | EligibilityRuleScalarWhereInput[]
    OR?: EligibilityRuleScalarWhereInput[]
    NOT?: EligibilityRuleScalarWhereInput | EligibilityRuleScalarWhereInput[]
    id?: UuidFilter<"EligibilityRule"> | string
    offerId?: UuidFilter<"EligibilityRule"> | string
    ruleType?: StringFilter<"EligibilityRule"> | string
    ruleValue?: JsonFilter<"EligibilityRule">
    createdAt?: DateTimeFilter<"EligibilityRule"> | Date | string
  }

  export type PriceLocalityUpsertWithWhereUniqueWithoutOfferInput = {
    where: PriceLocalityWhereUniqueInput
    update: XOR<PriceLocalityUpdateWithoutOfferInput, PriceLocalityUncheckedUpdateWithoutOfferInput>
    create: XOR<PriceLocalityCreateWithoutOfferInput, PriceLocalityUncheckedCreateWithoutOfferInput>
  }

  export type PriceLocalityUpdateWithWhereUniqueWithoutOfferInput = {
    where: PriceLocalityWhereUniqueInput
    data: XOR<PriceLocalityUpdateWithoutOfferInput, PriceLocalityUncheckedUpdateWithoutOfferInput>
  }

  export type PriceLocalityUpdateManyWithWhereWithoutOfferInput = {
    where: PriceLocalityScalarWhereInput
    data: XOR<PriceLocalityUpdateManyMutationInput, PriceLocalityUncheckedUpdateManyWithoutOfferInput>
  }

  export type PriceLocalityScalarWhereInput = {
    AND?: PriceLocalityScalarWhereInput | PriceLocalityScalarWhereInput[]
    OR?: PriceLocalityScalarWhereInput[]
    NOT?: PriceLocalityScalarWhereInput | PriceLocalityScalarWhereInput[]
    id?: UuidFilter<"PriceLocality"> | string
    offerId?: UuidFilter<"PriceLocality"> | string
    dddCode?: StringFilter<"PriceLocality"> | string
    city?: StringNullableFilter<"PriceLocality"> | string | null
    priceAmountCents?: IntFilter<"PriceLocality"> | number
    priceCurrency?: StringFilter<"PriceLocality"> | string
    status?: EnumPriceLocalityStatusFilter<"PriceLocality"> | $Enums.PriceLocalityStatus
    createdAt?: DateTimeFilter<"PriceLocality"> | Date | string
  }

  export type OfferCreateWithoutEligibilityRulesInput = {
    id?: string
    name: string
    basePriceAmountCents: number
    basePriceCurrency?: string
    status?: $Enums.OfferStatus
    validFrom: Date | string
    validUntil?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    plan: PlanCreateNestedOneWithoutOffersInput
    localityPrices?: PriceLocalityCreateNestedManyWithoutOfferInput
  }

  export type OfferUncheckedCreateWithoutEligibilityRulesInput = {
    id?: string
    planId: string
    name: string
    basePriceAmountCents: number
    basePriceCurrency?: string
    status?: $Enums.OfferStatus
    validFrom: Date | string
    validUntil?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    localityPrices?: PriceLocalityUncheckedCreateNestedManyWithoutOfferInput
  }

  export type OfferCreateOrConnectWithoutEligibilityRulesInput = {
    where: OfferWhereUniqueInput
    create: XOR<OfferCreateWithoutEligibilityRulesInput, OfferUncheckedCreateWithoutEligibilityRulesInput>
  }

  export type OfferUpsertWithoutEligibilityRulesInput = {
    update: XOR<OfferUpdateWithoutEligibilityRulesInput, OfferUncheckedUpdateWithoutEligibilityRulesInput>
    create: XOR<OfferCreateWithoutEligibilityRulesInput, OfferUncheckedCreateWithoutEligibilityRulesInput>
    where?: OfferWhereInput
  }

  export type OfferUpdateToOneWithWhereWithoutEligibilityRulesInput = {
    where?: OfferWhereInput
    data: XOR<OfferUpdateWithoutEligibilityRulesInput, OfferUncheckedUpdateWithoutEligibilityRulesInput>
  }

  export type OfferUpdateWithoutEligibilityRulesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    basePriceAmountCents?: IntFieldUpdateOperationsInput | number
    basePriceCurrency?: StringFieldUpdateOperationsInput | string
    status?: EnumOfferStatusFieldUpdateOperationsInput | $Enums.OfferStatus
    validFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    validUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    plan?: PlanUpdateOneRequiredWithoutOffersNestedInput
    localityPrices?: PriceLocalityUpdateManyWithoutOfferNestedInput
  }

  export type OfferUncheckedUpdateWithoutEligibilityRulesInput = {
    id?: StringFieldUpdateOperationsInput | string
    planId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    basePriceAmountCents?: IntFieldUpdateOperationsInput | number
    basePriceCurrency?: StringFieldUpdateOperationsInput | string
    status?: EnumOfferStatusFieldUpdateOperationsInput | $Enums.OfferStatus
    validFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    validUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    localityPrices?: PriceLocalityUncheckedUpdateManyWithoutOfferNestedInput
  }

  export type OfferCreateWithoutLocalityPricesInput = {
    id?: string
    name: string
    basePriceAmountCents: number
    basePriceCurrency?: string
    status?: $Enums.OfferStatus
    validFrom: Date | string
    validUntil?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    plan: PlanCreateNestedOneWithoutOffersInput
    eligibilityRules?: EligibilityRuleCreateNestedManyWithoutOfferInput
  }

  export type OfferUncheckedCreateWithoutLocalityPricesInput = {
    id?: string
    planId: string
    name: string
    basePriceAmountCents: number
    basePriceCurrency?: string
    status?: $Enums.OfferStatus
    validFrom: Date | string
    validUntil?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    eligibilityRules?: EligibilityRuleUncheckedCreateNestedManyWithoutOfferInput
  }

  export type OfferCreateOrConnectWithoutLocalityPricesInput = {
    where: OfferWhereUniqueInput
    create: XOR<OfferCreateWithoutLocalityPricesInput, OfferUncheckedCreateWithoutLocalityPricesInput>
  }

  export type OfferUpsertWithoutLocalityPricesInput = {
    update: XOR<OfferUpdateWithoutLocalityPricesInput, OfferUncheckedUpdateWithoutLocalityPricesInput>
    create: XOR<OfferCreateWithoutLocalityPricesInput, OfferUncheckedCreateWithoutLocalityPricesInput>
    where?: OfferWhereInput
  }

  export type OfferUpdateToOneWithWhereWithoutLocalityPricesInput = {
    where?: OfferWhereInput
    data: XOR<OfferUpdateWithoutLocalityPricesInput, OfferUncheckedUpdateWithoutLocalityPricesInput>
  }

  export type OfferUpdateWithoutLocalityPricesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    basePriceAmountCents?: IntFieldUpdateOperationsInput | number
    basePriceCurrency?: StringFieldUpdateOperationsInput | string
    status?: EnumOfferStatusFieldUpdateOperationsInput | $Enums.OfferStatus
    validFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    validUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    plan?: PlanUpdateOneRequiredWithoutOffersNestedInput
    eligibilityRules?: EligibilityRuleUpdateManyWithoutOfferNestedInput
  }

  export type OfferUncheckedUpdateWithoutLocalityPricesInput = {
    id?: StringFieldUpdateOperationsInput | string
    planId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    basePriceAmountCents?: IntFieldUpdateOperationsInput | number
    basePriceCurrency?: StringFieldUpdateOperationsInput | string
    status?: EnumOfferStatusFieldUpdateOperationsInput | $Enums.OfferStatus
    validFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    validUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eligibilityRules?: EligibilityRuleUncheckedUpdateManyWithoutOfferNestedInput
  }

  export type PlanFeatureCreateManyPlanInput = {
    id?: string
    name: string
    quota: number
    unit: $Enums.FeatureUnit
    unlimited?: boolean
    createdAt?: Date | string
  }

  export type OfferCreateManyPlanInput = {
    id?: string
    name: string
    basePriceAmountCents: number
    basePriceCurrency?: string
    status?: $Enums.OfferStatus
    validFrom: Date | string
    validUntil?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PlanFeatureUpdateWithoutPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    quota?: IntFieldUpdateOperationsInput | number
    unit?: EnumFeatureUnitFieldUpdateOperationsInput | $Enums.FeatureUnit
    unlimited?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlanFeatureUncheckedUpdateWithoutPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    quota?: IntFieldUpdateOperationsInput | number
    unit?: EnumFeatureUnitFieldUpdateOperationsInput | $Enums.FeatureUnit
    unlimited?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlanFeatureUncheckedUpdateManyWithoutPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    quota?: IntFieldUpdateOperationsInput | number
    unit?: EnumFeatureUnitFieldUpdateOperationsInput | $Enums.FeatureUnit
    unlimited?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OfferUpdateWithoutPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    basePriceAmountCents?: IntFieldUpdateOperationsInput | number
    basePriceCurrency?: StringFieldUpdateOperationsInput | string
    status?: EnumOfferStatusFieldUpdateOperationsInput | $Enums.OfferStatus
    validFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    validUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eligibilityRules?: EligibilityRuleUpdateManyWithoutOfferNestedInput
    localityPrices?: PriceLocalityUpdateManyWithoutOfferNestedInput
  }

  export type OfferUncheckedUpdateWithoutPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    basePriceAmountCents?: IntFieldUpdateOperationsInput | number
    basePriceCurrency?: StringFieldUpdateOperationsInput | string
    status?: EnumOfferStatusFieldUpdateOperationsInput | $Enums.OfferStatus
    validFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    validUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eligibilityRules?: EligibilityRuleUncheckedUpdateManyWithoutOfferNestedInput
    localityPrices?: PriceLocalityUncheckedUpdateManyWithoutOfferNestedInput
  }

  export type OfferUncheckedUpdateManyWithoutPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    basePriceAmountCents?: IntFieldUpdateOperationsInput | number
    basePriceCurrency?: StringFieldUpdateOperationsInput | string
    status?: EnumOfferStatusFieldUpdateOperationsInput | $Enums.OfferStatus
    validFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    validUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EligibilityRuleCreateManyOfferInput = {
    id?: string
    ruleType: string
    ruleValue: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type PriceLocalityCreateManyOfferInput = {
    id?: string
    dddCode: string
    city?: string | null
    priceAmountCents: number
    priceCurrency?: string
    status?: $Enums.PriceLocalityStatus
    createdAt?: Date | string
  }

  export type EligibilityRuleUpdateWithoutOfferInput = {
    id?: StringFieldUpdateOperationsInput | string
    ruleType?: StringFieldUpdateOperationsInput | string
    ruleValue?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EligibilityRuleUncheckedUpdateWithoutOfferInput = {
    id?: StringFieldUpdateOperationsInput | string
    ruleType?: StringFieldUpdateOperationsInput | string
    ruleValue?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EligibilityRuleUncheckedUpdateManyWithoutOfferInput = {
    id?: StringFieldUpdateOperationsInput | string
    ruleType?: StringFieldUpdateOperationsInput | string
    ruleValue?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PriceLocalityUpdateWithoutOfferInput = {
    id?: StringFieldUpdateOperationsInput | string
    dddCode?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    priceAmountCents?: IntFieldUpdateOperationsInput | number
    priceCurrency?: StringFieldUpdateOperationsInput | string
    status?: EnumPriceLocalityStatusFieldUpdateOperationsInput | $Enums.PriceLocalityStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PriceLocalityUncheckedUpdateWithoutOfferInput = {
    id?: StringFieldUpdateOperationsInput | string
    dddCode?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    priceAmountCents?: IntFieldUpdateOperationsInput | number
    priceCurrency?: StringFieldUpdateOperationsInput | string
    status?: EnumPriceLocalityStatusFieldUpdateOperationsInput | $Enums.PriceLocalityStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PriceLocalityUncheckedUpdateManyWithoutOfferInput = {
    id?: StringFieldUpdateOperationsInput | string
    dddCode?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    priceAmountCents?: IntFieldUpdateOperationsInput | number
    priceCurrency?: StringFieldUpdateOperationsInput | string
    status?: EnumPriceLocalityStatusFieldUpdateOperationsInput | $Enums.PriceLocalityStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}