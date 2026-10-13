import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertOctagon,
  ArrowRight,
  Sparkles,
  QrCode,
  Layers,
  Factory,
  Trees,
  Truck,
  Search,
  RotateCcw,
  ExternalLink,
  ChevronRight,
  FileCheck,
  Smartphone,
  Eye,
} from 'lucide-react';

interface EndToEndDemonstrationProps {
  onNavigateToPassport: (batchId: string) => void;
}

type DemoMode = 'AUTHENTIC' | 'SUSPICIOUS' | 'SIDE_BY_SIDE' | 'CUSTOM';

export const EndToEndDemonstration: React.FC<EndToEndDemonstrationProps> = ({
  onNavigateToPassport,
}) => {
  const [activeScenario, setActiveScenario] = useState<DemoMode>('AUTHENTIC');
  const [activeStep, setActiveStep] = useState<number>(3); // 1: Registered, 2: Tracked 2+ Stages, 3: Verified

  // Custom simulator fields
  const [customProduct, setCustomProduct] = useState('Mysore Sandal');
  const [customBatch, setCustomBatch] = useState('MS2026XXXX');
  const [customDate, setCustomDate] = useState('2026-03-12');
  const [customLocation, setCustomLocation] = useState('KSDL Factory, Mysore, Karnataka');
  const [customOutcome, setCustomOutcome] = useState<'AUTHENTIC' | 'SUSPICIOUS'>('AUTHENTIC');

  // Scenario configurations
  const currentDetails = {
    AUTHENTIC: {
      product: 'Mysore Sandal Gold Soap',
      batch: 'MS2026-V801',
      targetBatchId: 'MS2026-V801',
      mfgDate: '2026-03-12',
      location: 'KSDL Factory, Mysore, Karnataka',
      verificationSymbol: '✓',
      verificationStatusText: 'VERIFIED',
      isAuthentic: true,
      tagline: 'Golden standard authentic path: Tree felling in Shimoga forest to retail emporium.',
      stage1Desc: 'Legally registered by Karnataka Soaps & Detergents Ltd (KSDL) from Shimoga Government Sandal Depot harvest lot #8819 under felling permit FD/KA-SHM/FEL-2026-8819.',
      stage2Desc: 'Tracked across 7 stages: 01 Tree felling ➔ 02 Depot auction ➔ 03 Transit ➔ 04 Factory intake ➔ 05 Distillation ➔ 06 Manufacturing ➔ 07 Retail shop.',
      verificationDesc: 'Verification Engine confirms: Unbroken SHA-256 chain ✓ | Journey consistency: 100% | Certificates: 4/4 verified ✓ | Mass-balance reconciled.',
      originText: 'Tree Lot: SW-KA-0457 | Forest Range: Shimoga Forest Range (Div #04) | GPS: 13.9299° N, 75.5681° E\nFelling date: 2026-03-01 | Felling permit: FD/KA-SHM/FEL-2026-8819 ✓ Govt Verified',
      auctionTransitText: 'Auction lot: AUC-KFD-SHM-2026-0941 ✓ | Transit permit: KFD/FORM-IV/2026-09418 ✓ | GPS route match ✓',
      processingText: 'Distillation: 250 kg wood → 11.25 kg oil | Mass-balance ✓ | QC Lab: 91.4% santalol purity',
      mfgText: 'Mfg date: 2026-03-12 | Location: KSDL Factory, Mysore | QC cert: KSDL/BIS/QC-2026-9902 ✓',
      distText: 'Distributor: MSIL | Shop: Cauvery Government Sandalwood Emporium | Sold from: 2026-03-22',
    },
    SUSPICIOUS: {
      product: 'Mysore Sandal Pure Sandalwood Oil (25ml)',
      batch: 'MS2026-M402',
      targetBatchId: 'MS2026-M402',
      mfgDate: '2026-02-20',
      location: 'Unverified Transit Depot, Bangalore',
      verificationSymbol: '✗',
      verificationStatusText: 'SUSPICIOUS (ANOMALY FLAGGED)',
      isAuthentic: false,
      tagline: 'Broken upstream checkpoints: Missing DFO transit permit, missing weighbridge intake, and mass-balance failure.',
      stage1Desc: 'Batch code registered in system, claiming extraction from Dharwad forest range.',
      stage2Desc: 'Critical anomalies detected: Transit permit missing (No Form-IV pass), factory intake slip omitted, and raw wood jumped directly to retail without distillation yield log.',
      verificationDesc: 'Verification Engine flags: ERR_MISSING_STAGE_02_PERMIT & ERR_MISSING_STAGE_03_TRANSPORT. Product quarantined for counterfeit origin.',
      originText: 'Tree Lot: SW-KA-0912 | Forest Range: Dharwad Sandalwood Depot Range | GPS: 15.4589° N, 75.0078° E\nFelling date: 2026-02-10 | Felling permit: FD/KA-DHW/FEL-2026-102 (Unverified origin lot)',
      auctionTransitText: 'Auction lot: UNVERIFIED-LOT ✗ | Transit permit: MISSING ✗ | GPS route match ✗ (No transit recorded)',
      processingText: 'Distillation: 0 kg wood logged → 300 bottles claimed | Mass-balance ✗ (Yield conversion failed)',
      mfgText: 'Mfg date: 2026-02-20 | Location: Unverified Bottling Plant | QC cert: MISSING ✗',
      distText: 'Distributor: Unlicensed Carrier | Shop: City Souvenir Stall | Sold from: 2026-02-25',
    },
    SIDE_BY_SIDE: {
      product: 'Mysore Sandal Multi-Batch Comparison',
      batch: 'MS2026-V801 vs MS2026-M402',
      targetBatchId: 'MS2026-V801',
      mfgDate: 'Side-by-Side Comparison',
      location: 'Karnataka Forest to Retail',
      verificationSymbol: '✓ vs ✗',
      verificationStatusText: 'Verified vs Suspicious',
      isAuthentic: true,
      tagline: 'Mentor presentation mode: Compare a golden standard verified batch against a broken batch side by side.',
      stage1Desc: 'Side-by-side comparison illustrating extended traceability from tree harvest to customer QR passport.',
      stage2Desc: 'Demonstrates why mass-balance checks and government certificates catch counterfeit or diverted sandalwood.',
      verificationDesc: 'Present to mentor: "Based on your feedback, we extended the traceability chain from tree to shop and added government certificate checkpoints at each stage."',
      originText: '',
      auctionTransitText: '',
      processingText: '',
      mfgText: '',
      distText: '',
    },
    CUSTOM: {
      product: customProduct || 'Mysore Sandal',
      batch: customBatch || 'MS2026XXXX',
      targetBatchId: 'MS2026-V801',
      mfgDate: customDate || '2026-03-12',
      location: customLocation || 'KSDL Factory, Mysore, Karnataka',
      verificationSymbol: customOutcome === 'AUTHENTIC' ? '✓' : '✗',
      verificationStatusText: customOutcome === 'AUTHENTIC' ? 'VERIFIED' : 'SUSPICIOUS',
      isAuthentic: customOutcome === 'AUTHENTIC',
      tagline: 'Custom interactive simulation of the end-to-end sandalwood verification flow.',
      stage1Desc: `Batch registered: ${customBatch} for ${customProduct} with declared custody records.`,
      stage2Desc: `Tracked through custody milestones: Forest depot auction inward and KSDL facility custody logged.`,
      verificationDesc: customOutcome === 'AUTHENTIC' 
        ? 'Customer phone scan / Inspector desk returns authentic validation with unbroken cryptographic ledger.'
        : 'Discrepancy identified in transit payload or mass conversion, resulting in suspicious alert.',
      originText: 'Tree Lot: Custom-Lot | Forest Range: Karnataka Forest Range | GPS: 13.9299° N, 75.5681° E\nFelling permit: FD/KA/FEL-2026 ✓ Govt Verified',
      auctionTransitText: 'Auction lot: AUC-KA-2026 ✓ | Transit permit: Form-IV ✓ | GPS route match ✓',
      processingText: 'Distillation: Standard yield ratio | Mass-balance ✓',
      mfgText: `Mfg date: ${customDate} | Location: ${customLocation} | QC cert: Verified ✓`,
      distText: 'Distributor: MSIL Logistics | Shop: Cauvery Government Emporium',
    },
  }[activeScenario];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Top Banner / Hero */}
      <div className="bg-[#24140D] text-white p-6 sm:p-8 rounded-2xl border border-[#4A2E1F] shadow-sm relative overflow-hidden">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#180D08] border border-[#5C3826] text-[#D4AF37] text-xs font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Expected Demonstration / Outcome</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold font-heritage tracking-tight text-white">
            End-to-End Sandalwood Demonstration
          </h1>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Demonstrate an end-to-end flow in which a batch is <strong>registered</strong>, 
            <strong> tracked across at least two supply-chain stages</strong>, and then 
            <strong> verified by a customer or inspector</strong>, with a clear authentic / suspicious output.
          </p>
        </div>
      </div>

      {/* Scenario Selector Tabs */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
            Select Demonstration Scenario:
          </span>
          <span className="text-sm font-semibold text-[#24140D]">
            Switch between authentic path, flagged anomaly, or custom simulator
          </span>
        </div>

        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <button
            onClick={() => setActiveScenario('AUTHENTIC')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center space-x-2 ${
              activeScenario === 'AUTHENTIC'
                ? 'bg-[#24140D] text-white shadow-md'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
            <span>1. Authentic Flow (✓)</span>
          </button>

          <button
            onClick={() => setActiveScenario('SUSPICIOUS')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center space-x-2 ${
              activeScenario === 'SUSPICIOUS'
                ? 'bg-[#24140D] text-white shadow-md'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <AlertOctagon className="w-4 h-4 text-rose-400" />
            <span>2. Suspicious Flow (✗)</span>
          </button>

          <button
            onClick={() => setActiveScenario('CUSTOM')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center space-x-2 ${
              activeScenario === 'CUSTOM'
                ? 'bg-[#24140D] text-white shadow-md'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>3. Custom Simulator</span>
          </button>
        </div>
      </div>

      {/* Custom Simulator Form (only if CUSTOM is selected) */}
      {activeScenario === 'CUSTOM' && (
        <div className="bg-stone-50 p-5 rounded-2xl border border-stone-300 space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-stone-200 pb-2">
            <h4 className="font-bold text-[#24140D] text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#7D4F33]" />
              <span>Configure Custom Batch Parameters for Demonstration</span>
            </h4>
            <span className="text-xs text-stone-500">Live preview below updates automatically</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div>
              <label className="font-bold text-stone-600 block mb-1">Product Name</label>
              <input
                type="text"
                value={customProduct}
                onChange={(e) => setCustomProduct(e.target.value)}
                placeholder="e.g. Mysore Sandal"
                className="w-full p-2.5 bg-white border border-stone-300 rounded-xl font-medium text-[#24140D]"
              />
            </div>

            <div>
              <label className="font-bold text-stone-600 block mb-1">Batch Number</label>
              <input
                type="text"
                value={customBatch}
                onChange={(e) => setCustomBatch(e.target.value)}
                placeholder="e.g. MS2026XXXX"
                className="w-full p-2.5 bg-white border border-stone-300 rounded-xl font-mono text-[#24140D]"
              />
            </div>

            <div>
              <label className="font-bold text-stone-600 block mb-1">Manufacturing Date</label>
              <input
                type="date"
                value={customDate}
                onChange={(e) => setCustomDate(e.target.value)}
                className="w-full p-2.5 bg-white border border-stone-300 rounded-xl text-[#24140D]"
              />
            </div>

            <div>
              <label className="font-bold text-stone-600 block mb-1">Production Location</label>
              <input
                type="text"
                value={customLocation}
                onChange={(e) => setCustomLocation(e.target.value)}
                placeholder="e.g. KSDL Factory, Mysore, Karnataka"
                className="w-full p-2.5 bg-white border border-stone-300 rounded-xl text-[#24140D]"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-1">
            <span className="text-xs font-bold text-stone-600">Simulate Outcome:</span>
            <button
              type="button"
              onClick={() => setCustomOutcome('AUTHENTIC')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                customOutcome === 'AUTHENTIC'
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'bg-white border border-stone-300 text-stone-700'
              }`}
            >
              ✓ Authentic
            </button>
            <button
              type="button"
              onClick={() => setCustomOutcome('SUSPICIOUS')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                customOutcome === 'SUSPICIOUS'
                  ? 'bg-rose-800 text-white shadow-sm'
                  : 'bg-white border border-stone-300 text-stone-700'
              }`}
            >
              ✗ Suspicious
            </button>
          </div>
        </div>
      )}

      {/* THE 3-STEP DEMONSTRATION WORKFLOW CARDS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#7D4F33] uppercase tracking-wider">
            Flow Execution Milestones:
          </span>
          <span className="text-xs text-stone-500">
            Step 1 Registration ➔ Step 2 Tracking (2+ stages) ➔ Step 3 Customer/Inspector Verification
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* STEP 1: BATCH REGISTERED */}
          <div
            onClick={() => setActiveStep(1)}
            className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
              activeStep === 1
                ? 'bg-white border-[#24140D] ring-2 ring-[#24140D]/10 shadow-md'
                : 'bg-white border-stone-200 hover:border-stone-400 shadow-sm'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-xl bg-[#24140D] text-white font-mono text-xs font-bold flex items-center justify-center">
                  01
                </span>
                <span className="px-2 py-0.5 rounded bg-stone-100 text-[#24140D] text-[10px] font-bold uppercase tracking-wider border border-stone-200">
                  Registered
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">
                  Step 1
                </span>
                <h3 className="font-heritage font-bold text-lg text-[#24140D]">
                  Batch Registered
                </h3>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">
                {currentDetails.stage1Desc}
              </p>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 font-mono text-[11px] space-y-1 text-stone-700">
                <div>Batch: <strong className="text-[#24140D]">{currentDetails.batch}</strong></div>
                <div>Product: <span className="text-[#24140D]">{currentDetails.product}</span></div>
                <div>Genesis Block: <span className="text-emerald-700 font-bold">MINTED ✓</span></div>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 mt-4 flex items-center text-xs font-bold text-[#7D4F33]">
              <span>Stage 1 Completed</span>
              <CheckCircle2 className="w-3.5 h-3.5 ml-1 text-emerald-600" />
            </div>
          </div>

          {/* STEP 2: TRACKED ACROSS AT LEAST TWO STAGES */}
          <div
            onClick={() => setActiveStep(2)}
            className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
              activeStep === 2
                ? 'bg-white border-[#24140D] ring-2 ring-[#24140D]/10 shadow-md'
                : 'bg-white border-stone-200 hover:border-stone-400 shadow-sm'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-xl bg-[#24140D] text-white font-mono text-xs font-bold flex items-center justify-center">
                  02
                </span>
                <span className="px-2 py-0.5 rounded bg-stone-100 text-[#24140D] text-[10px] font-bold uppercase tracking-wider border border-stone-200">
                  2+ Stages
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">
                  Step 2
                </span>
                <h3 className="font-heritage font-bold text-lg text-[#24140D]">
                  Tracked Across 2+ Stages
                </h3>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">
                {currentDetails.stage2Desc}
              </p>

              <div className="space-y-2 pt-1">
                <div className="flex items-center gap-2 text-xs p-2 bg-stone-50 rounded-lg border border-stone-200">
                  <Trees className="w-4 h-4 text-[#7D4F33] shrink-0" />
                  <div className="text-[11px] leading-tight">
                    <strong className="block text-[#24140D]">Stage 1: Forest & Transit Pass</strong>
                    <span className="text-stone-500">DFO Permit & GPS Transit log</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs p-2 bg-stone-50 rounded-lg border border-stone-200">
                  <Factory className="w-4 h-4 text-[#7D4F33] shrink-0" />
                  <div className="text-[11px] leading-tight">
                    <strong className="block text-[#24140D]">Stage 2: Factory Manufacturing</strong>
                    <span className="text-stone-500">Steam Distillation & Formulation</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 mt-4 flex items-center text-xs font-bold text-[#7D4F33]">
              <span>Custody Chain Logged</span>
              <CheckCircle2 className="w-3.5 h-3.5 ml-1 text-emerald-600" />
            </div>
          </div>

          {/* STEP 3: VERIFIED BY CUSTOMER OR INSPECTOR */}
          <div
            onClick={() => setActiveStep(3)}
            className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
              activeStep === 3
                ? 'bg-white border-[#24140D] ring-2 ring-[#24140D]/10 shadow-md'
                : 'bg-white border-stone-200 hover:border-stone-400 shadow-sm'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-xl bg-[#24140D] text-white font-mono text-xs font-bold flex items-center justify-center">
                  03
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                  currentDetails.isAuthentic
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    : 'bg-rose-100 text-rose-900 border border-rose-300'
                }`}>
                  {currentDetails.isAuthentic ? 'Authentic' : 'Suspicious'}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">
                  Step 3
                </span>
                <h3 className="font-heritage font-bold text-lg text-[#24140D]">
                  Customer / Inspector Verified
                </h3>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">
                {currentDetails.verificationDesc}
              </p>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-stone-500 text-[11px]">Audit Engine:</span>
                  <span className="font-bold text-[#24140D] text-[11px]">Consistency Engine</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-500 text-[11px]">Result:</span>
                  <span className={`font-black text-xs ${
                    currentDetails.isAuthentic ? 'text-emerald-700' : 'text-rose-700'
                  }`}>
                    {currentDetails.verificationSymbol} {currentDetails.verificationStatusText}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 mt-4 flex items-center text-xs font-bold text-[#7D4F33]">
              <span>Output Generated Below</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>
        </div>
      </div>

      {/* THE OFFICIAL ILLUSTRATIVE VERIFICATION OUTPUT (Requested by User) */}
      <div className="bg-[#24140D] text-white rounded-3xl p-6 sm:p-10 border-2 border-[#D4AF37] shadow-2xl relative overflow-hidden">
        {/* Subtle background ornamentation */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-6">
          {/* Card Top Branding Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#4A2E1F] pb-5">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded bg-white text-[#24140D] text-[10px] font-black tracking-widest uppercase">
                  OFFICIAL SPECIFICATION
                </span>
                <span className="text-[#D4AF37] text-xs font-semibold tracking-wider uppercase font-mono">
                  SandalSure AI • Ideathon 2026
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-heritage tracking-tight text-white">
                Illustrative Verification Output
              </h2>
            </div>

            {/* Verification Status Pill */}
            <div className="flex items-center space-x-3">
              <div className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center space-x-2 border shadow-sm ${
                currentDetails.isAuthentic
                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50'
                  : 'bg-rose-950/80 text-rose-300 border-rose-500/50'
              }`}>
                <span className="text-lg font-black">{currentDetails.verificationSymbol}</span>
                <span className="uppercase tracking-wider font-mono">
                  {currentDetails.verificationStatusText}
                </span>
              </div>
            </div>
          </div>

          {/* THE CORE EXACT 5 DATA ROWS SPECIFIED BY USER */}
          <div className="bg-[#180D08] rounded-2xl p-5 sm:p-7 border border-[#3D2418] shadow-inner space-y-3 font-mono">
            {/* 1. Product */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2.5 px-4 bg-[#20110A] rounded-xl border border-[#2F190E] gap-1">
              <span className="text-xs uppercase tracking-wider text-stone-400 font-sans font-bold">
                Product:
              </span>
              <span className="text-base sm:text-lg font-bold text-white font-heritage">
                {currentDetails.product}
              </span>
            </div>

            {/* 2. Batch */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2.5 px-4 bg-[#20110A] rounded-xl border border-[#2F190E] gap-1">
              <span className="text-xs uppercase tracking-wider text-stone-400 font-sans font-bold">
                Batch:
              </span>
              <span className="text-sm sm:text-base font-bold text-[#D4AF37] font-mono tracking-wider">
                {currentDetails.batch}
              </span>
            </div>

            {/* 3. Manufacturing date */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2.5 px-4 bg-[#20110A] rounded-xl border border-[#2F190E] gap-1">
              <span className="text-xs uppercase tracking-wider text-stone-400 font-sans font-bold">
                Manufacturing date:
              </span>
              <span className="text-sm sm:text-base font-semibold text-stone-100">
                {currentDetails.mfgDate}
              </span>
            </div>

            {/* 4. Production location */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2.5 px-4 bg-[#20110A] rounded-xl border border-[#2F190E] gap-1">
              <span className="text-xs uppercase tracking-wider text-stone-400 font-sans font-bold">
                Production location:
              </span>
              <span className="text-sm sm:text-base font-semibold text-stone-100 text-right">
                {currentDetails.location}
              </span>
            </div>

            {/* 5. Verification */}
            <div className={`flex flex-col sm:flex-row sm:items-center justify-between py-3 px-4 rounded-xl border gap-2 ${
              currentDetails.isAuthentic
                ? 'bg-emerald-950/40 border-emerald-600/40'
                : 'bg-rose-950/40 border-rose-600/40'
            }`}>
              <div className="flex items-center space-x-2">
                <span className="text-xs uppercase tracking-wider text-stone-300 font-sans font-bold">
                  Verification:
                </span>
                <span className="text-[10px] text-stone-400 font-sans hidden sm:inline">
                  (Deterministic outcome evaluated by engine)
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className={`text-2xl font-black ${
                  currentDetails.isAuthentic ? 'text-emerald-400' : 'text-rose-400'
                }`}>
                  {currentDetails.verificationSymbol}
                </span>
                <span className={`text-sm sm:text-base font-black tracking-wider uppercase ${
                  currentDetails.isAuthentic ? 'text-emerald-300' : 'text-rose-300'
                }`}>
                  {currentDetails.verificationStatusText}
                </span>
              </div>
            </div>
          </div>

          {/* Action Row: Direct Link to the 6-Stage Passport with QR */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-stone-400 leading-relaxed text-center sm:text-left">
              This verification output reflects the complete 6-stage lifecycle, 
              from Karnataka forest harvest to the consumer scannable QR passport.
            </p>

            <button
              onClick={() => onNavigateToPassport(currentDetails.targetBatchId)}
              className="px-6 py-3 bg-white hover:bg-stone-100 text-[#24140D] rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-md shrink-0 w-full sm:w-auto"
            >
              <QrCode className="w-4 h-4 text-[#7D4F33]" />
              <span>Open Full 6-Stage Passport & Scannable QR →</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
