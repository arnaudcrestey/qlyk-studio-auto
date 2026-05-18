"use client";

import { useState } from "react";
import {
  Upload,
  ImageIcon,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

export default function AdminLivraisonPage() {
  const [slug, setSlug] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  function handleFiles(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return;

    setFiles(Array.from(event.target.files));
  }

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <section className="mx-auto w-full max-w-5xl px-6 py-20 sm:px-8 lg:px-12">
        <div className="mb-10">
          <div className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-200">
            Interface interne QLYK
          </div>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
            Nouvelle livraison client
          </h1>

          <p className="mt-5 max-w-2xl text-white/65">
            Préparez et organisez les visuels finaux avant livraison au client.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
          <div className="space-y-8">
            <div>
              <label className="mb-3 block text-sm font-medium text-white/80">
                Slug client
              </label>

              <input
                type="text"
                placeholder="bmw-x5-garage-martin"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-[#0b1220] px-5 py-4 text-white outline-none transition focus:border-blue-500"
              />

              <p className="mt-3 text-sm text-white/40">
                Ce slug générera automatiquement l’URL de livraison client.
              </p>
            </div>

            <div>
              <label className="mb-3 block text-sm font-medium text-white/80">
                Photos finales
              </label>

              <label className="flex cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-white/15 bg-[#0b1220] px-8 py-14 transition hover:border-blue-500/40 hover:bg-[#10192c]">
                <Upload className="h-10 w-10 text-blue-300" />

                <span className="mt-5 text-lg font-medium">
                  Déposer les visuels
                </span>

                <span className="mt-2 text-center text-sm text-white/45">
                  Sélectionnez les photos finales du véhicule
                </span>

                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFiles}
                  className="hidden"
                />
              </label>
            </div>

            {files.length > 0 && (
              <div className="rounded-2xl border border-white/10 bg-[#0b1220] p-5">
                <div className="mb-4 flex items-center gap-3">
                  <ImageIcon className="h-5 w-5 text-blue-300" />

                  <h2 className="font-medium">
                    {files.length} visuel(s) sélectionné(s)
                  </h2>
                </div>

                <div className="space-y-3">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-white/70"
                    >
                      {file.name}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="rounded-2xl border border-blue-500/10 bg-blue-500/5 p-5">
              <div className="flex gap-4">
                <ShieldCheck className="mt-1 h-5 w-5 text-blue-300" />

                <div>
                  <h2 className="font-medium text-white">
                    Étape suivante
                  </h2>

                  <p className="mt-2 text-sm leading-7 text-white/55">
                    La prochaine étape consistera à connecter cette interface à
                    Supabase afin de stocker automatiquement les visuels et
                    générer la livraison client.
                  </p>
                </div>
              </div>
            </div>

            <button
              disabled
              className="inline-flex items-center gap-2 rounded-2xl bg-blue-600/60 px-6 py-4 text-sm font-medium text-white opacity-60"
            >
              Générer la livraison
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
