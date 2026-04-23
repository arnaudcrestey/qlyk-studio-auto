'use client';

import { FormEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

type Status = 'idle' | 'loading' | 'success' | 'error';

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');
    setMessage('');

    const formData = new FormData(event.currentTarget);
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
        setMessage(data.error ?? 'Erreur lors de l’envoi.');
        return;
      }

      setStatus('success');
      setMessage('Votre demande a bien été envoyée.');
      event.currentTarget.reset();
    } catch {
      setStatus('error');
      setMessage('Service indisponible, veuillez réessayer.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-technical/70 bg-technical/25 p-5 sm:p-7">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input name="firstName" placeholder="Prénom" required />
        <Input name="lastName" placeholder="Nom" required />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input name="email" type="email" placeholder="Email" required />
        <Input name="phone" type="tel" placeholder="Téléphone" required />
      </div>
      <Input name="company" placeholder="Société" required />
      <Textarea name="message" placeholder="Votre message" required />
      <div className="flex justify-center sm:justify-start">
        <Button disabled={status === 'loading'} type="submit">
          {status === 'loading' ? 'Envoi...' : 'Envoyer'}
        </Button>
      </div>
      {message ? (
        <p className={status === 'success' ? 'text-green-400' : 'text-red-400'} role="status">
          {message}
        </p>
      ) : null}
    </form>
  );
}
