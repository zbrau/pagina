import React, { useState, useEffect } from 'react';
import { MathRenderer } from '../components/MathRenderer';
import { cn } from '../lib/utils';
import { Check, X, RefreshCw } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { FormulaGuide } from '../components/FormulaGuide';

export function TheLine() {
  const [points, setPoints] = useState({ x1: 4, y1: -8, x2: -5, y2: 7 });
  const [userSlope, setUserSlope] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const { t } = useLanguage();

  const generatePoints = () => {
    // Generate points that result in a clean(er) slope if possible, or just random integers
    const x1 = Math.floor(Math.random() * 20) - 10;
    const y1 = Math.floor(Math.random() * 20) - 10;
    let x2 = Math.floor(Math.random() * 20) - 10;
    const y2 = Math.floor(Math.random() * 20) - 10;
    
    // Avoid undefined slope for this exercise level
    if (x1 === x2) x2 += 1;

    setPoints({ x1, y1, x2, y2 });
    setUserSlope('');
    setFeedback(null);
  };

  const checkSlope = () => {
    // Slope Formula: m = (y2 - y1) / (x2 - x1)
    // This represents the rate of change or steepness of the line.
    const actualSlope = (points.y2 - points.y1) / (points.x2 - points.x1);
    const userVal = parseFloat(userSlope);

    if (isNaN(userVal)) return;

    // Validate the user's answer against the calculated slope.
    // We use a small epsilon (0.05) to allow for minor floating-point rounding differences.
    if (Math.abs(userVal - actualSlope) < 0.05) {
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
    }
  };

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">{t('theory')}: {t('line.title')}</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-zinc-900/50 p-6 rounded-xl border border-white/10 text-zinc-300">
            <h3 className="text-lg font-bold text-indigo-400 mb-2">{t('slope')} (m)</h3>
            <p className="text-sm mb-2">{t('slope.desc')}</p>
            <div className="bg-black/30 p-2 rounded text-center">
              <MathRenderer formula="m = \frac{y_2 - y_1}{x_2 - x_1}" />
            </div>
          </div>
          <div className="bg-zinc-900/50 p-6 rounded-xl border border-white/10 text-zinc-300">
            <h3 className="text-lg font-bold text-indigo-400 mb-2">{t('angle')} (<MathRenderer formula="\theta" />)</h3>
            <p className="text-sm mb-2">{t('angle.desc')}</p>
            <div className="bg-black/30 p-2 rounded text-center">
              <MathRenderer formula="\tan \theta = m" />
            </div>
          </div>
          <div className="bg-zinc-900/50 p-6 rounded-xl border border-white/10 text-zinc-300">
            <h3 className="text-lg font-bold text-indigo-400 mb-2">{t('general.eq')}</h3>
            <p className="text-sm mb-2">{t('general.eq.desc')}</p>
            <div className="bg-black/30 p-2 rounded text-center">
              <MathRenderer formula="Ax + By + C = 0" />
            </div>
          </div>
        </div>
      </section>

      <FormulaGuide />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white">{t('practice')}: {t('calc.slope')}</h2>
        <div className="bg-zinc-900 p-8 rounded-xl border border-white/10 flex flex-col items-center gap-8">
          
          <div className="flex items-center gap-8 text-2xl font-mono">
            <div className="bg-indigo-500/10 border border-indigo-500/50 px-6 py-4 rounded-xl text-indigo-200">
              P₁({points.x1}, {points.y1})
            </div>
            <div className="text-zinc-600">→</div>
            <div className="bg-emerald-500/10 border border-emerald-500/50 px-6 py-4 rounded-xl text-emerald-200">
              P₂({points.x2}, {points.y2})
            </div>
          </div>

          <div className="w-full max-w-md space-y-4">
            <label className="block text-center text-zinc-400">
              {t('calc.slope')} <MathRenderer formula="m" />:
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                step="0.01"
                value={userSlope}
                onChange={(e) => setUserSlope(e.target.value)}
                placeholder={t('enter.slope')}
                className="flex-1 bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-3 text-white text-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                onKeyDown={(e) => e.key === 'Enter' && checkSlope()}
              />
              <button
                onClick={checkSlope}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 rounded-lg font-bold transition-colors"
              >
                {t('check.answer')}
              </button>
            </div>
          </div>

          {feedback && (
            <div className={cn(
              "w-full max-w-md p-4 rounded-xl border flex items-center gap-4 animate-in fade-in slide-in-from-top-2",
              feedback === 'correct' ? "bg-emerald-900/20 border-emerald-500/50 text-emerald-200" : "bg-red-900/20 border-red-500/50 text-red-200"
            )}>
              {feedback === 'correct' ? (
                <>
                  <div className="bg-emerald-500/20 p-2 rounded-full"><Check className="w-6 h-6" /></div>
                  <div>
                    <p className="font-bold">{t('correct')}</p>
                    <p className="text-sm opacity-80">{t('good.job')}</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-red-500/20 p-2 rounded-full"><X className="w-6 h-6" /></div>
                  <div>
                    <p className="font-bold">{t('incorrect')}</p>
                    <p className="text-sm opacity-80">
                      {t('hint.slope')}
                    </p>
                  </div>
                </>
              )}
            </div>
          )}

          <button
            onClick={generatePoints}
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm"
          >
            <RefreshCw className="w-4 h-4" />
            {t('generate.random')}
          </button>

        </div>
      </section>
    </div>
  );
}
