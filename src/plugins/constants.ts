export const Vulnerabilities = {
  SELF_DESTRUCT: 'selfDestruct',
  OTHER: 'other',
} as const;

export type VulnerabilityType = (typeof Vulnerabilities)[keyof typeof Vulnerabilities];

export const Scope = {
  VARIABLE: 'variable',
  CONTRACT: 'contract',
  FUNCTION: 'function',
  ENUM: 'enum',
  STRUCT: 'struct',
  EVENT: 'event',
  NODE: 'node',
  PRAGMA: 'pragma',
  FILE: 'file',
  PRETTY_TABLE: 'pretty_table',
  OTHER: 'other',
} as const;

export type ScopeType = (typeof Scope)[keyof typeof Scope];
