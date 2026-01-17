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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200">
      <h1 className="text-3xl font-bold mb-6">Jeu de Cartes</h1>

      <Menu
        setEtatPartie={(data) =>
          setEtatPartie((prev) => ({
            ...prev,
            ...data,
            joueurs: Array.isArray(data?.joueurs)
              ? data.joueurs
              : prev.joueurs,
          }))
        }
        setGagnant={setGagnant}
      />

      <GameBoard etatPartie={etatPartie} />

      {gagnant && (
  <motion.div
    initial={{ scale: 0, rotate: -10 }}
    animate={{ scale: 1, rotate: 0 }}
    transition={{ type: "spring", stiffness: 200 }}
    className="mt-6 text-3xl font-bold text-green-700"
  >
    Gagnant : {gagnant}
  </motion.div>
)}

    </div>
  );
}

export default App;
