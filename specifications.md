# Cahier des charges

---

## Table des matières

- [Cahier des charges](#cahier-des-charges)
  - [Table des matières](#table-des-matières)
  - [Modèle économique](#modèle-économique)
    - [Cible principale](#cible-principale)
    - [Source de revenu principale](#source-de-revenu-principale)
    - [Mode de distribution](#mode-de-distribution)
    - [Structure de commission](#structure-de-commission)
    - [Différenciateur](#différenciateur)
    - [Anti-contournement](#anti-contournement)
    - [Sources de revenu secondaires (à valider)](#sources-de-revenu-secondaires-à-valider)
  - [Profils utilisateurs](#profils-utilisateurs)
    - [Créateur solo](#créateur-solo)
    - [Organisation](#organisation)
    - [Testeur / Joueur](#testeur--joueur)
  - [Fonctionnalités](#fonctionnalités)
    - [Retours testeurs](#retours-testeurs)
    - [Page projet](#page-projet)
    - [Tableau de bord créateur](#tableau-de-bord-créateur)
    - [Communautaire](#communautaire)
    - [Tableau de bord testeur](#tableau-de-bord-testeur)
    - [Modération \& Anti-contournement](#modération--anti-contournement)
    - [Marketplace \& Monétisation](#marketplace--monétisation)
    - [Paramètres utilisateur](#paramètres-utilisateur)
    - [Interface](#interface)
  - [Hors périmètres (V1)](#hors-périmètres-v1)
  - [Conception graphique](#conception-graphique)
  - [Pile technique](#pile-technique)
    - [Backend](#backend)
    - [Base de données](#base-de-données)
    - [Stockage de fichiers](#stockage-de-fichiers)
    - [Hébergement](#hébergement)
    - [Contraintes techniques](#contraintes-techniques)

---

## Modèle économique

CritiPlay est d'abord un outil de test utilisateur pour les jeux indé. Le test est le cœur du produit : retours structurés, IA, gamification, et stats avancées. La distribution de jeux (marketplace, commission) sert à financer la plateforme et à amplifier le test, pas l'inverse.

### Cible principale

Les développeurs de jeux indés solos ou en petites structures (2 à 3 personnes), ainsi que les organisations qui se regroupent autour d'un projet (owner, admin, modérateurs, dev).

### Source de revenu principale

La commission de la plateforme prélevée sur chaque vente de jeu payant. Les jeux gratuits restent gratuits, sans commission.

### Mode de distribution

Les jeux sont principalement distribués sous forme de fichiers téléchargeables (exécutables) fournis par le créateur, comme sur itch.io. Un mode web peut être proposé en complément pour les jeux compatibles, mais le téléchargement reste le mode principal.

### Structure de commission

La commission est différenciée selon le mode d'utilisation de la plateforme, pour rester compétitif face à itch.io (0%) tout en facturant la valeur ajoutée :

- 0% pour les jeux gratuits.
- 5% pour les jeux en mode test actif (utilisation de l'IA, des retours structurés, de la gamification, des stats).
- 10% pour les jeux en self-service (le créateur gère ses tests de son côté) et pour les jeux terminés (mode test désactivé).

### Différenciateur

Contrairement à itch.io, CritiPlay structure le test utilisateur en parallèle de la distribution. Chaque retour est catégorisé, noté, gamifié, et analysé par IA. Le joueur est aussi un testeur, mais il n'est pas obligé de tester : la valeur principale reste l'accès au jeu, et le test est un bonus.

### Anti-contournement

Pour éviter que des créateurs activent le mode test sans l'utiliser réellement (et paient 5% au lieu de 10%), la plateforme met en place plusieurs mécanismes :

- Signalement utilisateur : un bouton "ce jeu ne semble pas en test" est disponible sur la page du jeu.
- Détection automatique d'inactivité : si aucun signal d'utilisation du mode test n'est détecté sur 30 jours (IA non utilisée, stats non consultées, aucun retour traité), le système envoie une notification au créateur, puis propose une bascule automatique en self-service.
- Conditions d'éligibilité au mode test : un jeu reste en mode test uniquement s'il reçoit au moins un retour par mois, ou si une activité de test est détectée.
- Transparence : le mode actif et la commission associée sont affichés clairement sur la page du jeu et dans le dashboard créateur.
- CGU : les conditions d'utilisation prévoient la suspension du mode test et la rétrofacturation de la différence en cas de contournement répété.

### Sources de revenu secondaires (à valider)

- Abonnement de type Prime pour suivre un créateur ou une organisation.
- Mise en avant payante de jeux dans le marketplace.
- Services premium pour les créateurs (statistiques avancées, support prioritaire, IA dédiée).

---

## Profils utilisateurs

CritiPlay s'adresse à trois profils principaux, chacun avec un usage et des attentes distinctes.

### Créateur solo

- Type : développeur indé seul ou en très petite équipe (2 à 3 personnes).
- Objectif : tester son jeu rapidement, obtenir des retours structurés, et distribuer son jeu sans dépendre de Steam.
- Usage principal : créer un projet, activer le mode test, consulter les retours, basculer en self-service à la sortie.
- Attentes : un dashboard simple, des stats utiles, une commission juste.

### Organisation

- Type : groupe de 2 à 10 personnes autour d'un projet (owner, admin, modérateurs, dev).
- Objectif : coordonner les retours entre membres, suivre l'avancement, gérer plusieurs builds.
- Usage principal : gérer les rôles, valider les retours, modérer la communauté du jeu.
- Attentes : des permissions claires, une traçabilité des actions, une page projet customizable.

### Testeur / Joueur

- Type : joueur indé curieux, souvent inscrit sur Discord ou itch.io, à la recherche de jeux à découvrir.
- Objectif : tester des jeux, donner des retours utiles, et gagner en réputation (score, gamification).
- Usage principal : télécharger un jeu, écrire un retour, consulter son score, suivre des créateurs.
- Attentes : une interface mobile rapide, un système de points valorisant, une expérience proche de Steam.

---

## Fonctionnalités

### Retours testeurs

- Le testeur peut :
  - écrire un nouveau retour de test.
  - choisir les tags, le type, la catégorie, la sévérité, le niveau, la version, la plateforme et les détails de son retour de test.
  - upvoter un retour existant.
- Le testeur ne doit pas :
  - pouvoir modifier son retour de test une fois envoyé.
  - pouvoir créer de nouveau retour si le créateur a arrêté les tests pour la version en cours.
- Le créateur ne peut pas :
  - créer un retour sur son propre projet
- Le système doit :
  - vérifier, lors de l'envoi d'un retour, s'il existe un retour similaire.
  - proposer d'upvoter un retour similaire lorsqu'un tel retour est détecté.
  - permettre la création du retour même si une suggestion d'upvote est affichée.
  - vérifier l'éligibilité d'un projet au mode "test".

### Page projet

- Le créateur peut :
  - définir une galerie d'images ou vidéos.
  - fournir jusqu'à 5 exécutables en fonction de la plateforme.
  - remplacer les exécutables via une nouvelle version.
  - modifier toutes les infos de la page.
  - modifier toutes les couleurs de la page.
- Le créateur doit :
  - fournir au moins un exécutable à tester.
  - mettre à jour tous les exécutables en même temps.
- Le testeur peut :
  - télécharger le jeu.
- Le système doit :
  - limiter la visibilité d'une page privée aux personnes autorisées seulement (organisation).
  - activer le mode "update" automatiquement seulement lorsqu'une nouvelle version sort.
  - vérifier le SHA des exécutables à chaque nouvelle version.

### Tableau de bord créateur

- Le créateur peut :
  - créer un nouveau projet.
  - marquer les retours utilisateurs (Fixed, Closed, Removed, etc.)
  - demander un résumé des retours à l'IA.
  - définir les tags, niveaux et catégories des retours testeurs.
  - définir une date de début et de fin des tests utilisateur.
- Le créateur doit :
  - avoir accès aux statistiques détaillées et données de son projet (graphe, résumé IA, nombre de téléchargements, retours testeurs, revenus, visites, etc.)
- Le système doit :
  - ajouter des points en fonction du marquage fait par le créateur.
  - appliquer un barème de points cohérent entre les créateurs, défini dans la documentation interne.

### Communautaire

- L'utilisateur peut :
  - envoyer et recevoir des messages privés en fonction des paramètres choisis.
- Un testeur peut :
  - poster un avis textuel dans la partie communauté du jeu.
  - poster une image dans la partie communauté du jeu.
- Le système doit :
  - afficher les avis de la communauté dans une section dédiée (réf. Steam).

### Tableau de bord testeur

- Le testeur doit :
  - avoir accès à la liste des jeux qu'il teste.
  - avoir accès à son score testeur (gamification).
  - avoir accès à la liste des retours qu'il a faits ainsi qu'à leur statut.

### Modération & Anti-contournement

- Le testeur peut :
  - signaler un jeu qui ne semble pas en mode "test".
- Le système doit :
  - détecter l'inactivité des outils de tests (IA non utilisée, stats non consultées, retours non traités).
  - maintenir l'éligibilité si l'un de ces signaux est détecté sur les 30 derniers jours : activité de tests, retours traités ou nouvelle version publiée.
  - afficher le mode utilisé sur la page du jeu ainsi que la commission.
  - sanctionner les créateurs qui en abusent : facture rétroactive, remboursement joueurs, impossibilité de récupérer l'argent des prochaines ventes.
  - comptabiliser seulement les comptes avec un historique pour l'éligibilité : score supérieur à 0, 7 jours d'ancienneté, profils vérifiés.
  - envoyer une notification par mail au créateur si aucun signal d'utilisation détecté sur 30 jours.
- Le créateur doit :
  - basculer du mode "test" au mode "normal" si le jeu est dans sa phase finale ou s'il est self-service.

### Marketplace & Monétisation

- Le créateur doit :
  - voir le montant qu'il perçoit réellement, après déduction de la commission de la plateforme.
- L'utilisateur peut :
  - suivre une organisation ou un créateur.
  - ajouter un ou plusieurs jeux au panier.
  - accéder à un jeu selon l'un des modes suivants : achat d'une place, demande d'accès, ou inscription gratuite.
  - acheter un ou plusieurs jeux via paiement unique ou via le panier.
  - voir ou non les jeux NSFW en fonction des paramètres choisis.
- L'utilisateur doit :
  - voir le montant total qu'il paye, toutes taxes comprises, avant validation du paiement.
- Le système doit :
  - permettre le tri des jeux par tags, catégorie, titre ou créateur/organisation.
  - appliquer la commission de la plateforme sur chaque transaction.
  - distinguer clairement les modes d'accès (achat, demande, gratuit) sur la page du jeu.

### Paramètres utilisateur

- L'utilisateur peut :
  - modifier son email.
  - modifier son numéro de téléphone.
  - modifier son pseudo.
  - modifier sa date de naissance.
  - modifier la capitalisation de son pseudo.
  - activer ou désactiver la visibilité des jeux NSFW.
  - activer ou désactiver les messages privés.
- Le système doit :
  - masquer les jeux NSFW dans les listes publiques lorsque l'utilisateur a désactivé leur visibilité.
  - masquer les jeux NSFW par défaut.

### Interface

- Le système doit :
  - afficher un retour visuel pour chaque action utilisateur.
  - afficher un retour visuel et un message pour chaque appel à l'API.
  - être conçu pour mobile pour tout le côté client.
  - être conçu pour desktop pour la création et la mise à jour de page projet.
  - être multilingue dès le départ.

---

## Hors périmètres (V1)

- Modération automatique de contenu audio ou vidéo.
- Paiement multi-devise.
- Application mobile native.
- Système de streaming ou cloud gaming (à valider pour la V2).
- Marketplace de mods ou de contenu généré par les utilisateurs.
- Système d'abonnement Prime (à valider pour la V2).
- Outils de collaboration en temps réel entre créateurs (chat, visio, etc.).
- Intégration native avec Steam, itch.io ou autres plateformes externes (à valider pour la V2).
- Système de recommandation basé sur l'IA pour les joueurs.

---

## Conception graphique

(TODO)

---

## Pile technique

### Backend

L'API est construite avec [Hono](https://hono.dev/), un framework léger et rapide adapté à un projet de cette taille. Hono permet de gérer les routes REST, la validation des données, et l'authentification via Supabase. Le choix de Hono plutôt qu'un framework plus lourd (NestJS, Express) est justifié par la simplicité du projet et la performance sur Vercel.

### Base de données

[Supabase](https://supabase.com/database) est utilisé comme couche de données, avec PostgreSQL en backend. Les migrations sont gérées via Drizzle ORM. Supabase fournit également l'authentification, les politiques de sécurité au niveau des lignes (RLS), et les fonctions serverless pour les traitements IA.

### Stockage de fichiers

Les exécutables, images et vidéos sont stockés sur [Supabase Storage](https://supabase.com/storage), avec un bucket par type de contenu. Les téléchargements sont signés et limités dans le temps pour éviter les abus.

### Hébergement

Le frontend est hébergé sur [Vercel](https://vercel.com/) et construit avec [Nuxt 3](https://nuxt.com/). Vercel gère le déploiement continu, le CDN, et les fonctions serverless si besoin. Le choix de Nuxt est justifié par le rendu côté serveur (SEO), le système de fichiers basé sur les routes, et l'écosystème Vue.

### Contraintes techniques

- Authentification : gérée par Supabase Auth, avec support des providers OAuth (Discord, Google) et email/mot de passe.
- Temps réel : Supabase Realtime pour les notifications et la mise à jour des dashboards.
- IA : les résumés et la détection de doublons sont délégués à une API externe (OpenAI ou équivalent), appelée depuis les fonctions serverless Supabase.
- Paiement : Stripe pour la gestion des transactions, abonnements, et commissions.
- Sécurité : RLS Supabase activée sur toutes les tables, validation des entrées côté API, vérification SHA sur les exécutables.
