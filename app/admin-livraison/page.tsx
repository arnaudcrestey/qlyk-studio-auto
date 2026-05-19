"use client";

import { useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Copy,
  ImageIcon,
  Loader2,
  Mail,
  ShieldCheck,
  UploadCloud,
} from "lucide-react";
import { useUploadThing } from "@/lib/uploadthing";

type UploadedVisual = {
  name: string;
  url: string;
  size?: number;
};

export default function AdminLivraisonPage() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [slug, setSlug] = useState("");
  const [deliveryLabel, setDeliveryLabel] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedVisual[]>([]);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const cleanSlug = slug.trim();
  const cleanDeliveryLabel = deliveryLabel.trim();
  const cleanClientName = clientName.trim();
  const cleanClientEmail = clientEmail.trim();

  const { startUpload, isUploading } = useUploadThing("deliveryPhotos", {
    onUploadError: (error) => {
      setStatusMessage(`Erreur UploadThing : ${error.message}`);
    },
  });

  const deliveryUrl =
    cleanSlug.length > 0
      ? `https://www.qlykstudio.fr/livraison/${cleanSlug}`
      : "";

  const codeToCopy = useMemo(() => {
    if (!cleanSlug || uploadedFiles.length === 0) return "";

    return `{
  slug: "${cleanSlug}",
  clientName: "${cleanClientName || "Nom du client"}",
  deliveryLabel: "${cleanDeliveryLabel || "Livraison QLYK"}",
  deliveredAt: "19 mai 2026",
  photos: [
${uploadedFiles.map((file) => `    "${file.url}",`).join("\n")}
  ],
},`;
  }, [cleanSlug, cleanClientName, cleanDeliveryLabel, uploadedFiles]);

  function handleSelectFiles(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return;

    setSelectedFiles(Array.from(event.target.files));
    setSaved(false);
    setStatusMessage(
      "Photo sélectionnée. Cliquez maintenant sur “Lancer le transfert”."
    );
  }

  async function handleStartUpload() {
    if (!cleanSlug) {
      setStatusMessage("Erreur : veuillez renseigner un slug client.");
      return;
    }

    if (!cleanDeliveryLabel) {
      setStatusMessage("Erreur : veuillez renseigner le dossier / lot livré.");
      return;
    }

    if (selectedFiles.length === 0) {
      setStatusMessage("Erreur : veuillez sélectionner au moins une photo.");
      return;
    }

    try {
      setSaved(false);
      setStatusMessage("Transfert UploadThing en cours...");

      const uploaded = await startUpload(selectedFiles);

      if (!uploaded || uploaded.length === 0) {
        setStatusMessage("Erreur : UploadThing n’a retourné aucun fichier.");
        return;
      }

      setStatusMessage("Upload terminé. Sauvegarde de la livraison en cours...");

      const formattedFiles: UploadedVisual[] = uploaded.map((file) => ({
        name: file.name,
        url: file.ufsUrl,
        size: file.size,
      }));

      const response = await fetch("/api/qlyk/deliveries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slug: cleanSlug,
          deliveryLabel: cleanDeliveryLabel,
          files: formattedFiles,
        }),
      });

      let result: { error?: string; success?: boolean } = {};

      try {
        result = await response.json();
      } catch {
        result = {};
      }

      if (!response.ok) {
        setStatusMessage(
          `Erreur API : ${result.error || `HTTP ${response.status}`}`
        );
        return;
      }

      setUploadedFiles(formattedFiles);
      setSelectedFiles([]);
      setSaved(true);
      setStatusMessage("Livraison enregistrée. Le lien client est prêt.");
    } catch (error) {
      setStatusMessage(
        error instanceof Error ? `Erreur : ${error.message}` : "Erreur inconnue."
      );
    }
  }

  async function sendDeliveryEmail() {
    if (!cleanClientName) {
      setStatusMessage("Erreur : veuillez renseigner le nom du client.");
      return;
    }

    if (!cleanClientEmail) {
      setStatusMessage("Erreur : veuillez renseigner l’email client.");
      return;
    }

    if (!cleanDeliveryLabel) {
      setStatusMessage("Erreur : veuillez renseigner le dossier / lot livré.");
      return;
    }

    if (!deliveryUrl) {
      setStatusMessage("Erreur : lien de livraison manquant.");
      return;
    }

    if (!saved || uploadedFiles.length === 0) {
      setStatusMessage(
        "Erreur : veuillez d’abord enregistrer la livraison avant d’envoyer le mail."
      );
      return;
    }

    try {
      setSendingEmail(true);
      setStatusMessage("Envoi du mail client en cours...");

      const response = await fetch("/api/qlyk/send-delivery-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: cleanClientEmail,
          clientName: cleanClientName,
          deliveryLabel: cleanDeliveryLabel,
          deliveryUrl,
        }),
      });

      let result: { error?: string; success?: boolean; message?: string } = {};

      try {
        result = await response.json();
      } catch {
        result = {};
      }

      if (!response.ok) {
        setStatusMessage(
          `Erreur email : ${result.error || `HTTP ${response.status}`}`
        );
        return;
      }

      setStatusMessage(
        result.message || "Email client envoyé avec succès avec copie QLYK."
      );
    } catch (error) {
      setStatusMessage(
        error instanceof Error
          ? `Erreur email : ${error.message}`
          : "Erreur inconnue pendant l’envoi email."
      );
    } finally {
      setSendingEmail(false);
    }
  }

  async function copyText(text: string) {
    if (!text) return;

    await navigator.clipboard.writeText(text);
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
            Choisissez les visuels finaux, lancez le transfert, puis envoyez le
            lien privé au client.
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
                placeholder="garage-martin-mai-2026"
                value={slug}
                onChange={(event) =>
                  setSlug(
                    event.target.value
                      .toLowerCase()
                      .trim()
                      .replace(/\s+/g, "-")
                      .replace(/[^a-z0-9-]/g, "")
                  )
                }
                className="w-full rounded-2xl border border-white/10 bg-[#0b1220] px-5 py-4 text-white outline-none transition placeholder:text-white/30 focus:border-blue-500"
              />

              <p className="mt-3 text-sm text-white/40">
                Exemple : garage-martin-mai-2026
              </p>
            </div>

            <div>
              <label className="mb-3 block text-sm font-medium text-white/80">
                Dossier / lot livré
              </label>

              <input
                type="text"
                placeholder="Lot véhicules — Mai 2026"
                value={deliveryLabel}
                onChange={(event) => setDeliveryLabel(event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-[#0b1220] px-5 py-4 text-white outline-none transition placeholder:text-white/30 focus:border-blue-500"
              />

              <p className="mt-3 text-sm text-white/40">
                Exemple : Lot véhicules — Mai 2026, BMW X5, Série SUV Garage
                Martin
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-3 block text-sm font-medium text-white/80">
                  Nom du client / garage
                </label>

                <input
                  type="text"
                  placeholder="Garage Martin"
                  value={clientName}
                  onChange={(event) => setClientName(event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-[#0b1220] px-5 py-4 text-white outline-none transition placeholder:text-white/30 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-white/80">
                  Email client
                </label>

                <input
                  type="email"
                  placeholder="contact@garage.fr"
                  value={clientEmail}
                  onChange={(event) => setClientEmail(event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-[#0b1220] px-5 py-4 text-white outline-none transition placeholder:text-white/30 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#0b1220] p-5">
              <div className="mb-4 flex items-start gap-4">
                <div className="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-3">
                  <UploadCloud className="h-5 w-5 text-blue-300" />
                </div>

                <div>
                  <h2 className="font-medium text-white">Photos finales</h2>
                  <p className="mt-1 text-sm text-white/50">
                    Choisissez les photos, puis lancez le transfert.
                  </p>
                </div>
              </div>

              <input
                ref={inputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleSelectFiles}
                className="hidden"
              />

              <div className="rounded-3xl border border-dashed border-white/15 bg-black/20 px-6 py-12 text-center">
                <UploadCloud className="mx-auto h-10 w-10 text-white" />

                <p className="mt-5 font-medium text-white">
                  {selectedFiles.length > 0
                    ? `${selectedFiles.length} photo(s) sélectionnée(s)`
                    : "Aucune photo sélectionnée"}
                </p>

                <p className="mt-2 text-sm text-white/45">
                  JPG, PNG — jusqu’à 20 fichiers — 8 Mo max par photo
                </p>

                <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    disabled={isUploading}
                    className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Choisir les photos
                  </button>

                  <button
                    type="button"
                    onClick={handleStartUpload}
                    disabled={
                      selectedFiles.length === 0 ||
                      isUploading ||
                      !cleanSlug ||
                      !cleanDeliveryLabel
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#16a34a] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#22c55e] disabled:cursor-not-allowed disabled:bg-[#16a34a]/40 disabled:opacity-50"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Transfert en cours...
                      </>
                    ) : (
                      "Lancer le transfert"
                    )}
                  </button>
                </div>
              </div>

              {statusMessage && (
                <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
                  {statusMessage}
                </div>
              )}

              {saved && (
                <div className="mt-5 rounded-2xl border border-blue-500/20 bg-blue-500/10 px-4 py-3 text-sm text-blue-200">
                  Livraison enregistrée dans Supabase. Le lien client est prêt.
                </div>
              )}
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
                          onClick={() => copyText(file.url)}
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
                  Bloc temporaire de secours
                </h2>

                <pre className="max-h-72 overflow-auto rounded-2xl bg-black/30 p-4 text-xs leading-6 text-white/70">
                  {codeToCopy}
                </pre>

                <button
                  type="button"
                  onClick={() => copyText(codeToCopy)}
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
                    Une fois le transfert terminé, ce lien affiche
                    automatiquement les visuels enregistrés.
                  </p>

                  {deliveryUrl && (
                    <div className="mt-4 break-all rounded-xl bg-[#0b1220] px-4 py-3 text-sm text-blue-200">
                      {deliveryUrl}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                disabled={!deliveryUrl || uploadedFiles.length === 0}
                onClick={() => copyText(deliveryUrl)}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-4 text-sm font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-600/40 disabled:opacity-50"
              >
                {copied ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}

                {copied ? "Copié" : "Copier le lien de livraison"}

                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                disabled={
                  !deliveryUrl ||
                  uploadedFiles.length === 0 ||
                  !cleanClientName ||
                  !cleanClientEmail ||
                  sendingEmail
                }
                onClick={sendDeliveryEmail}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-6 py-4 text-sm font-medium text-white transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {sendingEmail ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Envoi...
                  </>
                ) : (
                  <>
                    <Mail className="h-4 w-4" />
                    Envoyer le mail client
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
