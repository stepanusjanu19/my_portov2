import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { assetUrl, siteUrl } from '../shared/asset-url';

interface SeoConfig {
  title: string;
  description: string;
  path: string;
  type?: string;
  image?: string;
}

const routeSeo: Record<string, SeoConfig> = {
  '/': {
    title: 'Stepanus Janu Adi Nugroho | Web & Backend Engineer',
    description:
      'Portfolio Stepanus Janu Adi Nugroho, Web and Backend Engineer focused on scalable APIs, Angular, Laravel, ASP.NET, and modern web systems.',
    path: '/',
  },
  '/about': {
    title: 'About | Stepanus Janu Adi Nugroho',
    description:
      'Professional background, work experience, and engineering profile of Stepanus Janu Adi Nugroho.',
    path: '/about',
  },
  '/tools': {
    title: 'Tools & Technologies | Stepanus Janu Adi Nugroho',
    description:
      'Technology stack, frameworks, databases, infrastructure, and tools used by Stepanus Janu Adi Nugroho.',
    path: '/tools',
  },
  '/projects': {
    title: 'Projects | Stepanus Janu Adi Nugroho',
    description:
      'Selected software engineering projects, backend systems, dashboards, and portfolio work by Stepanus Janu Adi Nugroho.',
    path: '/projects',
  },
  '/blogs': {
    title: 'Blogs | Stepanus Janu Adi Nugroho',
    description:
      'Articles and notes from Stepanus Janu Adi Nugroho powered by Contentful.',
    path: '/blogs',
  },
};

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  updateForUrl(url: string): void {
    const path = this.normalizePath(url);
    const config = routeSeo[path] ?? routeSeo['/'];
    const canonicalUrl = siteUrl(config.path);
    const imageUrl = config.image ?? assetUrl('og/portfolio-og.webp');

    this.title.setTitle(config.title);
    this.meta.updateTag({ name: 'description', content: config.description });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.meta.updateTag({ property: 'og:title', content: config.title });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
    this.meta.updateTag({ property: 'og:image', content: imageUrl });
    this.meta.updateTag({ property: 'og:type', content: config.type ?? 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: 'Stepanus Janu Portfolio' });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: config.title });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });
    this.meta.updateTag({ name: 'twitter:image', content: imageUrl });

    this.setCanonical(canonicalUrl);
    this.setStructuredData(config, canonicalUrl, imageUrl);
  }

  private normalizePath(url: string): string {
    const path = (url.split('?')[0] || '/').split('#')[0] || '/';

    if (path === '/home') {
      return '/';
    }

    return path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path;
  }

  private setCanonical(href: string): void {
    let link = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');

    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }

    link.setAttribute('href', href);
  }

  private setStructuredData(config: SeoConfig, canonicalUrl: string, imageUrl: string): void {
    this.document
      .querySelectorAll('script[data-seo-json-ld="true"]')
      .forEach((script) => script.remove());

    const schemas: object[] = [
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Stepanus Janu Portfolio',
        url: siteUrl('/'),
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Stepanus Janu Adi Nugroho',
        url: siteUrl('/'),
        image: assetUrl('Me.png'),
        jobTitle: 'Web and Backend Engineer',
        sameAs: [
          'https://github.com/stepanusjanu19',
          'https://www.linkedin.com/in/stepanus-janu-b54618241/',
          'https://www.instagram.com/stepanusjanu19/',
        ],
        knowsAbout: ['Angular', 'TypeScript', 'Laravel', 'ASP.NET', 'Backend Engineering'],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        name: config.title,
        description: config.description,
        url: canonicalUrl,
        image: imageUrl,
      },
    ];

    if (config.path === '/projects') {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Selected Projects',
        description: config.description,
        url: canonicalUrl,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'My Portfolio' },
          { '@type': 'ListItem', position: 2, name: 'E-Training' },
          { '@type': 'ListItem', position: 3, name: 'Swap Up' },
        ],
      });
    }

    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-seo-json-ld', 'true');
    script.textContent = JSON.stringify(schemas);
    this.document.head.appendChild(script);
  }
}
