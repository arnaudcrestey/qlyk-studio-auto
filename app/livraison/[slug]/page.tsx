import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Download, ImageIcon, ShieldCheck } from "lucide-react";
import { supabase } from "@/lib/supabase";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type DeliveryPhoto = {
  id: string;
  delivery_id: string;
  photo_url: string;
  position: number | null;
};

export default async function LivraisonClientPage({ params }: PageProps) {
  const { slug } = await params;

  const { data: delivery, error } = await supabase
    .from("qlyk_deliveries")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !delivery) {
    notFound();
  }

  const { data: photosData } = await supabase
    .from("qlyk_delivery_photos")
    .select("*")
    .eq("delivery_id", delivery.id)
    .order("position", { ascending: true });

  const photos: DeliveryPhoto[] = photosData ?? [];

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.20),transparent_55%)]" />

        <div className="relative mx-auto w-full max-w-6xl px-6 py-16 sm:px-8 lg:px-12">
          <Link
            href="/livraison"
            className="mb-8 inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Link>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-sm sm:p-8">
            <div className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-200">
              Livraison sécurisée QLYK
            </div>

            <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
              Vos visuels sont prêts.
            </h1>

            <p className="mt-5 max-w-2xl text-white/65">
              Retrouvez ci-dessous les visuels finalisés pour votre véhicule.
              Vous pouvez les consulter et les télécharger directement.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-[#0b1220] p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                  Client
                </p>
                <p className="mt-2 text-sm font-medium text-white">
                  {delivery.client_name || "Client QLYK"}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0b1220] p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                  Véhicule
                </p>
                <p className="mt-2 text-sm font-medium text-white">
                  {delivery.vehicle || "Véhicule livré"}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0b1220] p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                  Photos
                </p>
                <p className="mt-2 text-sm font-medium text-white">
                  {photos.length} visuel(s)
                </p>
              </div>
            </div>
          </div>

          {photos.length === 0 ? (
            <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm">
              <ImageIcon className="mx-auto h-10 w-10 text-white/40" />
              <h2 className="mt-4 text-xl font-semibold">
                Livraison en préparation
              </h2>
              <p className="mt-3 text-white/55">
                Les visuels ne sont pas encore disponibles sur cet espace.
              </p>
            </div>
          ) : (
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {photos.map((photo, index) => (
                <article
                  key={photo.id}
                  className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm"
                >
                  <img
                    src={photo.photo_url}
                    alt={`Visuel livré ${index + 1}`}
                    className="aspect-[4/3] w-full object-cover"
                  />

                  <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-medium text-white">
                        Visuel {index + 1}
                      </p>
                      <p className="mt-1 text-xs text-white/40">
                        Image finale QLYK Studio Auto
                      </p>
                    </div>

                    <a
                      href={photo.photo_url}
                      target="_blank"
                      rel="noreferrer"
                      download
                      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-500"
                    >
                      <Download className="h-4 w-4" />
                      Télécharger
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}

          <div className="mt-10 rounded-3xl border border-blue-500/10 bg-blue-500/5 p-6">
            <div className="flex gap-4">
              <ShieldCheck className="mt-1 h-5 w-5 text-blue-300" />
              <div>
                <h2 className="font-medium text-white">
                  Espace de livraison privé
                </h2>
                <p className="mt-2 text-sm leading-7 text-white/55">
                  Ce lien est destiné uniquement au client concerné par cette
                  livraison.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
