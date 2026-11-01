# Pixigo website

Pixigo's static public website. Cloudflare Pages deploys the root of `main`.

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
