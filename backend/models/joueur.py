from typing import List
from .carte import Carte

class Joueur:
    def __init__(self, nom: str):
        self.nom = nom
        self.main: List[Carte] = []

    def ajouter_carte(self, carte: Carte):
        if not isinstance(carte, Carte):
            raise ValueError("Vous ne pouvez ajouter que des cartes !")
        self.main.append(carte)

    def montrer_main(self) -> list:
        return [carte.to_dict() for carte in self.main]

    def vider_main(self) -> list:
        cartes = self.main.copy()
        self.main.clear()
        return cartes
