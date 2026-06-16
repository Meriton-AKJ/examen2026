# Instructions d'examen - LPW 2026

## 1. Contexte

"My awesome todo" est une application web de gestion de tâches. Elle est composée de deux projets indépendants: une API REST (`api/`) et une application monopage (`client/`). Les deux projets sont fournis fonctionnels et complets, mais peuvent comporter l'un ou l'autre bugs.

La SPA est écrite en React, et l'API en Node.js avec Express + Prisma. Lisez les READMEs avant de commencer.

## 2. Mise en place

Référez-vous aux READMEs pour les instructions détaillées d'installation et de démarrage.

```
api/README.md - installation, variables d'environnement, commandes
spa/README.md - installation, commandes, architecture
```

L'ordre de démarrage est important: lancez l'API en premier, puis la SPA.

## 3. Débogage

Le projet contient **deux bugs intentionnels**. Ils affectent le bon fonctionnement de l'application au démarrage. Votre première tâche est de les identifier et de les corriger.

Quelques pistes pour vous orienter:
- l'application démarre-t-elle sans erreur dans la console?
- les appels API aboutissent-ils?
- la navigation entre les pages fonctionne-t-elle correctement?

Chaque correction doit faire l'objet d'un commit séparé avec un message de type `fix:`.

## 4. Variables d'environnement

Un fichier `.env.example` est fourni à la racine du dossier `api/`. Créez votre propre fichier `.env` à partir de ce modèle et renseignez les valeurs manquantes si nécessaire.

Le fichier `.env` ne doit jamais être commité. Vérifiez que votre `.gitignore` l'exclut bien avant votre premier commit.

## 5. Configuration ESLint

Cette tâche est obligatoire pour tous les étudiants.

Ajoutez ESLint à l'API (`api/`) :

- installez ESLint et configurez-le pour un projet Node.js ESM
- le fichier de configuration doit être à la racine de `api/`
- ajoutez un script `lint` dans `api/package.json`
- corrigez les éventuelles erreurs remontées par ESLint dans le code existant

Faites un commit `chore:` dédié pour cette configuration.

## 6. Votre feature

Chaque étudiant se voit attribuer une feature au tirage au sort. Les features disponibles sont listées ci-dessous. Vous n'implémentez qu'une seule feature.

Chaque feature comporte une partie API et une partie SPA.

---

### Feature A - Filtrage par statut

**Description:** l'utilisateur peut filtrer la liste des tâches par statut. L'API accepte un paramètre de filtre, et la SPA propose un contrôle pour l'activer.

**Critères d'acceptation:**
- le paramètre `status` est optionnel: sans lui, toutes les tâches sont retournées
- les valeurs acceptées sont les valeurs valides de l'enum `status` (`pending`, `done`, `cancelled`)
- une valeur invalide retourne une erreur `400`
- côté SPA: un contrôle (select ou boutons) permet de choisir le statut à afficher
- la liste se met à jour sans rechargement de page
- si aucune tâche ne correspond, un message le signale

---

### Feature B - Tri des tâches

**Description:** l'utilisateur peut trier la liste des tâches selon différents critères.

**Critères d'acceptation:**
- les paramètres `sortBy` et `order` sont optionnels: sans eux, un tri par défaut s'applique
- `sortBy` accepte au minimum `createdAt` et `title`; toute autre valeur retourne une erreur `400`
- `order` accepte `asc` et `desc`; toute autre valeur retourne une erreur `400`
- côté SPA: un contrôle permet de choisir le critère et le sens du tri
- la liste se met à jour sans rechargement de page

---

### Feature C - Recherche par titre

**Description:** l'utilisateur peut rechercher des tâches par mot-clé dans le titre.

**Critères d'acceptation:**
- le paramètre `q` est optionnel: sans lui, toutes les tâches sont retournées
- la recherche est insensible à la casse et partielle (contient, pas égal)
- côté SPA: un champ de recherche déclenche la requête à chaque modification (avec un délai raisonnable)
- si aucune tâche ne correspond, un état vide est affiché

---

## 7. Exigences Git

**Nommage des branches:**
- `feature/<nom-court>` pour l'implémentation de la feature
- `fix/<description-courte>` pour les corrections de bugs

**Commits:**
- atomiques: un commit = une modification logique
- conventionnels: préfixe `feat:`, `fix:`, `chore:`, `refactor:`
- en français ou en anglais, mais pas les deux

**Pull request:**
- ouvrez une PR par feature et par correction de bug
- désignez le formateur comme reviewer
- la PR doit contenir une description courte de ce qui a été fait

## 8. Évaluation

### Grille (total: 150 points)

La [grille d'évaluation](./GE.md) est fournie dans le projet.

### Déroulé de l'oral

**La défense orale n'a lieu que si l'implémentation est jugée fonctionnelle. En cas de blanc ou d'incapacité à expliquer le code lors de la défense (moins de 50% de réussite), l'examen est considéré comme non réussi indépendamment des points obtenus dans la partie fonctionnelle.**

La défense dure maximum 20 minutes et se déroule en trois temps:

1. **Présentation (5 min):** vous expliquez ce que vous avez implémenté, les choix techniques retenus et les difficultés rencontrées.
2. **Lecture de code (5 min):** vous expliquez / lisez un ou plusieurs blocs de code ligne par ligne.
3. **Questions (10 min):** vous répondez à des questions techniques directement liées à votre code. Il vous sera éventuellement demandé de modifier votre code en direct pour vérifier votre compréhension.
