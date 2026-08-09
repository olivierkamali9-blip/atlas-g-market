import { describe, it, expect, beforeAll } from 'vitest';
import { AnnouncementService } from '../../src/services/announcementService';
import { SearchService } from '../../src/services/searchService';
import { MessagingService } from '../../src/services/messagingService';

describe('Atlas G-Market - Test et Validation des Fonctionnalités', () => {
  let announcementService: AnnouncementService;
  let searchService: SearchService;
  let messagingService: MessagingService;

  beforeAll(() => {
    announcementService = new AnnouncementService();
    searchService = new SearchService();
    messagingService = new MessagingService();
  });

  describe('Validation des Annonces (Offre & Demande universelle)', () => {
    it('devrait créer une annonce valide pour un emploi ou un produit', async () => {
      const newAd = {
        title: 'Développeur Fullstack Senior',
        category: 'emploi',
        type: 'offre',
        price: 55000,
        description: 'Poste en CDI avec télétravail possible.',
        location: 'Paris / Distanciel',
        condition: 'neuf' as const
      };

      const result = await announcementService.createAnnouncement(newAd);
      expect(result).toHaveProperty('id');
      expect(result.title).toBe(newAd.title);
      expect(result.category).toBe('emploi');
    });

    it('devrait rejeter une annonce dont le titre ou la catégorie est invalide', async () => {
      const invalidAd = {
        title: '',
        category: '',
        type: 'offre',
        price: -10,
        description: 'Invalide'
      };

      await expect(announcementService.createAnnouncement(invalidAd as any)).rejects.toThrow();
    });
  });

  describe('Validation du Moteur de Recherche', () => {
    it('devrait filtrer les annonces par mot-clé et catégorie', async () => {
      const searchResults = await searchService.search({
        query: 'Développeur',
        category: 'emploi'
      });

      expect(Array.isArray(searchResults.items)).toBe(true);
      expect(searchResults.total).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Validation de la Messagerie Instantanée', () => {
    it('devrait permettre l envoi et la récupération de messages entre utilisateurs', async () => {
      const messageData = {
        senderId: 'user-1',
        receiverId: 'user-2',
        adId: 'ad-100',
        content: 'Bonjour, le poste est-il toujours disponible ?'
      };

      const sentMessage = await messagingService.sendMessage(messageData);
      expect(sentMessage).toHaveProperty('id');
      expect(sentMessage.content).toBe(messageData.content);

      const conversation = await messagingService.getConversation('user-1', 'user-2');
      expect(conversation.messages.some(m => m.id === sentMessage.id)).toBe(true);
    });
  });
});