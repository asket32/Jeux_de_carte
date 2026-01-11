import PlayerHand from "./PlayerHand";

export default function GameBoard({ etatPartie }) {
  return (
    <div>
      {etatPartie.joueurs.map((joueur, index) => (
        <PlayerHand key={index} joueur={joueur} />
      ))}
    </div>
  );
}
