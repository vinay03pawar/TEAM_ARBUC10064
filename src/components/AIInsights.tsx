import { useState } from 'react';
import { MoodEntry } from '../types';
import { DailyEntry, MoodPrediction } from '../types/advanced';
import { generateDailyInsights, predictMood, generateWellnessPlan, analyzeMoodCorrelations, generateJournalingPrompt } from '../services/advancedAI';
import { Brain, TrendingUp, Calendar, LineChart, BookOpen, Loader2, Sparkles } from 'lucide-react';

interface AIInsightsProps {
  apiKey: string;
  moodEntries: MoodEntry[];
  dailyEntries: DailyEntry[];
}

export default function AIInsights({ apiKey, moodEntries, dailyEntries }: AIInsightsProps) {
  const [activeTab, setActiveTab] = useState<'insights' | 'prediction' | 'plan' | 'correlations' | 'journal'>('insights');
  const [content, setContent] = useState<string>('');
  const [prediction, setPrediction] = useState<MoodPrediction | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateInsights = async () => {
    setLoading(true);
    try {
      const insights = await generateDailyInsights(apiKey, moodEntries, dailyEntries);
      setContent(insights);
    } catch (error) {
      setContent(error instanceof Error ? error.message : 'Failed to generate insights');
    } finally {
      setLoading(false);
    }
  };

  const handlePredictMood = async () => {
    setLoading(true);
    try {
      const pred = await predictMood(apiKey, moodEntries, dailyEntries);
      setPrediction(pred);
    } catch (error) {
      setContent(error instanceof Error ? error.message : 'Failed to predict mood');
    } finally {
      setLoading(false);
    }
  };

  const handleGeneratePlan = async () => {
    setLoading(true);
    try {
      const plan = await generateWellnessPlan(apiKey, moodEntries, dailyEntries);
      setContent(plan);
    } catch (error) {
      setContent(error instanceof Error ? error.message : 'Failed to generate plan');
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyzeCorrelations = async () => {
    setLoading(true);
    try {
      const analysis = await analyzeMoodCorrelations(apiKey, moodEntries, dailyEntries);
      setContent(analysis);
    } catch (error) {
      setContent(error instanceof Error ? error.message : 'Failed to analyze correlations');
    } finally {
      setLoading(false);
    }
  };

  const handleGeneratePrompt = async () => {
    setLoading(true);
    try {
      const prompt = await generateJournalingPrompt(apiKey, moodEntries);
      setContent(prompt);
    } catch (error) {
      setContent(error instanceof Error ? error.message : 'Failed to generate prompt');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'insights' as const, label: 'Daily Insights', icon: Brain },
    { id: 'prediction' as const, label: 'Mood Prediction', icon: TrendingUp },
    { id: 'plan' as const, label: 'Wellness Plan', icon: Calendar },
    { id: 'correlations' as const, label: 'Patterns', icon: LineChart },
    { id: 'journal' as const, label: 'Journal Prompt', icon: BookOpen },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Advanced AI Insights</h2>
          <p className="text-sm text-gray-600">Powered by predictive analytics & machine learning</p>
        </div>
      </div>

      {!apiKey && (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">Add your Groq API key in settings to unlock AI insights.</p>
        </div>
      )}

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setContent('');
                setPrediction(null);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <div className="min-h-[300px] space-y-4">
        {activeTab === 'insights' && (
          <div className="space-y-4">
            <button
              onClick={handleGenerateInsights}
              disabled={loading || !apiKey || moodEntries.length === 0}
              className="w-full py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Brain className="w-5 h-5" />
                  Generate Daily Insights
                </>
              )}
            </button>
            {content && (
              <div className="p-4 bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl">
                <pre className="whitespace-pre-wrap text-sm text-gray-800 font-sans">{content}</pre>
              </div>
            )}
          </div>
        )}

        {activeTab === 'prediction' && (
          <div className="space-y-4">
            <button
              onClick={handlePredictMood}
              disabled={loading || !apiKey || moodEntries.length < 3}
              className="w-full py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Predicting...
                </>
              ) : (
                <>
                  <TrendingUp className="w-5 h-5" />
                  Predict Tomorrow's Mood
                </>
              )}
            </button>
            {prediction && (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
                    <p className="text-sm text-gray-600 mb-2">Predicted Mood Score</p>
                    <p className="text-4xl font-bold text-blue-600">{prediction.predictedMood.toFixed(1)}/5</p>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                    <p className="text-sm text-gray-600 mb-2">Confidence</p>
                    <p className="text-4xl font-bold text-green-600">{prediction.confidence}%</p>
                  </div>
                </div>
                <div className="p-4 bg-purple-50 rounded-xl">
                  <p className="font-semibold text-purple-900 mb-2">Key Factors:</p>
                  <ul className="space-y-1">
                    {prediction.factors.map((factor, i) => (
                      <li key={i} className="text-sm text-purple-800 flex items-start gap-2">
                        <span className="text-purple-500">•</span>
                        {factor}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl">
                  <p className="font-semibold text-purple-900 mb-2">Recommendation:</p>
                  <p className="text-sm text-purple-800">{prediction.recommendation}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'plan' && (
          <div className="space-y-4">
            <button
              onClick={handleGeneratePlan}
              disabled={loading || !apiKey || moodEntries.length === 0}
              className="w-full py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating Plan...
                </>
              ) : (
                <>
                  <Calendar className="w-5 h-5" />
                  Generate 7-Day Wellness Plan
                </>
              )}
            </button>
            {content && (
              <div className="p-4 bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl">
                <pre className="whitespace-pre-wrap text-sm text-gray-800 font-sans">{content}</pre>
              </div>
            )}
          </div>
        )}

        {activeTab === 'correlations' && (
          <div className="space-y-4">
            <button
              onClick={handleAnalyzeCorrelations}
              disabled={loading || !apiKey || moodEntries.length < 5 || dailyEntries.length < 3}
              className="w-full py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <LineChart className="w-5 h-5" />
                  Analyze Mood Patterns & Correlations
                </>
              )}
            </button>
            {moodEntries.length < 5 && (
              <p className="text-sm text-gray-600 text-center">
                Track at least 5 mood entries to see correlations
              </p>
            )}
            {content && (
              <div className="p-4 bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl">
                <pre className="whitespace-pre-wrap text-sm text-gray-800 font-sans">{content}</pre>
              </div>
            )}
          </div>
        )}

        {activeTab === 'journal' && (
          <div className="space-y-4">
            <button
              onClick={handleGeneratePrompt}
              disabled={loading || !apiKey}
              className="w-full py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <BookOpen className="w-5 h-5" />
                  Generate Journaling Prompt
                </>
              )}
            </button>
            {content && (
              <div className="p-6 bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl border-l-4 border-violet-500">
                <p className="text-lg text-gray-800 italic leading-relaxed">{content}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
