import * as core from '@actions/core';
import {searchReplace} from './searchReplace';
async function run(): Promise<void> {
  try {
    const options = {
      files: core.getInput('include'),
      from: core.getInput('from'),
      to: core.getInput('to'),
    };

    core.debug(`options: $JSON.stringify(options)`);
    core.info;

    const results = await searchReplace(options);
    core.setOutput('modifiedFiles', results);

    let filesChanged = 0;
    for (const result of results) {
      if (result.hasChanged) {
        filesChanged++;
        core.info(
          `File: ${result.file} was modified ${result.numReplacements} times`,
        );
      }
    }
    // eslint-disable-next-line i18n-text/no-en
    core.info(`Total files modified ${filesChanged}`);
  } catch (error: unknown) {
    const err = error as Error;
    core.setFailed(err.message);
  }
}

run();
