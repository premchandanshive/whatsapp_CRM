const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Access API key securely from environment variables
});
const openai = new OpenAIApi(configuration);

const SYSTEM_INSTRUCTION = `You are a message generator. The user will describe the context or purpose of the message. Your task is to generate only the final message text based on that context. Do not include any explanations, instructions, or extra text. Use placeholders like {name} where appropriate.`;

exports.generateMessage = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const fullPrompt = `${SYSTEM_INSTRUCTION}\n\n:User    ${prompt}\nOutput:`;

    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: fullPrompt,
      max_tokens: 60,
      temperature: 0.7,
      n: 1,
      stop: ['\n'],
    });

    const message = completion.data.choices[0].text.trim();
    res.json({ message });
  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ error: 'Failed to generate message' });
  }
};