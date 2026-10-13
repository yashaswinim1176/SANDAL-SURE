import React, { useState, useEffect } from 'react';
import { dataStore } from './services/dataStore';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { PublicVerifyPage } from './components/PublicVerifyPage';
import { EndToEndDemonstration } from './components/EndToEndDemonstration';
import { QRCameraScanner } from './components/QRCameraScanner';
import { ComprehensiveBatchesPrintReport } from './components/ComprehensiveBatchesPrintReport';
import { ShieldCheck } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedBatchId, setSelectedBatchId] = useState<string>('MS2026-V801');
  const [globalScannerOpen, setGlobalScannerOpen] = useState<boolean>(false);

  // Handle URL query parameters (e.g. ?batch=MS2026-V801)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const batchParam = params.get('batch');
    if (batchParam) {
      setSelectedBatchId(batchParam);
      setCurrentTab('verify');
    }
  }, []);

  const handleResetData = () => {
    dataStore.resetToSeedData();
    setSelectedBatchId('MS2026-V801');
    setCurrentTab('home');
  };

  const handleSelectBatchAndVerify = (batchId: string) => {
    setSelectedBatchId(batchId);
    setCurrentTab('verify');
  };

  const handleScanSuccess = (batchId: string) => {
    setGlobalScannerOpen(false);
    setSelectedBatchId(batchId);
    setCurrentTab('verify');
  };

  return (
    <>
      <div className="no-print min-h-screen bg-[#FAF7F2] text-[#24140D] flex flex-col font-sans selection:bg-[#4A2E1F] selection:text-white">
        {/* Navigation Bar */}
        <Navbar
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          onResetData={handleResetData}
          onOpenScanner={() => setGlobalScannerOpen(true)}
        />

        {/* Global Camera Scanner Modal */}
        {globalScannerOpen && (
          <QRCameraScanner
            onScanSuccess={handleScanSuccess}
            onClose={() => setGlobalScannerOpen(false)}
          />
        )}

        {/* Main View Area */}
        <main className="flex-grow">
          {currentTab === 'home' && (
            <LandingPage
              onVerifyBatch={handleSelectBatchAndVerify}
              onNavigate={(tab) => setCurrentTab(tab)}
              onOpenScanner={() => setGlobalScannerOpen(true)}
            />
          )}

          {currentTab === 'demo' && (
            <EndToEndDemonstration
              onNavigateToPassport={(batchId) => {
                setSelectedBatchId(batchId);
                setCurrentTab('verify');
              }}
            />
          )}

          {currentTab === 'verify' && (
            <PublicVerifyPage
              initialBatchId={selectedBatchId}
              onSelectBatch={(id) => setSelectedBatchId(id)}
            />
          )}
        </main>

        {/* Footer - Deep Dark Brown & White */}
        <footer className="no-print bg-[#180D08] text-stone-300 border-t border-[#3D2418] text-xs py-10 px-4 sm:px-6 lg:px-8 mt-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="space-y-1">
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <span className="font-heritage font-bold text-base text-white tracking-wider">
                  SANDALSURE AI
                </span>
                <span className="px-1.5 py-0.5 rounded bg-white text-[#24140D] text-[10px] font-black">
                  2026
                </span>
              </div>
              <p className="text-[11px] text-stone-400 max-w-md">
                Digital Sandalwood Traceability & Authenticity Engine. Built for Ideathon 2026.
                Preserving Karnataka heritage through verifiable cryptographic provenance.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-xs text-stone-300">
              <button
                onClick={() => setCurrentTab('home')}
                className="hover:text-white cursor-pointer transition-colors"
              >
                Overview
              </button>
              <button
                onClick={() => setCurrentTab('demo')}
                className="hover:text-white cursor-pointer transition-colors"
              >
                End-to-End Demo
              </button>
              <button
                onClick={() => setCurrentTab('verify')}
                className="hover:text-white cursor-pointer transition-colors"
              >
                Verify Passport
              </button>
              <button
                onClick={() => setGlobalScannerOpen(true)}
                className="hover:text-white cursor-pointer transition-colors"
              >
                Camera Scanner
              </button>
            </div>

            <div className="text-[10px] text-stone-400 text-center md:text-right space-y-1">
              <div>Demonstration records for Ideathon 2026 evaluation.</div>
              <div className="text-[#D4AF37] font-mono">
                Karnataka Sandalwood Heritage • SHA-256 Provenance Ledger
              </div>
            </div>
          </div>
        </footer>
      </div>
      <ComprehensiveBatchesPrintReport />
    </>
  );
}
