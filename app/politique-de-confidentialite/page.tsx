export default function PolitiqueConfidentialitePage() {
  return (
    <main className="container-premium py-24">
      <section className="mx-auto max-w-3xl space-y-8">
        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-blue-400">
            Données personnelles
          </p>
          <h1 className="text-4xl font-light text-white md:text-5xl">
            Politique de confidentialité
          </h1>
        </div>

        <div className="space-y-5 text-sm leading-relaxed text-white/60">
          <p>
            Les informations transmises via les formulaires sont utilisées uniquement
            pour traiter les demandes reçues.
          </p>

          <p>
            Les données peuvent inclure le nom, l’adresse email, le téléphone, le nom
            de l’activité, le message et les fichiers transmis dans le cadre d’un dépôt
            véhicule.
          </p>

          <p>
            Ces données ne sont pas vendues à des tiers.
          </p>

          <p>
            Vous pouvez demander la modification ou la suppression de vos données en
            nous contactant via le formulaire du site.
          </p>
        </div>
      </section>
    </main>
  );
}
