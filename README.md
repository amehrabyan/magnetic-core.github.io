# Pixigo website

Pixigo's static public website. Cloudflare Pages deploys the root of `main`.

- [Play Magnetic Core](https://pixigo.ai/magneticcore/)
- [Homepage](https://pixigo.ai/)
- [Magnetic Core privacy policy](https://pixigo.ai/privacy-policy/)
- [PixiGo Draw privacy policy](https://pixigo.ai/draw/privacy-policy/)
- [AdMob authorized sellers](https://pixigo.ai/app-ads.txt)
- [AdSense authorized sellers](https://pixigo.ai/ads.txt)

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
installation or database is required. A small Pages Function adds a fresh CSP
nonce to Magnetic Core HTML for AdSense; other pages and assets remain static. The legacy `CNAME` and `.nojekyll`
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

The web release has a non-personalized AdSense display unit below the game,
with Google privacy messages and a privacy-choices control. Purchases and
Firebase analytics remain off. Ads only run on `pixigo.ai`, online and outside
embeds; local/preview hosts and offline launches make no ad requests. Progress stays in
namespaced browser storage and is separate from iOS. The service worker controls
only `/magneticcore/`; users must close existing game tabs and reopen online to
activate a newly downloaded release. `_headers` sets game-only security rules and
revalidation for the shell/service worker, while hashed assets can be cached.

Keep `app-ads.txt` at the domain root for native apps and `ads.txt` for web ads.
AdSense publisher: `pub-7231836006413404`; Magnetic Core display slot:
`7954876512`. Auto ads remain off. Site approval was requested November 1, 2026;
deployment does not imply approval or ad fill.

`functions/magneticcore/index.js` sets Google's supported nonce CSP for game
HTML, overriding the conservative static fallback CSP in `_headers`.
`_routes.json` restricts function execution to `/magneticcore` and
`/magneticcore/`. Preserve both when updating the generated game directory.
Verify that each HTML response has a fresh CSP nonce matching every script tag.
Use `wrangler pages dev .` to test the full Pages setup, and `?ads-preview=1` to
inspect the placement without loading Google. The static GitHub Pages fallback
has no nonce function; production advertising is intended for Cloudflare.
