import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="border-t border-technical/70 py-10">
      <div className="container-premium flex flex-col items-center justify-between gap-4 text-center text-sm text-foreground/70 md:flex-row md:text-left">
        <p>© {new Date().getFullYear()} Qlyk Studio Auto. Tous droits réservés.</p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/offres" className="hover:text-white">
            Offres
          </Link>
          <Link href="/contact" className="hover:text-white">
            Contact
          </Link>
          <Link href="/deposer-un-vehicule" className="hover:text-white">
            Déposer un véhicule
          </Link>
        </div>
      </div>
    </footer>
  );
}
