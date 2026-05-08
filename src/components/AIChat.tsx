import { useState, useRef, useEffect } from 'react';
import { AIMessage, MoodEntry } from '../types';
import { chatWithAI, generateMentalHealthRecommendation } from '../services/groqService';
import { Bot, Send, Loader2, Sparkles } from 'lucide-react';

interface AIChatProps {
  apiKey: string;
  moodEntries: MoodEntry[];
  messages: AIMessage[];
  onMessageSent: (message: AIMessage) => void;
}

export default function AIChat({ apiKey, moodEntries, messages, onMessageSent }: AIChatProps) {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: AIMessage = {
      role: 'user',
      content: input,
      timestamp: Date.now(),
    };

    onMessageSent(userMessage);
    setInput('');
    setIsLoading(true);

    try {
      const response = await chatWithAI(
        apiKey,
        messages.map(m => ({ role: m.role, content: m.content })),
        input
      );

      const assistantMessage: AIMessage = {
        role: 'assistant',
        content: response,
        timestamp: Date.now(),
      };

      onMessageSent(assistantMessage);
    } catch (error) {
      const errorMessage: AIMessage = {
        role: 'assistant',
        content: error instanceof Error ? error.message : 'Failed to get response. Please try again.',
        timestamp: Date.now(),
      };
      onMessageSent(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetRecommendations = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const response = await generateMentalHealthRecommendation(apiKey, moodEntries);

      const assistantMessage: AIMessage = {
        role: 'assistant',
        content: response,
        timestamp: Date.now(),
      };

      onMessageSent(assistantMessage);
    } catch (error) {
      const errorMessage: AIMessage = {
        role: 'assistant',
        content: error instanceof Error ? error.message : 'Failed to get recommendations. Please try again.',
        timestamp: Date.now(),
      };
      onMessageSent(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col h-[600px]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">AI Support</h2>
        </div>
        <button
          onClick={handleGetRecommendations}
          disabled={isLoading || !apiKey}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-medium rounded-lg hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Sparkles className="w-4 h-4" />
          Get Insights
        </button>
      </div>

      {!apiKey && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            Please add your Groq API key in settings to use AI features.
          </p>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            <Bot className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>Hi! I'm here to support your mental health journey.</p>
            <p className="text-sm mt-2">Ask me anything or click "Get Insights" for personalized recommendations.</p>
          </div>
        )}
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl px-4 py-3">
              <Loader2 className="w-5 h-5 text-gray-600 animate-spin" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
          disabled={isLoading || !apiKey}
          className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50"
        />
        <button
          onClick={handleSend}
          disabled={isLoading || !input.trim() || !apiKey}
          className="px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
