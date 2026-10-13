import React, { useState } from 'react';
import {
  ShieldCheck,
  QrCode,
  PlusCircle,
  Search,
  AlertTriangle,
  HelpCircle,
  CheckCircle2,
  Trees,
  Truck,
  FlaskConical,
  Factory,
  Package,
  Store,
  ArrowRight,
  Sparkles,
  Camera,
  Layers,
} from 'lucide-react';

interface LandingPageProps {
  onVerifyBatch: (batchId: string) => void;
  onNavigate: (tab: string) => void;
  onOpenScanner?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onVerifyBatch,
  onNavigate,
  onOpenScanner,
}) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onVerifyBatch(searchInput.trim());
    }
  };

  const demoScenarios = [
    {
      code: 'MS2026-V801',
      title: 'Mysore Sandal Gold Soap',
      tag: 'VERIFIED',
      desc: 'Golden standard authentic path from Shimoga forest auction to retail.',
      color: 'border-[#4A2E1F] hover:border-[#24140D] bg-white text-[#24140D]',
      badgeColor: 'bg-[#24140D] text-white',
    },
    {
      code: 'MS2026-M402',
      title: 'Pure Sandalwood Oil 25ml',
      tag: 'SUSPICIOUS',
      desc: 'Missing essential transformation stage: Raw timber jumps straight to retail.',
      color: 'border-amber-300 hover:border-amber-500 bg-white text-[#24140D]',
      badgeColor: 'bg-amber-900 text-amber-100',
    },
    {
      code: 'MS2026-D305',
      title: 'Classic Agarbatti 50s',
      tag: 'SUSPICIOUS',
      desc: 'Anachronistic timeline anomaly: Processing dated prior to timber harvest.',
      color: 'border-amber-300 hover:border-amber-500 bg-white text-[#24140D]',
      badgeColor: 'bg-amber-900 text-amber-100',
    },
    {
      code: 'MS2026-T904',
      title: 'Mysore Sandal Luxury Talc',
      tag: 'SUSPICIOUS',
      desc: 'Cryptographic hash tampered: Database payload altered post-signing.',
      color: 'border-rose-300 hover:border-rose-500 bg-white text-[#24140D]',
      badgeColor: 'bg-rose-900 text-rose-100',
    },
    {
      code: 'MS2026-Q107',
      title: 'Heritage Carved Figurine',
      tag: 'SUSPICIOUS',
      desc: 'Mass balance violation: 12kg wood claims 85kg pure carved output.',
      color: 'border-amber-300 hover:border-amber-500 bg-white text-[#24140D]',
      badgeColor: 'bg-amber-900 text-amber-100',
    },
    {
      code: 'MS2026-U006',
      title: 'KSDL Raw Distillation Lot',
      tag: 'UNVERIFIED',
      desc: 'Early custody batch: Only harvest logged so far; factory steps pending.',
      color: 'border-stone-300 hover:border-stone-500 bg-white text-[#24140D]',
      badgeColor: 'bg-stone-700 text-stone-100',
    },
  ];

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section - Deep Dark Brown & Crisp White Typography */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#1C0E08] via-[#2A160D] to-[#381F13] text-white pt-12 pb-20 px-4 sm:px-6 lg:px-8 border-b border-[#4A2E1F]">
        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#180D08] border border-[#5C3826] text-[#D4AF37] text-xs font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Digital Sandalwood Traceability & Authenticity • Ideathon 2026</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-heritage tracking-tight text-white leading-tight">
            Every Sandalwood Product Has a Story.{' '}
            <span className="text-[#D4AF37] block sm:inline">Verify It.</span>
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-lg text-stone-200 leading-relaxed font-normal">
            Sandalwood passes through forest auctions, GPS transit, steam distillation,
            saponification, and distribution. SandalSure AI introduces the{' '}
            <strong className="text-white font-semibold underline decoration-[#D4AF37]/80 underline-offset-4">
              Journey Consistency Engine
            </strong>
            : mathematically verifying chronological custody, mass-balance, and SHA-256 event chains
            instead of relying on easily copied static QR codes.
          </p>

          {/* Interactive Batch Search Bar - Crisp White Container */}
          <div className="max-w-2xl mx-auto pt-3">
            <form
              onSubmit={handleSearchSubmit}
              className="flex flex-col sm:flex-row gap-2 p-2 bg-white rounded-2xl border border-stone-200 shadow-2xl"
            >
              <div className="relative flex-grow flex items-center">
                <Search className="w-5 h-5 text-[#3D2418] absolute left-3.5 pointer-events-none" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Enter Batch ID (e.g. MS2026-V801 or scan QR)..."
                  className="w-full pl-11 pr-4 py-3 bg-transparent text-[#24140D] placeholder-stone-400 text-sm font-mono focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-[#24140D] hover:bg-[#381F13] text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
              >
                <QrCode className="w-4 h-4 text-[#D4AF37]" />
                <span>Verify Batch</span>
              </button>
              {onOpenScanner && (
                <button
                  type="button"
                  onClick={onOpenScanner}
                  className="px-4 py-3 bg-stone-100 hover:bg-stone-200 text-[#24140D] font-bold text-sm rounded-xl border border-stone-300 flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
                  title="Scan with phone camera"
                >
                  <Camera className="w-4 h-4 text-[#7D4F33]" />
                  <span className="hidden sm:inline">Camera</span>
                </button>
              )}
            </form>
          </div>

          {/* Quick Demo Batch Pill Selectors */}
          <div className="pt-2">
            <p className="text-xs uppercase tracking-wider text-stone-300 mb-2.5 font-medium">
              Click a Seed Demo Scenario to test the verification engine instantly:
            </p>
            <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
              {demoScenarios.map((demo) => (
                <button
                  key={demo.code}
                  onClick={() => onVerifyBatch(demo.code)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-all text-left flex items-center space-x-2 cursor-pointer shadow-xs ${demo.color}`}
                >
                  <span className="font-mono font-bold text-[#24140D]">{demo.code}</span>
                  <span className="text-stone-600 hidden sm:inline">• {demo.title}</span>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${demo.badgeColor}`}
                  >
                    {demo.tag}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EXPECTED DEMONSTRATION & OUTCOME FEATURE BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#24140D] to-[#381F13] text-white rounded-3xl p-6 sm:p-8 border-2 border-[#D4AF37]/60 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#180D08] border border-[#5C3826] text-[#D4AF37] text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Expected Demonstration / Outcome</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-heritage text-white">
              End-to-End Verification Demonstration
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              Demonstrate an end-to-end flow in which a batch is <strong>registered</strong>, 
              <strong> tracked across at least two supply-chain stages</strong>, and then 
              <strong> verified by a customer or inspector</strong>, with a clear authentic / suspicious output.
            </p>
            
            {/* Illustrative verification output preview pill */}
            <div className="p-3 bg-[#180D08] rounded-xl border border-[#4A2E1F] font-mono text-[11px] text-stone-300 space-y-1 max-w-md">
              <div className="text-[10px] text-[#D4AF37] uppercase font-bold tracking-widest">
                Illustrative verification output:
              </div>
              <div>Product: <strong className="text-white">Mysore Sandal</strong></div>
              <div>Batch: <span className="text-[#D4AF37]">MS2026XXXX</span> • Mfg date: 2026-03-12</div>
              <div>Production location: KSDL Factory, Mysore, Karnataka</div>
              <div className="text-emerald-400 font-bold">Verification: ✓ (Authentic)</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => onNavigate('demo')}
              className="px-6 py-3.5 bg-white hover:bg-stone-100 text-[#24140D] font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#7D4F33]" />
              <span>Launch Live Demonstration →</span>
            </button>
            <button
              onClick={() => onNavigate('verify')}
              className="px-6 py-3.5 bg-[#180D08] hover:bg-[#20110A] text-[#D4AF37] border border-[#5C3826] font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <QrCode className="w-4 h-4 text-[#D4AF37]" />
              <span>Open 6-Stage Passport & QR</span>
            </button>
          </div>
        </div>
      </section>

      {/* THE 4-STEP MASTER WORKFLOW - Simple & Aesthetic White + Dark Brown Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="text-xs uppercase tracking-widest font-bold text-[#7D4F33]">
            End-To-End Solution
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-heritage text-[#24140D] mt-1">
            How SandalSure AI Works in 4 Steps
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm mt-1.5">
            A seamless bridge from legal forest origin to consumer phone verification.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Step 1 */}
          <div
            onClick={() => onNavigate('demo')}
            className="group bg-white p-6 rounded-2xl border border-stone-200 hover:border-[#24140D] shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-xl bg-[#24140D] text-white text-xs font-bold flex items-center justify-center font-mono">
                  01
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-stone-100 text-[#24140D] border border-stone-200">
                  Registration
                </span>
              </div>
              <h3 className="font-heritage font-bold text-base text-[#24140D] group-hover:text-[#7D4F33] transition-colors">
                Step 1: Batch Registration
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                The batch number, product name, manufacturing date, and legal origin records are registered into the state ledger with genesis SHA-256 block.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-stone-100 flex items-center text-xs font-bold text-[#24140D] group-hover:text-[#7D4F33]">
              <span>See Registration in Demo</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Step 2 */}
          <div
            onClick={() => onNavigate('demo')}
            className="group bg-white p-6 rounded-2xl border border-stone-200 hover:border-[#24140D] shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-xl bg-[#24140D] text-white text-xs font-bold flex items-center justify-center font-mono">
                  02
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-stone-100 text-[#24140D] border border-stone-200">
                  Custody
                </span>
              </div>
              <h3 className="font-heritage font-bold text-base text-[#24140D] group-hover:text-[#7D4F33] transition-colors">
                Step 2: Track 2+ Stages
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                The sandalwood moves through forest transit permit and Mysore factory distillation, maintaining an unbroken cryptographic event chain.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-stone-100 flex items-center text-xs font-bold text-[#24140D] group-hover:text-[#7D4F33]">
              <span>Explore Stage Tracking</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Step 3 */}
          <div
            onClick={() => (onOpenScanner ? onOpenScanner() : onNavigate('verify'))}
            className="group bg-white p-6 rounded-2xl border border-stone-200 hover:border-[#24140D] shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-xl bg-[#24140D] text-white text-xs font-bold flex items-center justify-center font-mono">
                  03
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-stone-100 text-[#24140D] border border-stone-200">
                  Consumer
                </span>
              </div>
              <h3 className="font-heritage font-bold text-base text-[#24140D] group-hover:text-[#7D4F33] transition-colors">
                Step 3: Customer Scans QR
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                The customer scans the QR code on the Mysore Sandal product packaging using their smartphone camera and opens the instant verification passport.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-stone-100 flex items-center text-xs font-bold text-[#24140D] group-hover:text-[#7D4F33]">
              <span>Launch Phone Scanner</span>
              <Camera className="w-3.5 h-3.5 ml-1.5 text-[#7D4F33]" />
            </div>
          </div>

          {/* Step 4 */}
          <div
            onClick={() => onVerifyBatch('MS2026-V801')}
            className="group bg-white p-6 rounded-2xl border border-stone-200 hover:border-[#24140D] shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-xl bg-[#24140D] text-white text-xs font-bold flex items-center justify-center font-mono">
                  04
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-stone-100 text-[#24140D] border border-stone-200">
                  Outcome
                </span>
              </div>
              <h3 className="font-heritage font-bold text-base text-[#24140D] group-hover:text-[#7D4F33] transition-colors">
                Step 4: Verified ✓ or ✗
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                The engine evaluates chronological sequence, mass balance, and SHA-256 integrity, returning a clear authentic (✓) or suspicious (✗) outcome.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-stone-100 flex items-center text-xs font-bold text-[#24140D] group-hover:text-[#7D4F33]">
              <span>See Verification Output</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* The Sandalwood Provenance Challenge */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-stone-200">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-widest font-bold text-[#7D4F33]">
              The Provenance Challenge
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-heritage text-[#24140D] mt-1 mb-3">
              Why Static QR Codes Fail Sandalwood Consumers
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Karnataka Sandalwood (*Santalum album*) commands up to ₹25,000 per kg of pure heartwood.
              Fraudsters routinely adulterate sandalwood soaps and cosmetics with synthetic santalol,
              smuggle timber, or photocopy legitimate QR codes onto counterfeit retail packages.
              A conventional QR code merely confirms a URL exists; it does not verify whether the
              declared supply chain journey is mathematically and chronologically consistent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="p-5 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#24140D] text-white flex items-center justify-center font-bold text-xs">
                ✕
              </div>
              <h3 className="font-bold text-[#24140D] text-base">Static QR Vulnerability</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Counterfeiters scan an authentic soap box, duplicate its QR label 5,000 times, and
                affix it to adulterated goods. The consumer scans it and sees a genuine-looking page.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#24140D] text-white flex items-center justify-center font-bold text-xs">
                ✓
              </div>
              <h3 className="font-bold text-[#24140D] text-base">Journey Consistency Engine</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                SandalSure AI verifies the entire chronological custody chain: Karnataka Forest
                auction receipts, GPS transit passes, steam distillation mass balance, and unbroken
                SHA-256 event hashes.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#24140D] text-white flex items-center justify-center font-bold text-xs">
                !
              </div>
              <h3 className="font-bold text-[#24140D] text-base">Honest Transparency</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Clearly discloses what is digitally proven vs what requires physical laboratory
                testing (such as GC-MS santalol purity percentage), avoiding false claims of magical
                molecular detection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Supply Chain Journey Diagram */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs uppercase tracking-widest font-bold text-[#7D4F33]">
            End-To-End Traceability
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-heritage text-[#24140D] mt-1">
            The Sandalwood Journey
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">
            Each stage produces a tamper-evident cryptographic block linked to its predecessor.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {[
            {
              step: '1',
              title: 'Forest Auction',
              desc: 'KFD Legal Harvest & Depot Stamp',
              icon: Trees,
              badge: 'LEGAL_PROCUREMENT',
            },
            {
              step: '2',
              title: 'GPS Transit',
              desc: 'State e-Challan Transit Pass',
              icon: Truck,
              badge: 'TRANSPORT',
            },
            {
              step: '3',
              title: 'Distillation',
              desc: 'Steam Extraction & Mass Yield',
              icon: FlaskConical,
              badge: 'PROCESSING',
            },
            {
              step: '4',
              title: 'Saponification',
              desc: 'KSDL Factory Batch Formulation',
              icon: Factory,
              badge: 'MANUFACTURING',
            },
            {
              step: '5',
              title: 'Packaging',
              desc: 'Security Seal & Serialised QR',
              icon: Package,
              badge: 'PACKAGING',
            },
            {
              step: '6',
              title: 'Distribution',
              desc: 'Apex Emporium & Depot Inward',
              icon: Truck,
              badge: 'DISTRIBUTION',
            },
            {
              step: '7',
              title: 'Retail & Verify',
              desc: 'Consumer Passport Validation',
              icon: Store,
              badge: 'RETAIL_RECEIPT',
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-4 rounded-2xl border border-stone-200 text-center relative flex flex-col justify-between shadow-xs hover:border-[#24140D] transition-colors"
              >
                <div className="w-8 h-8 mx-auto rounded-full bg-[#24140D] text-white text-xs font-bold flex items-center justify-center mb-2 font-mono">
                  {item.step}
                </div>
                <div>
                  <Icon className="w-5 h-5 mx-auto text-[#7D4F33] mb-1.5" />
                  <h4 className="font-bold text-[#24140D] text-xs">{item.title}</h4>
                  <p className="text-[11px] text-stone-500 mt-1 leading-tight">{item.desc}</p>
                </div>
                <div className="mt-3 pt-2 border-t border-stone-100">
                  <span className="text-[9px] font-mono font-medium text-stone-400 uppercase tracking-tighter">
                    {item.badge}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Verification Status Legend - Dark Brown Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#24140D] text-white rounded-2xl p-6 sm:p-8 border border-[#4A2E1F] shadow-sm">
          <div className="max-w-2xl mb-6">
            <h3 className="text-xl sm:text-2xl font-bold font-heritage text-white">
              Understanding Verification Outcomes
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 mt-1">
              Deterministic classifications returned by the SandalSure Journey Consistency Engine.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-[#1C0E08] p-5 rounded-xl border border-[#4A2E1F] space-y-2">
              <div className="flex items-center space-x-2 text-white font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-[#D4AF37]" />
                <span>VERIFIED (Authentic Journey)</span>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                All required custody milestones exist. Forward chronological ordering is preserved,
                mass conversion reconciles, and all SHA-256 event hashes form an unbroken chain from
                the Karnataka Forest auction slip.
              </p>
            </div>

            <div className="bg-[#1C0E08] p-5 rounded-xl border border-[#4A2E1F] space-y-2">
              <div className="flex items-center space-x-2 text-amber-300 font-bold text-sm">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                <span>SUSPICIOUS (Anomaly Flagged)</span>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                Significant anomaly detected: broken cryptographic link, altered event payload,
                impossible mass expansion (+600%), anachronistic backdating, or skipped essential
                processing stage. Immediate quarantine recommended.
              </p>
            </div>

            <div className="bg-[#1C0E08] p-5 rounded-xl border border-[#4A2E1F] space-y-2">
              <div className="flex items-center space-x-2 text-stone-300 font-bold text-sm">
                <HelpCircle className="w-5 h-5 text-stone-400" />
                <span>UNVERIFIED (Incomplete / Unknown)</span>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                Batch code does not exist in the state database, or product has fewer than two recorded
                milestones. Not automatically marked counterfeit, but retail sale should be held.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
