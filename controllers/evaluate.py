from typing import List
from models.card import RANKS, SUITS
from models.player import Player


class StrategieClassementRangCouleur:
    """
    Détermine le gagnant selon :
    - le rang de la carte
    - la couleur en cas d'égalité
    """

    def check(self, joueurs: List[Player]) -> str:
        """
        Retourne le nom du joueur gagnant.
        """
        meilleur_joueur = joueurs[0]
        meilleure_carte = meilleur_joueur.hand[0]

        for joueur in joueurs[1:]:
            carte_actuelle = joueur.hand[0]

            score_meilleur = (
                RANKS.index(meilleure_carte.rank),
                SUITS.index(meilleure_carte.suit),
            )
            score_actuel = (
                RANKS.index(carte_actuelle.rank),
                SUITS.index(carte_actuelle.suit),
            )

            if score_actuel > score_meilleur:
                meilleur_joueur = joueur
                meilleure_carte = carte_actuelle

        return meilleur_joueur.name
