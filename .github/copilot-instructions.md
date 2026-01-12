# AI Coding Agent Instructions for Card Game Project

## Architecture Overview
This is a web-based card game with a Django REST API backend and React frontend. The backend uses custom Python classes for game logic (no Django models/DB), organized in MVC-style with controllers handling game state and strategies for evaluation.

- **Backend Structure**: `models/` (Carte, Joueur, Paquet), `controller/` (ControleurJeu with strategy pattern), `api/` (DRF views)
- **Frontend Structure**: React components (Card, GameBoard, PlayerHand, Menu), API layer in `src/api/gameApi.js`
- **Data Flow**: Frontend calls REST endpoints to manage game state; backend maintains a global game controller instance

## Key Workflows
- **Run Backend**: `cd backend && python manage.py runserver` (serves on :8000)
- **Run Frontend**: `cd frontend && npm start` (serves on :3000, proxies API calls to :8000)
- **Game Flow**: Add players → Start game (deals 1 card each) → Reveal cards → Determine winner using rank/suit ranking

## Project Conventions
- **Card Representation**: French suits ("carreaux", "coeurs", "piques", "diamants") and ranks ("deux" to "as")
- **Evaluation Strategy**: Implemented via strategy pattern in `controller/evaluate.py`; current strategy ranks by RANGS.index then COULEURS.index
- **API Responses**: Use `to_dict()` methods on models for serialization (e.g., `Carte.to_dict()`)
- **State Management**: Backend uses global controller instance; frontend uses React state with API calls
- **Styling**: Tailwind CSS with framer-motion for card flip animations

## Integration Points
- **CORS**: Enabled in Django settings for frontend-backend communication
- **API Base URL**: Hardcoded to `http://localhost:8000/api` in `gameApi.js`
- **Dependencies**: Backend requires `djangorestframework`, `django-cors-headers`; Frontend uses axios for API calls

## Common Patterns
- **Adding Game Features**: Extend `ControleurJeu` in `controller/base.py`, add API view in `api/views.py`, update URLs
- **New Evaluation Rules**: Create new strategy class in `controller/evaluate.py`, inject into `ControleurJeu`
- **UI Components**: Follow component hierarchy: App → Menu/GameBoard → PlayerHand → Card
- **Error Handling**: API views return 400 with error messages; frontend handles via try/catch on axios calls

Reference files: `backend/controller/base.py` (game logic), `frontend/src/api/gameApi.js` (API integration), `backend/models/carte.py` (data structures)</content>
<parameter name="filePath">/home/asket/Projet_epitech/Jeux_de_carte/.github/copilot-instructions.md