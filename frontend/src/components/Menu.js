import { useState } from "react";
import {
  ajouterJoueur,
  demarrerPartie,
  revelerCartes,
  obtenirGagnant,
  reinitialiserPartie
} from "../api/gameApi";

export default function Menu({ setEtatPartie, setGagnant }) {
  const [nomJoueur, setNomJoueur] = useState("");

  const handleAjouter = async () => {
    if (!nomJoueur) return;
    await ajouterJoueur(nomJoueur);
    setNomJoueur("");
    const res = await demarrerPartie(); // pour rafraîchir l'état
    setEtatPartie(res.data);
  };

  const handleDemarrer = async () => {
    const res = await demarrerPartie();
    setEtatPartie(res.data);
  };

  const handleReveler = async () => {
    const res = await revelerCartes();
    setEtatPartie(res.data);
  };

  const handleGagnant = async () => {
    const res = await obtenirGagnant();
    setGagnant(res.data.gagnant);
  };

  const handleReset = async () => {
    await reinitialiserPartie();
    setEtatPartie({ joueurs: [] });
    setGagnant(null);
  };

  return (
    <div className="mb-4 space-y-2">
      <div className="flex space-x-2">
        <input
          type="text"
          value={nomJoueur}
          onChange={(e) => setNomJoueur(e.target.value)}
          placeholder="Nom joueur"
          className="border px-2 py-1 rounded"
        />
        <button onClick={handleAjouter} className="bg-blue-500 text-white px-2 py-1 rounded">
          Ajouter joueur
        </button>
      </div>
      <div className="flex space-x-2">
        <button onClick={handleDemarrer} className="bg-green-500 text-white px-2 py-1 rounded">
          Démarrer partie
        </button>
        <button onClick={handleReveler} className="bg-yellow-500 text-white px-2 py-1 rounded">
          Révéler cartes
        </button>
        <button onClick={handleGagnant} className="bg-purple-500 text-white px-2 py-1 rounded">
          Gagnant
        </button>
        <button onClick={handleReset} className="bg-red-500 text-white px-2 py-1 rounded">
          Réinitialiser
        </button>
      </div>
    </div>
  );
}
