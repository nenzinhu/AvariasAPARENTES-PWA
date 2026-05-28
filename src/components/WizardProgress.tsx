import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Button } from './ui/Button';

interface WizardStep {
  idx: number;
  label: string;
  isDone: boolean;
  hasPending?: boolean;
  pendingCount?: number;
}

interface WizardProgressProps {
  currentStep: number;
  steps: WizardStep[];
  onStepClick: (idx: number) => void;
  onPrev: () => void;
  onNext: () => void;
  canNext: boolean;
}

export const WizardProgress: React.FC<WizardProgressProps> = ({
  currentStep,
  steps,
  onStepClick,
  onPrev,
  onNext,
  canNext
}) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="text-xs font-black uppercase tracking-wider text-slate-500">{t('wizard_progress.title')}</div>
          <div className="text-sm font-bold text-slate-300">
            {t('wizard_progress.step', { current: currentStep + 1, total: steps.length, label: steps[currentStep].label })}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={onPrev}
            disabled={currentStep === 0}
          >
            <ChevronLeft size={14} className="mr-1" />
            {t('wizard_progress.prev')}
          </Button>
          <Button
            size="sm"
            onClick={onNext}
            disabled={!canNext || currentStep === steps.length - 1}
          >
            {t('wizard_progress.next')}
            <ChevronRight size={14} className="ml-1" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
        {steps.map(step => (
          <button
            key={step.idx}
            onClick={() => onStepClick(step.idx)}
            className={`px-3 py-2 rounded-lg border text-xs font-black transition-all flex items-center justify-between gap-2 ${
              currentStep === step.idx
                ? 'bg-blue-600/15 border-blue-500/30 text-blue-300'
                : step.isDone
                  ? 'bg-slate-800/40 border-white/5 text-slate-200'
                  : 'bg-slate-900/30 border-white/5 text-slate-500 hover:bg-slate-800/40'
            }`}
          >
            <span>{step.label}</span>
            {step.hasPending ? (
              <span className="flex items-center gap-1 text-[10px] text-red-300">
                <AlertTriangle size={12} />
                {step.pendingCount}
              </span>
            ) : step.isDone ? (
              <CheckCircle2 size={14} className="text-green-400" />
            ) : null}
          </button>
        ))}
      </div>
    </div>
  );
};
