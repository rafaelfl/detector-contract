import { IRunner } from './runner/IRunner';

export abstract class DetectorPlugin {
  protected runner: IRunner;

  constructor(runner: IRunner) {
    this.runner = runner;
  }

  abstract run(filename: string): Promise<{ detectorName: string; json: string } | undefined>;
  abstract pluginName(): string;
}
