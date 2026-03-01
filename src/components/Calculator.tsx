import React, { useState } from 'react';
import { cn } from '../lib/utils';
import { X, Delete, Eraser, Calculator as CalcIcon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function Calculator() {
  const [isOpen, setIsOpen] = useState(false);
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const { t } = useLanguage();

  const handleNumber = (num: string) => {
    setDisplay(prev => (prev === '0' ? num : prev + num));
  };

  const handleOperator = (op: string) => {
    setExpression(display + ' ' + op + ' ');
    setDisplay('0');
  };

  const handleClear = () => {
    setDisplay('0');
    setExpression('');
  };

  const handleBackspace = () => {
    setDisplay(prev => (prev.length > 1 ? prev.slice(0, -1) : '0'));
  };

  const handleEqual = () => {
    try {
      const fullExpr = expression + display;
      // eslint-disable-next-line no-eval
      const result = eval(fullExpr.replace('×', '*').replace('÷', '/'));
      setDisplay(String(parseFloat(result.toFixed(4))));
      setExpression('');
    } catch (e) {
      setDisplay('Error');
      setExpression('');
    }
  };

  const handleSqrt = () => {
    try {
      const val = parseFloat(display);
      if (val < 0) {
        setDisplay('Error');
      } else {
        setDisplay(String(Math.sqrt(val).toFixed(4)));
      }
    } catch (e) {
      setDisplay('Error');
    }
  };

  const handleSquare = () => {
    try {
      const val = parseFloat(display);
      setDisplay(String((val * val).toFixed(4)));
    } catch (e) {
      setDisplay('Error');
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed right-0 top-1/2 -translate-y-1/2 z-50 p-3 rounded-l-xl shadow-lg transition-all duration-300",
          isOpen ? "translate-x-full opacity-0" : "bg-indigo-600 hover:bg-indigo-500 text-white translate-x-0"
        )}
      >
        <CalcIcon className="w-6 h-6" />
      </button>

      {/* Calculator Panel */}
      <div className={cn(
        "fixed right-0 top-0 bottom-0 w-80 bg-zinc-950 border-l border-white/10 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-zinc-900">
          <div className="flex items-center gap-2 text-white font-bold">
            <CalcIcon className="w-5 h-5 text-indigo-400" />
            Calculator
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Display */}
        <div className="p-6 bg-black flex-1 flex flex-col justify-end items-end gap-2 font-mono">
          <div className="text-zinc-500 text-sm h-6">{expression}</div>
          <div className="text-white text-4xl font-bold break-all">{display}</div>
        </div>

        {/* Keypad */}
        <div className="p-4 grid grid-cols-4 gap-3 bg-zinc-900">
          <button onClick={handleClear} className="col-span-2 bg-red-900/30 text-red-400 hover:bg-red-900/50 p-4 rounded-lg font-bold transition-colors">AC</button>
          <button onClick={handleBackspace} className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 p-4 rounded-lg transition-colors flex items-center justify-center"><Delete className="w-5 h-5" /></button>
          <button onClick={() => handleOperator('÷')} className="bg-indigo-900/30 text-indigo-400 hover:bg-indigo-900/50 p-4 rounded-lg font-bold transition-colors">÷</button>

          <button onClick={() => handleNumber('7')} className="bg-zinc-800 hover:bg-zinc-700 text-white p-4 rounded-lg font-bold transition-colors">7</button>
          <button onClick={() => handleNumber('8')} className="bg-zinc-800 hover:bg-zinc-700 text-white p-4 rounded-lg font-bold transition-colors">8</button>
          <button onClick={() => handleNumber('9')} className="bg-zinc-800 hover:bg-zinc-700 text-white p-4 rounded-lg font-bold transition-colors">9</button>
          <button onClick={() => handleOperator('×')} className="bg-indigo-900/30 text-indigo-400 hover:bg-indigo-900/50 p-4 rounded-lg font-bold transition-colors">×</button>

          <button onClick={() => handleNumber('4')} className="bg-zinc-800 hover:bg-zinc-700 text-white p-4 rounded-lg font-bold transition-colors">4</button>
          <button onClick={() => handleNumber('5')} className="bg-zinc-800 hover:bg-zinc-700 text-white p-4 rounded-lg font-bold transition-colors">5</button>
          <button onClick={() => handleNumber('6')} className="bg-zinc-800 hover:bg-zinc-700 text-white p-4 rounded-lg font-bold transition-colors">6</button>
          <button onClick={() => handleOperator('-')} className="bg-indigo-900/30 text-indigo-400 hover:bg-indigo-900/50 p-4 rounded-lg font-bold transition-colors">-</button>

          <button onClick={() => handleNumber('1')} className="bg-zinc-800 hover:bg-zinc-700 text-white p-4 rounded-lg font-bold transition-colors">1</button>
          <button onClick={() => handleNumber('2')} className="bg-zinc-800 hover:bg-zinc-700 text-white p-4 rounded-lg font-bold transition-colors">2</button>
          <button onClick={() => handleNumber('3')} className="bg-zinc-800 hover:bg-zinc-700 text-white p-4 rounded-lg font-bold transition-colors">3</button>
          <button onClick={() => handleOperator('+')} className="bg-indigo-900/30 text-indigo-400 hover:bg-indigo-900/50 p-4 rounded-lg font-bold transition-colors">+</button>

          <button onClick={() => handleNumber('0')} className="col-span-2 bg-zinc-800 hover:bg-zinc-700 text-white p-4 rounded-lg font-bold transition-colors">0</button>
          <button onClick={() => handleNumber('.')} className="bg-zinc-800 hover:bg-zinc-700 text-white p-4 rounded-lg font-bold transition-colors">.</button>
          <button onClick={handleEqual} className="bg-emerald-600 hover:bg-emerald-500 text-white p-4 rounded-lg font-bold transition-colors">=</button>

          {/* Scientific Functions Row */}
          <button onClick={handleSqrt} className="bg-zinc-800 hover:bg-zinc-700 text-indigo-300 p-4 rounded-lg font-bold transition-colors">√</button>
          <button onClick={handleSquare} className="bg-zinc-800 hover:bg-zinc-700 text-indigo-300 p-4 rounded-lg font-bold transition-colors">x²</button>
          <button onClick={() => handleNumber('(')} className="bg-zinc-800 hover:bg-zinc-700 text-zinc-400 p-4 rounded-lg font-bold transition-colors">(</button>
          <button onClick={() => handleNumber(')')} className="bg-zinc-800 hover:bg-zinc-700 text-zinc-400 p-4 rounded-lg font-bold transition-colors">)</button>
        </div>
      </div>
    </>
  );
}
