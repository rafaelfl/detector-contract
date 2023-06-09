export const Vulnerabilities = {
  SELF_DESTRUCT: 'selfDestruct',
  UNCHECKED_RETURN: 'uncheckedReturn',
  OTHER: 'other',
} as const;

export type VulnerabilityType = (typeof Vulnerabilities)[keyof typeof Vulnerabilities];

export const Detectors = {
  SLITHER: 'slither',
  MYTHRIL: 'mythril',
} as const;

export type DetectorsType = (typeof Detectors)[keyof typeof Detectors];
