import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

export default function DepotVehiculeSuccesPage() {
  return (
    <section className="section-spacing">
      <div className="container-premium max-w-3xl">
        <div className="rounded-3xl border border-green-400/20 bg-green-400/10 p-8 text-center shadow-[0_0_70px_rgba(34,197,94,0.12)] sm:p-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-green-400/30 bg-green-400/15 text-green-300">
            <CheckCircle2 size={34} />
          </div>

          <h1 className="mt-6 font-serif text-4xl text-foreground sm:text-5xl">
            Dépôt envoyé avec succès
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-foreground/70">
            Votre véhicule et vos photos ont bien été transmis à Qlyk Studio Auto.
            Nous revenons vers vous rapidement avec les prochaines indications.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex h-12 items-center justify-center rounded-full bg-premium px-7 text-sm font-medium text-white transition hover:bg-premium/90"
            >
              Retour à l’accueil
            </Link>

            <Link
              href="/deposer-un-vehicule"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-7 text-sm font-medium text-foreground transition hover:border-premium/40 hover:bg-premium/10"
            >
              Déposer un autre véhicule
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
