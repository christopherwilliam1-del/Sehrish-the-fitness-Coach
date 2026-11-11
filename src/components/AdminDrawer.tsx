import React, { useState, useEffect } from 'react';
import { X, RotateCcw, Save, Check, Sliders } from 'lucide-react';
import { SiteConfig } from '../data/siteConfig';

interface AdminDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  config: SiteConfig;
  onUpdateConfig: (newConfig: SiteConfig) => void;
  onResetConfig: () => void;
}

type AdminTab = 'branding' | 'about' | 'media' | 'workouts' | 'testimonials' | 'faq';

export const AdminDrawer: React.FC<AdminDrawerProps> = ({
  isOpen,
  onClose,
  config,
  onUpdateConfig,
  onResetConfig,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('branding');
  const [draft, setDraft] = useState<SiteConfig>(config);
  const [savedNotice, setSavedNotice] = useState(false);

  useEffect(() => {
    setDraft(config);
  }, [config, isOpen]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateConfig(draft);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#435246]/85 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-drawer-title"
    >
      <div className="relative w-full max-w-xl h-full bg-[#F5F3EC] border-l border-[#546B5A]/30 flex flex-col text-[#232323] shadow-2xl">
        <div className="px-6 py-5 border-b border-[#546B5A]/25 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Sliders className="w-5 h-5 text-[#546B5A]" aria-hidden="true" />
            <div>
              <h2 id="admin-drawer-title" className="text-lg font-bold font-display text-[#232323]">
                Site Content &amp; Brand Editor
              </h2>
              <p className="text-xs text-[#546B5A]">
                Edit photos, bio, videos, workouts, testimonials, and FAQ
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close site editor"
            className="w-9 h-9 rounded-lg bg-[#435246]/10 hover:bg-[#546B5A]/15 flex items-center justify-center text-[#232323] border border-[#546B5A]/25 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-6 py-2.5 bg-[#F5F3EC] border-b border-[#546B5A]/25 flex items-center gap-1 overflow-x-auto">
          {(
            [
              { id: 'branding', label: 'Hero & Brand' },
              { id: 'about', label: 'Bio & Photo' },
              { id: 'media', label: 'Video & Social' },
              { id: 'workouts', label: 'Workouts' },
              { id: 'testimonials', label: 'Testimonials' },
              { id: 'faq', label: 'FAQ' },
            ] as { id: AdminTab; label: string }[]
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#546B5A] text-[#F5F3EC] font-semibold'
                  : 'text-[#546B5A] hover:text-[#232323]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-4">
          {activeTab === 'branding' && (
            <div className="space-y-4">
              <div>
                <label htmlFor="admin-brand-name" className="block text-xs font-medium text-[#232323] mb-1">
                  Brand Title
                </label>
                <input
                  id="admin-brand-name"
                  name="brandName"
                  type="text"
                  value={draft.brandName}
                  onChange={(e) => setDraft({ ...draft, brandName: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#F5F3EC] border border-[#546B5A]/30 text-sm text-[#232323]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="admin-ig-handle" className="block text-xs font-medium text-[#232323] mb-1">
                    Instagram Handle
                  </label>
                  <input
                    id="admin-ig-handle"
                    name="instagramUsername"
                    type="text"
                    value={draft.instagramUsername}
                    onChange={(e) => setDraft({ ...draft, instagramUsername: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#F5F3EC] border border-[#546B5A]/30 text-sm text-[#232323]"
                  />
                </div>
                <div>
                  <label htmlFor="admin-ig-dm-url" className="block text-xs font-medium text-[#232323] mb-1">
                    Instagram Direct Message Link
                  </label>
                  <input
                    id="admin-ig-dm-url"
                    name="instagramDmUrl"
                    type="url"
                    value={draft.instagramDmUrl}
                    onChange={(e) => setDraft({ ...draft, instagramDmUrl: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#F5F3EC] border border-[#546B5A]/30 text-sm text-[#232323]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="admin-hero-line1" className="block text-xs font-medium text-[#232323] mb-1">
                  Hero Headline Line 1
                </label>
                <input
                  id="admin-hero-line1"
                  name="heroHeadline1"
                  type="text"
                  value={draft.hero.headlineLine1}
                  onChange={(e) =>
                    setDraft({ ...draft, hero: { ...draft.hero, headlineLine1: e.target.value } })
                  }
                  className="w-full px-3.5 py-2 rounded-lg bg-[#F5F3EC] border border-[#546B5A]/30 text-sm text-[#232323]"
                />
              </div>

              <div>
                <label htmlFor="admin-hero-line2" className="block text-xs font-medium text-[#232323] mb-1">
                  Hero Headline Line 2
                </label>
                <input
                  id="admin-hero-line2"
                  name="heroHeadline2"
                  type="text"
                  value={draft.hero.headlineLine2}
                  onChange={(e) =>
                    setDraft({ ...draft, hero: { ...draft.hero, headlineLine2: e.target.value } })
                  }
                  className="w-full px-3.5 py-2 rounded-lg bg-[#F5F3EC] border border-[#546B5A]/30 text-sm text-[#232323]"
                />
              </div>

              <div>
                <label htmlFor="admin-credibility" className="block text-xs font-medium text-[#232323] mb-1">
                  Credibility Tagline / Verified Statistics
                </label>
                <input
                  id="admin-credibility"
                  name="heroCredibility"
                  type="text"
                  value={draft.hero.credibilityText}
                  onChange={(e) =>
                    setDraft({ ...draft, hero: { ...draft.hero, credibilityText: e.target.value } })
                  }
                  className="w-full px-3.5 py-2 rounded-lg bg-[#F5F3EC] border border-[#546B5A]/30 text-sm text-[#232323]"
                />
              </div>

              <div>
                <label htmlFor="admin-hero-image" className="block text-xs font-medium text-[#232323] mb-1">
                  Hero Backdrop Image URL
                </label>
                <input
                  id="admin-hero-image"
                  name="heroImage"
                  type="text"
                  value={draft.hero.heroImage}
                  onChange={(e) =>
                    setDraft({ ...draft, hero: { ...draft.hero, heroImage: e.target.value } })
                  }
                  className="w-full px-3.5 py-2 rounded-lg bg-[#F5F3EC] border border-[#546B5A]/30 text-sm text-[#232323]"
                />
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-4">
              <div>
                <label htmlFor="admin-about-img" className="block text-xs font-medium text-[#232323] mb-1">
                  Profile / About Portrait URL
                </label>
                <input
                  id="admin-about-img"
                  name="aboutImage"
                  type="text"
                  value={draft.about.aboutImage}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      about: { ...draft.about, aboutImage: e.target.value },
                      hero: { ...draft.hero, profileImage: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-lg bg-[#F5F3EC] border border-[#546B5A]/30 text-sm text-[#232323]"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  id="admin-placeholder-badge"
                  name="usePlaceholderBadge"
                  type="checkbox"
                  checked={draft.about.usePlaceholderBadge}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      about: { ...draft.about, usePlaceholderBadge: e.target.checked },
                      hero: { ...draft.hero, useProfilePlaceholderBadge: e.target.checked },
                    })
                  }
                  className="rounded border-[#546B5A]/35 bg-[#F5F3EC]"
                />
                <label htmlFor="admin-placeholder-badge" className="text-xs text-[#546B5A]">
                  Show "Editorial Portrait Placeholder" indicator badge
                </label>
              </div>

              <div>
                <label htmlFor="admin-who-she-is" className="block text-xs font-medium text-[#232323] mb-1">
                  Who She Is
                </label>
                <textarea
                  id="admin-who-she-is"
                  name="whoSheIs"
                  rows={3}
                  value={draft.about.whoSheIs}
                  onChange={(e) =>
                    setDraft({ ...draft, about: { ...draft.about, whoSheIs: e.target.value } })
                  }
                  className="w-full px-3.5 py-2 rounded-lg bg-[#F5F3EC] border border-[#546B5A]/30 text-sm text-[#232323]"
                />
              </div>

              <div>
                <label htmlFor="admin-approach" className="block text-xs font-medium text-[#232323] mb-1">
                  Her Approach to Fitness
                </label>
                <textarea
                  id="admin-approach"
                  name="approachToFitness"
                  rows={3}
                  value={draft.about.approachToFitness}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      about: { ...draft.about, approachToFitness: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-lg bg-[#F5F3EC] border border-[#546B5A]/30 text-sm text-[#232323]"
                />
              </div>
            </div>
          )}

          {activeTab === 'media' && (
            <div className="space-y-4">
              <div>
                <label htmlFor="admin-video-url" className="block text-xs font-medium text-[#232323] mb-1">
                  Featured Video Embed or MP4 URL
                </label>
                <input
                  id="admin-video-url"
                  name="videoEmbedUrl"
                  type="text"
                  placeholder="https://www.youtube.com/embed/... or direct .mp4 URL"
                  value={draft.featuredVideo.primaryVideo.embedUrl}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      featuredVideo: {
                        ...draft.featuredVideo,
                        primaryVideo: {
                          ...draft.featuredVideo.primaryVideo,
                          embedUrl: e.target.value,
                        },
                      },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-lg bg-[#F5F3EC] border border-[#546B5A]/30 text-sm text-[#232323]"
                />
              </div>

              <div>
                <label htmlFor="admin-ig-url" className="block text-xs font-medium text-[#232323] mb-1">
                  Instagram Profile URL
                </label>
                <input
                  id="admin-ig-url"
                  name="instagramUrl"
                  type="url"
                  value={draft.instagramUrl}
                  onChange={(e) => setDraft({ ...draft, instagramUrl: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#F5F3EC] border border-[#546B5A]/30 text-sm text-[#232323]"
                />
              </div>
            </div>
          )}

          {activeTab === 'workouts' && (
            <div className="space-y-3">
              {draft.workouts.map((w, idx) => (
                <div key={w.id} className="p-3 rounded-xl bg-[#F5F3EC] border border-[#546B5A]/25 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#546B5A]">{w.category}</span>
                    <input
                      type="text"
                      aria-label={`${w.category} duration`}
                      value={w.duration}
                      onChange={(e) => {
                        const updated = [...draft.workouts];
                        updated[idx] = { ...w, duration: e.target.value };
                        setDraft({ ...draft, workouts: updated });
                      }}
                      className="w-28 px-2 py-1 rounded bg-[#F5F3EC] border border-[#546B5A]/25 text-xs text-[#232323] text-right font-mono-tabular"
                    />
                  </div>
                  <textarea
                    rows={2}
                    aria-label={`${w.category} description`}
                    value={w.description}
                    onChange={(e) => {
                      const updated = [...draft.workouts];
                      updated[idx] = { ...w, description: e.target.value };
                      setDraft({ ...draft, workouts: updated });
                    }}
                    className="w-full px-2.5 py-1.5 rounded bg-[#F5F3EC] border border-[#546B5A]/25 text-xs text-[#232323]"
                  />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'testimonials' && (
            <div className="space-y-3">
              {draft.testimonials.items.map((item, idx) => (
                <div key={item.id} className="p-3.5 rounded-xl bg-[#F5F3EC] border border-[#546B5A]/25 space-y-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      aria-label={`Testimonial ${idx + 1} name`}
                      placeholder="Member Name"
                      value={item.name}
                      onChange={(e) => {
                        const next = [...draft.testimonials.items];
                        next[idx] = { ...item, name: e.target.value };
                        setDraft({
                          ...draft,
                          testimonials: { ...draft.testimonials, items: next },
                        });
                      }}
                      className="w-full px-3 py-1.5 rounded bg-[#F5F3EC] border border-[#546B5A]/25 text-xs font-semibold text-[#232323]"
                    />
                    <input
                      type="text"
                      aria-label={`Testimonial ${idx + 1} photo URL`}
                      placeholder="Photo URL"
                      value={item.avatarPlaceholder || ''}
                      onChange={(e) => {
                        const next = [...draft.testimonials.items];
                        next[idx] = { ...item, avatarPlaceholder: e.target.value };
                        setDraft({
                          ...draft,
                          testimonials: { ...draft.testimonials, items: next },
                        });
                      }}
                      className="w-full px-3 py-1.5 rounded bg-[#F5F3EC] border border-[#546B5A]/25 text-xs text-[#232323]"
                    />
                  </div>
                  <textarea
                    rows={2}
                    aria-label={`Testimonial ${idx + 1} quote`}
                    value={item.quote}
                    onChange={(e) => {
                      const next = [...draft.testimonials.items];
                      next[idx] = { ...item, quote: e.target.value };
                      setDraft({
                        ...draft,
                        testimonials: { ...draft.testimonials, items: next },
                      });
                    }}
                    className="w-full px-3 py-1.5 rounded bg-[#F5F3EC] border border-[#546B5A]/25 text-xs text-[#232323]"
                  />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'faq' && (
            <div className="space-y-3">
              {draft.faq.map((f, idx) => (
                <div key={f.id} className="p-3 rounded-xl bg-[#F5F3EC] border border-[#546B5A]/25 space-y-2">
                  <input
                    type="text"
                    aria-label={`FAQ ${idx + 1} question`}
                    value={f.question}
                    onChange={(e) => {
                      const next = [...draft.faq];
                      next[idx] = { ...f, question: e.target.value };
                      setDraft({ ...draft, faq: next });
                    }}
                    className="w-full px-3 py-1.5 rounded bg-[#F5F3EC] border border-[#546B5A]/25 text-xs font-semibold text-[#232323]"
                  />
                  <textarea
                    rows={2}
                    aria-label={`FAQ ${idx + 1} answer`}
                    value={f.answer}
                    onChange={(e) => {
                      const next = [...draft.faq];
                      next[idx] = { ...f, answer: e.target.value };
                      setDraft({ ...draft, faq: next });
                    }}
                    className="w-full px-3 py-1.5 rounded bg-[#F5F3EC] border border-[#546B5A]/25 text-xs text-[#232323]"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="pt-4 border-t border-[#546B5A]/25 flex items-center justify-between gap-3 sticky bottom-0 bg-[#F5F3EC] py-3">
            <button
              type="button"
              onClick={() => {
                onResetConfig();
                onClose();
              }}
              className="px-3.5 py-2 text-xs font-medium text-[#546B5A] hover:text-[#232323] border border-[#546B5A]/25 rounded-lg flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-[#F5F3EC] bg-[#546B5A] hover:bg-[#435246] rounded-lg flex items-center gap-1.5 cursor-pointer"
            >
              {savedNotice ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Saved</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
