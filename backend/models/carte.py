class Carte:
    def __init__(self, valeur: str, couleur: str):
        self.valeur = valeur      # "A", "K", "10", etc.
        self.couleur = couleur    # "♠", "♥", "♦", "♣"
        self.visible = False

    def afficher(self):
        if self.visible:
            return f"{self.valeur}{self.couleur}"
        return "🂠"
