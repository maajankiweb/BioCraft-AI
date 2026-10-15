import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

interface FooterProps {
  onOpenModal: (type: 'privacy' | 'terms' | 'feedback') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenModal }) => {
  return (
    <footer className="bg-white border-t border-slate-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand info */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-xs">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-slate-900">
                BioCraft <span className="text-indigo-600">AI</span>
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-500 max-w-sm">
              AI-powered bio generation tailored for social profiles, creator channels, and personal websites with strict platform character limit verification.
            </p>
          </div>

          {/* Quick links & legal */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-600">
            <button
              onClick={() => onOpenModal('privacy')}
              className="hover:text-indigo-600 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onOpenModal('terms')}
              className="hover:text-indigo-600 transition-colors cursor-pointer"
            >
              Terms of Use
            </button>
            <button
              onClick={() => onOpenModal('feedback')}
              className="hover:text-indigo-600 transition-colors cursor-pointer"
            >
              Feedback
            </button>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} BioCraft AI. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Zero data stored • Powered by Gemini 3.8
          </p>
        </div>
      </div>
    </footer>
  );
};
