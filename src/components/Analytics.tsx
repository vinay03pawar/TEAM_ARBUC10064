import { MoodEntry } from '../types';
import { calculateMoodStats, getMoodColor } from '../utils/moodAnalytics';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { format, subDays } from 'date-fns';
import { BarChart3, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface AnalyticsProps {
  entries: MoodEntry[];
}

const moodValues = {
  great: 5,
  good: 4,
  okay: 3,
  bad: 2,
  terrible: 1,
};

const MOOD_COLORS = {
  great: '#10b981',
  good: '#3b82f6',
  okay: '#eab308',
  bad: '#f97316',
  terrible: '#ef4444',
};

export default function Analytics({ entries }: AnalyticsProps) {
  const stats = calculateMoodStats(entries);

  // Prepare line chart data (last 14 days)
  const last14Days = Array.from({ length: 14 }, (_, i) => {
    const date = subDays(new Date(), 13 - i);
    const dayEntries = entries.filter(entry => {
      const entryDate = new Date(entry.timestamp);
      return entryDate.toDateString() === date.toDateString();
    });

    const avgMood = dayEntries.length > 0
      ? dayEntries.reduce((sum, e) => sum + moodValues[e.mood], 0) / dayEntries.length
      : null;

    return {
      date: format(date, 'MM/dd'),
      mood: avgMood,
    };
  });

  // Prepare pie chart data
  const pieData = Object.entries(stats.moodCounts)
    .filter(([_, count]) => count > 0)
    .map(([mood, count]) => ({
      name: mood,
      value: count,
      color: MOOD_COLORS[mood as keyof typeof MOOD_COLORS],
    }));

  const getTrendIcon = () => {
    if (stats.trend === 'improving') return <TrendingUp className="w-5 h-5 text-green-500" />;
    if (stats.trend === 'declining') return <TrendingDown className="w-5 h-5 text-red-500" />;
    return <Minus className="w-5 h-5 text-gray-500" />;
  };

  const getTrendText = () => {
    if (stats.trend === 'improving') return 'Your mood is improving! 🎉';
    if (stats.trend === 'declining') return 'Consider self-care activities 💙';
    return 'Your mood is stable';
  };

  if (entries.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Analytics</h2>
        </div>
        <p className="text-gray-500 text-center py-8">Track your mood to see analytics!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl">
          <BarChart3 className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Analytics</h2>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4">
          <p className="text-sm text-gray-600 mb-1">Total Entries</p>
          <p className="text-3xl font-bold text-purple-600">{stats.totalEntries}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4">
          <p className="text-sm text-gray-600 mb-1">Average Mood</p>
          <p className="text-3xl font-bold text-blue-600">{stats.averageMood.toFixed(1)}/5</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4">
          <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
            Trend {getTrendIcon()}
          </p>
          <p className="text-sm font-medium text-gray-700">{getTrendText()}</p>
        </div>
      </div>

      {/* Mood Trend Chart */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-800">14-Day Mood Trend</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={last14Days}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
            <YAxis domain={[0, 5]} stroke="#9ca3af" fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="mood" 
              stroke="url(#colorGradient)" 
              strokeWidth={3}
              dot={{ fill: '#8b5cf6', r: 4 }}
              connectNulls
            />
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Mood Distribution */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-800">Mood Distribution</h3>
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : null}
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-800">Mood Breakdown</h3>
          <div className="space-y-2">
            {Object.entries(stats.moodCounts)
              .sort((a, b) => b[1] - a[1])
              .map(([mood, count]) => (
                <div key={mood} className="flex items-center justify-between">
                  <span className={`capitalize font-medium ${getMoodColor(mood as any)}`}>
                    {mood}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${getMoodColor(mood as any).replace('text-', 'bg-')}`}
                        style={{ width: `${(count / stats.totalEntries) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-12 text-right">{count}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
