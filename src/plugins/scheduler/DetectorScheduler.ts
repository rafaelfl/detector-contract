import { IPolicyPlugin } from './policies/IPolicyPlugin';

export class DetectorScheduler {
  policy: IPolicyPlugin;

  constructor(policy: IPolicyPlugin) {
    this.policy = policy;
  }

  async execute(filename: string) {
    const resultsScheduler: Array<{ detectorName: string; json: string }> = [];

    while (!this.policy.empty()) {
      const res = await this.policy.next()?.run(filename);

      if (res) {
        resultsScheduler.push({ detectorName: res.detectorName, json: res.json });
      }
    }

    return resultsScheduler;
  }
}
