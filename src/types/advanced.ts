export interface WellnessMetrics {
  sleepHours: number;
  waterIntake: number; // glasses
  exerciseMinutes: number;
  screenTime: number; // hours
  socialInteractions: number;
  energyLevel: number; // 1-5
  stressLevel: number; // 1-5
  anxietyLevel: number; // 1-5
}

export interface DailyEntry extends WellnessMetrics {
  id: string;
  date: string;
  gratitude?: string;
  timestamp: number;
}

export interface AIInsight {
  id: string;
  type: 'prediction' | 'recommendation' | 'pattern' | 'alert' | 'achievement';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  timestamp: number;
  actionable?: string;
}

export interface MoodPrediction {
  predictedMood: number; // 1-5
  confidence: number; // 0-100
  factors: string[];
  recommendation: string;
}

export interface BreathingExercise {
  id: string;
  name: string;
  description: string;
  duration: number; // seconds
  pattern: {
    inhale: number;
    hold: number;
    exhale: number;
    pause: number;
  };
  benefits: string[];
}

export interface UserGoal {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  unit: string;
  category: 'mood' | 'sleep' | 'exercise' | 'mindfulness' | 'social';
  deadline?: number;
  completed: boolean;
  createdAt: number;
}

export interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  isPrimary: boolean;
}

export interface UserPreferences {
  darkMode: boolean;
  notifications: boolean;
  reminderTime?: string;
  voiceInput: boolean;
  aiPersonality: 'compassionate' | 'motivational' | 'analytical' | 'friendly';
  language: string;
}
