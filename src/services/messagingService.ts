import db from '../db';

const createMessage = async (req, res) => {
  const { text, conversationId } = req.body;
  const message = await db.createMessage(text, conversationId);
  res.json(message);
};

const getConversation = async (req, res) => {
  const id = req.params.id;
  const conversation = await db.getConversation(id);
  res.json(conversation);
};

export { createMessage, getConversation };