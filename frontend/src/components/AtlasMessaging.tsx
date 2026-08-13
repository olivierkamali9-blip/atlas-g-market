import React, { useState, useEffect } from 'react';

export interface Conversation {
  id: string;
  announcement_id: string;
  buyer_id: string;
  seller_id: string;
  announcement_title?: string;
  seller_name?: string;
  buyer_name?: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  created_at: string;
}

interface AtlasMessagingProps {
  currentUserId: string;
  activeConversationId?: string | null;
  onSelectConversation?: (id: string) => void;
}

export const AtlasMessaging: React.FC<AtlasMessagingProps> = ({
  currentUserId,
  activeConversationId,
  onSelectConversation
}) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConvId, setSelectedConvId] = useState<string | null>(activeConversationId || null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeConversationId) {
      setSelectedConvId(activeConversationId);
    }
  }, [activeConversationId]);

  useEffect(() => {
    fetchConversations();
  }, [currentUserId]);

  useEffect(() => {
    if (selectedConvId) {
      fetchMessages(selectedConvId);
    }
  }, [selectedConvId]);

  const fetchConversations = async () => {
    try {
      const response = await fetch('/api/messaging/conversations');
      const data = await response.json();
      if (data.success) {
        setConversations(data.conversations);
        if (!selectedConvId && data.conversations.length > 0) {
          setSelectedConvId(data.conversations[0].id);
        }
      }
    } catch (err) {
      console.error('Erreur chargement discussions:', err);
    }
  };

  const fetchMessages = async (convId: string) => {
    try {
      const response = await fetch(`/api/messaging/conversations/${convId}/messages`);
      const data = await response.json();
      if (data.success) {
        setMessages(data.messages);
      }
    } catch (err) {
      console.error('Erreur chargement messages:', err);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConvId) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/messaging/conversations/${selectedConvId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newMessage })
      });
      const data = await response.json();
      if (data.success) {
        setMessages((prev) => [...prev, data.message]);
        setNewMessage('');
      }
    } catch (err) {
      console.error('Erreur envoi message:', err);
    } finally {
      setLoading(false);
    }
  };

  const currentConv = conversations.find((c) => c.id === selectedConvId);

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 grid grid-cols-1 md:grid-cols-3 h-[600px] overflow-hidden">
      <div className="border-r border-gray-100 bg-gray-50 p-4 overflow-y-auto">
        <h3 className="font-bold text-gray-800 text-lg mb-4">Mes discussions</h3>
        {conversations.length === 0 ? (
          <p className="text-sm text-gray-500">Aucune discussion en cours.</p>
        ) : (
          <div className="space-y-2">
            {conversations.map((conv) => {
              const isSelected = conv.id === selectedConvId;
              const otherParty = conv.seller_id === currentUserId ? conv.buyer_name : conv.seller_name;
              return (
                <button
                  key={conv.id}
                  onClick={() => {
                    setSelectedConvId(conv.id);
                    if (onSelectConversation) onSelectConversation(conv.id);
                  }}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    isSelected ? 'bg-amber-500 text-white shadow-sm' : 'bg-white hover:bg-gray-100 text-gray-800 border'
                  }`}
                >
                  <p className="font-semibold text-sm truncate">{conv.announcement_title || 'Annonce sans titre'}</p>
                  <p className={`text-xs ${isSelected ? 'text-amber-100' : 'text-gray-500'} mt-1`}>
                    Contact : {otherParty || 'Utilisateur Atlas'}
                  </p>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="md:col-span-2 flex flex-col h-full bg-white">
        {currentConv ? (
          <>
            <div className="p-4 border-b border-gray-100 bg-amber-50/50 flex justify-between items-center">
              <div>
                <h4 className="font-bold text-gray-900">{currentConv.announcement_title}</h4>
                <p className="text-xs text-gray-500">
                  Discussion ciblée avec {currentConv.seller_id === currentUserId ? currentConv.buyer_name : currentConv.seller_name || 'le correspondant'}
                </p>
              </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map((msg) => {
                const isMe = msg.sender_id === currentUserId;
                return (
                  <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl text-sm ${
                        isMe ? 'bg-amber-500 text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                );
              })}
            </div>

            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-100 flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Écrivez votre message au vendeur..."
                className="flex-1 border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-5 py-2 rounded-lg text-sm transition-colors"
              >
                Envoyer
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
            Sélectionnez une discussion pour afficher les échanges.
          </div>
        )}
      </div>
    </div>
  );
};

export default AtlasMessaging;