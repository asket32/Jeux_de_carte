import { useState, useEffect } from "react";
import {
  ajouterJoueur,
  demarrerPartie,
  revelerCartes,
  obtenirGagnant,
  reinitialiserPartie,
  piocherCartes
} from "../api/gameApi";

export default function Menu({ setEtatPartie, setGagnant }) {
  const [nomJoueur, setNomJoueur] = useState("");
  const [joueursAjoutes, setJoueursAjoutes] = useState([]); // liste des joueurs ajoutés
  const [peutJouer, setPeutJouer] = useState(false); // activer bouton démarrer
  const [nbCartes, setNbCartes] = useState(1);
  


  // Met à jour si on peut démarrer (au moins 2 joueurs)
  useEffect(() => {
    setPeutJouer(joueursAjoutes.length >= 2);
  }, [joueursAjoutes]);

  const handleAjouter = async () => {
    if (!nomJoueur) return;

    try {
      const res = await ajouterJoueur(nomJoueur);

      // Met à jour la liste des joueurs affichée côté front
      setJoueursAjoutes(res.data.joueurs);
      setNomJoueur(""); // reset input

      // On met aussi à jour l'état de la partie si besoin
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
      console.error(err.response?.data);
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
    console.error(err.response?.data);
  }
};


  return (
    <div className="mb-4 space-y-4">
      {/* --- Ajout joueurs --- */}
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
        <input
          type="number"
          min="1"
          max="5"
          value={nbCartes}
          onChange={(e) => setNbCartes(e.target.value)}
          className="border px-2 py-1 rounded w-24"
          placeholder="Cartes"
        />

     <button
        onClick={handlePiocher}
        disabled={!setEtatPartie?.partie_commencee}
        className="bg-indigo-500 text-white px-2 py-1 rounded disabled:opacity-50"
      >
        Piocher
    </button>



      </div>

      {/* Liste des joueurs ajoutés */}
      <div>
        <strong>Joueurs ajoutés :</strong>
        <ul className="list-disc ml-5">
          {joueursAjoutes.map((joueur, idx) => (
            <li key={idx}>{joueur}</li>
          ))}
        </ul>
      </div>

      {/* --- Actions partie --- */}
      <div className="flex space-x-2">
        <button
          onClick={handleDemarrer}
          disabled={!peutJouer} // actif seulement si >= 2 joueurs
          className={`px-2 py-1 rounded text-white ${
            peutJouer ? "bg-green-500" : "bg-gray-400 cursor-not-allowed"
          }`}
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
