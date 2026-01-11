import { useState } from "react";
import Menu from "./components/Menu";
import GameBoard from "./components/GameBoard";

function App() {
  const [etatPartie, setEtatPartie] = useState({ joueurs: [] });
  const [gagnant, setGagnant] = useState(null);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Jeu de Cartes</h1>
      <Menu setEtatPartie={setEtatPartie} setGagnant={setGagnant} />
      <GameBoard etatPartie={etatPartie} />
      {gagnant && <h2 className="mt-4 text-xl font-bold">Gagnant : {gagnant}</h2>}
    </div>
  );
}

export default App;
