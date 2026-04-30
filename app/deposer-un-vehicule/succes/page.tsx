import Link from 'next/link';
import { ArrowRight, CheckCircle2, Clock3, Mail, ShieldCheck } from 'lucide-react';

export default function DepotVehiculeSuccesPage() {
  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:py-28">
      <div className="absolute inset-x-0 top-10 -z-10 mx-auto h-80 max-w-4xl rounded-full bg-green-400/10 blur-3xl" />
      <div className="absolute inset-x-0 bottom-0 -z-10 mx-auto h-72 max-w-5xl rounded-full bg-blue-500/10 blur-3xl" />

      <div className="mx-auto max-w-4xl">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] shadow-2xl shadow-black/40 backdrop-blur-xl">
          <div className="border-b border-white/10 bg-gradient-to-br from-green-400/[0.12] via-white/[0.04] to-blue-500/[0.08] px-6 py-10 text-center sm:px-10 sm:py-14">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-green-400/30 bg-green-400/15 text-green-300 shadow-[0_0_45px_rgba(34,197,94,0.18)]">
              <CheckCircle2 size={34} />
            </div>

            <p className="mt-7 text-xs font-semibold uppercase tracking-[0.35em] text-green-300/80">
              Demande reçue
            </p>

            <h1 className="mx-auto mt-4 max-w-2xl font-serif text-4xl font-light tracking-tight text-white sm:text-5xl">
              Votre demande a bien été transmise
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
              Merci. Les informations envoyées ont bien été reçues par Qlyk Studio Auto.
              Nous allons les analyser et revenir vers vous avec une réponse claire.
            </p>
          </div>

          <div className="grid gap-4 p-6 sm:p-8 lg:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
              <Mail className="h-5 w-5 text-blue-300" />
              <h2 className="mt-4 text-sm font-semibold text-white">Confirmation envoyée</h2>
              <p className="mt-2 text-xs leading-5 text-white/55">
                Un email de confirmation vient de vous être adressé automatiquement.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
              <Clock3 className="h-5 w-5 text-blue-300" />
              <h2 className="mt-4 text-sm font-semibold text-white">Analyse de la demande</h2>
              <p className="mt-2 text-xs leading-5 text-white/55">
                Nous vérifions votre besoin, vos éléments transmis et la suite la plus adaptée.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
              <ShieldCheck className="h-5 w-5 text-blue-300" />
              <h2 className="mt-4 text-sm font-semibold text-white">Traitement soigné</h2>
              <p className="mt-2 text-xs leading-5 text-white/55">
                Chaque demande est traitée avec attention, sans modification du véhicule d’origine.
              </p>
            </div>
          </div>

          <div className="border-t border-white/10 px-6 pb-8 pt-2 sm:px-8 sm:pb-10">
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/"
                className="inline-flex h-12 items-center justify-center rounded-full bg-blue-500 px-7 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-400"
              >
                Retour à l’accueil
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>

              <Link
                href="/deposer-un-vehicule"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-7 text-sm font-medium text-white transition hover:border-blue-400/40 hover:bg-blue-500/10"
              >
                Déposer un véhicule
              </Link>

              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-7 text-sm font-medium text-white transition hover:border-blue-400/40 hover:bg-blue-500/10"
              >
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
