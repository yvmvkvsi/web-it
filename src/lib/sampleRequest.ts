import type { Locale } from "../config/locales";
import { formCopy } from "../content/ui";

export interface SampleRequest {
  company: string;
  name: string;
  email: string;
  phone: string;
  process: string;
  message: string;
  consent: boolean;
}

export type FieldName = keyof SampleRequest;
export type ValidationErrors = Partial<Record<FieldName, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const emptySampleRequest: SampleRequest = {
  company: "",
  name: "",
  email: "",
  phone: "",
  process: "",
  message: "",
  consent: false,
};

/** Field order, so the first invalid control can be focused deterministically. */
export const sampleRequestFields: readonly FieldName[] = [
  "company",
  "name",
  "email",
  "phone",
  "process",
  "message",
  "consent",
];

/**
 * Client-side validation exists to give the person immediate, specific
 * feedback. It is not a security boundary: whatever server eventually receives
 * this must validate independently, reject the honeypot, and rate-limit.
 */
export function validateSampleRequest(
  values: SampleRequest,
  locale: Locale,
): ValidationErrors {
  const errors: ValidationErrors = {};
  const required = formCopy.required[locale];

  if (!values.company.trim()) errors.company = required;
  if (!values.name.trim()) errors.name = required;

  if (!values.email.trim()) errors.email = required;
  else if (!EMAIL.test(values.email.trim())) {
    errors.email = formCopy.invalidEmail[locale];
  }

  if (!values.process) errors.process = required;

  if (!values.message.trim()) errors.message = required;
  else if (values.message.trim().length < 10) {
    errors.message = formCopy.tooShort[locale];
  }

  if (!values.consent) errors.consent = formCopy.consentRequired[locale];

  return errors;
}
