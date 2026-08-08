# Architecture Backend & Schéma de Base de Données - Atlas G-market

## 1. Vue d'ensemble de l'Architecture Backend

- **Style Architectural** : Monolithe modulaire (transition possible vers microservices) en Node.js (NestJS) ou Go.
- **Base de Données Principale** : PostgreSQL (combinaison modèle relationnel + colonnes `JSONB` pour la flexibilité des attributs).
- **Moteur de Recherche & Indexation** : Elasticsearch pour la recherche full-text multi-critères rapide.
- **Cache & File de Messages** : Redis (cache d'annonces, sessions) + RabbitMQ/Redis PubSub pour les événements asynchrones (notifications, indexation).

---

## 2. Schéma de Base de Données (PostgreSQL)
