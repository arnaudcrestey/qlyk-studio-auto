import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const offers = [
  { title: 'Essentiel', details: ['1 véhicule', '1 visuel'], featured: false },
  { title: 'Pro (recommandé)', details: ['1 véhicule', '3 styles'], featured: true },
  { title: 'Concession', details: ['volume mensuel', 'homogénéité', 'priorité'], featured: false }
];

export function OffersSection() {
  return (
    <section className="section-spacing">
      <div className="container-premium">
        <h2 className="text-center font-serif text-3xl sm:text-4xl">Offres</h2>
        <p className="mt-3 text-center text-foreground/80">Sur devis</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {offers.map((offer) => (
            <Card
              key={offer.title}
              className={offer.featured ? 'border-premium/60 bg-premium/10' : ''}
            >
              <h3 className="text-xl font-semibold">{offer.title}</h3>
              <ul className="mt-4 space-y-2 text-sm text-foreground/80">
                {offer.details.map((detail) => (
                  <li key={detail}>• {detail}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/offres">
            <Button variant="outline">Voir toutes les offres</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
