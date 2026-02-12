import { useState, useEffect } from "react";
import {
  ajouterJoueur,
  demarrerPartie,
  revelerCartes,
  obtenirGagnant,
  reinitialiserPartie,
  // piocherCartes
} from "../api/gameApi";

export default function Menu({ etatPartie, setEtatPartie, setGagnant }) {
  const [nomJoueur, setNomJoueur] = useState("");
  const [joueursAjoutes, setJoueursAjoutes] = useState([]);
  const [peutJouer, setPeutJouer] = useState(false);
  const [nbCartes, setNbCartes] = useState(1);

  useEffect(() => {
    setPeutJouer(joueursAjoutes.length >= 2 && !etatPartie?.partie_commencee);
  }, [joueursAjoutes, etatPartie]);

  const handleAjouter = async () => {
    if (!nomJoueur.trim()) return;

    try {
      const res = await ajouterJoueur(nomJoueur.trim());
      setJoueursAjoutes(res.data.joueurs || []);
      setNomJoueur("");
      setEtatPartie(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.erreur || "Impossible d'ajouter le joueur");
    }
  };

  const handleDemarrer = async () => {
    try {
      const res = await demarrerPartie(parseInt(nbCartes, 10) || 1);
      setEtatPartie(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.erreur || "Impossible de démarrer la partie");
    }
  };

  // const handlePiocher = async () => {
  //   try {
  //     const res = await piocherCartes();
  //     setEtatPartie(res.data);
  //   } catch {
  //     alert("Impossible de piocher");
  //   }
  // };

  const handleReveler = async () => {
    try {
      const res = await revelerCartes();
      setEtatPartie(res.data);
    } catch {
      alert("Impossible de révéler les cartes");
    }
  };

  const handleGagnant = async () => {
    try {
      const res = await obtenirGagnant();
      setGagnant(res.data.gagnant);
    } catch {
      alert("Impossible d'obtenir le gagnant");
    }
  };

  const handleReset = async () => {
    try {
      await reinitialiserPartie();
      setEtatPartie({ joueurs: [] });
      setGagnant(null);
      setJoueursAjoutes([]);
      setNomJoueur("");
    } catch {
      alert("Erreur lors de la réinitialisation de la partie");
    }
  };

  const handleNouvelleManche = async () => {
    try {
      const res = await demarrerPartie(parseInt(nbCartes, 10) || 1);
      setEtatPartie(res.data);
      setGagnant(null);
    } catch {
      alert("Impossible de démarrer une nouvelle manche");
    }
  };

  return (
    <div className="mb-6 space-y-4 p-4 w-full max-w-xl bg-white rounded shadow-lg mx-auto">
      <div className="flex flex-wrap gap-2 items-center">
        <input
          type="text"
          value={nomJoueur}
          onChange={(e) => setNomJoueur(e.target.value)}
          placeholder="Nom joueur"
          className="border text-black px-2 py-1 rounded flex-1 min-w-[120px]"
        />
        <button
          onClick={handleAjouter}
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition"
        >
          Ajouter joueur
        </button>

        <input
          type="number"
          min="1"
          max="5"
          value={nbCartes}
          onChange={(e) => setNbCartes(e.target.value)}
          className="border text-black px-2 py-1 rounded w-20"
        />

        {/* <button
          onClick={handlePiocher}
          disabled={!etatPartie?.partie_commencee || etatPartie?.partie_terminee}
          className="bg-indigo-500 text-white px-4 py-1 rounded disabled:opacity-50"
        >
          Piocher cartes
        </button> */}
      </div>

      <div>
        <strong>Joueurs ajoutés :</strong>
        <ul className="list-disc ml-5 mt-1">
          {joueursAjoutes.map((j, idx) => (
            <li key={idx}>{j}</li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap gap-2 mt-2">
        <button
          onClick={handleDemarrer}
          disabled={!peutJouer}
          className={`px-3 py-1 rounded text-white ${
            peutJouer ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"
          } transition`}
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
          onClick={handleNouvelleManche}
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-3 py-1 rounded transition"
        >
          Nouvelle manche
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
