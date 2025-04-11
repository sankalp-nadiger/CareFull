import React, { useState } from 'react';

const LlamaChat = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse('');

    try {
      const res = await fetch(import.meta.env.VITE_GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer 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`, // Leave this if your API requires it
        },
        body: JSON.stringify({
          model: 'llama3-8b-8192',
          messages: [
            {
              role: 'system',
              content:
                'You are a highly knowledgeable and helpful Medical AI assistant. Only answer questions related to physical and mental health, healthcare conditions, symptoms, treatment, wellness, and mental well-being. Do not respond to unrelated topics.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
        }),
      });

      const data = await res.json();
      const message = data.choices[0]?.message?.content || 'No response.';
      setResponse(message);
    } catch (err) {
      console.error(err);
      setResponse('Error: Unable to get response from LLaMA.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h2>🩺 Ask the Medical AI</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your symptoms or ask a health-related question..."
          rows={4}
          style={{ width: '100%', padding: '0.5rem' }}
        />
        <button
          type="submit"
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            background: '#4a90e2',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
          }}
        >
          {loading ? 'Loading...' : 'Ask'}
        </button>
      </form>

      {response && (
        <div
          style={{
            marginTop: '1rem',
            padding: '1rem',
            background: '#f0f4f8',
            borderRadius: '5px',
            whiteSpace: 'pre-wrap',
          }}
        >
          <strong>Response:</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default LlamaChat;
