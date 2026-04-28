import { Card } from '@/components/ui/card';

const styles = [
  {
    title: 'Showroom premium',
    description: 'Présentation propre et nette, idéale pour un site de concession.',
    image: '/images/bmw-premium.jpg',
  },
  {
    title: 'Concession réaliste',
    description: 'Projection crédible dans un environnement automobile réel.',
    image: '/images/bmw-lifestyle.jpg',
  },
  {
    title: 'Annonce optimisée',
    description: 'Visuel clair et impactant pour Leboncoin / Autoscout.',
    image: '/images/bmw-signature.jpg',
  },
];

export function StylesSection() {
  return (
    <section className="section-spacing">
      <div className="container-premium">

        <h2 className="text-center font-serif text-3xl sm:text-4xl">
          Utilisations possibles
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {styles.map((style) => (
            <Card key={style.title} className="text-center">

              <div
                className="mb-4 aspect-[4/3] rounded-lg border border-technical bg-cover bg-center transition-transform duration-300 hover:scale-105"
                style={{ backgroundImage: `url(${style.image})` }}
              />

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
