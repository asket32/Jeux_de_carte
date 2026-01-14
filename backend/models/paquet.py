import random
from models.carte import Carte, RANGS, COULEURS

class Paquet:
    def __init__(self):
        self.cartes = [Carte(r, c) for c in COULEURS for r in RANGS]
        self.melanger()

    def melanger(self):
        random.shuffle(self.cartes)

    def piocher(self):
        if self.cartes:
            return self.cartes.pop()
        return None

    def append(self, carte):
        self.cartes.append(carte)
