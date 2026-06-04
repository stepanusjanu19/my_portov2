# Runtime Workflow

Use Bun as the command runner for local development, while Angular CLI still runs on Node.js. Angular 20.3 requires Node `^20.19.0`, `^22.12.0`, or `^24.0.0`.

Recommended local flow:

```bash
cd /Users/mac/Documents/project/my_/portofolio/my_portov2
node -v
bun run doctor
bun run fix:ancestor-package
bun run start:bun
```

If your default `node -v` is still below Angular's minimum, switch Node with `nvm`, `fnm`, `asdf`, or run the Bun workflow through a temporary Node binary:

```bash
npx -p node@22.12.0 bun run doctor
npx -p node@22.12.0 bun run start:bun
```

Ngrok development flow:

```bash
npx -p node@22.12.0 bun run start:ngrok:bun
ngrok http 4200
```

The ngrok workflow uses Angular's `serve.ngrok` configuration, which allows `.ngrok-free.app` only for the development server. Production builds and Netlify deploys do not use this allowed host.

Cloudflared Quick Tunnel development flow:

```bash
npx -p node@22.12.0 bun run start:cloudflare:bun
cloudflared tunnel --url http://127.0.0.1:4200
```

The Cloudflared workflow uses Angular's `serve.cloudflare` configuration, which allows `.trycloudflare.com` only for the development server. Production builds and Netlify deploys do not use this allowed host.

If a tunnel still returns 403 because the incoming host is different from the allowlist, use the dev-only tunnel fallback:

```bash
npx -p node@22.12.0 bun run start:tunnel:bun
cloudflared tunnel --url http://127.0.0.1:4200
```

The tunnel fallback disables host checks only for this explicit development tunnel command. It is not used by local default development, production builds, prerender, or Netlify deploys. Parcel is not needed here because this is a dev-server host-check issue, not an asset bundling issue.

If `bun run doctor` reports an invalid ancestor `package.json`, run `bun run fix:ancestor-package`. The fix script only writes `{}` to empty ancestor `package.json` files and never changes this project's `package.json`.

Do not use `bun --bun run ng ...` for this Angular project. In this environment Bun reports Node compatibility below Angular's minimum requirement, so Angular CLI must run through a compatible Node installation.

Deno is not part of this workflow yet because it is not installed locally and Angular CLI remains Node-first.
