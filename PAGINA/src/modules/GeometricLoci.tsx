import React, { useState, useEffect } from 'react';
import { MathRenderer } from '../components/MathRenderer';
import { cn } from '../lib/utils';
import { CheckCircle2, XCircle, RefreshCw, Lightbulb } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { FormulaGuide } from '../components/FormulaGuide';

interface Question {
  id: number;
  equation: string;
  type: string;
}

export function GeometricLoci() {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [showTips, setShowTips] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    generateQuestions();
  }, []);

  const generateQuestions = () => {
    const newQuestions: Question[] = [];
    const types = ['line', 'circle', 'parabola', 'ellipse'];
    
    for (let i = 1; i <= 6; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      let equation = "";
      
      const r = Math.floor(Math.random() * 20) + 1;
      const a = Math.floor(Math.random() * 10) + 1;
      const b = Math.floor(Math.random() * 10) + 1;
      const c = Math.floor(Math.random() * 10) + 1;

      switch (type) {
        case 'line':
          equation = `${a}x + ${b === 1 ? '' : b}y = ${c}`;
          break;
        case 'circle':
          equation = `x^2 + y^2 = ${r * r}`;
          break;
        case 'parabola':
          equation = Math.random() > 0.5 
            ? `y = ${a === 1 ? '' : a}x^2 ${Math.random() > 0.5 ? '+' : '-'} ${b}`
            : `x = ${a === 1 ? '' : a}y^2 ${Math.random() > 0.5 ? '+' : '-'} ${b}`;
          break;
        case 'ellipse':
          equation = `${a}x^2 + ${b + a}y^2 = ${c * 10}`; // Simplified ellipse-like form for recognition
          break;
      }
      newQuestions.push({ id: i, equation, type });
    }
    setQuestions(newQuestions);
    setAnswers({});
    setShowResults(false);
  };

  const handleSelect = (id: number, value: string) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
    setShowResults(false);
  };

  const checkAnswers = () => {
    setShowResults(true);
  };

  const getScore = () => {
    let correct = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.type) correct++;
    });
    return correct;
  };

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">{t('theory')}: {t('loci.title')}</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-zinc-900/50 p-6 rounded-xl border border-white/10 text-zinc-300">
            <h3 className="text-lg font-bold text-indigo-400 mb-2">{t('loci.line')}</h3>
            <p className="text-sm mb-2">{t('loci.line.desc')}</p>
            <div className="bg-black/30 p-2 rounded text-center">
              <MathRenderer formula="Ax + By + C = 0" />
            </div>
          </div>
          <div className="bg-zinc-900/50 p-6 rounded-xl border border-white/10 text-zinc-300">
            <h3 className="text-lg font-bold text-indigo-400 mb-2">{t('loci.circle')}</h3>
            <p className="text-sm mb-2">{t('loci.circle.desc')}</p>
            <div className="bg-black/30 p-2 rounded text-center">
              <MathRenderer formula="(x-h)^2 + (y-k)^2 = r^2" />
            </div>
          </div>
          <div className="bg-zinc-900/50 p-6 rounded-xl border border-white/10 text-zinc-300">
            <h3 className="text-lg font-bold text-indigo-400 mb-2">{t('loci.parabola')}</h3>
            <p className="text-sm mb-2">{t('loci.parabola.desc')}</p>
            <div className="bg-black/30 p-2 rounded text-center">
              <MathRenderer formula="y = ax^2 + bx + c" />
            </div>
          </div>
          <div className="bg-zinc-900/50 p-6 rounded-xl border border-white/10 text-zinc-300">
            <h3 className="text-lg font-bold text-indigo-400 mb-2">{t('loci.ellipse')}</h3>
            <p className="text-sm mb-2">{t('loci.ellipse.desc')}</p>
            <div className="bg-black/30 p-2 rounded text-center">
              <MathRenderer formula="\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1" />
            </div>
          </div>
        </div>
      </section>

      <FormulaGuide />

      <div className="bg-indigo-900/20 border border-indigo-500/30 rounded-xl overflow-hidden">
        <button 
          onClick={() => setShowTips(!showTips)}
          className="w-full flex items-center justify-between p-4 hover:bg-indigo-500/10 transition-colors"
        >
          <div className="flex items-center gap-2 text-indigo-300 font-bold">
            <Lightbulb className="w-5 h-5" />
            {t('loci.tips.title')}
          </div>
          <span className="text-xs text-indigo-400 bg-indigo-500/20 px-2 py-1 rounded">
            {showTips ? 'Hide' : 'Show'}
          </span>
        </button>
        
        {showTips && (
          <div className="p-4 pt-0 grid gap-3 md:grid-cols-2 animate-in slide-in-from-top-2">
            <div className="bg-black/40 p-3 rounded-lg border border-indigo-500/20">
              <span className="text-emerald-400 font-bold text-sm block mb-1">{t('loci.line')}</span>
              <p className="text-zinc-400 text-xs">{t('loci.tip.line')}</p>
            </div>
            <div className="bg-black/40 p-3 rounded-lg border border-indigo-500/20">
              <span className="text-emerald-400 font-bold text-sm block mb-1">{t('loci.parabola')}</span>
              <p className="text-zinc-400 text-xs">{t('loci.tip.parabola')}</p>
            </div>
            <div className="bg-black/40 p-3 rounded-lg border border-indigo-500/20">
              <span className="text-emerald-400 font-bold text-sm block mb-1">{t('loci.circle')}</span>
              <p className="text-zinc-400 text-xs">{t('loci.tip.circle')}</p>
            </div>
            <div className="bg-black/40 p-3 rounded-lg border border-indigo-500/20">
              <span className="text-emerald-400 font-bold text-sm block mb-1">{t('loci.ellipse')}</span>
              <p className="text-zinc-400 text-xs">{t('loci.tip.ellipse')}</p>
            </div>
          </div>
        )}
      </div>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">{t('practice')}: {t('identify.locus')}</h2>
          {showResults && (
            <div className="text-lg font-bold text-emerald-400">
              {t('score')}: {getScore()} / {questions.length}
            </div>
          )}
        </div>

        <div className="bg-zinc-900 p-8 rounded-xl border border-white/10 space-y-6">
          {questions.map((q) => (
            <div key={q.id} className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-zinc-800/50 rounded-lg border border-white/5">
              <div className="font-mono text-xl text-white">
                <MathRenderer formula={q.equation} />
              </div>
              
              <div className="flex items-center gap-3">
                <select
                  value={answers[q.id] || ""}
                  onChange={(e) => handleSelect(q.id, e.target.value)}
                  className="bg-zinc-950 border border-zinc-700 text-zinc-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none min-w-[150px]"
                  disabled={showResults}
                >
                  <option value="" disabled>{t('select.type')}</option>
                  <option value="line">{t('loci.line')}</option>
                  <option value="circle">{t('loci.circle')}</option>
                  <option value="parabola">{t('loci.parabola')}</option>
                  <option value="ellipse">{t('loci.ellipse')}</option>
                </select>

                {showResults && (
                  <div className="w-8 flex justify-center">
                    {answers[q.id] === q.type ? (
                      <CheckCircle2 className="text-emerald-500 w-6 h-6" />
                    ) : (
                      <XCircle className="text-red-500 w-6 h-6" />
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}

          <div className="flex justify-between pt-4">
             <button
                onClick={generateQuestions}
                className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                {t('generate.random')}
              </button>

            {!showResults ? (
              <button
                onClick={checkAnswers}
                disabled={Object.keys(answers).length < questions.length}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-8 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t('check.answer')}
              </button>
            ) : (
              <button
                onClick={() => {
                  setAnswers({});
                  setShowResults(false);
                  generateQuestions();
                }}
                className="bg-zinc-700 hover:bg-zinc-600 text-white font-bold py-3 px-8 rounded-xl transition-colors"
              >
                {t('reset')}
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
