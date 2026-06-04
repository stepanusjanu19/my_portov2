import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, parse, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import process from 'node:process';

const projectRoot = process.cwd();
const errors = [];

function parseVersion(version) {
  const match = /^v?(\d+)\.(\d+)\.(\d+)/.exec(version.trim());
  return match ? match.slice(1).map(Number) : null;
}

function isSupportedNode(version) {
  const parsed = parseVersion(version);

  if (!parsed) {
    return false;
  }

  const [major, minor] = parsed;

  if (major === 20) {
    return minor >= 19;
  }

  if (major === 22) {
    return minor >= 12;
  }

  return major >= 24;
}

function findAncestorPackageProblems(root) {
  const problems = [];
  const { root: filesystemRoot } = parse(root);
  let current = dirname(root);

  while (current !== filesystemRoot) {
    const packageJsonPath = join(current, 'package.json');

    if (existsSync(packageJsonPath)) {
      const raw = readFileSync(packageJsonPath, 'utf8');

      if (!raw.trim()) {
        problems.push({
          path: packageJsonPath,
          reason: 'empty file',
        });
      } else {
        try {
          JSON.parse(raw);
        } catch (error) {
          problems.push({
            path: packageJsonPath,
            reason: error.message,
          });
        }
      }
    }

    current = dirname(current);
  }

  return problems;
}

if (!existsSync(join(projectRoot, 'angular.json')) || !existsSync(join(projectRoot, 'package.json'))) {
  errors.push(`Run this command from the Angular project root: ${projectRoot}`);
}

if (!isSupportedNode(process.version)) {
  errors.push(
    `Node ${process.version} is not supported by Angular 20.3. Use Node ^20.19.0, ^22.12.0, or ^24.0.0.`,
  );
}

const bunResult = spawnSync('bun', ['--version'], {
  encoding: 'utf8',
  shell: false,
});

if (bunResult.error || bunResult.status !== 0) {
  errors.push('Bun is required for this workflow. Install Bun and rerun `bun run doctor`.');
}

const ancestorProblems = findAncestorPackageProblems(resolve(projectRoot));

for (const problem of ancestorProblems) {
  errors.push(
    `Invalid ancestor package.json at ${problem.path}: ${problem.reason}. Run \`bun run fix:ancestor-package\` if the file is empty.`,
  );
}

if (errors.length > 0) {
  console.error('Runtime check failed:');

  for (const error of errors) {
    console.error(`- ${error}`);
  }

  process.exit(1);
}

console.log(`Runtime check passed. Node ${process.version}, Bun ${bunResult.stdout.trim()}.`);
