import { useId, useState, type FormEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { publicEnvironment } from "../config/environment";
import { routePath } from "../config/routes";
import { useLocale } from "../lib/locale";
import {
  emptySampleRequest,
  sampleRequestFields,
  validateSampleRequest,
  type FieldName,
  type SampleRequest,
  type ValidationErrors,
} from "../lib/sampleRequest";
import { formCopy } from "../content/ui";

type SubmitState = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const locale = useLocale();
  const ids = useId();
  const [values, setValues] = useState<SampleRequest>(emptySampleRequest);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [state, setState] = useState<SubmitState>("idle");

  /**
   * No endpoint means no destination. The mailbox that should receive sample
   * requests is still unresolved (PENDING_DECISIONS P-003), so the form is
   * presented as unavailable rather than accepting data it would discard.
   */
  const deliverable = Boolean(publicEnvironment.leadEndpoint);

  const fieldId = (name: FieldName) => `${ids}-${name}`;
  const errorId = (name: FieldName) => `${ids}-${name}-error`;
  const hintId = (name: FieldName) => `${ids}-${name}-hint`;

  function update<K extends FieldName>(name: K, value: SampleRequest[K]) {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => {
      if (!current[name]) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!deliverable) return;

    const found = validateSampleRequest(values, locale);
    setErrors(found);

    const firstInvalid = sampleRequestFields.find((name) => found[name]);
    if (firstInvalid) {
      document.getElementById(fieldId(firstInvalid))?.focus();
      return;
    }

    setState("submitting");
    try {
      const response = await fetch(publicEnvironment.leadEndpoint!, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...values, locale }),
      });
      if (!response.ok) {
        throw new Error(`Lead endpoint returned ${response.status}.`);
      }
      setValues(emptySampleRequest);
      setState("success");
    } catch {
      setState("error");
    }
  }

  /**
   * Errors and hints are referenced with `aria-describedby` rather than being
   * nested inside the label, so they are announced after the field name
   * instead of becoming part of it.
   */
  function describedBy(name: FieldName, hasHint = false) {
    const parts = [
      hasHint ? hintId(name) : undefined,
      errors[name] ? errorId(name) : undefined,
    ].filter(Boolean);
    return parts.length > 0 ? parts.join(" ") : undefined;
  }

  const field = (name: FieldName, label: string, hint?: string, optional?: string) => ({
    htmlFor: fieldId(name),
    label,
    optional,
    hint,
    hintId: hint ? hintId(name) : undefined,
    error: errors[name],
    errorId: errorId(name),
  });

  return (
    <form className="form" onSubmit={submit} noValidate>
      {!deliverable ? (
        <div className="form-status" data-tone="error">
          <strong>{formCopy.unavailableTitle[locale]}</strong>
          <br />
          {formCopy.unavailableBody[locale]}
        </div>
      ) : null}

      <fieldset disabled={!deliverable || state === "submitting"}>
        <legend>{formCopy.legend[locale]}</legend>

        <div className="field-row">
          <Field {...field("company", formCopy.company[locale])}>
            <input
              id={fieldId("company")}
              name="company"
              autoComplete="organization"
              value={values.company}
              onChange={(event) => update("company", event.target.value)}
              aria-invalid={errors.company ? true : undefined}
              aria-describedby={describedBy("company")}
            />
          </Field>

          <Field {...field("name", formCopy.name[locale])}>
            <input
              id={fieldId("name")}
              name="name"
              autoComplete="name"
              value={values.name}
              onChange={(event) => update("name", event.target.value)}
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={describedBy("name")}
            />
          </Field>
        </div>

        <div className="field-row">
          <Field {...field("email", formCopy.email[locale])}>
            <input
              id={fieldId("email")}
              name="email"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={(event) => update("email", event.target.value)}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={describedBy("email")}
            />
          </Field>

          <Field
            {...field(
              "phone",
              formCopy.phone[locale],
              undefined,
              formCopy.phoneOptional[locale],
            )}
          >
            <input
              id={fieldId("phone")}
              name="phone"
              type="tel"
              autoComplete="tel"
              value={values.phone}
              onChange={(event) => update("phone", event.target.value)}
            />
          </Field>
        </div>

        <Field {...field("process", formCopy.process[locale])}>
          <select
            id={fieldId("process")}
            name="process"
            value={values.process}
            onChange={(event) => update("process", event.target.value)}
            aria-invalid={errors.process ? true : undefined}
            aria-describedby={describedBy("process")}
          >
            <option value="">{formCopy.processPlaceholder[locale]}</option>
            {Object.entries(formCopy.processOptions).map(([key, option]) => (
              <option key={key} value={key}>
                {option[locale]}
              </option>
            ))}
          </select>
        </Field>

        <Field
          {...field(
            "message",
            formCopy.message[locale],
            formCopy.messageHint[locale],
          )}
        >
          <textarea
            id={fieldId("message")}
            name="message"
            rows={6}
            value={values.message}
            onChange={(event) => update("message", event.target.value)}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={describedBy("message", true)}
          />
        </Field>

        {/* Bot bait. A real submission never fills a field it cannot see;
            the server must reject any payload where this is non-empty. */}
        <div className="honeypot" aria-hidden="true">
          <label htmlFor={`${ids}-website`}>{formCopy.honeypot[locale]}</label>
          <input
            id={`${ids}-website`}
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="field field-consent">
          <input
            id={fieldId("consent")}
            name="consent"
            type="checkbox"
            checked={values.consent}
            onChange={(event) => update("consent", event.target.checked)}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={describedBy("consent")}
          />
          <span>
            <label htmlFor={fieldId("consent")}>
              {formCopy.consent[locale]}
            </label>{" "}
            <Link to={routePath("privacy", locale)}>
              {formCopy.consentLink[locale]}
            </Link>
            {errors.consent ? (
              <span className="field-error" id={errorId("consent")}>
                {errors.consent}
              </span>
            ) : null}
          </span>
        </div>

        <button
          className="button"
          type="submit"
          aria-disabled={!deliverable || undefined}
        >
          {!deliverable
            ? formCopy.submitDisabled[locale]
            : state === "submitting"
              ? formCopy.submitting[locale]
              : formCopy.submit[locale]}
        </button>
      </fieldset>

      <div
        className="form-status"
        role="status"
        aria-live="polite"
        data-tone={tone(state)}
      >
        {state === "success" ? formCopy.sendSucceeded[locale] : null}
        {state === "error" ? formCopy.sendFailed[locale] : null}
      </div>
    </form>
  );
}

function tone(state: SubmitState) {
  if (state === "success") return "success";
  if (state === "error") return "error";
  return undefined;
}

interface FieldProps {
  htmlFor: string;
  label: string;
  optional?: string;
  hint?: string;
  hintId?: string;
  error?: string;
  errorId: string;
  children: ReactNode;
}

/**
 * Label, control, hint and error as siblings rather than nested inside the
 * label — a label that wraps its hint would fold that text into the field's
 * accessible name instead of announcing it separately.
 *
 * Declared at module scope: a component defined inside `ContactForm` would be
 * a new type on every render, remounting each input and dropping focus mid-typing.
 */
function Field({
  htmlFor,
  label,
  optional,
  hint,
  hintId,
  error,
  errorId,
  children,
}: FieldProps) {
  return (
    <div className="field">
      <label htmlFor={htmlFor}>
        <span>
          {label}
          {optional ? <span className="field-optional">{optional}</span> : null}
        </span>
      </label>
      {children}
      {hint ? (
        <span className="field-hint" id={hintId}>
          {hint}
        </span>
      ) : null}
      {error ? (
        <span className="field-error" id={errorId}>
          {error}
        </span>
      ) : null}
    </div>
  );
}
