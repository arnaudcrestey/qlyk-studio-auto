import Link from 'next/link';
import { Car, Mail, ShieldCheck } from 'lucide-react';

export function SiteFooter() {
  return (
    <footer className="relative border-t border-white/10 bg-[#050505]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

      <div className="container-premium py-10 sm:py-12">
        <div className="grid gap-10 text-center sm:text-left lg:grid-cols-4 lg:gap-12">
          {/* Marque */}
          <div className="mx-auto max-w-md space-y-4 sm:mx-0 lg:col-span-1">
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
              <span>Véhicule strictement respecté.</span>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/35">
              Navigation
            </p>

            <nav className="flex flex-col items-center gap-3 text-sm text-white/60 sm:items-start">
              <Link href="/" className="transition hover:text-white">
                Accueil
              </Link>
              <Link href="/exemples" className="transition hover:text-white">
                Exemples
              </Link>
              <Link href="/offres" className="transition hover:text-white">
                Offres
              </Link>
              <Link href="/contact" className="transition hover:text-white">
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/35">
              Contact
            </p>

            <div className="mx-auto max-w-xs rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:mx-0">
              <div className="flex items-center justify-center gap-2 text-sm font-medium text-white sm:justify-start">
                <Mail className="h-4 w-4 text-blue-400" />
                <span>Échange direct</span>
              </div>

              <a
                href="mailto:contact@qlykstudio.fr"
                className="mt-3 block break-all text-sm text-blue-300 transition hover:text-white"
              >
                contact@qlykstudio.fr
              </a>

              <p className="mt-3 text-xs leading-relaxed text-white/45">
                Pour une demande concession, un besoin spécifique ou une question
                avant dépôt.
              </p>
            </div>
          </div>

          {/* Actions */}
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

        {/* Bas footer */}
        <div className="mt-10 border-t border-white/10 pt-6">
          <div className="flex flex-col gap-5 text-center text-xs text-white/35 md:flex-row md:items-center md:justify-between md:text-left">
            <p>
              © {new Date().getFullYear()} Qlyk Studio Auto. Tous droits
              réservés.
            </p>

            <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 md:justify-end">
              <Link href="/mentions-legales" className="transition hover:text-white/70">
                Mentions légales
              </Link>
              <Link
                href="/politique-de-confidentialite"
                className="transition hover:text-white/70"
              >
                Confidentialité
              </Link>
              <Link
                href="/politique-de-cookies"
                className="transition hover:text-white/70"
              >
                Cookies
              </Link>
              <Link
                href="/conditions-generales"
                className="transition hover:text-white/70"
              >
                Conditions générales
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
