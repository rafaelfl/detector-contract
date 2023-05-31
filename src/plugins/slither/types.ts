export interface SlitherCommandOutput {
  success: boolean;
  error: string | null | undefined;
  results: SlitherCommandResults | undefined;
}

export interface SlitherCommandResults {
  detectors: SlitherResult[] | undefined;
}

export interface SlitherDetector {
  index: number;
  check: string;
  title: string;
  impact: string;
  confidence: string;
  wiki_url: string;
  description: string;
  exploit_scenario: string;
  recommendation: string;
}

export interface SlitherResult {
  check: string;
  confidence: string;
  impact: string;
  description: string;
  elements: SlitherResultElement[];
  additional_fields: { target: string; convention: string } | undefined;

  _ext_in_sync: boolean | undefined; // Extension: Used to check if source mappings are still valid.
}

export interface SlitherResultElement {
  name: string;
  source_mapping: SlitherSourceMapping;
  type: string;
  type_specific_fields: SlitherTypeSpecificFields | undefined;
  additional_fields: { target: string; convention: string } | undefined;
}

export interface SlitherTypeSpecificFields {
  parent: SlitherResultElement | undefined;
}

export interface SlitherSourceMapping {
  start: number;
  length: number;
  filename_absolute: string;
  filename_relative: string;
  filename_short: string;
  filename_used: string;
  lines: number[];
  starting_column: number;
  ending_column: number;

  _ext_source_hash: string | undefined; // Extension: Hash of mapped source code.
}
