export default function ConditionsGeneralesPage() {
  return (
    <main className="container-premium py-24">
      <section className="mx-auto max-w-3xl space-y-8">
        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-blue-400">
            Informations légales
          </p>
          <h1 className="text-4xl font-light text-white md:text-5xl">
            Conditions générales
          </h1>
        </div>

        <div className="space-y-5 text-sm leading-relaxed text-white/60">
          <p>
            Les présentes conditions générales encadrent l’utilisation des services
            proposés par Qlyk Studio Auto.
          </p>

          <p>
            Qlyk Studio Auto propose la création de visuels automobiles premium à
            partir de photos transmises par le client. Le véhicule d’origine est
            strictement respecté : forme, couleur, jantes, carrosserie et proportions.
          </p>

          <p>
            Les prix, délais et modalités peuvent varier selon la demande, le volume,
            la qualité des fichiers transmis et les contraintes spécifiques du projet.
          </p>

          <p>
            Toute demande spécifique pourra nécessiter une validation préalable avant
            production.
          </p>
        </div>
      </section>
    </main>
  );
}
