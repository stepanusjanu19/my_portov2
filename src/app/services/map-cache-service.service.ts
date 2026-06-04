import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapCacheService {

  private cacheKey = 'mapDetails';
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  constructor() { }

  getMapDetails(): any {
    if (!this.isBrowser) {
      return null;
    }

    const cachedData = sessionStorage.getItem(this.cacheKey);
    return cachedData ? JSON.parse(cachedData) : null;
  }

  setMapDetails(data: any): void {
    if (!this.isBrowser) {
      return;
    }

    sessionStorage.setItem(this.cacheKey, JSON.stringify(data));
  }

  clearMapDetails(): void {
    if (!this.isBrowser) {
      return;
    }

    sessionStorage.removeItem(this.cacheKey);
  }
}
