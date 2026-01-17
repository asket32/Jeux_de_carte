class Joueur:
    def __init__(self, nom: str):
        self.nom = nom
        self.main = []

    def ajouter_carte(self, carte):
        self.main.append(carte)

    def vider_main(self):
        cartes = self.main
        self.main = []
        return cartes

    def montrer_main(self):
        return [carte.afficher() for carte in self.main]
