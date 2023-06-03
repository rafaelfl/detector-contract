import { VulnerabilityType } from '../constants';

export interface ResultDetection {
  success: boolean;
  error: string | null;
  results: Array<{
    vulnerabilityType: VulnerabilityType;
    name: string;
    description: string;
    lineNo: number;
    sourceFile: string;
    sourceMap: {
      start: number;
      length: number;
    };
    severity: string;
  }>;
}
