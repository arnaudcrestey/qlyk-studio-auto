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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.12),transparent_44%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="container-premium relative px-5 py-16 text-center sm:py-20 lg:py-24">
          <div className="mx-auto max-w-[720px]">
            <p className="mb-4 text-[0.68rem] font-medium uppercase tracking-[0.32em] text-blue-400/80 sm:text-xs">
              Dépôt véhicule
            </p>

            <h2 className="mx-auto max-w-[680px] font-serif text-[2.25rem] leading-[1.08] tracking-[-0.04em] text-white sm:text-5xl lg:text-[3.75rem]">
              Prêt à valoriser votre stock automobile&nbsp;?
            </h2>

            <p className="mx-auto mt-6 max-w-[560px] text-[1rem] leading-7 text-white/68 sm:text-lg sm:leading-8">
              Déposez un véhicule et recevez un rendu premium fidèle,
              <br className="hidden sm:block" />
              sans aucune modification du véhicule.
            </p>

            <div className="mt-9 flex justify-center">
              <Link href="/deposer-un-vehicule">
                <Button className="h-12 rounded-full bg-blue-600 px-8 text-sm font-semibold text-white shadow-[0_0_35px_rgba(37,99,235,0.32)] transition hover:bg-blue-500 sm:px-9">
                  Déposer un véhicule
                </Button>
              </Link>
            </div>

            <p className="mx-auto mt-6 max-w-[440px] text-xs leading-5 text-white/38 sm:max-w-[560px]">
              Véhicule conservé strictement à l’identique : carrosserie, couleur, jantes
              <span className="whitespace-nowrap"> et proportions.</span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
