import { DetectorPlugin } from '../DetectorPlugin';
import { CommandRunner } from '../runner/CommandRunner';
import { ScopeType, Vulnerabilities } from '../constants';
import { SlitherCommandOutput } from './types';
import { ResultDetection } from '../ResultDetection';

const MAP_VULNERABILITY = {
  suicidal: Vulnerabilities.SELF_DESTRUCT,
};

export class SlitherPlugin extends DetectorPlugin {
  constructor() {
    super(new CommandRunner('slither %file% --json -'));
  }

  async run(filename: string): Promise<string | undefined> {
    try {
      const output = await this.runner.run(filename);

      if (!output) {
        throw new Error('Empty output');
      }

      // TODO: need to format the JSON following a standard output format

      const slitherObj: SlitherCommandOutput = JSON.parse(output);

      if (!slitherObj.success) {
        throw new Error('Error running slither');
      }

      const detectors = slitherObj.results?.detectors ?? [];

      const resOut: ResultDetection = {
        success: true,
        error: null,
        results: [],
      };

      for (const d of detectors) {
        const elements = d.elements;

        const vulnerabilityFound = MAP_VULNERABILITY[d.check];
        if (!vulnerabilityFound) {
          continue;
        }

        for (const e of elements) {
          resOut.results.push({
            name: e.name,
            description: d.description,
            scope: e.type as ScopeType,
            sourceMapping: JSON.parse(JSON.stringify(e.source_mapping)),
            vulnerabilityType: vulnerabilityFound,
          });
        }
      }

      return JSON.stringify(resOut);
    } catch (err) {
      console.log(err);
      return `{ "success": false, "error": "${err}", "results": null }`;
    }
  }
}
