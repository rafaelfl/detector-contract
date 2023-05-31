import util from 'util';
import child_process from 'child_process';

import { IRunner } from './IRunner';

export class CommandRunner implements IRunner {
  command: string;

  readonly maxBufferSize = 1024 * 1024 * 20; // 20MB stdout limit

  constructor(command: string) {
    this.command = command;
  }

  async run(filename: string): Promise<string | undefined> {
    const cmd = util.promisify(child_process.exec);

    const { stdout, stderr } = await cmd(this.command.replace('%file%', filename), {
      cwd: '.',
      maxBuffer: this.maxBufferSize,
    }).catch(e => e);

    // If we encountered an error, log it
    if (stderr) {
      throw new Error(stderr);
    }

    return stdout;
  }
}
