from typing import Optional
import random
from .carte import RANGS, COULEURS, Carte

class Paquet(list):
    def __init__(self):
        for rang in RANGS:
            for couleur in COULEURS:
                self.append(Carte(couleur, rang))
        self.melanger()

    def melanger(self):
        random.shuffle(self)

    def piocher(self) -> Optional[Carte]:
        if not self:
            return None
        return self.pop()
