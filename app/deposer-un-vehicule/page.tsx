import { VehicleDepositForm } from '@/components/vehicle-deposit-form';

export default function DeposerVehiculePage() {
  return (
    <section className="section-spacing">
      <div className="container-premium max-w-4xl">
        <h1 className="text-center font-serif text-4xl sm:text-5xl">Déposer un véhicule</h1>
        <p className="mx-auto mt-4 max-w-2xl text-center text-foreground/80">
          Envoyez les informations de votre véhicule pour recevoir une proposition de traitement premium.
        </p>
        <div className="mt-8">
          <VehicleDepositForm />
        </div>
      </div>
    </section>
  );
}
