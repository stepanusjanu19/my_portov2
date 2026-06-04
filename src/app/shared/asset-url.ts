import { environment } from '../../environments/environment';

function joinUrl(baseUrl: string, path: string): string {
  if (/^(https?:)?\/\//.test(path)) {
    return path;
  }

  const base = baseUrl.replace(/\/+$/, '');
  const cleanPath = path.replace(/^\/+/, '');

  return cleanPath ? `${base}/${cleanPath}` : base;
}

export function assetUrl(path = ''): string {
  return joinUrl(environment.assetBaseUrl, path);
}

export function siteUrl(path = ''): string {
  return joinUrl(environment.siteUrl, path);
}
