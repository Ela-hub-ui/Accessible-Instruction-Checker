import React from 'react';
import { AlertTriangle, ShieldAlert, Info } from 'lucide-react';
import { Issue, IssueCategory } from '../types';

interface IssueCardProps {
  issue: Issue;
}

const IssueCard: React.FC<IssueCardProps> = ({ issue }) => {
  const isAbleist = issue.category === IssueCategory.ABLEIST_LANGUAGE || issue.category === 'ableist_language';
  
  const bgColor = isAbleist ? 'bg-rose-50' : 'bg-amber-50';
  const borderColor = isAbleist ? 'border-rose-200' : 'border-amber-200';
  const iconColor = isAbleist ? 'text-rose-600' : 'text-amber-600';
  const badgeColor = isAbleist ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800';
  
  const Icon = isAbleist ? ShieldAlert : AlertTriangle;

  return (
    <div className={`p-5 rounded-xl border ${bgColor} ${borderColor} shadow-sm transition-all hover:shadow-md`}>
      <div className="flex items-start gap-3">
        <div className={`mt-1 ${iconColor}`} aria-hidden="true">
          <Icon size={24} />
        </div>
        <div className="flex-1 space-y-3">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wide ${badgeColor}`}>
                {isAbleist ? 'Ableist Language' : 'Accessibility Barrier'}
              </span>
              <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200 flex items-center gap-1">
                <Info size={12} />
                {issue.standard}
              </span>
            </div>
            <h3 className="text-base font-medium text-gray-900">
              "<span className="italic">{issue.text}</span>"
            </h3>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed">
            {issue.explanation}
          </p>
        </div>
      </div>
    </div>
  );
};

export default IssueCard;
