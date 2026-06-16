# Tasks API

## Pré-requis

- Node.js (v20+)
- Docker et Docker Compose

## Démarrage

### 1. Installer les dépendances

```bash
npm install
```

### 2. Configurer les variables d'environnement

```bash
cp .env.example .env
```

Vérifiez les valeurs dans `.env` (les valeurs par défaut fonctionnent avec le `docker-compose.yml` fourni).

### 3. Démarrer la base de données

```bash
docker compose up -d
```

MariaDB sera disponible sur le port `3306`, phpMyAdmin sur `http://localhost:8080`.

### 4. Générer le client Prisma

```bash
npx prisma generate
```

### 5. Appliquer les migrations

```bash
npx prisma migrate deploy
```

### 6. Démarrer le serveur

```bash
npm run dev
```

L'API est disponible sur `http://localhost:3000`.

---

## Commandes utiles

| Commande | Description |
|---|---|
| `npm run dev` | Démarre le serveur en mode développement (rechargement automatique) |
| `npm start` | Démarre le serveur sans rechargement |
| `npx prisma generate` | Régénère le client Prisma après modification du schéma |
| `npx prisma migrate dev --name <nom>` | Crée et applique une nouvelle migration |
| `npx prisma migrate deploy` | Applique les migrations existantes sans en créer de nouvelle |
| `docker compose up -d` | Démarre les conteneurs en arrière-plan |
| `docker compose down` | Arrête les conteneurs |
