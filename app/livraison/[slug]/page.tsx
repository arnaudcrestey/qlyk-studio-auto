import Link from "next/link";
import { Download, ImageIcon, ShieldCheck } from "lucide-react";

type PageProps = {
  params: {
    slug: string;
  };
};

export default function LivraisonClientPage({ params }: PageProps) {
  const clientSlug = params.slug.replaceAll("-", " ");

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <section className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-8 lg:px-12">
        <div className="mb-10">
          <Link href="/livraison" className="text-sm text-blue-300 hover:text-blue-200">
            ← Retour livraison
          </Link>

          <div className="mt-8 inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-200">
            Livraison privée QLYK
          </div>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
            Vos visuels sont prêts
          </h1>

          <p className="mt-5 max-w-2xl text-white/65">
            Espace de livraison privé pour :{" "}
            <span className="capitalize text-white">{clientSlug}</span>
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex aspect-[4/3] items-center justify-center rounded-3xl border border-white/10 bg-white/5"
            >
              <div className="text-center">
                <ImageIcon className="mx-auto h-10 w-10 text-blue-300" />
                <p className="mt-3 text-sm text-white/50">Photo finale {item}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-4">
              <ShieldCheck className="mt-1 h-5 w-5 text-blue-300" />
              <div>
                <h2 className="font-medium">Livraison sécurisée</h2>
                <p className="mt-1 text-sm text-white/55">
                  Les fichiers définitifs seront reliés ici via Supabase.
                </p>
              </div>
            </div>

            <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-4 text-sm font-medium text-white">
              <Download className="h-4 w-4" />
              Télécharger les visuels
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
