import Link from "next/link";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] px-4 text-white sm:px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.18),transparent_42%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent_30%,rgba(37,99,235,0.05))]" />

      <section className="relative flex min-h-screen items-center justify-center py-8 sm:py-12">
        <div className="relative w-full max-w-[1100px] overflow-hidden rounded-[34px] border border-white/10 bg-[#080808]/95 px-6 py-14 text-center shadow-[0_0_90px_rgba(37,99,235,0.22)] backdrop-blur-xl sm:px-12 sm:py-20 lg:px-20 lg:py-24">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.16),transparent_50%)]" />
          <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/70 to-transparent" />
          <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-blue-600/12 blur-3xl" />
          <div className="pointer-events-none absolute -right-24 bottom-12 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative mx-auto max-w-[820px]">
            <p className="mx-auto max-w-[320px] text-[0.68rem] font-medium uppercase leading-6 tracking-[0.34em] text-blue-400 sm:max-w-none sm:text-xs sm:tracking-[0.40em]">
              Studio visuel automobile premium
            </p>

            <h1 className="mt-9 font-light uppercase text-white">
              <span className="hidden text-[3.6rem] tracking-[0.18em] sm:block lg:text-[4.6rem]">
                QLYK Studio Auto
              </span>

              <span className="block sm:hidden">
                <span className="block whitespace-nowrap text-[2rem] leading-none tracking-[0.11em]">
                  QLYK STUDIO
                </span>

                <span className="mt-4 block text-[1.9rem] leading-none tracking-[0.22em]">
                  AUTO
                </span>
              </span>
            </h1>

            <div className="mx-auto mt-10 h-px w-28 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

            <h2 className="mx-auto mt-11 max-w-[760px] font-serif text-[1.8rem] leading-[1.12] tracking-[-0.04em] text-white sm:text-5xl lg:text-[4rem]">
              Vos véhicules sont prêts à vendre.
              <span className="block text-white/60">
                Leur décor, pas toujours.
              </span>
            </h2>

            <p className="mx-auto mt-8 max-w-[580px] text-[1.05rem] leading-8 text-white/72 sm:text-base sm:leading-8">
              Nous transformons l’environnement visuel de vos véhicules pour les
              présenter dans un cadre plus professionnel et plus vendeur.
            </p>

            <div className="mt-12 flex justify-center">
              <Link
                href="/accueil"
                className="group inline-flex h-14 items-center justify-center gap-4 rounded-full bg-blue-600 px-12 text-base font-semibold text-white shadow-[0_0_35px_rgba(37,99,235,0.45)] transition-all duration-300 hover:bg-blue-500 hover:shadow-[0_0_55px_rgba(37,99,235,0.75)] sm:text-sm"
              >
                Entrer
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>

            <p className="mx-auto mt-14 whitespace-nowrap text-[0.63rem] font-medium uppercase tracking-[0.18em] text-white/46 sm:text-[0.72rem] sm:tracking-[0.34em]">
              — Sans jamais modifier le véhicule —
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
