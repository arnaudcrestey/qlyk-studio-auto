import Link from 'next/link';
import type { Route } from 'next';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type Offer = {
  title: string;
  badge: string;
  price: string;
  priceNote: string;
  description: string;
  items: string[];
  note?: string;
  cta: string;
  href: Route;
  highlight: boolean;
};

const offers: Offer[] = [
  {
    title: 'Essentiel',
    badge: 'Pour démarrer',
    price: '39€',
    priceNote: 'HT / véhicule',
    description: 'Un visuel premium pour valoriser votre véhicule.',
    items: [
      '1 photo envoyée',
      '1 visuel premium optimisé',
      '1 mise en scène au choix',
      'livraison du visuel final'
    ],
    cta: 'Créer mon visuel',
    href: '/deposer-un-vehicule',
    highlight: false
  },
  {
    title: 'Pro',
    badge: 'Recommandé',
    price: '89€',
    priceNote: 'HT / véhicule',
    description: 'Plusieurs visuels premium pour valoriser une annonce.',
    items: [
      '1 véhicule',
      '3 visuels complémentaires',
      'annonce principale, réseaux sociaux',
      'cohérence visuelle renforcée'
    ],
    note:
      'Idéal pour disposer d’un visuel principal et d’une variante du même véhicule.',
    cta: 'Créer mes visuels',
    href: '/deposer-un-vehicule',
    highlight: true
  },
  {
    title: 'Concession',
    badge: 'Sur mesure',
    price: 'Offre sur mesure',
    priceNote: 'devis personnalisé',
    description:
      'Mettre en place une production régulière et homogène pour valoriser l’ensemble de votre parc.',
    items: [
      'volume mensuel',
      'homogénéité du parc',
      'priorité de traitement',
      'suivi personnalisé'
    ],
    cta: 'Mettre en place le système',
    href: '/contact',
    highlight: false
  }
];

const steps = [
  {
    title: 'Vous envoyez votre photo',
    text: 'Une photo claire du véhicule suffit pour démarrer.'
  },
  {
    title: 'Nous définissons les mises en scène',
    text: 'Essentiel : 1 mise en scène. Pro : 3 visuels complémentaires adaptés au véhicule.'
  },
  {
    title: 'Nous créons vos visuels',
    text: 'Le véhicule reste strictement fidèle : forme, couleur, jantes et proportions sont conservées.'
  },
  {
    title: 'Vous recevez le résultat',
    text: 'Des visuels prêts à utiliser pour vos annonces, votre site ou vos supports commerciaux.'
  }
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
            Des visuels automobiles premium prêts à vendre, sans modifier le véhicule.
          </p>

          <p className="mt-3 text-sm text-foreground/50">
            Prix affichés hors taxes. Sans abonnement pour les offres Essentiel et Pro.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:gap-6 lg:mt-16 lg:grid-cols-3">
          {offers.map((offer) => (
            <Card
              key={offer.title}
              className={`relative flex min-h-[430px] flex-col justify-between rounded-3xl p-6 sm:p-8 transition-all duration-300 ${
                offer.highlight
                  ? 'border-premium/70 bg-premium/10 shadow-[0_0_45px_rgba(37,99,235,0.35)] lg:-translate-y-3'
                  : 'border-white/10 bg-white/[0.03]'
              }`}
            >
              <div>
                <p
                  className={`mb-5 inline-flex rounded-full border px-3 py-1 text-xs ${
                    offer.highlight
                      ? 'border-premium/40 bg-premium/15 text-premium'
                      : 'border-white/10 bg-white/[0.04] text-foreground/60'
                  }`}
                >
                  {offer.badge}
                </p>

                <h2 className="text-2xl font-semibold tracking-tight">
                  {offer.title}
                </h2>

                <div className="mt-5">
                  <p
                    className={`font-serif leading-none ${
                      offer.title === 'Concession'
                        ? 'text-3xl sm:text-4xl'
                        : 'text-4xl sm:text-5xl'
                    }`}
                  >
                    {offer.price}
                  </p>

                  <p className="mt-2 text-xs uppercase tracking-[0.18em] text-foreground/45">
                    {offer.priceNote}
                  </p>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-foreground/65 sm:text-base">
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

                {offer.note && (
                  <p className="mt-5 rounded-2xl border border-premium/20 bg-premium/10 p-4 text-sm leading-relaxed text-foreground/70">
                    {offer.note}
                  </p>
                )}
              </div>

              <Link href={offer.href} className="mt-8 block">
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
                key={step.title}
                className="rounded-2xl border border-white/10 bg-black/20 p-5 text-left sm:text-center"
              >
                <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-premium/15 text-sm font-semibold text-premium sm:mx-auto">
                  {index + 1}
                </div>

                <h4 className="text-sm font-semibold leading-snug text-foreground sm:text-base">
                  {step.title}
                </h4>

                <p className="mt-3 text-sm leading-relaxed text-foreground/60">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-3xl text-center text-sm leading-relaxed text-foreground/45">
          Les prix indiqués concernent la création de visuels à partir de photos fournies.
          Les demandes spécifiques, volumes importants ou besoins récurrents font l’objet d’un devis.
        </div>
      </div>
    </section>
  );
}
