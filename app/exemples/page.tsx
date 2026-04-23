import { Card } from '@/components/ui/card';

const examples = [
  'Citadine',
  'SUV',
  'Sportive',
  'Utilitaire',
  'Haut de gamme'
].map((category) => ({
  category,
  style: 'Showroom Premium'
}));

export default function ExemplesPage() {
  return (
    <section className="section-spacing">
      <div className="container-premium">
        <h1 className="text-center font-serif text-4xl sm:text-5xl">Exemples de transformations</h1>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {examples.map((example) => (
            <Card key={example.category}>
              <p className="mb-3 text-xs tracking-[0.18em] uppercase text-premium">{example.category}</p>
              <div className="grid grid-cols-2 gap-2">
                <div className="aspect-[4/3] rounded-md border border-dashed border-technical bg-[url('/images/placeholder.jpg')] bg-cover bg-center" />
                <div className="aspect-[4/3] rounded-md border border-premium/40 bg-[url('/images/placeholder.jpg')] bg-cover bg-center" />
              </div>
              <p className="mt-4 text-sm text-foreground/80">Style : {example.style}</p>
              <p className="mt-1 text-xs tracking-wide text-foreground/70 uppercase">véhicule inchangé</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
