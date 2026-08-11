# gh-opp web

Landing page and docs for [gh-opp](https://github.com/grarizki/gh-opportunities), the Rust CLI that finds open-source contribution opportunities on GitHub.

React + Vite + vanilla CSS. Dark terminal landing, light docs following system preference. Zero external requests; fonts self-hosted. Target: 100 Lighthouse.

## Develop

```bash
npm install
npm run dev
```

## Build and check

```bash
npm run build
node scripts/check.mjs   # tokenizer, doc slugs, em/en-dash scan
npm run lint
```

## Deploy (Netlify)

`netlify.toml` at `web/` root: publish `dist`, SPA redirect `/docs/*` → `/index.html`. Prebuilt binaries installer: repo-root `install.sh`, see `.github/workflows/release.yml`.