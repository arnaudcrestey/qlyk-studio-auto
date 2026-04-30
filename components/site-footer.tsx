import Link from 'next/link';
import type { Route } from 'next';
import { Car, ShieldCheck } from 'lucide-react';

type FooterLink = {
  label: string;
  href: Route;
};

const navigationLinks: FooterLink[] = [
  { label: 'Accueil', href: '/' },
  { label: 'Exemples', href: '/exemples' },
  { label: 'Offres', href: '/offres' },
  { label: 'Contact', href: '/contact' }
];

const legalLinks: FooterLink[] = [
  { label: 'Mentions légales', href: '/mentions-legales' },
  { label: 'Politique de confidentialité', href: '/politique-de-confidentialite' },
  { label: 'Politique de cookies', href: '/politique-de-cookies' },
  { label: 'Conditions générales', href: '/conditions-generales' }
];

export function SiteFooter() {
  return (
    <footer className="relative border-t border-white/10 bg-[#050505]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

      <div className="container-premium py-10 sm:py-12">
        <div className="grid gap-10 text-center sm:text-left md:grid-cols-[1.4fr_1fr_1fr] lg:gap-16">
          <div className="mx-auto max-w-md space-y-4 sm:mx-0">
            <div className="flex items-center justify-center gap-2 text-white sm:justify-start">
              <Car className="h-4 w-4 text-blue-500" />
              <span className="text-xs font-semibold uppercase tracking-[0.24em]">
                Qlyk Studio Auto
              </span>
            </div>

            <p className="text-sm leading-relaxed text-white/55">
              Studio visuel automobile premium. Nous transformons vos photos en
              visuels prêts à vendre, sans jamais modifier le véhicule.
            </p>

            <div className="flex items-center justify-center gap-2 text-xs text-white/45 sm:justify-start">
              <ShieldCheck className="h-4 w-4 text-green-400" />
              <span>Forme, couleur, jantes et proportions respectées.</span>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/35">
              Navigation
            </p>

            <nav className="flex flex-col items-center gap-3 text-sm text-white/60 sm:items-start">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-4">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/35">
              Démarrer
            </p>

            <div className="flex flex-col items-center gap-3 sm:items-start">
              <Link
                href="/deposer-un-vehicule"
                className="inline-flex w-full max-w-xs items-center justify-center rounded-full border border-blue-500/40 bg-blue-500/10 px-5 py-2.5 text-sm font-medium text-blue-300 transition hover:border-blue-400 hover:bg-blue-500/20 hover:text-white sm:w-auto"
              >
                Déposer un véhicule
              </Link>

              <Link
                href="/contact"
                className="inline-flex w-full max-w-xs items-center justify-center rounded-full border border-white/10 px-5 py-2.5 text-sm text-white/65 transition hover:border-white/25 hover:text-white sm:w-auto"
              >
                Demande personnalisée
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <div className="flex flex-col gap-5 text-center text-xs text-white/35 md:flex-row md:items-center md:justify-between md:text-left">
            <p>
              © {new Date().getFullYear()} Qlyk Studio Auto. Tous droits réservés.
            </p>

            <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 md:justify-end">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition hover:text-white/70"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
