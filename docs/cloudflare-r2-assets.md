# Cloudflare R2 Asset CDN

Use Cloudflare R2 as the portfolio asset host. A custom domain is recommended for production, but this project can use the Cloudflare-managed `r2.dev` Public Development URL until a custom domain is available.

Required runtime contract:

- `siteUrl`: portfolio page origin used for canonical URLs, sitemap URLs, and `og:url`.
- `assetBaseUrl`: Cloudflare R2 public bucket URL used for images, icons, downloads, and `og:image`.

Netlify build environment variables:

- `SITE_URL`: portfolio origin, for example `https://calm-stardust-fcbcf5.netlify.app`.
- `ASSET_BASE_URL`: Cloudflare R2 public bucket URL. For now, use the generated `r2.dev` URL copied from the bucket settings, for example `https://<generated>.r2.dev`.
- `CONTENTFUL_SPACE_ID`: Contentful space id.
- `CONTENTFUL_ACCESS_TOKEN`: Contentful Delivery API token. Keep this in Netlify environment variables, not in source.

Temporary `r2.dev` setup:

1. Create an R2 bucket named `portfolio-assets` with Standard storage.
2. Upload assets using the same keys currently referenced by the app, for example `Me.png`, `laravel.svg`, `skills/python.svg`, and `og/portfolio-og.webp`.
3. In the bucket Settings page, enable Public Development URL.
4. Confirm public access by typing `allow`.
5. Copy the generated Public Bucket URL and set it as `ASSET_BASE_URL` in Netlify.
6. Verify an uploaded object directly, for example `<ASSET_BASE_URL>/og/portfolio-og.webp`.

Production recommendation:

1. Add a custom domain to Cloudflare when one is available.
2. Point `ASSET_BASE_URL` to that custom domain.
3. Disable `r2.dev` public access after the custom domain works.
4. Add a Cloudflare cache rule for the custom asset domain with long browser and edge TTLs for immutable assets.

Do not use the asset domain as canonical. Canonical URLs must always use the portfolio page domain.

Do not create a CNAME pointing to the `r2.dev` URL. Cloudflare documents `r2.dev` as a development URL and says caching, WAF, bot management, and related controls require a custom domain.
