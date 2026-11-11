import React, { useState } from 'react';
import { X, Download, BookOpen, Check, ArrowRight } from 'lucide-react';
import { ResourceItem } from '../data/siteConfig';

interface ResourceModalProps {
  resource: ResourceItem | null;
  onClose: () => void;
}

export const ResourceModal: React.FC<ResourceModalProps> = ({ resource, onClose }) => {
  const [downloaded, setDownloaded] = useState(false);

  if (!resource) return null;

  const handleDownloadGuide = () => {
    if (resource.downloadUrl && resource.downloadUrl.trim() !== '') {
      window.open(resource.downloadUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    // Generate clean printable text summary
    const lines: string[] = [
      `SEHRISH MALL | FITNESS, TRAINING & WELLNESS`,
      `Resource: ${resource.title} (${resource.category})`,
      `============================================================`,
      ``,
      resource.description,
      ``,
      `KEY TAKEAWAYS:`,
      ...resource.keyTakeaways.map((k, i) => `  ${i + 1}. ${k}`),
      ``,
      ...resource.sections.flatMap((sec) => [
        `------------------------------------------------------------`,
        sec.heading.toUpperCase(),
        ...sec.points.map((pt) => `  • ${pt}`),
        ``,
      ]),
      `------------------------------------------------------------`,
      `Follow @sehrish.mall on Instagram: https://www.instagram.com/sehrish.mall/`,
      `Educational fitness resource — train safely and listen to your body.`,
    ];

    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resource.title.toLowerCase().replace(/\s+/g, '-')}-sehrish-mall.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#435246]/80 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="resource-modal-title"
    >
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#F5F3EC] border border-[#546B5A]/30 shadow-2xl text-[#232323] p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4 pb-6 border-b border-[#546B5A]/25">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#546B5A] font-medium mb-2">
              <span>{resource.category}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono-tabular">{resource.readTime}</span>
              <span aria-hidden="true">·</span>
              <span>{resource.format}</span>
            </div>
            <h3
              id="resource-modal-title"
              className="text-2xl sm:text-3xl font-bold font-display text-[#232323]"
            >
              {resource.title}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close resource guide"
            className="w-10 h-10 rounded-lg bg-[#435246]/10 hover:bg-[#546B5A]/15 text-[#232323] border border-[#546B5A]/25 flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-6 space-y-6">
          <p className="text-sm sm:text-base text-[#546B5A] leading-relaxed">
            {resource.description}
          </p>

          {/* Key Takeaways */}
          <div className="p-5 rounded-xl bg-[#F5F3EC] border border-[#546B5A]/25">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#546B5A] mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4" aria-hidden="true" />
              Core Principles &amp; Takeaways
            </h4>
            <ul className="space-y-2.5 text-sm text-[#232323]">
              {resource.keyTakeaways.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <ArrowRight className="w-4 h-4 text-[#546B5A] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Detailed Sections */}
          <div className="space-y-5">
            {resource.sections.map((sec, idx) => (
              <div key={idx} className="space-y-2">
                <h5 className="text-base font-semibold text-[#232323]">
                  {sec.heading}
                </h5>
                <ul className="space-y-2 text-sm text-[#546B5A] leading-relaxed">
                  {sec.points.map((pt, pIdx) => (
                    <li key={pIdx} className="pl-3 border-l border-[#546B5A]/40">
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-[#546B5A]/25 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-[#546B5A]">
            Free educational resource by Sehrish Mall
          </span>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-medium text-[#232323] hover:text-[#232323] border border-[#546B5A]/30 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              Done Reading
            </button>
            <button
              type="button"
              onClick={handleDownloadGuide}
              className="px-5 py-2.5 text-xs font-semibold text-[#F5F3EC] bg-[#546B5A] hover:bg-[#435246] rounded-lg transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap"
            >
              {downloaded ? (
                <>
                  <Check className="w-4 h-4" aria-hidden="true" />
                  <span>Guide Downloaded</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" aria-hidden="true" />
                  <span>Download Takeaway Sheet</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
