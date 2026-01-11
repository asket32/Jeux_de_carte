from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from controller.base import ControleurJeu
from controller.evaluate import StrategieClassementRangCouleur
from models.paquet import Paquet  # CORRECTION : Paquet au lieu de Deck

# Initialisation globale du jeu
paquet = Paquet()
strategie = StrategieClassementRangCouleur()
controleur = ControleurJeu(paquet, strategie)


# ----------------- ENDPOINTS -----------------

class AjouterJoueurAPI(APIView):
    """Ajouter un joueur à la partie."""
    def post(self, request):
        nom = request.data.get("nom")

        if not nom:
            return Response(
                {"erreur": "Le nom du joueur est obligatoire"},
                status=status.HTTP_400_BAD_REQUEST
            )

        if not controleur.ajouter_joueur(nom):
            return Response(
                {"erreur": "Impossible d'ajouter le joueur (partie commencée ou maximum atteint)"},
                status=status.HTTP_400_BAD_REQUEST
            )

        return Response({"joueurs": controleur.lister_joueurs()})


class DemarrerPartieAPI(APIView):
    """Démarrer la partie et distribuer les cartes."""
    def post(self, request):
        if not controleur.demarrer_partie():
            return Response(
                {"erreur": "La partie ne peut pas démarrer (nombre minimum de joueurs non atteint)"},
                status=status.HTTP_400_BAD_REQUEST
            )
        return Response(controleur.etat_partie())


class RevelerCartesAPI(APIView):
    """Révéler les cartes des joueurs."""
    def post(self, request):
        if not controleur.reveler_cartes():
            return Response(
                {"erreur": "Impossible de révéler les cartes (partie non commencée ou déjà terminée)"},
                status=status.HTTP_400_BAD_REQUEST
            )
        return Response(controleur.etat_partie())


class GagnantAPI(APIView):
    """Obtenir le gagnant de la partie."""
    def get(self, request):
        gagnant = controleur.obtenir_gagnant()
        if not gagnant:
            return Response(
                {"erreur": "Le gagnant n'est pas encore disponible (partie non commencée)"},
                status=status.HTTP_400_BAD_REQUEST
            )
        return Response({"gagnant": gagnant})


class ReinitialiserPartieAPI(APIView):
    """Réinitialiser complètement la partie."""
    def post(self, request):
        controleur.reinitialiser_partie()
        return Response({"message": "Partie réinitialisée"})
