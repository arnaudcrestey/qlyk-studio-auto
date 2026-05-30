import Link from "next/link";

export default function HomePage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#070707] px-5 py-10 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.16),transparent_44%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <section className="relative w-full max-w-[1180px] overflow-hidden rounded-[34px] border border-white/10 bg-[#0A0A0A] px-6 py-14 text-center shadow-[0_0_55px_rgba(37,99,235,0.22)] sm:px-10 sm:py-20 lg:px-16 lg:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.12),transparent_46%)]" />
        <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/70 to-transparent" />
        <div className="pointer-events-none absolute inset-x-20 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-500/45 to-transparent" />

        <div className="relative mx-auto max-w-[760px]">
          <p className="text-[0.66rem] font-medium uppercase tracking-[0.42em] text-blue-500 sm:text-xs">
            Studio visuel automobile premium
          </p>

          <h1 className="mt-7 text-[2.9rem] font-light uppercase tracking-[0.34em] text-white sm:text-6xl md:text-7xl">
            QLYK Studio Auto
          </h1>

          <div className="mx-auto mt-7 h-px w-28 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

          <h2 className="mx-auto mt-10 font-serif text-[2.35rem] leading-[1.05] tracking-[-0.045em] text-white sm:text-5xl md:text-[4rem]">
            Vos véhicules sont prêts à vendre.
            <span className="block text-white/62">
              Leur décor, pas toujours.
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-[560px] text-sm leading-7 text-white/58 sm:text-base sm:leading-8">
            Nous transformons l’environnement visuel de vos véhicules pour les
            présenter dans un cadre plus propre, plus professionnel et plus vendeur
            — sans jamais modifier le véhicule.
          </p>

          <div className="mt-9 flex justify-center">
            <Link
              href="/accueil"
              className="inline-flex h-11 items-center justify-center rounded-md bg-blue-600 px-7 text-sm font-semibold text-white shadow-[0_0_28px_rgba(37,99,235,0.38)] transition hover:bg-blue-500 hover:shadow-[0_0_42px_rgba(37,99,235,0.55)]"
            >
              Entrer
            </Link>
          </div>

          <p className="mx-auto mt-8 max-w-[520px] text-[0.68rem] uppercase tracking-[0.28em] text-white/34 sm:tracking-[0.34em]">
             Professionnel · Sans modification
          </p>
        </div>
      </section>
    </main>
  );
}
