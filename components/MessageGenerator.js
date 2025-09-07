import React, { useState } from 'react';
import { generateMessage } from '../services/api';

function MessageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError(null);

    try {
      const generated = await generateMessage(prompt);
      setMessage(generated);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div>
      <h1>Message Generator</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the message context..."
          rows={4}
          cols={50}
          required
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Message'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {message && (
        <div>
          <h2>Generated Message:</h2>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}

export default MessageGenerator;