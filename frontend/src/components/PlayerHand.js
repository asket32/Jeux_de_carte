import Card from "./Card";

export default function PlayerHand({ joueur }) {
  return (
    <div className="mb-4">
      <h3 className="font-bold mb-2">{joueur.nom}</h3>
      <div className="flex space-x-2">
        {joueur.main.map((carte, index) => (
          <Card key={index} carte={carte} />
        ))}
      </div>
    </div>
  );
}
