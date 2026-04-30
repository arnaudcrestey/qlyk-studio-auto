'use client';

import { FormEvent, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UploadCloud, X } from 'lucide-react';
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
  const router = useRouter();

  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');
  const [selectedOffer, setSelectedOffer] = useState<Offer>('essentiel');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const currentOffer = useMemo(
    () => offerOptions.find((offer) => offer.value === selectedOffer),
    [selectedOffer]
  );

  function handleOfferChange(offer: Offer) {
    if (offer === 'concession') {
      router.push('/contact?objet=concession');
      return;
    }

    setSelectedOffer(offer);
  }

  function removeFile(url: string) {
    setUploadedFiles((files) => files.filter((file) => file.url !== url));
  }

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
      offer: selectedOffer,
      uploadedFiles
    };

    try {
      const response = await fetch('/api/depot-vehicule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok || data.success !== true) {
        setStatus('error');
        setMessage(data.error ?? 'Erreur lors de l’envoi.');
        return;
      }

      router.push('/deposer-un-vehicule/succes');
    } catch (error) {
      console.error('DEPOT FORM ERROR:', error);
      setStatus('error');
      setMessage('Service indisponible, veuillez réessayer.');
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-6xl rounded-3xl border border-white/10 bg-white/[0.035] p-5 shadow-[0_0_70px_rgba(37,99,235,0.14)] backdrop-blur sm:p-7 lg:p-8"
    >
      <div className="mb-8 rounded-3xl border border-premium/25 bg-premium/10 p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-premium">
          Offre souhaitée
        </p>

        <div className="mt-4 grid gap-3 lg:grid-cols-3">
          {offerOptions.map((offer) => {
            const active = selectedOffer === offer.value;

            return (
              <button
                key={offer.value}
                type="button"
                onClick={() => handleOfferChange(offer.value)}
                className={`rounded-2xl border p-4 text-left transition-all duration-300 ${
                  active
                    ? 'border-premium bg-premium/15 shadow-[0_0_30px_rgba(37,99,235,0.22)]'
                    : 'border-white/10 bg-black/20 hover:border-premium/40 hover:bg-white/[0.04]'
                }`}
              >
                <span className="block text-sm font-semibold text-foreground">
                  {offer.label}
                </span>

                <span className="mt-2 block text-sm leading-relaxed text-foreground/60">
                  {offer.description}
                </span>
              </button>
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
        <Input name="objective" placeholder="Objectif : vendre, annoncer, valoriser..." required />
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

      <div className="mt-6 rounded-3xl border border-white/10 bg-black/25 p-4 sm:p-5">
        <div className="mb-4 flex items-start gap-3">
          <div className="rounded-2xl border border-premium/25 bg-premium/10 p-3 text-premium">
            <UploadCloud size={22} />
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground">
              Photos du véhicule
            </p>
            <p className="mt-1 text-sm leading-relaxed text-foreground/55">
              Ajoutez jusqu’à 3 photos. Vous pourrez les vérifier avant l’envoi.
            </p>
          </div>
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
      'qlyk-upload-zone group relative overflow-hidden rounded-3xl border border-dashed border-white/15 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.10),rgba(255,255,255,0.03)_40%,rgba(0,0,0,0.28)_100%)] p-10 transition-all duration-500 hover:border-premium/70 hover:shadow-[0_0_60px_rgba(37,99,235,0.4)] ut-uploading:border-premium ut-uploading:shadow-[0_0_80px_rgba(37,99,235,0.6)]',

    label:
      'text-foreground text-base font-medium transition-all duration-300 group-hover:text-white',

    allowedContent:
      'text-foreground/45 text-sm mt-2',

    button:
      'mt-5 rounded-full bg-premium px-6 py-2.5 text-sm font-medium text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(37,99,235,0.6)] ut-uploading:opacity-70 ut-readying:opacity-70'
  }}
  content={{
    label: 'Déposez votre véhicule comme en studio ou cliquez pour sélectionner',
    allowedContent: 'JPG, PNG — jusqu’à 3 photos (8 Mo max)'
  }}
/>

        {uploadedFiles.length > 0 && (
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {uploadedFiles.map((file, index) => (
              <div
                key={file.url}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04]"
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
                </div>

                <div className="p-4">
                  <p className="truncate text-sm font-medium text-foreground">
                    {file.name}
                  </p>
                  <p className="mt-1 text-xs text-foreground/45">
                    Photo chargée avec succès
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
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
          {status === 'loading' ? 'Envoi en cours...' : 'Continuer avec cette offre'}
        </Button>
      </div>

      {message && (
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
      )}
    </form>
  );
}
