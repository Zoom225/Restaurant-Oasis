import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';

// Angular 22 uses Vitest and runs once outside a TTY. Keep compatibility with
// the conventional `npm run test -- --run` verification command.
const forwardedArguments = process.argv.slice(2).filter((argument) => argument !== '--run');
const angularCli = resolve('node_modules/@angular/cli/bin/ng.js');
const result = spawnSync(
  process.execPath,
  [angularCli, 'test', '--watch=false', ...forwardedArguments],
  { stdio: 'inherit' },
);

process.exit(result.status ?? 1);
