import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const offers = [
  {
    title: 'Essentiel',
    badge: 'Pour tester',
    description: 'Tester la qualité Qlyk sur un premier véhicule.',
    items: ['1 photo envoyée', '1 visuel premium optimisé', '1 décor au choix'],
    cta: 'Tester avec mon véhicule',
    highlight: false
  },
  {
    title: 'Pro',
    badge: 'Recommandé',
    description: 'Créer plusieurs visuels cohérents pour mieux présenter une annonce.',
    items: ['1 véhicule', '3 styles visuels', 'cohérence visuelle renforcée'],
    cta: 'Créer mes visuels',
    highlight: true
  },
  {
    title: 'Concession',
    badge: 'Sur mesure',
    description: 'Mettre en place une production régulière pour tout votre parc.',
    items: ['volume mensuel', 'homogénéité du parc', 'priorité & suivi'],
    cta: 'Mettre en place le système',
    highlight: false
  }
];

const steps = [
  'Vous envoyez une photo',
  'Vous choisissez un style',
  'On crée votre visuel',
  'Vous recevez le résultat'
];

export default function OffresPage() {
  return (
    <section className="section-spacing overflow-hidden">
      <div className="container-premium">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-premium">
            Qlyk Studio Auto
          </p>

          <h1 className="font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
            Nos offres
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-foreground/75 sm:text-lg">
            Une approche simple pour transformer vos photos véhicules en visuels premium prêts à vendre.
          </p>

          <p className="mt-3 text-sm text-foreground/50">
            Offres adaptées sur devis selon le volume et le besoin.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:gap-6 lg:mt-16 lg:grid-cols-3">
          {offers.map((offer) => (
            <Card
              key={offer.title}
              className={`relative flex min-h-[330px] flex-col justify-between rounded-3xl p-6 sm:p-8 transition-all duration-300 ${
                offer.highlight
                  ? 'border-premium/70 bg-premium/10 shadow-[0_0_45px_rgba(37,99,235,0.35)] lg:-translate-y-3'
                  : 'border-white/10 bg-white/[0.03]'
              }`}
            >
              {offer.highlight && (
                <div className="absolute right-5 top-5 rounded-full border border-premium/40 bg-premium/15 px-3 py-1 text-xs font-medium text-premium">
                  Recommandé
                </div>
              )}

              <div>
                <p className="mb-5 inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-foreground/60">
                  {offer.badge}
                </p>

                <h2 className="max-w-[85%] text-2xl font-semibold tracking-tight">
                  {offer.title}
                </h2>

                <p className="mt-4 text-sm leading-relaxed text-foreground/65 sm:text-base">
                  {offer.description}
                </p>

                <ul className="mt-6 space-y-3 text-sm text-foreground/80 sm:text-base">
                  {offer.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full bg-premium" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link href="/depot-vehicule" className="mt-8 block">
                <Button className="h-12 w-full rounded-full text-sm font-medium sm:text-base">
                  {offer.cta}
                </Button>
              </Link>
            </Card>
          ))}
        </div>

        <div className="mx-auto mt-20 max-w-5xl rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-center sm:p-8 lg:mt-24">
          <h3 className="font-serif text-3xl sm:text-4xl">
            Comment ça marche
          </h3>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div
                key={step}
                className="rounded-2xl border border-white/10 bg-black/20 p-5 text-left sm:text-center"
              >
                <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-premium/15 text-sm font-semibold text-premium sm:mx-auto">
                  {index + 1}
                </div>

                <p className="text-sm leading-relaxed text-foreground/75 sm:text-base">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
