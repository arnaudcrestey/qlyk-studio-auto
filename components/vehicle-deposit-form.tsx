'use client';

import { FormEvent, useMemo, useState } from 'react';
import { UploadDropzone } from '@/lib/uploadthing';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

type Status = 'idle' | 'loading' | 'success' | 'error';
type Offer = 'essentiel' | 'pro' | 'concession';

type UploadedFile = {
  name: string;
  url: string;
  size?: number;
};

const offerOptions = [
  {
    value: 'essentiel',
    label: 'Essentiel — 39€ HT',
    description: '1 visuel premium pour tester la qualité Qlyk.'
  },
  {
    value: 'pro',
    label: 'Pro — 89€ HT',
    description: '3 visuels complémentaires pour valoriser une annonce.'
  },
  {
    value: 'concession',
    label: 'Concession — sur devis',
    description: 'Production régulière pour plusieurs véhicules.'
  }
] as const;

const stagingOptions = [
  'Concession réaliste',
  'Extérieur valorisant',
  'Showroom premium',
  'Parc automobile',
  'Je vous laisse choisir'
];

export function VehicleDepositForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');
  const [selectedOffer, setSelectedOffer] = useState<Offer>('essentiel');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const currentOffer = useMemo(
    () => offerOptions.find((offer) => offer.value === selectedOffer),
    [selectedOffer]
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');
    setMessage('');

    if (uploadedFiles.length === 0) {
      setStatus('error');
      setMessage('Ajoutez au moins une photo du véhicule avant d’envoyer.');
      return;
    }

    const formData = new FormData(event.currentTarget);

    const payload = {
      ...Object.fromEntries(formData.entries()),
      uploadedFiles
    };

    try {
      const response = await fetch('/api/depot-vehicule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus('error');
        setMessage(data.error ?? 'Erreur lors de l’envoi.');
        return;
      }

      setStatus('success');
      setMessage(
        selectedOffer === 'concession'
          ? 'Votre demande a bien été envoyée. Nous reviendrons vers vous avec une proposition adaptée.'
          : 'Votre véhicule a bien été déposé. Vous allez recevoir les prochaines indications.'
      );

      event.currentTarget.reset();
      setSelectedOffer('essentiel');
      setUploadedFiles([]);
    } catch {
      setStatus('error');
      setMessage('Service indisponible, veuillez réessayer.');
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-6xl rounded-3xl border border-white/10 bg-white/[0.035] p-5 shadow-[0_0_60px_rgba(37,99,235,0.12)] backdrop-blur sm:p-7 lg:p-8"
    >
      <div className="mb-8 rounded-3xl border border-premium/20 bg-premium/10 p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-premium">
          Offre souhaitée
        </p>

        <div className="mt-4 grid gap-3 lg:grid-cols-3">
          {offerOptions.map((offer) => {
            const active = selectedOffer === offer.value;

            return (
              <label
                key={offer.value}
                className={`cursor-pointer rounded-2xl border p-4 transition-all duration-300 ${
                  active
                    ? 'border-premium bg-premium/15 shadow-[0_0_30px_rgba(37,99,235,0.22)]'
                    : 'border-white/10 bg-black/20 hover:border-premium/40 hover:bg-white/[0.04]'
                }`}
              >
                <input
                  type="radio"
                  name="offer"
                  value={offer.value}
                  checked={active}
                  onChange={() => setSelectedOffer(offer.value)}
                  className="sr-only"
                />

                <span className="block text-sm font-semibold text-foreground">
                  {offer.label}
                </span>

                <span className="mt-2 block text-sm leading-relaxed text-foreground/60">
                  {offer.description}
                </span>
              </label>
            );
          })}
        </div>

        <p className="mt-5 text-sm leading-relaxed text-foreground/65">
          Le véhicule ne sera pas modifié : couleur, jantes, carrosserie et proportions seront conservées.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Input name="firstName" placeholder="Prénom" required />
        <Input name="lastName" placeholder="Nom" required />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Input name="email" type="email" placeholder="Email" required />
        <Input name="phone" type="tel" placeholder="Téléphone" required />
      </div>

      <div className="mt-4">
        <Input name="dealership" placeholder="Nom de la concession / garage" required />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Input name="vehicleType" placeholder="Type de véhicule" required />
        <Input name="brandModel" placeholder="Marque / modèle" required />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Input name="year" placeholder="Année" inputMode="numeric" required />
        <Input
          name="objective"
          placeholder="Objectif principal : vendre, annoncer, valoriser..."
          required
        />
      </div>

      <div className="mt-4">
        <Select name="requestedStyle" required defaultValue="">
          <option value="" disabled>
            Mise en scène souhaitée
          </option>
          {stagingOptions.map((style) => (
            <option key={style} value={style}>
              {style}
            </option>
          ))}
        </Select>
      </div>

      <div className="mt-4">
        <Textarea
          name="message"
          placeholder="Précisions utiles : logo à intégrer, décor souhaité, contrainte à respecter, usage prévu..."
          required
          className="min-h-[130px]"
        />
      </div>

      <div className="mt-6 rounded-3xl border border-white/10 bg-black/20 p-4 sm:p-5">
        <div className="mb-4">
          <p className="text-sm font-semibold text-foreground">
            Photos du véhicule
          </p>
          <p className="mt-1 text-sm leading-relaxed text-foreground/55">
            Ajoutez jusqu’à 3 photos du véhicule. Formats image acceptés. Taille maximale : 8 Mo par fichier.
          </p>
        </div>

        <UploadDropzone
          endpoint="vehiclePhotos"
          onClientUploadComplete={(res) => {
            const files = res.map((file) => ({
              name: file.name,
              url: file.url,
              size: file.size
            }));

            setUploadedFiles((currentFiles) => {
              const nextFiles = [...currentFiles, ...files];
              return nextFiles.slice(0, 3);
            });

            setStatus('idle');
            setMessage('');
          }}
          onUploadError={(error: Error) => {
            setStatus('error');
            setMessage(error.message || 'Erreur pendant l’envoi des photos.');
          }}
          appearance={{
            container:
              'rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-premium/40',
            label: 'text-foreground font-medium',
            allowedContent: 'text-foreground/45 text-sm',
            button:
              'rounded-full bg-premium px-5 py-2 text-sm font-medium text-white ut-readying:bg-premium/70 ut-uploading:bg-premium/70'
          }}
          content={{
            label: 'Glissez vos photos ici ou cliquez pour sélectionner',
            allowedContent: 'Images uniquement — jusqu’à 3 fichiers de 8 Mo'
          }}
        />

        {uploadedFiles.length > 0 ? (
          <div className="mt-4 rounded-2xl border border-green-400/20 bg-green-400/10 p-4">
            <p className="text-sm font-medium text-green-300">
              {uploadedFiles.length} photo
              {uploadedFiles.length > 1 ? 's' : ''} ajoutée
              {uploadedFiles.length > 1 ? 's' : ''}
            </p>

            <ul className="mt-3 space-y-2 text-sm text-foreground/70">
              {uploadedFiles.map((file) => (
                <li key={file.url} className="truncate">
                  {file.name}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      <div className="mt-7 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm leading-relaxed text-foreground/55">
          <p className="font-medium text-foreground/75">
            {currentOffer?.label}
          </p>
          <p>
            Prix hors taxes. Les demandes spécifiques peuvent nécessiter une validation préalable.
          </p>
        </div>

        <Button
          disabled={status === 'loading'}
          type="submit"
          className="h-12 rounded-full px-8 text-sm font-medium sm:min-w-[240px]"
        >
          {status === 'loading'
            ? 'Envoi en cours...'
            : selectedOffer === 'concession'
              ? 'Envoyer ma demande'
              : 'Continuer avec cette offre'}
        </Button>
      </div>

      {message ? (
        <p
          className={`mt-5 rounded-2xl border px-4 py-3 text-sm ${
            status === 'success'
              ? 'border-green-400/30 bg-green-400/10 text-green-300'
              : 'border-red-400/30 bg-red-400/10 text-red-300'
          }`}
          role="status"
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
