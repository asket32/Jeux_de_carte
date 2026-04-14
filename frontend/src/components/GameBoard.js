import { AnimatePresence, motion } from "framer-motion";
import Card from "./Card";

export default function GameBoard({ etatPartie }) {
  const joueurs = Array.isArray(etatPartie?.joueurs) ? etatPartie.joueurs : [];

  if (joueurs.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl rounded-[30px] border border-white/10 bg-slate-950/65 px-6 py-12 text-center text-slate-300 shadow-[0_25px_70px_rgba(15,23,42,0.35)] backdrop-blur"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-200/80">
          Plateau
        </p>
        <h2 className="mt-3 text-2xl font-black text-white sm:text-3xl">
          La table est prete
        </h2>
        <p className="mt-3 text-sm text-slate-400 sm:text-base">
          Ajoute des joueurs depuis le panneau de controle pour distribuer les
          cartes et lancer une manche.
        </p>
      </motion.div>
    );
  }

  return (
    <section className="w-full max-w-6xl rounded-[32px] border border-white/10 bg-slate-950/70 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.38)] backdrop-blur">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-200/80">
            En jeu
          </p>
          <h2 className="text-2xl font-black text-white sm:text-3xl">
            Plateau des joueurs
          </h2>
        </div>
        <p className="text-sm text-slate-400">
          {joueurs.length} joueur{joueurs.length > 1 ? "s" : ""} autour de la
          table
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {joueurs.map((joueur, idxJ) => (
          <motion.article
            key={`${joueur.nom}-${idxJ}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: idxJ * 0.06 }}
            className="overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(160deg,rgba(15,23,42,0.92),rgba(17,94,89,0.35))] p-5"
          >
            <div className="mb-5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-300 to-orange-500 text-lg font-black text-slate-950">
                  {joueur.nom?.slice(0, 1)?.toUpperCase() || "?"}
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">{joueur.nom}</h3>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-300">
                    Main active
                  </p>
                </div>
              </div>
              <div className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100">
                {(joueur.main || []).length} carte
                {(joueur.main || []).length > 1 ? "s" : ""}
              </div>
            </div>

            <div className="flex min-h-[160px] flex-wrap gap-3 rounded-[24px] border border-white/10 bg-black/10 p-4">
              <AnimatePresence>
                {(joueur.main || []).map((carte, idx) => (
                  <motion.div
                    key={`${joueur.nom}-${idx}-${carte?.rang}-${carte?.couleur}`}
                    initial={{ opacity: 0, scale: 0.7, rotate: -8, y: 18 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
                    exit={{ opacity: 0, scale: 0.7, y: 18 }}
                    transition={{ duration: 0.24, delay: idx * 0.05 }}
                  >
                    <Card carte={carte} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
