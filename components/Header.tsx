
import React from 'react';
import { MODEL_MODES } from '../constants';
import { ModelMode } from '../types';

interface HeaderProps {
  currentMode: ModelMode;
  onModeChange: (mode: ModelMode) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentMode, onModeChange }) => {
  const currentConfig = MODEL_MODES[currentMode];

  // Helper to determine display label based on model constant
  const getImageModelLabel = (model: string) => {
    if (model === 'gemini-3-pro-image-preview') return 'Nano Banana 2';
    if (model === 'gemini-2.5-flash-image') return 'Flash Image';
    return model;
  };

  const getTextModelLabel = (model: string) => {
    if (model === 'gemini-3-pro-preview') return 'Gemini 3';
    if (model === 'gemini-2.5-flash') return 'Flash 2.5';
    return model;
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div>
              <h1 className="text-xl font-bold text-stone-800">Corkbrick Scenario Generator</h1>
              <p className="text-sm text-stone-600">Reimagine your CORKBRICK solutions with AI.</p>
            </div>
          </div>
          
          <div className="flex flex-col items-center sm:items-end gap-2">
            <div className="flex items-center bg-stone-100 rounded-lg p-1 border border-stone-200">
                <button
                    onClick={() => onModeChange('standard')}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                    currentMode === 'standard'
                        ? 'bg-white text-stone-800 shadow-sm'
                        : 'text-stone-500 hover:text-stone-700'
                    }`}
                >
                    Standard (Free)
                </button>
                <button
                    onClick={() => onModeChange('advanced')}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                    currentMode === 'advanced'
                        ? 'bg-amber-100 text-amber-800 shadow-sm border border-amber-200'
                        : 'text-stone-500 hover:text-stone-700'
                    }`}
                >
                    Advanced (Paid)
                </button>
            </div>

            <div className="flex flex-col items-end justify-center text-xs">
                <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-stone-400 font-medium tracking-wide">ACTIVE:</span>
                    </span>
                    <div className="flex gap-1">
                        <div className="px-1.5 py-0.5 bg-blue-50 border border-blue-200 rounded text-blue-800 font-semibold shadow-sm text-[10px]" title={`Text Model: ${currentConfig.textModel}`}>
                            {getTextModelLabel(currentConfig.textModel)}
                        </div>
                        <div className="px-1.5 py-0.5 bg-amber-50 border border-amber-200 rounded text-amber-800 font-semibold shadow-sm text-[10px]" title={`Image Model: ${currentConfig.imageModel}`}>
                            {getImageModelLabel(currentConfig.imageModel)}
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
