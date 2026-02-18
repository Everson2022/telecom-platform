export const FeatureUnit = {
  GB: 'GB',
  MIN: 'MIN',
  UNIT: 'UNIT',
} as const;

export type FeatureUnit = (typeof FeatureUnit)[keyof typeof FeatureUnit];
