# Spécifications UI/UX — Catalogue Universel & Navigation Atlas G-market

## 1. Principes Directeurs
- **Accès Direct Sans Account (Zero Friction)** : Tout visiteur accède immédiatement au catalogue complet, au moteur de recherche et aux filtres dès la première seconde.
- **Identité Visuelle** : Thème *Modern Slate & Emerald* (Fond Slate `#0f172a`, Accents Emerald `#10b981`, Survol Slate 800/700).
- **Inspiration** : Standards d'ergonomie e-commerce grand public (Alibaba / Jumia).

---

## 2. Structure de l'Interface Principale

### A. En-tête (Header) & Barre de Recherche
- **Logo** : Badge officiel G-Tech avec mention "Produit G-Tech".
- **Barre de Recherche Globale** :
  - Input large avec icône loupe (`SearchIcon`).
  - Champ texte : *"Que cherchez-vous ? (Produit, véhicule, emploi, service...)"*.
  - Bouton d'action Rapide : Filtre géographique / Localisation (Dropdown).
- **Bouton Menu Hamburger** (à droite sur Mobile/Desktop) ouvrant le tiroir latéral.

### B. Navigation Filtre par Catégories (Chips horizontaux)
Défilable horizontalement sur mobile, aligné sous la recherche :
- `[Tout]` (Par défaut)
- `[Produits & Habillements]`
- `[Véhicules & Auto]`
- `[Services & Prestations]`
- `[Emploi & Recrutement]`
- `[Immobilier & Logement]`
- `[Électronique & High-Tech]`
- `[Occasion / Seconde main]`

### C. Cartes d'Annonces du Catalogue (Grid 2 à 4 colonnes)
Chaque carte d'annonce contient :
1. **Visuel principal** : Photo/Illustration avec badge état (`Neuf`, `Occasion`, `Offre`, `Demande`).
2. **Titre & Prix** : Emplacement clair, prix mis en avant en vert Émeraude `#10b981`.
3. **Badge Vendeur** : `Vendeur Vérifié` (avec check émeraude) pour renforcer la confiance.
4. **Localisation & Date** : Discret en bas de carte.
5. **Zone d'Action Directe (Double contact)** :
   - Bouton principal : **"Écrire au fournisseur"** (ouvre le module de tchat/messagerie).
   - Bouton secondaire : **"Appeler / WhatsApp"** (dévoile/ouvre directement le numéro du fournisseur).

---

## 3. Tiroir Latéral / Menu de Navigation

### État Déconnecté (Invité)
- **Bannière d'incitation** : *"Publiez votre annonce gratuitement !"*
- **Options du menu** :
  - `Catalogue complet`
  - `Publier une annonce` -> *Redirige vers la connexion/inscription prioritaire*.
  - `Créer une alerte de recherche`
  - `Se connecter / S'inscrire`
  - `Aide & Support`
  - `À propos de G-Tech HQ`

### État Connecté (Utilisateur)
- **En-tête Profil** : Avatar, nom de l'utilisateur, badge de statut.
- **Section Publication** :
  - `+ Publier un produit / bien`
  - `+ Publier une offre d'emploi / service`
  - `+ Déposer une recherche (Demande spécifique)`
- **Espace Personnel** :
  - `Mes annonces publiées`
  - `Messagerie & Discussions` (avec compteur de messages non lus)
  - `Mes recherches enregistrées / Favoris`
  - `Mon profil & Paramètres`
- **Pied du Menu** : Bouton `Déconnexion` et signature `Powered by G-Tech`.