from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from controller.base import ControleurJeu
from controller.evaluate import StrategieClassementRangCouleur
from models.paquet import Paquet

strategie = StrategieClassementRangCouleur()
controleur = ControleurJeu(Paquet(), strategie)


class AjouterJoueurAPI(APIView):
    def post(self, request):
        nom = (request.data.get("nom") or "").strip()

        if not nom:
            return Response(
                {"erreur": "Le nom du joueur est obligatoire."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if controleur.partie_commencee:
            return Response(
                {"erreur": "Impossible d'ajouter un joueur pendant une partie."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if len(controleur.joueurs) >= controleur.NOMBRE_MAX_JOUEURS:
            return Response(
                {"erreur": "Le nombre maximum de joueurs est atteint."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if any(j.nom.lower() == nom.lower() for j in controleur.joueurs):
            return Response(
                {"erreur": "Ce nom de joueur existe deja."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        controleur.ajouter_joueur(nom)
        return Response(controleur.etat_partie(), status=status.HTTP_201_CREATED)


class DemarrerPartieAPI(APIView):
    def post(self, request):
        nb_cartes = request.data.get("nb_cartes", 1)

        try:
            nb_cartes = int(nb_cartes)
        except (TypeError, ValueError):
            return Response(
                {"erreur": "Nombre de cartes invalide."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if nb_cartes < 1 or nb_cartes > controleur.NOMBRE_MAX_CARTES_PAR_JOUEUR:
            return Response(
                {
                    "erreur": (
                        f"Le nombre de cartes doit etre compris entre 1 et "
                        f"{controleur.NOMBRE_MAX_CARTES_PAR_JOUEUR}."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not controleur.peut_demarrer():
            return Response(
                {"erreur": "Il faut au moins 2 joueurs pour demarrer la partie."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not controleur.peut_distribuer(nb_cartes):
            return Response(
                {"erreur": "Il n'y a pas assez de cartes pour cette distribution."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not controleur.demarrer_partie(nb_cartes):
            return Response(
                {"erreur": "Impossible de demarrer la partie."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        return Response(controleur.etat_partie(), status=status.HTTP_200_OK)


class RevelerCartesAPI(APIView):
    def post(self, request):
        if not controleur.partie_commencee:
            return Response(
                {"erreur": "La partie n'a pas encore commence."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if controleur.partie_terminee:
            return Response(
                {"erreur": "La partie est deja terminee."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not controleur.reveler_cartes():
            return Response(
                {"erreur": "Aucune carte a reveler."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        return Response(controleur.etat_partie(), status=status.HTTP_200_OK)


class GagnantAPI(APIView):
    def get(self, request):
        gagnant = controleur.obtenir_gagnant()

        if not gagnant:
            return Response(
                {"erreur": "Le gagnant n'est pas encore disponible."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        return Response({"gagnant": gagnant}, status=status.HTTP_200_OK)


class ReinitialiserPartieAPI(APIView):
    def post(self, request):
        controleur.reinitialiser_partie()
        return Response(
            {"message": "Partie reinitialisee."},
            status=status.HTTP_200_OK,
        )


class PiocherAPI(APIView):
    def post(self, request):
        if not controleur.partie_commencee:
            return Response(
                {"erreur": "La partie n'a pas encore commence."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if controleur.partie_terminee:
            return Response(
                {"erreur": "La partie est deja terminee."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not controleur.piocher_cartes():
            return Response(
                {"erreur": "Impossible de piocher davantage de cartes."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        return Response(controleur.etat_partie(), status=status.HTTP_200_OK)
