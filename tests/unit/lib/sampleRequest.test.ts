import { describe, expect, it } from "vitest";
import {
  emptySampleRequest,
  sampleRequestFields,
  validateSampleRequest,
  type SampleRequest,
} from "../../../src/lib/sampleRequest";

const valid: SampleRequest = {
  company: "Trasformati S.r.l.",
  name: "Giulia Rossi",
  email: "g.rossi@example.com",
  phone: "",
  process: "filmExtrusion",
  message: "Cerco un masterbatch bianco per film soffiato in LDPE.",
  consent: true,
};

describe("sample-request validation", () => {
  it("accepts a complete request", () => {
    expect(validateSampleRequest(valid, "it")).toEqual({});
    expect(validateSampleRequest(valid, "en")).toEqual({});
  });

  it("requires every field except the telephone", () => {
    const errors = validateSampleRequest(emptySampleRequest, "it");
    expect(Object.keys(errors).sort()).toEqual(
      ["company", "consent", "email", "message", "name", "process"].sort(),
    );
    expect(errors.phone).toBeUndefined();
  });

  it("reports errors in the reader's language", () => {
    expect(validateSampleRequest(emptySampleRequest, "it").company).toBe(
      "Campo obbligatorio.",
    );
    expect(validateSampleRequest(emptySampleRequest, "en").company).toBe(
      "This field is required.",
    );
  });

  it("rejects an address that is not an email", () => {
    for (const email of ["rossi", "rossi@", "@example.com", "a b@c.com"]) {
      expect(validateSampleRequest({ ...valid, email }, "it").email).toBe(
        "Inserisci un indirizzo email valido.",
      );
    }
  });

  it("treats whitespace as empty", () => {
    const blank = { ...valid, company: "   ", name: "\t" };
    expect(validateSampleRequest(blank, "it").company).toBeDefined();
    expect(validateSampleRequest(blank, "it").name).toBeDefined();
  });

  it("asks for a request long enough to answer", () => {
    expect(validateSampleRequest({ ...valid, message: "boh" }, "en").message).toBe(
      "Describe the request in at least ten characters.",
    );
  });

  it("will not proceed without the privacy acknowledgement", () => {
    expect(
      validateSampleRequest({ ...valid, consent: false }, "it").consent,
    ).toBe("È necessario prendere visione dell'informativa.");
  });

  it("orders the fields so the first invalid control can be focused", () => {
    expect(sampleRequestFields).toEqual([
      "company",
      "name",
      "email",
      "phone",
      "process",
      "message",
      "consent",
    ]);
    expect(Object.keys(emptySampleRequest).sort()).toEqual(
      [...sampleRequestFields].sort(),
    );
  });
});
