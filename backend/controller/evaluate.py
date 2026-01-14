class StrategieClassementRangCouleur:
    def check(self, joueurs):
        """
        Stratégie simple :
        - Compare la valeur de la carte la plus haute
        """
        meilleur_joueur = None
        meilleure_valeur = -1

        for joueur in joueurs:
            for carte in joueur.main:
                valeur = carte.valeur  # utilise la propriété valeur de Carte
                if valeur > meilleure_valeur:
                    meilleure_valeur = valeur
                    meilleur_joueur = joueur.nom

        return meilleur_joueur
