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

Use GitHub Pages with **Source: GitHub Actions** (not “Deploy from a branch”).

The workflow at `.github/workflows/deploy-pages.yml` runs `npm ci` and `npm run build`, then uploads `dist/`. The build sets:

`VITE_BASE_PATH=/<repository-name>/`

so asset URLs match a **project site** at `https://<owner>.github.io/<repo>/` (for this repo, `/igem/`).

- **Hash routes** (`#/home`, etc.) work on Pages without a `404.html` rewrite.
- **`public/.nojekyll`** turns off Jekyll so static files are served as-is.
- **`import.meta.env.BASE_URL`** in `App.jsx` keeps images and the sponsor PDF on the correct path.

### User or organization site (site at domain root)

If the repo is `<user>.github.io` and the site lives at `https://<user>.github.io/` (no repo segment), set the build base to `/` instead—for example remove `VITE_BASE_PATH` from the workflow or set it to `/`.

### Test a Pages-style build locally

```bash
# Windows PowerShell
$env:VITE_BASE_PATH = "/igem/"
npm run build
npx vite preview
```

```bash
# macOS / Linux
VITE_BASE_PATH=/igem/ npm run build && npx vite preview
```
