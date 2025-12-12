
import React, { useState, useEffect } from 'react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (key: string) => void;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [manualKey, setManualKey] = useState('');
  const [isAIStudioEnvironment, setIsAIStudioEnvironment] = useState(false);

  useEffect(() => {
    // Check if we are in the specific Google AI Studio preview environment
    if (typeof window !== 'undefined' && window.aistudio) {
        setIsAIStudioEnvironment(true);
    }
  }, []);

  if (!isOpen) {
    return null;
  }

  const handleManualSubmit = () => {
    if (manualKey.trim()) {
        onConfirm(manualKey.trim());
    }
  };

  const handleAutoSelect = async () => {
    try {
        if (window.aistudio) {
            await window.aistudio.openSelectKey();
            onConfirm(''); 
        }
    } catch (e) {
        console.error("Failed to select key automatically", e);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center transition-opacity duration-300 backdrop-blur-sm" 
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg m-4 transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale max-h-[90vh] overflow-y-auto" 
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 mb-4 border-b border-stone-100 pb-4">
            <div className="bg-amber-100 p-2 rounded-full text-amber-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 19l-1 1-1-1-1 1-1-1-1 1-1-1-5.657-5.657a6 6 0 117.757-7.757 2 2 0 002-2 2 2 0 00-2-2 2 2 0 00-2 2" />
                </svg>
            </div>
            <div>
                <h2 className="text-xl font-bold text-stone-800">API Key Required</h2>
                <p className="text-xs text-stone-500">Connect to Google Gemini to start designing.</p>
            </div>
        </div>

        <p className="text-sm text-stone-600 mb-4 leading-relaxed">
          To use this app, you need to provide your own <strong>Google Gemini API Key</strong>.
        </p>

        {/* Free Tier Info Box */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-5">
            <h3 className="text-sm font-bold text-green-800 flex items-center gap-2 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Is this free?
            </h3>
            <p className="text-xs text-green-700 leading-relaxed">
                <strong>Yes, for most users!</strong> Google provides a generous <strong>Free Tier</strong> for the Gemini API (e.g., Gemini Flash). You can generate many images without paying anything.
                <br /><br />
                Even if you add your key, you are not billed unless you explicitly enable billing on your Google Cloud project and exceed the free usage limits.
            </p>
        </div>

        <div className="bg-stone-50 border border-stone-200 rounded-lg p-4 mb-6">
            <h3 className="text-sm font-semibold text-stone-800 mb-3">How to get your key (30 seconds):</h3>
            <ol className="list-decimal list-inside space-y-3 text-sm text-stone-600">
                <li>
                    Go to <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold hover:underline inline-flex items-center gap-1">
                        Google AI Studio
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>.
                </li>
                <li>Click <strong>"Create API Key"</strong>.</li>
                <li>Copy the key starting with <code>AIzaSy...</code> and paste it below.</li>
            </ol>
        </div>

        <div className="mb-6">
            <label htmlFor="api-key-input" className="block text-sm font-medium text-stone-700 mb-1">Paste your API Key here</label>
            <input 
                type="password" 
                id="api-key-input"
                value={manualKey}
                onChange={(e) => setManualKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full p-3 border border-stone-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 text-sm font-mono"
                autoComplete="off"
            />
            <p className="text-xs text-stone-400 mt-2 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Your key is stored locally in your browser and is never sent to our servers.
            </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-3 border-t border-stone-100 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white border border-stone-300 text-stone-600 rounded-md hover:bg-stone-50 font-semibold transition-colors order-2 sm:order-1"
          >
            Cancel
          </button>
          
          {isAIStudioEnvironment && (
              <button
                onClick={handleAutoSelect}
                className="px-4 py-2 bg-blue-50 text-blue-700 border border-blue-200 rounded-md hover:bg-blue-100 font-semibold transition-colors order-3 sm:order-2"
              >
                Use AI Studio Key
              </button>
          )}

          <button
            onClick={handleManualSubmit}
            disabled={!manualKey.trim()}
            className="px-6 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 font-bold transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed order-1 sm:order-3"
          >
            Start Designing
          </button>
        </div>
      </div>
       <style>{`
        @keyframes fade-in-scale {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-scale { animation: fade-in-scale 0.2s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default ApiKeyModal;
