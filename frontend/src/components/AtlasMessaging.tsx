import React, { useState } from 'react';

const AtlasMessaging = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Envoyer le message
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Message :
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
      </label>
      <button type="submit">Envoyer</button>
    </form>
  );
};

export default AtlasMessaging;