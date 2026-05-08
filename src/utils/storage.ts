import { MoodEntry, AIMessage } from '../types';

const MOOD_ENTRIES_KEY = 'mindcare_mood_entries';
const AI_MESSAGES_KEY = 'mindcare_ai_messages';

export const storageUtils = {
  // Mood Entries
  getMoodEntries: (): MoodEntry[] => {
    const data = localStorage.getItem(MOOD_ENTRIES_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveMoodEntry: (entry: MoodEntry): void => {
    const entries = storageUtils.getMoodEntries();
    entries.unshift(entry); // Add to beginning
    localStorage.setItem(MOOD_ENTRIES_KEY, JSON.stringify(entries));
  },

  deleteMoodEntry: (id: string): void => {
    const entries = storageUtils.getMoodEntries();
    const filtered = entries.filter(entry => entry.id !== id);
    localStorage.setItem(MOOD_ENTRIES_KEY, JSON.stringify(filtered));
  },

  // AI Messages
  getAIMessages: (): AIMessage[] => {
    const data = localStorage.getItem(AI_MESSAGES_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveAIMessage: (message: AIMessage): void => {
    const messages = storageUtils.getAIMessages();
    messages.push(message);
    localStorage.setItem(AI_MESSAGES_KEY, JSON.stringify(messages));
  },

  clearAIMessages: (): void => {
    localStorage.setItem(AI_MESSAGES_KEY, JSON.stringify([]));
  }
};
