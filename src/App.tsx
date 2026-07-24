import {
  lazy,
  Suspense,
  type ComponentType,
  type LazyExoticComponent,
} from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import PageShell from "./pages/PageShell";
import {
  localisePath,
  routeRegistry,
  type RouteId,
} from "./config/routes";
import { locales } from "./config/locales";

/**
 * Routes with a real implementation. Everything else published renders the
 * neutral shell until its content is approved.
 */
const implementedPages: Partial<
  Record<RouteId, LazyExoticComponent<ComponentType>>
> = {
  home: lazy(() => import("./pages/Home")),
  contatti: lazy(() => import("./pages/Contact")),
};

const NotFound = lazy(() => import("./pages/NotFound"));

function RouteFallback() {
  return (
    <div className="shell route-status" role="status" aria-live="polite">
      Loading…
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route element={<Layout />}>
          {locales.flatMap((locale) =>
            routeRegistry.map((route) => {
              const path =
                route.paths[locale] === "*"
                  ? "*"
                  : localisePath(locale, route.paths[locale]);
              const key = `${locale}:${route.id}`;

              if (route.id === "not-found" || !route.published) {
                return <Route key={key} path={path} element={<NotFound />} />;
              }

              const Implemented = implementedPages[route.id];
              return (
                <Route
                  key={key}
                  path={path}
                  element={
                    Implemented ? (
                      <Implemented />
                    ) : (
                      <PageShell routeId={route.id} />
                    )
                  }
                />
              );
            }),
          )}
        </Route>
      </Routes>
    </Suspense>
  );
}
