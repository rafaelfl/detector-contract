import { VulnerabilityType } from '../constants';

export interface ResultDetection {
  readonly success: boolean;
  readonly error: string | null;
  readonly results: Array<{
    vulnerabilityType: VulnerabilityType;
    name: string;
    description: string;
    lines: Array<number>;
    sourceFile: string;
    sourceMap: {
      start: number;
      length: number;
    };
    severity: string;
  }>;
}
