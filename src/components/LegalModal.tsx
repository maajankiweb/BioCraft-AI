import React from 'react';
import { X, Shield, FileText } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | 'feedback' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {type === 'privacy' && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Privacy Policy</h3>
            </div>
            <div className="text-sm text-slate-600 space-y-3 leading-relaxed">
              <p>
                <strong>Zero Persistent Storage:</strong> BioCraft AI operates with a strict ephemeral architecture. Any personal name, profession, or background descriptions entered into the generator form are passed in-memory to Google Gemini API to formulate your bio responses and are immediately discarded.
              </p>
              <p>
                <strong>No Tracking or Profiling:</strong> We do not track users, build behavioral profiles, or sell information to third parties. Requests are throttled using temporary IP timestamps in volatile memory to prevent denial-of-service abuse and are purged every 10 minutes.
              </p>
              <p>
                <strong>Model Providers:</strong> AI bio generations are powered by Google Gemini API. Interactions comply with Google Cloud & AI Studio data protection standards.
              </p>
            </div>
          </div>
        )}

        {type === 'terms' && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Terms of Use</h3>
            </div>
            <div className="text-sm text-slate-600 space-y-3 leading-relaxed">
              <p>
                <strong>Acceptable Use:</strong> BioCraft AI is provided for generating personal, creator, and professional biographies. Users agree not to submit unlawful, infringing, fraudulent, or harassing content.
              </p>
              <p>
                <strong>AI Output Ownership:</strong> Any bios generated for your profile are yours to freely edit, adapt, publish, and distribute across any network or website without royalty or attribution requirements.
              </p>
              <p>
                <strong>Platform Limits Notice:</strong> While BioCraft AI applies verified character limits for major platforms, social media companies may alter character allowances at any time. Users should verify final text within their platform profile editors before saving.
              </p>
            </div>
          </div>
        )}

        {type === 'feedback' && (
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Share Feedback</h3>
            <p className="text-sm text-slate-600 mb-4">
              Have a feature request, platform suggestion, or found an updated character limit? Let us know!
            </p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700">
              <p className="font-medium text-slate-900 mb-1">Feedback Channel</p>
              <p className="text-xs text-slate-500">
                Contact: <code className="text-indigo-600 bg-white px-1.5 py-0.5 rounded border border-slate-200">feedback@biocraft.ai.example</code>
              </p>
              <p className="mt-2 text-xs text-slate-500 italic">
                (Note: Placeholder feedback contact. Live support is delivered via the application project repository and developer portal.)
              </p>
            </div>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
