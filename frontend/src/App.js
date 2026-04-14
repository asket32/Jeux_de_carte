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
    <main className="relative min-h-screen overflow-hidden bg-[#06131f] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_35%),radial-gradient(circle_at_bottom,_rgba(251,191,36,0.12),_transparent_30%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-8">
        <motion.header
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="inline-flex rounded-full border border-amber-300/25 bg-amber-300/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-amber-100">
            Arena
          </span>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-6xl">
            Jeu de Cartes
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-300 sm:text-base">
            Une table plus moderne, plus lisible et plus dynamique pour suivre
            chaque manche en un coup d'oeil.
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
            initial={{ scale: 0.85, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 14 }}
            className="w-full max-w-3xl rounded-[28px] border border-emerald-300/20 bg-emerald-400/10 px-6 py-5 text-center shadow-[0_24px_70px_rgba(16,185,129,0.18)] backdrop-blur"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-100">
              Resultat
            </p>
            <p className="mt-2 text-3xl font-black text-white sm:text-4xl">
              Gagnant : {gagnant}
            </p>
          </motion.div>
        )}
      </div>
    </main>
  );
}

export default App;
