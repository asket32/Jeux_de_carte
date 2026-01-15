import Card from "./Card";

export default function PlayerHand({ carte }) {
  if (!carte) return null;

  return <Card carte={carte} />;
}
