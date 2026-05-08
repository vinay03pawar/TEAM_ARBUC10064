export interface MoodEntry {
  id: string;
  mood: MoodType;
  intensity: number; // 1-5
  note: string;
  timestamp: number;
  activities?: string[];
}

export type MoodType = 'great' | 'good' | 'okay' | 'bad' | 'terrible';

export interface AIMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface MoodStats {
  averageMood: number;
  totalEntries: number;
  moodCounts: Record<MoodType, number>;
  trend: 'improving' | 'declining' | 'stable';
}
