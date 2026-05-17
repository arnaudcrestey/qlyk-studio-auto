export default function DepotVolumePage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-black px-4 py-12 text-white sm:px-6 sm:py-20">
      <section className="mx-auto w-full max-w-6xl">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#3b82f6] sm:text-sm sm:tracking-[0.34em]">
            QLYK STUDIO AUTO
          </p>

          <h1 className="mx-auto mt-5 max-w-3xl text-[38px] font-light leading-[1.04] tracking-tight text-white sm:mt-6 sm:text-5xl lg:text-6xl">
            Dépôt multi-véhicules
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-relaxed text-white/55 sm:mt-6 sm:text-lg">
            Espace dédié aux garages, vendeurs VO, mandataires et professionnels
            souhaitant transmettre plusieurs visuels de véhicules.
          </p>
        </div>

        <div className="mt-10 w-full rounded-[28px] border border-white/10 bg-white/[0.035] p-5 shadow-[0_0_80px_rgba(37,99,235,0.12)] backdrop-blur sm:mt-14 sm:rounded-[34px] sm:p-8 lg:p-10">
          <div className="grid w-full gap-4 sm:grid-cols-2">
            <input
              type="text"
              placeholder="Nom / société"
              className="h-[58px] min-w-0 rounded-2xl border border-white/10 bg-black/40 px-5 text-[15px] text-white outline-none transition placeholder:text-white/35 focus:border-[#3b82f6]"
            />

            <input
              type="email"
              placeholder="Email"
              className="h-[58px] min-w-0 rounded-2xl border border-white/10 bg-black/40 px-5 text-[15px] text-white outline-none transition placeholder:text-white/35 focus:border-[#3b82f6]"
            />

            <input
              type="tel"
              placeholder="Téléphone"
              className="h-[58px] min-w-0 rounded-2xl border border-white/10 bg-black/40 px-5 text-[15px] text-white outline-none transition placeholder:text-white/35 focus:border-[#3b82f6]"
            />

            <input
              type="text"
              placeholder="Nombre de véhicules"
              className="h-[58px] min-w-0 rounded-2xl border border-white/10 bg-black/40 px-5 text-[15px] text-white outline-none transition placeholder:text-white/35 focus:border-[#3b82f6]"
            />
          </div>

          <textarea
            placeholder="Informations utiles : organisation des fichiers, consignes déjà validées, contraintes de traitement, urgence éventuelle..."
            className="mt-4 min-h-[175px] w-full resize-none rounded-3xl border border-white/10 bg-black/40 px-5 py-5 text-[15px] leading-relaxed text-white outline-none transition placeholder:text-white/35 focus:border-[#3b82f6] sm:mt-5 sm:min-h-[190px]"
          />

          <div className="mt-6 rounded-[26px] border border-dashed border-white/15 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.13),rgba(255,255,255,0.035)_42%,rgba(0,0,0,0.35)_100%)] p-7 text-center shadow-[0_0_55px_rgba(37,99,235,0.10)] sm:mt-8 sm:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[#3b82f6]/30 bg-[#2563eb]/15 text-xl text-[#3b82f6] shadow-[0_0_35px_rgba(37,99,235,0.25)]">
              ↑
            </div>

            <p className="mt-5 text-base font-semibold text-white sm:text-lg">
              Zone de dépôt des visuels
            </p>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/45">
              Sélectionnez les photos des véhicules concernés. Les fichiers
              seront transmis pour préparation du traitement visuel.
            </p>

            <button
              type="button"
              className="mt-6 h-13 rounded-full bg-[#2563eb] px-8 py-4 text-sm font-semibold text-white shadow-[0_0_28px_rgba(37,99,235,0.35)] transition hover:scale-[1.02] hover:bg-[#3b82f6] sm:h-14 sm:px-9"
            >
              Choisir les photos
            </button>

            <p className="mt-4 text-xs leading-relaxed text-white/35">
              JPG, PNG — dépôt multi-véhicules — volume adapté selon votre besoin.
            </p>
          </div>

          <div className="mt-7 flex flex-col gap-5 border-t border-white/10 pt-6 sm:mt-8 sm:flex-row sm:items-center sm:justify-between sm:pt-8">
            <p className="max-w-2xl text-sm leading-relaxed text-white/45">
              Ce dépôt concerne une demande déjà qualifiée. Les visuels seront
              associés à votre dossier QLYK Studio Auto.
            </p>

            <button
              type="button"
              className="h-13 rounded-full bg-[#2563eb] px-8 py-4 text-sm font-semibold text-white shadow-[0_0_28px_rgba(37,99,235,0.30)] transition hover:scale-[1.02] hover:bg-[#3b82f6] sm:h-14 sm:min-w-[210px]"
            >
              Envoyer le dépôt
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
