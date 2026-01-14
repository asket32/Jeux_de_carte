RANGS = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]
COULEURS = ["♠", "♥", "♦", "♣"]

class Carte:
    VALEUR_RANG = {
        "2": 2, "3": 3, "4": 4, "5": 5, "6": 6,
        "7": 7, "8": 8, "9": 9, "10": 10,
        "J": 11, "Q": 12, "K": 13, "A": 14
    }

    def __init__(self, rang, couleur):
        self.rang = rang
        self.couleur = couleur
        self.visible = False

    @property
    def valeur(self):
        return self.VALEUR_RANG[self.rang]

    def afficher(self):
        return {
            "rang": self.rang,
            "couleur": self.couleur,
            "visible": self.visible
        }

    def __repr__(self):
        return f"{self.rang}{self.couleur}" + ("(visible)" if self.visible else "")
