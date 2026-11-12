"use client";

import { useEffect, useId, useRef, useState } from "react";
import UiIcon from "@/components/UiIcon";
import { buttonClass } from "@/components/ui";
import { business, whatsappLink } from "@/lib/business";
import {
  CONTACT_METHODS,
  CUSTOMER_TYPES,
  EMPTY_QUOTE,
  OTHER_CATEGORY,
  UPLOAD_LIMITS,
  normalise,
  quoteSummary,
  validateQuote,
  validateUploads,
  type QuoteCatalog,
  type QuoteErrors,
  type QuoteFields,
} from "@/lib/quote-validation";

type Attachment = { id: string; file: File; preview: string | null };
type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string; fallback: boolean };

/** Resizes photos in the browser so uploads stay small and fast on mobile data. */
async function prepareFile(file: File): Promise<File> {
  if (file.type === "application/pdf") return file;
  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  } catch {
    throw new Error(`"${file.name}" couldn't be read. Please upload a JPG, PNG or PDF instead.`);
  }
  const max = UPLOAD_LIMITS.imageMaxDimension;
  const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.82));
  if (!blob) throw new Error(`"${file.name}" couldn't be processed.`);
  return new File([blob], file.name.replace(/\.[^.]+$/, "") + ".jpg", { type: "image/jpeg" });
}

const formatSize = (bytes: number) =>
  bytes > 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;

const inputClass = (invalid: boolean) =>
  `w-full rounded-lg border bg-white px-4 py-3 text-base text-ink placeholder:text-ink/40 transition focus:outline-none focus:ring-2 focus:ring-navy ${
    invalid ? "border-accent-strong ring-1 ring-accent-strong" : "border-navy/20"
  }`;

function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? (
    <p id={id} className="mt-1.5 flex items-start gap-1.5 text-sm font-medium text-accent-strong">
      {message}
    </p>
  ) : null;
}

function Label({ htmlFor, children, required }: { htmlFor: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-navy">
      {children}
      {required ? (
        <span className="text-accent-strong" aria-hidden="true">
          {" "}*
        </span>
      ) : (
        <span className="font-normal text-ink/50"> (optional)</span>
      )}
    </label>
  );
}

export default function QuoteForm({
  catalog,
  initialCategory = "",
  initialService = "",
}: {
  catalog: QuoteCatalog;
  initialCategory?: string;
  initialService?: string;
}) {
  const uid = useId();
  const [fields, setFields] = useState<QuoteFields>({ ...EMPTY_QUOTE, category: initialCategory, service: initialService });
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [processing, setProcessing] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const summaryRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  // Release preview object URLs when attachments are removed / component unmounts.
  const attachmentsRef = useRef(attachments);
  useEffect(() => {
    attachmentsRef.current = attachments;
  }, [attachments]);
  useEffect(() => () => attachmentsRef.current.forEach((a) => a.preview && URL.revokeObjectURL(a.preview)), []);

  const services = catalog[fields.category]?.services ?? [];
  const id = (name: string) => `${uid}-${name}`;

  function update<K extends keyof QuoteFields>(key: K, value: QuoteFields[K]) {
    setFields((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "category") next.service = "";
      return next;
    });
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  async function onFilesSelected(list: FileList | null) {
    if (!list?.length) return;
    setProcessing(true);
    setErrors((prev) => ({ ...prev, files: undefined }));
    try {
      const prepared: Attachment[] = [];
      for (const file of Array.from(list)) {
        const ready = await prepareFile(file);
        prepared.push({
          id: `${ready.name}-${ready.size}-${Math.random().toString(36).slice(2)}`,
          file: ready,
          preview: ready.type.startsWith("image/") ? URL.createObjectURL(ready) : null,
        });
      }
      const combined = [...attachments, ...prepared];
      const err = validateUploads(combined.map((a) => ({ name: a.file.name, size: a.file.size, type: a.file.type })));
      if (err) {
        prepared.forEach((a) => a.preview && URL.revokeObjectURL(a.preview));
        setErrors((prev) => ({ ...prev, files: err }));
      } else {
        setAttachments(combined);
      }
    } catch (e) {
      setErrors((prev) => ({ ...prev, files: (e as Error).message }));
    } finally {
      setProcessing(false);
      if (fileInput.current) fileInput.current.value = "";
    }
  }

  function removeAttachment(attId: string) {
    setAttachments((prev) => {
      const found = prev.find((a) => a.id === attId);
      if (found?.preview) URL.revokeObjectURL(found.preview);
      return prev.filter((a) => a.id !== attId);
    });
    setErrors((prev) => ({ ...prev, files: undefined }));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.kind === "submitting" || processing) return;

    const data = normalise(fields);
    const result = validateQuote(data, catalog);
    if (!result.ok) {
      setErrors(result.errors);
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    const body = new FormData();
    (Object.keys(data) as (keyof QuoteFields)[]).forEach((k) => body.append(k, data[k]));
    body.append("company_website", (e.currentTarget.elements.namedItem("company_website") as HTMLInputElement)?.value ?? "");
    attachments.forEach((a) => body.append("files", a.file, a.file.name));

    setStatus({ kind: "submitting" });
    try {
      const res = await fetch("/api/quote", { method: "POST", body });
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        errors?: QuoteErrors;
        message?: string;
        fallback?: boolean;
      };
      if (res.ok && json.ok) {
        setStatus({ kind: "success" });
        requestAnimationFrame(() => statusRef.current?.focus());
        return;
      }
      if (json.errors) {
        setErrors(json.errors);
        setStatus({ kind: "idle" });
        requestAnimationFrame(() => summaryRef.current?.focus());
        return;
      }
      setStatus({ kind: "error", message: json.message ?? "Something went wrong sending your request.", fallback: true });
    } catch {
      setStatus({ kind: "error", message: "We couldn't reach our server — please check your connection.", fallback: true });
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  function reset() {
    attachments.forEach((a) => a.preview && URL.revokeObjectURL(a.preview));
    setAttachments([]);
    setFields({ ...EMPTY_QUOTE });
    setErrors({});
    setStatus({ kind: "idle" });
  }

  const whatsappFallback = whatsappLink(quoteSummary(normalise(fields), catalog));

  if (status.kind === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="flex flex-col items-center py-10 text-center focus:outline-none">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/15 text-accent-strong">
          <UiIcon name="check-circle" className="h-9 w-9" />
        </span>
        <h2 className="mt-5 text-2xl font-bold text-navy">Thank you — your request has been sent</h2>
        <p className="mt-3 max-w-md text-ink/70">
          We&apos;ll review your project details and contact you by <strong>{fields.contactMethod.toLowerCase()}</strong>{" "}
          {business.responseTime}.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href={whatsappFallback} target="_blank" rel="noopener noreferrer" className={buttonClass("secondary")}>
            <UiIcon name="whatsapp" /> Send more photos on WhatsApp
          </a>
          <button type="button" onClick={reset} className={buttonClass("outline-dark")}>
            Submit another request
          </button>
        </div>
      </div>
    );
  }

  const errorList = Object.entries(errors).filter(([, v]) => v) as [string, string][];
  const describedBy = (name: keyof QuoteErrors, hint?: boolean) =>
    [hint ? id(`${name}-hint`) : null, errors[name] ? id(`${name}-error`) : null].filter(Boolean).join(" ") || undefined;

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6" aria-describedby={id("intro")}>
      <div>
        <h2 className="text-2xl font-bold text-navy">Request a quotation</h2>
        <p id={id("intro")} className="mt-1 text-sm text-ink/65">
          Fields marked <span className="text-accent-strong">*</span> are required. It takes about two minutes.
        </p>
      </div>

      {errorList.length > 0 && (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="rounded-lg border-l-4 border-accent-strong bg-accent/10 p-4 focus:outline-none">
          <p className="font-bold text-ink">Please check the following:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink/80">
            {errorList.map(([k, v]) => (
              <li key={k}>
                <a href={`#${id(k)}`} className="underline hover:text-accent-strong">
                  {v}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Honeypot (hidden from people and assistive tech) */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={id("company_website")}>Company website</label>
        <input id={id("company_website")} name="company_website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <fieldset className="grid gap-5 sm:grid-cols-2">
        <legend className="sr-only">Your details</legend>
        <div className="sm:col-span-2">
          <Label htmlFor={id("name")} required>
            Full name
          </Label>
          <input
            id={id("name")}
            name="name"
            autoComplete="name"
            value={fields.name}
            onChange={(e) => update("name", e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={describedBy("name")}
            className={inputClass(!!errors.name)}
          />
          <FieldError id={id("name-error")} message={errors.name} />
        </div>
        <div>
          <Label htmlFor={id("phone")} required>
            Phone number
          </Label>
          <input
            id={id("phone")}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="e.g. 082 123 4567"
            value={fields.phone}
            onChange={(e) => update("phone", e.target.value)}
            aria-invalid={!!errors.phone}
            aria-describedby={describedBy("phone")}
            className={inputClass(!!errors.phone)}
          />
          <FieldError id={id("phone-error")} message={errors.phone} />
        </div>
        <div>
          <Label htmlFor={id("email")} required={fields.contactMethod === "Email"}>
            Email address
          </Label>
          <input
            id={id("email")}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={fields.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={describedBy("email")}
            className={inputClass(!!errors.email)}
          />
          <FieldError id={id("email-error")} message={errors.email} />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor={id("customerType")} required>
            I am a…
          </Label>
          <select
            id={id("customerType")}
            name="customerType"
            value={fields.customerType}
            onChange={(e) => update("customerType", e.target.value)}
            aria-invalid={!!errors.customerType}
            aria-describedby={describedBy("customerType")}
            className={inputClass(!!errors.customerType)}
          >
            <option value="">Select customer type…</option>
            {CUSTOMER_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <FieldError id={id("customerType-error")} message={errors.customerType} />
        </div>
      </fieldset>

      <fieldset className="grid gap-5 border-t border-navy/10 pt-6 sm:grid-cols-2">
        <legend className="sr-only">Your project</legend>
        <div>
          <Label htmlFor={id("category")} required>
            Service category
          </Label>
          <select
            id={id("category")}
            name="category"
            value={fields.category}
            onChange={(e) => update("category", e.target.value)}
            aria-invalid={!!errors.category}
            aria-describedby={describedBy("category")}
            className={inputClass(!!errors.category)}
          >
            <option value="">Select a service category…</option>
            {Object.entries(catalog).map(([slug, c]) => (
              <option key={slug} value={slug}>
                {c.name}
              </option>
            ))}
            <option value={OTHER_CATEGORY}>Other / not sure</option>
          </select>
          <FieldError id={id("category-error")} message={errors.category} />
        </div>
        <div>
          <Label htmlFor={id("service")}>Specific service</Label>
          <select
            id={id("service")}
            name="service"
            value={fields.service}
            onChange={(e) => update("service", e.target.value)}
            disabled={services.length === 0}
            aria-invalid={!!errors.service}
            aria-describedby={describedBy("service")}
            className={`${inputClass(!!errors.service)} disabled:bg-mist disabled:text-ink/50`}
          >
            <option value="">{services.length ? "Select a service…" : "Choose a category first"}</option>
            {services.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <FieldError id={id("service-error")} message={errors.service} />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor={id("location")} required>
            Project location
          </Label>
          <input
            id={id("location")}
            name="location"
            autoComplete="address-level2"
            placeholder="Town or city, e.g. Johannesburg, Durban or Gaborone"
            value={fields.location}
            onChange={(e) => update("location", e.target.value)}
            aria-invalid={!!errors.location}
            aria-describedby={describedBy("location")}
            className={inputClass(!!errors.location)}
          />
          <FieldError id={id("location-error")} message={errors.location} />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor={id("description")} required>
            Project description
          </Label>
          <textarea
            id={id("description")}
            name="description"
            rows={5}
            maxLength={3000}
            placeholder="What needs to be done? Include sizes or quantities, materials, timing and anything else that helps us quote."
            value={fields.description}
            onChange={(e) => update("description", e.target.value)}
            aria-invalid={!!errors.description}
            aria-describedby={describedBy("description")}
            className={`${inputClass(!!errors.description)} resize-y`}
          />
          <FieldError id={id("description-error")} message={errors.description} />
        </div>

        {/* Uploads */}
        <div className="sm:col-span-2">
          <Label htmlFor={id("files")}>Photos or documents</Label>
          <p id={id("files-hint")} className="mb-2 text-sm text-ink/60">
            Up to {UPLOAD_LIMITS.maxFiles} files – JPG, PNG, WebP or PDF. Photos are resized automatically before upload.
          </p>
          <label
            htmlFor={id("files")}
            className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-navy/25 bg-mist px-4 py-6 text-center transition-colors hover:border-accent focus-within:ring-2 focus-within:ring-navy"
          >
            <UiIcon name="upload" className="h-7 w-7 text-navy" />
            <span className="font-semibold text-navy">{processing ? "Preparing files…" : "Tap to add photos or plans"}</span>
          </label>
          <input
            ref={fileInput}
            id={id("files")}
            type="file"
            multiple
            accept={UPLOAD_LIMITS.accept}
            onChange={(e) => onFilesSelected(e.target.files)}
            aria-describedby={describedBy("files", true)}
            aria-invalid={!!errors.files}
            className="sr-only"
            disabled={processing || attachments.length >= UPLOAD_LIMITS.maxFiles}
          />
          <FieldError id={id("files-error")} message={errors.files} />
          {attachments.length > 0 && (
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {attachments.map((a) => (
                <li key={a.id} className="flex items-center gap-3 rounded-lg bg-white p-2 ring-1 ring-navy/10">
                  {a.preview ? (
                    // eslint-disable-next-line @next/next/no-img-element -- local object URL preview
                    <img src={a.preview} alt="" className="h-12 w-12 rounded object-cover" />
                  ) : (
                    <span className="flex h-12 w-12 items-center justify-center rounded bg-mist text-navy">
                      <UiIcon name="file" />
                    </span>
                  )}
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-ink">{a.file.name}</span>
                    <span className="block text-xs text-ink/60">{formatSize(a.file.size)}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => removeAttachment(a.id)}
                    className="rounded-full p-1.5 text-ink/60 hover:bg-mist hover:text-accent-strong"
                    aria-label={`Remove ${a.file.name}`}
                  >
                    <UiIcon name="x" className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </fieldset>

      <fieldset className="border-t border-navy/10 pt-6">
        <legend className="mb-3 text-sm font-semibold text-navy">
          Preferred contact method <span className="text-accent-strong" aria-hidden="true">*</span>
        </legend>
        <div className="grid grid-cols-3 gap-2" id={id("contactMethod")}>
          {CONTACT_METHODS.map((m) => {
            const checked = fields.contactMethod === m;
            return (
              <label
                key={m}
                className={`flex cursor-pointer items-center justify-center gap-2 rounded-lg px-2 py-3 text-sm font-semibold ring-1 transition-colors focus-within:ring-2 focus-within:ring-navy ${
                  checked ? "bg-navy text-white ring-navy" : "bg-white text-navy ring-navy/20 hover:bg-mist"
                }`}
              >
                <input
                  type="radio"
                  name="contactMethod"
                  value={m}
                  checked={checked}
                  onChange={() => update("contactMethod", m)}
                  className="sr-only"
                />
                <UiIcon name={m === "WhatsApp" ? "whatsapp" : m === "Email" ? "mail" : "phone"} className="h-4 w-4" />
                {m}
              </label>
            );
          })}
        </div>
        <FieldError id={id("contactMethod-error")} message={errors.contactMethod} />
      </fieldset>

      {status.kind === "error" && (
        <div ref={statusRef} tabIndex={-1} role="alert" className="rounded-lg bg-navy p-5 text-white focus:outline-none">
          <p className="font-bold">{status.message}</p>
          <p className="mt-1 text-sm text-white/80">
            Your details are still here. You can try again, or send the same request instantly on WhatsApp.
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <a href={whatsappFallback} target="_blank" rel="noopener noreferrer" className={buttonClass("primary")}>
              <UiIcon name="whatsapp" /> Send via WhatsApp
            </a>
            <a href={business.phoneHref} className={buttonClass("outline-light")}>
              <UiIcon name="phone" /> Call {business.phone}
            </a>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={status.kind === "submitting" || processing}
        className={`${buttonClass("primary", "lg")} w-full uppercase tracking-wide disabled:cursor-wait disabled:opacity-70`}
      >
        {status.kind === "submitting" ? "Sending your request…" : "Send Quote Request"}
        {status.kind !== "submitting" && <UiIcon name="arrow-right" />}
      </button>
      <p className="flex items-center justify-center gap-2 text-center text-xs text-ink/60">
        <UiIcon name="shield" className="h-4 w-4" />
        Your details are only used to respond to your enquiry.
      </p>
    </form>
  );
}
