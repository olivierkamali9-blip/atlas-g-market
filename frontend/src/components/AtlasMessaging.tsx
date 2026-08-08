import React, { useState } from 'react';
import { Send, User, Paperclip, CheckCheck } from 'lucide-react';

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  isMe: boolean;
}

export interface Conversation {
  id: string;
  adTitle: string;
  contactName: string;
  lastMessage: string;
  updatedAt: string;
}

export const AtlasMessaging: React.FC = () => {
  const [conversations] = useState<Conversation[]>([
    { id: '1', adTitle: 'iPhone 13 Pro 128Go', contactName: 'Thomas R.', lastMessage: 'Est-il toujours disponible ?', updatedAt: '10:42' },
    { id: '2', adTitle: 'Mission Développeur React', contactName: 'Inès (CPO)', lastMessage: 'Pouvez-vous démarrer lundi ?', updatedAt: 'Hier' }
  ]);

  const [activeConvId, setActiveConvId] = useState<string>('1');
  const [messages, setMessages] = useState<Message[]>([
    { id: 'm1', senderId: 'u2', senderName: 'Thomas R.', content: 'Bonjour, l’offre est-elle toujours d’actualité ?', timestamp: '10:30', isMe: false },
    { id: 'm2', senderId: 'me', senderName: 'Moi', content: 'Bonjour ! Oui, toujours disponible.', timestamp: '10:35', isMe: true },
    { id: 'm3', senderId: 'u2', senderName: 'Thomas R.', content: 'Est-il possible de négocier la livraison ?', timestamp: '10:42', isMe: false }
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const msg: Message = {
      id: Date.now().toString(),
      senderId: 'me',
      senderName: 'Moi',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };

    setMessages(prev => [...prev, msg]);
    setNewMessage('');
  };

  const activeConv = conversations.find(c => c.id === activeConvId);

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md border border-gray-100 flex h-[650px] my-6 overflow-hidden">
      {/* Liste des discussions */}
      <div className="w-1/3 border-r border-gray-200 flex flex-col bg-gray-50">
        <div className="p-4 border-b border-gray-200 bg-white">
          <h3 className="font-bold text-gray-800 text-lg">Messagerie Atlas</h3>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map(conv => (
            <div
              key={conv.id}
              onClick={() => setActiveConvId(conv.id)}
              className={`p-4 border-b border-gray-100 cursor-pointer transition ${
                conv.id === activeConvId ? 'bg-blue-50 border-l-4 border-l-blue-600' : 'hover:bg-gray-100'
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className="font-semibold text-gray-900 text-sm truncate">{conv.contactName}</span>
                <span className="text-xs text-gray-400">{conv.updatedAt}</span>
              </div>
              <p className="text-xs font-medium text-blue-600 truncate mb-1">{conv.adTitle}</p>
              <p className="text-xs text-gray-500 truncate">{conv.lastMessage}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Zone de chat */}
      <div className="w-2/3 flex flex-col justify-between bg-white">
        {/* En-tête du chat */}
        {activeConv && (
          <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white">
            <div>
              <h4 className="font-bold text-gray-800">{activeConv.contactName}</h4>
              <p className="text-xs text-gray-500">Au sujet de : <span className="font-medium text-gray-700">{activeConv.adTitle}</span></p>
            </div>
          </div>
        )}

        {/* Fil des messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50">
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-md px-4 py-2.5 rounded-2xl text-sm shadow-sm ${
                  msg.isMe
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                }`}
              >
                <p>{msg.content}</p>
                <div className={`flex items-center justify-end gap-1 text-[10px] mt-1 ${msg.isMe ? 'text-blue-100' : 'text-gray-400'}`}>
                  <span>{msg.timestamp}</span>
                  {msg.isMe && <CheckCheck className="h-3 w-3" />}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Saisie du message */}
        <form onSubmit={handleSend} className="p-3 border-t border-gray-200 flex items-center gap-2 bg-white">
          <button type="button" className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
            <Paperclip className="h-5 w-5" />
          </button>
          <input
            type="text"
            placeholder="Écrivez votre message..."
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            className="flex-1 p-2.5 bg-gray-50 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-lg transition duration-150"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
};