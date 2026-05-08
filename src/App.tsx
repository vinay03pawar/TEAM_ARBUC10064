import { useState, useEffect } from 'react';
import { MoodEntry, MoodType, AIMessage } from './types';
import { DailyEntry } from './types/advanced';
import { storageUtils } from './utils/storage';
import { advancedStorageUtils } from './utils/advancedStorage';
import MoodTracker from './components/MoodTracker';
import MoodHistory from './components/MoodHistory';
import Analytics from './components/Analytics';
import AIChat from './components/AIChat';
import Settings from './components/Settings';
import WellnessTracker from './components/WellnessTracker';
import AIInsights from './components/AIInsights';
import BreathingExercise from './components/BreathingExercise';
import { Brain, Menu, X, Sparkles, TrendingUp, MessageCircle, Settings as SettingsIcon, Activity, Wind } from 'lucide-react';

type Tab = 'tracker' | 'wellness' | 'analytics' | 'insights' | 'breathing' | 'ai' | 'settings';

const API_KEY_STORAGE = 'mindcare_groq_api_key';

export default function App() {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [dailyEntries, setDailyEntries] = useState<DailyEntry[]>([]);
  const [aiMessages, setAiMessages] = useState<AIMessage[]>([]);
  const [apiKey, setApiKey] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('tracker');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Load data on mount
  useEffect(() => {
    const entries = storageUtils.getMoodEntries();
    const daily = advancedStorageUtils.getDailyEntries();
    const messages = storageUtils.getAIMessages();
    const savedApiKey = localStorage.getItem(API_KEY_STORAGE) || '';
    
    setMoodEntries(entries);
    setDailyEntries(daily);
    setAiMessages(messages);
    setApiKey(savedApiKey);
  }, []);

  const handleAddMoodEntry = (mood: MoodType, intensity: number, note: string, activities: string[]) => {
    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      mood,
      intensity,
      note,
      activities,
      timestamp: Date.now(),
    };

    storageUtils.saveMoodEntry(newEntry);
    setMoodEntries([newEntry, ...moodEntries]);
  };

  const handleDeleteMoodEntry = (id: string) => {
    storageUtils.deleteMoodEntry(id);
    setMoodEntries(moodEntries.filter(entry => entry.id !== id));
  };

  const handleAddDailyEntry = (entry: DailyEntry) => {
    advancedStorageUtils.saveDailyEntry(entry);
    const allEntries = advancedStorageUtils.getDailyEntries();
    setDailyEntries(allEntries);
  };

  const handleAIMessage = (message: AIMessage) => {
    storageUtils.saveAIMessage(message);
    setAiMessages([...aiMessages, message]);
  };

  const handleApiKeyChange = (key: string) => {
    setApiKey(key);
    localStorage.setItem(API_KEY_STORAGE, key);
  };

  const tabs = [
    { id: 'tracker' as Tab, label: 'Mood', icon: Brain, color: 'from-purple-500 to-pink-500' },
    { id: 'wellness' as Tab, label: 'Wellness', icon: Activity, color: 'from-cyan-500 to-blue-500' },
    { id: 'analytics' as Tab, label: 'Analytics', icon: TrendingUp, color: 'from-indigo-500 to-purple-500' },
    { id: 'insights' as Tab, label: 'AI Insights', icon: Sparkles, color: 'from-violet-500 to-purple-600' },
    { id: 'breathing' as Tab, label: 'Breathwork', icon: Wind, color: 'from-teal-500 to-cyan-500' },
    { id: 'ai' as Tab, label: 'AI Chat', icon: MessageCircle, color: 'from-emerald-500 to-teal-500' },
    { id: 'settings' as Tab, label: 'Settings', icon: SettingsIcon, color: 'from-gray-600 to-gray-800' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-40 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50 relative">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  MindCare AI
                </h1>
                <p className="text-xs text-gray-600">Advanced Mental Health Monitor</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl font-medium transition-all ${
                      activeTab === tab.id
                        ? `bg-gradient-to-r ${tab.color} text-white shadow-lg scale-105`
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{tab.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="lg:hidden mt-4 flex flex-col gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all text-left ${
                      activeTab === tab.id
                        ? `bg-gradient-to-r ${tab.color} text-white shadow-lg`
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 relative">
        {activeTab === 'tracker' && (
          <div className="grid lg:grid-cols-2 gap-6">
            <div>
              <MoodTracker onSubmit={handleAddMoodEntry} />
            </div>
            <div>
              <MoodHistory entries={moodEntries} onDelete={handleDeleteMoodEntry} />
            </div>
          </div>
        )}

        {activeTab === 'wellness' && (
          <div className="max-w-4xl mx-auto">
            <WellnessTracker 
              onSubmit={handleAddDailyEntry}
              todayEntry={dailyEntries.find(e => e.date === new Date().toISOString().split('T')[0])}
            />
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="max-w-5xl mx-auto">
            <Analytics entries={moodEntries} />
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="max-w-5xl mx-auto">
            <AIInsights 
  key={dailyEntries.length}
  apiKey={apiKey}
  moodEntries={moodEntries}
  dailyEntries={dailyEntries}
/>
          </div>
        )}

        {activeTab === 'breathing' && (
          <div className="max-w-3xl mx-auto">
            <BreathingExercise />
          </div>
        )}

        {activeTab === 'ai' && (
          <div className="max-w-4xl mx-auto">
            <AIChat
              apiKey={apiKey}
              moodEntries={moodEntries}
              messages={aiMessages}
              onMessageSent={handleAIMessage}
            />
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-3xl mx-auto">
            <Settings apiKey={apiKey} onApiKeyChange={handleApiKeyChange} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white/50 backdrop-blur-sm mt-12 py-6 relative">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-600">
            <span className="font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              MindCare AI
            </span> - Your Advanced Mental Health Companion
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Powered by AI • Privacy-First • Always Here for You
          </p>
          <p className="text-xs text-gray-500 mt-1">
            ⚠️ This is a wellness tool, not a replacement for professional care.
          </p>
        </div>
      </footer>
    </div>
  );
}
