import React from 'react';
import {
  ShieldCheck,
  QrCode,
  Sparkles,
  RotateCcw,
  Camera,
  Layers,
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onResetData: () => void;
  onOpenScanner?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  onResetData,
  onOpenScanner,
}) => {
  return (
    <header className="no-print sticky top-0 z-50 bg-[#24140D] text-white border-b border-[#4A2E1F] shadow-md">
      {/* Top Banner Notice */}
      <div className="bg-[#180D08] px-4 py-1.5 text-xs text-[#E8DFD8] flex flex-wrap items-center justify-between border-b border-[#3D2418]">
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
          <span className="font-medium tracking-wide text-stone-200">
            IDEATHON 2026 | DIGITAL SANDALWOOD TRACEABILITY & AUTHENTICITY
          </span>
        </div>
        <div className="flex items-center space-x-4 text-[11px] text-stone-300">
          <span>Karnataka Sandalwood Provenance Engine</span>
          <button
            onClick={() => {
              if (
                window.confirm(
                  'Reset all demonstration batches and cryptographic events to default state?'
                )
              ) {
                onResetData();
              }
            }}
            className="text-[#D4AF37] hover:text-white underline flex items-center gap-1 cursor-pointer transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Reset Demo Data
          </button>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div
            onClick={() => setCurrentTab('home')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-white text-[#24140D] flex items-center justify-center shadow-md border border-[#E8DFD8] group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6 text-[#24140D]" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-xl font-bold tracking-wider font-heritage text-white">
                  SANDALSURE
                </span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-white text-[#24140D] font-black tracking-widest">
                  AI
                </span>
              </div>
              <p className="text-[10px] tracking-widest text-[#D4AF37] uppercase font-semibold">
                Digital Sandalwood Passport
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links - Simple, Aesthetic & Relatable */}
          <nav className="hidden md:flex items-center space-x-1.5">
            <button
              onClick={() => setCurrentTab('home')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                currentTab === 'home'
                  ? 'bg-white text-[#24140D] shadow-sm'
                  : 'text-stone-200 hover:text-white hover:bg-[#3D2418]'
              }`}
            >
              Overview
            </button>

            <button
              onClick={() => setCurrentTab('demo')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide flex items-center space-x-1.5 transition-all cursor-pointer ${
                currentTab === 'demo'
                  ? 'bg-white text-[#24140D] shadow-sm'
                  : 'text-stone-200 hover:text-white hover:bg-[#3D2418]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>End-to-End Demo</span>
            </button>

            <button
              onClick={() => setCurrentTab('verify')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide flex items-center space-x-1.5 transition-all cursor-pointer ${
                currentTab === 'verify'
                  ? 'bg-white text-[#24140D] shadow-sm'
                  : 'text-stone-200 hover:text-white hover:bg-[#3D2418]'
              }`}
            >
              <QrCode className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Verify Passport</span>
            </button>
          </nav>

          {/* Right Action: Camera Scanner Button */}
          <div className="flex items-center space-x-2">
            {onOpenScanner && (
              <button
                type="button"
                onClick={onOpenScanner}
                className="px-3.5 py-2 bg-[#FAF7F2] hover:bg-white text-[#24140D] rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-sm transition-all cursor-pointer border border-[#E8DFD8]"
              >
                <Camera className="w-3.5 h-3.5 text-[#7D4F33]" />
                <span className="hidden sm:inline">Scan QR / Barcode</span>
                <span className="sm:hidden">Scan</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation Scroll */}
        <div className="md:hidden flex overflow-x-auto py-2 space-x-2 text-xs border-t border-[#3D2418] scrollbar-none">
          <button
            onClick={() => setCurrentTab('home')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer transition-colors ${
              currentTab === 'home'
                ? 'bg-white text-[#24140D] font-bold'
                : 'text-stone-200'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setCurrentTab('demo')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer transition-colors flex items-center gap-1 ${
              currentTab === 'demo'
                ? 'bg-white text-[#24140D] font-bold'
                : 'text-stone-200'
            }`}
          >
            <Sparkles className="w-3 h-3 text-[#D4AF37]" />
            <span>End-to-End Demo</span>
          </button>
          <button
            onClick={() => setCurrentTab('verify')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer transition-colors flex items-center gap-1 ${
              currentTab === 'verify'
                ? 'bg-white text-[#24140D] font-bold'
                : 'text-stone-200'
            }`}
          >
            <QrCode className="w-3 h-3 text-[#D4AF37]" />
            <span>Verify Passport</span>
          </button>
        </div>
      </div>
    </header>
  );
};
