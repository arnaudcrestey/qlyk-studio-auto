import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getQlykDelivery } from "@/lib/qlyk-deliveries";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function LivraisonClientPage({ params }: PageProps) {
  const { slug } = await params;
  const delivery = getQlykDelivery(slug);

  if (!delivery) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#050816] px-5 py-10 text-white">
      <section className="mx-auto w-full max-w-6xl">
        <div className="mb-10 rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl">
          <p className="mb-3 text-sm uppercase tracking-[0.35em] text-white/50">
            QLYK Studio Auto
          </p>

          <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
            Livraison de vos visuels
          </h1>

          <p className="mt-4 max-w-2xl text-white/65">
            Votre sélection finale est prête. Vous pouvez consulter et
            télécharger vos visuels haute qualité.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <InfoCard label="Client" value={delivery.clientName} />
            <InfoCard label="Véhicule" value={delivery.vehicle} />
            <InfoCard label="Livraison" value={delivery.deliveredAt} />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {delivery.photos.map((photo, index) => (
            <article
              key={photo}
              className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04]"
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={photo}
                  alt={`Visuel livré ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              <div className="flex items-center justify-between gap-4 p-4">
                <span className="text-sm text-white/60">
                  Visuel {index + 1}
                </span>

                <a
                  href={photo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-white px-4 py-2 text-sm font-medium text-[#050816] transition hover:bg-white/90"
                >
                  Télécharger
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/livraison" className="text-sm text-white/50 hover:text-white">
            Retour à l’espace livraison
          </Link>
        </div>
      </section>
    </main>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <p className="text-xs uppercase tracking-[0.25em] text-white/40">
        {label}
      </p>
      <p className="mt-2 text-sm font-medium text-white">{value}</p>
    </div>
  );
}
