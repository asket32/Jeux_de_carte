import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ajouterJoueur,
  demarrerPartie,
  revelerCartes,
  obtenirGagnant,
  reinitialiserPartie,
} from "../api/gameApi";

export default function Menu({ etatPartie, setEtatPartie, setGagnant }) {
  const [nomJoueur, setNomJoueur] = useState("");
  const [joueursAjoutes, setJoueursAjoutes] = useState([]);
  const [peutJouer, setPeutJouer] = useState(false);
  const [nbCartes, setNbCartes] = useState(1);
  const [messageErreur, setMessageErreur] = useState(null);

  useEffect(() => {
    const joueursEtat = Array.isArray(etatPartie?.joueurs) ? etatPartie.joueurs : [];
    setJoueursAjoutes(
      joueursEtat.map((joueur) => (typeof joueur === "string" ? joueur : joueur.nom))
    );
  }, [etatPartie]);

  useEffect(() => {
    setPeutJouer(joueursAjoutes.length >= 2 && !etatPartie?.partie_commencee);
  }, [joueursAjoutes, etatPartie]);

  const handleAjouter = async () => {
    if (!nomJoueur.trim()) return;

    try {
      const res = await ajouterJoueur(nomJoueur.trim());
      setNomJoueur("");
      setEtatPartie(res.data);
      setMessageErreur(null);
    } catch (err) {
      setMessageErreur(
        err.response?.data?.erreur || "Impossible d'ajouter le joueur"
      );
    }
  };

  const handleDemarrer = async () => {
    try {
      const res = await demarrerPartie(parseInt(nbCartes, 10) || 1);
      setEtatPartie(res.data);
      setGagnant(null);
      setMessageErreur(null);
    } catch (err) {
      setMessageErreur(
        err.response?.data?.erreur || "Impossible de demarrer la partie"
      );
    }
  };

  const handleReveler = async () => {
    try {
      const res = await revelerCartes();
      setEtatPartie(res.data);
      setMessageErreur(null);
    } catch (err) {
      setMessageErreur(
        err.response?.data?.erreur || "Impossible de reveler les cartes"
      );
    }
  };

  const handleGagnant = async () => {
    try {
      const res = await obtenirGagnant();
      setGagnant(res.data.gagnant);
      setMessageErreur(null);
    } catch (err) {
      setMessageErreur(
        err.response?.data?.erreur || "Impossible d'obtenir le gagnant"
      );
    }
  };

  const handleReset = async () => {
    try {
      await reinitialiserPartie();
      setEtatPartie({ joueurs: [], partie_commencee: false, partie_terminee: false });
      setGagnant(null);
      setJoueursAjoutes([]);
      setNomJoueur("");
      setMessageErreur(null);
    } catch (err) {
      setMessageErreur(
        err.response?.data?.erreur || "Erreur lors de la reinitialisation"
      );
    }
  };

  const handleNouvelleManche = async () => {
    try {
      const res = await demarrerPartie(parseInt(nbCartes, 10) || 1);
      setEtatPartie(res.data);
      setGagnant(null);
      setMessageErreur(null);
    } catch (err) {
      setMessageErreur(
        err.response?.data?.erreur || "Impossible de lancer une nouvelle manche"
      );
    }
  };

  return (
    <section className="rounded-3xl bg-white p-5 shadow-sm">
      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-4">
          <div className="grid gap-3 md:grid-cols-[1.3fr_120px_auto]">
            <input
              type="text"
              value={nomJoueur}
              onChange={(e) => setNomJoueur(e.target.value)}
              placeholder="Nom du joueur"
              className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-sky-400"
            />

            <input
              type="number"
              min="1"
              max="5"
              value={nbCartes}
              onChange={(e) => setNbCartes(e.target.value)}
              className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-sky-400"
            />

            <button
              onClick={handleAjouter}
              className="rounded-2xl bg-sky-600 px-4 py-3 font-semibold text-white transition hover:bg-sky-700"
            >
              Ajouter
            </button>
          </div>

          <AnimatePresence>
            {messageErreur && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
              >
                {messageErreur}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            <button
              onClick={handleDemarrer}
              disabled={!peutJouer}
              className={`rounded-2xl px-4 py-3 font-semibold transition ${
                peutJouer
                  ? "bg-emerald-600 text-white hover:bg-emerald-700"
                  : "cursor-not-allowed bg-slate-200 text-slate-500"
              }`}
            >
              Demarrer
            </button>
            <button
              onClick={handleReveler}
              className="rounded-2xl bg-amber-500 px-4 py-3 font-semibold text-white transition hover:bg-amber-600"
            >
              Reveler
            </button>
            <button
              onClick={handleGagnant}
              className="rounded-2xl bg-violet-600 px-4 py-3 font-semibold text-white transition hover:bg-violet-700"
            >
              Gagnant
            </button>
            <button
              onClick={handleNouvelleManche}
              className="rounded-2xl bg-cyan-600 px-4 py-3 font-semibold text-white transition hover:bg-cyan-700"
            >
              Nouvelle manche
            </button>
            <button
              onClick={handleReset}
              className="rounded-2xl bg-rose-600 px-4 py-3 font-semibold text-white transition hover:bg-rose-700"
            >
              Reinitialiser
            </button>
          </div>
        </div>

        <aside className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
          <h2 className="text-lg font-semibold text-slate-900">Joueurs</h2>
          <p className="mt-1 text-sm text-slate-600">
            {joueursAjoutes.length} joueur{joueursAjoutes.length > 1 ? "s" : ""} ajoute
            {joueursAjoutes.length > 1 ? "s" : ""}
          </p>

          <div className="mt-4 space-y-2">
            {joueursAjoutes.length > 0 ? (
              joueursAjoutes.map((joueur, idx) => (
                <div
                  key={`${joueur}-${idx}`}
                  className="flex items-center justify-between rounded-2xl bg-white px-4 py-3"
                >
                  <span className="font-medium text-slate-800">{joueur}</span>
                  <span className="text-sm text-slate-500">#{idx + 1}</span>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 px-4 py-8 text-center text-sm text-slate-500">
                Ajoute des joueurs pour commencer.
              </div>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}
