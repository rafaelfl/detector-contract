import { DetectorPlugin } from './DetectorPlugin';
import { CommandRunner } from './runner/CommandRunner';

export class SlitherPlugin extends DetectorPlugin {
  constructor() {
    super(new CommandRunner('slither %file% --json -'));
  }

  async run(filename: string): Promise<string | undefined> {
    try {
      const output = await this.runner.run(filename);

      // TODO: need to format the JSON following a standard output format

      return output;
    } catch (err) {
      console.log(err);
      return `{ "success": false, "error": "Error processing request", "results": null }`;
    }
  }
}
