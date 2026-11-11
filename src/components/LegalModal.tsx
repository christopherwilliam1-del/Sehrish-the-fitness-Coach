import React from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
  brandName: string;
  instagramUsername: string;
  instagramUrl: string;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  type,
  onClose,
  brandName,
  instagramUsername,
  instagramUrl,
}) => {
  if (!type) return null;

  const isPrivacy = type === 'privacy';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#435246]/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
    >
      <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-[#F5F3EC] border border-[#546B5A]/30 shadow-2xl text-[#232323] p-6 sm:p-8">
        <div className="flex items-center justify-between pb-5 border-b border-[#546B5A]/25">
          <div className="flex items-center gap-2.5">
            {isPrivacy ? (
              <ShieldCheck className="w-5 h-5 text-[#546B5A]" aria-hidden="true" />
            ) : (
              <FileText className="w-5 h-5 text-[#546B5A]" aria-hidden="true" />
            )}
            <h3 id="legal-modal-title" className="text-xl font-bold font-display text-[#232323]">
              {isPrivacy ? 'Privacy Policy' : 'Terms of Use & Wellness Disclaimer'}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close legal notice"
            className="w-9 h-9 rounded-lg bg-[#435246]/10 hover:bg-[#546B5A]/15 flex items-center justify-center text-[#232323] border border-[#546B5A]/25 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="py-6 space-y-4 text-sm text-[#546B5A] leading-relaxed">
          {isPrivacy ? (
            <>
              <p className="text-[#232323] font-medium">
                1. Information Collection &amp; Consultation Inquiries
              </p>
              <p>
                When you submit an inquiry through the {brandName} contact form, we collect only the details you voluntarily provide (name, email address, phone number, fitness goal, and message) solely to respond to your inquiry.
              </p>
              <p className="text-[#232323] font-medium">2. Data Protection &amp; Storage</p>
              <p>
                We never sell, rent, or trade your personal contact information to third parties. Local browser preferences (such as saved workouts or site customization settings) are stored strictly in your own browser storage.
              </p>
              <p className="text-[#232323] font-medium">3. Third-Party Links</p>
              <p>
                This website contains links to public social media platforms such as Instagram (@sehrish.mall). Visiting external platforms is governed by their respective privacy policies.
              </p>
              <p className="text-[#232323] font-medium">4. Contact</p>
              <p>
                For any questions or inquiries, connect directly on Instagram at{' '}
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#546B5A] hover:underline"
                >
                  {instagramUsername}
                </a>
                .
              </p>
            </>
          ) : (
            <>
              <p className="text-[#232323] font-medium">
                1. Educational &amp; Informational Purpose Only
              </p>
              <p>
                All workouts, mobility guides, nutrition basics, and training resources provided on {brandName} are for general educational and informational purposes only. They do not constitute medical advice, clinical diagnosis, or physical therapy.
              </p>
              <p className="text-[#232323] font-medium">2. Assumption of Risk &amp; Safe Training</p>
              <p>
                Physical exercise involves inherent effort. Always consult with a qualified healthcare professional before starting any new fitness or nutrition routine, warm up thoroughly, choose weights appropriate for your experience level, and stop immediately if you experience sharp pain or dizziness.
              </p>
              <p className="text-[#232323] font-medium">3. Intellectual Property</p>
              <p>
                All original brand layouts, workout blueprints, and downloadable guides on this site are provided for personal, non-commercial use.
              </p>
            </>
          )}
        </div>

        <div className="pt-4 border-t border-[#546B5A]/25 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-[#F5F3EC] bg-[#546B5A] hover:bg-[#435246] rounded-lg transition-colors cursor-pointer"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
