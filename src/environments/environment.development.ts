import { generatedEnvironment } from './environment.generated';

export const environment = {
    production: false,
    siteUrl: generatedEnvironment.siteUrl || 'http://localhost:4200',
    assetBaseUrl: generatedEnvironment.assetBaseUrl || 'https://pub-378f4f115de84ed8bd3436f5a524d40d.r2.dev/x-xassets',
    contentful: {
        spaceId: generatedEnvironment.contentful.spaceId || 'xux148ew21yp',
        accessToken: generatedEnvironment.contentful.accessToken,
    },
};
