import PlayerHand from "./PlayerHand";

export default function GameBoard({ etatPartie }) {
  if (!etatPartie || !etatPartie.joueurs) return null;

  return (
    <div>
      {etatPartie.joueurs.map((joueur, index) => (
        <PlayerHand key={index} joueur={joueur} />
      ))}
    </div>
  );
}
