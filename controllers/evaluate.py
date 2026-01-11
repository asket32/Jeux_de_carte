# controller/evaluate.py

from typing import List
from models.joueur import Joueur
from models.carte import RANGS, COULEURS


class StrategieClassementRangCouleur:
    """
    Détermine le gagnant selon :
    - le rang de la carte
    - la couleur en cas d'égalité
    """

    def check(self, joueurs: List[Joueur]) -> str:
        """
        Retourne le nom du joueur gagnant.
        """
        # On part du premier joueur comme meilleur candidat
        meilleur_joueur = joueurs[0]
        meilleure_carte = meilleur_joueur.main[0]

        for joueur in joueurs[1:]:
            carte_actuelle = joueur.main[0]

            score_meilleur = (
                RANGS.index(meilleure_carte.rang),
                COULEURS.index(meilleure_carte.couleur),
            )
            score_actuel = (
                RANGS.index(carte_actuelle.rang),
                COULEURS.index(carte_actuelle.couleur),
            )

            # Si la carte actuelle est meilleure, on change le gagnant
            if score_actuel > score_meilleur:
                meilleur_joueur = joueur
                meilleure_carte = carte_actuelle

        return meilleur_joueur.nom
