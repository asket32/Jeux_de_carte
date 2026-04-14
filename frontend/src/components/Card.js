import React from "react";

export default function Card({ carte }) {
  if (!carte) return null;

  if (!carte.visible) {
    return (
      <div className="group relative flex h-32 w-24 items-center justify-center overflow-hidden rounded-[22px] border border-sky-200/20 bg-[linear-gradient(160deg,#1e293b,#0f172a)] text-3xl text-white shadow-[0_18px_40px_rgba(15,23,42,0.45)]">
        <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(135deg,rgba(56,189,248,0.15)_25%,transparent_25%,transparent_50%,rgba(56,189,248,0.15)_50%,rgba(56,189,248,0.15)_75%,transparent_75%,transparent)] [background-size:18px_18px]" />
        <span className="relative transition duration-300 group-hover:scale-110">
          🂠
        </span>
      </div>
    );
  }

  const rankMap = {
    J: "jack",
    Q: "queen",
    K: "king",
    A: "ace",
  };
  const rank = rankMap[carte.rang] || carte.rang.toLowerCase();

  const suitMap = {
    "♠": "spades",
    "♥": "hearts",
    "♦": "diamonds",
    "♣": "clubs",
  };
  const suit = suitMap[carte.couleur];
  const imgPath = `/cards/${rank}_of_${suit}.svg`;
  const isRed = carte.couleur === "♥" || carte.couleur === "♦";

  return (
    <div className="group relative h-32 w-24 overflow-hidden rounded-[22px] border border-white/70 bg-white p-2 shadow-[0_18px_40px_rgba(15,23,42,0.25)] transition duration-300 hover:-translate-y-1 hover:rotate-[-2deg]">
      <div className="absolute inset-x-2 top-2 flex items-start justify-between text-xs font-black">
        <span className={isRed ? "text-rose-600" : "text-slate-900"}>
          {carte.rang}
        </span>
        <span className={isRed ? "text-rose-600" : "text-slate-900"}>
          {carte.couleur}
        </span>
      </div>
      <img
        src={imgPath}
        alt={`${carte.rang} de ${carte.couleur}`}
        className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
      />
    </div>
  );
}
