import type { Locale } from "../config/locales";

type Text = Record<Locale, string>;

/**
 * Interface strings. Labels label; they do not sell.
 *
 * `as const satisfies` rather than a bare `Record<string, Text>` annotation:
 * the annotation would widen the keys to `string`, so a typo like `ui.menuu`
 * would typecheck and render `undefined` into the page.
 */
export const ui = {
  skipToContent: {
    it: "Vai al contenuto principale",
    en: "Skip to main content",
  },
  primaryNavigation: { it: "Navigazione principale", en: "Primary navigation" },
  footerNavigation: {
    it: "Navigazione a piè di pagina",
    en: "Footer navigation",
  },
  language: { it: "Lingua", en: "Language" },
  closeMenu: { it: "Chiudi", en: "Close" },
  menu: { it: "Menu", en: "Menu" },
  loading: { it: "Caricamento…", en: "Loading…" },

  requestSample: { it: "Richiedi un campione", en: "Request a sample" },
  allProducts: { it: "Tutte le famiglie", en: "All families" },
  readMore: { it: "Approfondisci", en: "Read more" },
  backToProducts: { it: "Torna alle famiglie", en: "Back to families" },
  otherFamilies: { it: "Altre famiglie", en: "Other families" },
  familyIndex: { it: "Indice delle famiglie", en: "Family index" },

  form: { it: "Forma", en: "Form" },
  materialFamilies: { it: "Famiglie di materiali", en: "Material families" },

  pendingLabel: {
    it: "In attesa di conferma",
    en: "Awaiting confirmation",
  },
} as const satisfies Record<string, Text>;

/** Sample-request form. */
export const formCopy = {
  legend: {
    it: "Richiesta di campione",
    en: "Sample request",
  },
  company: { it: "Azienda", en: "Company" },
  name: { it: "Nome e cognome", en: "Full name" },
  email: { it: "Email", en: "Email" },
  phone: { it: "Telefono", en: "Telephone" },
  phoneOptional: { it: "facoltativo", en: "optional" },
  process: { it: "Processo di trasformazione", en: "Conversion process" },
  processPlaceholder: { it: "Seleziona un processo", en: "Select a process" },
  message: { it: "Richiesta", en: "Request" },
  messageHint: {
    it: "Indica la famiglia di materiale, il polimero di destinazione e il dato di processo rilevante.",
    en: "State the material family, the target polymer and the relevant process data.",
  },
  consent: {
    it: "Ho letto l'informativa sul trattamento dei dati personali.",
    en: "I have read the personal-data notice.",
  },
  consentLink: { it: "Leggi l'informativa", en: "Read the notice" },
  honeypot: { it: "Sito web aziendale", en: "Company website" },
  submit: { it: "Invia la richiesta", en: "Send request" },
  submitting: { it: "Invio in corso…", en: "Sending…" },

  processOptions: {
    injection: { it: "Stampaggio a iniezione", en: "Injection moulding" },
    filmExtrusion: { it: "Estrusione film", en: "Film extrusion" },
    blowMoulding: { it: "Soffiaggio", en: "Blow moulding" },
    otherExtrusion: { it: "Altra estrusione", en: "Other extrusion" },
    other: { it: "Altro", en: "Other" },
  },

  required: { it: "Campo obbligatorio.", en: "This field is required." },
  invalidEmail: {
    it: "Inserisci un indirizzo email valido.",
    en: "Enter a valid email address.",
  },
  tooShort: {
    it: "Descrivi la richiesta in almeno dieci caratteri.",
    en: "Describe the request in at least ten characters.",
  },
  consentRequired: {
    it: "È necessario prendere visione dell'informativa.",
    en: "You must acknowledge the notice.",
  },
  /**
   * The form has no delivery destination: the mailbox is unresolved (P-003)
   * and no endpoint is configured. Saying "sent" would be a lie, so the form
   * refuses to submit and says why.
   */
  unavailableTitle: {
    it: "Invio non ancora attivo",
    en: "Sending is not active yet",
  },
  unavailableBody: {
    it: "Il recapito per le richieste di campione non è ancora configurato, quindi questo modulo non invia nulla. Non compilarlo: i dati non verrebbero recapitati a nessuno.",
    en: "The destination for sample requests is not configured yet, so this form does not send anything. Do not fill it in: the data would not reach anyone.",
  },
  submitDisabled: {
    it: "Invio non disponibile",
    en: "Sending unavailable",
  },
  sendFailed: {
    it: "La richiesta non è stata inviata. Riprova fra qualche minuto.",
    en: "The request was not sent. Try again in a few minutes.",
  },
  sendSucceeded: {
    it: "Richiesta inviata. Riceverai una risposta all'indirizzo indicato.",
    en: "Request sent. You will receive a reply at the address given.",
  },
} as const;
