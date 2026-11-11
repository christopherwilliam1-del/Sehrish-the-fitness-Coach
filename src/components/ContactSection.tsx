import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, Instagram, Copy, Check, ExternalLink } from 'lucide-react';
import { SiteConfig } from '../data/siteConfig';

interface ContactSectionProps {
  config: SiteConfig;
  selectedGoal: string;
  onGoalChange: (goal: string) => void;
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  fitnessGoal: string;
  message: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  config,
  selectedGoal,
  onGoalChange,
}) => {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    fitnessGoal: selectedGoal || config.contact.goalOptions[0],
    message: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [copiedNotice, setCopiedNotice] = useState(false);
  const [formattedDmText, setFormattedDmText] = useState('');

  React.useEffect(() => {
    if (selectedGoal) {
      setFormData((prev) => ({ ...prev, fitnessGoal: selectedGoal }));
    }
  }, [selectedGoal]);

  const focusFirstField = () => {
    const input = document.getElementById('contact-name') as HTMLInputElement | null;
    if (input) {
      input.focus();
      input.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const getCleanHandle = (handle: string) => handle.replace(/^@/, '').trim() || 'sehrish.mall';

  const buildInstagramDmUrl = () => {
    if (config.instagramDmUrl && config.instagramDmUrl.trim() !== '') {
      return config.instagramDmUrl;
    }
    return `https://ig.me/m/${getCleanHandle(config.instagramUsername)}`;
  };

  const buildFormattedMessage = (data: FormState) => {
    const lines = [
      `Hi Sehrish (${config.instagramUsername}), I'd love to connect regarding fitness training!`,
      ``,
      `• Name: ${data.name.trim()}`,
      `• Email: ${data.email.trim()}`,
      ...(data.phone.trim() ? [`• Phone: ${data.phone.trim()}`] : []),
      `• Fitness Goal: ${data.fitnessGoal}`,
      `• Message: ${data.message.trim()}`,
    ];
    return lines.join('\n');
  };

  const copyTextToClipboard = async (text: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        setCopiedNotice(true);
        setTimeout(() => setCopiedNotice(false), 3500);
      }
    } catch {
      // Ignore clipboard permission errors in restricted contexts
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setError('Please enter your full name so Sehrish knows how to address you.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setError('Please provide a valid email address.');
      return;
    }

    if (formData.phone.trim() && formData.phone.trim().length < 7) {
      setError('Please enter a valid phone number or leave the optional field blank.');
      return;
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setError('Please share a brief message (at least 10 characters) about your current routine or goals.');
      return;
    }

    const dmMessage = buildFormattedMessage(formData);
    setFormattedDmText(dmMessage);

    // Copy message to clipboard so the user can immediately paste it into the Instagram DM thread
    await copyTextToClipboard(dmMessage);

    // Save locally as backup
    try {
      const existing = JSON.parse(localStorage.getItem('sehrish_inquiries') || '[]');
      existing.push({
        ...formData,
        dmMessage,
        submittedAt: new Date().toISOString(),
      });
      localStorage.setItem('sehrish_inquiries', JSON.stringify(existing));
    } catch {
      // Ignore storage errors
    }

    setSubmitted(true);

    // Trigger anchor navigation to Instagram DM thread
    const dmUrl = buildInstagramDmUrl();
    const link = document.createElement('a');
    link.href = dmUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const dmDirectUrl = buildInstagramDmUrl();

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-t border-[#546B5A]/25 bg-[#F5F3EC]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: High-Converting CTA Copy & Instagram-Only Contact */}
          <div className="lg:col-span-5 space-y-6">
            <p className="text-xs uppercase tracking-widest text-[#546B5A] font-medium">
              Consultation &amp; Direct Inquiry
            </p>
            <h2
              id="contact-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-[#232323]"
            >
              {config.contact.heading}
            </h2>
            <p className="text-base sm:text-lg text-[#546B5A] leading-relaxed">
              {config.contact.supportingText}
            </p>

            {/* Requested CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={focusFirstField}
                className="px-6 py-3.5 text-xs font-semibold tracking-wider uppercase text-[#F5F3EC] bg-[#546B5A] hover:bg-[#435246] rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                {config.contact.primaryCtaText}
              </button>
              <a
                href={config.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 text-xs font-semibold tracking-wider uppercase text-[#232323] bg-[#435246]/10 hover:bg-[#546B5A]/15 border border-[#546B5A]/30 rounded-lg transition-colors inline-flex items-center gap-2 whitespace-nowrap"
              >
                <Instagram className="w-4 h-4 text-[#546B5A]" aria-hidden="true" />
                <span>{config.contact.secondaryCtaText}</span>
              </a>
            </div>

            {/* Official Contact Channel: Instagram Only */}
            <div className="pt-8 border-t border-[#546B5A]/25 space-y-3">
              <p className="text-xs uppercase tracking-wider text-[#546B5A]">
                Official Contact Channel
              </p>
              <a
                href={config.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-sm sm:text-base font-medium text-[#232323] hover:text-[#546B5A] transition-colors"
              >
                <Instagram className="w-5 h-5 text-[#546B5A]" aria-hidden="true" />
                <span>Instagram · {config.instagramUsername}</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#546B5A]" aria-hidden="true" />
              </a>
              <p className="text-xs text-[#546B5A] leading-relaxed">
                Fill out the consultation sheet and press submit—your message is automatically formatted, copied for you, and directed straight to Sehrish’s Instagram DM ({config.instagramUsername}).
              </p>
            </div>
          </div>

          {/* Right Column: Validated Consultation Form that sends to Instagram */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-2xl bg-[#F5F3EC] border border-[#546B5A]/25 shadow-xl">
              {submitted ? (
                <div
                  className="py-6 space-y-6"
                  role="status"
                  aria-live="polite"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#546B5A]/15 border border-[#546B5A]/40 text-[#546B5A] flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl sm:text-2xl font-bold font-display text-[#232323]">
                        Ready to Send on Instagram, {formData.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#546B5A] leading-relaxed">
                        Your message has been formatted and copied to your clipboard. Paste and send it in the Instagram chat window with{' '}
                        <span className="text-[#232323] font-semibold">{config.instagramUsername}</span>.
                      </p>
                    </div>
                  </div>

                  {/* Formatted Message Preview Box */}
                  <div className="p-4 rounded-xl bg-[#F5F3EC] border border-[#546B5A]/25 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-[#546B5A]">
                        Your Formatted Instagram Message
                      </span>
                      <button
                        type="button"
                        onClick={() => copyTextToClipboard(formattedDmText)}
                        className="text-xs font-medium text-[#232323] hover:text-[#232323] flex items-center gap-1.5 cursor-pointer"
                      >
                        {copiedNotice ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#546B5A]" aria-hidden="true" />
                            <span className="text-[#546B5A]">Copied to Clipboard</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Copy Message Again</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="text-xs text-[#232323] whitespace-pre-wrap font-sans leading-relaxed bg-[#F5F3EC] p-3.5 rounded-lg border border-[#546B5A]/15">
                      {formattedDmText}
                    </pre>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
                    <a
                      href={dmDirectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3.5 text-xs font-semibold tracking-wider uppercase text-[#F5F3EC] bg-[#546B5A] hover:bg-[#435246] rounded-lg transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                    >
                      <Instagram className="w-4 h-4" aria-hidden="true" />
                      <span>Open Instagram DM ({config.instagramUsername})</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          fitnessGoal: config.contact.goalOptions[0],
                          message: '',
                        });
                      }}
                      className="px-5 py-3 text-xs font-medium text-[#546B5A] hover:text-[#232323] border border-[#546B5A]/30 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Edit or Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="pb-2 border-b border-[#546B5A]/25 flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold font-display text-[#232323]">
                        Personal Training &amp; Consultation Sheet
                      </h3>
                      <p className="text-xs text-[#546B5A] mt-1">
                        Fill out your details below—submitting sends your inquiry directly to {config.instagramUsername} on Instagram.
                      </p>
                    </div>
                    <Instagram className="w-5 h-5 text-[#546B5A] shrink-0" aria-hidden="true" />
                  </div>

                  {error && (
                    <div
                      role="alert"
                      className="p-3.5 rounded-lg bg-[#435246]/10 border border-[#546B5A]/35 text-[#232323] text-xs flex items-center gap-2.5"
                    >
                      <AlertCircle className="w-4 h-4 text-[#546B5A] shrink-0" aria-hidden="true" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-medium text-[#232323] mb-1.5"
                      >
                        Name <span className="text-[#546B5A]">*</span>
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-[#F5F3EC] border border-[#546B5A]/30 focus:border-[#546B5A] focus:outline-none text-sm text-[#232323] placeholder:text-[#546B5A]/50 transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-medium text-[#232323] mb-1.5"
                      >
                        Email <span className="text-[#546B5A]">*</span>
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-[#F5F3EC] border border-[#546B5A]/30 focus:border-[#546B5A] focus:outline-none text-sm text-[#232323] placeholder:text-[#546B5A]/50 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="block text-xs font-medium text-[#232323] mb-1.5"
                      >
                        Phone <span className="text-[#546B5A] font-normal">(Optional)</span>
                      </label>
                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-[#F5F3EC] border border-[#546B5A]/30 focus:border-[#546B5A] focus:outline-none text-sm text-[#232323] placeholder:text-[#546B5A]/50 transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-fitness-goal"
                        className="block text-xs font-medium text-[#232323] mb-1.5"
                      >
                        Fitness Goal <span className="text-[#546B5A]">*</span>
                      </label>
                      <select
                        id="contact-fitness-goal"
                        name="fitnessGoal"
                        value={formData.fitnessGoal}
                        onChange={(e) => {
                          setFormData({ ...formData, fitnessGoal: e.target.value });
                          onGoalChange(e.target.value);
                        }}
                        className="w-full px-4 py-3 rounded-lg bg-[#F5F3EC] border border-[#546B5A]/30 focus:border-[#546B5A] focus:outline-none text-sm text-[#232323] transition-colors"
                      >
                        {config.contact.goalOptions.map((goal) => (
                          <option key={goal} value={goal} className="bg-[#F5F3EC] text-[#232323]">
                            {goal}
                          </option>
                        ))}
                        {!config.contact.goalOptions.includes(formData.fitnessGoal) && (
                          <option value={formData.fitnessGoal} className="bg-[#F5F3EC] text-[#232323]">
                            {formData.fitnessGoal}
                          </option>
                        )}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-medium text-[#232323] mb-1.5"
                    >
                      Message <span className="text-[#546B5A]">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      required
                      placeholder="Share your current training schedule, experience level, and what you would like to achieve..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-[#F5F3EC] border border-[#546B5A]/30 focus:border-[#546B5A] focus:outline-none text-sm text-[#232323] placeholder:text-[#546B5A]/50 transition-colors"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <span className="text-xs text-[#546B5A]">
                      Copies your details &amp; opens Instagram DM ({config.instagramUsername}).
                    </span>
                    <button
                      type="submit"
                      className="px-7 py-3.5 text-xs font-semibold tracking-wider uppercase text-[#F5F3EC] bg-[#546B5A] hover:bg-[#435246] rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                    >
                      <Instagram className="w-4 h-4" aria-hidden="true" />
                      <span>Send Message on Instagram</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
