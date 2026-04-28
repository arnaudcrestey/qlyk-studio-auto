import { Card } from '@/components/ui/card';

const styles = [
  {
    title: 'Showroom premium',
    description: 'Présentation propre et nette, idéale pour un site de concession.',
  },
  {
    title: 'Concession réaliste',
    description: 'Projection crédible dans un environnement automobile réel.',
  },
  {
    title: 'Annonce optimisée',
    description: 'Visuel clair et impactant pour Leboncoin / Autoscout.',
  },
];

export function StylesSection() {
  return (
    <section className="section-spacing">
      <div className="container-premium">
        <h2 className="text-center font-serif text-3xl sm:text-4xl">
          Utilisations possibles
        </h2>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {styles.map((style) => (
            <Card key={style.title} className="text-center">
              
              <div className="mb-4 aspect-[4/3] rounded-lg border border-technical bg-[url('/images/bmw-apres.jpg')] bg-cover bg-center" />

              <p className="text-lg font-medium">{style.title}</p>

              <p className="mt-2 text-sm text-foreground/70">
                {style.description}
              </p>

            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
