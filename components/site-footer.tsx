import Link from 'next/link';
import { Mail, ShieldCheck, Car } from 'lucide-react';

export function SiteFooter() {
  return (
    <footer className="relative border-t border-white/10 bg-[#070707]">
      {/* Glow subtil premium */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

      <div className="container-premium py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          
          {/* Bloc marque */}
          <div className="max-w-sm space-y-4">
            <div className="flex items-center gap-2 text-white">
              <Car className="h-4 w-4 text-blue-500" />
              <span className="text-sm tracking-[0.2em] uppercase">
                Qlyk Studio Auto
              </span>
            </div>

            <p className="text-sm leading-relaxed text-foreground/60">
              Studio visuel automobile premium.  
              Nous transformons vos photos en visuels prêts à vendre, sans jamais modifier le véhicule.
            </p>

            <div className="flex items-center gap-2 text-xs text-foreground/50">
              <ShieldCheck className="h-4 w-4 text-green-400" />
              Véhicule strictement respecté
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-4 text-sm">
            <span className="text-xs uppercase tracking-widest text-foreground/40">
              Navigation
            </span>

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
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-4 text-sm">
            <span className="text-xs uppercase tracking-widest text-foreground/40">
              Actions
            </span>

            <Link
              href="/deposer-un-vehicule"
              className="inline-flex items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-400 transition hover:bg-blue-500/20 hover:text-white"
            >
              Déposer un véhicule
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/10 px-4 py-2 text-sm text-foreground/70 transition hover:border-white/30 hover:text-white"
            >
              Demande personnalisée
            </Link>

            <div className="flex items-center gap-2 text-xs text-foreground/50">
              <Mail className="h-4 w-4" />
              Réponse sous 24h
            </div>
          </div>
        </div>

        {/* Bas footer */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-foreground/40 md:flex-row">
          <p>© {new Date().getFullYear()} Qlyk Studio Auto. Tous droits réservés.</p>

          <div className="flex items-center gap-4">
            <span>France</span>
            <span>•</span>
            <span>Service professionnel</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
