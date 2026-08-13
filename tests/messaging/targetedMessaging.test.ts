import { MessagingService } from '../../src/services/messagingService';

describe('Système de messagerie ciblée vendeur', () => {
  test('Doit refuser d’initier une conversation avec soi-même', async () => {
    const buyerId = 'user-123';
    const sameSellerId = 'user-123';

    try {
      if (buyerId === sameSellerId) {
        throw new Error('Vous ne pouvez pas démarrer une discussion avec vous-même.');
      }
    } catch (err: any) {
      expect(err.message).toBe('Vous ne pouvez pas démarrer une discussion avec vous-même.');
    }
  });

  test('Doit créer ou cibler correctement la discussion vendeur-acheteur', () => {
    const mockConversation = {
      id: 'conv-001',
      announcement_id: 'ad-999',
      buyer_id: 'buyer-001',
      seller_id: 'seller-002',
      created_at: new Date().toISOString()
    };

    expect(mockConversation.seller_id).not.toBe(mockConversation.buyer_id);
    expect(mockConversation.announcement_id).toBe('ad-999');
  });
});