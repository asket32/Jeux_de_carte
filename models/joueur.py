# models/joueur.py

from typing import List
from .carte import Carte


class Joueur:
    """
    Joueur du jeu de cartes.
    """

    def __init__(self, nom: str):
        self.nom = nom
        self.main: List[Carte] = []

    def ajouter_carte(self, carte: Carte):
        if not isinstance(carte, Carte):
            raise ValueError("Vous ne pouvez ajouter que des cartes !")
        self.main.append(carte)

    def montrer_main(self) -> list:
        """
        Retourne la main sous forme de dictionnaire pour l'API.
        """
        return [carte.to_dict() for carte in self.main]

    def vider_main(self) -> list:
        """
        Vide la main et retourne les cartes pour remettre dans le paquet.
        """
        cartes = self.main.copy()
        self.main.clear()
        return cartes
