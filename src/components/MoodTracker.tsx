import { useState } from 'react';
import { MoodType } from '../types';
import { getMoodEmoji } from '../utils/moodAnalytics';
import { Smile } from 'lucide-react';

interface MoodTrackerProps {
  onSubmit: (mood: MoodType, intensity: number, note: string, activities: string[]) => void;
}

const moods: MoodType[] = ['great', 'good', 'okay', 'bad', 'terrible'];

const commonActivities = [
  'Exercise', 'Meditation', 'Work', 'Social', 'Sleep', 
  'Hobby', 'Reading', 'Music', 'Nature', 'Family'
];

export default function MoodTracker({ onSubmit }: MoodTrackerProps) {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [intensity, setIntensity] = useState(3);
  const [note, setNote] = useState('');
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);

  const handleSubmit = () => {
    if (!selectedMood) return;
    
    onSubmit(selectedMood, intensity, note, selectedActivities);
    
    // Reset form
    setSelectedMood(null);
    setIntensity(3);
    setNote('');
    setSelectedActivities([]);
  };

  const toggleActivity = (activity: string) => {
    setSelectedActivities(prev =>
      prev.includes(activity)
        ? prev.filter(a => a !== activity)
        : [...prev, activity]
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
          <Smile className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">How are you feeling?</h2>
      </div>

      {/* Mood Selection */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-700">Select your mood</label>
        <div className="grid grid-cols-5 gap-3">
          {moods.map((mood) => (
            <button
              key={mood}
              onClick={() => setSelectedMood(mood)}
              className={`p-4 rounded-xl transition-all ${
                selectedMood === mood
                  ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg scale-105'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <div className="text-3xl mb-1">{getMoodEmoji(mood)}</div>
              <div className={`text-xs font-medium capitalize ${
                selectedMood === mood ? 'text-white' : 'text-gray-600'
              }`}>
                {mood}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Intensity Slider */}
      {selectedMood && (
        <>
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">
              Intensity: {intensity}/5
            </label>
            <input
              type="range"
              min="1"
              max="5"
              value={intensity}
              onChange={(e) => setIntensity(Number(e.target.value))}
              className="w-full h-2 bg-gradient-to-r from-purple-200 to-pink-200 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          {/* Activities */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">What did you do today?</label>
            <div className="flex flex-wrap gap-2">
              {commonActivities.map((activity) => (
                <button
                  key={activity}
                  onClick={() => toggleActivity(activity)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    selectedActivities.includes(activity)
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {activity}
                </button>
              ))}
            </div>
          </div>

          {/* Note */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Add a note (optional)</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              rows={3}
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
          >
            Save Mood Entry
          </button>
        </>
      )}
    </div>
  );
}
