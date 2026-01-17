import { motion, AnimatePresence } from "framer-motion";
import Card from "./Card";

export default function GameBoard({ etatPartie }) {
  const joueurs = Array.isArray(etatPartie?.joueurs) ? etatPartie.joueurs : [];

  if (joueurs.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Ajoutez des joueurs pour commencer la partie.
      </div>
    );
  }

  return (
    <div className="flex flex-row items-center justify-center gap-8 flex-wrap mt-6">
      {joueurs.map((joueur, idxJ) => (
        <motion.div
          key={idxJ}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center"
        >
          <h3 className="font-bold mb-3 text-xl text-gray-800">{joueur.nom}</h3>

          <div className="flex space-x-3">
            <AnimatePresence>
              {(joueur.main || []).map((carte, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.6, y: -20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.6, y: 20 }}
                  transition={{ duration: 0.25, delay: idx * 0.05 }}
                >
                  <Card carte={carte} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
