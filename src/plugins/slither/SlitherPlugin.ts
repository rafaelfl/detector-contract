import { DetectorPlugin } from '../DetectorPlugin';
import { CommandRunner } from '../runner/CommandRunner';
import { Detectors, Vulnerabilities } from '../constants';
import { SlitherCommandOutput } from './types';
import { ResultDetection } from '../types/ResultDetection';

const MAP_VULNERABILITY = {
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
            vulnerabilityType: vulnerabilityFound,
            name: e.name,
            description: d.description,
            lineNo: e?.source_mapping?.lines?.[0] ?? 0,
            sourceFile: e?.source_mapping?.filename_relative ?? '',
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
