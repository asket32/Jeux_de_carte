import random
from models.carte import Carte


class Paquet:
    VALEURS = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]
    COULEURS = ["♠", "♥", "♦", "♣"]

    def __init__(self):
        self.cartes = []
        self.reset()

    def reset(self):
        self.cartes = [
            Carte(valeur, couleur)
            for couleur in self.COULEURS
            for valeur in self.VALEURS
        ]
        self.melanger()

    def melanger(self):
        random.shuffle(self.cartes)

    def piocher(self):
        if not self.cartes:
            return None
        return self.cartes.pop()
