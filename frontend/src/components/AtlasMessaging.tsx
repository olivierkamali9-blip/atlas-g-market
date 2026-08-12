import React, { useState } from 'react';

const AtlasMessaging = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Envoyer le message
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="msg">Message</label>
      <textarea id="msg" rows={3} placeholder="Écris ton message..." value={message} onChange={(e) => setMessage(e.target.value)} />
      <button className="atlas-btn" type="submit">Envoyer</button>
    </form>
  );
};

export default AtlasMessaging;
