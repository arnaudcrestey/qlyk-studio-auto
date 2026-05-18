"use client";

import { useState } from "react";
import { ImageIcon, ShieldCheck, ArrowRight, Copy } from "lucide-react";
import { UploadDropzone } from "@/lib/uploadthing";

type UploadedVisual = {
  name: string;
  url: string;
  size?: number;
};

export default function AdminLivraisonPage() {
  const [slug, setSlug] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedVisual[]>([]);

  const deliveryUrl =
    slug.trim().length > 0
      ? `https://www.qlykstudio.fr/livraison/${slug.trim()}`
      : "";

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
            Déposez les visuels finaux, puis récupérez le lien privé à envoyer
            au client.
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
                onChange={(e) =>
                  setSlug(
                    e.target.value
                      .toLowerCase()
                      .trim()
                      .replace(/\s+/g, "-")
                      .replace(/[^a-z0-9-]/g, "")
                  )
                }
                className="w-full rounded-2xl border border-white/10 bg-[#0b1220] px-5 py-4 text-white outline-none transition focus:border-blue-500"
              />

              <p className="mt-3 text-sm text-white/40">
                Exemple : bmw-x5-garage-martin
              </p>
            </div>

            <div>
              <label className="mb-3 block text-sm font-medium text-white/80">
                Photos finales
              </label>

              <UploadDropzone
                endpoint="deliveryPhotos"
                onClientUploadComplete={(res) => {
                  if (!res) return;

                  setUploadedFiles(
                    res.map((file) => ({
                      name: file.name,
                      url: file.url,
                      size: file.size,
                    }))
                  );
                }}
                onUploadError={(error: Error) => {
                  alert(`Erreur upload : ${error.message}`);
                }}
                appearance={{
                  container:
                    "rounded-3xl border border-dashed border-white/15 bg-[#0b1220] px-8 py-14 transition hover:border-blue-500/40 hover:bg-[#10192c]",
                  label: "text-white",
                  allowedContent: "text-white/45",
                  button:
                    "bg-blue-600 text-white rounded-2xl px-6 py-3 hover:bg-blue-500",
                }}
                content={{
                  label: "Déposer les visuels",
                  allowedContent:
                    "Images uniquement — jusqu’à 20 fichiers — 8 Mo max par photo",
                  button({ ready }) {
                    return ready ? "Choisir les photos" : "Chargement...";
                  },
                }}
              />
            </div>

            {uploadedFiles.length > 0 && (
              <div className="rounded-2xl border border-white/10 bg-[#0b1220] p-5">
                <div className="mb-4 flex items-center gap-3">
                  <ImageIcon className="h-5 w-5 text-blue-300" />

                  <h2 className="font-medium">
                    {uploadedFiles.length} visuel(s) envoyé(s)
                  </h2>
                </div>

                <div className="space-y-3">
                  {uploadedFiles.map((file, index) => (
                    <a
                      key={index}
                      href={file.url}
                      target="_blank"
                      rel="noreferrer"
                      className="block rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-white/70 hover:bg-white/10"
                    >
                      {file.name}
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className="rounded-2xl border border-blue-500/10 bg-blue-500/5 p-5">
              <div className="flex gap-4">
                <ShieldCheck className="mt-1 h-5 w-5 text-blue-300" />

                <div>
                  <h2 className="font-medium text-white">
                    Lien de livraison client
                  </h2>

                  <p className="mt-2 text-sm leading-7 text-white/55">
                    Une fois les visuels envoyés, copie ce lien et transmets-le
                    au client par email.
                  </p>

                  {deliveryUrl && (
                    <div className="mt-4 rounded-xl bg-[#0b1220] px-4 py-3 text-sm text-blue-200">
                      {deliveryUrl}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <button
              type="button"
              disabled={!deliveryUrl || uploadedFiles.length === 0}
              onClick={() => navigator.clipboard.writeText(deliveryUrl)}
              className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-4 text-sm font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-600/40 disabled:opacity-50"
            >
              <Copy className="h-4 w-4" />
              Copier le lien de livraison
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
