"use client";

import { useMemo, useState } from "react";
import {
  ImageIcon,
  ShieldCheck,
  ArrowRight,
  Copy,
  CheckCircle2,
} from "lucide-react";
import { UploadDropzone } from "@/lib/uploadthing";

type UploadedVisual = {
  name: string;
  url: string;
  size?: number;
};

export default function AdminLivraisonPage() {
  const [slug, setSlug] = useState("");
  const [copied, setCopied] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedVisual[]>([]);

  const cleanSlug = slug.trim();

  const deliveryUrl =
    cleanSlug.length > 0
      ? `https://www.qlykstudio.fr/livraison/${cleanSlug}`
      : "";

  const codeToCopy = useMemo(() => {
    if (!cleanSlug || uploadedFiles.length === 0) return "";

    return `{
  slug: "${cleanSlug}",
  clientName: "Nom du client",
  vehicle: "Véhicule concerné",
  deliveredAt: "18 mai 2026",
  photos: [
${uploadedFiles.map((file) => `    "${file.url}",`).join("\n")}
  ],
},`;
  }, [cleanSlug, uploadedFiles]);

  async function copyDeliveryLink() {
    if (!deliveryUrl) return;
    await navigator.clipboard.writeText(deliveryUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  async function copyCodeBlock() {
    if (!codeToCopy) return;
    await navigator.clipboard.writeText(codeToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <section className="mx-auto w-full max-w-5xl px-6 py-16 sm:px-8 lg:px-12">
        <div className="mb-10">
          <div className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-200">
            Interface interne QLYK
          </div>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
            Nouvelle livraison client
          </h1>

          <p className="mt-5 max-w-2xl text-white/65">
            Déposez les visuels finaux, récupérez les URLs UploadThing, puis
            générez le lien privé à transmettre au client.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-sm sm:p-8">
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
                className="w-full rounded-2xl border border-white/10 bg-[#0b1220] px-5 py-4 text-white outline-none transition placeholder:text-white/30 focus:border-blue-500"
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

                  setUploadedFiles((current) => [
                    ...current,
                    ...res.map((file) => ({
                      name: file.name,
                      url: file.url,
                      size: file.size,
                    })),
                  ]);
                }}
                onUploadError={(error: Error) => {
                  alert(`Erreur upload : ${error.message}`);
                }}
                appearance={{
                  container:
                    "rounded-3xl border border-dashed border-white/15 bg-[#0b1220] px-8 py-14 transition hover:border-blue-500/40 hover:bg-[#10192c]",
                  label: "text-white text-base font-medium",
                  allowedContent: "text-white/45 text-sm",
                  button:
                    "bg-blue-600 text-white rounded-2xl px-6 py-3 hover:bg-blue-500 transition",
                }}
                content={{
                  label: "Déposer les visuels finaux",
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
                <div className="mb-5 flex items-center gap-3">
                  <ImageIcon className="h-5 w-5 text-blue-300" />

                  <h2 className="font-medium">
                    {uploadedFiles.length} visuel(s) envoyé(s)
                  </h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {uploadedFiles.map((file, index) => (
                    <div
                      key={`${file.url}-${index}`}
                      className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
                    >
                      <img
                        src={file.url}
                        alt={file.name}
                        className="aspect-[4/3] w-full object-cover"
                      />

                      <div className="space-y-3 p-4">
                        <p className="text-sm font-medium text-white">
                          {file.name}
                        </p>

                        <p className="break-all rounded-xl bg-black/25 p-3 text-xs leading-5 text-blue-200">
                          {file.url}
                        </p>

                        <button
                          type="button"
                          onClick={() => navigator.clipboard.writeText(file.url)}
                          className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-xs text-white transition hover:bg-white/15"
                        >
                          <Copy className="h-3.5 w-3.5" />
                          Copier l’URL
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {codeToCopy && (
              <div className="rounded-2xl border border-white/10 bg-[#0b1220] p-5">
                <h2 className="mb-3 font-medium text-white">
                  Bloc à coller dans qlyk-deliveries.ts
                </h2>

                <pre className="max-h-72 overflow-auto rounded-2xl bg-black/30 p-4 text-xs leading-6 text-white/70">
                  {codeToCopy}
                </pre>

                <button
                  type="button"
                  onClick={copyCodeBlock}
                  className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-medium text-[#050816] transition hover:bg-white/90"
                >
                  <Copy className="h-4 w-4" />
                  Copier le bloc
                </button>
              </div>
            )}

            <div className="rounded-2xl border border-blue-500/10 bg-blue-500/5 p-5">
              <div className="flex gap-4">
                <ShieldCheck className="mt-1 h-5 w-5 text-blue-300" />

                <div className="w-full">
                  <h2 className="font-medium text-white">
                    Lien de livraison client
                  </h2>

                  <p className="mt-2 text-sm leading-7 text-white/55">
                    Une fois le bloc ajouté dans la mémoire des livraisons, ce
                    lien affichera les visuels au client.
                  </p>

                  {deliveryUrl && (
                    <div className="mt-4 break-all rounded-xl bg-[#0b1220] px-4 py-3 text-sm text-blue-200">
                      {deliveryUrl}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <button
              type="button"
              disabled={!deliveryUrl || uploadedFiles.length === 0}
              onClick={copyDeliveryLink}
              className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-4 text-sm font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-600/40 disabled:opacity-50"
            >
              {copied ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              {copied ? "Copié" : "Copier le lien de livraison"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
