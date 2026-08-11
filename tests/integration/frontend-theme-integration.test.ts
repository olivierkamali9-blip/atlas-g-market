import { describe, it, expect } from 'vitest';
import { theme } from '../../frontend/src/styles/theme';

describe('Intégration Frontend & Thème Modern Slate & Emerald', () => {
  describe('Cohérence des jetons de design (Tokens)', () => {
    it('doit contenir la palette officielle Slate & Émeraude', () => {
      expect(theme.colors.primary.emerald).toBe('#10B981');
      expect(theme.colors.primary.emeraldDark).toBe('#059669');
      expect(theme.colors.slate.background).toBe('#0F172A');
      expect(theme.colors.slate.card).toBe('#1E293B');
      expect(theme.colors.slate.textPrimary).toBe('#F8FAFC');
    });

    it('doit associer une identité visuelle claire pour chaque type d d’annonce (Emploi, Produit, Service)', () => {
      expect(theme.categories.jobs).toBeDefined();
      expect(theme.categories.products).toBeDefined();
      expect(theme.categories.services).toBeDefined();
      expect(theme.categories.vehicles).toBeDefined();
      expect(theme.categories.realEstate).toBeDefined();
    });
  });

  describe('Validation visuelle et accessibilité des composants', () => {
    it('vérifie le contraste des boutons d’action principaux émeraude sur fond sombre', () => {
      const emeraldBtn = theme.colors.primary.emerald;
      const textDark = theme.colors.slate.background;
      expect(theme.utils.hasAccessibleContrast(emeraldBtn, textDark)).toBe(true);
    });

    it('valide l’effet d’affichage en mise en avant des cartes d’annonces', () => {
      const featuredCard = theme.getCardStyle('featured');
      expect(featuredCard.borderColor).toBe(theme.colors.primary.emerald);
      expect(featuredCard.shadow).toBe('0 10px 25px -5px rgba(16, 185, 129, 0.2)');
    });

    it('s’assure que les modales de détail et de messagerie appliquent le bon flou d’arrière-plan', () => {
      const modalStyle = theme.components.modal;
      expect(modalStyle.overlayBackdrop).toContain('rgba');
      expect(modalStyle.backdropBlur).toBe('8px');
    });
  });
});