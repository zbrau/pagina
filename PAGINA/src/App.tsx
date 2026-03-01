import React, { useState } from 'react';
import { CartesianPlane } from './modules/CartesianPlane';
import { GeometricLoci } from './modules/GeometricLoci';
import { PolygonsDistances } from './modules/PolygonsDistances';
import { TheLine } from './modules/TheLine';
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
  Languages
} from 'lucide-react';
import { LanguageProvider } from './contexts/LanguageProvider';
import { useLanguage } from './contexts/LanguageContext';
import { Calculator } from './components/Calculator';

type ModuleId = 'home' | 'cartesian' | 'loci' | 'polygons' | 'line';

function AppContent() {
  const [activeModule, setActiveModule] = useState<ModuleId>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const modules = [
    { id: 'cartesian', label: t('cartesian.title'), icon: Grid, component: CartesianPlane },
    { id: 'loci', label: t('loci.title'), icon: Shapes, component: GeometricLoci },
    { id: 'polygons', label: t('polygons.title'), icon: Ruler, component: PolygonsDistances },
    { id: 'line', label: t('line.title'), icon: TrendingUp, component: TheLine },
  ];

  const renderContent = () => {
    if (activeModule === 'home') {
      return (
        <div className="space-y-8 animate-in fade-in duration-500">
          <div className="text-center space-y-4 py-12">
            <div className="inline-flex items-center justify-center p-4 bg-indigo-500/10 rounded-full mb-4">
              <GraduationCap className="w-12 h-12 text-indigo-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">
              {t('app.title')}
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              {t('app.description')}
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
              <span className="text-lg">IV</span>
            </div>
            Math IV
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
          <span className="ml-4 font-bold">Math IV</span>
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
