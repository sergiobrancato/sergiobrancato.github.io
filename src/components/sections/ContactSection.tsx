/**
 * src/components/sections/ContactSection.tsx
 * -----------------------------------------------------------------------------
 * CONTACT (#contact) — the finale.
 *
 * • Large "direct line" card with one-click email copy + toast confirmation.
 * • GitHub / LinkedIn / CV links, generated from profile.links + profile.cvPath.
 * • Static-friendly contact form: submitting composes a mailto draft, so it
 *   works on GitHub Pages with no backend, no environment variables and no
 *   third-party form service.
 *
 * All copy lives in profile.contact in src/content/profile.ts.
 */
"use client";

import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUp,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Copy,
  Download,
  FileText,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Send,
  type LucideIcon,
} from "lucide-react";
import { profile } from "@/content/profile";
import { assetPath } from "@/lib/assets";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import type { LinkIcon } from "@/types/portfolio";

const LINK_ICONS: Record<LinkIcon, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  cv: FileText,
  external: ArrowUpRight,
  docs: FileText,
  phone: Mail,
};

interface ContactLink {
  label: string;
  href: string;
  icon: LinkIcon;
  note: string;
  download?: boolean;
}

const EMPTY_FORM = { name: "", email: "", message: "" };

export function ContactSection() {
  const [formState, setFormState] = useState(EMPTY_FORM);
  const [toast, setToast] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const contact = profile.contact;

  /* Toast auto-dismiss ---------------------------------------------------- */
  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3400);
    return () => window.clearTimeout(timer);
  }, [toast]);

  /* Copy-confirmation icon reset ----------------------------------------- */
  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const handleCopyEmail = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(profile.email);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = profile.email;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }

      setCopied(true);
      setToast(contact.copiedLabel);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const handleFieldChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormState((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const body = [
      "Hi Sergio,",
      "",
      formState.message,
      "",
      `— ${formState.name}`,
      formState.email,
    ].join("\n");

    const subject = encodeURIComponent(contact.form.subject);
    const encodedBody = encodeURIComponent(body);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${encodedBody}`;

    setToast(contact.form.toastLabel);
  };

  const contactLinks: ContactLink[] = [
    ...profile.links
      .filter((link) => link.icon !== "mail")
      .map((link) => ({
        label: link.label,
        href: link.href,
        icon: link.icon,
        note: link.note ?? "",
      })),
    {
      label: contact.cvLabel,
      href: assetPath(profile.cvPath),
      icon: "cv",
      note: contact.cvNote,
      download: true,
    },
  ];

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative scroll-mt-20 overflow-hidden border-t border-line py-24 sm:py-28 lg:py-32"
    >
      {/* Ambient finale glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[24rem] w-[52rem] -translate-x-1/2 rounded-full bg-accent/[0.05] blur-[120px]" />
        <div className="absolute inset-0 bg-dot-grid opacity-40 mask-fade-b" />
      </div>

      <div className="section-shell relative z-10">
        <Reveal>
          <SectionHeading id="contact-heading" section={contact} />
        </Reveal>

        <div className="mt-12 grid gap-4 lg:mt-16 lg:grid-cols-12">
          {/* Direct line ------------------------------------------------- */}
          <Reveal className="lg:col-span-7" delay={0.05}>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#08080b] p-6 text-white shadow-lift sm:p-9 lg:p-10">
              {/* Atmosphere */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-dot-grid opacity-[0.18] [background-image:radial-gradient(rgba(255,255,255,0.18)_1px,transparent_1px)]"
              />
              <div
                aria-hidden="true"
                className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-pink-500/20 blur-[90px]"
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-cyan-400/15 blur-[90px]"
              />
              <div
                aria-hidden="true"
                className="absolute -right-20 -top-20 h-64 w-64 animate-spin-slow rounded-full border border-dashed border-white/10"
              >
                <span className="absolute left-1/2 top-0 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-400" />
              </div>

              <div className="relative">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-white/45">
                    {contact.directLabel}
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-mono text-[0.55rem] uppercase tracking-[0.18em] text-emerald-300/80">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-60" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-300" />
                    </span>
                    {profile.availability.shortLabel}
                  </span>
                </div>

                <a
                  href={`mailto:${profile.email}`}
                  className="group mt-7 flex items-start justify-between gap-4"
                  aria-label={`Email ${profile.name.full}`}
                >
                  <span className="break-words font-display text-[clamp(1.05rem,5.2vw,2.45rem)] font-medium leading-[1.15] tracking-[-0.035em] text-white transition-colors duration-300 group-hover:text-white/70">
                    {profile.email}
                  </span>
                  <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/60 transition-all duration-300 group-hover:border-white/30 group-hover:bg-white/10 group-hover:text-white">
                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.6} />
                  </span>
                </a>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-[0.8rem] font-medium text-[#08080b] transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/90"
                  >
                    {copied ? (
                      <Check className="h-4 w-4" strokeWidth={2} />
                    ) : (
                      <Copy className="h-4 w-4" strokeWidth={1.8} />
                    )}
                    {contact.copyLabel}
                  </button>

                  <span className="inline-flex items-center gap-2 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-white/55">
                    <span className="h-1 w-1 rounded-full bg-emerald-300/70" />
                    {contact.responseNote}
                  </span>
                </div>

                <div className="mt-8 border-t border-white/10 pt-5">
                  <p className="max-w-lg text-[0.8rem] leading-relaxed text-white/50">
                    {contact.availabilityNote}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {profile.mobility.map((place) => (
                      <span
                        key={place}
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[0.55rem] text-white/55"
                      >
                        <MapPin className="h-2.5 w-2.5" strokeWidth={1.6} />
                        {place}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Elsewhere --------------------------------------------------- */}
          <Reveal className="lg:col-span-5" delay={0.1}>
            <div className="flex h-full flex-col">
              <p className="mono-label">{contact.elsewhereLabel}</p>

              <div className="mt-3 grid flex-1 gap-2 sm:grid-cols-3 lg:grid-cols-1">
                {contactLinks.map((link) => {
                  const Icon = LINK_ICONS[link.icon];
                  const isExternal = link.href.startsWith("http");

                  return (
                    <SpotlightCard
                      key={link.label}
                      className="group rounded-xl border border-line bg-surface/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[var(--shadow-card)]"
                    >
                      <a
                        href={link.href}
                        {...(link.download
                          ? { download: "" }
                          : {
                              target: isExternal ? "_blank" : undefined,
                              rel: isExternal
                                ? "noreferrer noopener"
                                : undefined,
                            })}
                        className="flex h-full items-center gap-3.5 p-4"
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-canvas/60 text-ink-soft transition-colors duration-300 group-hover:text-accent">
                          <Icon className="h-4 w-4" strokeWidth={1.6} />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[0.8rem] font-medium text-ink">
                            {link.label}
                          </span>
                          <span className="mt-0.5 block truncate text-[0.65rem] text-muted">
                            {link.note}
                          </span>
                        </span>
                        <span className="ml-auto text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink">
                          {link.download ? (
                            <Download className="h-3.5 w-3.5" strokeWidth={1.6} />
                          ) : (
                            <ArrowUpRight
                              className="h-3.5 w-3.5"
                              strokeWidth={1.6}
                            />
                          )}
                        </span>
                      </a>
                    </SpotlightCard>
                  );
                })}
              </div>
            </div>
          </Reveal>

          {/* Form -------------------------------------------------------- */}
          <Reveal className="lg:col-span-12" delay={0.08}>
            <div className="surface-card overflow-hidden p-6 sm:p-8 lg:p-10">
              <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
                <div className="flex h-full flex-col">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-canvas/60 text-accent">
                      <Send className="h-4 w-4" strokeWidth={1.6} />
                    </span>
                    <h3 className="font-display text-xl font-medium tracking-[-0.02em] text-ink">
                      {contact.form.title}
                    </h3>
                  </div>
                  <p className="mt-4 max-w-sm text-[0.84rem] leading-relaxed text-muted">
                    {contact.form.description}
                  </p>

                  <div className="mt-8 hidden lg:block">
                    <p className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-muted/80">
                      {contact.form.checklistLabel}
                    </p>
                    <ul className="mt-4 space-y-2.5">
                      {contact.form.checklist.map((item, index) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-[0.76rem] leading-relaxed text-muted"
                        >
                          <span className="mt-[0.15rem] font-mono text-[0.54rem] text-accent">
                            0{index + 1}
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto hidden items-center gap-2 pt-8 font-mono text-[0.55rem] uppercase tracking-[0.18em] text-muted/80 lg:flex">
                    <span className="h-px w-8 bg-line-strong" />
                    {contact.form.privacyNote}
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="mb-1.5 block font-mono text-[0.56rem] uppercase tracking-[0.16em] text-muted"
                      >
                        {contact.form.nameLabel}
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        value={formState.name}
                        onChange={handleFieldChange}
                        placeholder={contact.form.namePlaceholder}
                        className="h-11 w-full rounded-lg border border-line bg-canvas/60 px-3.5 text-[0.82rem] text-ink outline-none transition-all duration-200 placeholder:text-muted/60 focus:border-line-strong focus:ring-2 focus:ring-accent/20"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="mb-1.5 block font-mono text-[0.56rem] uppercase tracking-[0.16em] text-muted"
                      >
                        {contact.form.emailLabel}
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        value={formState.email}
                        onChange={handleFieldChange}
                        placeholder={contact.form.emailPlaceholder}
                        className="h-11 w-full rounded-lg border border-line bg-canvas/60 px-3.5 text-[0.82rem] text-ink outline-none transition-all duration-200 placeholder:text-muted/60 focus:border-line-strong focus:ring-2 focus:ring-accent/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="mb-1.5 block font-mono text-[0.56rem] uppercase tracking-[0.16em] text-muted"
                    >
                      {contact.form.messageLabel}
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={4}
                      value={formState.message}
                      onChange={handleFieldChange}
                      placeholder={contact.form.messagePlaceholder}
                      className="min-h-[7rem] w-full resize-y rounded-lg border border-line bg-canvas/60 px-3.5 py-3 text-[0.82rem] leading-relaxed text-ink outline-none transition-all duration-200 placeholder:text-muted/60 focus:border-line-strong focus:ring-2 focus:ring-accent/20"
                    />
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="submit"
                      className="group inline-flex h-11 items-center justify-center gap-2 rounded-full bg-ink px-5 text-[0.8rem] font-medium text-canvas transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90"
                    >
                      {contact.form.submitLabel}
                      <ArrowUpRight
                        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        strokeWidth={1.8}
                      />
                    </button>
                    <p className="text-[0.62rem] leading-relaxed text-muted/80 sm:max-w-[16rem] sm:text-right">
                      {contact.form.note}
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Footer ------------------------------------------------------- */}
        <footer className="mt-16 border-t border-line pt-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-display text-[0.95rem] font-medium tracking-[-0.01em] text-ink">
                {profile.footer.tagline}
              </p>
              <p className="mt-1.5 text-[0.65rem] leading-relaxed text-muted">
                {profile.footer.note}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted">
              <span>
                © {new Date().getFullYear()} {profile.name.full}
              </span>
              <a
                href="#home"
                className="group inline-flex items-center gap-1.5 text-ink-soft transition-colors hover:text-ink"
              >
                {profile.footer.backToTop}
                <ArrowUp
                  className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5"
                  strokeWidth={1.7}
                />
              </a>
            </div>
          </div>
        </footer>
      </div>

      {/* Toast --------------------------------------------------------- */}
      <AnimatePresence>
        {toast && (
          <div className="pointer-events-none fixed inset-x-0 bottom-24 z-[75] flex justify-center px-4 sm:bottom-8 sm:justify-end sm:pr-8">
            <motion.div
              role="status"
              aria-live="polite"
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-2.5 rounded-full border border-line bg-surface-strong/95 px-4 py-2.5 text-[0.75rem] font-medium text-ink shadow-lift backdrop-blur-xl"
            >
              <CheckCircle2
                className="h-4 w-4 text-emerald-500 dark:text-emerald-400"
                strokeWidth={1.8}
              />
              {toast}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
