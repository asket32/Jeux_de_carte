import { useState } from "react";
import Menu from "./components/Menu";
import GameBoard from "./components/GameBoard";

function App() {
  const [etatPartie, setEtatPartie] = useState({ joueurs: [] });
  const [gagnant, setGagnant] = useState(null);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-green-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-6 text-yellow-300 animate-bounce">
        Jeu de Cartes
      </h1>

      <Menu
        setEtatPartie={setEtatPartie}
        setGagnant={setGagnant}
        etatPartie={etatPartie} // passer l'état pour gérer le disabled
      />

      <div className="mt-6 w-full max-w-4xl">
        <GameBoard etatPartie={etatPartie} />
      </div>

      {gagnant && (
        <h2 className="mt-6 text-2xl font-bold text-red-500 animate-pulse">
          Gagnant : {gagnant}
        </h2>
      )}
    </div>
  );
}

export default App;
