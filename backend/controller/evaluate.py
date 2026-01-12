from typing import List
from models.carte import RANGS, COULEURS
from models.joueur import Joueur

class StrategieClassementRangCouleur:
    """Détermine le gagnant selon rang et couleur"""

    def check(self, joueurs: List[Joueur]) -> str:
        meilleur_joueur = joueurs[0]
        meilleure_carte = meilleur_joueur.main[0]

        for joueur in joueurs[1:]:
            carte_actuelle = joueur.main[0]
            score_meilleur = (RANGS.index(meilleure_carte.rang), COULEURS.index(meilleure_carte.couleur))
            score_actuel = (RANGS.index(carte_actuelle.rang), COULEURS.index(carte_actuelle.couleur))
            if score_actuel > score_meilleur:
                meilleur_joueur = joueur
                meilleure_carte = carte_actuelle
        return meilleur_joueur.nom
