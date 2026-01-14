class StrategieClassementRangCouleur:
    def check(self, joueurs):
        """
        Stratégie simple :
        - Compare la valeur de la carte la plus haute
        """
        ordre = {
            "2": 2, "3": 3, "4": 4, "5": 5, "6": 6,
            "7": 7, "8": 8, "9": 9, "10": 10,
            "J": 11, "Q": 12, "K": 13, "A": 14
        }

        meilleur_joueur = None
        meilleure_valeur = -1

        for joueur in joueurs:
            for carte in joueur.main:
                valeur = ordre.get(carte.valeur, 0)
                if valeur > meilleure_valeur:
                    meilleure_valeur = valeur
                    meilleur_joueur = joueur.nom

        return meilleur_joueur
