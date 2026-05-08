import { MoodEntry, MoodType, MoodStats } from '../types';

const moodValues: Record<MoodType, number> = {
  great: 5,
  good: 4,
  okay: 3,
  bad: 2,
  terrible: 1,
};

export const calculateMoodStats = (entries: MoodEntry[]): MoodStats => {
  if (entries.length === 0) {
    return {
      averageMood: 0,
      totalEntries: 0,
      moodCounts: { great: 0, good: 0, okay: 0, bad: 0, terrible: 0 },
      trend: 'stable',
    };
  }

  // Calculate average
  const total = entries.reduce((sum, entry) => sum + moodValues[entry.mood], 0);
  const averageMood = total / entries.length;

  // Count moods
  const moodCounts: Record<MoodType, number> = {
    great: 0,
    good: 0,
    okay: 0,
    bad: 0,
    terrible: 0,
  };

  entries.forEach(entry => {
    moodCounts[entry.mood]++;
  });

  // Calculate trend (comparing recent vs older entries)
  let trend: 'improving' | 'declining' | 'stable' = 'stable';
  if (entries.length >= 4) {
    const recentCount = Math.min(entries.length, 7);
    const recentEntries = entries.slice(0, recentCount);
    const olderEntries = entries.slice(recentCount, recentCount * 2);

    if (olderEntries.length > 0) {
      const recentAvg = recentEntries.reduce((sum, e) => sum + moodValues[e.mood], 0) / recentEntries.length;
      const olderAvg = olderEntries.reduce((sum, e) => sum + moodValues[e.mood], 0) / olderEntries.length;
      
      if (recentAvg > olderAvg + 0.3) trend = 'improving';
      else if (recentAvg < olderAvg - 0.3) trend = 'declining';
    }
  }

  return {
    averageMood,
    totalEntries: entries.length,
    moodCounts,
    trend,
  };
};

export const getMoodColor = (mood: MoodType): string => {
  const colors: Record<MoodType, string> = {
    great: 'text-green-500',
    good: 'text-blue-500',
    okay: 'text-yellow-500',
    bad: 'text-orange-500',
    terrible: 'text-red-500',
  };
  return colors[mood];
};

export const getMoodBgColor = (mood: MoodType): string => {
  const colors: Record<MoodType, string> = {
    great: 'bg-green-100',
    good: 'bg-blue-100',
    okay: 'bg-yellow-100',
    bad: 'bg-orange-100',
    terrible: 'bg-red-100',
  };
  return colors[mood];
};

export const getMoodEmoji = (mood: MoodType): string => {
  const emojis: Record<MoodType, string> = {
    great: '😄',
    good: '🙂',
    okay: '😐',
    bad: '😟',
    terrible: '😢',
  };
  return emojis[mood];
};
