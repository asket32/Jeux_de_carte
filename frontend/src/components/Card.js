import React from "react";

export default function Card({ carte }) {
  if (!carte) return null;

  if (!carte.visible) {
    return (
      <div className="h-32 w-24 overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm">
        <img
          src="/cart.png"
          alt="Carte cachee"
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  const rankMap = {
    J: "jack",
    Q: "queen",
    K: "king",
    A: "ace",
  };
  const suitMap = {
    "♠": "spades",
    "♥": "hearts",
    "♦": "diamonds",
    "♣": "clubs",
  };

  const rank = rankMap[carte.rang] || carte.rang.toLowerCase();
  const suit = suitMap[carte.couleur];
  const imgPath = `/cards/${rank}_of_${suit}.svg`;

  return (
    <div className="h-32 w-24 overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm">
      <img
        src={imgPath}
        alt={`${carte.rang} de ${carte.couleur}`}
        className="h-full w-full object-contain p-1"
      />
    </div>
  );
}
