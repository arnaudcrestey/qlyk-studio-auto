import { Card } from '@/components/ui/card';

const examples = [
  { category: 'Citadine', style: 'Annonce optimisée', before: '/images/ex-citadine-avant.jpg', after: '/images/ex-citadine.jpg' },
  { category: 'SUV', style: 'Concession réaliste', before: '/images/ex-suv-avant.jpg', after: '/images/ex-suv.jpg' },
  { category: 'Sportive', style: 'Ambiance premium', before: '/images/ex-sport-avant.jpg', after: '/images/ex-sport.jpg' },
  { category: 'Utilitaire', style: 'Usage professionnel', before: '/images/ex-utilitaire-avant.jpg', after: '/images/ex-utilitaire.jpg' },
  { category: 'Familiale', style: 'Projection client', before: '/images/ex-familiale-avant.jpg', after: '/images/ex-familiale.jpg' },
  { category: 'Haut de gamme', style: 'Showroom luxe', before: '/images/ex-luxe-avant.jpg', after: '/images/ex-luxe.jpg' },
];

export default function ExemplesPage() {
  return (
    <section className="section-spacing">
      <div className="container-premium">
        <h1 className="text-center font-serif text-4xl sm:text-5xl">
          Exemples de transformations
        </h1>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {examples.map((example) => (
            <Card key={example.category}>
              <p className="mb-3 text-xs tracking-[0.18em] uppercase text-premium">
                {example.category}
              </p>

              <div className="grid grid-cols-2 gap-2">
                <div
                  className="aspect-[4/3] rounded-md border border-dashed border-technical bg-cover bg-center"
                  style={{ backgroundImage: `url(${example.before})` }}
                />

                <div
                  className="aspect-[4/3] rounded-md border border-premium/40 bg-cover bg-center"
                  style={{ backgroundImage: `url(${example.after})` }}
                />
              </div>

              <p className="mt-4 text-sm text-foreground/80">
                Style : {example.style}
              </p>

              <p className="mt-1 text-xs uppercase tracking-wide text-foreground/70">
                Véhicule inchangé
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
