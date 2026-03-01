import React, { useState } from 'react';
import { MathRenderer } from '../components/MathRenderer';
import { cn } from '../lib/utils';
import { Calculator, ArrowRight, RefreshCw } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { FormulaGuide } from '../components/FormulaGuide';

export function PolygonsDistances() {
  const [p1, setP1] = useState({ x: 500, y: 250 });
  const [p2, setP2] = useState({ x: 960, y: 1430 });
  const [result, setResult] = useState<number | null>(null);
  const { t } = useLanguage();

  const calculateDistance = () => {
    // Distance Formula: d = sqrt((x2 - x1)^2 + (y2 - y1)^2)
    // 1. Calculate the difference in x coordinates (run)
    const dx = p2.x - p1.x;
    // 2. Calculate the difference in y coordinates (rise)
    const dy = p2.y - p1.y;
    // 3. Square both differences, sum them, and take the square root
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    setResult(parseFloat(dist.toFixed(2)));
  };

  const generateRandomPoints = () => {
    setP1({
      x: Math.floor(Math.random() * 1000),
      y: Math.floor(Math.random() * 1000)
    });
    setP2({
      x: Math.floor(Math.random() * 1000),
      y: Math.floor(Math.random() * 1000)
    });
    setResult(null);
  };

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">{t('theory')}: {t('polygons.title')}</h2>
        <div className="bg-zinc-900/50 p-6 rounded-xl border border-white/10 text-zinc-300 space-y-4">
          <div>
            <strong>{t('polygons.title')}:</strong> {t('polygons.theory.intro')}
            <ul className="list-disc list-inside ml-4 mt-2">
              <li><span className="text-indigo-400">{t('polygons.regular')}</span></li>
              <li><span className="text-indigo-400">{t('polygons.irregular')}</span></li>
            </ul>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-bold text-white mb-2">{t('distance.formula.title')}</h3>
            <p className="mb-2">{t('distance.formula.desc')}</p>
            <div className="bg-black/30 p-4 rounded-lg text-center text-xl">
              <MathRenderer formula="d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}" />
            </div>
          </div>
        </div>
      </section>

      <FormulaGuide />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white">{t('practice')}: {t('distance.calculator')}</h2>
        <div className="bg-zinc-900 p-8 rounded-xl border border-white/10 flex flex-col gap-8">
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Point 1 Input */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-indigo-400 font-bold">
                <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center">1</div>
                {t('point.1')} (P₁)
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-zinc-500 mb-1">X₁</label>
                  <input
                    type="number"
                    value={p1.x}
                    onChange={(e) => setP1({ ...p1, x: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-500 mb-1">Y₁</label>
                  <input
                    type="number"
                    value={p1.y}
                    onChange={(e) => setP1({ ...p1, y: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Point 2 Input */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">2</div>
                {t('point.2')} (P₂)
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-zinc-500 mb-1">X₂</label>
                  <input
                    type="number"
                    value={p2.x}
                    onChange={(e) => setP2({ ...p2, x: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-500 mb-1">Y₂</label>
                  <input
                    type="number"
                    value={p2.y}
                    onChange={(e) => setP2({ ...p2, y: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={generateRandomPoints}
              className="px-6 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
            <button
              onClick={calculateDistance}
              className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Calculator className="w-5 h-5" />
              {t('calculate')}
            </button>
          </div>

          {result !== null && (
            <div className="bg-black/40 p-6 rounded-xl border border-white/5 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-zinc-400 text-sm mb-4">{t('calc.steps')}</h3>
              <div className="space-y-2 font-mono text-sm md:text-base text-zinc-300">
                <div className="flex items-center gap-2">
                  <span className="text-zinc-500">{t('formula')}:</span>
                  <MathRenderer formula="d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-zinc-500">{t('substitute')}:</span>
                  <MathRenderer formula={`d = \\sqrt{(${p2.x} - ${p1.x})^2 + (${p2.y} - ${p1.y})^2}`} />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-zinc-500">{t('simplify')}:</span>
                  <MathRenderer formula={`d = \\sqrt{(${p2.x - p1.x})^2 + (${p2.y - p1.y})^2}`} />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-zinc-500">{t('square')}:</span>
                  <MathRenderer formula={`d = \\sqrt{${Math.pow(p2.x - p1.x, 2)} + ${Math.pow(p2.y - p1.y, 2)}}`} />
                </div>
                <div className="flex items-center gap-2 pt-2 border-t border-white/10 mt-2">
                  <span className="text-emerald-400 font-bold text-lg">{t('result')}:</span>
                  <span className="text-2xl font-bold text-white">{result}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
