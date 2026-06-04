import { CommonModule, isPlatformBrowser } from '@angular/common';
import { DarkModeService } from './services/dark-mode.service';
import { Component, Renderer2, ElementRef, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { animate, style, transition, trigger } from '@angular/animations';
import { filter } from 'rxjs';
import { SeoService } from './services/seo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('reveal', [
      transition(':enter', [
        style({
          opacity: 0,
          filter: 'blur(10px)',
          transform: 'translateX(-30px)'
        }),
        animate('1500ms cubic-bezier(0.5, 0, 0.5, 1)',
          style({
            opacity: 1,
            filter: 'blur(0)',
            transform: 'translateX(0)'
          })
        )
      ])
    ])
  ]
})

export class AppComponent implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly router = inject(Router);
  private readonly seo = inject(SeoService);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit(): void {
    this.seo.updateForUrl(this.router.url);
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => this.seo.updateForUrl(event.urlAfterRedirects));

    if (this.isBrowser) {
      void import('flowbite').then(({ initFlowbite }) => initFlowbite());
    }

    this.renderer.setStyle(this.el.nativeElement, 'user-select', 'none');
    this.renderer.setStyle(this.el.nativeElement, '-webkit-user-select', 'none');
    this.renderer.setStyle(this.el.nativeElement, '-moz-user-select', 'none');
    this.renderer.setStyle(this.el.nativeElement, '-ms-user-select', 'none');

  }
  darkModeService: DarkModeService = inject(DarkModeService);
}
