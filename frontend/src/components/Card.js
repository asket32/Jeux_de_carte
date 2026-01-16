// src/components/Card.js
export default function Card({ carte }) {
  if (!carte) return null;

  if (!carte.visible) {
    return (
      <div className="w-20 h-28 bg-gray-700 rounded flex items-center justify-center text-white text-2xl">
        🂠
      </div>
    );
  }

  // Génère le chemin vers le SVG depuis public/cards
  const rank = carte.rang.toLowerCase();
  const suit = carte.couleur.toLowerCase(); // ♥ → hearts, ♠ → spades...
  const suitMap = { "♠": "spades", "♥": "hearts", "♦": "diamonds", "♣": "clubs" };
  const imgPath = `/cards/${rank}_of_${suitMap[suit]}.svg`;

  return (
    <div className="w-20 h-28 bg-white rounded border p-1 flex items-center justify-center">
      <img src={imgPath} alt={`${carte.rang}${carte.couleur}`} className="w-full h-full object-contain"/>
    </div>
  );
}
