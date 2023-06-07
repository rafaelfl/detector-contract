import { DetectorPlugin } from '../../plugins/DetectorPlugin';

export abstract class IPolicyPlugin {
  abstract next(): DetectorPlugin | undefined;
  abstract empty(): boolean;
}
