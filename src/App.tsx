import {
  lazy,
  Suspense,
  type ComponentType,
  type LazyExoticComponent,
} from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { localisePath, routeRegistry, type RouteId } from "./config/routes";
import { locales } from "./config/locales";
import { productRouteIds, type ProductRouteId } from "./content/products";
import RouteFallback from "./components/RouteFallback";

/**
 * One lazy chunk per page. The six category pages share a single
 * implementation and therefore a single chunk, parameterised by route id.
 */
const ProductCategory = lazy(() => import("./pages/ProductCategory"));
const NotFound = lazy(() => import("./pages/NotFound"));

const pages: Partial<Record<RouteId, LazyExoticComponent<ComponentType>>> = {
  home: lazy(() => import("./pages/Home")),
  prodotti: lazy(() => import("./pages/Products")),
  testlab: lazy(() => import("./pages/TestLab")),
  settori: lazy(() => import("./pages/Industries")),
  azienda: lazy(() => import("./pages/Company")),
  contatti: lazy(() => import("./pages/Contact")),
  privacy: lazy(() => import("./pages/Privacy")),
  cookie: lazy(() => import("./pages/Cookie")),
};

const productIds = new Set<string>(productRouteIds);

function elementFor(routeId: RouteId) {
  if (productIds.has(routeId)) {
    return <ProductCategory routeId={routeId as ProductRouteId} />;
  }
  const Page = pages[routeId] ?? NotFound;
  return <Page />;
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
