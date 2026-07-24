import type { Locale } from "../config/locales";
import type { RouteId } from "../config/routes";
import { productMedia, type MediaAsset } from "./media";

export type ProductRouteId = Extract<RouteId, `prodotti-${string}`>;

/**
 * Copy discipline for this file.
 *
 * Every string below describes the *material class* — what masterbatch or a
 * regranulate is, in terms any process engineer would recognise. None of it
 * asserts anything about Damon: no grade list, no certification, no supplier,
 * no territory, no capacity. Those are owner inputs and remain open in
 * PENDING_DECISIONS (P-004 certifications, P-005 partner marks and MATER-BI®).
 *
 * A category page therefore tells the reader what the family is and invites a
 * sample request, which is the approved business outcome. It does not pretend
 * to a catalogue that has not been supplied.
 */
export interface ProductFamily {
  routeId: ProductRouteId;
  /** Physical form, mono-set. Describes what the photograph actually shows. */
  form: Record<Locale, string>;
  /** Card line and meta description. One sentence. */
  summary: Record<Locale, string>;
  /** Page lede. Definition of the material class. */
  definition: Record<Locale, string>;
  /** Page body. General, verifiable properties of the class. */
  detail: Record<Locale, readonly string[]>;
  media: MediaAsset;
  /** The bio marker is reserved for the biopolymer line. */
  marker?: "bio";
}

export const productFamilies: readonly ProductFamily[] = [
  {
    routeId: "prodotti-masterbatch",
    form: { it: "Granulo · pigmentato", en: "Pellet · pigmented" },
    summary: {
      it: "Concentrati di pigmento e additivo su polimero veicolante, dosati in trasformazione.",
      en: "Pigment and additive concentrates on a carrier polymer, dosed during conversion.",
    },
    definition: {
      it: "Il masterbatch è un concentrato di pigmento o di additivo disperso in un polimero veicolante. Si dosa in percentuale ridotta sul polimero base durante la trasformazione, per colorare o per conferire una funzione.",
      en: "A masterbatch is a concentrate of pigment or additive dispersed in a carrier polymer. It is dosed at a low percentage into the base polymer during conversion, to colour it or to give it a function.",
    },
    detail: {
      it: [
        "Il vantaggio rispetto al pigmento in polvere è la dispersione: il colore è già omogeneo nel veicolante, quindi non richiede di essere disperso in linea e non contamina l'ambiente di lavoro.",
        "La compatibilità fra veicolante e polimero base determina il risultato. Una scheda tecnica indica il polimero veicolante, la concentrazione e il dosaggio consigliato: sono i tre dati da confrontare prima di una prova.",
      ],
      en: [
        "The advantage over powder pigment is dispersion: the colour is already homogeneous in the carrier, so it does not need dispersing in line and does not contaminate the working environment.",
        "Compatibility between carrier and base polymer determines the result. A datasheet states the carrier polymer, the concentration and the recommended let-down ratio — the three figures to compare before a trial.",
      ],
    },
    media: productMedia.masterbatch,
  },
  {
    routeId: "prodotti-polimeri",
    form: { it: "Granulo · naturale", en: "Pellet · natural" },
    summary: {
      it: "Termoplastici in granulo naturale, non colorati, base della trasformazione.",
      en: "Thermoplastics in natural, uncoloured pellet form — the base of conversion.",
    },
    definition: {
      it: "I polimeri in granulo naturale sono la materia prima di base della trasformazione: termoplastici non colorati, forniti in forma uniforme e pronti a essere fusi, formati e, dove serve, pigmentati in linea.",
      en: "Polymers in natural pellet form are the base raw material of conversion: uncoloured thermoplastics supplied in uniform form, ready to be melted, formed and, where required, pigmented in line.",
    },
    detail: {
      it: [
        "La scelta di un grado non si fa sul nome commerciale ma sui dati di processo: indice di fluidità, densità, comportamento reologico alla temperatura di lavorazione.",
        "Lo stesso polimero in gradi diversi si comporta in modo diverso a iniezione, a estrusione film e a soffiaggio. Il processo di destinazione è il primo dato da dichiarare quando si richiede un campione.",
      ],
      en: [
        "A grade is not chosen on its trade name but on its process data: melt flow index, density, rheological behaviour at processing temperature.",
        "The same polymer in different grades behaves differently in injection moulding, film extrusion and blow moulding. The target process is the first thing to state when requesting a sample.",
      ],
    },
    media: productMedia.polimeri,
  },
  {
    routeId: "prodotti-biopolimeri",
    form: { it: "Granulo · bio", en: "Pellet · bio" },
    summary: {
      it: "Polimeri di origine biologica o biodegradabili, alternativi ai petrolchimici.",
      en: "Bio-based or biodegradable polymers as an alternative to petrochemical ones.",
    },
    definition: {
      it: "Con bio-polimeri si indicano due famiglie che non coincidono: i polimeri di origine biologica, ricavati da materia prima rinnovabile, e i polimeri biodegradabili o compostabili, definiti dal loro comportamento a fine vita.",
      en: "The term biopolymer covers two families that do not coincide: bio-based polymers, derived from renewable feedstock, and biodegradable or compostable polymers, defined by their end-of-life behaviour.",
    },
    detail: {
      it: [
        "Un polimero può essere di origine biologica senza essere biodegradabile, e biodegradabile pur essendo di origine fossile. Confondere le due proprietà è l'errore più comune in fase di specifica.",
        "La compostabilità è una proprietà certificata da un ente terzo secondo norme dedicate, riferita a condizioni di trattamento precise. Va letta sul certificato del materiale, mai dedotta dalla famiglia di appartenenza.",
      ],
      en: [
        "A polymer can be bio-based without being biodegradable, and biodegradable while being fossil-based. Conflating the two properties is the most common specification error.",
        "Compostability is a property certified by a third party against dedicated standards and referred to defined treatment conditions. It is read off the material's certificate, never inferred from the family it belongs to.",
      ],
    },
    media: productMedia.biopolimeri,
    marker: "bio",
  },
  {
    routeId: "prodotti-additivi",
    form: { it: "Polvere + granulo", en: "Powder + pellet" },
    summary: {
      it: "Sostanze funzionali che modificano lavorazione o prestazione del polimero.",
      en: "Functional substances that modify polymer processing or performance.",
    },
    definition: {
      it: "Gli additivi sono sostanze funzionali dosate nel polimero per modificarne il comportamento in lavorazione o le prestazioni nel prodotto finito. Sono l'unica categoria che non si presenta soltanto in granulo: esistono in polvere e veicolati su granulo.",
      en: "Additives are functional substances dosed into a polymer to modify its behaviour during processing or its performance in the finished product. They are the one category that is not simply another pellet: they exist as powder and carried on pellet.",
    },
    detail: {
      it: [
        "La forma di fornitura non è un dettaglio logistico. Una polvere richiede un sistema di dosaggio e un controllo della dispersione; un additivo veicolato si dosa come un masterbatch.",
        "Additivi diversi possono interferire fra loro. Quando in formulazione ne convivono più d'uno, la prova su materiale reale dice più della somma delle schede tecniche.",
      ],
      en: [
        "The supply form is not a logistics detail. A powder needs a dosing system and dispersion control; a carried additive is dosed like a masterbatch.",
        "Different additives can interfere with one another. When a formulation contains more than one, a trial on real material tells you more than the sum of the datasheets.",
      ],
    },
    media: productMedia.additivi,
  },
  {
    routeId: "prodotti-compound",
    form: { it: "Granulo · caricato", en: "Pellet · filled" },
    summary: {
      it: "Polimeri già formulati e caricati, pronti alla trasformazione.",
      en: "Pre-formulated and filled polymers, ready for conversion.",
    },
    definition: {
      it: "Un compound è un polimero già formulato: carica minerale, rinforzo o additivazione sono dispersi nella fase di compounding, a monte, e non in fase di trasformazione. Chi trasforma riceve un granulo pronto e ripetibile.",
      en: "A compound is a pre-formulated polymer: mineral filler, reinforcement or additivation are dispersed upstream during compounding, not during conversion. The converter receives a ready, repeatable pellet.",
    },
    detail: {
      it: [
        "La carica cambia il materiale, non solo il costo: rigidezza, stabilità dimensionale, comportamento termico e ritiro allo stampaggio si spostano tutti insieme.",
        "Un compound sposta la variabilità dalla linea di trasformazione alla formulazione. È la ragione per cui si sceglie: il risultato non dipende dalla capacità di dosare correttamente in reparto.",
      ],
      en: [
        "Filler changes the material, not only its cost: stiffness, dimensional stability, thermal behaviour and moulding shrinkage all move together.",
        "A compound moves variability off the converting line and into the formulation. That is why it is chosen: the result does not depend on dosing correctly on the shop floor.",
      ],
    },
    media: productMedia.compound,
  },
  {
    routeId: "prodotti-rigenerati",
    form: { it: "Rigranulato", en: "Regranulate" },
    summary: {
      it: "Rigranulati da materiale post-industriale e post-consumo.",
      en: "Regranulate from post-industrial and post-consumer material.",
    },
    definition: {
      it: "I rigenerati sono rigranulati ottenuti da materiale post-industriale o post-consumo, selezionato, macinato ed estruso di nuovo in granulo. Rientrano nel ciclo produttivo come materia prima a tutti gli effetti.",
      en: "Recycled materials are regranulates obtained from post-industrial or post-consumer material, sorted, ground and re-extruded into pellet. They re-enter production as raw material in their own right.",
    },
    detail: {
      it: [
        "Il colore e l'aspetto non sono uniformi. Non è un difetto: è la traccia visibile dell'origine del materiale, e va messa in conto nella specifica del prodotto finito.",
        "La provenienza — post-industriale o post-consumo — cambia il grado di controllo sul materiale di partenza, e quindi la costanza fra un lotto e il successivo. È il dato da chiarire prima di ogni altra cosa.",
      ],
      en: [
        "Colour and appearance are not uniform. That is not a defect: it is the visible trace of where the material came from, and it belongs in the specification of the finished product.",
        "Provenance — post-industrial or post-consumer — changes how much control there is over the incoming material, and therefore how consistent one batch is with the next. It is the first thing to establish.",
      ],
    },
    media: productMedia.rigenerati,
  },
];

const familyByRoute = new Map(
  productFamilies.map((family) => [family.routeId, family]),
);

export function getProductFamily(routeId: ProductRouteId): ProductFamily {
  const family = familyByRoute.get(routeId);
  if (!family) throw new Error(`No product family for route: ${routeId}`);
  return family;
}

export const productRouteIds = productFamilies.map((family) => family.routeId);
