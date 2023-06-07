export interface IRunner {
  run(filename: string): Promise<string | undefined>;
}
