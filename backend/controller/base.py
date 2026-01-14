from typing import List, Optional
from models.paquet import Paquet
from models.joueur import Joueur


class ControleurJeu:
    NOMBRE_MAX_JOUEURS = 5
    NOMBRE_MIN_JOUEURS = 2

    def __init__(self, paquet: Paquet, strategie_verification):
        self.paquet = paquet
        self.strategie_verification = strategie_verification
        self.joueurs: List[Joueur] = []
        self.partie_commencee = False
        self.partie_terminee = False

    # ---------------- JOUEURS ----------------

    def ajouter_joueur(self, nom: str) -> bool:
        if self.partie_commencee:
            return False

        if len(self.joueurs) >= self.NOMBRE_MAX_JOUEURS:
            return False

        if any(j.nom == nom for j in self.joueurs):
            return False

        self.joueurs.append(Joueur(nom))
        return True

    def lister_joueurs(self) -> List[str]:
        return [j.nom for j in self.joueurs]

    # ---------------- PARTIE ----------------

    def peut_demarrer(self) -> bool:
        return len(self.joueurs) >= self.NOMBRE_MIN_JOUEURS

    def demarrer_partie(self, nb_cartes: int = 2) -> bool:
        if not self.peut_demarrer():
            return False

        self.reinitialiser_cartes()
        self.partie_commencee = True
        self.partie_terminee = False

        for _ in range(nb_cartes):
            for joueur in self.joueurs:
                carte = self.paquet.piocher()
                if carte:
                    joueur.ajouter_carte(carte)

        return True

    def reveler_cartes(self) -> bool:
        if not self.partie_commencee or self.partie_terminee:
            return False

        self.partie_terminee = True

        for joueur in self.joueurs:
            for carte in joueur.main:
                carte.visible = True

        return True

    def obtenir_gagnant(self) -> Optional[str]:
        if not self.partie_terminee:
            return None

        return self.strategie_verification.check(self.joueurs)

    # ---------------- RESET ----------------

    def reinitialiser_cartes(self):
        for joueur in self.joueurs:
            cartes = joueur.vider_main()
            for carte in cartes:
                carte.visible = False

        self.paquet.reset()
        self.partie_commencee = False
        self.partie_terminee = False

    def reinitialiser_partie(self):
        self.reinitialiser_cartes()
        self.joueurs = []

    # ---------------- ÉTAT ----------------

    def etat_partie(self) -> dict:
        return {
            "partie_commencee": self.partie_commencee,
            "partie_terminee": self.partie_terminee,
            "joueurs": [
                {
                    "nom": j.nom,
                    "main": j.montrer_main()
                }
                for j in self.joueurs
            ]
        }
