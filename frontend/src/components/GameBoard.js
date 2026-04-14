import { AnimatePresence, motion } from "framer-motion";
import Card from "./Card";

export default function GameBoard({ etatPartie }) {
  const joueurs = Array.isArray(etatPartie?.joueurs) ? etatPartie.joueurs : [];

  if (joueurs.length === 0) {
    return (
      <section className="rounded-3xl bg-white px-6 py-12 text-center text-slate-500 shadow-sm">
        Ajoute des joueurs pour afficher le plateau.
      </section>
    );
  }

  return (
    <section className="rounded-3xl bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">Plateau</h2>
        <p className="text-sm text-slate-500">
          {joueurs.length} joueur{joueurs.length > 1 ? "s" : ""}
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {joueurs.map((joueur, idxJ) => (
          <motion.article
            key={`${joueur.nom}-${idxJ}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idxJ * 0.05 }}
            className="rounded-3xl border border-slate-200 bg-slate-50 p-4"
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{joueur.nom}</h3>
                <p className="text-sm text-slate-500">
                  {(joueur.main || []).length} carte
                  {(joueur.main || []).length > 1 ? "s" : ""}
                </p>
              </div>
            </div>

            <div className="flex min-h-[150px] flex-wrap gap-3">
              <AnimatePresence>
                {(joueur.main || []).map((carte, idx) => (
                  <motion.div
                    key={`${joueur.nom}-${idx}-${carte?.rang}-${carte?.couleur}`}
                    initial={{ opacity: 0, scale: 0.85, y: 14 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ duration: 0.2, delay: idx * 0.04 }}
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
