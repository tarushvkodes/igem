import { defineConfig } from "vite";

/**
 * GitHub project Pages is served at https://<user>.github.io/<repo>/.
 * Set VITE_BASE_PATH in CI to /$REPO_NAME/ (see .github/workflows/deploy-pages.yml).
 * Local dev and default builds use "/" (Vite forces base "/" in dev regardless).
 */
function normalizeBase(raw) {
  if (!raw || raw === "/" || raw === ".") return "/";
  const withSlash = raw.startsWith("/") ? raw : `/${raw}`;
  return withSlash.endsWith("/") ? withSlash : `${withSlash}/`;
}

export default defineConfig({
  base: normalizeBase(process.env.VITE_BASE_PATH),
});
