from django.urls import path
from .views import (
    AjouterJoueurAPI,
    DemarrerPartieAPI,
    RevelerCartesAPI,
    GagnantAPI,
    ReinitialiserPartieAPI,
    PiocherAPI
)

urlpatterns = [
    path("joueurs/ajouter/", AjouterJoueurAPI.as_view()),
    path("partie/demarrer/", DemarrerPartieAPI.as_view()),
    path("partie/reveler/", RevelerCartesAPI.as_view()),
    path("partie/gagnant/", GagnantAPI.as_view()),
    path("partie/reinitialiser/", ReinitialiserPartieAPI.as_view()),
    path("partie/piocher/", PiocherAPI.as_view()),
]
