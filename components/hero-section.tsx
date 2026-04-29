import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="section-spacing">
      <div className="container-premium text-center">
        <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.32em] text-premium sm:text-xs">
          Studio visuel automobile premium
        </p>

        <h1 className="mx-auto max-w-5xl text-balance font-serif text-[2.35rem] leading-[1.05] tracking-[-0.03em] sm:text-5xl sm:leading-[1.02] lg:text-7xl">
          Vos véhicules sont prêts à vendre.
          <span className="block text-foreground/75">
            Leur décor, pas toujours.
          </span>
        </h1>

        <p className="mx-auto mt-7 max-w-2xl text-pretty text-sm leading-7 text-foreground/75 sm:text-base">
          Nous transformons l’environnement visuel de vos véhicules pour les présenter dans un cadre plus propre,
          plus professionnel et plus vendeur — sans jamais modifier le véhicule.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/deposer-un-vehicule">
            <Button className="w-full sm:w-auto">Déposer un véhicule</Button>
          </Link>

          <Link href="/exemples">
            <Button variant="outline" className="w-full sm:w-auto">
              Voir les exemples
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
