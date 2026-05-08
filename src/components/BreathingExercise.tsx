import { useState, useEffect, useRef } from 'react';
import { Wind, Play, Pause, RotateCcw } from 'lucide-react';

interface Exercise {
  id: string;
  name: string;
  description: string;
  pattern: {
    inhale: number;
    hold: number;
    exhale: number;
    pause: number;
  };
  benefits: string[];
  color: string;
}

const exercises: Exercise[] = [
  {
    id: '478',
    name: '4-7-8 Breathing',
    description: 'Calming technique for anxiety and sleep',
    pattern: { inhale: 4, hold: 7, exhale: 8, pause: 0 },
    benefits: ['Reduces anxiety', 'Improves sleep', 'Lowers blood pressure'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'box',
    name: 'Box Breathing',
    description: 'Used by Navy SEALs for focus and calm',
    pattern: { inhale: 4, hold: 4, exhale: 4, pause: 4 },
    benefits: ['Enhances focus', 'Reduces stress', 'Improves performance'],
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'calm',
    name: 'Calming Breath',
    description: 'Quick stress relief technique',
    pattern: { inhale: 4, hold: 2, exhale: 6, pause: 2 },
    benefits: ['Quick relaxation', 'Stress relief', 'Mental clarity'],
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'energize',
    name: 'Energizing Breath',
    description: 'Boost energy and alertness',
    pattern: { inhale: 6, hold: 2, exhale: 4, pause: 0 },
    benefits: ['Increases energy', 'Improves alertness', 'Mental boost'],
    color: 'from-orange-500 to-yellow-500',
  },
];

export default function BreathingExercise() {
  const [selectedExercise, setSelectedExercise] = useState<Exercise>(exercises[0]);
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'pause'>('inhale');
  const [timeLeft, setTimeLeft] = useState(selectedExercise.pattern.inhale);
  const [cycles, setCycles] = useState(0);
  const intervalRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Move to next phase
            const pattern = selectedExercise.pattern;
            if (phase === 'inhale') {
              if (pattern.hold > 0) {
                setPhase('hold');
                return pattern.hold;
              } else {
                setPhase('exhale');
                return pattern.exhale;
              }
            } else if (phase === 'hold') {
              setPhase('exhale');
              return pattern.exhale;
            } else if (phase === 'exhale') {
              if (pattern.pause > 0) {
                setPhase('pause');
                return pattern.pause;
              } else {
                setPhase('inhale');
                setCycles((c) => c + 1);
                return pattern.inhale;
              }
            } else {
              setPhase('inhale');
              setCycles((c) => c + 1);
              return pattern.inhale;
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, phase, selectedExercise.pattern]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setPhase('inhale');
    setTimeLeft(selectedExercise.pattern.inhale);
    setCycles(0);
  };

  const handleExerciseChange = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setIsActive(false);
    setPhase('inhale');
    setTimeLeft(exercise.pattern.inhale);
    setCycles(0);
  };

  const getPhaseText = () => {
    switch (phase) {
      case 'inhale':
        return 'Breathe In';
      case 'hold':
        return 'Hold';
      case 'exhale':
        return 'Breathe Out';
      case 'pause':
        return 'Pause';
    }
  };

  const getCircleScale = () => {
    if (phase === 'inhale') return 'scale-150';
    if (phase === 'exhale') return 'scale-75';
    return 'scale-110';
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl">
          <Wind className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Breathing Exercises</h2>
          <p className="text-sm text-gray-600">Guided breathwork for relaxation & focus</p>
        </div>
      </div>

      {/* Exercise Selection */}
      <div className="grid md:grid-cols-2 gap-3">
        {exercises.map((exercise) => (
          <button
            key={exercise.id}
            onClick={() => handleExerciseChange(exercise)}
            className={`p-4 rounded-xl text-left transition-all ${
              selectedExercise.id === exercise.id
                ? `bg-gradient-to-br ${exercise.color} text-white shadow-lg`
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <h3 className="font-semibold mb-1">{exercise.name}</h3>
            <p className={`text-sm ${selectedExercise.id === exercise.id ? 'text-white/80' : 'text-gray-600'}`}>
              {exercise.description}
            </p>
          </button>
        ))}
      </div>

      {/* Breathing Circle */}
      <div className="relative h-80 flex items-center justify-center">
        <div
          className={`absolute w-48 h-48 rounded-full bg-gradient-to-br ${selectedExercise.color} transition-all duration-1000 ease-in-out ${getCircleScale()} opacity-30`}
        />
        <div className="relative z-10 text-center">
          <p className="text-5xl font-bold text-gray-800 mb-2">{timeLeft}</p>
          <p className="text-2xl font-semibold text-gray-700">{getPhaseText()}</p>
          <p className="text-sm text-gray-500 mt-4">Cycle {cycles + 1}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        {!isActive ? (
          <button
            onClick={handleStart}
            className={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${selectedExercise.color} text-white font-semibold rounded-xl hover:shadow-lg transition-all`}
          >
            <Play className="w-5 h-5" />
            Start
          </button>
        ) : (
          <button
            onClick={handlePause}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
          >
            <Pause className="w-5 h-5" />
            Pause
          </button>
        )}
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-all"
        >
          <RotateCcw className="w-5 h-5" />
          Reset
        </button>
      </div>

      {/* Benefits */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4">
        <p className="font-semibold text-gray-800 mb-2">Benefits:</p>
        <ul className="space-y-1">
          {selectedExercise.benefits.map((benefit, i) => (
            <li key={i} className="text-sm text-gray-700 flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full bg-gradient-to-br ${selectedExercise.color}`} />
              {benefit}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
