import {
  lazy,
  Suspense,
  type ComponentType,
  type LazyExoticComponent,
} from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { routeRegistry, type PublishedRouteId } from "./config/routes";

const publishedPages = {
  home: lazy(() => import("./pages/Home")),
  about: lazy(() => import("./pages/About")),
  work: lazy(() => import("./pages/Work")),
  "work-item": lazy(() => import("./pages/WorkItem")),
  contact: lazy(() => import("./pages/Contact")),
  privacy: lazy(() => import("./pages/Privacy")),
} satisfies Record<PublishedRouteId, LazyExoticComponent<ComponentType>>;

const NotFound = lazy(() => import("./pages/NotFound"));

function RouteFallback() {
  return (
    <div className="shell route-status" role="status" aria-live="polite">
      Loading page…
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route element={<Layout />}>
          {routeRegistry.map((route) => {
            if (route.id === "not-found" || !route.published) {
              return <Route key={route.id} path={route.path} element={<NotFound />} />;
            }

            const Page = publishedPages[route.id];
            return <Route key={route.id} path={route.path} element={<Page />} />;
          })}
        </Route>
      </Routes>
    </Suspense>
  );
}
