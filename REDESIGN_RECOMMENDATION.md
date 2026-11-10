# Portfolio Redesign & Rewrite Recommendation

**Target:** `myportov2.netlify.app` (repo `stepanusjanu19/my_portov2`)
**Date:** 2026-11-10
**Verdict (TL;DR):** Rewrite. Not because Angular is "wrong", but because the current site is a client-side SPA delivering ~908 KB of raw JS/CSS to render what is fundamentally a static, text-and-image document, its content is hard-coded and internally inconsistent, it leaks a specific residential location, and its visual identity is openly derived from someone else's site. The recommended target is **Astro (static output) + Tailwind v4 + typed content collections (MDX)**, deployed on Netlify or Cloudflare Pages, with images optimized at build time. A credible "stay on Angular" path is documented in §6.3 for comparison, along with the conditions under which it would be the right choice.

---

## 0. Method and evidence

| Source | What was done |
|---|---|
| Repo | Read every route component, card, service, config, script, and doc in `src/`, `scripts/`, `docs/`, `angular.json`, `netlify.toml`. |
| Build | `npm ci && npm run build` with production env vars (Angular 20.3, `outputMode: static`, 6 prerendered routes). |
| Lighthouse 12 | Mobile preset against the **local production build** for `/`, `/about`, `/projects`. |
| Live site | Fetched rendered content of `myportov2.netlify.app` for a content/UX pass. |

**Measurement caveat:** the audit sandbox could not open direct connections to `netlify.app` or `r2.dev`. Lighthouse ran against the local build, and the R2-hosted images failed to load. Real-world numbers will therefore be **worse** than those below: the missing images (avatar, project shots) would add bytes and probably shift the LCP element. Re-run §9 against production before trusting any absolute number.

---

## 1. Current-state audit

### 1.1 Stack and architecture

| Layer | Current | Notes |
|---|---|---|
| Framework | Angular 20.3 standalone + `@angular/ssr`, prerender (`outputMode: static`) | Modern Angular, but the app still uses `zone.js`, eager routes, and NgModule-era patterns (`*ngFor`, `[ngClass]`, `@HostListener('window:resize')`). |
| UI libs | Tailwind 3.4, Flowbite 2.5 (plugin + JS), Angular Material 20 (prebuilt theme), Angular CDK | Three overlapping UI systems. Material is used for **one** dialog. Flowbite JS is used for a navbar collapse that the component already re-implements with `isMenuOpen`. |
| Data | Contentful SDK (blog), TanStack Query (provided, **never used**), sessionStorage "map cache" | |
| Content | Hard-coded in component TS: `about.component.ts` (496 lines), `tech-tools.component.ts` (553 lines), `projects.component.ts` (241 lines), plus a **second divergent copy** of work history in `work-info.component.ts` | |
| Assets | 155 files / 12 MB in `src/assets/img`, mirrored to Cloudflare R2 `r2.dev` | Mixed: 197 `assetUrl()` (R2) refs vs. 71 hard-coded `assets/img/...` (Netlify) refs. |
| Tooling | Bun used as a task runner on top of Node, 3 tunnel dev configs, ancestor-`package.json` fixer script | High tooling surface for a single-author static site. |
| Tests | 19 spec files, 31 `it()` blocks, effectively all `should create` boilerplate | No real behavioural, visual, or a11y coverage. |

### 1.2 Measured performance (local prod build, Lighthouse mobile)

| Route | Perf | A11y | BP | SEO | FCP | LCP | TBT | CLS | Transfer |
|---|---|---|---|---|---|---|---|---|---|
| `/` | **74** | 82 | 96 | 92 | 2.5 s | **4.3 s** | 100 ms | **0.146** | 1,188 KiB |
| `/about` | **68** | 95 | 96 | 100 | 2.3 s | **6.2 s** | 280 ms | 0.001 | 1,345 KiB |
| `/projects` | 78 | 98 | 96 | 100 | 2.5 s | 4.3 s | 200 ms | 0.001 | 1,188 KiB |

Build output: **initial JS+CSS 907.6 KB raw / ~204 KB transfer** (`main` 616 KB raw). Lighthouse flags ~120 KiB of unused JS on `/`.

Root causes, in order of impact:

1. **LCP is a text node at 4.3 s.** For a prerendered page, text LCP should land near FCP. Here the whole `app-root` is wrapped in an `@reveal` animation that starts at `opacity: 0; filter: blur(10px)` and runs for **1500 ms**, and the header runs the same animation again. Prerendered HTML is shipped and then hidden. This one decision costs roughly 1.5–2 s of LCP.
2. **Render-blocking font chain.** Seven component stylesheets each `@import` Google Fonts CSS (two different families sets), so each route discovers fonts late via CSS→CSS→font chains. `styles.css` also declares `google.ttf` as `format('woff2')`, which is the wrong format hint.
3. **Heavy, unoptimized images.** `Party popper.svg` is 447 KB (an SVG wrapping a raster), `doodle.png` is 151 KB, and the memoji PNGs are 80–106 KB each, shown at 40–80 px. There are no `width`/`height` attributes (the `unsized-images` audit fails, and that drives the CLS), no `srcset`, and no AVIF.
4. **Eager everything.** All five routes are imported eagerly in `app.routes.ts`, so the Contentful SDK (+ axios, qs, lodash and other CommonJS deps that the build warns about), Material Dialog, CDK and TanStack ship to every visitor on `/`.
5. **Third-party at startup.** A Google Maps iframe on the home grid (typically several hundred KB of Maps JS in production; not measurable in this sandbox), a hot-linked custom cursor from `res.cloudinary.com/daily-now/...` (someone else's CDN), and Flowbite init.
6. **Layout computed in JS.** `HomeComponent` and `ProfileComponent` compute `col-span-*` classes from `window.innerWidth` on every resize. The prerender guesses 1024 px, so mobile users get a layout jump at hydration. This is a CLS source on `/`.

### 1.3 Accessibility (measured + manual)

- `button-name`: confetti and copy-to-clipboard buttons have no accessible name.
- `link-name`: every tech icon link in the `techs` card is an unlabeled `<a>` wrapping an image.
- `frame-title`: the Maps iframe has no `title`.
- `color-contrast` failures on `/about`; `heading-order` and `label-content-name-mismatch` on `/projects`.
- Nav markup is invalid: `<ul>` contains `<a>` that contains `<li>`. Screen readers announce a broken list.
- **`user-select: none` is applied to the entire app** (`app.component.ts`). Users cannot copy your name, email, or job history. Recruiters copy text, so this hurts both a11y and conversion.
- Alt text is wrong or meaningless: `alt="tech"` on a flag, `alt="default image"` / `"hover image"` on your avatar, and `alt=""` on interactive images.
- No `prefers-reduced-motion` handling for marquee, confetti, fireworks (4 s), shake animations, or the 1.5 s blur reveal.
- The custom cursor replaces the system cursor and, once Cloudinary fails, falls back inconsistently.
- The hover-swap avatar pattern is invisible to touch and keyboard users.

### 1.4 SEO and metadata

The current SEO work is decent: there are per-route titles and descriptions, canonical links, JSON-LD `Person`/`WebSite`/`ProfilePage`, a sitemap, and robots.txt. Problems:

- `environment.ts` falls back `siteUrl` to the **R2 asset URL** when `SITE_URL` is unset. Any build without that env var emits canonical/`og:url` pointing at `r2.dev`. Netlify sets it today, so this is a latent bug rather than an active one.
- `og:image` points at `og/portfolio-og.webp` on `r2.dev`. Several scrapers (LinkedIn, older Slack and Facebook crawlers) handle WebP OG images poorly. Use a 1200×630 PNG or JPG.
- The **blog has no post URLs.** Posts are cards that link off-site, so the blog contributes zero indexable content to your domain. It also only works if the Contentful token is present at build time, and the token is then baked into the client bundle (CDA tokens are read-only, but it is still unnecessary exposure).
- The `ItemList` JSON-LD for projects is hand-maintained and lists 3 of 6 projects.
- `/home` is both a 301 in `_redirects` and a prerendered route, which wastes a prerender.
- `r2.dev` is explicitly a development endpoint (your own `docs/cloudflare-r2-assets.md` says so): it has rate limits, no cache rules, and no WAF.

### 1.5 Privacy and security

- **The home page embeds a Google Map centred on a specific named boarding house ("Kos Kelapa Gading Jakarta Murah").** For a personal site, that publishes where you live to anyone, including scrapers. **Remove it now, independent of the redesign.** City-level ("Jakarta, Indonesia") is sufficient for recruiters.
- Email is printed in plain text and in a `mailto:` form with `method="post" enctype="text/plain"`, which is an unreliable pattern that many clients ignore. Expect spam harvesting. Prefer an obfuscated `mailto:` link or a form backend (Netlify Forms) with a honeypot.
- `bypassSecurityTrustResourceUrl` is used for a constant URL. That is harmless today, but it is a pattern to avoid.
- There is no CSP or security headers in `netlify.toml`.
- A third-party hot-linked cursor asset can be changed or removed by its owner at any time.

### 1.6 Content and UX

- **Identity.** The footer says "Inspired by nevflynn", and the home page is a close derivative of that bento layout (maps card, theme-toggle card, a leftover `spotify` property used as the layout class for unrelated cards). For a portfolio, the layout is part of the message. A borrowed layout signals "template user", not "engineer".
- **Positioning mismatch.** You present as a *Backend Engineer* ("crafting APIs", "scalable"), yet the home page spends most of its area on a map, a dark-mode toggle card, confetti, a GitHub logo, and a tech-icon wall. Nothing on the page shows backend depth: no architecture diagrams, throughput or latency numbers, data models, queue designs, or incident write-ups.
- **Inconsistent facts** (a recruiter-visible credibility problem):
  - iSeller: `about.component.ts` says *Junior Web Engineer, Nov 2024 – May 2025*; `work-info.component.ts` says *Web Engineer, Nov 2024 – Present*.
  - Charitas: "Charitas Group Palembang" vs. "Charitas Hospital Palembang"; role "Full Stack" vs. "Programmer".
  - "Geek Garden Software House" appears in one dataset and not the other; "Dewa Rangga Group" appears only in the other.
  - `work-info.component.ts`'s `work` array is **dead code**: the dialog renders the object passed in, so the second dataset only exists to drift.
  - 12 icon paths referenced in `work-info` don't exist (`dotnet.svg`, `sqlserver.svg`, `api.svg`, `team.svg`, …).
- **Copy quality.** "bring ideas to lifethrough", "then i am interesting for learn technology something like that", "Portofolio", and mixed-language months ("Okt", "Juli") all read as unedited. For a non-native-English market that is forgivable. For international remote roles it is costly.
- **Tech wall inflation.** 58 tools on `/tools` plus a marquee of skills, each with a paragraph copied from vendor descriptions ("PostgreSQL is a powerful, open source…"). This signals breadth without evidence and dilutes the backend story.
- **Gimmicks on primary actions.** Clicking your name, the flag, the resume download, the footer, the copy-email button, and the "star my project" link all fire confetti. The star link *hijacks navigation for 2 s* (`preventDefault` + `setTimeout`) to show an animation.
- **Projects page.** A `loadMore()`/`visibleProjects` pager exists but the template iterates all `projects`. `readMore` is a single boolean shared across all cards, so toggling one toggles all. Project entries have no problem statement, role, constraints, architecture, or outcome.
- The dark-mode signal stores the string `'null'` and binds it as a class, so the DOM literally renders `class="null"`. It defaults to light rather than respecting `prefers-color-scheme`, and the stored preference is applied after hydration, which causes a flash.

### 1.7 Maintainability

- Content-in-code means every copy edit is a TypeScript change plus a redeploy, and the data model is `Array<any>`, so there is no validation and no compile-time guarantee that a project has an image.
- 7.4 MB of the 12 MB image folder (46 of 155 files, including `mypicture.jpg` at 3.1 MB, `swapup.png` 1.2 MB, `icon.png` 1.2 MB) is **unreferenced by the app** but still copied into `dist/` by the `assets` glob.
- Dual asset origin (Netlify `/assets` and R2) with no rule about which asset lives where.
- Dependencies that do nothing: `@tanstack/angular-query-experimental`, most of Flowbite, most of Material.

---

## 2. Problem statement (what the rewrite must fix)

1. **Wrong rendering model for the content.** The content is static and changes monthly at most, but the site ships a hydrating SPA runtime to every visitor.
2. **The content has no schema.** It is duplicated and contradictory, so trust erodes.
3. **The page doesn't show the claimed expertise.** It's positioned as backend, but the evidence it shows is frontend decoration.
4. **Privacy leak** (residential map).
5. **Unowned identity** (derivative layout, borrowed cursor asset).
6. **No quality gates.** Nothing stops regressions in perf, a11y, or links.

Success criteria are in §9. They are written as hard budgets so the rewrite is falsifiable.

---

## 3. Target architecture options

### 3.1 Options considered

| Option | JS shipped (home) | Content model | Effort | Fit |
|---|---|---|---|---|
| **A. Astro 5 static + MDX content collections** | ~0–15 KB (islands only) | Zod-typed collections in repo | M (1–2 wk part-time) | **Best** |
| B. Angular 20, slimmed (zoneless, lazy routes, `@defer`, drop Material/Flowbite) | ~120–180 KB raw | JSON + TS interfaces | S–M | Good if Angular *is* the showcase |
| C. Next.js 15 static export | ~90–110 KB (React runtime) | MDX / CMS | M | Overkill. React runtime with no interactivity to justify it |
| D. Hugo / Eleventy | 0 KB | Markdown + front-matter | S | Fastest output, weakest component model and type safety |
| E. Keep Angular + bolt on fixes | ~600 KB raw (unchanged) | unchanged | S | Doesn't solve problems 1–2 |

### 3.2 Steelman for each serious contender

**A. Astro.** The site has, generously, three interactive widgets (theme toggle, mobile nav, copy-email). Astro renders everything to HTML at build and hydrates only the components marked `client:*`. You get typed content (Zod schemas reject a project without an image or with a malformed date at build time), first-class MDX for case studies, built-in `astro:assets` image optimization (AVIF/WebP, `srcset`, intrinsic sizes, so the CLS goes away), and View Transitions for SPA-like navigation without an SPA. It is also framework-agnostic: you can still write an island in Angular-style TS, Svelte, or vanilla.

**B. Slim Angular.** You already know it. It is listed on your CV, and a hiring manager for an Angular role may open devtools and judge you on it. Angular 20 *can* do well here: zoneless change detection (drops zone.js, ~35 KB), lazy `loadComponent` routes, `@defer (on viewport)` for below-the-fold cards, `NgOptimizedImage`, and incremental hydration. Rewriting in a framework you are not paid to use is arguably wasted learning budget.

**D. Hugo / 11ty.** This is the theoretical floor for bytes and build time, with no runtime and no hydration bugs. A backend engineer shipping a Go-built static site is on-brand.

### 3.3 Red team for each

**Against A (Astro):**
- It's a new tool, so you take a learning cost and a new dependency surface.
- "The portfolio isn't written in my CV's main frontend framework" can cut either way.
- MDX in-repo loses the Contentful editing UI. *Counter:* you are the only author, and Git is a better CMS for one engineer than a SaaS with a token in your bundle.
- Islands architecture can tempt you into scattering 5 frameworks. Mitigation: restrict islands to vanilla TS or a single framework.

**Against B (slim Angular):**
- Even optimally configured, Angular ships a runtime and hydration for content that never changes. You will spend effort *fighting* the framework's defaults (zone removal, defer blocks, hydration mismatches from `window` checks) to approach what Astro does with no configuration.
- The current bugs (`class="null"`, JS-computed grid, dead datasets) are pattern problems, not version problems. A "slim Angular" rewrite must still be a rewrite, so you pay rewrite cost either way.
- Your stated positioning is *backend*. The frontend framework choice is a weak signal for that audience, while the *quality of the output* (speed, a11y, content) is a strong one.

**Against D (Hugo/11ty):**
- The component model is template partials: weaker typing and refactoring, and theming systems that fight Tailwind.
- Interactive islands become bespoke `<script>` sprinkles.

### 3.4 Recommendation

**Option A (Astro)**, unless one of these is true, in which case choose **Option B**:
- You are actively applying for **Angular-specific** frontend or full-stack roles, *and* you want the site itself to be the Angular code sample.
- You are unwilling to own a second frontend toolchain.

The decision is not "which framework is best". It is "**what minimizes runtime and maintenance cost per unit of credibility**". For a static, single-author, backend-positioned site, that is a static-first generator with typed content.

---

## 4. Target architecture (Option A detail)

```
my_portov3/
├─ astro.config.mjs          # output: 'static', site: 'https://<your-domain>'
├─ src/
│  ├─ content/
│  │  ├─ config.ts           # Zod schemas: experience, project, post, skill
│  │  ├─ experience/*.md     # ONE source of truth for work history
│  │  ├─ projects/*.mdx      # case studies (problem → design → result)
│  │  └─ posts/*.mdx         # blog, each with its own URL
│  ├─ components/            # .astro (zero JS) + 2–3 islands (theme, nav, copy)
│  ├─ layouts/Base.astro     # meta, OG, JSON-LD generated from content
│  ├─ pages/
│  │  ├─ index.astro
│  │  ├─ about.astro         # merges current About + Tools
│  │  ├─ projects/index.astro, [slug].astro
│  │  ├─ writing/index.astro, [slug].astro, rss.xml.ts
│  │  └─ og/[slug].png.ts    # build-time OG images (satori / @vercel/og)
│  └─ assets/                # source images → optimized at build
├─ public/                   # favicon, resume.pdf, robots.txt
└─ tests/                    # Playwright + axe; Lighthouse CI config
```

**Content schema (sketch):**

```ts
// src/content/config.ts
const experience = defineCollection({
  type: 'content',
  schema: z.object({
    company: z.string(),
    role: z.string(),
    start: z.coerce.date(),
    end: z.coerce.date().nullable(),        // null = present, single truth
    location: z.string(),                    // city-level only
    employment: z.enum(['full-time','contract','freelance','remote']),
    stack: z.array(reference('skills')),     // FK, not free text
    highlights: z.array(z.string()).max(5),  // impact bullets, quantified
  }),
});
const projects = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    summary: z.string().max(160),
    cover: image(),                          // build fails if missing
    role: z.string(),
    period: z.object({ start: z.coerce.date(), end: z.coerce.date().nullable() }),
    stack: z.array(reference('skills')),
    links: z.object({ repo: z.string().url().optional(), live: z.string().url().optional() }),
    metrics: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
    featured: z.boolean().default(false),
    confidential: z.boolean().default(false), // client work: describe, don't link
  }),
});
```

This turns every inconsistency listed in §1.6 into a **build error** instead of a credibility leak.

**Interactivity budget:** theme toggle (inline `<script>` in `<head>` to avoid the flash), mobile nav (`<details>` or ~1 KB TS), copy email (~0.5 KB). Confetti, if kept, is lazy-imported on explicit click only and disabled under `prefers-reduced-motion`.

**Assets:** keep R2 *only* for large downloadables (resume, videos) behind a **custom domain**. Everything rendered on the page goes through `astro:assets`, so it is hashed, immutable, AVIF/WebP with `srcset`, and has intrinsic dimensions.

**Hosting:** Netlify (current) or Cloudflare Pages. Add `_headers` with a strict CSP (`default-src 'self'`; allow-list analytics only), `Cache-Control: public, max-age=31536000, immutable` for hashed assets, HSTS, `Referrer-Policy`, and `Permissions-Policy`. Buy a domain (~$10/yr). `*.netlify.app` costs you SEO equity and looks temporary.

---

## 5. Design and UX direction

### 5.1 Positioning first, pixels second

Write a one-line thesis and design around it. For example: *"Backend engineer who builds reliable APIs and data pipelines for commerce and healthcare systems."* Every element on the home page must either support that sentence or go.

### 5.2 Information architecture (5 routes → 4, deeper)

| Route | Purpose | Replaces |
|---|---|---|
| `/` | Thesis, 3 featured case studies, current role, contact CTA | Bento grid |
| `/projects` + `/projects/[slug]` | Case studies: context → constraints → architecture (diagram) → decisions/trade-offs → outcome (numbers) | Card list with vendor blurbs |
| `/writing` + `/writing/[slug]` | Your own posts on your domain, with RSS | Off-site Contentful cards |
| `/about` | Narrative, experience timeline (single source), **grouped** skills with proficiency/evidence, education, resume | About + Tools |

Drop `/tools` as a standalone page. Fold it into `/about` as roughly 12–15 skills grouped by *Languages / Backend & data / Infra & ops*, each linked to the project that proves it.

### 5.3 Visual system

- **Own it.** Drop the nevflynn-derived bento. A strong default for a backend engineer is an editorial, typographic layout: a single column (max ~68ch) for prose, a 12-column grid for case-study diagrams, generous whitespace, and one accent colour.
- **Typography.** Two self-hosted variable fonts at most (e.g. a grotesk for UI/body plus a mono for code and metrics), subset, `woff2`, `font-display: swap`, preloaded. Drop Playwrite as body/nav text: script faces at 18 px in navigation hurt legibility. Keep it as a logo wordmark only if you love it.
- **Tokens.** Define colour, space, and radius tokens as CSS custom properties. Light/dark via `prefers-color-scheme` plus a manual override stored in `localStorage`, applied before first paint.
- **Motion.** Use motion for meaning, not decoration: View Transitions between list and detail, and subtle hover states. Everything gated behind `prefers-reduced-motion: no-preference`. No content is ever hidden at load.
- **Personality, in budget.** Keep *one* playful touch (e.g. the greeting or the memoji) on the home hero, sized and optimized. Remove confetti from navigation and downloads.
- **Diagrams.** Case studies should carry architecture diagrams (Mermaid at build time → inline SVG, or Excalidraw exports). This is the single highest-signal visual element for a backend portfolio.

### 5.4 Content rewrite checklist

- Reconcile work history into one dataset and confirm every date and title against your actual CV and LinkedIn.
- Rewrite each role as 3–5 *impact* bullets in the form *verb + system + measurable result* (for example: "Built Redis-backed job queue for a laundry-retail API handling Stripe/Shopify/AusPost webhooks; cut sync failures from X to Y").
- Mark client or confidential work explicitly (`confidential: true`). Describe it, but don't link it.
- Copy-edit everything in one language (English for an international audience), or ship `id`/`en` deliberately with Astro i18n routing.
- Use real alt text: "Portrait of Stepanus Janu", not "default image".

---

## 6. Migration plan

### 6.1 Phase 0: hotfixes on the current site (do this week, ~2 h)

These are independent of the rewrite and remove live risk:

1. Remove the Google Maps card. Replace it with "Based in Jakarta, Indonesia".
2. Remove the global `user-select: none`.
3. Remove the `@reveal` blur animation on `app-root`/`app-header` (expected LCP gain: ~1.5 s).
4. Stop hot-linking the Cloudinary cursor.
5. Change the `siteUrl` fallback in `environment.ts` to `https://myportov2.netlify.app`, not the R2 URL.
6. Add `aria-label`s to icon buttons and links, and a `title` on any remaining iframe.
7. Fix the `iSeller` date/title inconsistency.

### 6.2 Phase 1–4: rewrite (Option A)

| Phase | Scope | Exit criteria |
|---|---|---|
| **1. Content** (2–3 evenings) | Extract all data from `about/`, `work-info/`, `projects/`, `tech-tools/` TS into `experience/*.md`, `projects/*.mdx`, `skills.json`; reconcile conflicts; rewrite copy; write 2 case studies in full. | Zod schema validates; you have signed off on every fact. |
| **2. Skeleton** (2 evenings) | New repo or `v3/` branch; Astro + Tailwind v4; Base layout, SEO component (JSON-LD generated from content), 4 routes, theme/nav/copy islands. | Lighthouse ≥ 95 in all categories on a placeholder build; axe: 0 violations. |
| **3. Design** (3–4 evenings) | Tokens, typography, home hero, case-study template with diagrams, about timeline, writing template, OG image generation. | Visual review on 360 px / 768 px / 1440 px, light and dark. |
| **4. Cutover** (1 evening) | Custom domain, 301s from old paths (`/tools → /about#skills`, `/blogs → /writing`), submit sitemap to Search Console, archive Angular repo with a README pointer. | Old URLs 301 correctly; Search Console shows no coverage errors after 7 days. |

Keep the Angular repo deployed at its current URL until Phase 4 passes. Cutover is a DNS and redirect change, so rollback is reverting it.

### 6.3 Alternative: Option B (slim Angular) concrete changes

If you choose to stay on Angular, the minimum to make it defensible:

- `provideZonelessChangeDetection()`; remove `zone.js` from polyfills.
- Lazy routes via `loadComponent`; `@defer (on viewport)` for every below-the-fold card.
- Remove Angular Material (replace the dialog with native `<dialog>`), Flowbite JS, and TanStack Query.
- Lazy-load the Contentful client only on `/blogs`, or better, fetch at build time into JSON and drop the SDK from the bundle.
- `NgOptimizedImage` with explicit `width`/`height` and `priority` on the hero.
- Replace JS grid-class computation with Tailwind responsive classes (`col-span-2 md:col-span-1`).
- Move all content to typed JSON under `src/content/` with interfaces, one dataset per entity.
- Self-host fonts and delete all seven `@import url(fonts.googleapis…)`.
- Targets: initial JS < 170 KB raw, LCP < 2.0 s, CLS < 0.05. If you can't hit these within the Phase 2 time box, that is your evidence to switch to Option A.

---

## 7. Risks and trade-offs

| Risk | Type | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| Rewrite stalls half-done (common for personal sites) | Time | High | Medium | Phase 0 first so the live site is safe; time-box each phase; ship Phase 2 even with placeholder design. |
| Content work is underestimated | Time | High | High | Content is Phase 1 *on purpose*. Design without real copy is decoration. |
| Losing Contentful editing UI | Workflow | Medium | Low | Single author, so Git + MDX is sufficient. If you need a UI later, add a Git-based CMS (Decap/Keystatic) with no runtime token. |
| SEO dip on domain/URL change | SEO | Medium | Low–Med | 301 map, sitemap resubmit, keep old host redirecting for ≥ 6 months. Current organic traffic is likely small, so the downside is bounded. |
| New framework learning curve | Cost | Medium | Low | Astro templates are HTML-first; the surface you need is ~5 APIs. |
| Over-minimalism reads as "generic template" | Brand | Medium | Medium | Personality via content (diagrams, real numbers, writing voice), plus one custom illustrative element. |
| Publishing client/hospital system details | Legal/Security | Medium | High | `confidential` flag; no screenshots of PHI or internal dashboards; check NDAs before writing case studies about Charitas, iSeller, or the agency work. |
| r2.dev rate-limit or deprecation | Availability | Low–Med | Medium | Move page assets into the build; R2 only behind a custom domain. |

**Core trade-off:** Option A minimizes runtime cost and maximizes content rigor, at the price of leaving your CV's frontend framework. Option B preserves framework signalling, at the price of permanently fighting defaults to reach a lower performance ceiling. Option D minimizes bytes but costs component ergonomics and type-safety.

---

## 8. What I'm deliberately *not* recommending

- **A headless CMS at runtime.** It adds a token, a network dependency, and a failure mode for content you edit monthly.
- **SSR or edge functions.** There is nothing per-request to compute.
- **Analytics-heavy tooling.** If you want numbers, use a cookie-less, script-light option (Plausible, Umami, or Cloudflare Web Analytics) and measure exactly two things: resume downloads and contact clicks.
- **A 3D/WebGL hero.** It's high cost and low signal for a backend positioning.

---

## 9. Proof requirements (how to validate the rewrite)

Treat these as CI gates, not aspirations. The rewrite is "done" only when all pass on production.

| Gate | Tool | Budget |
|---|---|---|
| Performance | Lighthouse CI (mobile, 3 runs, median) on `/`, `/projects/[featured]`, `/about`, `/writing/[slug]` | Perf ≥ 95, LCP ≤ 1.8 s, CLS ≤ 0.05, TBT ≤ 50 ms |
| Bytes | `size-limit` or LHCI resource budgets | Home: JS ≤ 15 KB gz, CSS ≤ 15 KB gz, total ≤ 300 KB incl. hero image |
| Accessibility | `@axe-core/playwright` on every route, light + dark | 0 violations (serious/critical); manual keyboard-only and VoiceOver/NVDA pass on nav + contact |
| Reduced motion | Playwright with `reducedMotion: 'reduce'` | No animation > 0 ms; content visible at first paint |
| SEO | Lighthouse SEO + Google Rich Results Test on `/` and one case study | SEO = 100; valid `Person` + `Article` JSON-LD |
| Social preview | opengraph.xyz / LinkedIn Post Inspector | Correct 1200×630 image and title per page |
| Links | `lychee` in CI | 0 broken internal or external links |
| Content integrity | Astro content schema (Zod) at build | Build fails on missing image, bad date, unknown skill reference |
| Real-user | CrUX / Search Console Core Web Vitals after 28 days | All URLs "Good" |
| Comparison | Lighthouse on current prod vs new prod, same device profile, recorded in `docs/benchmarks.md` | New ≥ current on every metric |

**Experiment to settle A vs B empirically (≤ 1 day):** build *only the home page* both ways (Astro, and Angular with the §6.3 changes) with identical content and images. Run Lighthouse CI 5× each on the same machine and compare initial JS bytes, LCP, and hydration TBT. If Angular gets within 10% on LCP and stays under 170 KB JS, Option B is defensible. Otherwise the data picks A.

---

## 10. Open questions for you

1. **Target audience:** international remote backend roles, Indonesian market, or freelance clients? This drives language, tone, and how much client work you can show.
2. **Framework signalling:** do you want the portfolio's *code* to be a work sample for Angular specifically?
3. **Domain:** are you willing to buy one? It changes the cutover plan and the SEO upside.
4. **Confidentiality:** which past projects (hospital HIS/BPJS, queue dashboard, iSeller) can you describe publicly, and at what level of detail?
5. **Blog:** do you have 2–3 posts you'd actually publish on your own domain? If not, launch without `/writing` rather than with an empty section.
