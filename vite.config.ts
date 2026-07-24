import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { defineConfig, type PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/**
 * Makes `vite preview` behave like a static host serving the prerendered
 * output, instead of answering every route from the root `index.html`.
 *
 * Vite's preview server is an SPA server: its fallback catches `/cookie`
 * before directory-index resolution, so it returns the prerendered *home
 * page* — a 200 carrying the home page's title, description and canonical, on
 * every URL. React then repairs the page after hydration, but only after
 * mismatching against markup meant for a different route, and a crawler never
 * gets that far. The site exists to be found in organic search, so this had to
 * be verifiable locally rather than assumed of the host.
 *
 * Resolution is by filesystem lookup, which is what a static host does, and
 * keeps this config free of any dependency on application source.
 *
 * `dev` is untouched: there is no prerendered output there, and the SPA
 * fallback is what makes deep links work while developing.
 */
function staticPreviewFallback(): PluginOption {
  return {
    name: "damon:static-preview-fallback",
    configurePreviewServer(server) {
      const outDir = path.resolve(
        server.config.root,
        server.config.build.outDir,
      );

      server.middlewares.use((request, response, next) => {
        const [rawPath] = (request.url ?? "/").split("?");
        const trimmed = rawPath.replace(/\/+$/, "");
        const pathname = trimmed === "" ? "/" : trimmed;

        // Assets carry an extension; leave those to Vite's static handler.
        if (path.extname(pathname)) return next();

        const candidate = path.join(outDir, pathname, "index.html");
        // Never serve a file from outside the build directory, whatever the
        // request path contains.
        const withinOutput = candidate.startsWith(outDir + path.sep);
        const found = withinOutput && existsSync(candidate);

        const file = found ? candidate : path.join(outDir, "404.html");
        response.statusCode = found ? 200 : 404;
        response.setHeader("content-type", "text/html; charset=utf-8");
        response.end(readFileSync(file, "utf8"));
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), staticPreviewFallback()],
  server: {
    host: true,
    port: 5173,
  },
});
