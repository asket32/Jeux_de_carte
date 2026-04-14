import { useState } from "react";
import { motion } from "framer-motion";
import Menu from "./components/Menu";
import GameBoard from "./components/GameBoard";

function App() {
  const [etatPartie, setEtatPartie] = useState({
    joueurs: [],
    partie_commencee: false,
    partie_terminee: false,
  });
  const [gagnant, setGagnant] = useState(null);

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <motion.header
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="rounded-3xl bg-white p-6 shadow-sm"
        >
          <h1 className="text-3xl font-bold sm:text-4xl">Jeu de Cartes</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">
            Gere les joueurs, lance la partie et suis les cartes distribuees.
          </p>
        </motion.header>

        <Menu
          etatPartie={etatPartie}
          setEtatPartie={(data) =>
            setEtatPartie((prev) => ({
              ...prev,
              ...data,
              joueurs: Array.isArray(data?.joueurs) ? data.joueurs : prev.joueurs,
            }))
          }
          setGagnant={setGagnant}
        />

        <GameBoard etatPartie={etatPartie} />

        {gagnant && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-emerald-200 bg-emerald-50 px-6 py-4 text-center shadow-sm"
          >
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
              Gagnant
            </p>
            <p className="mt-1 text-2xl font-bold text-emerald-900">{gagnant}</p>
          </motion.div>
        )}
      </div>
    </main>
  );
}

export default App;
