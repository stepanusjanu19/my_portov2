import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputPath = resolve(__dirname, '../src/environments/environment.generated.ts');

const generatedEnvironment = {
  siteUrl: process.env.SITE_URL ?? '',
  assetBaseUrl: process.env.ASSET_BASE_URL ?? '',
  contentful: {
    spaceId: process.env.CONTENTFUL_SPACE_ID ?? '',
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN ?? '',
  },
};

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(
  outputPath,
  `export const generatedEnvironment = ${JSON.stringify(generatedEnvironment, null, 2)} as const;\n`,
);
