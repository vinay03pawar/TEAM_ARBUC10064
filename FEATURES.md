# MindCare Features

A comprehensive guide to all features in MindCare - AI Mental Health Monitor.

## 📊 Mood Tracking

### Core Mood Selection
Track your emotional state with 5 distinct mood levels:
- **Great** 😄 - Feeling excellent, energized, happy
- **Good** 🙂 - Positive mood, content, satisfied
- **Okay** 😐 - Neutral, neither good nor bad
- **Bad** 😟 - Struggling, stressed, worried
- **Terrible** 😢 - Very difficult day, overwhelmed

### Intensity Rating
Rate the intensity of your mood on a 1-5 scale:
- **1** - Very mild
- **2** - Mild
- **3** - Moderate
- **4** - Strong
- **5** - Very strong

Example: Feeling "good" with intensity 5 vs "good" with intensity 2 gives deeper insight.

### Activity Tagging
Tag what you did today to identify patterns:
- 💪 **Exercise** - Physical activity, gym, sports
- 🧘 **Meditation** - Mindfulness, breathing exercises
- 💼 **Work** - Professional activities
- 👥 **Social** - Time with friends/family
- 😴 **Sleep** - Rest and sleep quality
- 🎨 **Hobby** - Creative activities, interests
- 📚 **Reading** - Books, articles, learning
- 🎵 **Music** - Listening or playing music
- 🌳 **Nature** - Outdoor time, walks
- 👨‍👩‍👧 **Family** - Quality time with family

### Personal Notes
Add context to your mood entries:
- What happened today?
- What triggered your mood?
- Thoughts and reflections
- Goals or concerns

### Mood History
View all your entries with:
- Color-coded mood indicators
- Full timestamps
- Notes and activities
- Delete option for privacy
- Auto-scroll through history

## 📈 Analytics Dashboard

### Summary Statistics
Quick overview cards showing:
- **Total Entries** - How many times you've checked in
- **Average Mood** - Overall mood score (1-5 scale)
- **Trend Indicator** - Are things improving, stable, or declining?

### 14-Day Mood Trend Chart
Interactive line chart displaying:
- Daily average mood over 2 weeks
- Visual trend line
- Hover tooltips with exact values
- Gradient styling for visual appeal
- Empty days shown as gaps (encourages consistency)

### Mood Distribution
Pie chart visualization showing:
- Percentage breakdown of each mood
- Color-coded segments
- Interactive tooltips
- Visual representation of emotional patterns

### Detailed Breakdown
Bar-style progress indicators showing:
- Count of each mood type
- Percentage distribution
- Sorted by frequency
- Easy-to-read format

### Trend Analysis
Intelligent trend detection:
- **Improving** 📈 - Recent moods better than older ones
- **Declining** 📉 - Recent moods worse than older ones
- **Stable** ➖ - Consistent mood patterns

Algorithm compares recent 7 entries vs previous 7 entries.

## 🤖 AI Support (Groq-Powered)

### AI Chat Companion
Interactive chatbot providing:
- Empathetic responses
- Active listening
- Non-judgmental support
- Context-aware conversations
- Maintains conversation history

### Personalized Insights
Click "Get Insights" for:
- Analysis of your mood patterns
- Personalized recommendations
- Coping strategies
- Healthy habit suggestions
- Pattern recognition

### Context-Aware Recommendations
AI considers:
- Your recent mood entries (last 10)
- Mood patterns and trends
- Activities you've logged
- Notes you've added
- Overall mood trajectory

### Sample AI Capabilities
The AI can help with:
- **Stress Management** - "I'm feeling stressed about work"
- **Anxiety Support** - "I've been anxious lately"
- **Mood Boosts** - "I need motivation"
- **Sleep Issues** - "I can't sleep well"
- **Relationship Concerns** - "I'm having conflicts"
- **General Support** - Open conversation about feelings

### Safety Features
- Encourages professional help when needed
- Never provides medical diagnoses
- Reminds users it's a support tool, not therapy
- Validates feelings while promoting healthy coping

## ⚙️ Settings

### API Key Management
Secure handling of your Groq API key:
- **Show/Hide Toggle** - Keep key private while entering
- **Local Storage** - Saved in your browser only
- **Validation** - Tested on first use
- **Update Anytime** - Change keys as needed

### Privacy Information
Clear explanations of:
- What data is stored
- Where it's stored (browser only)
- What's sent to Groq AI
- How to clear your data

### Getting Started Guide
Step-by-step instructions:
1. How to get a free Groq API key
2. Where to paste it
3. How to test it works
4. Troubleshooting tips

### App Information
Details about:
- MindCare purpose
- Technology used
- Privacy approach
- Mental health disclaimers

### Important Disclaimers
Prominent warnings about:
- Not a substitute for professional care
- When to seek emergency help
- Crisis hotline information
- Limitations of AI support

## 🎨 Design Features

### Responsive Layout
Works perfectly on:
- 📱 Mobile phones (320px+)
- 📱 Tablets (768px+)
- 💻 Laptops (1024px+)
- 🖥️ Desktop monitors (1920px+)

### Color-Coded System
Moods have distinct colors:
- **Great** - Green (positive, growth)
- **Good** - Blue (calm, stable)
- **Okay** - Yellow (neutral, caution)
- **Bad** - Orange (concern, alert)
- **Terrible** - Red (urgent, distress)

### Gradient Accents
Beautiful gradients throughout:
- Purple to Pink (primary actions)
- Blue to Cyan (secondary features)
- Emerald to Teal (AI features)
- Custom mood colors

### Smooth Animations
Polished interactions:
- Button hover effects
- Tab transitions
- Chart animations
- Loading spinners
- Scroll behavior

### Accessibility
Designed for everyone:
- High contrast ratios
- Clear typography
- Keyboard navigation
- Screen reader friendly
- Touch-friendly buttons

## 💾 Data Management

### Local Storage
All data stored in browser:
- Instant access
- No server required
- Complete privacy
- Works offline (except AI)

### Data Persistence
Your data survives:
- ✅ Browser refreshes
- ✅ Closing tabs
- ✅ Computer restarts
- ❌ Browser data clearing
- ❌ Using different browsers

### Export Capability
While not built-in, you can:
1. Open browser DevTools
2. Go to Application > Local Storage
3. Copy `mindcare_mood_entries`
4. Save to file for backup

### Data Privacy
Your information:
- Never leaves your device (except AI requests)
- Not shared with third parties
- Not stored on any server
- Fully under your control

## 🔐 Security Features

### API Key Protection
- Stored in localStorage (not cookies)
- Only sent to Groq AI servers
- Never exposed in code
- Can be changed anytime
- Show/hide toggle for privacy

### HTTPS Enforcement
When deployed:
- All traffic encrypted
- Secure localStorage access
- Protected API calls
- Safe data transmission

### No Backend
Security through simplicity:
- No server to hack
- No database to breach
- No user accounts
- No passwords to manage

## 🚀 Performance

### Fast Load Times
Optimized for speed:
- Single HTML file
- Inlined CSS/JS
- No external requests (except AI)
- Minimal bundle size (~645KB)
- Tree-shaking enabled

### Smooth Interactions
Responsive UI:
- Instant mood logging
- Fast chart rendering
- Smooth animations
- No lag or delays
- Optimized re-renders

### Offline Capabilities
Works without internet for:
- ✅ Mood tracking
- ✅ Viewing history
- ✅ Analytics viewing
- ❌ AI features (requires connection)

## 📱 Mobile Experience

### Touch-Optimized
Perfect for touchscreens:
- Large tap targets
- Swipe-friendly
- No hover dependencies
- Touch gestures supported

### Mobile Menu
Responsive navigation:
- Hamburger menu on mobile
- Full tab bar on desktop
- Smooth transitions
- Easy one-hand use

### Mobile Charts
Charts adapt to small screens:
- Responsive width
- Touch tooltips
- Readable labels
- Optimized layout

## 🌟 Unique Features

### Pattern Recognition
AI identifies:
- Mood-activity correlations
- Time-based patterns
- Trend changes
- Trigger identification

### Preventive Insights
Early warnings about:
- Declining trends
- Stress buildup
- Need for self-care
- When to seek help

### Holistic Tracking
Not just mood, but:
- Activities
- Intensity
- Context (notes)
- Patterns over time

### Encouraging Design
Positive UX elements:
- Colorful, uplifting design
- Encouraging messages
- Progress visibility
- Achievement feeling (tracking streak)

## 🎯 Use Cases

### Daily Check-ins
Track mood consistency:
- Morning check-ins
- Evening reflections
- Trigger logging
- Pattern building

### Therapy Support
Complement professional care:
- Share insights with therapist
- Track medication effects
- Monitor progress
- Identify discussion topics

### Self-Awareness
Understand yourself better:
- Emotional patterns
- Trigger identification
- Activity impact
- Growth tracking

### Wellness Journey
Long-term mental health:
- Trend monitoring
- Goal setting
- Habit formation
- Progress celebration

---

MindCare combines modern technology with compassionate design to support your mental health journey. 💙
