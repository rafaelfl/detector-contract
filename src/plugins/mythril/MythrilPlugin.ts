import { DetectorPlugin } from '../DetectorPlugin';
import { CommandRunner } from '../runner/CommandRunner';
import { Detectors, ScopeType, Vulnerabilities } from '../constants';

import { SlitherCommandOutput } from '../slither/types';
import { ResultDetection } from '../types/ResultDetection';

// const MAP_VULNERABILITY = {
//   suicidal: Vulnerabilities.SELF_DESTRUCT,
// };

export class MythrilPlugin extends DetectorPlugin {
  constructor() {
    super(new CommandRunner('myth a %file% -t 3'));
  }

  async run(filename: string): Promise<{ detectorName: string; json: string } | undefined> {
    try {
      const output = await this.runner.run(filename);

      if (!output) {
        throw new Error('Empty output');
      }

      console.log(' >>>>> output: ', output);

      // TODO: need to format the JSON following a standard output format
      // const slitherObj: SlitherCommandOutput = JSON.parse(output);

      // if (!slitherObj.success) {
      //   throw new Error('Error running slither');
      // }

      // const detectors = slitherObj.results?.detectors ?? [];

      const resOut: ResultDetection = {
        success: true,
        error: null,
        results: [],
      };

      // for (const d of detectors) {
      //   const elements = d.elements;

      //   const vulnerabilityFound = MAP_VULNERABILITY[d.check];
      //   if (!vulnerabilityFound) {
      //     continue;
      //   }

      //   for (const e of elements) {
      //     resOut.results.push({
      //       name: e.name,
      //       description: d.description,
      //       scope: e.type as ScopeType,
      //       sourceMapping: JSON.parse(JSON.stringify(e.source_mapping)),
      //       vulnerabilityType: vulnerabilityFound,
      //     });
      //   }
      // }

      return { detectorName: Detectors.MYTHRIL, json: JSON.stringify(resOut) };
    } catch (err) {
      console.error(' >>>> ', err);
      return { detectorName: Detectors.MYTHRIL, json: `{ "success": false, "error": "${err}", "results": null }` };
    }
  }

  pluginName(): string {
    return Detectors.MYTHRIL;
  }
}
