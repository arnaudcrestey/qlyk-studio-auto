'use client';

import Link from 'next/link';
import { useState } from 'react';
import { CarFront, Menu, X } from 'lucide-react';

const links = [
  { label: 'Accueil', href: '/' as const },
  { label: 'Exemples', href: '/exemples' as const },
  { label: 'Offres', href: '/offres' as const },
  { label: 'Déposer un véhicule', href: '/deposer-un-vehicule' as const },
  { label: 'Contact', href: '/contact' as const },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/85 backdrop-blur-xl">
      <div className="container-premium flex min-h-20 items-center justify-between gap-4 py-4">
        <Link href="/" className="inline-flex items-center gap-3" onClick={() => setOpen(false)}>
          <CarFront className="h-5 w-5 text-premium" />
          <span className="text-sm font-semibold uppercase tracking-[0.28em] text-white">
            Qlyk Studio Auto
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-white/70 transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/deposer-un-vehicule"
          className="hidden rounded-full border border-premium/70 px-5 py-2 text-sm font-medium text-white shadow-[0_0_24px_rgba(37,99,235,0.25)] transition hover:bg-premium/15 md:inline-flex"
        >
          Déposer
        </Link>

        <button
          onClick={() => setOpen(!open)}
          className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.03] text-white shadow-[0_0_28px_rgba(37,99,235,0.18)] backdrop-blur transition hover:border-premium/60 md:hidden"
          aria-label="Menu"
          type="button"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden">
          <div className="mx-4 mb-4 rounded-[2rem] border border-white/10 bg-[#070707]/95 p-4 shadow-[0_20px_80px_rgba(37,99,235,0.18)] backdrop-blur-2xl">
            <nav className="flex flex-col">
              {links.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-center justify-between border-b border-white/10 px-4 py-4 text-lg text-white/80 transition last:border-b-0 hover:text-white"
                >
                  <span>{link.label}</span>
                  <span className="text-xs text-premium/80">0{index + 1}</span>
                </Link>
              ))}

              <Link
                href="/deposer-un-vehicule"
                onClick={() => setOpen(false)}
                className="mt-5 rounded-2xl bg-premium px-5 py-4 text-center text-base font-semibold text-white shadow-[0_0_35px_rgba(37,99,235,0.45)] transition hover:scale-[1.01]"
              >
                Déposer un véhicule
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
