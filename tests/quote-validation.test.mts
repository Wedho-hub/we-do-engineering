// Run with: npm test  (Node's built-in test runner with native TypeScript support — no extra dependencies)
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  EMPTY_QUOTE,
  normalise,
  safeFilename,
  sniffFileType,
  validateQuote,
  validateUploads,
  type QuoteCatalog,
} from "../src/lib/quote-validation.ts";

const catalog: QuoteCatalog = {
  "welding-steel-fabrication": { name: "Welding & Steel Fabrication", services: ["Steel gates", "On-site welding"] },
};

const valid = {
  ...EMPTY_QUOTE,
  name: "Thandi Nkosi",
  phone: "082 123 4567",
  email: "",
  customerType: "Homeowner",
  category: "welding-steel-fabrication",
  service: "Steel gates",
  location: "Walmer, Gqeberha",
  description: "Need a new sliding driveway gate, about 4m wide.",
  contactMethod: "WhatsApp",
};

test("accepts a complete, valid request without email when WhatsApp is preferred", () => {
  const r = validateQuote(normalise(valid), catalog);
  assert.equal(r.ok, true);
});

test("requires name, phone, customer type, category, location and description", () => {
  const r = validateQuote(normalise({}), catalog);
  assert.equal(r.ok, false);
  if (!r.ok) {
    for (const k of ["name", "phone", "customerType", "category", "location", "description"]) {
      assert.ok(r.errors[k as keyof typeof r.errors], `expected error for ${k}`);
    }
  }
});

test("requires email when email is the preferred contact method", () => {
  const r = validateQuote(normalise({ ...valid, contactMethod: "Email" }), catalog);
  assert.equal(r.ok, false);
  if (!r.ok) assert.ok(r.errors.email);
});

test("rejects invalid phone numbers and emails", () => {
  const r = validateQuote(normalise({ ...valid, phone: "abc123", email: "not-an-email" }), catalog);
  assert.equal(r.ok, false);
  if (!r.ok) {
    assert.ok(r.errors.phone);
    assert.ok(r.errors.email);
  }
});

test("rejects services that don't belong to the chosen category, and unknown values", () => {
  const r = validateQuote(
    normalise({ ...valid, service: "Kitchen cupboards", customerType: "Hacker", contactMethod: "Fax" }),
    catalog,
  );
  assert.equal(r.ok, false);
  if (!r.ok) {
    assert.ok(r.errors.service);
    assert.ok(r.errors.customerType);
    assert.ok(r.errors.contactMethod);
  }
});

test("allows 'other' category without a specific service", () => {
  const r = validateQuote(normalise({ ...valid, category: "other", service: "" }), catalog);
  assert.equal(r.ok, true);
});

test("normalise trims strings and ignores non-string values", () => {
  const f = normalise({ name: "  Sam  ", phone: 123 as unknown as string });
  assert.equal(f.name, "Sam");
  assert.equal(f.phone, "");
});

test("upload limits: count, type, size", () => {
  assert.equal(validateUploads([{ name: "a.jpg", size: 1000, type: "image/jpeg" }]), null);
  assert.match(validateUploads(Array(6).fill({ name: "a.jpg", size: 10, type: "image/jpeg" }))!, /no more than 5/);
  assert.match(validateUploads([{ name: "a.exe", size: 10, type: "application/x-msdownload" }])!, /supported file type/);
  assert.match(validateUploads([{ name: "big.pdf", size: 5 * 1024 * 1024, type: "application/pdf" }])!, /too large/);
  assert.match(
    validateUploads([
      { name: "a.pdf", size: 3 * 1024 * 1024, type: "application/pdf" },
      { name: "b.pdf", size: 3 * 1024 * 1024, type: "application/pdf" },
    ])!,
    /in total/,
  );
  assert.match(validateUploads([{ name: "empty.jpg", size: 0, type: "image/jpeg" }])!, /empty/);
});

test("file signature sniffing detects real types and rejects spoofed files", () => {
  assert.equal(sniffFileType(new Uint8Array([0xff, 0xd8, 0xff, 0xe0])), "image/jpeg");
  assert.equal(sniffFileType(new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])), "image/png");
  assert.equal(sniffFileType(new TextEncoder().encode("RIFF....WEBPVP8 ")), "image/webp");
  assert.equal(sniffFileType(new TextEncoder().encode("%PDF-1.7")), "application/pdf");
  assert.equal(sniffFileType(new TextEncoder().encode("<script>alert(1)</script>")), null);
  assert.equal(sniffFileType(new TextEncoder().encode("MZ\x90\x00")), null);
});

test("safeFilename strips unsafe characters and fixes the extension", () => {
  assert.equal(safeFilename("../../etc/pass wd.php", 0, "image/jpeg"), "..-..-etc-pass-wd.jpg");
  assert.equal(safeFilename("плани.pdf", 2, "application/pdf"), "attachment-3.pdf");
});
