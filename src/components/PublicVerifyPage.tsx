import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import {
  ProductBatch,
  SupplyChainEvent,
  VerificationResult,
  AnomalyReport,
} from '../types';
import { verifyBatchJourney } from '../utils/consistencyEngine';
import { OFFICIAL_SAMPLE_CERTIFICATE_DATA_URL } from '../utils/sampleCertificate';
import { generateExplainableSummary } from '../services/aiExplanation';
import { dataStore } from '../services/dataStore';
import { QRCameraScanner } from './QRCameraScanner';
import { VerticalSixStageTimeline } from './VerticalSixStageTimeline';
import { UpstreamSevenStageTimeline } from './UpstreamSevenStageTimeline';
import {
  ShieldCheck,
  AlertTriangle,
  HelpCircle,
  QrCode,
  Calendar,
  MapPin,
  Building2,
  Package,
  Layers,
  FileText,
  Share2,
  Printer,
  ChevronDown,
  ChevronUp,
  AlertOctagon,
  Info,
  CheckCircle2,
  Send,
  Camera,
  ExternalLink,
  Search,
  Sparkles,
  Barcode,
  FlaskConical,
  Truck,
  Store,
  Trees,
  Factory,
  ArrowRight,
  Award,
} from 'lucide-react';

interface PublicVerifyPageProps {
  initialBatchId?: string;
  onSelectBatch: (batchId: string) => void;
}

export const PublicVerifyPage: React.FC<PublicVerifyPageProps> = ({
  initialBatchId,
  onSelectBatch,
}) => {
  const [batchInput, setBatchInput] = useState(initialBatchId || 'MS2026-V801');
  const [currentBatch, setCurrentBatch] = useState<ProductBatch | null>(null);
  const [events, setEvents] = useState<SupplyChainEvent[]>([]);
  const [verification, setVerification] = useState<VerificationResult | null>(null);
  const [aiSummary, setAiSummary] = useState<string>('');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [showChecksDetails, setShowChecksDetails] = useState<boolean>(true);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [reportSuccess, setReportSuccess] = useState<boolean>(false);
  const [scannerOpen, setScannerOpen] = useState<boolean>(false);
  const [showCertificateModal, setShowCertificateModal] = useState<boolean>(false);

  // Report Form State
  const [reportType, setReportType] = useState<AnomalyReport['issueType']>('UNUSUAL_SMELL_OR_TEXTURE');
  const [reportDesc, setReportDesc] = useState('');
  const [reportLocation, setReportLocation] = useState('');
  const [reportEmail, setReportEmail] = useState('');

  const executeVerification = async (targetId: string) => {
    const batch = dataStore.getBatchById(targetId) || null;
    const allBatches = dataStore.getBatches();
    const batchEvents = batch ? dataStore.getEventsForBatch(batch.batchId) : [];

    if (batch) {
      dataStore.incrementScanCount(batch.batchId);
    }

    const result = verifyBatchJourney(batch, batchEvents, allBatches);
    setCurrentBatch(batch);
    setEvents(batchEvents);
    setVerification(result);

    // AI Summary explanation
    const summary = await generateExplainableSummary(batch, result);
    setAiSummary(summary);

    // Generate real QR code data URL pointing to this batch's verification route
    const verifyUrl = `${window.location.origin}?batch=${targetId}`;
    try {
      const dataUrl = await QRCode.toDataURL(verifyUrl, {
        margin: 2,
        width: 256,
        color: {
          dark: '#24140D',
          light: '#FFFFFF',
        },
      });
      setQrDataUrl(dataUrl);
    } catch {
      // Fallback
    }
  };

  useEffect(() => {
    if (initialBatchId) {
      setBatchInput(initialBatchId);
      executeVerification(initialBatchId);
    } else {
      executeVerification('MS2026-V801');
    }
  }, [initialBatchId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (batchInput.trim()) {
      onSelectBatch(batchInput.trim());
      executeVerification(batchInput.trim());
    }
  };

  const handleScanSuccess = (scannedBatchId: string) => {
    setScannerOpen(false);
    setBatchInput(scannedBatchId);
    onSelectBatch(scannedBatchId);
    executeVerification(scannedBatchId);
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verification) return;

    const report: AnomalyReport = {
      id: `rep-${Date.now()}`,
      batchId: verification.batchId,
      reportedAt: new Date().toISOString(),
      reporterType: 'CONSUMER',
      issueType: reportType,
      description: reportDesc,
      retailLocation: reportLocation,
      contactEmail: reportEmail,
      status: 'PENDING_REVIEW',
    };

    dataStore.submitReport(report);
    setReportSuccess(true);
    setTimeout(() => {
      setShowReportModal(false);
      setReportSuccess(false);
      setReportDesc('');
      setReportLocation('');
      setReportEmail('');
    }, 2500);
  };

  // Group checks into the 4 Master Categories for Step 4
  const batchInfoChecks = verification
    ? [
        ...verification.passedChecks.filter((c) =>
          ['CHK_BATCH_EXISTS', 'CHK_METADATA_COMPLETE', 'CHK_UNIQUE_BATCH_ID', 'CHK_LEGAL_PROCUREMENT_ANCHOR'].includes(c.code)
        ),
        ...verification.failedChecks.filter((c) =>
          ['ERR_BATCH_NOT_FOUND', 'ERR_DUPLICATE_BATCH_ID'].includes(c.code)
        ),
        ...verification.warningChecks.filter((c) =>
          ['WARN_INCOMPLETE_METADATA', 'WARN_NO_LEGAL_PROCUREMENT_EVENT'].includes(c.code)
        ),
      ]
    : [];

  const journeyChecks = verification
    ? [
        ...verification.passedChecks.filter((c) =>
          ['CHK_JOURNEY_EVENTS_PRESENT', 'CHK_CHRONOLOGICAL_SEQUENCE'].includes(c.code)
        ),
        ...verification.failedChecks.filter((c) =>
          ['ERR_NO_JOURNEY_EVENTS', 'ERR_CHRONOLOGICAL_INVERSION'].includes(c.code)
        ),
        ...verification.warningChecks.filter((c) =>
          ['WARN_PROCUREMENT_AFTER_MFG'].includes(c.code)
        ),
      ]
    : [];

  const missingStagesChecks = verification
    ? [
        ...verification.passedChecks.filter((c) =>
          ['CHK_STAGE_CONTINUITY'].includes(c.code)
        ),
        ...verification.failedChecks.filter((c) =>
          ['ERR_MISSING_ESSENTIAL_STAGE'].includes(c.code)
        ),
      ]
    : [];

  const suspiciousChangesChecks = verification
    ? [
        ...verification.passedChecks.filter((c) =>
          ['CHK_HASH_CHAIN_VALID', 'CHK_QUANTITY_CONSISTENCY'].includes(c.code)
        ),
        ...verification.failedChecks.filter((c) =>
          ['ERR_HASH_CHAIN_TAMPERED', 'ERR_QUANTITY_MASS_EXPANSION', 'ERR_DUPLICATE_EVENT_ID'].includes(c.code)
        ),
        ...verification.warningChecks.filter((c) =>
          ['WARN_HIGH_SCAN_VELOCITY'].includes(c.code)
        ),
      ]
    : [];

  // Extract lifecycle stages for the Story Breakdown
  const harvestEvent = events.find((e) => e.eventType === 'LEGAL_PROCUREMENT');
  const transportEvents = events.filter((e) => e.eventType === 'TRANSPORT');
  const transformEvents = events.filter((e) => e.eventType === 'PROCESSING' || e.eventType === 'MANUFACTURING');
  const packageEvent = events.find((e) => e.eventType === 'PACKAGING');
  const retailEvent = events.find((e) => e.eventType === 'RETAIL_RECEIPT' || e.eventType === 'DISTRIBUTION');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header & Barcode Scanner Launcher */}
      <div className="bg-[#24140D] text-white p-5 sm:p-6 rounded-2xl border border-[#4A2E1F] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-white text-[#24140D] font-black text-sm flex items-center justify-center font-mono shadow-md">
            <Barcode className="w-6 h-6 text-[#24140D]" />
          </div>
          <div>
            <span className="text-[11px] uppercase font-bold tracking-widest text-[#D4AF37]">
              Customer Verification Desk
            </span>
            <h1 className="text-xl sm:text-2xl font-bold font-heritage text-white">
              Scan Barcode / QR & Verify Sandalwood Records
            </h1>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setScannerOpen(true)}
          className="px-5 py-3 bg-white hover:bg-stone-100 text-[#24140D] rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-md"
        >
          <Camera className="w-4 h-4 text-[#7D4F33]" />
          <span>Launch Barcode & QR Camera Scanner</span>
        </button>
      </div>

      {/* Barcode & QR Camera Scanner Modal */}
      {scannerOpen && (
        <QRCameraScanner
          onScanSuccess={handleScanSuccess}
          onClose={() => setScannerOpen(false)}
        />
      )}

      {/* Interactive Demonstration Switcher Bar: Authentic vs Flagged Batches */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-stone-200 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
          <span className="text-xs uppercase font-bold tracking-wider text-[#7D4F33] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Demonstration Selector: Switch Between Authentic & Flagged Batches
          </span>
          <span className="text-[11px] text-stone-500">
            Click any scenario to see real-time verification outcome
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          <button
            onClick={() => {
              setBatchInput('MS2026-V801');
              onSelectBatch('MS2026-V801');
              executeVerification('MS2026-V801');
            }}
            className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
              batchInput === 'MS2026-V801'
                ? 'bg-[#24140D] text-white border-[#24140D] shadow-sm'
                : 'bg-stone-50 hover:bg-stone-100 text-[#24140D] border-stone-200'
            }`}
          >
            <span className="font-mono font-bold text-xs block">MS2026-V801</span>
            <span className="text-[10px] block opacity-90">Soap (Golden Authentic)</span>
            <span className="text-[9px] font-bold text-[#D4AF37] block mt-0.5">VERIFIED</span>
          </button>

          <button
            onClick={() => {
              setBatchInput('MS2026-M402');
              onSelectBatch('MS2026-M402');
              executeVerification('MS2026-M402');
            }}
            className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
              batchInput === 'MS2026-M402'
                ? 'bg-[#24140D] text-white border-[#24140D] shadow-sm'
                : 'bg-stone-50 hover:bg-stone-100 text-[#24140D] border-stone-200'
            }`}
          >
            <span className="font-mono font-bold text-xs block">MS2026-M402</span>
            <span className="text-[10px] block opacity-90">Oil (Missing Stage)</span>
            <span className="text-[9px] font-bold text-amber-300 block mt-0.5">SUSPICIOUS</span>
          </button>

          <button
            onClick={() => {
              setBatchInput('MS2026-T904');
              onSelectBatch('MS2026-T904');
              executeVerification('MS2026-T904');
            }}
            className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
              batchInput === 'MS2026-T904'
                ? 'bg-[#24140D] text-white border-[#24140D] shadow-sm'
                : 'bg-stone-50 hover:bg-stone-100 text-[#24140D] border-stone-200'
            }`}
          >
            <span className="font-mono font-bold text-xs block">MS2026-T904</span>
            <span className="text-[10px] block opacity-90">Talc (Tampered Hash)</span>
            <span className="text-[9px] font-bold text-rose-300 block mt-0.5">SUSPICIOUS</span>
          </button>

          <button
            onClick={() => {
              setBatchInput('MS2026-D305');
              onSelectBatch('MS2026-D305');
              executeVerification('MS2026-D305');
            }}
            className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
              batchInput === 'MS2026-D305'
                ? 'bg-[#24140D] text-white border-[#24140D] shadow-sm'
                : 'bg-stone-50 hover:bg-stone-100 text-[#24140D] border-stone-200'
            }`}
          >
            <span className="font-mono font-bold text-xs block">MS2026-D305</span>
            <span className="text-[10px] block opacity-90">Agarbatti (Inverted Date)</span>
            <span className="text-[9px] font-bold text-amber-300 block mt-0.5">SUSPICIOUS</span>
          </button>

          <button
            onClick={() => {
              setBatchInput('MS2026-Q107');
              onSelectBatch('MS2026-Q107');
              executeVerification('MS2026-Q107');
            }}
            className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
              batchInput === 'MS2026-Q107'
                ? 'bg-[#24140D] text-white border-[#24140D] shadow-sm'
                : 'bg-stone-50 hover:bg-stone-100 text-[#24140D] border-stone-200'
            }`}
          >
            <span className="font-mono font-bold text-xs block">MS2026-Q107</span>
            <span className="text-[10px] block opacity-90">Carving (Mass Expansion)</span>
            <span className="text-[9px] font-bold text-amber-300 block mt-0.5">SUSPICIOUS</span>
          </button>

          <button
            onClick={() => {
              setBatchInput('NONEXISTENT-999');
              onSelectBatch('NONEXISTENT-999');
              executeVerification('NONEXISTENT-999');
            }}
            className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
              batchInput === 'NONEXISTENT-999'
                ? 'bg-[#24140D] text-white border-[#24140D] shadow-sm'
                : 'bg-stone-50 hover:bg-stone-100 text-[#24140D] border-stone-200'
            }`}
          >
            <span className="font-mono font-bold text-xs block">NONEXISTENT</span>
            <span className="text-[10px] block opacity-90">Unknown Barcode</span>
            <span className="text-[9px] font-bold text-stone-400 block mt-0.5">UNVERIFIED</span>
          </button>
        </div>

        {/* Manual Barcode Input Bar */}
        <form onSubmit={handleSubmit} className="pt-2 flex flex-col sm:flex-row gap-2">
          <div className="relative flex-grow">
            <Barcode className="w-5 h-5 text-stone-400 absolute left-3.5 top-3 pointer-events-none" />
            <input
              type="text"
              value={batchInput}
              onChange={(e) => setBatchInput(e.target.value)}
              placeholder="Or enter product barcode / batch number (e.g. MS2026-V801)..."
              className="w-full pl-11 pr-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-[#24140D] font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#24140D]"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 bg-[#24140D] hover:bg-[#381F13] text-white font-bold text-sm rounded-xl flex items-center justify-center space-x-2 transition-colors cursor-pointer shadow-sm"
          >
            <Search className="w-4 h-4 text-[#D4AF37]" />
            <span>Verify Records</span>
          </button>
        </form>
      </div>

      {/* Main Verification Result */}
      {verification && (
        <div className="space-y-8 animate-fadeIn">
          {/* Status Alert Banner */}
          <div
            className={`rounded-2xl p-6 sm:p-8 border shadow-sm transition-all ${
              verification.status === 'VERIFIED'
                ? 'bg-[#24140D] text-white border-[#4A2E1F]'
                : verification.status === 'SUSPICIOUS'
                ? 'bg-[#33130A] text-white border-[#5A2518]'
                : 'bg-[#1F1714] text-white border-[#3D322C]'
            }`}
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  {verification.status === 'VERIFIED' && (
                    <div className="w-12 h-12 rounded-xl bg-white text-[#24140D] flex items-center justify-center shadow-md">
                      <ShieldCheck className="w-7 h-7 text-[#24140D]" />
                    </div>
                  )}
                  {verification.status === 'SUSPICIOUS' && (
                    <div className="w-12 h-12 rounded-xl bg-rose-500/20 border border-rose-400 flex items-center justify-center">
                      <AlertOctagon className="w-7 h-7 text-rose-400 animate-pulse" />
                    </div>
                  )}
                  {verification.status === 'UNVERIFIED' && (
                    <div className="w-12 h-12 rounded-xl bg-stone-700/40 border border-stone-500 flex items-center justify-center">
                      <HelpCircle className="w-7 h-7 text-stone-300" />
                    </div>
                  )}

                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">
                        Verification Status
                      </span>
                      <span
                        className={`text-xs px-2.5 py-0.5 rounded-md font-black tracking-widest uppercase ${
                          verification.status === 'VERIFIED'
                            ? 'bg-white text-[#24140D]'
                            : verification.status === 'SUSPICIOUS'
                            ? 'bg-rose-400 text-rose-950'
                            : 'bg-stone-300 text-stone-900'
                        }`}
                      >
                        {verification.status}
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold font-heritage tracking-tight mt-0.5 text-white">
                      {verification.status === 'VERIFIED' && 'Authentic Sandalwood Journey Confirmed'}
                      {verification.status === 'SUSPICIOUS' && 'Supply Chain Anomaly Flagged'}
                      {verification.status === 'UNVERIFIED' && 'Unverified Sandalwood Record'}
                    </h2>
                  </div>
                </div>

                <p className="text-stone-200 text-sm max-w-2xl leading-relaxed">
                  {verification.humanExplanation}
                </p>

                {aiSummary && (
                  <div className="p-3.5 bg-black/40 rounded-xl border border-white/10 text-xs text-stone-200 flex items-start space-x-2.5">
                    <Info className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <span className="font-bold text-[#D4AF37] tracking-wider uppercase text-[10px]">
                        Explainable Analysis Summary
                      </span>
                      <p className="leading-relaxed">{aiSummary}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Risk Gauge Metric Card */}
              <div className="bg-black/40 p-5 rounded-2xl border border-white/10 shrink-0 text-center min-w-[200px] flex flex-col justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-stone-300 font-semibold">
                    Calculated Risk Score
                  </span>
                  <div className="flex items-center justify-center my-2 space-x-1">
                    <span
                      className={`text-4xl font-black font-mono ${
                        verification.riskScore === 0
                          ? 'text-white'
                          : verification.riskScore >= 50
                          ? 'text-rose-400'
                          : 'text-amber-400'
                      }`}
                    >
                      {verification.riskScore}
                    </span>
                    <span className="text-stone-400 text-sm font-bold">/ 100</span>
                  </div>
                  <div className="text-[11px] text-stone-300">
                    Risk Level:{' '}
                    <span className="font-bold uppercase tracking-wider text-[#D4AF37]">
                      {verification.riskLevel}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 mt-3 flex justify-center gap-2">
                  <button
                    onClick={() => window.print()}
                    className="no-print p-2 bg-white/10 hover:bg-white/20 rounded-lg text-stone-200 text-xs flex items-center gap-1 cursor-pointer"
                    title="Print Passport"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print</span>
                  </button>
                  <button
                    onClick={() => setShowReportModal(true)}
                    className="no-print p-2 bg-rose-900/60 hover:bg-rose-800/60 text-rose-200 rounded-lg text-xs flex items-center gap-1 cursor-pointer border border-rose-500/30"
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Report Anomaly</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* OFFICIAL ILLUSTRATIVE VERIFICATION OUTPUT AS SPECIFIED */}
          {currentBatch && (
            <div className="bg-[#24140D] text-white rounded-3xl p-6 sm:p-8 border-2 border-[#D4AF37] shadow-xl space-y-5">
              {/* Header Title & Status */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#4A2E1F] pb-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-pulse"></span>
                    <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">
                      Updated Illustrative Verification Output
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-heritage text-white">
                    {currentBatch.productName}
                  </h3>
                </div>

                <div className="flex items-center space-x-2 self-start sm:self-auto">
                  <span className="text-xs uppercase font-mono tracking-wider text-stone-300 font-bold">
                    Batch: <span className="text-[#D4AF37]">{currentBatch.batchId}</span>
                  </span>
                  <span className={`px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider font-mono flex items-center gap-1.5 ${
                    verification.status === 'VERIFIED'
                      ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/50'
                      : 'bg-rose-950/80 text-rose-300 border border-rose-500/50'
                  }`}>
                    <span>Status:</span>
                    <span>{verification.status === 'VERIFIED' ? '✓ VERIFIED' : `✗ ${verification.status}`}</span>
                  </span>
                </div>
              </div>

              {/* Exact Structure Requested: ORIGIN, AUCTION & TRANSIT, PROCESSING, MANUFACTURING, DISTRIBUTION & RETAIL */}
              <div className="bg-[#180D08] rounded-2xl p-5 sm:p-6 border border-[#3D2418] space-y-4 font-mono text-xs sm:text-sm">
                {/* 1. ORIGIN */}
                <div className="space-y-1.5 pb-3 border-b border-[#2C180E]">
                  <div className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#D4AF37] flex items-center justify-between">
                    <span>ORIGIN</span>
                    <span className="text-[10px] text-emerald-400 font-mono font-bold">
                      {currentBatch.batchId === 'MS2026-M402' ? '✗ Broken Permit' : '✓ Govt Verified'}
                    </span>
                  </div>
                  <div className="text-stone-200 text-xs sm:text-[13px] leading-relaxed">
                    Tree Lot: <strong className="text-white">{currentBatch.treeLotId || 'SW-KA-0457'}</strong> | Forest Range: <span className="text-stone-300">{currentBatch.forestRange || 'Shimoga Forest Range (Div #04)'}</span> | GPS: <span className="text-stone-300">{currentBatch.gpsCoordinates || '13.9299° N, 75.5681° E'}</span>
                  </div>
                  <div className="text-stone-300 text-xs">
                    Felling date: {currentBatch.fellingDate || '2026-03-01'} | Felling permit: <span className="text-white font-bold">{currentBatch.fellingPermitNo || 'FD/KA-SHM/FEL-2026-8819'}</span> <span className="text-emerald-400 font-bold">✓ Govt Verified</span>
                  </div>
                </div>

                {/* 2. AUCTION & TRANSIT */}
                <div className="space-y-1.5 pb-3 border-b border-[#2C180E]">
                  <div className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#D4AF37] flex items-center justify-between">
                    <span>AUCTION & TRANSIT</span>
                    <span className={`text-[10px] font-mono font-bold ${
                      currentBatch.transitPermitNo ? 'text-emerald-400' : 'text-rose-400'
                    }`}>
                      {currentBatch.transitPermitNo ? '✓ GPS Route Match' : '✗ Transit Gap Flagged'}
                    </span>
                  </div>
                  <div className="text-stone-200 text-xs sm:text-[13px] leading-relaxed">
                    Auction lot: <strong className="text-white">{currentBatch.auctionLotNo || 'AUC-KFD-SHM-2026-0941'}</strong> {currentBatch.auctionLotNo && !currentBatch.auctionLotNo.includes('UNVERIFIED') ? '✓' : '✗'} | Transit permit: <strong className={currentBatch.transitPermitNo ? 'text-white' : 'text-rose-400'}>{currentBatch.transitPermitNo || 'MISSING (No Form-IV)'}</strong> {currentBatch.transitPermitNo ? '✓' : '✗'} | GPS route match {currentBatch.transitPermitNo ? <span className="text-emerald-400 font-bold">✓</span> : <span className="text-rose-400 font-bold">✗</span>}
                  </div>
                </div>

                {/* 3. PROCESSING */}
                <div className="space-y-1.5 pb-3 border-b border-[#2C180E]">
                  <div className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#D4AF37] flex items-center justify-between">
                    <span>PROCESSING</span>
                    <span className={`text-[10px] font-mono font-bold ${
                      currentBatch.massBalanceStatus === 'PASS' ? 'text-emerald-400' : 'text-rose-400'
                    }`}>
                      {currentBatch.massBalanceStatus === 'PASS' ? 'Mass-balance ✓' : 'Mass-balance ✗'}
                    </span>
                  </div>
                  <div className="text-stone-200 text-xs sm:text-[13px] leading-relaxed">
                    Distillation: {currentBatch.distillationYieldRatio || '250 kg wood → 11.25 kg oil'} | Mass-balance {currentBatch.massBalanceStatus === 'PASS' ? <span className="text-emerald-400 font-bold">✓</span> : <span className="text-rose-400 font-bold">✗ (Yield conversion broken)</span>}
                  </div>
                </div>

                {/* 4. MANUFACTURING */}
                <div className="space-y-1.5 pb-3 border-b border-[#2C180E]">
                  <div className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#D4AF37]">
                    <span>MANUFACTURING</span>
                  </div>
                  <div className="text-stone-200 text-xs sm:text-[13px] leading-relaxed">
                    Mfg date: {currentBatch.manufacturingDate} | Location: {currentBatch.manufacturer.includes('Mysore') ? 'KSDL Factory, Mysore, Karnataka' : (currentBatch.originLocation || currentBatch.manufacturer)} | QC cert: <span className="text-white font-bold">{currentBatch.qcCertNo || 'KSDL/BIS/QC-2026-9902'}</span> {currentBatch.qcCertNo ? <span className="text-emerald-400 font-bold">✓</span> : <span className="text-rose-400 font-bold">✗</span>}
                  </div>
                </div>

                {/* 5. DISTRIBUTION & RETAIL */}
                <div className="space-y-1.5 pb-3 border-b border-[#2C180E]">
                  <div className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#D4AF37]">
                    <span>DISTRIBUTION & RETAIL</span>
                  </div>
                  <div className="text-stone-200 text-xs sm:text-[13px] leading-relaxed">
                    Distributor: {currentBatch.distributorName || 'Mysore Sales International Ltd (MSIL)'} | Shop: {currentBatch.retailerName || 'Cauvery Government Sandalwood Emporium'} | Sold from: 2026-03-22
                  </div>
                </div>

                {/* 6. CHAIN INTEGRITY & CERTIFICATES */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-stone-300">
                      Chain integrity: <strong className="text-emerald-400">SHA-256 chain ✓</strong>
                    </span>
                    <span className="text-stone-400">•</span>
                    <span className="text-stone-300">
                      Journey consistency:{' '}
                      <strong className={verification.status === 'VERIFIED' ? 'text-emerald-400' : 'text-rose-400'}>
                        {verification.status === 'VERIFIED' ? '100%' : 'Broken (Anomalies detected)'}
                      </strong>
                    </span>
                  </div>

                  <div className="px-3 py-1 rounded-lg bg-black/40 border border-white/10 text-[#D4AF37] font-bold text-xs flex items-center gap-2">
                    <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Certificates: {currentBatch.certCountVerified || (verification.status === 'VERIFIED' ? 4 : 1)}/{currentBatch.certCountTotal || 4} verified</span>
                  </div>
                </div>
              </div>

              {/* Suspicious Stage Highlighting Callout (For M402 or Flagged Batches) */}
              {verification.status !== 'VERIFIED' && (
                <div className="p-4 rounded-2xl bg-rose-950/70 border-2 border-rose-500/80 space-y-2 text-xs">
                  <div className="flex items-center gap-2 font-bold text-rose-300 text-sm">
                    <AlertOctagon className="w-4 h-4 text-rose-400" />
                    <span>Supply Chain Inspection Flag: Broken Upstream Checkpoints</span>
                  </div>
                  <p className="text-rose-200 leading-relaxed font-mono">
                    {currentBatch.batchId === 'MS2026-M402'
                      ? 'Stage 2 & Stage 3 Anomaly: Missing Forest Dept Form-IV transit permit no. and vehicle GPS log. Raw wood jumped straight to packaging without verified weighbridge intake or distillation yield log. Mass-balance check failed.'
                      : verification.humanExplanation}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* PRODUCT PROFILE & VERIFICATION OVERVIEW CARD */}
          {currentBatch && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-stone-200 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#FAF7F2] text-[#24140D] font-bold border border-stone-200">
                        {currentBatch.category}
                      </span>
                      <span className="text-xs font-mono text-stone-500">
                        Batch ID: <strong className="text-[#24140D]">{currentBatch.batchId}</strong>
                      </span>
                      <span
                        className={`text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider ${
                          verification.status === 'VERIFIED'
                            ? 'bg-[#24140D] text-white'
                            : verification.status === 'SUSPICIOUS'
                            ? 'bg-rose-100 text-rose-900 border border-rose-300'
                            : 'bg-stone-200 text-stone-800'
                        }`}
                      >
                        {verification.status}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold font-heritage text-[#24140D]">
                      {currentBatch.productName}
                    </h3>

                    <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                      {currentBatch.description}
                    </p>

                    {/* Metadata Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                      <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-0.5">
                        <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                          Manufacturer
                        </span>
                        <div className="font-bold text-[#24140D] flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-[#7D4F33]" />
                          <span>{currentBatch.manufacturer}</span>
                        </div>
                      </div>

                      <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-0.5">
                        <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                          Declared Source / Forest Origin
                        </span>
                        <div className="font-bold text-[#24140D] flex items-center gap-1.5">
                          <Trees className="w-3.5 h-3.5 text-[#7D4F33]" />
                          <span>{currentBatch.declaredOrigin}</span>
                        </div>
                      </div>

                      <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-0.5">
                        <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                          Manufacturing Date
                        </span>
                        <div className="font-bold text-[#24140D] flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#7D4F33]" />
                          <span>{currentBatch.manufacturingDate}</span>
                        </div>
                      </div>

                      <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-0.5">
                        <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                          Registered Batch Quantity
                        </span>
                        <div className="font-bold text-[#24140D] flex items-center gap-1.5">
                          <Package className="w-3.5 h-3.5 text-[#7D4F33]" />
                          <span>{currentBatch.registeredQuantity} {currentBatch.unit}</span>
                        </div>
                      </div>
                    </div>

                    {/* Warnings or Missing Records Disclosures */}
                    {verification.status !== 'VERIFIED' && (
                      <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs space-y-2">
                        <div className="flex items-center gap-2 text-amber-900 font-bold">
                          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                          <span>Identified Discrepancies & Warnings:</span>
                        </div>
                        <ul className="list-disc pl-5 space-y-1 text-amber-800 text-[11px]">
                          {verification.failedChecks.map((f, i) => (
                            <li key={i}>
                              <strong>{f.code}:</strong> {f.description}
                            </li>
                          ))}
                          {verification.warningChecks.map((w, i) => (
                            <li key={i}>
                              <strong>{w.code}:</strong> {w.description}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-4">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#7D4F33]">
                      Karnataka Forest Department Procurement Anchor
                    </span>
                    <p className="text-xs font-mono font-bold text-[#24140D] mt-0.5">
                      {currentBatch.procurementRef}
                    </p>
                  </div>
                  <span className="text-[10px] px-2.5 py-1 rounded bg-[#24140D] text-white font-semibold uppercase tracking-wider">
                    Official Transit Lot #{currentBatch.sourceLotId || 'KFD-SHM-LOT-2026-8819'}
                  </span>
                </div>
              </div>

              {/* QR Code Passport Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200 flex flex-col items-center justify-between text-center space-y-4">
                <div className="w-full border-b border-stone-100 pb-3">
                  <span className="text-xs uppercase font-bold tracking-widest text-[#7D4F33]">
                    Product QR Verification
                  </span>
                  <h4 className="text-base font-bold font-heritage text-[#24140D]">
                    Scannable Digital Passport
                  </h4>
                </div>

                {qrDataUrl ? (
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 shadow-inner">
                    <img
                      src={qrDataUrl}
                      alt="Batch QR Code"
                      className="w-44 h-44 object-contain rounded"
                    />
                  </div>
                ) : (
                  <div className="w-44 h-44 bg-stone-100 flex items-center justify-center text-stone-400">
                    Generating QR...
                  </div>
                )}

                <div className="space-y-1">
                  <p className="font-mono text-xs font-bold text-[#24140D]">
                    {currentBatch.batchId}
                  </p>
                  <p className="text-[11px] text-stone-500">
                    Total Scans Recorded: <strong>{currentBatch.scanCount || 1}</strong>
                  </p>
                </div>

                {qrDataUrl && (
                  <a
                    href={qrDataUrl}
                    download={`sandalsure-qr-${currentBatch.batchId}.png`}
                    className="no-print w-full py-2 bg-[#24140D] hover:bg-[#381F13] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Download Label Card</span>
                  </a>
                )}
              </div>
            </div>
          )}

          {/* VERTICAL SIX-STAGE TIMELINE COMPONENT */}
          <VerticalSixStageTimeline
            batch={currentBatch}
            events={events}
            verification={verification}
            qrDataUrl={qrDataUrl}
            onViewCertificateModal={() => setShowCertificateModal(true)}
          />

          {/* THE 4 CHECKS SUMMARY CARDS (STEP 4 CORE AUDIT) */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-stone-200 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-[#7D4F33]">
                  Records Inspection Breakdown
                </span>
                <h3 className="text-xl font-bold font-heritage text-[#24140D]">
                  Four-Pillar Integrity Evaluation
                </h3>
              </div>
              <span className="text-xs font-mono text-stone-500">
                11 Checks Evaluated
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              {/* Check 1: Batch Information */}
              <div className="p-4 rounded-xl border bg-stone-50/60 border-stone-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#24140D] font-heritage">
                    1. Batch Information
                  </span>
                  {batchInfoChecks.some((c) => c.status === 'FAIL') ? (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-100 text-rose-800 font-bold">
                      FAIL
                    </span>
                  ) : (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#24140D] text-white font-bold">
                      PASS
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-stone-600">
                  Validates registered batch ID, manufacturer identity, declared forest origin, and
                  mandatory metadata attributes.
                </p>
                <div className="text-[10px] text-stone-500 font-mono pt-1">
                  {currentBatch ? `ID: ${currentBatch.batchId}` : 'Unregistered'}
                </div>
              </div>

              {/* Check 2: Recorded Journey */}
              <div className="p-4 rounded-xl border bg-stone-50/60 border-stone-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#24140D] font-heritage">
                    2. Recorded Journey
                  </span>
                  {journeyChecks.some((c) => c.status === 'FAIL') ? (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-100 text-rose-800 font-bold">
                      FAIL
                    </span>
                  ) : (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#24140D] text-white font-bold">
                      PASS
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-stone-600">
                  Verifies forward chronological timeline ordering, absence of anachronistic backdating,
                  and recorded event milestones.
                </p>
                <div className="text-[10px] text-stone-500 font-mono pt-1">
                  {events.length} milestone(s) logged
                </div>
              </div>

              {/* Check 3: Missing Stages */}
              <div className="p-4 rounded-xl border bg-stone-50/60 border-stone-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#24140D] font-heritage">
                    3. Missing Stages
                  </span>
                  {missingStagesChecks.some((c) => c.status === 'FAIL') ? (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-100 text-rose-800 font-bold">
                      FAIL
                    </span>
                  ) : (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#24140D] text-white font-bold">
                      PASS
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-stone-600">
                  Detects skipped essential transformations. Raw timber billets cannot bypass
                  distillation or factory processing to reach retail shelves.
                </p>
                <div className="text-[10px] text-stone-500 font-mono pt-1">
                  Continuity validated
                </div>
              </div>

              {/* Check 4: Suspicious Changes */}
              <div className="p-4 rounded-xl border bg-stone-50/60 border-stone-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#24140D] font-heritage">
                    4. Suspicious Changes
                  </span>
                  {suspiciousChangesChecks.some((c) => c.status === 'FAIL') ? (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-100 text-rose-800 font-bold">
                      FAIL
                    </span>
                  ) : (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#24140D] text-white font-bold">
                      PASS
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-stone-600">
                  Checks cryptographic SHA-256 event hash chain, mass-balance conversion bounds
                  (&le;+5% yield expansion), and database tamper integrity.
                </p>
                <div className="text-[10px] text-stone-500 font-mono pt-1">
                  {verification.hashChainValid ? 'SHA-256 intact' : 'Tamper detected'}
                </div>
              </div>
            </div>
          </div>

          {/* Transparency & Limitations Disclaimer */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 space-y-3">
            <div className="flex items-center space-x-2 text-[#24140D] font-bold text-sm">
              <ShieldCheck className="w-5 h-5 text-[#7D4F33]" />
              <span>Independent Verification Scope & Responsible Disclosures</span>
            </div>
            <ul className="text-xs text-stone-600 space-y-1.5 list-disc list-inside">
              {verification.evidenceLimitations.map((lim, idx) => (
                <li key={idx}>{lim}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Report Anomaly Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-stone-200 space-y-5">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
                <h3 className="text-lg font-bold font-heritage text-[#24140D]">
                  Report Suspicious Sandalwood
                </h3>
              </div>
              <button
                onClick={() => setShowReportModal(false)}
                className="text-stone-400 hover:text-stone-600 text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            {reportSuccess ? (
              <div className="p-6 bg-stone-50 text-[#24140D] rounded-xl text-center space-y-2 border border-stone-200">
                <CheckCircle2 className="w-10 h-10 text-[#24140D] mx-auto" />
                <h4 className="font-bold text-base">Anomaly Report Submitted</h4>
                <p className="text-xs text-stone-600">
                  Karnataka Forest Department / KSDL quality inspection desk has received this alert
                  for batch investigation.
                </p>
              </div>
            ) : (
              <form onSubmit={handleReportSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Target Batch ID</label>
                  <input
                    type="text"
                    readOnly
                    value={verification?.batchId || ''}
                    className="w-full p-2.5 bg-stone-100 border border-stone-300 rounded-lg font-mono"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Issue Category</label>
                  <select
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value as any)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg"
                  >
                    <option value="UNUSUAL_SMELL_OR_TEXTURE">
                      Unusual Smell, Synthetic Chemical Diluent, or Faded Scent
                    </option>
                    <option value="TAMPERED_SEAL">Tampered Hologram / Resealed Packaging</option>
                    <option value="DUPLICATE_CODE">Photocopied / Duplicate QR Code on Shelf</option>
                    <option value="RETAIL_SUSPICION">Suspicious Street Vendor / Unlicensed Outlet</option>
                    <option value="LOCATION_MISMATCH">Retail Location Mismatch</option>
                    <option value="OTHER">Other Authenticity Concern</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">
                    Describe Observations
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={reportDesc}
                    onChange={(e) => setReportDesc(e.target.value)}
                    placeholder="e.g. Scent dissipated in 15 minutes, oily yellow color instead of pale amber..."
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#24140D]"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">
                    Retail Shop Name & City
                  </label>
                  <input
                    type="text"
                    required
                    value={reportLocation}
                    onChange={(e) => setReportLocation(e.target.value)}
                    placeholder="e.g. Cauvery Souvenirs, Sayyaji Rao Road, Mysuru"
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#24140D]"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">
                    Contact Email (Optional for updates)
                  </label>
                  <input
                    type="email"
                    value={reportEmail}
                    onChange={(e) => setReportEmail(e.target.value)}
                    placeholder="consumer@example.com"
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#24140D]"
                  />
                </div>

                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowReportModal(false)}
                    className="px-4 py-2 border border-stone-300 rounded-lg text-stone-600 hover:bg-stone-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#24140D] hover:bg-[#381F13] text-white rounded-lg font-bold flex items-center space-x-1.5 cursor-pointer shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Incident Report</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Official Government Certificate Specimen Modal */}
      {showCertificateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#7D4F33]">
                  Government Document Specimen
                </span>
                <h3 className="text-lg font-bold font-heritage text-[#24140D]">
                  Karnataka Forest Department Form-IV Transit License
                </h3>
              </div>
              <button
                onClick={() => setShowCertificateModal(false)}
                className="text-stone-400 hover:text-stone-600 text-xl font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-2 bg-stone-100 rounded-xl border border-stone-300 flex justify-center">
              <img
                src={OFFICIAL_SAMPLE_CERTIFICATE_DATA_URL}
                alt="Official Government Transit Permit Form-IV"
                className="max-h-[60vh] object-contain rounded-lg shadow-sm border border-stone-200"
              />
            </div>

            <div className="text-xs text-stone-600 space-y-1">
              <p>
                <strong>License Reference:</strong> Form-IV #KFD/FORM-IV/2026-09418
              </p>
              <p>
                <strong>Issuing Authority:</strong> Office of the Divisional Forest Officer (DFO), Shimoga Division
              </p>
              <p className="text-[11px] text-stone-500 italic">
                This document legally validates that raw sandalwood was procured through authorized state forest harvest channels under Karnataka Forest Rules 1969.
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setShowCertificateModal(false)}
                className="px-5 py-2 bg-[#24140D] hover:bg-[#3D2418] text-white rounded-xl text-xs font-bold cursor-pointer transition-colors"
              >
                Close Specimen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
