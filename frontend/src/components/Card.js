// Card.js
export default function Card({ carte }) {
  if (!carte) return null;

  // Carte face cachée
  if (!carte.visible) {
    return (
      <div className="w-20 h-28 bg-gray-700 rounded flex items-center justify-center text-white text-2xl">
        🂠
      </div>
    );
  }

  // Mapping des rangs spéciaux
  const rankMap = {
    "J": "jack",
    "Q": "queen",
    "K": "king",
    "A": "ace"
  };
  const rank = rankMap[carte.rang] || carte.rang.toLowerCase();

  // Mapping des couleurs
  const suitMap = {
    "♠": "spades",
    "♥": "hearts",
    "♦": "diamonds",
    "♣": "clubs"
  };
  const suit = suitMap[carte.couleur];

  // Chemin vers le SVG
  const imgPath = `/cards/${rank}_of_${suit}.svg`;

  // Détecter si la carte est rouge pour le style
  const isRed = carte.couleur === "♥" || carte.couleur === "♦";

  return (
    <div className={`w-20 h-28 bg-white rounded border p-2 flex flex-col justify-between ${isRed ? "text-red-600" : "text-black"}`}>
      <img src={imgPath} alt={`${carte.rang} of ${carte.couleur}`} className="w-full h-full object-contain" />
    </div>
  );
}
