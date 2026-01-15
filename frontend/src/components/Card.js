export default function Card({ carte }) {
  if (!carte) return null;

  if (!carte.visible) {
    return (
      <div className="w-20 h-28 bg-gray-700 rounded flex items-center justify-center text-white text-2xl">
        🂠
      </div>
    );
  }

  const isRed = carte.couleur === "♥" || carte.couleur === "♦";

  return (
    <div
      className={`w-20 h-28 bg-white rounded border p-2 flex flex-col justify-between ${
        isRed ? "text-red-600" : "text-black"
      }`}
    >
      <span className="font-bold">{carte.rang}</span>
      <span className="text-3xl text-center">{carte.couleur}</span>
    </div>
  );
}
