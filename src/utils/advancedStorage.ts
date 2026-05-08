import { DailyEntry, UserGoal, EmergencyContact, UserPreferences } from '../types/advanced';

const DAILY_ENTRIES_KEY = 'mindcare_daily_entries';
const GOALS_KEY = 'mindcare_goals';
const EMERGENCY_CONTACTS_KEY = 'mindcare_emergency_contacts';
const PREFERENCES_KEY = 'mindcare_preferences';

export const advancedStorageUtils = {
  // Daily Entries
  getDailyEntries: (): DailyEntry[] => {
  try {
    const data = localStorage.getItem(DAILY_ENTRIES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading daily entries:', error);
    return [];
  }
},

  saveDailyEntry: (entry: DailyEntry): void => {
  try {
    const entries = advancedStorageUtils.getDailyEntries();

    const filtered = entries.filter(
      e => e.date !== entry.date
    );

    filtered.unshift(entry);

    localStorage.setItem(
      DAILY_ENTRIES_KEY,
      JSON.stringify(filtered)
    );

    console.log('Wellness data saved successfully');
  } catch (error) {
    console.error('Error saving wellness data:', error);
  }
},

  deleteDailyEntry: (id: string): void => {
    const entries = advancedStorageUtils.getDailyEntries();
    const filtered = entries.filter(entry => entry.id !== id);
    localStorage.setItem(DAILY_ENTRIES_KEY, JSON.stringify(filtered));
  },

  // Goals
  getGoals: (): UserGoal[] => {
    const data = localStorage.getItem(GOALS_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveGoal: (goal: UserGoal): void => {
    const goals = advancedStorageUtils.getGoals();
    const index = goals.findIndex(g => g.id === goal.id);
    if (index >= 0) {
      goals[index] = goal;
    } else {
      goals.push(goal);
    }
    localStorage.setItem(GOALS_KEY, JSON.stringify(goals));
  },

  deleteGoal: (id: string): void => {
    const goals = advancedStorageUtils.getGoals();
    const filtered = goals.filter(goal => goal.id !== id);
    localStorage.setItem(GOALS_KEY, JSON.stringify(filtered));
  },

  // Emergency Contacts
  getEmergencyContacts: (): EmergencyContact[] => {
    const data = localStorage.getItem(EMERGENCY_CONTACTS_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveEmergencyContact: (contact: EmergencyContact): void => {
    const contacts = advancedStorageUtils.getEmergencyContacts();
    const index = contacts.findIndex(c => c.id === contact.id);
    if (index >= 0) {
      contacts[index] = contact;
    } else {
      contacts.push(contact);
    }
    localStorage.setItem(EMERGENCY_CONTACTS_KEY, JSON.stringify(contacts));
  },

  deleteEmergencyContact: (id: string): void => {
    const contacts = advancedStorageUtils.getEmergencyContacts();
    const filtered = contacts.filter(contact => contact.id !== id);
    localStorage.setItem(EMERGENCY_CONTACTS_KEY, JSON.stringify(filtered));
  },

  // Preferences
  getPreferences: (): UserPreferences => {
    const data = localStorage.getItem(PREFERENCES_KEY);
    return data ? JSON.parse(data) : {
      darkMode: false,
      notifications: false,
      voiceInput: false,
      aiPersonality: 'compassionate',
      language: 'en',
    };
  },

  savePreferences: (preferences: UserPreferences): void => {
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
  },
};
