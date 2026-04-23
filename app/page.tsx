import Link from 'next/link';
import { HeroSection } from '@/components/hero-section';
import { BeforeAfterSection } from '@/components/before-after-section';
import { StylesSection } from '@/components/styles-section';
import { TrustSection } from '@/components/trust-section';
import { ProcessSection } from '@/components/process-section';
import { OffersSection } from '@/components/offers-section';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BeforeAfterSection />
      <StylesSection />
      <TrustSection />
      <ProcessSection />
      <OffersSection />

      <section className="section-spacing border-t border-technical/70">
        <div className="container-premium text-center">
          <h2 className="font-serif text-3xl sm:text-4xl">Prêt à valoriser votre stock automobile ?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-foreground/80">
            Déposez un véhicule et recevez un rendu premium fidèle, sans aucune modification du véhicule.
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/deposer-un-vehicule">
              <Button>Déposer un véhicule</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
