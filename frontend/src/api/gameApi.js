import axios from "axios";

const API_URL = "http://localhost:8000/api"; // URL de ton API Django

export const ajouterJoueur = (nom) =>
  axios.post(`${API_URL}/joueurs/ajouter/`, { nom });

export const demarrerPartie = () =>
  axios.post(`${API_URL}/partie/demarrer/`);

export const revelerCartes = () =>
  axios.post(`${API_URL}/partie/reveler/`);

export const obtenirGagnant = () =>
  axios.get(`${API_URL}/partie/gagnant/`);

export const reinitialiserPartie = () =>
  axios.post(`${API_URL}/partie/reinitialiser/`);
