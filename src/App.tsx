import { lazy, Suspense, type ComponentType } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { localisePath, routeRegistry, type RouteId } from "./config/routes";
import { locales } from "./config/locales";
import { productRouteIds, type ProductRouteId } from "./content/products";
import RouteFallback from "./components/RouteFallback";

/**
 * The page implementations, supplied rather than imported directly.
 *
 * In the browser these are lazy chunks, so a visitor downloads one page. The
 * prerender step cannot use lazy components — `renderToString` does not wait
 * for a suspended boundary, it emits the fallback — so it passes the same
 * pages in already resolved. Both callers therefore render an identical tree,
 * which is what makes the static markup hydratable.
 */
export interface PageModules {
  ProductCategory: ComponentType<{ routeId: ProductRouteId }>;
  NotFound: ComponentType;
  /** One entry per published route that is not a product category. */
  pages: Partial<Record<RouteId, ComponentType>>;
}

const lazyModules: PageModules = {
  ProductCategory: lazy(() => import("./pages/ProductCategory")),
  NotFound: lazy(() => import("./pages/NotFound")),
  pages: {
    home: lazy(() => import("./pages/Home")),
    prodotti: lazy(() => import("./pages/Products")),
    testlab: lazy(() => import("./pages/TestLab")),
    settori: lazy(() => import("./pages/Industries")),
    azienda: lazy(() => import("./pages/Company")),
    contatti: lazy(() => import("./pages/Contact")),
    privacy: lazy(() => import("./pages/Privacy")),
    cookie: lazy(() => import("./pages/Cookie")),
  },
};

const productIds = new Set<string>(productRouteIds);

export default function App({ modules = lazyModules }: { modules?: PageModules }) {
  const { ProductCategory, NotFound, pages } = modules;

  const elementFor = (routeId: RouteId) => {
    if (productIds.has(routeId)) {
      return <ProductCategory routeId={routeId as ProductRouteId} />;
    }
    const Page = pages[routeId] ?? NotFound;
    return <Page />;
  };

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

              // An unpublished route is not reachable content: it renders the
              // not-found page, so `referenze` cannot be linked into existence
              // before named clients and written permissions exist.
              if (route.id === "not-found" || !route.published) {
                return <Route key={key} path={path} element={<NotFound />} />;
              }

              return (
                <Route key={key} path={path} element={elementFor(route.id)} />
              );
            }),
          )}
        </Route>
      </Routes>
    </Suspense>
  );
}
