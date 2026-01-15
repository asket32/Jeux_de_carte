import { useState } from "react";
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
      <h1 className="text-3xl font-bold mb-6">🎴 Jeu de Cartes</h1>

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
        <div className="mt-6 text-2xl font-bold text-green-700">
          🏆 Gagnant : {gagnant}
        </div>
      )}
    </div>
  );
}

export default App;
