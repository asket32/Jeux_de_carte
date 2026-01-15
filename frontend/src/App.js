import { useState } from "react";
import Menu from "./components/Menu";
import GameBoard from "./components/GameBoard";

function App() {
  const [etatPartie, setEtatPartie] = useState({ joueurs: [] });
  const [gagnant, setGagnant] = useState(null);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-green-800 text-white">
      <h1 className="text-3xl font-bold mb-6 animate-pulse">Jeu de Cartes</h1>
      <Menu setEtatPartie={setEtatPartie} setGagnant={setGagnant} etatPartie={etatPartie} />
      <GameBoard etatPartie={etatPartie} />
      {gagnant && (
        <h2 className="mt-6 text-2xl font-extrabold text-yellow-400 animate-bounce">
          🏆 Gagnant : {gagnant} 🏆
        </h2>
      )}
    </div>
  );
}

export default App;
