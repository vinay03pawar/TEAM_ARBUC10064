import { MoodEntry } from '../types';
import { getMoodEmoji, getMoodBgColor, getMoodColor } from '../utils/moodAnalytics';
import { format } from 'date-fns';
import { History, Trash2 } from 'lucide-react';

interface MoodHistoryProps {
  entries: MoodEntry[];
  onDelete: (id: string) => void;
}

export default function MoodHistory({ entries, onDelete }: MoodHistoryProps) {
  if (entries.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl">
            <History className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Mood History</h2>
        </div>
        <p className="text-gray-500 text-center py-8">No mood entries yet. Start tracking your mood above!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl">
          <History className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Mood History</h2>
      </div>

      <div className="space-y-3 max-h-[500px] overflow-y-auto">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className={`${getMoodBgColor(entry.mood)} rounded-xl p-4 transition-all hover:shadow-md`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <div className="text-3xl">{getMoodEmoji(entry.mood)}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`font-bold capitalize ${getMoodColor(entry.mood)}`}>
                      {entry.mood}
                    </span>
                    <span className="text-sm text-gray-500">
                      • Intensity: {entry.intensity}/5
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {format(new Date(entry.timestamp), 'PPp')}
                  </p>
                  {entry.note && (
                    <p className="text-gray-700 mb-2">{entry.note}</p>
                  )}
                  {entry.activities && entry.activities.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {entry.activities.map((activity) => (
                        <span
                          key={activity}
                          className="px-2 py-0.5 bg-white/60 rounded-full text-xs text-gray-700"
                        >
                          {activity}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={() => onDelete(entry.id)}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                title="Delete entry"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
