'use client';

import Link from 'next/link';
import { useState } from 'react';
import { CarFront, Menu, X } from 'lucide-react';

const links = [
  { label: "Accueil", href: "/" as const },
  { label: "Exemples", href: "/exemples" as const },
  { label: "Offres", href: "/offres" as const },
  { label: "Déposer un véhicule", href: "/deposer-un-vehicule" as const },
  { label: "Contact", href: "/contact" as const },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-technical/70 bg-background/95 backdrop-blur">
      <div className="container-premium flex min-h-16 items-center justify-between gap-4 py-3">
        
        {/* Logo */}
        <Link href="/" className="inline-flex items-center gap-2" onClick={() => setOpen(false)}>
          <CarFront className="h-5 w-5 text-premium" />
          <span className="text-sm font-semibold tracking-[0.24em] uppercase">
            Qlyk Studio Auto
          </span>
        </Link>

        {/* Menu desktop */}
        <nav className="hidden items-center gap-5 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-foreground/85 transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA desktop */}
        <Link
          href="/deposer-un-vehicule"
          className="hidden rounded-md border border-premium px-4 py-2 text-sm font-medium text-white transition hover:bg-premium/10 md:inline-flex"
        >
          Déposer
        </Link>

        {/* Burger */}
        <button
          onClick={() => setOpen(!open)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-technical md:hidden"
          aria-label="Menu"
          type="button"
        >
          {open ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* MENU MOBILE (conditionnel) */}
      {open && (
        <div className="border-t border-technical/70 bg-background md:hidden">
          <nav className="container-premium flex flex-col gap-2 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-4 py-3 text-sm text-foreground/90 transition hover:bg-technical hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
