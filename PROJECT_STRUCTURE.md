# Project Structure

```
mindcare-app/
├── public/                     # Static assets
├── src/
│   ├── components/            # React components
│   │   ├── AIChat.tsx        # AI chatbot interface
│   │   ├── Analytics.tsx      # Charts and statistics
│   │   ├── MoodHistory.tsx    # List of mood entries
│   │   ├── MoodTracker.tsx    # Mood input form
│   │   └── Settings.tsx       # API key and settings
│   │
│   ├── services/              # External API services
│   │   └── groqService.ts     # Groq AI integration
│   │
│   ├── types/                 # TypeScript type definitions
│   │   └── index.ts           # MoodEntry, AIMessage, etc.
│   │
│   ├── utils/                 # Utility functions
│   │   ├── cn.ts              # Class name utilities
│   │   ├── moodAnalytics.ts   # Mood calculations
│   │   └── storage.ts         # localStorage helpers
│   │
│   ├── App.tsx                # Main application component
│   ├── main.tsx               # Application entry point
│   └── index.css              # Global styles
│
├── index.html                 # HTML template
├── package.json               # Dependencies
├── tsconfig.json              # TypeScript config
├── vite.config.ts             # Vite build config
├── tailwind.config.js         # Tailwind CSS config
├── README.md                  # Full documentation
├── QUICK_START.md             # Quick start guide
└── .env.example               # Environment variables example
```

## Component Breakdown

### App.tsx
- Main application shell
- State management for mood entries, AI messages, and API key
- Tab navigation (Tracker, Analytics, AI Support, Settings)
- Responsive header and layout

### MoodTracker.tsx
- Mood selection interface (5 moods)
- Intensity slider (1-5)
- Activity tags
- Note input
- Form submission

### MoodHistory.tsx
- Displays all mood entries
- Formatted timestamps
- Delete functionality
- Color-coded by mood
- Responsive cards

### Analytics.tsx
- 14-day line chart (mood trends)
- Pie chart (mood distribution)
- Statistics cards
- Trend calculation
- Recharts integration

### AIChat.tsx
- Chat interface with AI
- Message history
- "Get Insights" button
- Loading states
- Auto-scroll to latest message

### Settings.tsx
- API key input (with show/hide)
- Save functionality
- Instructions for getting API key
- Privacy information
- Disclaimers

## Services

### groqService.ts
- `generateMentalHealthRecommendation()` - Analyzes mood history
- `chatWithAI()` - Interactive chat with context
- Groq API integration
- Error handling

## Utils

### storage.ts
- `getMoodEntries()` - Load mood entries from localStorage
- `saveMoodEntry()` - Save new mood entry
- `deleteMoodEntry()` - Remove mood entry
- `getAIMessages()` - Load chat history
- `saveAIMessage()` - Save chat message
- `clearAIMessages()` - Clear chat history

### moodAnalytics.ts
- `calculateMoodStats()` - Compute statistics
- `getMoodColor()` - Get Tailwind color class
- `getMoodBgColor()` - Get background color
- `getMoodEmoji()` - Get emoji for mood

## Types

### MoodEntry
```typescript
{
  id: string;
  mood: 'great' | 'good' | 'okay' | 'bad' | 'terrible';
  intensity: number; // 1-5
  note: string;
  timestamp: number;
  activities?: string[];
}
```

### AIMessage
```typescript
{
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}
```

### MoodStats
```typescript
{
  averageMood: number;
  totalEntries: number;
  moodCounts: Record<MoodType, number>;
  trend: 'improving' | 'declining' | 'stable';
}
```

## Key Dependencies

- **react** (^18.3.1) - UI framework
- **typescript** (^5.6.2) - Type safety
- **vite** (^7.3.2) - Build tool
- **tailwindcss** (^4.0.9) - Styling
- **recharts** (^2.15.1) - Charts
- **lucide-react** (^0.469.0) - Icons
- **date-fns** (^4.1.0) - Date formatting

## Data Flow

1. **User Input** → MoodTracker component
2. **Save Entry** → storageUtils.saveMoodEntry() → localStorage
3. **Update State** → App.tsx state updates
4. **Display** → MoodHistory & Analytics components
5. **AI Request** → groqService → Groq API → AI response
6. **Store Message** → storageUtils.saveAIMessage() → localStorage

## localStorage Keys

- `mindcare_mood_entries` - Array of MoodEntry objects
- `mindcare_ai_messages` - Array of AIMessage objects
- `mindcare_groq_api_key` - Encrypted API key string

## Build Process

1. `npm run dev` - Start development server (Vite)
2. `npm run build` - Build for production
3. Output: `dist/index.html` - Single HTML file with inlined CSS/JS

## Customization

### Change Colors
Edit gradient classes in components:
- Primary: `from-purple-500 to-pink-500`
- Secondary: `from-blue-500 to-cyan-500`

### Add New Moods
1. Update `MoodType` in `src/types/index.ts`
2. Update `moodValues` in `src/utils/moodAnalytics.ts`
3. Add colors and emojis in utility functions

### Modify AI Prompts
Edit system prompts in `src/services/groqService.ts`

## Performance Notes

- Uses local storage for instant data access
- Charts rendered only when analytics tab is active
- AI messages limited to last 10 for context
- Mood entries displayed in reverse chronological order
- Responsive design optimized for mobile and desktop
