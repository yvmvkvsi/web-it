import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ContactForm from "../../../src/components/ContactForm";
import { publicEnvironment } from "../../../src/config/environment";
import { renderAt } from "../../render";

/**
 * The destination mailbox is unresolved (PENDING_DECISIONS P-003) and no
 * endpoint is configured, so the only correct behaviour is to refuse and say
 * so. These tests exist to make sure that stays true: a form that silently
 * swallows a sample request is worse than no form.
 */
describe("sample-request form with no endpoint", () => {
  it("has no lead endpoint configured in this environment", () => {
    expect(publicEnvironment.leadEndpoint).toBeUndefined();
  });

  it("states plainly that sending is not active", () => {
    renderAt(<ContactForm />, "/contatti");
    expect(screen.getByText(/Invio non ancora attivo/)).toBeInTheDocument();
    expect(
      screen.getByText(/i dati non verrebbero recapitati a nessuno/),
    ).toBeInTheDocument();
  });

  it("disables every field so nothing can be typed and lost", () => {
    renderAt(<ContactForm />, "/contatti");
    expect(screen.getByLabelText("Azienda")).toBeDisabled();
    expect(screen.getByLabelText("Email")).toBeDisabled();
    expect(screen.getByRole("button", { name: /Invio non disponibile/ })).toBeDisabled();
  });

  it("never claims a request was sent, and issues no request", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const { container } = renderAt(<ContactForm />, "/contatti");

    container.querySelector("form")!.requestSubmit();

    expect(fetchSpy).not.toHaveBeenCalled();
    expect(screen.queryByText(/Richiesta inviata/)).not.toBeInTheDocument();
  });

  it("keeps the honeypot out of the tab order and out of the a11y tree", () => {
    const { container } = renderAt(<ContactForm />, "/contatti");
    const honeypot = container.querySelector('input[name="website"]')!;

    expect(honeypot).toHaveAttribute("tabindex", "-1");
    expect(honeypot).toHaveAttribute("autocomplete", "off");
    expect(honeypot.closest("[aria-hidden='true']")).not.toBeNull();
  });

  it("links the privacy notice in the reader's locale", async () => {
    renderAt(<ContactForm />, "/en/contact");
    expect(screen.getByRole("link", { name: "Read the notice" })).toHaveAttribute(
      "href",
      "/en/privacy",
    );
  });

  it("renders in English under the English route", () => {
    renderAt(<ContactForm />, "/en/contact");
    expect(screen.getByText(/Sending is not active yet/)).toBeInTheDocument();
    expect(screen.getByLabelText("Company")).toBeInTheDocument();
  });

  it("describes fields with their hint rather than folding it into the name", async () => {
    renderAt(<ContactForm />, "/contatti");
    const message = screen.getByLabelText("Richiesta");
    const describedBy = message.getAttribute("aria-describedby");

    expect(describedBy).toBeTruthy();
    expect(document.getElementById(describedBy!)).toHaveTextContent(
      /Indica la famiglia di materiale/,
    );
    // The hint must not become part of the accessible name.
    expect(message).toHaveAccessibleName("Richiesta");
  });

  it("does not publish a mailbox, telephone or address anywhere in the form", () => {
    const { container } = renderAt(<ContactForm />, "/contatti");
    const text = container.textContent ?? "";
    expect(text).not.toMatch(/@[a-z0-9-]+\.[a-z]{2,}/i);
    expect(text).not.toMatch(/\+39/);
  });
});
