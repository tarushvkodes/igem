# Independence High School iGEM

GitHub Pages-ready Vite site for Independence High School's iGEM club.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

The finished static site is generated in `dist/`.

## GitHub Pages

Use GitHub Pages with `Source: GitHub Actions`.

This repo includes a workflow at `.github/workflows/deploy-pages.yml` that:

```bash
npm ci
npm run build
```

and publishes the built `dist/` folder to Pages whenever `main` is updated.
