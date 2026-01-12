COULEURS = ("carreaux", "coeurs", "piques", "diamants")
RANGS = (
    "deux","trois","quatre","cinq","six","sept",
    "huit","neuf","dix","valet","reine","roi","as"
)

class Carte:
    def __init__(self, couleur: str, rang: str):
        self.couleur = couleur
        self.rang = rang
        self.visible = False

    def __str__(self):
        return f"{self.rang} de {self.couleur}"

    def __repr__(self):
        return str(self)

    def to_dict(self) -> dict:
        return {"rang": self.rang, "couleur": self.couleur, "visible": self.visible}
