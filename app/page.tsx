import Link from 'next/link';
import { HeroSection } from '@/components/hero-section';
import { BeforeAfterSection } from '@/components/before-after-section';
import { StylesSection } from '@/components/styles-section';
import { TrustSection } from '@/components/trust-section';
import { ProcessSection } from '@/components/process-section';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BeforeAfterSection />
      <StylesSection />
      <TrustSection />
      <ProcessSection />

      <section className="relative overflow-hidden border-t border-white/10 bg-[#070707]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.12),transparent_38%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="container-premium relative py-20 text-center sm:py-24 lg:py-28">
          <div className="mx-auto max-w-3xl">
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.35em] text-blue-400/80">
              Dépôt véhicule
            </p>

            <h2 className="font-serif text-[2.15rem] leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">
              Prêt à valoriser votre stock automobile&nbsp;?
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-white/70 sm:text-lg">
              Déposez un véhicule et recevez un rendu premium fidèle, sans aucune
              modification du véhicule.
            </p>

            <div className="mt-10 flex justify-center">
              <Link href="/deposer-un-vehicule">
                <Button className="h-12 rounded-full bg-blue-600 px-7 text-sm font-semibold text-white shadow-[0_0_40px_rgba(37,99,235,0.35)] transition hover:bg-blue-500 sm:h-13 sm:px-9">
                  Déposer un véhicule
                </Button>
              </Link>
            </div>

            <p className="mx-auto mt-6 max-w-md text-xs leading-5 text-white/40">
              Véhicule conservé strictement à l’identique : carrosserie, couleur,
              jantes et proportions.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
