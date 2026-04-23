import { Card } from '@/components/ui/card';

const styles = ['Showroom Premium', 'Lifestyle valorisant', 'Signature cinématique'];

export function StylesSection() {
  return (
    <section className="section-spacing">
      <div className="container-premium">
        <h2 className="text-center font-serif text-3xl sm:text-4xl">Styles disponibles</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {styles.map((style) => (
            <Card key={style} className="text-center">
              <div className="mb-4 aspect-[4/3] rounded-lg border border-technical bg-[url('/images/placeholder.jpg')] bg-cover bg-center" />
              <p className="text-lg font-medium">{style}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
