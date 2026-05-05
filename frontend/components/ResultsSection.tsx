import React, { useState } from 'react';
import { AnalysisResult } from '../types';
import IssueCard from './IssueCard';
import { CheckCircle2, AlertCircle, Copy, Check } from 'lucide-react';

interface ResultsSectionProps {
  result: AnalysisResult;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ result }) => {
  const [activeTab, setActiveTab] = useState<'issues' | 'rewrite'>('issues');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(result.accessible_rewrite);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabClasses = (tabName: string) => `
    px-4 py-3 text-sm font-medium rounded-t-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
    ${activeTab === tabName 
      ? 'bg-white text-indigo-700 border-t-2 border-indigo-600 shadow-[0_-2px_4px_rgba(0,0,0,0.05)]' 
      : 'bg-gray-50 text-gray-500 hover:text-gray-700 hover:bg-gray-100 border-b border-gray-200'}
  `;

  return (
    <section className="mt-8 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200" aria-label="Analysis Results">
      <div className="flex border-b border-gray-200 bg-gray-50 px-2 pt-2" role="tablist">
        <button
          className={tabClasses('issues')}
          onClick={() => setActiveTab('issues')}
          role="tab"
          aria-selected={activeTab === 'issues'}
          aria-controls="panel-issues"
          id="tab-issues"
        >
          <div className="flex items-center gap-2">
            <AlertCircle size={18} />
            Issues Found ({result.issues_found.length})
          </div>
        </button>
        <button
          className={tabClasses('rewrite')}
          onClick={() => setActiveTab('rewrite')}
          role="tab"
          aria-selected={activeTab === 'rewrite'}
          aria-controls="panel-rewrite"
          id="tab-rewrite"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 size={18} />
            Accessible Rewrite
          </div>
        </button>
      </div>

      <div className="p-6 min-h-[400px]">
        {/* Issues Panel */}
        <div 
          id="panel-issues" 
          role="tabpanel" 
          aria-labelledby="tab-issues"
          className={activeTab === 'issues' ? 'block' : 'hidden'}
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Identified Barriers & Ableist Language</h2>
          {result.issues_found.length === 0 ? (
            <div className="text-center py-12 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle2 className="mx-auto h-12 w-12 text-green-500 mb-3" />
              <h3 className="text-lg font-medium text-green-800">No major issues found!</h3>
              <p className="text-green-600 mt-1">Your text appears to follow good accessibility practices.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {result.issues_found.map((issue, index) => (
                <IssueCard key={index} issue={issue} />
              ))}
            </div>
          )}
        </div>

        {/* Rewrite Panel */}
        <div 
          id="panel-rewrite" 
          role="tabpanel" 
          aria-labelledby="tab-rewrite"
          className={activeTab === 'rewrite' ? 'block' : 'hidden'}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Inclusive & Accessible Rewrite</h2>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Copy rewrite to clipboard"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Copied!' : 'Copy Text'}
            </button>
          </div>
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 whitespace-pre-wrap text-gray-800 leading-relaxed font-medium">
            {result.accessible_rewrite}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
