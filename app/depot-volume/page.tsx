'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, Loader2, UploadCloud, X } from 'lucide-react';
import { UploadDropzone } from '@/lib/uploadthing';

type Status = 'idle' | 'loading' | 'success' | 'error';
type UploadStatus = 'idle' | 'ready' | 'uploading' | 'done' | 'error';

type UploadedFile = {
  name: string;
  url: string;
  size?: number;
};

export default function DepotVolumePage() {
  const router = useRouter();

  const [status, setStatus] = useState<Status>('idle');
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle');
  const [message, setMessage] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const isUploading = uploadStatus === 'uploading';
  const isReadyToTransfer = uploadStatus === 'ready';

  function removeFile(url: string) {
    setUploadedFiles((files) => files.filter((file) => file.url !== url));
  }

  function markUploadReady() {
    if (uploadStatus !== 'uploading') {
      setUploadStatus('ready');
      setMessage('Photos sélectionnées. Cliquez maintenant sur “Lancer le transfert”.');
      setStatus('idle');
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');
    setMessage('');

    if (uploadedFiles.length === 0) {
      setStatus('error');
      setMessage('Ajoutez au moins une photo avant d’envoyer le dépôt.');
      return;
    }

    const formData = new FormData(event.currentTarget);

    const payload = {
      ...Object.fromEntries(formData.entries()),
      offer: 'volume',
      uploadedFiles,
    };

    try {
      const response = await fetch('/api/depot-volume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || data.success !== true) {
        setStatus('error');
        setMessage(data.error ?? 'Erreur lors de l’envoi.');
        return;
      }

      router.push('/depot-volume/succes');
    } catch (error) {
      console.error('DEPOT VOLUME ERROR:', error);
      setStatus('error');
      setMessage('Service indisponible, veuillez réessayer.');
    }
  }

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-black px-4 py-12 text-white sm:px-6 sm:py-20">
      <section className="mx-auto w-full max-w-6xl">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#3b82f6] sm:text-sm sm:tracking-[0.34em]">
            QLYK STUDIO AUTO
          </p>

          <h1 className="mx-auto mt-5 max-w-3xl text-[38px] font-light leading-[1.04] tracking-tight text-white sm:mt-6 sm:text-5xl lg:text-6xl">
            Dépôt multi-véhicules
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-relaxed text-white/55 sm:mt-6 sm:text-lg">
            Espace dédié aux garages, vendeurs VO, mandataires et professionnels
            souhaitant transmettre plusieurs visuels de véhicules.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 w-full rounded-[28px] border border-white/10 bg-white/[0.035] p-5 shadow-[0_0_80px_rgba(37,99,235,0.12)] backdrop-blur sm:mt-14 sm:rounded-[34px] sm:p-8 lg:p-10"
        >
          <div className="grid w-full gap-4 sm:grid-cols-2">
            <input
              name="company"
              required
              placeholder="Nom / société"
              className="h-[58px] min-w-0 rounded-2xl border border-white/10 bg-black/40 px-5 text-[15px] text-white outline-none placeholder:text-white/35 focus:border-[#3b82f6]"
            />

            <input
              name="email"
              type="email"
              required
              placeholder="Email"
              className="h-[58px] min-w-0 rounded-2xl border border-white/10 bg-black/40 px-5 text-[15px] text-white outline-none placeholder:text-white/35 focus:border-[#3b82f6]"
            />

            <input
              name="phone"
              type="tel"
              required
              placeholder="Téléphone"
              className="h-[58px] min-w-0 rounded-2xl border border-white/10 bg-black/40 px-5 text-[15px] text-white outline-none placeholder:text-white/35 focus:border-[#3b82f6]"
            />

            <input
              name="vehicleCount"
              required
              placeholder="Nombre de véhicules"
              className="h-[58px] min-w-0 rounded-2xl border border-white/10 bg-black/40 px-5 text-[15px] text-white outline-none placeholder:text-white/35 focus:border-[#3b82f6]"
            />
          </div>

          <textarea
            name="message"
            placeholder="Informations utiles : organisation des fichiers, consignes déjà validées, contraintes de traitement, urgence éventuelle..."
            className="mt-4 min-h-[175px] w-full resize-none rounded-3xl border border-white/10 bg-black/40 px-5 py-5 text-[15px] leading-relaxed text-white outline-none placeholder:text-white/35 focus:border-[#3b82f6] sm:mt-5 sm:min-h-[190px]"
          />

          <div className="mt-6 rounded-3xl border border-white/10 bg-black/25 p-4 sm:p-5">
            <div className="mb-4 flex items-start gap-3">
              <div className="rounded-2xl border border-[#3b82f6]/25 bg-[#2563eb]/10 p-3 text-[#3b82f6]">
                <UploadCloud size={22} />
              </div>

              <div>
                <p className="text-sm font-semibold text-white">
                  Visuels des véhicules
                </p>
                <p className="mt-1 text-sm leading-relaxed text-white/55">
                  Sélectionnez vos photos, puis lancez le transfert pour les charger.
                </p>
              </div>
            </div>

            <div
              className="relative"
              onClickCapture={markUploadReady}
              onDropCapture={markUploadReady}
              onDragEnterCapture={markUploadReady}
            >
              <UploadDropzone
                endpoint="volumePhotos"
                onUploadBegin={() => {
                  setUploadStatus('uploading');
                  setMessage('Transfert des photos en cours… restez sur cette page.');
                  setStatus('idle');
                }}
                onClientUploadComplete={(res) => {
                  const files = res.map((file) => ({
                    name: file.name,
                    url: file.url,
                    size: file.size,
                  }));

                  setUploadedFiles((currentFiles) => {
                    const nextFiles = [...currentFiles, ...files];
                    return nextFiles.slice(0, 50);
                  });

                  setUploadStatus('done');
                  setStatus('idle');
                  setMessage(
                    'Photos chargées avec succès. Vous pouvez vérifier les visuels avant l’envoi.'
                  );
                }}
                onUploadError={(error: Error) => {
                  setUploadStatus('error');
                  setStatus('error');
                  setMessage(error.message || 'Erreur pendant l’envoi des photos.');
                }}
                appearance={{
                  container:
                    'group relative overflow-hidden rounded-3xl border border-dashed border-white/15 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.12),rgba(255,255,255,0.035)_42%,rgba(0,0,0,0.32)_100%)] p-10 transition-all duration-500 hover:border-[#3b82f6]/70 hover:shadow-[0_0_60px_rgba(37,99,235,0.35)] ut-uploading:border-[#3b82f6] ut-uploading:shadow-[0_0_80px_rgba(37,99,235,0.55)]',
                  label:
                    'text-white text-base font-semibold transition-all duration-300 group-hover:text-white',
                  allowedContent: 'text-white/45 text-sm mt-2',
                  button: `mt-5 rounded-full px-7 py-3 text-sm font-semibold text-white shadow-[0_0_24px_rgba(37,99,235,0.35)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_45px_rgba(37,99,235,0.65)] ut-uploading:opacity-70 ut-readying:opacity-70 ${
                    isReadyToTransfer
                      ? 'bg-green-500 hover:bg-green-400'
                      : 'bg-[#2563eb] hover:bg-[#3b82f6]'
                  }`,
                }}
                content={{
                  label: isUploading
                    ? 'Transfert en cours…'
                    : isReadyToTransfer
                      ? 'Photos prêtes à être transférées'
                      : 'Glissez vos photos ici ou cliquez pour sélectionner',
                  allowedContent: isUploading
                    ? 'Veuillez patienter, vos photos sont en cours de transfert.'
                    : isReadyToTransfer
                      ? 'Cliquez sur le bouton ci-dessous pour charger les photos.'
                      : 'JPG, PNG — jusqu’à 50 photos — 8 Mo max par photo',
                  button: isUploading
                    ? 'Transfert en cours...'
                    : isReadyToTransfer
                      ? 'Lancer le transfert'
                      : uploadedFiles.length > 0
                        ? 'Ajouter des photos'
                        : 'Choisir les photos',
                }}
              />

              {isUploading && (
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center rounded-3xl bg-black/70 backdrop-blur-sm">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#3b82f6]/40 bg-[#2563eb]/15 text-[#3b82f6] shadow-[0_0_40px_rgba(37,99,235,0.45)]">
                    <Loader2 className="animate-spin" size={26} />
                  </div>

                  <p className="mt-4 text-sm font-semibold text-white">
                    Photos en cours de transfert
                  </p>

                  <p className="mt-2 max-w-sm text-center text-sm leading-relaxed text-white/55">
                    Cela peut prendre quelques instants selon le poids des images. Ne fermez pas la page.
                  </p>

                  <div className="mt-5 h-1.5 w-56 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-1/2 animate-pulse rounded-full bg-[#2563eb]" />
                  </div>
                </div>
              )}
            </div>

            {uploadedFiles.length > 0 && (
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {uploadedFiles.map((file, index) => (
                  <div
                    key={`${file.url}-${index}`}
                    className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-[0_0_35px_rgba(0,0,0,0.18)]"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-black">
                      <img
                        src={file.url}
                        alt={file.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />

                      <button
                        type="button"
                        onClick={() => removeFile(file.url)}
                        className="absolute right-3 top-3 rounded-full bg-black/70 p-2 text-white backdrop-blur transition hover:bg-red-500"
                        aria-label="Supprimer la photo"
                      >
                        <X size={16} />
                      </button>

                      <div className="absolute left-3 top-3 rounded-full bg-green-400/90 px-3 py-1 text-xs font-semibold text-black">
                        Photo {index + 1}
                      </div>

                      <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-black/70 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
                        <CheckCircle2 size={14} className="text-green-300" />
                        Chargée
                      </div>
                    </div>

                    <div className="p-4">
                      <p className="truncate text-sm font-medium text-white">
                        {file.name}
                      </p>
                      <p className="mt-1 text-xs text-white/45">
                        Visuel prêt pour le dépôt volume
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-7 flex flex-col gap-5 border-t border-white/10 pt-6 sm:mt-8 sm:flex-row sm:items-center sm:justify-between sm:pt-8">
            <p className="max-w-2xl text-sm leading-relaxed text-white/45">
              Ce dépôt concerne une demande déjà qualifiée. Les visuels seront
              associés à votre dossier QLYK Studio Auto.
            </p>

            <button
              disabled={status === 'loading' || isUploading}
              type="submit"
              className="h-13 rounded-full bg-[#2563eb] px-8 py-4 text-sm font-semibold text-white shadow-[0_0_28px_rgba(37,99,235,0.30)] transition hover:scale-[1.02] hover:bg-[#3b82f6] disabled:cursor-not-allowed disabled:opacity-60 sm:h-14 sm:min-w-[210px]"
            >
              {status === 'loading'
                ? 'Envoi en cours...'
                : isUploading
                  ? 'Transfert des photos...'
                  : 'Envoyer le dépôt'}
            </button>
          </div>

          {message && (
            <p
              className={`mt-5 rounded-2xl border px-4 py-3 text-sm ${
                status === 'error'
                  ? 'border-red-400/30 bg-red-400/10 text-red-300'
                  : 'border-green-400/30 bg-green-400/10 text-green-300'
              }`}
              role="status"
            >
              {message}
            </p>
          )}
        </form>
      </section>
    </main>
  );
}
