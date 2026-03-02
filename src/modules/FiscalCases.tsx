import React, { useState, useEffect } from 'react';
import { RefreshCw, Check, X, Calculator, Eye, CheckCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import { useLanguage } from '../contexts/LanguageContext';

const ISR_TABLE = [
  { limit: 6000, rate: 0.02 },
  { limit: 10000, rate: 0.06 },
  { limit: 15000, rate: 0.10 },
  { limit: 20000, rate: 0.15 },
  { limit: 30000, rate: 0.20 },
  { limit: Infinity, rate: 0.30 },
];

function calculateISR(amount: number) {
  for (const bracket of ISR_TABLE) {
    if (amount <= bracket.limit) {
      return amount * bracket.rate;
    }
  }
  return amount * 0.30;
}

const InputRow = ({ label, value, onChange, expected, explanation }: { label: string, value: string, onChange: (v: string) => void, expected: number, explanation?: string }) => {
  const [showExplanation, setShowExplanation] = useState(false);
  const numVal = parseFloat(value);
  const isCorrect = !isNaN(numVal) && Math.abs(numVal - expected) < 0.05;
  const isWrong = value !== '' && !isCorrect;

  useEffect(() => {
    setShowExplanation(false);
  }, [expected]);

  return (
    <div className="mb-3">
      <div className="flex items-center gap-4">
        <label className="w-1/2 text-zinc-300 text-sm md:text-base">{label}</label>
        <div className="relative w-1/2 flex items-center gap-2">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">$</span>
            <input 
              type="number" 
              step="0.01"
              value={value} 
              onChange={e => onChange(e.target.value)}
              className={cn(
                "w-full bg-zinc-950 border rounded-lg pl-8 pr-10 py-2 text-white outline-none focus:ring-2 transition-colors",
                isCorrect ? "border-emerald-500 focus:ring-emerald-500" : 
                isWrong ? "border-red-500 focus:ring-red-500" : "border-zinc-700 focus:ring-indigo-500"
              )}
            />
            {isCorrect && <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />}
            {isWrong && <X className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500" />}
          </div>
          <button 
            onClick={() => {
              onChange(expected.toFixed(2));
              setShowExplanation(true);
            }}
            className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white rounded-lg transition-colors"
            title="Ver respuesta y cálculo"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>
      {showExplanation && explanation && (
        <div className="flex gap-4 mt-1 animate-in fade-in slide-in-from-top-1">
          <div className="w-1/2"></div>
          <div className="w-1/2 text-xs text-indigo-300 bg-indigo-500/10 p-2 rounded border border-indigo-500/20">
            <span className="font-bold block mb-1">Cálculo:</span> 
            {explanation}
          </div>
        </div>
      )}
    </div>
  );
};

export function FiscalCases() {
  const { t } = useLanguage();
  const [caseType, setCaseType] = useState<1 | 2 | 3>(1);
  
  // Case 1 State
  const [c1, setC1] = useState({ sodas: 0, sodasIeps: 0, snacks: 0, snacksIeps: 0, others: 0, expenses: 0 });
  const [a1, setA1] = useState({ ieps: '', iva: '', sales: '', profit: '', isr: '', net: '' });
  
  // Case 2 State
  const [c2, setC2] = useState({ price: 0, ieps: 0, qty: 0, cost: 0 });
  const [a2, setA2] = useState({ iepsUnit: '', finalPrice: '', revenue: '', costs: '', profit: '', isr: '', net: '' });
  
  // Case 3 State
  const [c3, setC3] = useState({ sales: 0, ieps: 0, expenses: 0 });
  const [a3, setA3] = useState({ ieps: '', iva: '', profit: '', isr: '', net: '' });

  // Scenarios State
  const [s1, setS1] = useState({ title: 'Tienda de Refrescos y Snacks', item1: 'Refrescos', item2: 'Snacks' });
  const [s2, setS2] = useState({ title: 'Venta de Cigarros', unit: 'cajetilla', product: 'Cigarros' });
  const [s3, setS3] = useState({ title: 'Emprendedor de Bebidas Energéticas', product: 'Bebidas' });

  // Checkers (Refactored to be pure-ish)
  const calculateCase1 = (values: typeof c1) => {
    const ieps = (values.sodas * values.sodasIeps / 100) + (values.snacks * values.snacksIeps / 100);
    const base = values.sodas + values.snacks + values.others;
    const iva = base * 0.16;
    const sales = base;
    const profit = base - values.expenses;
    const isr = calculateISR(profit > 0 ? profit : 0);
    const net = profit - isr;
    return { ieps, iva, sales, profit, isr, net };
  };

  const calculateCase2 = (values: typeof c2) => {
    const iepsUnit = values.price * values.ieps / 100;
    const finalPrice = (values.price + iepsUnit) * 1.16;
    const revenue = values.price * values.qty;
    const costs = values.cost * values.qty;
    const profit = revenue - costs;
    const isr = calculateISR(profit > 0 ? profit : 0);
    const net = profit - isr;
    return { iepsUnit, finalPrice, revenue, costs, profit, isr, net };
  };

  const calculateCase3 = (values: typeof c3) => {
    const ieps = values.sales * values.ieps / 100;
    const iva = values.sales * 0.16;
    const profit = values.sales - values.expenses;
    const isr = calculateISR(profit > 0 ? profit : 0);
    const net = profit - isr;
    return { ieps, iva, profit, isr, net };
  };

  const ans1 = calculateCase1(c1);
  const ans2 = calculateCase2(c2);
  const ans3 = calculateCase3(c3);

  // Generators with Solved Option
  const generateCase1 = (solved = false) => {
    const scenarios = [
      { title: 'Tienda de Refrescos y Snacks', item1: 'Refrescos', item2: 'Snacks' },
      { title: 'Dulcería del Centro', item1: 'Chocolates', item2: 'Dulces a granel' },
      { title: 'Minisuper "El Rápido"', item1: 'Bebidas Saborizadas', item2: 'Botanas' }
    ];
    setS1(scenarios[Math.floor(Math.random() * scenarios.length)]);

    const newC1 = {
      sodas: Math.floor(Math.random() * 15 + 5) * 1000,
      sodasIeps: Math.floor(Math.random() * 10 + 5),
      snacks: Math.floor(Math.random() * 10 + 3) * 1000,
      snacksIeps: Math.floor(Math.random() * 10 + 5),
      others: Math.floor(Math.random() * 20 + 5) * 1000,
      expenses: Math.floor(Math.random() * 15 + 10) * 1000,
    };
    setC1(newC1);

    if (solved) {
      const ans = calculateCase1(newC1);
      setA1({
        ieps: ans.ieps.toFixed(2),
        iva: ans.iva.toFixed(2),
        sales: ans.sales.toFixed(2),
        profit: ans.profit.toFixed(2),
        isr: ans.isr.toFixed(2),
        net: ans.net.toFixed(2)
      });
    } else {
      setA1({ ieps: '', iva: '', sales: '', profit: '', isr: '', net: '' });
    }
  };

  const generateCase2 = (solved = false) => {
    const scenarios = [
      { title: 'Venta de Cigarros', unit: 'cajetilla', product: 'Cigarros' },
      { title: 'Cervecería Artesanal', unit: 'botella', product: 'Cerveza' },
      { title: 'Vinos y Licores', unit: 'botella', product: 'Licor' }
    ];
    setS2(scenarios[Math.floor(Math.random() * scenarios.length)]);

    const newC2 = {
      price: Math.floor(Math.random() * 50 + 40),
      ieps: Math.floor(Math.random() * 20 + 20),
      qty: Math.floor(Math.random() * 200 + 50),
      cost: Math.floor(Math.random() * 20 + 20),
    };
    setC2(newC2);

    if (solved) {
      const ans = calculateCase2(newC2);
      setA2({
        iepsUnit: ans.iepsUnit.toFixed(2),
        finalPrice: ans.finalPrice.toFixed(2),
        revenue: ans.revenue.toFixed(2),
        costs: ans.costs.toFixed(2),
        profit: ans.profit.toFixed(2),
        isr: ans.isr.toFixed(2),
        net: ans.net.toFixed(2)
      });
    } else {
      setA2({ iepsUnit: '', finalPrice: '', revenue: '', costs: '', profit: '', isr: '', net: '' });
    }
  };

  const generateCase3 = (solved = false) => {
    const scenarios = [
      { title: 'Emprendedor de Bebidas Energéticas', product: 'Bebidas' },
      { title: 'Distribuidora de Confitería', product: 'Dulces' },
      { title: 'Fábrica de Helados', product: 'Helados' }
    ];
    setS3(scenarios[Math.floor(Math.random() * scenarios.length)]);

    const newC3 = {
      sales: Math.floor(Math.random() * 30 + 10) * 1000,
      ieps: Math.floor(Math.random() * 10 + 5),
      expenses: Math.floor(Math.random() * 15 + 5) * 1000,
    };
    setC3(newC3);

    if (solved) {
      const ans = calculateCase3(newC3);
      setA3({
        ieps: ans.ieps.toFixed(2),
        iva: ans.iva.toFixed(2),
        profit: ans.profit.toFixed(2),
        isr: ans.isr.toFixed(2),
        net: ans.net.toFixed(2)
      });
    } else {
      setA3({ ieps: '', iva: '', profit: '', isr: '', net: '' });
    }
  };

  const showAnswers1 = () => {
    setA1({
      ieps: ans1.ieps.toFixed(2),
      iva: ans1.iva.toFixed(2),
      sales: ans1.sales.toFixed(2),
      profit: ans1.profit.toFixed(2),
      isr: ans1.isr.toFixed(2),
      net: ans1.net.toFixed(2)
    });
  };

  const showAnswers2 = () => {
    setA2({
      iepsUnit: ans2.iepsUnit.toFixed(2),
      finalPrice: ans2.finalPrice.toFixed(2),
      revenue: ans2.revenue.toFixed(2),
      costs: ans2.costs.toFixed(2),
      profit: ans2.profit.toFixed(2),
      isr: ans2.isr.toFixed(2),
      net: ans2.net.toFixed(2)
    });
  };

  const showAnswers3 = () => {
    setA3({
      ieps: ans3.ieps.toFixed(2),
      iva: ans3.iva.toFixed(2),
      profit: ans3.profit.toFixed(2),
      isr: ans3.isr.toFixed(2),
      net: ans3.net.toFixed(2)
    });
  };

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">Ejercicios Prácticos Fiscales: IVA, ISR e IEPS</h2>
        <p className="text-zinc-400">Instrucciones: Resuelve cada caso. Utiliza IVA 16% y la tabla de ISR proporcionada.</p>
        
        <div className="bg-zinc-900/50 p-6 rounded-xl border border-white/10">
          <h3 className="text-lg font-bold text-emerald-400 mb-4 flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Tabla de ISR a utilizar
          </h3>
          <div className="grid grid-cols-2 gap-y-2 text-sm max-w-md">
            <div className="text-zinc-400 font-bold border-b border-white/10 pb-2">Ingreso mensual</div>
            <div className="text-zinc-400 font-bold border-b border-white/10 pb-2">ISR</div>
            <div>Hasta $6,000</div><div className="text-emerald-300">2%</div>
            <div>$6,001 - $10,000</div><div className="text-emerald-300">6%</div>
            <div>$10,001 - $15,000</div><div className="text-emerald-300">10%</div>
            <div>$15,001 - $20,000</div><div className="text-emerald-300">15%</div>
            <div>$20,001 - $30,000</div><div className="text-emerald-300">20%</div>
            <div>Más de $30,000</div><div className="text-emerald-300">30%</div>
          </div>
        </div>
      </section>

      <div className="flex gap-2 overflow-x-auto pb-2">
        <button onClick={() => setCaseType(1)} className={cn("px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-colors", caseType === 1 ? "bg-indigo-600 text-white" : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800")}>Caso 1: Tienda</button>
        <button onClick={() => setCaseType(2)} className={cn("px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-colors", caseType === 2 ? "bg-indigo-600 text-white" : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800")}>Caso 2: Cigarros</button>
        <button onClick={() => setCaseType(3)} className={cn("px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-colors", caseType === 3 ? "bg-indigo-600 text-white" : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800")}>Caso 3: Bebidas</button>
      </div>

      {caseType === 1 && (
        <div className="bg-zinc-900 p-6 rounded-xl border border-white/10 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-xl font-bold text-white">Caso 1 - {s1.title}</h3>
            <div className="flex gap-2">
              <button onClick={() => generateCase1(false)} className="text-emerald-400 hover:text-emerald-300 flex items-center gap-2 text-sm bg-emerald-500/10 hover:bg-emerald-500/20 px-3 py-1.5 rounded-lg transition-colors">
                <CheckCircle className="w-4 h-4" /> Completar caso
              </button>
              <button onClick={() => generateCase1(false)} className="text-zinc-400 hover:text-white flex items-center gap-2 text-sm bg-black/20 hover:bg-black/40 px-3 py-1.5 rounded-lg transition-colors">
                <RefreshCw className="w-4 h-4" /> Generar Aleatorio
              </button>
            </div>
          </div>
          <div className="text-zinc-300 mb-8 bg-black/30 p-6 rounded-lg border border-white/5">
            <p className="mb-2">Una tienda vende en un mes:</p>
            <ul className="list-disc list-inside ml-4 text-indigo-300 space-y-1 mb-4">
              <li>{s1.item1}: ${c1.sodas.toLocaleString()} (IEPS {c1.sodasIeps}%)</li>
              <li>{s1.item2}: ${c1.snacks.toLocaleString()} (IEPS {c1.snacksIeps}%)</li>
              <li>Otros productos: ${c1.others.toLocaleString()}</li>
            </ul>
            <p className="text-emerald-300 font-bold">Gastos del mes: ${c1.expenses.toLocaleString()}</p>
          </div>
          
          <div className="space-y-2 max-w-2xl">
            <InputRow 
              label="1) Calcular IEPS total" 
              value={a1.ieps} 
              onChange={v => setA1({...a1, ieps: v})} 
              expected={ans1.ieps} 
              explanation={`(${c1.sodas.toLocaleString()} × ${c1.sodasIeps}%) + (${c1.snacks.toLocaleString()} × ${c1.snacksIeps}%)`}
            />
            <InputRow 
              label="2) Calcular IVA total" 
              value={a1.iva} 
              onChange={v => setA1({...a1, iva: v})} 
              expected={ans1.iva} 
              explanation={`(${c1.sodas + c1.snacks + c1.others}) × 16%`}
            />
            <InputRow 
              label="3) Determinar ventas totales" 
              value={a1.sales} 
              onChange={v => setA1({...a1, sales: v})} 
              expected={ans1.sales} 
              explanation={`${c1.sodas.toLocaleString()} (Refrescos) + ${c1.snacks.toLocaleString()} (Snacks) + ${c1.others.toLocaleString()} (Otros)`}
            />
            <InputRow 
              label="4) Calcular utilidad" 
              value={a1.profit} 
              onChange={v => setA1({...a1, profit: v})} 
              expected={ans1.profit} 
              explanation={`${c1.sodas + c1.snacks + c1.others} (Ingresos Base) - ${c1.expenses.toLocaleString()} (Gastos)`}
            />
            <InputRow 
              label="5) Determinar ISR correspondiente" 
              value={a1.isr} 
              onChange={v => setA1({...a1, isr: v})} 
              expected={ans1.isr} 
              explanation={`Consultar tabla con utilidad de $${ans1.profit.toFixed(2)}`}
            />
            <InputRow 
              label="6) Calcular ganancia neta" 
              value={a1.net} 
              onChange={v => setA1({...a1, net: v})} 
              expected={ans1.net} 
              explanation={`${ans1.profit.toFixed(2)} (Utilidad) - ${ans1.isr.toFixed(2)} (ISR)`}
            />
          </div>
          
          <div className="mt-6">
            <button 
              onClick={showAnswers1}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold transition-colors"
            >
              <Eye className="w-4 h-4" />
              Ver Resultados
            </button>
          </div>
        </div>
      )}

      {caseType === 2 && (
        <div className="bg-zinc-900 p-6 rounded-xl border border-white/10 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-xl font-bold text-white">Caso 2 - {s2.title}</h3>
            <div className="flex gap-2">
              <button onClick={() => generateCase2(false)} className="text-emerald-400 hover:text-emerald-300 flex items-center gap-2 text-sm bg-emerald-500/10 hover:bg-emerald-500/20 px-3 py-1.5 rounded-lg transition-colors">
                <CheckCircle className="w-4 h-4" /> Completar caso
              </button>
              <button onClick={() => generateCase2(false)} className="text-zinc-400 hover:text-white flex items-center gap-2 text-sm bg-black/20 hover:bg-black/40 px-3 py-1.5 rounded-lg transition-colors">
                <RefreshCw className="w-4 h-4" /> Generar Aleatorio
              </button>
            </div>
          </div>
          <div className="text-zinc-300 mb-8 bg-black/30 p-6 rounded-lg border border-white/5 space-y-2">
            <p><span className="text-indigo-300">Precio base por {s2.unit}:</span> ${c2.price}</p>
            <p><span className="text-indigo-300">IEPS:</span> {c2.ieps}%</p>
            <p><span className="text-indigo-300">Cantidad vendida:</span> {c2.qty} {s2.unit}s</p>
            <p><span className="text-emerald-300 font-bold">Costo por {s2.unit}:</span> ${c2.cost}</p>
          </div>
          
          <div className="space-y-2 max-w-2xl">
            <InputRow 
              label="1) Calcular IEPS por unidad" 
              value={a2.iepsUnit} 
              onChange={v => setA2({...a2, iepsUnit: v})} 
              expected={ans2.iepsUnit} 
              explanation={`$${c2.price} × ${c2.ieps}%`}
            />
            <InputRow 
              label="2) Determinar precio final con IVA" 
              value={a2.finalPrice} 
              onChange={v => setA2({...a2, finalPrice: v})} 
              expected={ans2.finalPrice} 
              explanation={`($${c2.price} + $${ans2.iepsUnit.toFixed(2)}) × 1.16`}
            />
            <InputRow 
              label="3) Calcular ingresos totales (base)" 
              value={a2.revenue} 
              onChange={v => setA2({...a2, revenue: v})} 
              expected={ans2.revenue} 
              explanation={`$${c2.price} (Precio Base) × ${c2.qty} (Cantidad)`}
            />
            <InputRow 
              label="4) Determinar costos totales" 
              value={a2.costs} 
              onChange={v => setA2({...a2, costs: v})} 
              expected={ans2.costs} 
              explanation={`$${c2.cost} (Costo Unitario) × ${c2.qty} (Cantidad)`}
            />
            <InputRow 
              label="5) Calcular utilidad" 
              value={a2.profit} 
              onChange={v => setA2({...a2, profit: v})} 
              expected={ans2.profit} 
              explanation={`$${ans2.revenue.toFixed(2)} (Ingresos) - $${ans2.costs.toFixed(2)} (Costos)`}
            />
            <InputRow 
              label="6) Determinar ISR" 
              value={a2.isr} 
              onChange={v => setA2({...a2, isr: v})} 
              expected={ans2.isr} 
              explanation={`Consultar tabla con utilidad de $${ans2.profit.toFixed(2)}`}
            />
            <InputRow 
              label="7) Calcular ganancia neta" 
              value={a2.net} 
              onChange={v => setA2({...a2, net: v})} 
              expected={ans2.net} 
              explanation={`$${ans2.profit.toFixed(2)} (Utilidad) - $${ans2.isr.toFixed(2)} (ISR)`}
            />
          </div>

          <div className="mt-6">
            <button 
              onClick={showAnswers2}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold transition-colors"
            >
              <Eye className="w-4 h-4" />
              Ver Resultados
            </button>
          </div>
        </div>
      )}

      {caseType === 3 && (
        <div className="bg-zinc-900 p-6 rounded-xl border border-white/10 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-xl font-bold text-white">Caso 3 - {s3.title}</h3>
            <div className="flex gap-2">
              <button onClick={() => generateCase3(false)} className="text-emerald-400 hover:text-emerald-300 flex items-center gap-2 text-sm bg-emerald-500/10 hover:bg-emerald-500/20 px-3 py-1.5 rounded-lg transition-colors">
                <CheckCircle className="w-4 h-4" /> Completar caso
              </button>
              <button onClick={() => generateCase3(false)} className="text-zinc-400 hover:text-white flex items-center gap-2 text-sm bg-black/20 hover:bg-black/40 px-3 py-1.5 rounded-lg transition-colors">
                <RefreshCw className="w-4 h-4" /> Generar Aleatorio
              </button>
            </div>
          </div>
          <div className="text-zinc-300 mb-8 bg-black/30 p-6 rounded-lg border border-white/5 space-y-2">
            <p><span className="text-indigo-300">Ventas del mes:</span> ${c3.sales.toLocaleString()}</p>
            <p><span className="text-indigo-300">IEPS aplicable:</span> {c3.ieps}%</p>
            <p><span className="text-emerald-300 font-bold">Gastos del mes:</span> ${c3.expenses.toLocaleString()}</p>
          </div>
          
          <div className="space-y-2 max-w-2xl">
            <InputRow 
              label="1) Calcular IEPS total" 
              value={a3.ieps} 
              onChange={v => setA3({...a3, ieps: v})} 
              expected={ans3.ieps} 
              explanation={`$${c3.sales.toLocaleString()} × ${c3.ieps}%`}
            />
            <InputRow 
              label="2) Calcular IVA total" 
              value={a3.iva} 
              onChange={v => setA3({...a3, iva: v})} 
              expected={ans3.iva} 
              explanation={`$${c3.sales.toLocaleString()} × 16%`}
            />
            <InputRow 
              label="3) Determinar utilidad" 
              value={a3.profit} 
              onChange={v => setA3({...a3, profit: v})} 
              expected={ans3.profit} 
              explanation={`$${c3.sales.toLocaleString()} (Ventas) - $${c3.expenses.toLocaleString()} (Gastos)`}
            />
            <InputRow 
              label="4) Calcular ISR correspondiente" 
              value={a3.isr} 
              onChange={v => setA3({...a3, isr: v})} 
              expected={ans3.isr} 
              explanation={`Consultar tabla con utilidad de $${ans3.profit.toFixed(2)}`}
            />
            <InputRow 
              label="5) Determinar ganancia neta" 
              value={a3.net} 
              onChange={v => setA3({...a3, net: v})} 
              expected={ans3.net} 
              explanation={`$${ans3.profit.toFixed(2)} (Utilidad) - $${ans3.isr.toFixed(2)} (ISR)`}
            />
          </div>

          <div className="mt-6">
            <button 
              onClick={showAnswers3}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold transition-colors"
            >
              <Eye className="w-4 h-4" />
              Ver Resultados
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
