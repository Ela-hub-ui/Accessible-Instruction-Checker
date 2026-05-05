import React from 'react';
import { BookOpenCheck } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-indigo-900 text-white py-6 px-4 shadow-md">
      <div className="max-w-5xl mx-auto flex items-center gap-4">
        <div className="bg-indigo-100 p-2 rounded-lg text-indigo-900">
          <BookOpenCheck size={32} aria-hidden="true" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Accessible Instruction Checker
          </h1>
          <p className="text-indigo-200 mt-1 text-sm md:text-base max-w-2xl">
            Analyze your syllabi, assignments, and announcements for ableist language and accessibility barriers. Get inclusive rewrites aligned with ADA Title II, UDL, and WCAG 2.2 AA.
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
