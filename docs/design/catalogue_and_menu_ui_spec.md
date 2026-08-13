# Spécification UI/UX : Catalogue Universel Public & Menu de Publication Dynamic (Style Jumia / Alibaba)

## 1. Vision UX & Principes Directeurs
L'application **Atlas G-Market** est une plateforme universelle de mise en relation (Offre / Demande). Elle doit permettre de chercher et publier tout type d'annonce :
- **Biens physiques** (Neufs & Occasion, High-Tech, Mode, Maison)
- **Immobilier** (Vente, Location, Colocation)
- **Emploi & Services** (Offres d'emploi, Freelance, Prestataires de services)
- **Véhicules** (Vente, Location, Pièces)

### Objectifs d'expérience utilisateur :
1. **Clarté visuelle instantanée** : Navigation par mégamenu latéral/supérieur inspirée des leaders e-commerce (Jumia/Alibaba) tout en restant moderne et fluide.
2. **Recherche & Filtrage dynamique** : Les filtres s'adaptent au type de catégorie sélectionné (ex: kilomètres pour un véhicule, salaire pour un emploi, état pour un objet).
3. **Publication simplifiée en 3 étapes** : Guide l'utilisateur dans le dépôt d'annonce sans surcharger l'écran.

---

## 2. Design System & Charte Visuelle (Tokens UI)

### Palette de Couleurs
- **Couleur Primaire (Action / Branding)** : `#E65100` (Orange vif dynamique style Marketplace) / `#0D47A1` (Bleu de confiance G-Tech)
- **Couleur Secondaire (Highlights & Badges)** : `#2E7D32` (Vert Validation / Recommandé)
- **Arrière-plans** :
  - Fond global : `#F8F9FA`
  - Cartes & Conteneurs : `#FFFFFF`
  - Navbars / En-têtes : `#1A237E` (Fond sombre élégant) ou `#FFFFFF` (Clair)
- **Typographie & Textes** :
  - Titres principaux : `#212121`
  - Textes secondaires : `#616161`
  - Muted / Désactivé : `#9E9E9E`
  - Bordures & Séparateurs : `#E0E0E0`

### Composants & Boutons
- **Bouton Principal ("Publier une annonce")** : Gradient vibrant avec ombre portée douce (`box-shadow: 0 4px 12px rgba(230, 81, 0, 0.3)`), coins arrondis `8px`.
- **Badges d'état** :
  - *Neuf* : Fond `#E8F5E9`, Texte `#2E7D32`
  - *Occasion* : Fond `#FFF3E0`, Texte `#E65100`
  - *Offre d'emploi* : Fond `#E1F5FE`, Texte `#0288D1`
  - *Service* : Fond `#EDE7F6`, Texte `#512DA8`

---

## 3. Layout & Structure du Catalogue Universel

### A. Navigation Supérieure (Header)
1. **Logo Atlas G-Market** (Lien vers accueil / catalogue global).
2. **Barre de Recherche Omniprésente** :
   - Champ texte principal avec autocomplétion.
   - Sélecteur rapide de localisation (Ville / Région).
   - Sélecteur de catégorie parente (Tout, Produits, Emploi, Immobilier, Services).
   - Bouton de recherche avec icône loupe (`#E65100`).
3. **Zone Utilisateur** : Bouton d'action proéminent `+ Publier une annonce`, Icône Messagerie (avec badge de notifications), Profil / Connexion.

### B. Mégamenu & Catégories (Style Jumia / Alibaba)
- **Menu Latéral à gauche (Desktop)** ou **Drawer/Carrousel (Mobile)** :
  - 🛒 *Électronique & High-Tech* (Smartphones, Ordinateurs, Accessoires)
  - 🚗 *Véhicules & Transport* (Voitures, Motos, Équipements)
  - 🏠 *Immobilier* (Vente, Location, Bureaux)
  - 💼 *Emploi & Recrutement* (CDI/CDD, Freelance, Stages)
  - 🛠️ *Services & Prestations* (Dépannage, Cours, BTP, Événementiel)
  - 👕 *Mode & Maison* (Vêtements, Meubles, Électroménager)
- **Comportement Survol (Hover)** : Affiche un panneau étendu avec sous-catégories et filtres populaires.

### C. Grille d'Annonces Universelle (Public Catalog)
- **Vue Switcher** : Bascule possible entre **Vue Grille** (Cartes produits) et **Vue Liste** (Détaillée pour emplois/services).
- **Carte d'Annonce Type (Product/Item Card)** :
  - Ratio Image : 4:3 avec tag d'état en overlay (ex: "Occasion - Bon état" ou "CDI").
  - Titre (2 lignes max avec ellipses).
  - Prix ou Rémunération affiché en gras avec devise localisée.
  - Localisation + Date de publication relative (ex: "Paris • Il y a 2h").
  - Icône "Mise en favori" (Cœur interactif).

---

## 4. Spécification du Menu de Publication ("Dépôt d'Annonce")

Le flux de publication est découpé en 3 étapes guidées pour maximiser la conversion :
