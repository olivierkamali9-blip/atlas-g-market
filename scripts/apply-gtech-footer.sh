#!/usr/bin/env bash
# Script d'application automatique du Footer G-Tech sur n'importe quel projet

set -e

TARGET_DIR="$1"

if [ -z "$TARGET_DIR" ]; then
  echo "Usage: ./scripts/apply-gtech-footer.sh /chemin/vers/projet"
  exit 1
fi

if [ ! -d "$TARGET_DIR" ]; then
  echo "Erreur : Le dossier cible '$TARGET_DIR' n'existe pas."
  exit 1
fi

echo "🚀 Déploiement du footer 'Powered by G-Tech' dans : $TARGET_DIR"

mkdir -p "$TARGET_DIR/src/components"
mkdir -p "$TARGET_DIR/public/templates"

# Copie du composant React et du Web Component universel
cp templates/footer/GTechFooter.tsx "$TARGET_DIR/src/components/GTechFooter.tsx" 2>/dev/null || true
cp templates/footer/GTechFooter.webcomponent.js "$TARGET_DIR/public/templates/GTechFooter.webcomponent.js" 2>/dev/null || true
cp templates/footer/README.md "$TARGET_DIR/src/components/GTECH_FOOTER_GUIDE.md" 2>/dev/null || true

echo "✅ Footer G-Tech installé avec succès dans $TARGET_DIR !"