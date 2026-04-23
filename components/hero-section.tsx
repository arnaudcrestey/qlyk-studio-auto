import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="section-spacing">
      <div className="container-premium text-center">
        <p className="mb-4 text-xs tracking-[0.28em] text-premium uppercase">Studio premium pour concessionnaires</p>
        <h1 className="mx-auto max-w-4xl text-balance font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
          Vos véhicules méritent mieux que des photos smartphone.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-base text-foreground/80 sm:text-lg">
          Transformation en visuels premium prêts à vendre, sans modification du véhicule.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/deposer-un-vehicule">
            <Button>Déposer un véhicule</Button>
          </Link>
          <Link href="/exemples">
            <Button variant="outline">Voir les exemples</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
