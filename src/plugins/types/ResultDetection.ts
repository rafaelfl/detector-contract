import { ScopeType, VulnerabilityType } from '../constants';

interface SourceMapping {
  start: number;
  length: number;
  filename_absolute: string;
  filename_relative: string;
  filename_short: string;
  filename_used: string;
  lines: number[];
  starting_column: number;
  ending_column: number;
}

export interface ResultDetection {
  success: boolean;
  error: string | null;
  results: Array<{
    vulnerabilityType: VulnerabilityType;
    name: string;
    description: string;
    sourceMapping: SourceMapping;
    scope: ScopeType;
  }>;
}
