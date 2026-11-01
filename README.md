# Pixigo website

Pixigo's static public website. Cloudflare Pages deploys the root of `main`.

- [Play Magnetic Core](https://pixigo.ai/magneticcore/)
- [Homepage](https://pixigo.ai/)
- [Magnetic Core privacy policy](https://pixigo.ai/privacy-policy/)
- [PixiGo Draw privacy policy](https://pixigo.ai/draw/privacy-policy/)
- [AdMob authorized sellers](https://pixigo.ai/app-ads.txt)

The homepage lives in `index.html`, Magnetic Core's policy in
`privacy-policy/index.html`, and PixiGo Draw's policy in
`draw/privacy-policy/index.html`.

## Deployment

- Cloudflare Pages project: `pixigo-ai`
- Preview hostname: `https://pixigo-ai.pages.dev/`
- Production branch: `main`
- Framework preset: None
- Build command: `exit 0`
- Build output directory: `.`

Pushing to `main` automatically deploys the site on Cloudflare Pages. No package
installation, server or database is required. The legacy `CNAME` and `.nojekyll`
files support the existing GitHub Pages fallback; Cloudflare custom domains are
configured in the Cloudflare dashboard.

## Domain and email

Domain registration remains at GoDaddy. The assigned Cloudflare nameservers are
`carlane.ns.cloudflare.com` and `matt.ns.cloudflare.com`. Google Workspace handles
email. Preserve the MX, SPF, DKIM, DMARC and domain-verification records when
changing website DNS records, including the SPF helper TXT record at
`dc-bdaca08905._spfm.pixigo.ai`.

## Magnetic Core web game

`magneticcore/` contains the production Expo web export of the current native
Magnetic Core app. Source: `tipasere/Magnetic_Core`, `native/`, branch
`codex/web-release`. The root prototype in that source repository is not used.

To update, run `npm ci`, `npm run typecheck`, `npm test`, and `npm run test:web`
inside the source repository's `native/` folder. Replace only this repository's
`magneticcore/` directory with the resulting `native/dist/` files. Commit and push
`main`; verify the live game's `release.json` matches the local export.

The web release has no ads, purchases or Firebase analytics. Progress stays in
namespaced browser storage and is separate from iOS. The service worker controls
only `/magneticcore/`; users must close existing game tabs and reopen online to
activate a newly downloaded release. `_headers` sets game-only security rules and
revalidation for the shell/service worker, while hashed assets can be cached.

Keep `app-ads.txt` at the domain root for the native app. Future web monetization
requires a browser ad integration and the relevant privacy/consent setup.
