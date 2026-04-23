import { Card } from '@/components/ui/card';

const steps = [
  { title: '1. Envoi photos', text: 'Vous envoyez vos photos smartphone brutes depuis votre concession.' },
  { title: '2. Traitement', text: 'Nous optimisons cadrage, lumière, détourage, décor, ombres et reflets.' },
  { title: '3. Réception fichiers', text: 'Vous recevez des visuels premium alignés sur vos objectifs commerciaux.' }
];

export function ProcessSection() {
  return (
    <section className="section-spacing">
      <div className="container-premium">
        <h2 className="text-center font-serif text-3xl sm:text-4xl">Process</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {steps.map((step) => (
            <Card key={step.title} className="text-center">
              <h3 className="text-lg font-semibold text-premium">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/80">{step.text}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
