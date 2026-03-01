import React, { useState } from 'react';
import { MathRenderer } from '../components/MathRenderer';
import { cn } from '../lib/utils';
import { useLanguage } from '../contexts/LanguageContext';

export function CartesianPlane() {
  const [point, setPoint] = useState(generateRandomPoint());
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [score, setScore] = useState(0);
  const { t } = useLanguage();

  function generateRandomPoint() {
    const x = Math.floor(Math.random() * 2000) - 1000;
    const y = Math.floor(Math.random() * 2000) - 1000;
    // Ensure not on axis
    if (x === 0) return { x: 1, y };
    if (y === 0) return { x, y: 1 };
    return { x, y };
  }

  function checkAnswer(quadrant: number) {
    let correct = false;
    if (point.x > 0 && point.y > 0 && quadrant === 1) correct = true;
    else if (point.x < 0 && point.y > 0 && quadrant === 2) correct = true;
    else if (point.x < 0 && point.y < 0 && quadrant === 3) correct = true;
    else if (point.x > 0 && point.y < 0 && quadrant === 4) correct = true;

    if (correct) {
      setFeedback('correct');
      setScore(s => s + 1);
      setTimeout(() => {
        setFeedback(null);
        setPoint(generateRandomPoint());
      }, 1000);
    } else {
      setFeedback('incorrect');
      setTimeout(() => setFeedback(null), 1000);
    }
  }

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">{t('theory')}: {t('cartesian.title')}</h2>
        <div className="bg-zinc-900/50 p-6 rounded-xl border border-white/10 text-zinc-300 space-y-4">
          <p>
            {t('cartesian.theory.intro')} <MathRenderer formula="(0,0)" />.
          </p>
          <p>
            {t('cartesian.theory.quadrants')}
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong className="text-indigo-400">{t('quadrant.i')}:</strong> <MathRenderer formula="(+, +)" /></li>
            <li><strong className="text-indigo-400">{t('quadrant.ii')}:</strong> <MathRenderer formula="(-, +)" /></li>
            <li><strong className="text-indigo-400">{t('quadrant.iii')}:</strong> <MathRenderer formula="(-, -)" /></li>
            <li><strong className="text-indigo-400">{t('quadrant.iv')}:</strong> <MathRenderer formula="(+, -)" /></li>
          </ul>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white">{t('practice')}: {t('identify.quadrant')}</h2>
        <div className="bg-zinc-900 p-8 rounded-xl border border-white/10 flex flex-col items-center gap-8">
          <div className="text-center space-y-2">
            <p className="text-zinc-400">{t('identify.quadrant')}</p>
            <div className="text-4xl font-mono font-bold text-white">
              P({point.x}, {point.y})
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full max-w-md">
            {[1, 2, 3, 4].map((q) => (
              <button
                key={q}
                onClick={() => checkAnswer(q)}
                disabled={feedback !== null}
                className={cn(
                  "h-24 text-xl font-bold rounded-xl transition-all border-2",
                  "hover:scale-105 active:scale-95",
                  feedback === null && "bg-zinc-800 border-zinc-700 hover:bg-zinc-700 hover:border-indigo-500 text-zinc-300",
                  feedback === 'correct' && "bg-emerald-900/50 border-emerald-500 text-emerald-200 opacity-50",
                  feedback === 'incorrect' && "bg-red-900/50 border-red-500 text-red-200 opacity-50"
                )}
              >
                {t(`quadrant.${['i', 'ii', 'iii', 'iv'][q-1]}`)}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 text-zinc-400">
            <span>{t('score')}: <span className="text-white font-bold">{score}</span></span>
            {feedback === 'correct' && <span className="text-emerald-400 font-bold animate-pulse">{t('correct')}</span>}
            {feedback === 'incorrect' && <span className="text-red-400 font-bold animate-pulse">{t('try.again')}</span>}
          </div>
        </div>
      </section>
    </div>
  );
}
