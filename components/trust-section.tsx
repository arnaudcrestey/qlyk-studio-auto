import { CheckCircle2 } from 'lucide-react';

const points = ['véhicule strictement inchangé', 'aucun ajout', 'aucune suppression'];

export function TrustSection() {
  return (
    <section className="section-spacing border-y border-technical/70 bg-black/20">
      <div className="container-premium">
        <h2 className="text-center font-serif text-3xl sm:text-4xl">Garantie fidélité</h2>
        <div className="mx-auto mt-8 max-w-3xl space-y-4">
          {points.map((point) => (
            <div
              key={point}
              className="flex items-center gap-3 rounded-lg border border-technical/80 bg-technical/25 px-4 py-4 text-base"
            >
              <CheckCircle2 className="h-5 w-5 shrink-0 text-premium" />
              <p className="uppercase tracking-wide">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
