import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { getNavigationRoutes, localisePath, routePath } from "../config/routes";
import { localeName, locales } from "../config/locales";
import { counterpartPath, useLocale } from "../lib/locale";
import { siteConfig } from "../config/site";
import { ui } from "../content/ui";

const navigation = getNavigationRoutes("header");

export default function Header() {
  const locale = useLocale();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState(pathname);
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback((returnFocus: boolean) => {
    setMenuOpen(false);
    if (returnFocus) toggleRef.current?.focus();
  }, []);

  // A route change means the menu did its job. Adjusted during render rather
  // than in an effect: an effect would paint the new page with the panel still
  // covering it for one frame, then close it in a second render.
  if (pathname !== openedAt) {
    setOpenedAt(pathname);
    if (menuOpen) setMenuOpen(false);
  }

  // Scroll is locked only while the panel covers the page, and released on
  // every exit path including unmount.
  useEffect(() => {
    if (!menuOpen) return;
    document.body.dataset.scrollLocked = "true";
    return () => {
      delete document.body.dataset.scrollLocked;
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        close(true);
      }
    }

    // The panel is a sibling of the toggle rather than a modal dialog, so
    // focus is kept inside the two of them rather than trapped in the panel.
    function onFocusIn(event: FocusEvent) {
      const target = event.target as Node | null;
      if (!target) return;
      if (panelRef.current?.contains(target)) return;
      if (toggleRef.current?.contains(target)) return;
      close(false);
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("focusin", onFocusIn);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("focusin", onFocusIn);
    };
  }, [close, menuOpen]);

  const other = locales.filter((candidate) => candidate !== locale);

  return (
    <header className="site-header">
      {/* The blur lives on this inner bar, not on `.site-header`. A
          `backdrop-filter` establishes a containing block for fixed-position
          descendants, so with it on the header the mobile panel resolved
          `inset: 4.25rem 0 0` against the 68px header box and collapsed to
          nothing — open in the DOM, invisible on screen. */}
      <div className="header-bar">
        <div className="shell header-inner">
        {/* A plain link, not a NavLink: the wordmark is identity, not a
            navigation item, and marking it `aria-current="page"` on the home
            page would put a second current-page claim in the header. */}
        <Link className="wordmark" to={routePath("home", locale)}>
          {siteConfig.name}
        </Link>

        <div className="header-nav">
          <nav className="primary-nav" aria-label={ui.primaryNavigation[locale]}>
            {navigation.map((route) => (
              <NavLink
                key={route.id}
                to={localisePath(locale, route.paths[locale])}
              >
                {route.labels[locale]}
              </NavLink>
            ))}
          </nav>

          {/* A `nav`, not a bare `div`: `aria-label` on a generic element
              names nothing, so the switcher would be an unlabelled pair of
              two-letter links. */}
          <nav className="locale-switch" aria-label={ui.language[locale]}>
            <span aria-current="true">
              <span className="visually-hidden">{localeName[locale]}</span>
              <span aria-hidden="true">{locale}</span>
            </span>
            {other.map((candidate) => (
              <Link
                key={candidate}
                to={counterpartPath(pathname, candidate)}
                hrefLang={candidate}
                lang={candidate}
              >
                <span className="visually-hidden">{localeName[candidate]}</span>
                <span aria-hidden="true">{candidate}</span>
              </Link>
            ))}
          </nav>

          <button
            ref={toggleRef}
            type="button"
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="menu-bars" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            {menuOpen ? ui.closeMenu[locale] : ui.menu[locale]}
          </button>
        </div>
        </div>
      </div>

      <div
        id={menuId}
        ref={panelRef}
        className="mobile-nav"
        data-open={menuOpen}
      >
        <div className="shell">
          <nav
            className="mobile-nav-list"
            aria-label={ui.primaryNavigation[locale]}
          >
            {navigation.map((route) => (
              <NavLink
                key={route.id}
                to={localisePath(locale, route.paths[locale])}
              >
                {route.labels[locale]}
              </NavLink>
            ))}
          </nav>

          <div className="mobile-nav-locale">
            <span className="label-plain" id={`${menuId}-language`}>
              {ui.language[locale]}
            </span>
            <nav
              className="locale-switch"
              aria-labelledby={`${menuId}-language`}
            >
              <span aria-current="true">
                <span className="visually-hidden">{localeName[locale]}</span>
                <span aria-hidden="true">{locale}</span>
              </span>
              {other.map((candidate) => (
                <Link
                  key={candidate}
                  to={counterpartPath(pathname, candidate)}
                  hrefLang={candidate}
                  lang={candidate}
                >
                  <span className="visually-hidden">
                    {localeName[candidate]}
                  </span>
                  <span aria-hidden="true">{candidate}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
