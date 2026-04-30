export default function PolitiqueCookiesPage() {
  return (
    <main className="container-premium py-24">
      <section className="mx-auto max-w-3xl space-y-8">
        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-blue-400">
            Cookies
          </p>
          <h1 className="text-4xl font-light text-white md:text-5xl">
            Politique de cookies
          </h1>
        </div>

        <div className="space-y-5 text-sm leading-relaxed text-white/60">
          <p>
            Ce site peut utiliser des cookies nécessaires au bon fonctionnement de
            l’expérience utilisateur.
          </p>

          <p>
            Certains services tiers utilisés pour l’hébergement, les formulaires ou la
            mesure d’audience peuvent également déposer des cookies techniques.
          </p>

          <p>
            Vous pouvez gérer les cookies directement depuis les paramètres de votre
            navigateur.
          </p>
        </div>
      </section>
    </main>
  );
}
