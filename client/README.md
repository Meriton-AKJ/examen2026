# Tasks SPA

Application monopage React + Vite pour la gestion de tâches.

## Pré-requis

- Node.js (v20+)
- L'API démarrée (voir `api/README.md`)

## Démarrage

### 1. Installer les dépendances

```bash
npm install
```

### 2. Vérifier les variables d'environnement

Le fichier `.env` est fourni et préconfiguré pour pointer vers l'API locale :

```
VITE_API_URL=http://localhost:3000
```

Modifiez cette valeur si votre API tourne sur un autre port.

### 3. Lancer le serveur de développement

```bash
npm run dev
```

La SPA est disponible sur `http://localhost:5173`.

---

## Commandes utiles

| Commande | Description |
|---|---|
| `npm run dev` | Démarre le serveur de développement avec HMR |
| `npm run build` | Compile l'application pour la production |
| `npm run preview` | Prévisualise le build de production |
| `npm run lint` | Vérifie le code avec ESLint |

## Architecture

```
src/
├── components/     # Composants React (TaskForm, TaskItem, TaskList)
├── services/       # Couche d'appels API (tasks.service.js)
├── App.jsx         # Composant racine
└── main.jsx        # Point d'entrée
```
