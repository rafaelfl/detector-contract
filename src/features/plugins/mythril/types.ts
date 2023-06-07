export interface MythrilCommandOutput {
  success: boolean;
  error: string | null | undefined;
  issues: Array<MythrilIssue> | undefined;
}

export interface MythrilIssue {
  address: number;
  code: string;
  contract: string;
  description: string;
  filename: string;
  function: string;
  lineno: number;
  max_gas_used: number;
  min_gas_used: number;
  severity: string;
  sourceMap: string;
  'swc-id': string;
  title: string;
}
