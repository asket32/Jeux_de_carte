# models/carte.py

COULEURS = ("carreaux", "coeurs", "piques", "diamants")
RANGS = (
    "deux", "trois", "quatre", "cinq", "six", "sept",
    "huit", "neuf", "dix", "valet", "reine", "roi", "as"
)


class Carte:
    """
    Classe représentant une carte.
    """

    def __init__(self, couleur: str, rang: str):
        self.couleur = couleur
        self.rang = rang
        self.visible = False  # True si la carte est face visible

    def __str__(self):
        return f"{self.rang} de {self.couleur}"

    def __repr__(self):
        return str(self)

    def to_dict(self) -> dict:
        """
        Pour l'API : retourne la carte en dictionnaire.
        """
        return {
            "rang": self.rang,
            "couleur": self.couleur,
            "visible": self.visible
        }
