export const DocumentType = {
  CPF: 'CPF',
  RG: 'RG',
  CNH: 'CNH',
  PASSPORT: 'PASSPORT',
} as const;

export type DocumentType = (typeof DocumentType)[keyof typeof DocumentType];
