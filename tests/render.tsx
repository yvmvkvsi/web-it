import { render } from "@testing-library/react";
import type { ReactElement } from "react";
import { MemoryRouter } from "react-router-dom";

/**
 * Renders a component at a given URL.
 *
 * The locale, the navigation state and every in-app href are derived from the
 * pathname, so the route is the only fixture a component test needs.
 */
export function renderAt(ui: ReactElement, pathname: string) {
  return render(<MemoryRouter initialEntries={[pathname]}>{ui}</MemoryRouter>);
}
