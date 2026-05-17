import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck, Clock3 } from 'lucide-react';

export default function DepotVolumeSuccessPage() {
  return (
    <section className="relative overflow-hidden bg-black px-4 py-20 sm:px-6 lg:py-28">
      <div className="absolute inset-x-0 top-0 -z-10 mx-auto h-80 max-w-4xl rounded-full bg-green-400/10 blur-3xl" />
      <div className="absolute inset-x-0 bottom-0 -z-10 mx-auto h-72 max-w-5xl rounded-full bg-blue-500/10 blur-3xl" />

      <div className="mx-auto max-w-4xl">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] shadow-2xl shadow-black/40 backdrop-blur-xl">
          <div className="border-b border-white/10 bg-gradient-to-br from-green-400/10 via-white/[0.04] to-blue-500/10 px-6 py-10 text-center sm:px-10 sm:py-14">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-green-400/30 bg-green-400/15 text-green-300 shadow-[0_0_45px_rgba(74,222,128,0.30)]">
              <CheckCircle2 size={34} />
            </div>

            <p className="mt-7 text-xs font-semibold uppercase tracking-[0.35em] text-green-300/80">
              Dépôt reçu
            </p>

            <h1 className="mx-auto mt-4 max-w-2xl text-4xl font-light tracking-tight text-white sm:text-5xl">
              Votre dépôt volume a bien été transmis
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
              Les visuels ont bien été reçus par QLYK Studio Auto.
              Nous analysons actuellement votre dépôt afin de préparer
              la suite du traitement.
            </p>
          </div>

          <div className="grid gap-5 px-6 py-8 sm:px-10 lg:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
              <ShieldCheck className="text-green-300" size={24} />

              <h3 className="mt-4 text-sm font-semibold text-white">
                Dépôt sécurisé
              </h3>

              <p className="mt-2 text-sm leading-6 text-white/50">
                Les fichiers transmis sont associés à votre dossier QLYK Studio Auto.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
              <Clock3 className="text-blue-300" size={24} />

              <h3 className="mt-4 text-sm font-semibold text-white">
                Vérification en cours
              </h3>

              <p className="mt-2 text-sm leading-6 text-white/50">
                Nous contrôlons les visuels et préparons la suite du traitement.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
              <ArrowRight className="text-white" size={24} />

              <h3 className="mt-4 text-sm font-semibold text-white">
                Retour rapide
              </h3>

              <p className="mt-2 text-sm leading-6 text-white/50">
                Vous recevrez un retour avec les prochaines étapes après étude du dépôt.
              </p>
            </div>
          </div>

          <div className="border-t border-white/10 px-6 py-8 sm:px-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-2xl text-sm leading-6 text-white/45">
                Merci pour votre confiance.
              </p>

              <Link
                href="/"
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#2563eb] px-7 text-sm font-semibold text-white shadow-[0_0_30px_rgba(37,99,235,0.35)] transition hover:scale-[1.02] hover:bg-[#3b82f6]"
              >
                Retour au site
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
