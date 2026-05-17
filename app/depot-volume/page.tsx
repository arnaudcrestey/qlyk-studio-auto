'use client';

import { useState } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { UploadDropzone } from '@/lib/uploadthing';

type UploadedFile = {
  name: string;
  url: string;
  size?: number;
};

export default function DepotVolumePage() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  function removeFile(url: string) {
    setUploadedFiles((files) => files.filter((file) => file.url !== url));
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

        <div className="mt-10 w-full rounded-[28px] border border-white/10 bg-white/[0.035] p-5 shadow-[0_0_80px_rgba(37,99,235,0.12)] backdrop-blur sm:mt-14 sm:rounded-[34px] sm:p-8 lg:p-10">
          <div className="grid w-full gap-4 sm:grid-cols-2">
            <input
              placeholder="Nom / société"
              className="h-[58px] min-w-0 rounded-2xl border border-white/10 bg-black/40 px-5 text-[15px] text-white outline-none placeholder:text-white/35 focus:border-[#3b82f6]"
            />
            <input
              type="email"
              placeholder="Email"
              className="h-[58px] min-w-0 rounded-2xl border border-white/10 bg-black/40 px-5 text-[15px] text-white outline-none placeholder:text-white/35 focus:border-[#3b82f6]"
            />
            <input
              type="tel"
              placeholder="Téléphone"
              className="h-[58px] min-w-0 rounded-2xl border border-white/10 bg-black/40 px-5 text-[15px] text-white outline-none placeholder:text-white/35 focus:border-[#3b82f6]"
            />
            <input
              placeholder="Nombre de véhicules"
              className="h-[58px] min-w-0 rounded-2xl border border-white/10 bg-black/40 px-5 text-[15px] text-white outline-none placeholder:text-white/35 focus:border-[#3b82f6]"
            />
          </div>

          <textarea
            placeholder="Informations utiles : organisation des fichiers, consignes déjà validées, contraintes de traitement, urgence éventuelle..."
            className="mt-4 min-h-[175px] w-full resize-none rounded-3xl border border-white/10 bg-black/40 px-5 py-5 text-[15px] leading-relaxed text-white outline-none placeholder:text-white/35 focus:border-[#3b82f6] sm:mt-5 sm:min-h-[190px]"
          />

          <div className="mt-6">
            <UploadDropzone
              endpoint="volumePhotos"
              onClientUploadComplete={(res) => {
                const files = res.map((file) => ({
                  name: file.name,
                  url: file.url,
                  size: file.size,
                }));

                setUploadedFiles((current) => [...current, ...files].slice(0, 50));
              }}
              onUploadError={(error: Error) => {
                alert(error.message || 'Erreur pendant le transfert des photos.');
              }}
              appearance={{
                container:
                  'group relative overflow-hidden rounded-[26px] border border-dashed border-white/15 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.13),rgba(255,255,255,0.035)_42%,rgba(0,0,0,0.35)_100%)] p-7 text-center shadow-[0_0_55px_rgba(37,99,235,0.10)] sm:p-12',
                label: 'text-white text-base font-semibold',
                allowedContent: 'text-white/45 text-sm mt-2',
                button:
                  'mt-6 rounded-full bg-[#2563eb] px-8 py-4 text-sm font-semibold text-white shadow-[0_0_28px_rgba(37,99,235,0.35)] transition hover:bg-[#3b82f6]',
              }}
              content={{
                label: 'Zone de dépôt des visuels',
                allowedContent: 'JPG, PNG — jusqu’à 50 photos — 8 Mo max par photo',
                button:
                  uploadedFiles.length > 0
                    ? 'Ajouter des photos'
                    : 'Choisir les photos',
              }}
            />
          </div>

          {uploadedFiles.length > 0 && (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

          <div className="mt-7 flex flex-col gap-5 border-t border-white/10 pt-6 sm:mt-8 sm:flex-row sm:items-center sm:justify-between sm:pt-8">
            <p className="max-w-2xl text-sm leading-relaxed text-white/45">
              Ce dépôt concerne une demande déjà qualifiée. Les visuels seront
              associés à votre dossier QLYK Studio Auto.
            </p>

            <button
              type="button"
              className="h-13 rounded-full bg-[#2563eb] px-8 py-4 text-sm font-semibold text-white shadow-[0_0_28px_rgba(37,99,235,0.30)] transition hover:scale-[1.02] hover:bg-[#3b82f6] sm:h-14 sm:min-w-[210px]"
            >
              Envoyer le dépôt
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
