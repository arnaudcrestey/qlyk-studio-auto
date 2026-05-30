import Link from "next/link";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] px-4 text-white sm:px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.18),transparent_42%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.035),transparent_28%,rgba(37,99,235,0.055))]" />

      <section className="relative flex min-h-screen items-center justify-center py-8 sm:py-12">
        <div className="relative w-full max-w-[1100px] overflow-hidden rounded-[28px] border border-white/10 bg-[#080808]/92 px-6 py-12 text-center shadow-[0_0_80px_rgba(37,99,235,0.28)] backdrop-blur-xl sm:rounded-[36px] sm:px-12 sm:py-18 lg:px-20 lg:py-24">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.16),transparent_48%)]" />
          <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/80 to-transparent" />
          <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-blue-600/15 blur-3xl" />
          <div className="pointer-events-none absolute -right-32 bottom-12 h-72 w-72 rounded-full bg-blue-500/12 blur-3xl" />

          <div className="relative mx-auto max-w-[820px]">
            <p className="text-[0.62rem] font-medium uppercase tracking-[0.34em] text-blue-400 sm:text-[0.72rem] sm:tracking-[0.48em]">
              Studio visuel automobile premium
            </p>

            <h1 className="mt-7 text-[2.25rem] font-light uppercase leading-[1.05] tracking-[0.16em] text-white sm:text-[4.1rem] sm:tracking-[0.22em] lg:text-[5.2rem]">
              QLYK Studio Auto
            </h1>

            <div className="mx-auto mt-8 h-px w-28 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

            <h2 className="mx-auto mt-10 max-w-[760px] font-serif text-[2.1rem] leading-[1.08] tracking-[-0.04em] text-white sm:text-5xl lg:text-[4rem]">
              Vos véhicules sont prêts à vendre.
              <span className="block text-white/58">
                Leur décor, pas toujours.
              </span>
            </h2>

            <p className="mx-auto mt-7 max-w-[560px] text-[0.92rem] leading-7 text-white/62 sm:text-base sm:leading-8">
              Nous transformons l’environnement visuel de vos véhicules pour les
              présenter dans un cadre plus propre, plus professionnel et plus vendeur
              — sans jamais modifier le véhicule.
            </p>

            <div className="mt-9 flex justify-center">
              <Link
                href="/accueil"
                className="group inline-flex h-12 items-center justify-center gap-3 rounded-full bg-blue-600 px-8 text-sm font-semibold text-white shadow-[0_0_35px_rgba(37,99,235,0.48)] transition hover:bg-blue-500 hover:shadow-[0_0_52px_rgba(37,99,235,0.7)]"
              >
                Entrer
                <span className="transition group-hover:translate-x-1">→</span>
              </Link>
            </div>

            <div className="mx-auto mt-10 flex max-w-[620px] flex-col items-center justify-center gap-3 text-[0.62rem] font-medium uppercase tracking-[0.28em] text-white/46 sm:flex-row sm:gap-5 sm:text-[0.68rem] sm:tracking-[0.34em]">
              <span>Fidèle</span>
              <span className="hidden h-1 w-1 rounded-full bg-blue-500 sm:block" />
              <span>Professionnel</span>
              <span className="hidden h-1 w-1 rounded-full bg-blue-500 sm:block" />
              <span>Sans modification</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
