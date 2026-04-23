import { Card } from '@/components/ui/card';

const offers = [
  {
    title: 'Essentiel',
    items: ['1 véhicule', '1 visuel']
  },
  {
    title: 'Pro (recommandé)',
    items: ['1 véhicule', '3 styles']
  },
  {
    title: 'Concession',
    items: ['volume mensuel', 'homogénéité', 'priorité']
  }
];

export default function OffresPage() {
  return (
    <section className="section-spacing">
      <div className="container-premium">
        <h1 className="text-center font-serif text-4xl sm:text-5xl">Nos offres</h1>
        <p className="mt-4 text-center text-lg text-foreground/80">Sur devis</p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {offers.map((offer, index) => (
            <Card key={offer.title} className={index === 1 ? 'border-premium/60 bg-premium/10' : ''}>
              <h2 className="text-xl font-semibold">{offer.title}</h2>
              <ul className="mt-4 space-y-2 text-sm text-foreground/80">
                {offer.items.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
