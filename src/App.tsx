import React, { useState } from 'react';
import { CartesianPlane } from './modules/CartesianPlane';
import { GeometricLoci } from './modules/GeometricLoci';
import { PolygonsDistances } from './modules/PolygonsDistances';
import { TheLine } from './modules/TheLine';
import { FiscalCases } from './modules/FiscalCases';
import { cn } from './lib/utils';
import { 
  LayoutDashboard, 
  Grid, 
  Shapes, 
  Ruler, 
  TrendingUp, 
  Menu, 
  X,
  GraduationCap,
  Languages,
  ArrowLeft,
  Calculator as CalculatorIcon,
  BookOpen,
  Globe
} from 'lucide-react';
import { LanguageProvider } from './contexts/LanguageProvider';
import { useLanguage } from './contexts/LanguageContext';
import { Calculator } from './components/Calculator';

type Subject = 'math' | 'geopolitics' | null;
type ModuleId = 'home' | 'cartesian' | 'loci' | 'polygons' | 'line' | 'fiscal';

function AppContent() {
  const [subject, setSubject] = useState<Subject>(null);
  const [activeModule, setActiveModule] = useState<ModuleId>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  if (!subject) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 text-zinc-100">
        <h1 className="text-4xl font-bold mb-12 text-white">{t('subject.select') || 'Selecciona una Materia'}</h1>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full">
          <button 
            onClick={() => { setSubject('math'); setActiveModule('home'); }}
            className="group relative overflow-hidden rounded-2xl bg-zinc-900 border border-white/10 p-8 hover:border-indigo-500/50 transition-colors text-left"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="bg-indigo-500/20 w-16 h-16 rounded-xl flex items-center justify-center mb-6 text-indigo-400">
              <BookOpen className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">{t('subject.math') || 'Matemáticas IV'}</h2>
            <p className="text-zinc-400">{t('subject.math.desc') || 'Geometría Analítica, Plano Cartesiano, Lugares Geométricos y más.'}</p>
          </button>
          <button 
            onClick={() => { setSubject('geopolitics'); setActiveModule('fiscal'); }}
            className="group relative overflow-hidden rounded-2xl bg-zinc-900 border border-white/10 p-8 hover:border-emerald-500/50 transition-colors text-left"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="bg-emerald-500/20 w-16 h-16 rounded-xl flex items-center justify-center mb-6 text-emerald-400">
              <Globe className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">{t('subject.geo') || 'Geopolítica'}</h2>
            <p className="text-zinc-400">{t('subject.geo.desc') || 'Casos prácticos fiscales: cálculo de IVA, ISR e IEPS.'}</p>
          </button>
        </div>
        <div className="mt-12">
          <button
            onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 border border-white/10 hover:bg-zinc-800 transition-colors"
          >
            <Languages className="w-4 h-4" />
            {language === 'es' ? 'English' : 'Español'}
          </button>
        </div>
      </div>
    );
  }

  const mathModules = [
    { id: 'cartesian', label: t('cartesian.title'), icon: Grid, component: CartesianPlane },
    { id: 'loci', label: t('loci.title'), icon: Shapes, component: GeometricLoci },
    { id: 'polygons', label: t('polygons.title'), icon: Ruler, component: PolygonsDistances },
    { id: 'line', label: t('line.title'), icon: TrendingUp, component: TheLine },
  ];

  const geoModules = [
    { id: 'fiscal', label: 'Casos Fiscales', icon: CalculatorIcon, component: FiscalCases },
  ];

  const modules = subject === 'math' ? mathModules : geoModules;

  const renderContent = () => {
    if (activeModule === 'home') {
      return (
        <div className="space-y-8 animate-in fade-in duration-500">
          <div className="text-center space-y-4 py-12">
            <div className="inline-flex items-center justify-center p-4 bg-indigo-500/10 rounded-full mb-4">
              <GraduationCap className="w-12 h-12 text-indigo-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">
              {subject === 'math' ? t('app.title') : t('subject.geo')}
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              {subject === 'math' ? t('app.description') : t('subject.geo.desc')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {modules.map((m) => (
              <button
                key={m.id}
                onClick={() => setActiveModule(m.id as ModuleId)}
                className="group relative overflow-hidden p-6 rounded-2xl bg-zinc-900 border border-white/10 hover:border-indigo-500/50 transition-all text-left"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-zinc-800 group-hover:bg-indigo-500/20 group-hover:text-indigo-400 transition-colors">
                    <m.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {m.label}
                    </h3>
                    <p className="text-sm text-zinc-500 group-hover:text-zinc-400">
                      {t('start.module')}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      );
    }

    const active = modules.find(m => m.id === activeModule);
    if (active) {
      const Component = active.component;
      return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <header className="mb-8 pb-8 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <active.icon className="w-8 h-8 text-indigo-400" />
              {active.label}
            </h1>
          </header>
          <Component />
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen flex bg-black text-zinc-100">
      <Calculator />
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 bg-zinc-950 border-r border-white/10 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:sticky md:top-0 md:h-screen",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl text-white">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              {subject === 'math' ? <span className="text-lg">IV</span> : <Globe className="w-5 h-5" />}
            </div>
            {subject === 'math' ? 'Math IV' : 'Geopolítica'}
          </div>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden p-2 hover:bg-zinc-800 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          <button 
            onClick={() => setSubject(null)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:bg-white/5 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            {t('back.subjects') || 'Volver a Materias'}
          </button>

          {subject === 'math' && (
            <button
              onClick={() => { setActiveModule('home'); setIsSidebarOpen(false); }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-sm font-medium",
                activeModule === 'home' 
                  ? "bg-indigo-600/10 text-indigo-400" 
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
              )}
            >
              <LayoutDashboard className="w-5 h-5" />
              {t('dashboard')}
            </button>
          )}

          <div className="pt-4 pb-2 px-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
            {t('modules')}
          </div>

          {modules.map((m) => (
            <button
              key={m.id}
              onClick={() => { setActiveModule(m.id as ModuleId); setIsSidebarOpen(false); }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-sm font-medium",
                activeModule === m.id 
                  ? "bg-indigo-600/10 text-indigo-400" 
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
              )}
            >
              <m.icon className="w-5 h-5" />
              {m.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <button
            onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors text-sm"
          >
            <Languages className="w-4 h-4" />
            {language === 'es' ? 'English' : 'Español'}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        <div className="sticky top-0 z-30 flex items-center p-4 md:hidden bg-black/80 backdrop-blur-md border-b border-white/10">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 hover:bg-zinc-800 rounded-lg"
          >
            <Menu className="w-6 h-6" />
          </button>
          <span className="ml-4 font-bold">{subject === 'math' ? 'Math IV' : 'Geopolítica'}</span>
        </div>

        <div className="p-6 md:p-12 max-w-5xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
