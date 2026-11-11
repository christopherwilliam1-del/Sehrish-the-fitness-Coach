import React from 'react';
import { X, Dumbbell, Clock, CheckCircle2, ArrowUpRight, Sparkles } from 'lucide-react';
import { WorkoutItem } from '../data/siteConfig';
import { ResilientImage } from './ResilientImage';

interface WorkoutModalProps {
  workout: WorkoutItem | null;
  onClose: () => void;
  onStartConsultation: (goal: string) => void;
}

export const WorkoutModal: React.FC<WorkoutModalProps> = ({
  workout,
  onClose,
  onStartConsultation,
}) => {
  if (!workout) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#435246]/80 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="workout-modal-title"
    >
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#F5F3EC] border border-[#546B5A]/30 shadow-2xl text-[#232323]">
        {/* Top image header */}
        <div className="relative h-56 sm:h-64 w-full">
          <ResilientImage
            src={workout.image}
            alt={`${workout.category} training session`}
            containerClassName="w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F5F3EC] via-[#F5F3EC]/50 to-[#435246]/30" />

          <button
            type="button"
            onClick={onClose}
            aria-label="Close workout details"
            className="absolute top-4 right-4 w-10 h-10 rounded-lg bg-[#435246]/70 hover:bg-[#435246] text-[#232323] border border-[#546B5A]/30 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-5 left-6 right-6">
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#546B5A] font-medium mb-2">
              <span>{workout.difficulty}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono-tabular">{workout.duration}</span>
              <span aria-hidden="true">·</span>
              <span>{workout.equipment}</span>
            </div>
            <h3
              id="workout-modal-title"
              className="text-2xl sm:text-3xl font-bold tracking-tight font-display text-[#232323]"
            >
              {workout.category} SESSION BLUEPRINT
            </h3>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 space-y-8">
          <p className="text-sm sm:text-base text-[#546B5A] leading-relaxed">
            {workout.description}
          </p>

          {/* Focus areas as clean unboxed text */}
          <div className="pb-6 border-b border-[#546B5A]/25">
            <p className="text-xs uppercase tracking-wider text-[#546B5A] mb-2">
              Primary Training Focus
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#232323] font-medium">
              {workout.focusAreas.map((focus, idx) => (
                <React.Fragment key={focus}>
                  <span>{focus}</span>
                  {idx < workout.focusAreas.length - 1 && (
                    <span className="text-[#546B5A]" aria-hidden="true">
                      ·
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Warmup */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#546B5A] mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4" aria-hidden="true" />
              01. Dynamic Preparation &amp; Warm-Up
            </h4>
            <ul className="space-y-2 text-sm text-[#232323]">
              {workout.warmup.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-[#546B5A] font-mono-tabular text-xs mt-1">
                    0{idx + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Main Workout Table / Cards */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#546B5A] mb-4 flex items-center gap-2">
              <Dumbbell className="w-4 h-4" aria-hidden="true" />
              02. Structured Working Sets
            </h4>
            <div className="space-y-3">
              {workout.exercises.map((ex, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#F5F3EC] border border-[#546B5A]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-mono-tabular text-[#546B5A]">
                        {String.fromCharCode(65 + idx)}1
                      </span>
                      <h5 className="font-semibold text-[#232323] text-base">
                        {ex.name}
                      </h5>
                    </div>
                    <p className="text-xs text-[#546B5A] leading-relaxed">
                      <strong className="text-[#232323] font-medium">Form Cue:</strong> {ex.cue}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#546B5A]/25 text-xs font-mono-tabular">
                    <div>
                      <span className="block text-[#546B5A]">SETS</span>
                      <span className="text-sm font-semibold text-[#232323]">{ex.sets}</span>
                    </div>
                    <span className="text-[#232323]/20" aria-hidden="true">/</span>
                    <div>
                      <span className="block text-[#546B5A]">REPS</span>
                      <span className="text-sm font-semibold text-[#232323]">{ex.reps}</span>
                    </div>
                    <span className="text-[#232323]/20" aria-hidden="true">/</span>
                    <div>
                      <span className="block text-[#546B5A]">REST</span>
                      <span className="text-sm font-semibold text-[#546B5A]">{ex.rest}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cooldown & Safety Note */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-4 rounded-xl bg-[#F5F3EC]/[0.02] border border-[#546B5A]/25">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#232323] mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#546B5A]" aria-hidden="true" />
                03. Decompression &amp; Cooldown
              </h4>
              <ul className="space-y-1.5 text-xs text-[#546B5A]">
                {workout.cooldown.map((step, i) => (
                  <li key={i}>• {step}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-[#F5F3EC]/[0.02] border border-[#546B5A]/25">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#232323] mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#546B5A]" aria-hidden="true" />
                Mindful Training Note
              </h4>
              <p className="text-xs text-[#546B5A] leading-relaxed">
                Select loads that allow full control through every repetition. Stop any movement that causes sharp joint discomfort. General educational blueprint only.
              </p>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="pt-4 border-t border-[#546B5A]/25 flex flex-col sm:flex-row items-center justify-between gap-4">
            {workout.workoutUrl ? (
              <a
                href={workout.workoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#546B5A] hover:underline flex items-center gap-1.5"
              >
                <span>Open External Workout Link</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            ) : (
              <span className="text-xs text-[#546B5A]">
                Want this session tailored to your schedule?
              </span>
            )}

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-medium text-[#232323] hover:text-[#232323] border border-[#546B5A]/30 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                Close Preview
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onStartConsultation(`Inquiry regarding ${workout.category} Training`);
                }}
                className="px-5 py-2.5 text-xs font-semibold text-[#F5F3EC] bg-[#546B5A] hover:bg-[#435246] rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                Inquire About Coaching
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
