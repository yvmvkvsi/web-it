import type { Locale } from "../config/locales";
import {
  industryMedia,
  testlabExtrusion,
  testlabFilmSample,
  warehouse,
  type MediaAsset,
} from "./media";

type Text = Record<Locale, string>;
type Lines = Record<Locale, readonly string[]>;

export interface PageMeta {
  title: Text;
  description: Text;
}

/**
 * Copy discipline, restated because it is easy to lose.
 *
 * Nothing here asserts a fact about Damon that is not approved in
 * SOURCE_OF_TRUTH.md. There is no address, telephone, mailbox, VAT number,
 * founding date, headcount, client, partner, territory, certification or
 * production figure anywhere in this file, because none of those has been
 * confirmed. Where a page would normally carry such a fact, it carries a
 * `PendingNote` instead, which states plainly what is missing.
 */

export const home = {
  meta: {
    title: {
      it: "Damon — Materie prime per la trasformazione delle materie plastiche",
      en: "Damon — Raw materials for plastics conversion",
    },
    description: {
      it: "Distribuzione di masterbatch, polimeri, bio-polimeri, additivi, compound e rigenerati per trasformatori di materie plastiche. Richiedi un campione.",
      en: "Distribution of masterbatch, polymers, biopolymers, additives, compounds and recycled regranulate for plastics converters. Request a sample.",
    },
  },
  eyebrow: {
    it: "Materie prime per trasformatori",
    en: "Raw materials for converters",
  },
  heading: {
    it: "Il materiale giusto si decide su un campione, non su un catalogo.",
    en: "The right material is settled on a sample, not on a catalogue.",
  },
  lede: {
    it: "Distribuiamo materie prime per la trasformazione delle materie plastiche: masterbatch, polimeri, bio-polimeri, additivi, compound e rigenerati. Sei famiglie, un solo criterio di scelta — il processo a cui sono destinate.",
    en: "We distribute raw materials for plastics conversion: masterbatch, polymers, biopolymers, additives, compounds and recycled regranulate. Six families, one criterion for choosing between them — the process they are meant for.",
  },
  familiesHeading: {
    it: "Sei famiglie di materiali",
    en: "Six material families",
  },
  familiesLede: {
    it: "Ogni famiglia risolve un problema diverso in reparto. La forma di fornitura, indicata sotto ogni voce, è il primo dato che cambia il modo di dosarla.",
    en: "Each family solves a different problem on the shop floor. The supply form, given under each entry, is the first thing that changes how it is dosed.",
  },
  testlabHeading: {
    it: "Una prova prima del lotto industriale",
    en: "A trial before the industrial batch",
  },
  testlabBody: {
    it: "Una scheda tecnica descrive un materiale in condizioni di laboratorio. Il reparto lavora in condizioni proprie. Fra le due cose sta la prova su campione, che è il modo meno costoso di scoprire un'incompatibilità.",
    en: "A datasheet describes a material under laboratory conditions. A production floor works under its own. Between the two sits the sample trial, which is the cheapest way to discover an incompatibility.",
  },
} satisfies Record<string, unknown> & { meta: PageMeta };

export const products = {
  meta: {
    title: {
      it: "Prodotti — Damon",
      en: "Products — Damon",
    },
    description: {
      it: "Le sei famiglie di materie prime distribuite da Damon: masterbatch, polimeri, bio-polimeri, additivi, compound e rigenerati.",
      en: "The six raw-material families distributed by Damon: masterbatch, polymers, biopolymers, additives, compounds and recycled regranulate.",
    },
  },
  eyebrow: { it: "Prodotti", en: "Products" },
  heading: { it: "Sei famiglie di materiali", en: "Six material families" },
  lede: {
    it: "La distinzione fra le famiglie non è commerciale ma fisica: cambia cosa arriva in reparto e come si dosa. Sotto ogni famiglia trovi la forma di fornitura e la definizione della classe.",
    en: "The distinction between families is physical rather than commercial: it changes what arrives on the floor and how it is dosed. Under each family you will find its supply form and the definition of the class.",
  },
  pending: {
    it: "L'elenco dei gradi disponibili per ciascuna famiglia, con le relative schede tecniche, sarà pubblicato quando l'azienda lo avrà fornito e verificato.",
    en: "The list of grades available in each family, with their datasheets, will be published once the company has supplied and checked it.",
  },
} satisfies Record<string, unknown> & { meta: PageMeta };

export const productDetail = {
  pending: {
    it: "I gradi disponibili in questa famiglia, con schede tecniche e dati di processo, saranno pubblicati quando l'azienda li avrà forniti.",
    en: "The grades available in this family, with datasheets and process data, will be published once the company has supplied them.",
  },
  ctaHeading: {
    it: "Chiedi un campione di questa famiglia",
    en: "Ask for a sample from this family",
  },
  ctaBody: {
    it: "Indica il processo di destinazione e il polimero su cui lavori: sono i due dati che restringono la scelta più di qualunque altro.",
    en: "State the target process and the polymer you work with: those two figures narrow the choice more than anything else.",
  },
} as const;

export interface Industry {
  id: string;
  name: Text;
  summary: Text;
  body: Text;
  media: MediaAsset;
}

export const industries: readonly Industry[] = [
  {
    id: "packaging",
    name: { it: "Imballaggio flessibile", en: "Flexible packaging" },
    summary: {
      it: "Film estruso, dove lo spessore è sottile e ogni disomogeneità si vede.",
      en: "Extruded film, where the gauge is thin and every inconsistency shows.",
    },
    body: {
      it: "Nell'estrusione di film lo spessore lascia poco margine: una dispersione imperfetta del colore o una carica non omogenea diventano un difetto visibile sulla bobina, non una tolleranza. La costanza fra lotti conta quanto il valore nominale.",
      en: "In film extrusion the gauge leaves little margin: imperfect colour dispersion or an uneven filler load becomes a visible defect on the roll rather than a tolerance. Batch-to-batch consistency matters as much as the nominal figure.",
    },
    media: industryMedia.packaging,
  },
  {
    id: "injection",
    name: { it: "Stampaggio a iniezione", en: "Injection moulding" },
    summary: {
      it: "Parti formate, dove ritiro e stabilità dimensionale decidono il pezzo.",
      en: "Formed parts, where shrinkage and dimensional stability decide the piece.",
    },
    body: {
      it: "A iniezione il materiale è scelto contro la geometria dello stampo. Fluidità, ritiro e stabilità dimensionale si muovono insieme: cambiare grado per risolvere un riempimento incompleto sposta anche le quote del pezzo finito.",
      en: "In injection moulding the material is chosen against the geometry of the tool. Flow, shrinkage and dimensional stability move together: changing grade to fix an incomplete fill also shifts the dimensions of the finished part.",
    },
    media: industryMedia.injection,
  },
  {
    id: "agriculture",
    name: { it: "Agricoltura", en: "Agriculture" },
    summary: {
      it: "Film tecnici esposti, dove il materiale lavora all'aperto per una stagione.",
      en: "Exposed technical film, where the material works outdoors for a season.",
    },
    body: {
      it: "Il film agricolo lavora esposto a luce, calore e trattamenti per un ciclo colturale intero. La durata attesa non è una proprietà del polimero da solo: dipende dall'additivazione e va dichiarata rispetto alle condizioni d'impiego.",
      en: "Agricultural film works exposed to light, heat and treatments for an entire growing cycle. Expected service life is not a property of the polymer alone: it depends on additivation and must be stated against the conditions of use.",
    },
    media: industryMedia.agriculture,
  },
];

export const industriesPage = {
  meta: {
    title: { it: "Settori — Damon", en: "Industries — Damon" },
    description: {
      it: "I settori di trasformazione serviti: imballaggio flessibile, stampaggio a iniezione e agricoltura.",
      en: "The conversion sectors served: flexible packaging, injection moulding and agriculture.",
    },
  },
  eyebrow: { it: "Settori", en: "Industries" },
  heading: {
    it: "Lo stesso polimero, tre problemi diversi",
    en: "The same polymer, three different problems",
  },
  lede: {
    it: "Il processo di destinazione cambia quale proprietà del materiale diventa critica. Sotto, cosa determina la scelta in tre lavorazioni ricorrenti.",
    en: "The target process changes which property of the material becomes critical. Below, what drives the choice in three recurring conversions.",
  },
  pending: {
    it: "L'elenco completo dei settori serviti e i riferimenti applicativi saranno pubblicati quando l'azienda li avrà confermati.",
    en: "The full list of sectors served and the application references will be published once the company has confirmed them.",
  },
} satisfies Record<string, unknown> & { meta: PageMeta };

export const testlab = {
  meta: {
    title: { it: "TestLab — Damon", en: "TestLab — Damon" },
    description: {
      it: "La prova su campione prima del lotto industriale: perché si fa e quali dati servono per richiederla.",
      en: "The sample trial before the industrial batch: why it is done and what data a request needs.",
    },
  },
  eyebrow: { it: "TestLab", en: "TestLab" },
  heading: {
    it: "Provare costa meno che fermare una linea",
    en: "Trialling costs less than stopping a line",
  },
  lede: {
    it: "Una prova su campione mette il materiale nelle condizioni in cui dovrà lavorare, prima che il lotto industriale renda l'errore costoso.",
    en: "A sample trial puts the material under the conditions it will have to work in, before an industrial batch makes the mistake expensive.",
  },
  body: {
    it: [
      "Le variabili che fanno fallire un materiale in reparto raramente compaiono su una scheda tecnica: la temperatura reale della linea, il tempo di permanenza, l'interazione con un additivo già in formulazione, la geometria dello stampo.",
      "Una prova serve a rendere confrontabili due materiali sullo stesso processo, non a certificarne uno. Il risultato utile è una differenza misurata, non un giudizio.",
    ],
    en: [
      "The variables that make a material fail on the floor rarely appear on a datasheet: the real line temperature, residence time, interaction with an additive already in the formulation, the geometry of the tool.",
      "A trial exists to make two materials comparable on the same process, not to certify one of them. The useful outcome is a measured difference, not a verdict.",
    ],
  },
  sampleHeading: {
    it: "La gradazione si vede solo sul campione",
    en: "Gradation is only visible on the sample",
  },
  sampleBody: {
    it: "Su un film sottile la stessa formulazione cambia resa al variare dello spessore e del dosaggio. Un ventaglio di campioni rende la differenza leggibile prima di industrializzare.",
    en: "On thin film the same formulation reads differently as gauge and dosing change. A fan of samples makes that difference legible before industrialisation.",
  },
  requestHeading: {
    it: "Cosa indicare in una richiesta",
    en: "What to state in a request",
  },
  requestList: {
    it: [
      "il processo di trasformazione e la temperatura di lavorazione;",
      "il polimero base e il grado, se già definito;",
      "la famiglia di materiale su cui vuoi la prova;",
      "il risultato da verificare, e come lo misuri.",
    ],
    en: [
      "the conversion process and the processing temperature;",
      "the base polymer and grade, if already fixed;",
      "the material family you want trialled;",
      "the result to be verified, and how you measure it.",
    ],
  },
  pending: {
    it: "La descrizione delle attrezzature di laboratorio, delle prove eseguibili e dei tempi di risposta sarà pubblicata quando l'azienda l'avrà confermata.",
    en: "The description of the laboratory equipment, the trials that can be run and the response times will be published once the company has confirmed it.",
  },
  media: { extrusion: testlabExtrusion, sample: testlabFilmSample },
} satisfies Record<string, unknown> & { meta: PageMeta };

export const company = {
  meta: {
    title: { it: "Azienda — Damon", en: "Company — Damon" },
    description: {
      it: "Damon S.r.l. distribuisce materie prime per la trasformazione delle materie plastiche nel Sud Italia.",
      en: "Damon S.r.l. distributes raw materials for plastics conversion in Southern Italy.",
    },
  },
  eyebrow: { it: "Azienda", en: "Company" },
  heading: {
    it: "Un distributore di materie prime, non un catalogo online",
    en: "A raw-material distributor, not an online catalogue",
  },
  lede: {
    it: "Damon S.r.l. distribuisce materie prime per la trasformazione delle materie plastiche a trasformatori del Sud Italia.",
    en: "Damon S.r.l. distributes raw materials for plastics conversion to converters in Southern Italy.",
  },
  body: {
    it: [
      "Il lavoro di un distributore di materie prime non finisce alla consegna. Sta nel far combaciare una specifica tecnica con una linea di produzione reale, e nel restare raggiungibile quando fra le due cose si apre uno scarto.",
      "Per questo il sito è costruito attorno alla richiesta di campione, e non attorno a un listino: la decisione utile si prende sul materiale, in reparto.",
    ],
    en: [
      "A raw-material distributor's job does not end at delivery. It lies in matching a technical specification to a real production line, and in staying reachable when a gap opens between the two.",
      "That is why this site is built around the sample request rather than a price list: the useful decision is taken on the material, on the floor.",
    ],
  },
  pendingHeading: {
    it: "Informazioni societarie",
    en: "Company information",
  },
  pending: {
    it: "Storia dell'azienda, dati di registrazione, sede, rapporti di distribuzione e certificazioni non sono pubblicati: nessuno di questi dati è stato ancora confermato dall'azienda. Verranno aggiunti solo con documentazione a supporto.",
    en: "Company history, registration details, premises, distribution agreements and certifications are not published: none of this has yet been confirmed by the company. They will be added only with supporting documentation.",
  },
  media: warehouse,
} satisfies Record<string, unknown> & { meta: PageMeta };

export const contact = {
  meta: {
    title: { it: "Contatti — Damon", en: "Contact — Damon" },
    description: {
      it: "Richiedi un campione di masterbatch, polimeri, bio-polimeri, additivi, compound o rigenerati.",
      en: "Request a sample of masterbatch, polymers, biopolymers, additives, compounds or recycled regranulate.",
    },
  },
  eyebrow: { it: "Contatti", en: "Contact" },
  heading: { it: "Richiedi un campione", en: "Request a sample" },
  lede: {
    it: "Più dati di processo contiene la richiesta, più breve è lo scambio che serve a rispondere.",
    en: "The more process data a request carries, the shorter the exchange needed to answer it.",
  },
  detailsHeading: { it: "Recapiti", en: "Contact details" },
  pending: {
    it: "Indirizzo, telefono e casella di posta non sono pubblicati perché non sono ancora stati confermati dall'azienda. Pubblicare un recapito non verificato manderebbe le richieste in un posto sbagliato.",
    en: "Address, telephone and mailbox are not published because the company has not confirmed them yet. Publishing an unverified contact would send requests to the wrong place.",
  },
} satisfies Record<string, unknown> & { meta: PageMeta };

export const privacy = {
  meta: {
    title: { it: "Informativa privacy — Damon", en: "Privacy notice — Damon" },
    description: {
      it: "Quali dati raccoglie questo sito, per quale finalità e per quanto tempo.",
      en: "What data this site collects, for what purpose and for how long.",
    },
  },
  eyebrow: { it: "Privacy", en: "Privacy" },
  heading: {
    it: "Informativa sul trattamento dei dati personali",
    en: "Personal-data notice",
  },
  lede: {
    it: "Questa pagina descrive il trattamento dei dati personali svolto da questo sito, allo stato attuale della sua realizzazione.",
    en: "This page describes the personal-data processing carried out by this site as it currently stands.",
  },
  sections: {
    it: [
      {
        heading: "Dati raccolti dal modulo di richiesta",
        body: "Il modulo di richiesta campione prevede la raccolta di: ragione sociale, nome e cognome, indirizzo email, processo di trasformazione e testo della richiesta. Il numero di telefono è facoltativo. Non è previsto il caricamento di file.",
      },
      {
        heading: "Stato attuale dell'invio",
        body: "Al momento il modulo non invia nulla e nessun dato inserito viene trasmesso o conservato: il recapito di destinazione non è ancora configurato. L'invio verrà attivato solo insieme alla pubblicazione dei recapiti aziendali.",
      },
      {
        heading: "Cookie e statistiche",
        body: "Questo sito non installa cookie di profilazione e non utilizza cookie tecnici oltre a quelli eventualmente necessari al funzionamento del browser. Nessuno strumento di statistica è attivo su questa versione del sito.",
      },
      {
        heading: "Base giuridica e conservazione",
        body: "Il trattamento dei dati inseriti nel modulo avrà come base giuridica l'esecuzione di misure precontrattuali richieste dall'interessato. I termini di conservazione saranno indicati all'attivazione dell'invio.",
      },
      {
        heading: "Diritti dell'interessato",
        body: "Il Regolamento (UE) 2016/679 riconosce all'interessato i diritti di accesso, rettifica, cancellazione, limitazione, opposizione e portabilità, oltre al diritto di reclamo al Garante per la protezione dei dati personali.",
      },
    ],
    en: [
      {
        heading: "Data collected by the request form",
        body: "The sample-request form collects: company name, full name, email address, conversion process and the text of the request. Telephone is optional. There is no file upload.",
      },
      {
        heading: "Current status of sending",
        body: "The form currently sends nothing and no entered data is transmitted or stored: the destination is not configured yet. Sending will be enabled only together with the publication of the company's contact details.",
      },
      {
        heading: "Cookies and analytics",
        body: "This site sets no profiling cookies and uses no technical cookies beyond any required by the browser itself. No analytics tool is active on this version of the site.",
      },
      {
        heading: "Legal basis and retention",
        body: "Processing of data entered in the form will rest on the performance of pre-contractual measures requested by the data subject. Retention periods will be stated when sending is enabled.",
      },
      {
        heading: "Rights of the data subject",
        body: "Regulation (EU) 2016/679 gives the data subject rights of access, rectification, erasure, restriction, objection and portability, as well as the right to lodge a complaint with the supervisory authority.",
      },
    ],
  },
  pending: {
    it: "L'identità e i recapiti del titolare del trattamento non sono pubblicati perché i dati societari non sono ancora stati confermati. Questa informativa non è completa finché il titolare non è identificato.",
    en: "The identity and contact details of the data controller are not published because the company details have not been confirmed. This notice is not complete until the controller is identified.",
  },
} satisfies Record<string, unknown> & { meta: PageMeta };

export const cookie = {
  meta: {
    title: { it: "Cookie — Damon", en: "Cookies — Damon" },
    description: {
      it: "Quali cookie utilizza questo sito e perché non è richiesto un banner di consenso.",
      en: "Which cookies this site uses and why no consent banner is required.",
    },
  },
  eyebrow: { it: "Cookie", en: "Cookies" },
  heading: { it: "Cookie utilizzati da questo sito", en: "Cookies used by this site" },
  lede: {
    it: "Questa versione del sito non installa cookie di profilazione né strumenti di statistica di terze parti.",
    en: "This version of the site sets no profiling cookies and uses no third-party analytics.",
  },
  sections: {
    it: [
      {
        heading: "Cookie tecnici",
        body: "Il sito non imposta cookie propri. La posizione di scorrimento fra una pagina e l'altra è conservata nella sessione del browser: è un dato tecnico locale, non viene trasmesso ad alcun server e si cancella alla chiusura della scheda.",
      },
      {
        heading: "Cookie di terze parti",
        body: "Nessuno. I caratteri tipografici sono serviti dallo stesso dominio del sito e non comportano richieste a domini esterni.",
      },
      {
        heading: "Consenso",
        body: "In assenza di cookie di profilazione e di strumenti di tracciamento non è richiesto un banner di consenso. Se in futuro venisse attivato uno strumento di statistica, questa pagina e l'informativa privacy verranno aggiornate prima della sua attivazione.",
      },
    ],
    en: [
      {
        heading: "Technical cookies",
        body: "The site sets no cookies of its own. Scroll position between pages is kept in the browser session: it is local technical data, is never transmitted to any server and is cleared when the tab is closed.",
      },
      {
        heading: "Third-party cookies",
        body: "None. Typefaces are served from the site's own domain and cause no requests to external domains.",
      },
      {
        heading: "Consent",
        body: "With no profiling cookies and no tracking tools in place, no consent banner is required. If an analytics tool is enabled in future, this page and the privacy notice will be updated before it goes live.",
      },
    ],
  },
} satisfies Record<string, unknown> & { meta: PageMeta };

export const notFound = {
  meta: {
    title: { it: "Pagina non trovata — Damon", en: "Page not found — Damon" },
    description: {
      it: "La pagina richiesta non esiste.",
      en: "The requested page does not exist.",
    },
  },
  heading: { it: "Questa pagina non esiste", en: "This page does not exist" },
  lede: {
    it: "L'indirizzo è errato oppure la pagina è stata spostata. Da qui puoi tornare alla home o passare alle famiglie di materiali.",
    en: "The address is wrong or the page has moved. From here you can return home or go to the material families.",
  },
  home: { it: "Torna alla home", en: "Return home" },
} satisfies Record<string, unknown> & { meta: PageMeta };

export type { Text, Lines };
