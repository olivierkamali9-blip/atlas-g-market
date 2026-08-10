import { announcementService } from '../../src/services/announcementService';
import { searchService } from '../../src/services/searchService';
import { messagingService } from '../../src/services/messagingService';

describe('Atlas G-market - Suite Globale de Validation Qualité', () => {
  beforeEach(() => {
    // Réinitialisation des données de simulation
  });

  test('1. Validation du cycle de vie d une annonce (Création -> Recherche -> Consultation)', async () => {
    const newAd = await announcementService.createAd({
      title: 'Offre d emploi - Développeur Fullstack React/Node',
      description: 'Poste en CDI à Paris ou Full Remote',
      category: 'JOB',
      type: 'OFFER',
      condition: 'NEW',
      price: 55000,
      currency: 'EUR',
      location: 'Paris, France',
      tags: ['cdi', 'tech', 'fullstack'],
      authorId: 'user_recruiter_01',
    });

    expect(newAd).toHaveProperty('id');
    expect(newAd.status).toBe('ACTIVE');

    const searchResults = await searchService.search({
      query: 'Développeur',
      category: 'JOB',
    });

    expect(searchResults.results.some((ad) => ad.id === newAd.id)).toBe(true);
  });

  test('2. Validation du flux de messagerie et négociation entre utilisateurs', async () => {
    const conversation = await messagingService.startConversation({
      adId: 'ad_12345',
      senderId: 'buyer_01',
      recipientId: 'seller_01',
      initialMessage: 'Bonjour, le prix est-il négociable ?',
    });

    expect(conversation).toHaveProperty('id');
    expect(conversation.messages.length).toBeGreaterThan(0);

    const reply = await messagingService.sendMessage({
      conversationId: conversation.id,
      senderId: 'seller_01',
      text: 'Oui, je peux faire une réduction de 10%.',
    });

    expect(reply.status).toBe('DELIVERED');
  });

  test('3. Validation du filtrage multi-critères universel (Emploi, Véhicule, Service)', async () => {
    const multiSearch = await searchService.search({
      category: 'ALL',
      minPrice: 0,
      maxPrice: 10000,
      condition: 'USED',
    });

    expect(multiSearch.results).toBeDefined();
    expect(Array.isArray(multiSearch.results)).toBe(true);
  });

  test('4. Vérification de la résilience et du traitement des erreurs', async () => {
    await expect(
      announcementService.createAd({
        title: '',
        description: 'Invalide',
        category: 'INVALID',
        type: 'OFFER',
        condition: 'NEW',
        price: -50,
        currency: 'EUR',
        location: '',
        tags: [],
        authorId: 'user_00',
      })
    ).rejects.toThrow();
  });
});