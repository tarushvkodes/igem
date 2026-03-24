# Independence High School iGEM

Static **HTML, CSS, and JavaScript** site (no Vite, no React). Works on **GitHub Pages** as-is.

## Files

| Path | Role |
|------|------|
| `index.html` | Page shell |
| `css/styles.css` | Styles |
| `js/app.js` | Hash routing (`#/home`, …) and rendering |
| `site-extract.json` | Page copy and nav metadata |
| `assets/` | Images and PDF (logo, STEM photo, letter of support) |

## Local preview

`fetch()` needs **HTTP** (opening `index.html` as `file://` will not load the JSON).

```bash
# Python
python -m http.server 8080
```

Then open `http://localhost:8080/`.

```bash
# Node (one-off)
npx --yes serve .
```

## GitHub Pages

Use **Source: GitHub Actions**. The workflow copies `index.html`, `site-extract.json`, `css/`, `js/`, and `assets/` into `dist/` and publishes that folder.

For a **project site** at `https://<owner>.github.io/<repo>/`, relative URLs (`assets/…`, `site-extract.json`) resolve correctly. Hash links (`#/about-igem`) need no server rewrite.

## Editing content

Change text in `site-extract.json` or adjust layout/logic in `js/app.js`.
