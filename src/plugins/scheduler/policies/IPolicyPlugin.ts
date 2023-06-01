import { DetectorPlugin } from '../../DetectorPlugin';

export abstract class IPolicyPlugin {
  abstract next(): DetectorPlugin | undefined;
  abstract empty(): boolean;
}
