import { ContactForm } from '@/components/contact-form';

export default function ContactPage() {
  return (
    <section className="section-spacing">
      <div className="container-premium max-w-4xl">
        <h1 className="text-center font-serif text-4xl sm:text-5xl">Contact</h1>
        <p className="mx-auto mt-4 max-w-2xl text-center text-foreground/80">
          Parlons de vos besoins de production visuelle automobile.
        </p>
        <div className="mt-8">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
