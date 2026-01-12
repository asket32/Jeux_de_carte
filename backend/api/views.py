from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from controller.base import ControleurJeu
from controller.evaluate import StrategieClassementRangCouleur
from models.paquet import Paquet

# Initialisation du jeu
strategie = StrategieClassementRangCouleur()
controleur = ControleurJeu(Paquet(), strategie)

# API Ajouter joueur
class AjouterJoueurAPI(APIView):
    def post(self, request):
        nom = request.data.get("nom")
        if not nom:
            return Response({"erreur": "Le nom du joueur est obligatoire"}, status=status.HTTP_400_BAD_REQUEST)
        if not controleur.ajouter_joueur(nom):
            return Response({"erreur": "Impossible d'ajouter le joueur"}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"joueurs": controleur.lister_joueurs()}, status=status.HTTP_201_CREATED)

# API Démarrer partie (réinitialise les cartes avant)
class DemarrerPartieAPI(APIView):
    def post(self, request):
        # On réinitialise toutes les cartes/mains avant de commencer
        controleur.reinitialiser_partie()
        if not controleur.demarrer_partie():
            return Response({"erreur": "Impossible de démarrer la partie, minimum 2 joueurs."}, status=status.HTTP_400_BAD_REQUEST)
        return Response(controleur.etat_partie())

# API Révéler cartes
class RevelerCartesAPI(APIView):
    def post(self, request):
        if not controleur.reveler_cartes():
            return Response({"erreur": "Impossible de révéler les cartes"}, status=status.HTTP_400_BAD_REQUEST)
        return Response(controleur.etat_partie())

# API Gagnant
class GagnantAPI(APIView):
    def get(self, request):
        gagnant = controleur.obtenir_gagnant()
        if not gagnant:
            return Response({"erreur": "Le gagnant n'est pas encore disponible"}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"gagnant": gagnant})

# API Réinitialiser partie
class ReinitialiserPartieAPI(APIView):
    def post(self, request):
        controleur.reinitialiser_partie()
        return Response({"message": "Partie réinitialisée"})
