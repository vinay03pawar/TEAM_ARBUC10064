import { MoodEntry } from '../types';
import { DailyEntry, MoodPrediction } from '../types/advanced';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export const generateDailyInsights = async (
  apiKey: string,
  moodEntries: MoodEntry[],
  dailyEntries: DailyEntry[]
): Promise<string> => {
  if (!apiKey) throw new Error('API key required');

  const recentMoods = moodEntries.slice(0, 7);
  const recentMetrics = dailyEntries.slice(0, 7);

  const context = `
Recent Mood Pattern:
${recentMoods.map(m => `- ${new Date(m.timestamp).toLocaleDateString()}: ${m.mood} (intensity: ${m.intensity})`).join('\n')}

Recent Wellness Metrics:
${recentMetrics.map(m => `
- Date: ${m.date}
  Sleep: ${m.sleepHours}h | Water: ${m.waterIntake} glasses | Exercise: ${m.exerciseMinutes}min
  Energy: ${m.energyLevel}/5 | Stress: ${m.stressLevel}/5 | Anxiety: ${m.anxietyLevel}/5
`).join('\n')}
`;

  const prompt = `As an advanced mental health AI, analyze this data and provide:

1. **Key Patterns Identified** - What correlations do you see?
2. **Mood Drivers** - What's most affecting their mood?
3. **Predictive Insights** - What trends are emerging?
4. **Personalized Recommendations** - Specific, actionable advice
5. **Risk Assessment** - Any concerns to address?
6. **Positive Highlights** - What's going well?

Data:
${context}

Provide a comprehensive, structured analysis with specific insights and actionable recommendations.`;

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
          {
            role: 'system',
            content: 'You are an advanced AI mental health analyst specializing in pattern recognition, predictive analytics, and personalized wellness recommendations. Provide detailed, data-driven insights.'
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 1500,
      }),
    });

    if (!response.ok) throw new Error('Failed to generate insights');
    const data = await response.json();
    return data.choices[0]?.message?.content || 'Unable to generate insights';
  } catch (error) {
    throw error instanceof Error ? error : new Error('AI service error');
  }
};

export const predictMood = async (
  apiKey: string,
  moodEntries: MoodEntry[],
  dailyEntries: DailyEntry[]
): Promise<MoodPrediction> => {
  if (!apiKey) throw new Error('API key required');

  const prompt = `Based on this mental health data, predict tomorrow's mood and provide factors.

Recent Moods: ${moodEntries.slice(0, 7).map(m => `${m.mood}(${m.intensity})`).join(', ')}
Recent Sleep: ${dailyEntries.slice(0, 3).map(d => `${d.sleepHours}h`).join(', ')}
Recent Stress: ${dailyEntries.slice(0, 3).map(d => `${d.stressLevel}/5`).join(', ')}

Respond ONLY with valid JSON in this exact format:
{
  "predictedMood": 3.5,
  "confidence": 75,
  "factors": ["factor1", "factor2", "factor3"],
  "recommendation": "specific advice"
}`;

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
          { role: 'system', content: 'You are a predictive mental health AI. Respond only with valid JSON.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.6,
        max_tokens: 300,
      }),
    });

    const data = await response.json();
    const content = data.choices[0]?.message?.content || '{}';
    
    // Extract JSON from response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    // Fallback
    return {
      predictedMood: 3,
      confidence: 50,
      factors: ['Insufficient data for accurate prediction'],
      recommendation: 'Continue tracking your mood and wellness metrics for better predictions'
    };
  } catch (error) {
    return {
      predictedMood: 3,
      confidence: 0,
      factors: ['Error generating prediction'],
      recommendation: 'Please try again later'
    };
  }
};

export const generateWellnessPlan = async (
  apiKey: string,
  moodEntries: MoodEntry[],
  dailyEntries: DailyEntry[]
): Promise<string> => {
  if (!apiKey) throw new Error('API key required');

  const avgMood = moodEntries.length > 0 
    ? moodEntries.slice(0, 7).reduce((sum, e) => sum + e.intensity, 0) / Math.min(7, moodEntries.length)
    : 3;

  const avgSleep = dailyEntries.length > 0
    ? dailyEntries.slice(0, 7).reduce((sum, e) => sum + e.sleepHours, 0) / Math.min(7, dailyEntries.length)
    : 7;

  const prompt = `Create a personalized 7-day wellness plan for someone with:
- Average mood: ${avgMood.toFixed(1)}/5
- Average sleep: ${avgSleep.toFixed(1)} hours
- Recent patterns: ${moodEntries.slice(0, 5).map(m => m.mood).join(', ')}

Include:
1. Daily wellness goals
2. Mindfulness exercises
3. Physical activity recommendations
4. Sleep hygiene tips
5. Social connection suggestions
6. Stress management techniques
7. Nutrition advice

Make it specific, actionable, and encouraging. Format as a clear day-by-day plan.`;

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
          { role: 'system', content: 'You are a certified wellness coach creating personalized mental health plans.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.8,
        max_tokens: 2000,
      }),
    });

    const data = await response.json();
    return data.choices[0]?.message?.content || 'Unable to generate plan';
  } catch (error) {
    throw error instanceof Error ? error : new Error('Failed to generate wellness plan');
  }
};

export const generateJournalingPrompt = async (
  apiKey: string,
  moodEntries: MoodEntry[]
): Promise<string> => {
  if (!apiKey) throw new Error('API key required');

  const recentMood = moodEntries[0]?.mood || 'okay';

  const prompt = `Generate a thoughtful, therapeutic journaling prompt for someone currently feeling "${recentMood}". 
  
The prompt should:
- Be open-ended and introspective
- Encourage self-reflection
- Help process emotions
- Be compassionate and non-judgmental
- Lead to insights

Provide just the prompt, no introduction.`;

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
          { role: 'system', content: 'You are a therapeutic journaling expert.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.9,
        max_tokens: 200,
      }),
    });

    const data = await response.json();
    return data.choices[0]?.message?.content || 'What emotions are you experiencing right now, and where do you feel them in your body?';
  } catch (error) {
    return 'What emotions are you experiencing right now, and where do you feel them in your body?';
  }
};

export const analyzeMoodCorrelations = async (
  apiKey: string,
  moodEntries: MoodEntry[],
  dailyEntries: DailyEntry[]
): Promise<string> => {
  if (!apiKey) throw new Error('API key required');

  const prompt = `Analyze correlations between mood and lifestyle factors:

Mood data: ${moodEntries.slice(0, 14).map(m => `${m.mood}(${m.intensity}) - ${m.activities?.join(',') || 'none'}`).join(' | ')}

Wellness data: ${dailyEntries.slice(0, 14).map(d => 
  `Sleep:${d.sleepHours}h Exercise:${d.exerciseMinutes}m Stress:${d.stressLevel}/5`
).join(' | ')}

Identify:
1. Strongest correlations (what activities/metrics correlate with better/worse moods?)
2. Surprising patterns
3. Actionable insights
4. What to do more/less of

Be specific with data-driven insights.`;

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
          { role: 'system', content: 'You are a data analyst specializing in mental health pattern recognition.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    const data = await response.json();
    return data.choices[0]?.message?.content || 'Need more data for correlation analysis';
  } catch (error) {
    throw error instanceof Error ? error : new Error('Analysis failed');
  }
};
