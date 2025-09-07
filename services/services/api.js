export async function generateMessage(prompt) {
  const response = await fetch('/api/generate-message', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate message');
  }

  const data = await response.json();
  return data.message;
}