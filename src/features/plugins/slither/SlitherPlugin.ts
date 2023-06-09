import { DetectorPlugin } from '../DetectorPlugin';
import { CommandRunner } from '../../runner/CommandRunner';
import { Detectors, Vulnerabilities } from '../constants';
import { SlitherCommandOutput } from './types';
import { ResultDetection } from '../../../types/ResultDetection';

// unique map that grabs the default vulnerability type based on
// the specific tool name
const MAP_VULNERABILITY = {
  'unchecked-lowlevel': Vulnerabilities.UNCHECKED_RETURN,
  suicidal: Vulnerabilities.SELF_DESTRUCT,
};

export class SlitherPlugin extends DetectorPlugin {
  constructor() {
    super(new CommandRunner('slither %file% --json -'));
  }

  async run(filename: string): Promise<{ detectorName: string; json: string } | undefined> {
    try {
      const output = await this.runner.run(filename);

      if (!output) {
        throw new Error('Empty output');
      }

      const slitherObj: SlitherCommandOutput = JSON.parse(output);

      if (!slitherObj.success) {
        throw new Error('Error running slither');
      }

      const detectors = slitherObj.results?.detectors ?? [];

      const resOut: ResultDetection = {
        success: true,
        error: null,
        results: [],
        confidence: 0,
      };

      for (const d of detectors) {
        const elements = d.elements;

        const vulnerabilityFound = MAP_VULNERABILITY[d.check];
        if (!vulnerabilityFound) {
          continue;
        }

        for (const e of elements) {
          resOut.results.push({
            vulnerabilityType: vulnerabilityFound,
            name: e.name,
            description: d.description,
            lines: e?.source_mapping?.lines ?? [],
            sourceMap: {
              start: e?.source_mapping?.start ?? 0,
              length: e?.source_mapping?.length ?? 0,
            },
            severity: d.impact,
          });
        }
      }

      return { detectorName: Detectors.SLITHER, json: JSON.stringify(resOut) };
    } catch (err) {
      // console.error(err);
      return { detectorName: Detectors.SLITHER, json: `{ "success": false, "error": "${err}", "results": null }` };
    }
  }

  pluginName(): string {
    return Detectors.SLITHER;
  }
}
