import { DetectorPlugin } from '../DetectorPlugin';
import { CommandRunner } from '../runner/CommandRunner';
import { Detectors, Vulnerabilities } from '../constants';

import { MythrilCommandOutput } from './types';
import { ResultDetection } from '../types/ResultDetection';

const MAP_VULNERABILITY = {
  '104': Vulnerabilities.UNCHECKED_RETURN,
  '106': Vulnerabilities.SELF_DESTRUCT,
};

export class MythrilPlugin extends DetectorPlugin {
  constructor() {
    super(new CommandRunner('myth a %file% -t 3 -o json'));
  }

  async run(filename: string): Promise<{ detectorName: string; json: string } | undefined> {
    try {
      const output = await this.runner.run(filename);

      if (!output) {
        throw new Error('Empty output');
      }

      // TODO: need to format the JSON following a standard output format
      const mythrilObj: MythrilCommandOutput = JSON.parse(output);

      if (!mythrilObj.success) {
        throw new Error('Error running slither');
      }

      const issues = mythrilObj.issues ?? [];

      const resOut: ResultDetection = {
        success: true,
        error: null,
        results: [],
        confidence: 0,
      };

      for (const issue of issues) {
        const vulnerabilityFound = MAP_VULNERABILITY[issue['swc-id']];
        if (!vulnerabilityFound) {
          continue;
        }

        const sourceMap = issue.sourceMap;

        let sourceMapStart = 0,
          sourceMapLength = 0;

        if (sourceMap && sourceMap !== ':::-') {
          const parts = sourceMap.split(':');

          sourceMapStart = parseInt(parts[0] ?? '0');
          sourceMapLength = parseInt(parts[1] ?? '0');
        }

        resOut.results.push({
          vulnerabilityType: vulnerabilityFound,
          name: issue.title,
          description: issue.description,
          lines: [issue.lineno],
          sourceFile: issue.filename,
          sourceMap: {
            start: sourceMapStart,
            length: sourceMapLength,
          },
          severity: issue.severity,
        });
      }

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
