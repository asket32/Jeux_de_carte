from typing import List, Optional
from models.deck import Deck
from models.player import Player


class ControleurJeu:
    """
    Contrôleur principal du jeu de cartes.
    Piloté exclusivement par une API (pas de terminal).
    """

    NOMBRE_MAX_JOUEURS = 5
    NOMBRE_MIN_JOUEURS = 2

    def __init__(self, deck: Deck, strategie_verification):
        """
        Initialise une nouvelle partie.
        """
        self.deck = deck
        self.strategie_verification = strategie_verification
        self.joueurs: List[Player] = []
        self.partie_commencee = False
        self.partie_terminee = False

    # ---------- GESTION DES JOUEURS ----------

    def ajouter_joueur(self, nom: str) -> bool:
        """
        Ajoute un joueur à la partie.
        """
        if self.partie_commencee or len(self.joueurs) >= self.NOMBRE_MAX_JOUEURS:
            return False

        self.joueurs.append(Player(nom))
        return True

    def lister_joueurs(self) -> List[str]:
        """
        Retourne la liste des noms des joueurs.
        """
        return [joueur.name for joueur in self.joueurs]

    # ---------- GESTION DE LA PARTIE ----------

    def peut_demarrer(self) -> bool:
        """
        Vérifie si la partie peut démarrer.
        """
        return len(self.joueurs) >= self.NOMBRE_MIN_JOUEURS

    def demarrer_partie(self) -> bool:
        """
        Démarre la partie et distribue les cartes.
        """
        if not self.peut_demarrer():
            return False

        self.deck.shuffle()
        self.partie_commencee = True
        self.partie_terminee = False

        for joueur in self.joueurs:
            carte = self.deck.draw_card()
            if carte:
                joueur.hand.append(carte)

        return True

    def reveler_cartes(self) -> bool:
        """
        Rend toutes les cartes visibles.
        """
        if not self.partie_commencee or self.partie_terminee:
            return False

        for joueur in self.joueurs:
            for carte in joueur.hand:
                carte.is_face_up = True

        return True

    def obtenir_gagnant(self) -> Optional[str]:
        """
        Détermine le gagnant de la partie.
        """
        if not self.partie_commencee:
            return None

        self.partie_terminee = True
        return self.strategie_verification.check(self.joueurs)

    def reinitialiser_partie(self):
        """
        Réinitialise complètement la partie.
        """
        for joueur in self.joueurs:
            while joueur.hand:
                carte = joueur.hand.pop()
                carte.is_face_up = False
                self.deck.append(carte)

        self.deck.shuffle()
        self.partie_commencee = False
        self.partie_terminee = False

    def etat_partie(self) -> dict:
        """
        Retourne l'état actuel de la partie (format API).
        """
        return {
            "partie_commencee": self.partie_commencee,
            "partie_terminee": self.partie_terminee,
            "joueurs": [
                {
                    "nom": joueur.name,
                    "main": [
                        {
                            "carte": str(carte),
                            "visible": carte.is_face_up
                        }
                        for carte in joueur.hand
                    ]
                }
                for joueur in self.joueurs
            ]
        }
