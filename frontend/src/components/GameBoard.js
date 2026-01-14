import PlayerHand from "./PlayerHand";

export default function GameBoard({ etatPartie }) {
  if (!etatPartie || !etatPartie.joueurs) return null;

  return (
    <div className="flex flex-col items-center space-y-6 animate-fadeIn">
      {etatPartie.joueurs.map((joueur, index) => (
        <PlayerHand key={index} joueur={joueur} />
      ))}
    </div>
  );
}
