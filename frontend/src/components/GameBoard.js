import { motion, AnimatePresence } from "framer-motion";
import PlayerHand from "./PlayerHand";

export default function GameBoard({ etatPartie }) {
   if (!etatPartie || !Array.isArray(etatPartie.joueurs)) return null;

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      {etatPartie.joueurs.map((joueur, idxJ) => (
        <div key={idxJ} className="flex flex-col items-center">
          <h3 className="font-bold mb-2 text-lg">{joueur.nom}</h3>
          <div className="flex space-x-2 justify-center">
            <AnimatePresence>
              {joueur.main.map((carte, idx) => (
                <motion.div
                  key={idx}
                  initial={{ y: -50, opacity: 0, scale: 0.5 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: 50, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <PlayerHand carte={carte} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      ))}
    </div>
  );
}
