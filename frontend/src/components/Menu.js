import { useState, useEffect } from "react";
import {
  ajouterJoueur,
  demarrerPartie,
  revelerCartes,
  obtenirGagnant,
  reinitialiserPartie,
  piocherCartes
} from "../api/gameApi";

export default function Menu({ setEtatPartie, setGagnant, etatPartie }) {
  const [nomJoueur, setNomJoueur] = useState("");
  const [joueursAjoutes, setJoueursAjoutes] = useState([]);
  const [peutJouer, setPeutJouer] = useState(false);
  const [nbCartes, setNbCartes] = useState(1);

  // Vérifie si on peut démarrer (>= 2 joueurs)
  useEffect(() => {
    setPeutJouer(joueursAjoutes.length >= 2);
  }, [joueursAjoutes]);

  const handleAjouter = async () => {
    if (!nomJoueur) return;

    try {
      const res = await ajouterJoueur(nomJoueur);
      setJoueursAjoutes(res.data.joueurs);
      setNomJoueur("");
      setEtatPartie(res.data);
    } catch (err) {
      console.error("Erreur ajout joueur:", err.response?.data || err.message);
      alert(err.response?.data?.erreur || "Erreur ajout joueur");
    }
  };

  const handleDemarrer = async () => {
    try {
      const res = await demarrerPartie(nbCartes);
      setEtatPartie(res.data);
    } catch (err) {
      console.error("Erreur démarrer partie:", err.response?.data || err.message);
    }
  };

  const handleReveler = async () => {
    try {
      const res = await revelerCartes();
      setEtatPartie(res.data);
    } catch (err) {
      console.error("Erreur révéler cartes:", err.response?.data || err.message);
    }
  };

  const handleGagnant = async () => {
    try {
      const res = await obtenirGagnant();
      setGagnant(res.data.gagnant);
    } catch (err) {
      console.error("Erreur obtenir gagnant:", err.response?.data || err.message);
      alert(err.response?.data?.erreur || "Impossible d'obtenir le gagnant");
    }
  };

  const handleReset = async () => {
    try {
      await reinitialiserPartie();
      setEtatPartie({ joueurs: [] });
      setGagnant(null);
      setJoueursAjoutes([]);
      setNomJoueur("");
    } catch (err) {
      console.error("Erreur reset partie:", err.response?.data || err.message);
    }
  };

  const handlePiocher = async () => {
    try {
      const res = await piocherCartes();
      setEtatPartie(res.data);
    } catch (err) {
      console.error("Erreur piocher cartes:", err.response?.data || err.message);
    }
  };

  return (
    <div className="mb-6 space-y-4 flex flex-col items-center">
      {/* --- Ajouter joueur --- */}
      <div className="flex space-x-2 flex-wrap justify-center">
        <input
          type="text"
          value={nomJoueur}
          onChange={(e) => setNomJoueur(e.target.value)}
          placeholder="Nom joueur"
          className="border text-black px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleAjouter}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded transition"
        >
          Ajouter joueur
        </button>

        <input
          type="number"
          min="1"
          max="5"
          value={nbCartes}
          onChange={(e) => setNbCartes(e.target.value)}
          className="border text-black px-2 py-1 rounded w-20 text-center"
        />

        <button
          onClick={handlePiocher}
          disabled={!etatPartie?.partie_commencee}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded disabled:opacity-50 transition"
        >
          Piocher
        </button>
      </div>

      {/* --- Liste joueurs ajoutés --- */}
      <div>
        <strong>Joueurs ajoutés :</strong>
        <ul className="list-disc ml-5">
          {joueursAjoutes.map((joueur, idx) => (
            <li key={idx}>{joueur}</li>
          ))}
        </ul>
      </div>

      {/* --- Actions partie --- */}
      <div className="flex space-x-2 flex-wrap justify-center">
        <button
          onClick={handleDemarrer}
          disabled={!peutJouer}
          className={`px-3 py-1 rounded text-white transition ${
            peutJouer ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Démarrer partie
        </button>

        <button
          onClick={handleReveler}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded transition"
        >
          Révéler cartes
        </button>

        <button
          onClick={handleGagnant}
          className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded transition"
        >
          Gagnant
        </button>

        <button
          onClick={handleReset}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
        >
          Réinitialiser
        </button>
      </div>
    </div>
  );
}
