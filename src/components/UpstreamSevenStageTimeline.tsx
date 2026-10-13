import React, { useState } from 'react';
import {
  ProductBatch,
  SupplyChainEvent,
  VerificationResult,
} from '../types';
import { getSevenStageTimelineForBatch, SevenStageTimelineItem } from '../utils/consistencyEngine';
import {
  Trees,
  Scale,
  Truck,
  Building2,
  FlaskConical,
  Factory,
  Store,
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Award,
  Hash,
  FileCheck,
  Check,
  Copy,
  ExternalLink,
  Info,
  Calendar,
  MapPin,
  Barcode,
} from 'lucide-react';

interface UpstreamSevenStageTimelineProps {
  batch: ProductBatch | null;
  events: SupplyChainEvent[];
  verification: VerificationResult;
}

export const UpstreamSevenStageTimeline: React.FC<UpstreamSevenStageTimelineProps> = ({
  batch,
  events,
  verification,
}) => {
  const [expandedStages, setExpandedStages] = useState<Record<string, boolean>>({
    '01_TREE_FELLING': true,
    '02_FOREST_DEPOT': true,
    '03_TRANSIT': true,
    '04_FACTORY_INTAKE': true,
    '05_PROCESSING': true,
    '06_MANUFACTURING': true,
    '07_DISTRIBUTION_RETAIL': true,
  });

  const toggleStage = (key: string) => {
    setExpandedStages((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const stages = getSevenStageTimelineForBatch(batch, events);

  const getStageIcon = (key: string) => {
    switch (key) {
      case '01_TREE_FELLING':
        return Trees;
      case '02_FOREST_DEPOT':
        return Scale;
      case '03_TRANSIT':
        return Truck;
      case '04_FACTORY_INTAKE':
        return Building2;
      case '05_PROCESSING':
        return FlaskConical;
      case '06_MANUFACTURING':
        return Factory;
      case '07_DISTRIBUTION_RETAIL':
        return Store;
      default:
        return FileCheck;
    }
  };

  // Count verified government certificates
  const verifiedCertsCount = stages.filter((s) => s.status === 'COMPLETED' && s.isGovtVerifiedBadge).length;
  const totalCertsCount = stages.length;

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-stone-200 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between border-b border-stone-100 pb-5 gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#7D4F33]/20 text-[#7D4F33] text-xs font-bold uppercase tracking-wider mb-1.5">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            <span>Upstream Tree-to-Shop Traceability Chain</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-heritage text-[#24140D]">
            7-Stage Supply Chain Timeline & Government Certificate Layer
          </h3>
          <p className="text-xs text-stone-500 mt-1 max-w-2xl">
            Extended provenance tracking from tree felling in the Karnataka forest, timber depot auction, guarded transit, factory intake, steam distillation yield to retail delivery.
          </p>
        </div>

        {/* Certificate Layer Summary Pill & Expand/Collapse */}
        <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto">
          <div className="px-3.5 py-1.5 rounded-xl bg-[#24140D] text-white text-xs font-mono font-bold flex items-center gap-2 shadow-xs">
            <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>
              Certificates: <strong className="text-[#D4AF37]">{verifiedCertsCount}/{totalCertsCount}</strong> verified
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              const allExpanded = Object.values(expandedStages).every(Boolean);
              const nextState = !allExpanded;
              setExpandedStages({
                '01_TREE_FELLING': nextState,
                '02_FOREST_DEPOT': nextState,
                '03_TRANSIT': nextState,
                '04_FACTORY_INTAKE': nextState,
                '05_PROCESSING': nextState,
                '06_MANUFACTURING': nextState,
                '07_DISTRIBUTION_RETAIL': nextState,
              });
            }}
            className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-[#24140D] transition-colors cursor-pointer"
          >
            {Object.values(expandedStages).every(Boolean) ? 'Collapse All' : 'Expand All'}
          </button>
        </div>
      </div>

      {/* Production & Database API Disclosure Note */}
      <div className="p-3.5 bg-[#FAF7F2] rounded-xl border border-[#D4AF37]/30 text-xs text-stone-700 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-[#7D4F33] shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-[#24140D]">Government Certificate Layer Architecture:</strong> Each stage is cryptographically linked with its certificate ID, issuing authority, and validity window. In production, these records are cross-validated against the Karnataka Forest Department & statutory authority databases via signed API endpoints or e-Pass webhooks.
        </div>
      </div>

      {/* Vertical Timeline Spine */}
      <div className="relative pl-6 sm:pl-10 space-y-6 before:absolute before:left-3 sm:before:left-5 before:top-4 before:bottom-4 before:w-0.5 before:bg-stone-200">
        {stages.map((stageEval) => {
          const StageIcon = getStageIcon(stageEval.stage.key);
          const isExpanded = !!expandedStages[stageEval.stage.key];
          const isMissing = stageEval.status === 'MISSING';
          const isTampered = stageEval.status === 'TAMPERED';
          const isCompleted = stageEval.status === 'COMPLETED';

          return (
            <div key={stageEval.stage.key} className="relative group">
              {/* Node Marker on vertical line */}
              <div
                className={`absolute -left-6 sm:-left-10 top-0 w-7 h-7 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-mono font-bold text-xs sm:text-sm border-2 shadow-sm transition-transform ${
                  isCompleted
                    ? 'bg-[#24140D] text-white border-white ring-4 ring-stone-100'
                    : isMissing
                    ? 'bg-rose-600 text-white border-white ring-4 ring-rose-100'
                    : isTampered
                    ? 'bg-rose-700 text-white border-white ring-4 ring-rose-200 animate-pulse'
                    : 'bg-stone-300 text-stone-700 border-white ring-4 ring-stone-100'
                }`}
              >
                {stageEval.stage.step}
              </div>

              {/* Stage Card */}
              <div
                className={`rounded-2xl border transition-all ${
                  isCompleted
                    ? 'bg-stone-50/70 border-stone-200 hover:border-[#24140D]'
                    : isMissing
                    ? 'bg-rose-50/70 border-rose-300 ring-2 ring-rose-200'
                    : isTampered
                    ? 'bg-rose-100/60 border-rose-300'
                    : 'bg-stone-50/40 border-stone-200'
                } p-5 sm:p-6 shadow-xs`}
              >
                {/* Stage Header Summary (Clickable) */}
                <div
                  onClick={() => toggleStage(stageEval.stage.key)}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer select-none"
                >
                  <div className="flex items-start sm:items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center shrink-0 shadow-2xs">
                      <StageIcon className={`w-5 h-5 ${isMissing ? 'text-rose-600' : 'text-[#7D4F33]'}`} />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-mono font-bold text-stone-400">
                          STAGE {stageEval.stage.step}
                        </span>
                        <span className="text-stone-300">•</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#7D4F33]">
                          {stageEval.stage.stageName}
                        </span>
                      </div>
                      <h4 className="text-base sm:text-lg font-bold font-heritage text-[#24140D]">
                        {stageEval.stage.name}
                      </h4>
                    </div>
                  </div>

                  {/* Badges: Stage Status & ✓ Govt Verified Badge */}
                  <div className="flex items-center space-x-2 self-end sm:self-center">
                    {isCompleted && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-900 text-emerald-200 border border-emerald-700 shadow-xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                        ✓ Govt Verified
                      </span>
                    )}

                    {isMissing && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-600 text-white shadow-xs">
                        <AlertOctagon className="w-3.5 h-3.5 text-white" />
                        Missing Stage / Permit Broken
                      </span>
                    )}

                    <span className="text-stone-400 hover:text-[#24140D] ml-1">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-stone-200/80 space-y-4 text-xs text-stone-700 animate-fadeIn">
                    {/* Data to Store vs Govt Proof Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {/* Left: Data to Store */}
                      <div className="p-3.5 bg-white rounded-xl border border-stone-200 space-y-1.5">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block">
                          Data Stored on Ledger
                        </span>
                        <div className="font-semibold text-stone-900 text-xs">
                          {stageEval.dataSummary}
                        </div>
                        <p className="text-[11px] text-stone-500 font-mono">
                          {stageEval.stage.dataToStore}
                        </p>
                      </div>

                      {/* Right: Government Proof */}
                      <div className={`p-3.5 rounded-xl border space-y-1.5 ${
                        isCompleted
                          ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                          : 'bg-rose-50 border-rose-200 text-rose-950'
                      }`}>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500 block">
                            Government Proof Layer
                          </span>
                          {isCompleted ? (
                            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                              ✓ Verified
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold text-rose-800 bg-rose-100 px-2 py-0.5 rounded">
                              ✗ Missing Proof
                            </span>
                          )}
                        </div>

                        <div className="font-bold text-xs">
                          {stageEval.govtProofLabel}
                        </div>

                        <div className="text-[11px] text-stone-600">
                          <strong>Issuing Authority:</strong> {stageEval.issuingAuthority || stageEval.stage.certificateAuthority}
                        </div>
                      </div>
                    </div>

                    {/* Stage Narrative Description */}
                    <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-1">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block">
                        Stage Execution Narrative
                      </span>
                      <p className="text-xs text-stone-800 leading-relaxed font-mono">
                        {stageEval.details}
                      </p>
                    </div>

                    {/* Metadata Footer */}
                    <div className="pt-2 flex flex-wrap items-center justify-between text-[11px] text-stone-500 border-t border-stone-100 gap-2">
                      <div className="flex items-center gap-1.5">
                        <Hash className="w-3 h-3 text-stone-400" />
                        <span>Statutory Reference:</span>
                        <span className="font-mono font-bold text-[#7D4F33]">
                          {stageEval.evidenceRef || stageEval.trackingId || 'STATUTORY-LEDGER-RECORD'}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {stageEval.timestamp && (
                          <span className="font-mono text-[10px] text-stone-400">
                            {new Date(stageEval.timestamp).toLocaleDateString('en-IN', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                        )}
                        <span className="font-mono text-[10px] text-stone-400 bg-stone-100 px-2 py-0.5 rounded">
                          {stageEval.stage.key}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
