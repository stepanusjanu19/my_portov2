import { isPlatformBrowser } from '@angular/common';
import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { assetUrl } from '../../shared/asset-url';

@Component({
  selector: 'app-social',
  standalone: true,
  imports: [],
  templateUrl: './social.component.html',
  styleUrl: './social.component.css'
})
export class SocialComponent implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  readonly assetUrl = assetUrl;

  ngOnInit(): void {
    if (this.isBrowser) {
      void import('flowbite').then(({ initFlowbite }) => initFlowbite());
    }
  }
}
