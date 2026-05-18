import Link from "next/link";
import { ArrowRight, ShieldCheck, Download, ImageIcon } from "lucide-react";

export default function LivraisonPage() {
  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.20),transparent_55%)]" />

        <div className="relative mx-auto flex w-full max-w-6xl flex-col px-6 py-24 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-200 backdrop-blur-sm">
              Livraison sécurisée QLYK
            </div>

            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Vos visuels sont prêts.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
              QLYK vous permet d’accéder à vos photos finales via un espace de
              livraison privé, sécurisé et accessible depuis le lien transmis
              par email.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/15">
                <ShieldCheck className="h-6 w-6 text-blue-400" />
              </div>

              <h2 className="text-lg font-medium text-white">
                Accès sécurisé
              </h2>

              <p className="mt-3 text-sm leading-7 text-white/60">
                Chaque livraison possède un lien privé transmis uniquement au
                client concerné.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/15">
                <ImageIcon className="h-6 w-6 text-blue-400" />
              </div>

              <h2 className="text-lg font-medium text-white">
                Visuels optimisés
              </h2>

              <p className="mt-3 text-sm leading-7 text-white/60">
                Retrouvez vos photos transformées et préparées pour vos annonces
                professionnelles.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/15">
                <Download className="h-6 w-6 text-blue-400" />
              </div>

              <h2 className="text-lg font-medium text-white">
                Téléchargement simple
              </h2>

              <p className="mt-3 text-sm leading-7 text-white/60">
                Téléchargez vos visuels en quelques secondes depuis votre espace
                de livraison.
              </p>
            </div>
          </div>

          <div className="mt-16 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-white">
                  Accéder à une livraison
                </h2>

                <p className="mt-3 max-w-2xl text-white/60">
                  Utilisez le lien privé reçu par email afin d’accéder à vos
                  visuels et procéder au téléchargement.
                </p>
              </div>

              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-4 text-sm font-medium text-white transition hover:bg-blue-500"
              >
                Retour au site
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
