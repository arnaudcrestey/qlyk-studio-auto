'use client';

import { FormEvent, useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Image,
  Loader2,
  Mail,
  ShieldCheck
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

type Status = 'idle' | 'loading' | 'success' | 'error';

export function ContactForm() {
  const router = useRouter();

  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');
    setMessage('');

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus('error');
        setMessage(data.error ?? 'Une erreur est survenue lors de l’envoi.');
        return;
      }

      setStatus('success');
      setMessage('Demande envoyée. Nous revenons vers vous rapidement avec une réponse claire.');
      form.reset();

      router.push('/deposer-un-vehicule/succes');
    } catch {
      setStatus('error');
      setMessage('Service momentanément indisponible. Veuillez réessayer.');
    }
  }

  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <div className="absolute inset-x-0 top-0 -z-10 mx-auto h-72 max-w-4xl rounded-full bg-blue-500/10 blur-3xl" />

      <div className="mb-10 text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-blue-300/80">
          Contact
        </p>

        <h1 className="font-serif text-4xl font-light tracking-tight text-white sm:text-5xl">
          Parlons de votre besoin visuel automobile
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/60 sm:text-base">
          Concession, garage, professionnel auto ou demande ponctuelle : expliquez votre situation,
          nous vous répondons avec une orientation claire et réaliste.
        </p>
      </div>

      <div className="grid overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] shadow-2xl shadow-black/40 backdrop-blur-xl lg:grid-cols-[0.9fr_1.4fr]">
        <aside className="relative border-b border-white/10 bg-gradient-to-br from-white/[0.07] to-blue-500/[0.05] p-6 sm:p-8 lg:border-b-0 lg:border-r">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_38%)]" />

          <div className="relative space-y-8">
            <div>
              <p className="text-sm font-medium text-blue-300">
                Premier échange
              </p>

              <h2 className="mt-3 font-serif text-3xl font-light leading-tight text-white">
                Vous nous expliquez votre besoin, nous vous disons ce qui est possible.
              </h2>

              <p className="mt-4 text-sm leading-6 text-white/60">
                Même si votre demande n’est pas encore totalement définie, nous vous aidons à choisir
                la bonne approche selon le véhicule, le style attendu et l’usage commercial des visuels.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex gap-3 rounded-2xl border border-white/10 bg-black/20 p-4">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-blue-300" />
                <div>
                  <p className="text-sm font-semibold text-white">
                    Véhicule respecté
                  </p>
                  <p className="mt-1 text-xs leading-5 text-white/55">
                    Forme, couleur, jantes, carrosserie et proportions ne sont jamais modifiées.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 rounded-2xl border border-white/10 bg-black/20 p-4">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-blue-300" />
                <div>
                  <p className="text-sm font-semibold text-white">
                    Réponse personnalisée
                  </p>
                  <p className="mt-1 text-xs leading-5 text-white/55">
                    Votre demande est étudiée selon votre besoin, votre usage et votre niveau d’exigence.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 rounded-2xl border border-white/10 bg-black/20 p-4">
                <Image className="mt-0.5 h-5 w-5 shrink-0 text-blue-300" />
                <div>
                  <p className="text-sm font-semibold text-white">
                    Test possible rapidement
                  </p>
                  <p className="mt-1 text-xs leading-5 text-white/55">
                    Vous pouvez commencer avec un premier véhicule avant d’envisager une production régulière.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <form onSubmit={handleSubmit} className="space-y-5 p-6 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              name="firstName"
              placeholder="Prénom"
              required
              className="h-12 rounded-xl border-white/10 bg-black/35 text-white placeholder:text-white/35 focus-visible:ring-blue-400"
            />

            <Input
              name="lastName"
              placeholder="Nom"
              required
              className="h-12 rounded-xl border-white/10 bg-black/35 text-white placeholder:text-white/35 focus-visible:ring-blue-400"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              name="email"
              type="email"
              placeholder="Email"
              required
              className="h-12 rounded-xl border-white/10 bg-black/35 text-white placeholder:text-white/35 focus-visible:ring-blue-400"
            />

            <Input
              name="phone"
              type="tel"
              placeholder="Téléphone"
              required
              className="h-12 rounded-xl border-white/10 bg-black/35 text-white placeholder:text-white/35 focus-visible:ring-blue-400"
            />
          </div>

          <Input
            name="company"
            placeholder="Société, garage ou nom de l’activité"
            required
            className="h-12 rounded-xl border-white/10 bg-black/35 text-white placeholder:text-white/35 focus-visible:ring-blue-400"
          />

          <Input
            name="location"
            placeholder="Ville ou secteur géographique"
            className="h-12 rounded-xl border-white/10 bg-black/35 text-white placeholder:text-white/35 focus-visible:ring-blue-400"
          />

          <Textarea
            name="message"
            placeholder="Expliquez votre besoin : véhicule unique, demande ponctuelle, concession, volume estimé, style souhaité, usage des visuels, contraintes à respecter..."
            required
            className="min-h-40 rounded-xl border-white/10 bg-black/35 text-white placeholder:text-white/35 focus-visible:ring-blue-400"
          />

          <input type="hidden" name="offer" value="concession" />

          <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-xs leading-5 text-white/45">
              Demande sans engagement. 
            </p>

            <Button
              disabled={status === 'loading'}
              type="submit"
              className="h-12 rounded-full bg-blue-500 px-7 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-400 disabled:opacity-70"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Envoi en cours
                </>
              ) : (
                <>
                  Envoyer ma demande
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>

          {message ? (
            <div
              role="status"
              className={
                status === 'success'
                  ? 'flex items-start gap-3 rounded-2xl border border-green-400/20 bg-green-400/10 p-4 text-sm text-green-300'
                  : 'rounded-2xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-300'
              }
            >
              {status === 'success' ? (
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
              ) : null}
              <p>{message}</p>
            </div>
          ) : null}
        </form>
      </div>
    </section>
  );
}
