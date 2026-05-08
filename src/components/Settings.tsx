import { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Eye, EyeOff, ExternalLink } from 'lucide-react';

interface SettingsProps {
  apiKey: string;
  onApiKeyChange: (key: string) => void;
}

export default function Settings({ apiKey, onApiKeyChange }: SettingsProps) {
  const [localApiKey, setLocalApiKey] = useState(apiKey);
  const [showApiKey, setShowApiKey] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setLocalApiKey(apiKey);
  }, [apiKey]);

  const handleSave = () => {
    onApiKeyChange(localApiKey);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gradient-to-br from-gray-600 to-gray-800 rounded-xl">
          <SettingsIcon className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Groq API Key</label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type={showApiKey ? 'text' : 'password'}
                value={localApiKey}
                onChange={(e) => setLocalApiKey(e.target.value)}
                placeholder="Enter your Groq API key"
                className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showApiKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <button
              onClick={handleSave}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                saved
                  ? 'bg-green-500 text-white'
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg'
              }`}
            >
              {saved ? '✓ Saved' : 'Save'}
            </button>
          </div>
          <p className="text-xs text-gray-500">
            Your API key is stored locally and never sent to any server except Groq AI.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-2">
          <p className="text-sm font-medium text-blue-900">How to get a Groq API key:</p>
          <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
            <li>Visit <a href="https://console.groq.com" target="_blank" rel="noopener noreferrer" className="underline inline-flex items-center gap-1">console.groq.com <ExternalLink className="w-3 h-3" /></a></li>
            <li>Sign up or log in to your account</li>
            <li>Navigate to API Keys section</li>
            <li>Create a new API key</li>
            <li>Copy and paste it here</li>
          </ol>
        </div>

        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">About MindCare</h3>
          <p className="text-sm text-gray-600">
            MindCare is an AI-powered mental health monitoring app that helps you track your mood,
            analyze patterns, and receive personalized recommendations. All your data is stored locally
            in your browser.
          </p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <p className="text-sm font-medium text-yellow-900 mb-1">⚠️ Important Note</p>
          <p className="text-sm text-yellow-800">
            This app is not a substitute for professional mental health care. If you're experiencing
            a mental health crisis, please contact a mental health professional or crisis helpline
            immediately.
          </p>
        </div>
      </div>
    </div>
  );
}
