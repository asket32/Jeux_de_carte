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
  const [erreur, setErreur] = useState(null);

  // Ajouter un joueur
  const handleAjouter = async () => {
    if (!nomJoueur.trim()) return;

    try {
      const res = await ajouterJoueur(nomJoueur.trim());
      setEtatPartie(res.data); // met à jour la liste des joueurs
      setNomJoueur("");        // vide l’input
      setErreur(null);         // réinitialise l’erreur
    } catch (err) {
      setErreur(err.response?.data?.erreur || "Erreur ajout joueur");
    }
  };

  // Démarrer la partie
  const handleDemarrer = async () => {
    try {
      const res = await demarrerPartie();
      setEtatPartie(res.data);
      setErreur(null);
    } catch (err) {
      setErreur(err.response?.data?.erreur || "Impossible de démarrer la partie");
    }
  };

  // Révéler cartes
  const handleReveler = async () => {
    try {
      const res = await revelerCartes();
      setEtatPartie(res.data);
      setErreur(null);
    } catch (err) {
      setErreur(err.response?.data?.erreur || "Erreur révéler cartes");
    }
  };

  // Obtenir gagnant
  const handleGagnant = async () => {
    try {
      const res = await obtenirGagnant();
      setGagnant(res.data.gagnant);
      setErreur(null);
    } catch (err) {
      setErreur(err.response?.data?.erreur || "Gagnant non disponible");
    }
  };

  // Réinitialiser partie
  const handleReset = async () => {
    try {
      await reinitialiserPartie();
      setEtatPartie({ joueurs: [] });
      setGagnant(null);
      setErreur(null);
    } catch (err) {
      setErreur("Erreur réinitialisation");
    }
  };

  return (
    <div className="mb-4 space-y-2">
      {erreur && <p className="text-red-500">{erreur}</p>}

      <div className="flex space-x-2">
        <input
          type="text"
          value={nomJoueur}
          onChange={(e) => setNomJoueur(e.target.value)}
          placeholder="Nom joueur"
          className="border px-2 py-1 rounded"
        />
        <button
          onClick={handleAjouter}
          className="bg-blue-500 text-white px-2 py-1 rounded"
        >
          Ajouter joueur
        </button>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={handleDemarrer}
          className="bg-green-500 text-white px-2 py-1 rounded"
        >
          Démarrer partie
        </button>
        <button
          onClick={handleReveler}
          className="bg-yellow-500 text-white px-2 py-1 rounded"
        >
          Révéler cartes
        </button>
        <button
          onClick={handleGagnant}
          className="bg-purple-500 text-white px-2 py-1 rounded"
        >
          Gagnant
        </button>
        <button
          onClick={handleReset}
          className="bg-red-500 text-white px-2 py-1 rounded"
        >
          Réinitialiser
        </button>
      </div>
    </div>
  );
}
