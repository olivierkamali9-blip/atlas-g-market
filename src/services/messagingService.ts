import { query } from '../config/neonDatabase';

export interface Message {
  id?: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  created_at?: string;
}

export interface Conversation {
  id: string;
  announcement_id: string;
  buyer_id: string;
  seller_id: string;
  created_at: string;
  announcement_title?: string;
  seller_name?: string;
  buyer_name?: string;
}

export class MessagingService {
  /**
   * Crée ou récupère une conversation ciblée entre un acheteur et le vendeur d'une annonce.
   */
  static async getOrCreateConversation(buyerId: string, announcementId: string): Promise<Conversation> {
    const adResult = await query(
      `SELECT id, user_id, title FROM announcements WHERE id = $1`,
      [announcementId]
    );

    if (adResult.rows.length === 0) {
      throw new Error('Annonce introuvable');
    }

    const ad = adResult.rows[0];
    const sellerId = ad.user_id;

    if (sellerId === buyerId) {
      throw new Error('Vous ne pouvez pas démarrer une discussion avec vous-même.');
    }

    const existing = await query(
      `SELECT id, announcement_id, buyer_id, seller_id, created_at 
       FROM conversations 
       WHERE announcement_id = $1 AND buyer_id = $2 AND seller_id = $3`,
      [announcementId, buyerId, sellerId]
    );

    if (existing.rows.length > 0) {
      return {
        ...existing.rows[0],
        announcement_title: ad.title
      };
    }

    const newConv = await query(
      `INSERT INTO conversations (announcement_id, buyer_id, seller_id, created_at)
       VALUES ($1, $2, $3, NOW())
       RETURNING id, announcement_id, buyer_id, seller_id, created_at`,
      [announcementId, buyerId, sellerId]
    );

    return {
      ...newConv.rows[0],
      announcement_title: ad.title
    };
  }

  /**
   * Récupère la liste des conversations d'un utilisateur.
   */
  static async getUserConversations(userId: string): Promise<Conversation[]> {
    const result = await query(
      `SELECT c.id, c.announcement_id, c.buyer_id, c.seller_id, c.created_at,
              a.title as announcement_title,
              u_seller.name as seller_name,
              u_buyer.name as buyer_name
       FROM conversations c
       LEFT JOIN announcements a ON c.announcement_id = a.id
       LEFT JOIN users u_seller ON c.seller_id = u_seller.id
       LEFT JOIN users u_buyer ON c.buyer_id = u_buyer.id
       WHERE c.buyer_id = $1 OR c.seller_id = $1
       ORDER BY c.created_at DESC`,
      [userId]
    );

    return result.rows;
  }

  /**
   * Envoie un message dans une conversation ciblée.
   */
  static async sendMessage(conversationId: string, senderId: string, content: string): Promise<Message> {
    if (!content.trim()) {
      throw new Error('Le contenu du message ne peut pas être vide');
    }

    const convCheck = await query(
      `SELECT id FROM conversations WHERE id = $1 AND (buyer_id = $2 OR seller_id = $2)`,
      [conversationId, senderId]
    );

    if (convCheck.rows.length === 0) {
      throw new Error('Accès refusé à cette discussion');
    }

    const result = await query(
      `INSERT INTO messages (conversation_id, sender_id, content, created_at)
       VALUES ($1, $2, $3, NOW())
       RETURNING id, conversation_id, sender_id, content, created_at`,
      [conversationId, senderId, content]
    );

    return result.rows[0];
  }

  /**
   * Récupère l'historique des messages d'une conversation.
   */
  static async getMessages(conversationId: string, userId: string): Promise<Message[]> {
    const convCheck = await query(
      `SELECT id FROM conversations WHERE id = $1 AND (buyer_id = $2 OR seller_id = $2)`,
      [conversationId, userId]
    );

    if (convCheck.rows.length === 0) {
      throw new Error('Accès refusé à cette discussion');
    }

    const result = await query(
      `SELECT id, conversation_id, sender_id, content, created_at
       FROM messages
       WHERE conversation_id = $1
       ORDER BY created_at ASC`,
      [conversationId]
    );

    return result.rows;
  }
}