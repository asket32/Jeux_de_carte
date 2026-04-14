import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ajouterJoueur,
  demarrerPartie,
  revelerCartes,
  obtenirGagnant,
  reinitialiserPartie,
} from "../api/gameApi";

const actionButtons = [
  {
    key: "demarrer",
    label: "Demarrer partie",
    tone:
      "bg-emerald-500/90 hover:bg-emerald-400 shadow-[0_18px_40px_rgba(16,185,129,0.24)]",
  },
  {
    key: "reveler",
    label: "Reveler cartes",
    tone:
      "bg-amber-400/90 hover:bg-amber-300 text-slate-950 shadow-[0_18px_40px_rgba(251,191,36,0.24)]",
  },
  {
    key: "gagnant",
    label: "Voir gagnant",
    tone:
      "bg-fuchsia-500/90 hover:bg-fuchsia-400 shadow-[0_18px_40px_rgba(217,70,239,0.24)]",
  },
  {
    key: "manche",
    label: "Nouvelle manche",
    tone:
      "bg-sky-500/90 hover:bg-sky-400 shadow-[0_18px_40px_rgba(14,165,233,0.24)]",
  },
  {
    key: "reset",
    label: "Reinitialiser",
    tone:
      "bg-rose-500/90 hover:bg-rose-400 shadow-[0_18px_40px_rgba(244,63,94,0.24)]",
  },
];

export default function Menu({ etatPartie, setEtatPartie, setGagnant }) {
  const [nomJoueur, setNomJoueur] = useState("");
  const [joueursAjoutes, setJoueursAjoutes] = useState([]);
  const [peutJouer, setPeutJouer] = useState(false);
  const [nbCartes, setNbCartes] = useState(1);
  const [messageErreur, setMessageErreur] = useState(null);

  useEffect(() => {
    const joueursEtat = Array.isArray(etatPartie?.joueurs) ? etatPartie.joueurs : [];

    if (joueursEtat.length > 0) {
      setJoueursAjoutes(
        joueursEtat.map((joueur) =>
          typeof joueur === "string" ? joueur : joueur.nom
        )
      );
    }
  }, [etatPartie]);

  useEffect(() => {
    setPeutJouer(joueursAjoutes.length >= 2 && !etatPartie?.partie_commencee);
  }, [joueursAjoutes, etatPartie]);

  const resumePartie = useMemo(
    () => [
      {
        label: "Joueurs",
        value: joueursAjoutes.length,
        accent: "from-sky-400/30 to-cyan-300/10",
      },
      {
        label: "Cartes par joueur",
        value: nbCartes,
        accent: "from-emerald-400/30 to-lime-300/10",
      },
      {
        label: "Statut",
        value: etatPartie?.partie_commencee ? "En cours" : "Preparation",
        accent: "from-amber-400/30 to-orange-300/10",
      },
    ],
    [etatPartie?.partie_commencee, joueursAjoutes.length, nbCartes]
  );

  const handleAjouter = async () => {
    if (!nomJoueur.trim()) return;

    try {
      const res = await ajouterJoueur(nomJoueur.trim());
      setJoueursAjoutes(res.data.joueurs || []);
      setNomJoueur("");
      setEtatPartie(res.data);
      setMessageErreur(null);
    } catch (err) {
      console.error(err.response?.data || err.message);
      setMessageErreur(
        err.response?.data?.erreur || "Impossible d'ajouter le joueur"
      );
    }
  };

  const handleDemarrer = async () => {
    try {
      const res = await demarrerPartie(parseInt(nbCartes, 10) || 1);
      setEtatPartie(res.data);
      setMessageErreur(null);
    } catch (err) {
      console.error(err.response?.data || err.message);
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
    } catch {
      setMessageErreur("Impossible de reveler les cartes");
    }
  };

  const handleGagnant = async () => {
    try {
      const res = await obtenirGagnant();
      setGagnant(res.data.gagnant);
      setMessageErreur(null);
    } catch {
      setMessageErreur("Impossible d'obtenir le gagnant");
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
    } catch {
      setMessageErreur("Erreur lors de la reinitialisation de la partie");
    }
  };

  const handleNouvelleManche = async () => {
    try {
      const res = await demarrerPartie(parseInt(nbCartes, 10) || 1);
      setEtatPartie(res.data);
      setGagnant(null);
      setMessageErreur(null);
    } catch {
      setMessageErreur("Impossible de demarrer une nouvelle manche");
    }
  };

  const runAction = (actionKey) => {
    if (actionKey === "demarrer") return handleDemarrer();
    if (actionKey === "reveler") return handleReveler();
    if (actionKey === "gagnant") return handleGagnant();
    if (actionKey === "manche") return handleNouvelleManche();
    return handleReset();
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="relative w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/75 p-5 text-white shadow-[0_30px_80px_rgba(15,23,42,0.45)] backdrop-blur xl:p-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.22),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(251,191,36,0.18),_transparent_28%)]" />

      <div className="relative grid gap-5 lg:grid-cols-[1.35fr_0.95fr]">
        <div className="space-y-5">
          <div className="space-y-3">
            <span className="inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-100">
              Table de jeu
            </span>
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                  Lance ta partie avec plus de rythme
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-slate-300 sm:text-base">
                  Ajoute les joueurs, choisis le nombre de cartes, puis enchaine
                  les manches avec un panneau de controle plus vivant.
                </p>
              </div>

              <div className="grid min-w-[210px] grid-cols-3 gap-3">
                {resumePartie.map((item) => (
                  <div
                    key={item.label}
                    className={`rounded-2xl border border-white/10 bg-gradient-to-br ${item.accent} px-3 py-4 text-center shadow-inner shadow-white/5`}
                  >
                    <p className="text-[11px] uppercase tracking-[0.2em] text-slate-300">
                      {item.label}
                    </p>
                    <p className="mt-2 text-xl font-black text-white">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/5 p-4 shadow-inner shadow-black/10">
            <div className="grid gap-3 md:grid-cols-[1.3fr_auto_auto]">
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-slate-200">
                  Nom du joueur
                </span>
                <input
                  type="text"
                  value={nomJoueur}
                  onChange={(e) => setNomJoueur(e.target.value)}
                  placeholder="Ex: Alice"
                  className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none transition focus:border-cyan-300/50 focus:ring-2 focus:ring-cyan-300/20"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-slate-200">
                  Cartes
                </span>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={nbCartes}
                  onChange={(e) => setNbCartes(e.target.value)}
                  className="min-w-24 rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none transition focus:border-cyan-300/50 focus:ring-2 focus:ring-cyan-300/20"
                />
              </label>

              <button
                onClick={handleAjouter}
                className="self-end rounded-2xl bg-cyan-400 px-5 py-3 font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-300"
              >
                Ajouter joueur
              </button>
            </div>

            <AnimatePresence mode="wait">
              {messageErreur && (
                <motion.div
                  key={messageErreur}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="mt-4 rounded-2xl border border-rose-300/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-100"
                >
                  {messageErreur}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {actionButtons.map((button) => (
              <motion.button
                whileHover={{ y: -3, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                key={button.key}
                onClick={() => runAction(button.key)}
                disabled={button.key === "demarrer" && !peutJouer}
                className={`rounded-2xl px-4 py-3 text-sm font-bold text-white transition ${
                  button.key === "demarrer" && !peutJouer
                    ? "cursor-not-allowed bg-slate-700/80 text-slate-400 shadow-none"
                    : button.tone
                }`}
              >
                {button.label}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-slate-900/70 p-5 shadow-inner shadow-cyan-950/20">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                Joueurs ajoutes
              </p>
              <h3 className="text-xl font-black text-white">
                Composition de la table
              </h3>
            </div>
            <div className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-sm font-semibold text-emerald-100">
              {joueursAjoutes.length >= 2 ? "Pret" : "En attente"}
            </div>
          </div>

          <div className="space-y-3">
            <AnimatePresence>
              {joueursAjoutes.length > 0 ? (
                joueursAjoutes.map((joueur, idx) => (
                  <motion.div
                    key={`${joueur}-${idx}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: idx * 0.04 }}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-300 to-sky-500 font-black text-slate-950">
                        {joueur.slice(0, 1).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-white">{joueur}</p>
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                          Joueur {idx + 1}
                        </p>
                      </div>
                    </div>
                    <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(52,211,153,0.9)]" />
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-2xl border border-dashed border-white/10 bg-white/5 px-4 py-10 text-center text-sm text-slate-400"
                >
                  Ajoute au moins deux joueurs pour lancer la partie.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
