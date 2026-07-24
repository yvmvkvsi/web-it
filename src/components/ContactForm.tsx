import { useState, type FormEvent } from "react";
import { publicEnvironment } from "../config/environment";

type SubmitState = "idle" | "submitting" | "success" | "error" | "unconfigured";

export default function ContactForm() {
  const [state, setState] = useState<SubmitState>("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    if (!publicEnvironment.leadEndpoint) {
      setState("unconfigured");
      return;
    }

    setState("submitting");
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch(publicEnvironment.leadEndpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error(`Lead endpoint returned ${response.status}.`);
      form.reset();
      setState("success");
    } catch {
      setState("error");
    }
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="field-grid">
        <label>
          Name
          <input name="name" autoComplete="name" required minLength={2} />
        </label>
        <label>
          Email
          <input name="email" type="email" autoComplete="email" required />
        </label>
      </div>
      <label>
        Message
        <textarea name="message" rows={6} required minLength={10} />
      </label>
      <label className="honeypot" aria-hidden="true">
        Company website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <button type="submit" disabled={state === "submitting"}>
        {state === "submitting" ? "Sending…" : "Send enquiry"}
      </button>
      <div className="form-status" role="status" aria-live="polite">
        {state === "success" && "Thank you. Your enquiry was sent."}
        {state === "error" && "The enquiry could not be sent. Please try again."}
        {state === "unconfigured" &&
          "Lead delivery is not configured. Connect a secure server endpoint before launch."}
      </div>
    </form>
  );
}
