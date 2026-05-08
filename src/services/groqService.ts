import { MoodEntry } from '../types';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export const generateMentalHealthRecommendation = async (
  apiKey: string,
  moodEntries: MoodEntry[],
  userMessage?: string
): Promise<string> => {
  if (!apiKey) {
    throw new Error('Please provide your Groq API key in settings');
  }

  // Prepare context from recent mood entries
  const recentEntries = moodEntries.slice(0, 10);
  const moodContext = recentEntries.map(entry => 
    `${new Date(entry.timestamp).toLocaleDateString()}: Mood was ${entry.mood}${entry.note ? ` - "${entry.note}"` : ''}`
  ).join('\n');

  const systemPrompt = `You are a compassionate and professional mental health support assistant. Your role is to:
- Provide empathetic and supportive responses
- Offer practical coping strategies and recommendations
- Suggest healthy habits and activities
- Recognize patterns in mood data
- Encourage professional help when needed
- Never diagnose or replace professional mental health care

Always be kind, understanding, and supportive. Keep responses concise and actionable.`;

  const userPrompt = userMessage || `Based on my recent mood entries, can you provide some personalized recommendations and insights?

Recent Mood History:
${moodContext || 'No mood entries yet.'}

Please analyze my mood pattern and provide helpful recommendations.`;

  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to get AI response');
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'No response received';
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to connect to Groq AI');
  }
};

export const chatWithAI = async (
  apiKey: string,
  messages: Array<{ role: 'user' | 'assistant'; content: string }>,
  newMessage: string
): Promise<string> => {
  if (!apiKey) {
    throw new Error('Please provide your Groq API key in settings');
  }

  const systemPrompt = `You are a supportive mental health companion. Listen empathetically, validate feelings, and provide gentle guidance. Encourage professional help when appropriate. Be warm, understanding, and non-judgmental.`;

  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages.slice(-10), // Last 10 messages for context
          { role: 'user', content: newMessage }
        ],
        temperature: 0.8,
        max_tokens: 512,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to get AI response');
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'No response received';
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to connect to Groq AI');
  }
};
