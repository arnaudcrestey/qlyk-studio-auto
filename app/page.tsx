import Link from "next/link";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] px-4 text-white sm:px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.18),transparent_42%)]" />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent_30%,rgba(37,99,235,0.05))]" />

      <section className="relative flex min-h-screen items-center justify-center py-8 sm:py-12">
        <div className="relative w-full max-w-[1100px] overflow-hidden rounded-[30px] border border-white/10 bg-[#080808]/95 px-6 py-12 text-center shadow-[0_0_90px_rgba(37,99,235,0.22)] backdrop-blur-xl sm:px-12 sm:py-20 lg:px-20 lg:py-24">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.16),transparent_50%)]" />

          <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/70 to-transparent" />

          <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-blue-600/12 blur-3xl" />

          <div className="pointer-events-none absolute -right-24 bottom-12 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative mx-auto max-w-[820px]">
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.40em] text-blue-400 sm:text-xs">
              Studio visuel automobile premium
            </p>

            <h1 className="mt-3 font-light uppercase text-white">
  <span className="hidden text-[3.4rem] tracking-[0.18em] sm:block lg:text-[4.4rem]">
    QLYK Studio Auto
  </span>

  <span className="block text-[2.9rem] leading-[1.12] tracking-[0.16em] sm:hidden">
    QLYK
    <br />
    Studio Auto
  </span>
</h1>

            <div className="mx-auto mt-8 h-px w-28 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

            <h2 className="mx-auto mt-10 max-w-[760px] font-serif text-[2rem] leading-[1.08] tracking-[-0.04em] text-white sm:text-5xl lg:text-[4rem]">
              Vos véhicules sont prêts à vendre.
              <span className="block text-white/60">
                Leur décor, pas toujours.
              </span>
            </h2>

            <p className="mx-auto mt-7 max-w-[580px] text-sm leading-7 text-white/62 sm:text-base sm:leading-8">
              Nous transformons l’environnement visuel de vos véhicules pour les
              présenter dans un cadre plus professionnel et plus vendeur.
            </p>

            <div className="mt-10 flex justify-center">
              <Link
                href="/accueil"
                className="group inline-flex h-14 items-center justify-center gap-3 rounded-full bg-blue-600 px-10 text-sm font-semibold text-white shadow-[0_0_35px_rgba(37,99,235,0.45)] transition-all duration-300 hover:bg-blue-500 hover:shadow-[0_0_55px_rgba(37,99,235,0.75)]"
              >
                Entrer
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>

            <p className="mx-auto mt-12 whitespace-nowrap text-[0.62rem] font-medium uppercase tracking-[0.18em] text-white/46 sm:text-[0.72rem] sm:tracking-[0.34em]">
  — Sans jamais modifier le véhicule —
</p>
          </div>
        </div>
      </section>
    </main>
  );
}
