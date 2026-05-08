import { useState, useEffect } from 'react';
import { DailyEntry, WellnessMetrics } from '../types/advanced';
import { Activity, Moon, Smartphone, Users, Zap, Heart, Droplets } from 'lucide-react';

interface WellnessTrackerProps {
  onSubmit: (entry: DailyEntry) => void;
  todayEntry?: DailyEntry;
}

export default function WellnessTracker({ onSubmit, todayEntry }: WellnessTrackerProps) {
  const [metrics, setMetrics] = useState<WellnessMetrics>(
    todayEntry || {
      sleepHours: 7,
      waterIntake: 4,
      exerciseMinutes: 0,
      screenTime: 4,
      socialInteractions: 0,
      energyLevel: 3,
      stressLevel: 3,
      anxietyLevel: 3,
    }
  );
  const [gratitude, setGratitude] = useState(todayEntry?.gratitude || '');

  useEffect(() => {
  if (todayEntry) {
    setMetrics({
      sleepHours: todayEntry.sleepHours,
      waterIntake: todayEntry.waterIntake,
      exerciseMinutes: todayEntry.exerciseMinutes,
      screenTime: todayEntry.screenTime,
      socialInteractions: todayEntry.socialInteractions,
      energyLevel: todayEntry.energyLevel,
      stressLevel: todayEntry.stressLevel,
      anxietyLevel: todayEntry.anxietyLevel,
    });

    setGratitude(todayEntry.gratitude || '');
  }
}, [todayEntry]);

  const handleSubmit = () => {
    const entry: DailyEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      ...metrics,
      gratitude,
      timestamp: Date.now(),
    };
    onSubmit(entry);
  };

  const MetricSlider = ({
    icon: Icon,
    label,
    value,
    onChange,
    max,
    unit,
    color,
  }: {
    icon: any;
    label: string;
    value: number;
    onChange: (v: number) => void;
    max: number;
    unit: string;
    color: string;
  }) => (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className={`w-5 h-5 ${color}`} />
          <span className="text-sm font-medium text-gray-700">{label}</span>
        </div>
        <span className="text-sm font-bold text-gray-900">
          {value} {unit}
        </span>
      </div>
      <input
        type="range"
        min="0"
        max={max}
        step={max > 10 ? 5 : 1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg appearance-none cursor-pointer slider"
      />
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl">
          <Activity className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Daily Wellness Tracking</h2>
          <p className="text-sm text-gray-600">Track your daily health metrics</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Sleep */}
        <MetricSlider
          icon={Moon}
          label="Sleep Duration"
          value={metrics.sleepHours}
          onChange={(v) => setMetrics({ ...metrics, sleepHours: v })}
          max={12}
          unit="hours"
          color="text-indigo-500"
        />

        {/* Water */}
        <MetricSlider
          icon={Droplets}
          label="Water Intake"
          value={metrics.waterIntake}
          onChange={(v) => setMetrics({ ...metrics, waterIntake: v })}
          max={12}
          unit="glasses"
          color="text-blue-500"
        />

        {/* Exercise */}
        <MetricSlider
          icon={Activity}
          label="Exercise"
          value={metrics.exerciseMinutes}
          onChange={(v) => setMetrics({ ...metrics, exerciseMinutes: v })}
          max={180}
          unit="min"
          color="text-green-500"
        />

        {/* Screen Time */}
        <MetricSlider
          icon={Smartphone}
          label="Screen Time"
          value={metrics.screenTime}
          onChange={(v) => setMetrics({ ...metrics, screenTime: v })}
          max={16}
          unit="hours"
          color="text-orange-500"
        />

        {/* Social Interactions */}
        <MetricSlider
          icon={Users}
          label="Social Interactions"
          value={metrics.socialInteractions}
          onChange={(v) => setMetrics({ ...metrics, socialInteractions: v })}
          max={10}
          unit="people"
          color="text-pink-500"
        />

        {/* Energy Level */}
        <MetricSlider
          icon={Zap}
          label="Energy Level"
          value={metrics.energyLevel}
          onChange={(v) => setMetrics({ ...metrics, energyLevel: v })}
          max={5}
          unit="/5"
          color="text-yellow-500"
        />

        {/* Stress Level */}
        <MetricSlider
          icon={Heart}
          label="Stress Level"
          value={metrics.stressLevel}
          onChange={(v) => setMetrics({ ...metrics, stressLevel: v })}
          max={5}
          unit="/5"
          color="text-red-500"
        />

        {/* Anxiety Level */}
        <MetricSlider
          icon={Heart}
          label="Anxiety Level"
          value={metrics.anxietyLevel}
          onChange={(v) => setMetrics({ ...metrics, anxietyLevel: v })}
          max={5}
          unit="/5"
          color="text-purple-500"
        />
      </div>

      {/* Gratitude Journal */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <span>✨</span>
          What are you grateful for today?
        </label>
        <textarea
          value={gratitude}
          onChange={(e) => setGratitude(e.target.value)}
          placeholder="Express gratitude..."
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
          rows={3}
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
      >
        Save Today's Wellness Data
      </button>
    </div>
  );
}
