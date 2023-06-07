import { IPolicyPlugin } from './IPolicyPlugin';
import { DetectorPlugin } from '../../plugins/DetectorPlugin';

export class SimplePluginPolicy extends IPolicyPlugin {
  pluginsList: Array<DetectorPlugin>;

  constructor(pluginsList: Array<DetectorPlugin>) {
    super();
    this.pluginsList = pluginsList;
  }

  next(): DetectorPlugin | undefined {
    return this.pluginsList.pop();
  }

  empty(): boolean {
    return this.pluginsList.length === 0;
  }
}
