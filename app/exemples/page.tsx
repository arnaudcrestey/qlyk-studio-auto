import { Card } from '@/components/ui/card';

const examples = [
  {
    category: 'Citadine',
    style: 'Annonce optimisée',
    before: '/images/ex-citadine-avant.jpg',
    after: '/images/ex-citadine.jpg',
  },
  {
    category: 'SUV',
    style: 'Concession réaliste',
    before: '/images/ex-suv-avant.jpg',
    after: '/images/ex-suv.jpg',
  },
  {
    category: 'Sportive',
    style: 'Ambiance premium',
    before: '/images/ex-sport-avant.jpg',
    after: '/images/ex-sport.jpg',
  },
  {
    category: 'Utilitaire',
    style: 'Usage professionnel',
    before: '/images/ex-utilitaire-avant.jpg',
    after: '/images/ex-utilitaire.jpg',
  },
  {
    category: 'Familiale',
    style: 'Projection client',
    before: '/images/ex-familiale-avant.jpg',
    after: '/images/ex-familiale.jpg',
  },
  {
    category: 'Haut de gamme',
    style: 'Showroom luxe',
    before: '/images/ex-luxe-avant.jpg',
    after: '/images/ex-luxe.jpg',
  },
];

export default function ExemplesPage() {
  return (
    <section className="section-spacing">
      <div className="container-premium">
        <h1 className="mx-auto max-w-4xl text-center font-serif text-4xl leading-tight sm:text-5xl">
          Exemples de transformations
        </h1>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {examples.map((example) => (
            <Card key={example.category}>
              <p className="mb-3 text-xs uppercase tracking-[0.18em] text-premium">
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

        <div className="mx-auto mt-16 max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-premium">
            Personnalisation
          </p>

          <h2 className="mt-4 font-serif text-2xl leading-tight sm:text-3xl">
            Chaque garage peut créer son propre univers visuel
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-foreground/80 sm:text-base">
            Les exemples présentés ne sont que des bases. Chaque concession peut
            définir un style de présentation cohérent avec son image : showroom,
            extérieur de garage, ambiance premium ou parc automobile structuré.
          </p>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-foreground/80 sm:text-base">
            Les véhicules restent strictement identiques. Seul l’environnement
            est optimisé pour valoriser la perception.
          </p>

          <div className="mx-auto mt-7 flex max-w-2xl flex-wrap justify-center gap-3">
            <span className="rounded-full border border-white/10 px-3 py-1.5 text-xs uppercase tracking-wide text-foreground/70">
              Showroom personnalisé
            </span>

            <span className="rounded-full border border-white/10 px-3 py-1.5 text-xs uppercase tracking-wide text-foreground/70">
              Décor aux couleurs du garage
            </span>

            <span className="rounded-full border border-white/10 px-3 py-1.5 text-xs uppercase tracking-wide text-foreground/70">
              Ambiance premium cohérente
            </span>

            <span className="rounded-full border border-white/10 px-3 py-1.5 text-xs uppercase tracking-wide text-foreground/70">
              Présentation homogène du parc
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
