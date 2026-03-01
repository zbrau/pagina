import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { MathRenderer } from './MathRenderer';
import { HelpCircle } from 'lucide-react';

export function FormulaGuide() {
  const { t } = useLanguage();

  return (
    <div className="bg-zinc-900/80 border border-indigo-500/30 p-6 rounded-xl space-y-4">
      <div className="flex items-center gap-2 text-indigo-400 mb-2">
        <HelpCircle className="w-5 h-5" />
        <h3 className="font-bold text-lg">{t('formula.guide')}</h3>
      </div>
      <p className="text-zinc-400 text-sm">{t('formula.guide.desc')}</p>
      
      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-black/40 p-4 rounded-lg border border-white/5">
          <p className="text-xs text-zinc-500 mb-1">{t('guide.dist.q')}</p>
          <p className="text-emerald-400 font-bold text-sm mb-2">{t('guide.dist.a')}</p>
          <div className="text-xs">
            <MathRenderer formula="d = \sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}" />
          </div>
        </div>

        <div className="bg-black/40 p-4 rounded-lg border border-white/5">
          <p className="text-xs text-zinc-500 mb-1">{t('guide.slope.q')}</p>
          <p className="text-emerald-400 font-bold text-sm mb-2">{t('guide.slope.a')}</p>
          <div className="text-xs">
            <MathRenderer formula="m = \frac{y_2-y_1}{x_2-x_1}" />
          </div>
        </div>

        <div className="bg-black/40 p-4 rounded-lg border border-white/5">
          <p className="text-xs text-zinc-500 mb-1">{t('guide.midpoint.q')}</p>
          <p className="text-emerald-400 font-bold text-sm mb-2">{t('guide.midpoint.a')}</p>
          <div className="text-xs">
            <MathRenderer formula="M(\frac{x_1+x_2}{2}, \frac{y_1+y_2}{2})" />
          </div>
        </div>
      </div>
    </div>
  );
}
