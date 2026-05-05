import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink, Lightbulb, BookOpen } from 'lucide-react';

interface GuidingPrinciplesProps {
  aiPrompts?: string[];
}

const GuidingPrinciples: React.FC<GuidingPrinciplesProps> = ({ aiPrompts }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Use AI-generated prompts if available, otherwise show general static prompts
  const promptsToDisplay = aiPrompts && aiPrompts.length > 0
    ? aiPrompts
    : [
        "Does this text assume all students can see, hear, or move in the same way?",
        "Is the tone supportive and inviting, or punitive and rigid?",
        "Are there flexible options for students to demonstrate their knowledge?",
        "Does the language require students to disclose a disability or medical condition to receive basic flexibility?",
        "Does the text use person-first language and avoid framing disability in a negative way, such as implying it is a burden or inciting pity?"
      ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
      {/* Prompts Section */}
      <div className="p-6 border-b border-gray-200 bg-indigo-50/50">
        <h2 className="text-lg font-semibold text-indigo-900 mb-4 flex items-center gap-2">
          <Lightbulb size={20} className="text-indigo-600" />
          {aiPrompts ? "Tailored Guiding Prompts for Your Text" : "General Guiding Prompts"}
        </h2>
        <ul className="space-y-3">
          {promptsToDisplay.map((prompt, idx) => (
            <li key={idx} className="flex items-start gap-3 text-gray-700">
              <div className="bg-indigo-200 text-indigo-800 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-xs">
                {idx + 1}
              </div>
              <span className="font-medium leading-relaxed">{prompt}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Principles Section (Collapsible) */}
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          aria-expanded={isOpen}
        >
          <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
            <BookOpen size={20} className="text-gray-600" />
            Guiding Principles
          </div>
          {isOpen ? (
            <ChevronUp size={20} className="text-gray-500" />
          ) : (
            <ChevronDown size={20} className="text-gray-500" />
          )}
        </button>

        {isOpen && (
          <div className="px-6 pb-6 pt-2 bg-white border-t border-gray-100">
            <p className="text-sm text-gray-600 mb-5">
              Learn more about the foundational frameworks that guide accessible and inclusive instruction:
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              {/* UDL */}
              <a 
                href="https://udlguidelines.cast.org/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block p-5 rounded-xl border border-gray-200 hover:border-indigo-400 hover:shadow-md transition-all group bg-gray-50 hover:bg-white"
              >
                <h3 className="font-semibold text-indigo-700 flex items-center justify-between mb-2">
                  UDL Guidelines
                  <ExternalLink size={16} className="text-gray-400 group-hover:text-indigo-600 transition-colors" />
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Universal Design for Learning offers a framework to optimize teaching and learning for all people based on scientific insights into how humans learn.
                </p>
              </a>
              
              {/* WCAG */}
              <a 
                href="https://www.w3.org/TR/WCAG22/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block p-5 rounded-xl border border-gray-200 hover:border-indigo-400 hover:shadow-md transition-all group bg-gray-50 hover:bg-white"
              >
                <h3 className="font-semibold text-indigo-700 flex items-center justify-between mb-2">
                  WCAG 2.2 AA
                  <ExternalLink size={16} className="text-gray-400 group-hover:text-indigo-600 transition-colors" />
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Web Content Accessibility Guidelines provide a wide range of recommendations for making web content more accessible to people with disabilities.
                </p>
              </a>
              
              {/* ADA Title II */}
              <a 
                href="https://www.ada.gov/resources/title-ii-web-accessibility/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block p-5 rounded-xl border border-gray-200 hover:border-indigo-400 hover:shadow-md transition-all group bg-gray-50 hover:bg-white"
              >
                <h3 className="font-semibold text-indigo-700 flex items-center justify-between mb-2">
                  ADA Title II
                  <ExternalLink size={16} className="text-gray-400 group-hover:text-indigo-600 transition-colors" />
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Ensures state and local government services (including public education) are accessible, with specific web accessibility rules taking effect.
                </p>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuidingPrinciples;
