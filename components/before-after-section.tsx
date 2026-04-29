import { Card } from '@/components/ui/card';

export function BeforeAfterSection() {
  return (
    <section className="section-spacing border-y border-technical/70 bg-black/20">
      <div className="container-premium">
        <h2 className="text-center font-serif text-3xl sm:text-4xl">Avant / Après</h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-foreground/80">
          Même véhicule. Nouveau contexte. Impact immédiat.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          
          {/* AVANT */}
          <Card>
            <p className="mb-3 text-xs tracking-[0.2em] uppercase text-foreground/60">
              Avant
            </p>
            <div className="aspect-[16/10] rounded-lg border border-dashed border-technical bg-[url('/images/peugeot-avant.jpg')] bg-cover bg-center" />
          </Card>

          {/* APRES */}
          <Card>
            <p className="mb-3 text-xs tracking-[0.2em] uppercase text-premium">
              Après
            </p>
            <div className="aspect-[16/10] rounded-lg border border-premium/30 bg-[url('/images/peugeot-apres.jpg')] bg-cover bg-center" />
          </Card>

        </div>
      </div>
    </section>
  );
}
