import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';
import ResultsSection from './components/ResultsSection';
import GuidingPrinciples from './components/GuidingPrinciples';
import { analyzeInstructionalText } from './services/geminiService';
import { AnalysisResult } from './types';
import { Send, Eraser, AlertOctagon } from 'lucide-react';

const App: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = useCallback(async () => {
    const currentText = inputText.trim();
    if (!currentText) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const analysis = await analyzeInstructionalText(currentText);
      setResult(analysis);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [inputText]);

  const handleClear = useCallback(() => {
    setInputText('');
    setResult(null);
    setError(null);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-900 selection:bg-indigo-200 selection:text-indigo-900">
      <Header />
      
      <main className="max-w-5xl mx-auto px-4 py-8">
        
        {/* Guiding Principles & Prompts Section */}
        <GuidingPrinciples aiPrompts={result?.guiding_prompts} />

        <section aria-label="Input Section" className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <label htmlFor="instructional-text" className="block text-lg font-semibold text-gray-800 mb-2">
            Type or Paste Your Instructional Text Below:
          </label>
          <p className="text-sm text-gray-600 mb-4">
            Include syllabi excerpts, assignment descriptions, announcements, or any text you share with students.
          </p>
          
          <textarea
            id="instructional-text"
            className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-y text-base transition-shadow"
            placeholder="e.g., 'Students must submit their essays by 11:59 PM on Friday. No late work will be accepted under any circumstances. If you need accommodations, you must provide a doctor's note...'"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isLoading}
            aria-invalid={!!error}
          />

          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={handleClear}
              disabled={isLoading || (!inputText && !result && !error)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Clear input and results"
            >
              <Eraser size={16} />
              Clear
            </button>
            
            <button
              onClick={handleAnalyze}
              disabled={isLoading || !inputText.trim()}
              className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
              aria-label="Analyze text for accessibility"
            >
              {isLoading ? 'Analyzing...' : 'Analyze Text'}
              {!isLoading && <Send size={16} />}
            </button>
          </div>
        </section>

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 text-red-800" role="alert">
            <AlertOctagon className="flex-shrink-0 mt-0.5" size={20} />
            <div>
              <h3 className="font-semibold">Analysis Failed</h3>
              <p className="text-sm mt-1">{error}</p>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="mt-12">
            <LoadingSpinner message="Evaluating text against ADA Title II, UDL, and WCAG standards..." />
          </div>
        )}

        {result && !isLoading && (
          <ResultsSection result={result} />
        )}
      </main>
    </div>
  );
};

export default App;
