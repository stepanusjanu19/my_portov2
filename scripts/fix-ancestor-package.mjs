import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, parse, resolve } from 'node:path';
import process from 'node:process';

const projectRoot = resolve(process.cwd());
const projectPackageJson = join(projectRoot, 'package.json');
const { root: filesystemRoot } = parse(projectRoot);
let current = dirname(projectRoot);
const fixed = [];
const blocked = [];

while (current !== filesystemRoot) {
  const packageJsonPath = join(current, 'package.json');

  if (packageJsonPath !== projectPackageJson && existsSync(packageJsonPath)) {
    const raw = readFileSync(packageJsonPath, 'utf8');

    if (!raw.trim()) {
      writeFileSync(packageJsonPath, '{}\n');
      fixed.push(packageJsonPath);
    } else {
      try {
        JSON.parse(raw);
      } catch (error) {
        blocked.push(`${packageJsonPath}: ${error.message}`);
      }
    }
  }

  current = dirname(current);
}

if (fixed.length === 0 && blocked.length === 0) {
  console.log('No invalid ancestor package.json files found.');
  process.exit(0);
}

for (const file of fixed) {
  console.log(`Fixed empty ancestor package.json: ${file}`);
}

if (blocked.length > 0) {
  console.error('Found non-empty invalid ancestor package.json files. Fix these manually:');

  for (const file of blocked) {
    console.error(`- ${file}`);
  }

  process.exit(1);
}
