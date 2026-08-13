# Audit des Dépendances & Plan 100% Zéro-Coût (Atlas G-market)

## 1. Synthèse de l'Audit

L'ensemble des services et dépendances utilisés pour le projet **Atlas G-market** a été audité pour garantir un fonctionnement complet, pérenne et strictement **0,00 € / mois**.

---

## 2. Infrastructure & Hébergement (Free Tier)

| Composant | Solution retenue | Limites Tier Gratuit | Statut |
| :--- | :--- | :--- | :--- |
| **Base de Données** | **Neon PostgreSQL** | 0.5 GiB de stockage, branchements gratuits, mise en veille automatique | **Validé 100% Gratuit** |
| **Hébergement Web & API** | **Vercel** | 100 Go de bande passante/mois, Serverless Functions illimitées (tier Hobby) | **Validé 100% Gratuit** |
| **Gestionnaire de Code & CI/CD** | **GitHub Actions** | 2 000 min/mois pour dépôts publics/privés | **Validé 100% Gratuit** |

---

## 3. Audit des Dépendances Logicielles (`package.json`)

Toutes les dépendances utilisées sont sous licences Open Source réutilisables sans frais (MIT, Apache 2.0, BSD) :

- **Backend / Serveur** : `express`, `@neondatabase/serverless`, `dotenv`, `cors`, `zod`
- **Frontend / Interface** : `react`, `react-dom`, `lucide-react`, `tailwindcss`
- **Qualité & Tests** : `typescript`, `vitest`, `playwright`

Aucun service tiers payant (ex: Stripe payant au fixe, Twilio, SendGrid payant) n'est requis dans la configuration actuelle.

---

## 4. Recommandations de Maintien du Zéro-Coût

1. **Neon PostgreSQL** :
   - Nettoyage automatique des journaux d'audit de plus de 90 jours pour conserver un stockage DB sous le quota de 500 Mo.
   - Utilisation du driver HTTP/WebSocket officiel `@neondatabase/serverless` pour minimiser le nombre de connexions ouvertes.
2. **Vercel & Images** :
   - Stockage et optimisation des visuels via formats compressés (WebP) directement servis par le CDN Vercel sans service externe payant.
3. **Paiements & Transactions** :
   - Atlas G-market favorise la mise en relation directe (de main à main ou paiement direct entre utilisateurs) afin de ne générer aucuns frais bancaires d'intermédiation pour la plateforme.

---
**Validation finale :** Le plan d'architecture est 100% conforme à la charte Zéro-Coût de G-Tech HQ.