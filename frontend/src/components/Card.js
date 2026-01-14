export default function Card({ carte }) {
  const isRed = carte.couleur === "♥" || carte.couleur === "♦";

  return (
    <div
      className={`w-20 h-28 rounded border flex flex-col justify-between p-2 text-center
        transition-transform duration-500 transform ${
          carte.visible ? "rotate-y-0 bg-white" : "bg-gray-700 rotate-y-180 text-white"
        } ${isRed && carte.visible ? "text-red-600" : "text-black"}`}
    >
      {carte.visible ? (
        <>
          <span className="text-lg font-bold">{carte.rang}</span>
          <span className="text-3xl">{carte.couleur}</span>
        </>
      ) : (
        <span className="text-2xl">🂠</span>
      )}
    </div>
  );
}
