# models/paquet.py

from typing import Optional
import random
from .carte import RANGS, COULEURS, Carte


class Paquet(list):
    """
    Paquet de cartes.
    """

    def __init__(self):
        for rang in RANGS:
            for couleur in COULEURS:
                self.append(Carte(couleur, rang))
        self.melanger()

    def melanger(self):
        """Mélange le paquet."""
        random.shuffle(self)

    def piocher(self) -> Optional[Carte]:
        """Pioche la carte du dessus."""
        if not self:
            return None
        return self.pop()
