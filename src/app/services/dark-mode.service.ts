import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  darkModeSignel = signal<string>('null');

  updateDarkMode() {
    const newMode = this.darkModeSignel() === 'dark' ? 'null' : 'dark';
    this.darkModeSignel.set(newMode);
  }

  constructor() {
    if (this.isBrowser) {
      this.darkModeSignel.set(
        JSON.parse(window.localStorage.getItem('darkModeSignel') ?? '"null"')
      );
    }

    effect(() => {
      if (!this.isBrowser) {
        return;
      }

      window.localStorage.setItem('darkModeSignel', JSON.stringify(this.darkModeSignel()));
      // Update the body class globally to reflect the mode change.
      if (this.darkModeSignel() === 'dark') {
        this.document.body.classList.add('dark');
      } else {
        this.document.body.classList.remove('dark');
      }
    });
  }
}
