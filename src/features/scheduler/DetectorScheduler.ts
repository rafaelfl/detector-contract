import { IPolicyPlugin } from './policies/IPolicyPlugin';

export class DetectorScheduler {
  policy: IPolicyPlugin;
  debug: boolean;

  constructor(policy: IPolicyPlugin, debug = false) {
    this.policy = policy;
    this.debug = debug;
  }

  async execute(filename: string) {
    const resultsScheduler: Array<{ detectorName: string; json: string }> = [];

    while (!this.policy.empty()) {
      const nextPlugin = this.policy.next();

      if (!nextPlugin) {
        continue;
      }

      if (this.debug) {
        console.log(` ::::: Start scanning with plugin '${nextPlugin?.pluginName()}'...`);
      }

      const res = await nextPlugin.run(filename);

      if (res) {
        resultsScheduler.push({ detectorName: res.detectorName, json: res.json });
      }
    }

    return resultsScheduler;
  }
}
