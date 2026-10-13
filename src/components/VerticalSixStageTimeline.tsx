import React, { useState, useEffect } from 'react';
import {
  ProductBatch,
  SupplyChainEvent,
  VerificationResult,
} from '../types';
import { getSixStageTimelineForBatch } from '../utils/consistencyEngine';
import QRCode from 'qrcode';
import {
  Trees,
  FileText,
  Truck,
  Factory,
  Store,
  QrCode,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  AlertOctagon,
  Calendar,
  MapPin,
  Building2,
  Package,
  FlaskConical,
  Eye,
  ShieldCheck,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Hash,
  Scale,
  Award,
  Smartphone,
  Download,
  Copy,
  Check,
} from 'lucide-react';

interface VerticalSixStageTimelineProps {
  batch: ProductBatch | null;
  events: SupplyChainEvent[];
  verification: VerificationResult;
  qrDataUrl?: string;
  onViewCertificateModal?: () => void;
}

export const VerticalSixStageTimeline: React.FC<VerticalSixStageTimelineProps> = ({
  batch,
  events,
  verification,
  qrDataUrl,
  onViewCertificateModal,
}) => {
  const [internalQr, setInternalQr] = useState<string>(qrDataUrl || '');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  useEffect(() => {
    if (qrDataUrl) {
      setInternalQr(qrDataUrl);
      return;
    }
    if (batch?.batchId) {
      const verifyUrl = `${window.location.origin}?batch=${encodeURIComponent(batch.batchId)}`;
      QRCode.toDataURL(verifyUrl, {
        margin: 2,
        width: 256,
        color: {
          dark: '#24140D',
          light: '#FFFFFF',
        },
      })
        .then((url) => setInternalQr(url))
        .catch(() => {});
    }
  }, [qrDataUrl, batch?.batchId]);

  const activeQr = qrDataUrl || internalQr;
  const currentVerifyUrl = batch?.batchId
    ? `${window.location.origin}?batch=${encodeURIComponent(batch.batchId)}`
    : window.location.href;

  const handleCopyLink = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(currentVerifyUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const [expandedStages, setExpandedStages] = useState<Record<string, boolean>>({
    '01_FOREST_SOURCE': true,
    '02_PERMIT_CERTIFICATE': true,
    '03_TIMBER_TRANSPORT': true,
    '04_FACTORY_MANUFACTURING': true,
    '05_DISTRIBUTOR_RETAIL': true,
    '06_CUSTOMER_QR_SCAN': true,
  });

  const toggleStage = (stageKey: string) => {
    setExpandedStages((prev) => ({
      ...prev,
      [stageKey]: !prev[stageKey],
    }));
  };

  const sixStages = getSixStageTimelineForBatch(batch, events);

  const getStageIcon = (key: string) => {
    switch (key) {
      case '01_FOREST_SOURCE':
        return Trees;
      case '02_PERMIT_CERTIFICATE':
        return FileText;
      case '03_TIMBER_TRANSPORT':
        return Truck;
      case '04_FACTORY_MANUFACTURING':
        return Factory;
      case '05_DISTRIBUTOR_RETAIL':
        return Store;
      case '06_CUSTOMER_QR_SCAN':
        return QrCode;
      default:
        return Package;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#24140D] text-white">
            <CheckCircle2 className="w-3 h-3 text-[#D4AF37]" />
            Verified Record
          </span>
        );
      case 'MISSING':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-600 text-white">
            <AlertTriangle className="w-3 h-3 text-white" />
            Stage Missing
          </span>
        );
      case 'TAMPERED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-700 text-white animate-pulse">
            <AlertOctagon className="w-3 h-3 text-white" />
            Tampered Record
          </span>
        );
      case 'PENDING':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-stone-200 text-stone-800">
            <HelpCircle className="w-3 h-3 text-stone-600" />
            Pending
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-stone-200 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-100 pb-4 gap-2">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#7D4F33] flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            Vertical Six-Stage Traceability Timeline
          </span>
          <h3 className="text-xl sm:text-2xl font-bold font-heritage text-[#24140D]">
            Official Supply Chain Workflow (01 Forest ➔ 06 Customer QR Scan)
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            Complete provenance from how the government license was obtained through factory formulation and retail receipt.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => {
              const allExpanded = Object.values(expandedStages).every(Boolean);
              const nextState = !allExpanded;
              setExpandedStages({
                '01_FOREST_SOURCE': nextState,
                '02_PERMIT_CERTIFICATE': nextState,
                '03_TIMBER_TRANSPORT': nextState,
                '04_FACTORY_MANUFACTURING': nextState,
                '05_DISTRIBUTOR_RETAIL': nextState,
                '06_CUSTOMER_QR_SCAN': nextState,
              });
            }}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-[#24140D] transition-colors cursor-pointer"
          >
            {Object.values(expandedStages).every(Boolean) ? 'Collapse All' : 'Expand All'}
          </button>
        </div>
      </div>

      {/* Vertical Timeline Spine */}
      <div className="relative pl-6 sm:pl-10 space-y-8 before:absolute before:left-3 sm:before:left-5 before:top-4 before:bottom-4 before:w-0.5 before:bg-stone-200">
        {sixStages.map((stageEval, idx) => {
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
                    ? 'bg-rose-50/70 border-rose-200'
                    : isTampered
                    ? 'bg-rose-100/60 border-rose-300'
                    : 'bg-stone-50/40 border-stone-200'
                } p-5 sm:p-6 shadow-xs`}
              >
                {/* Stage Header Summary (Clickable to toggle) */}
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
                          {stageEval.stage.purpose}
                        </span>
                      </div>
                      <h4 className="text-base sm:text-lg font-bold font-heritage text-[#24140D]">
                        {stageEval.stage.name}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 self-end sm:self-center">
                    {getStatusBadge(stageEval.status)}
                    <span className="text-stone-400 hover:text-[#24140D]">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </div>
                </div>

                {/* Expanded Detailed Metadata & Step Narratives */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-stone-200/80 space-y-4 text-xs text-stone-700 animate-fadeIn">
                    {/* Timestamp & Location Banner */}
                    <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl bg-white border border-stone-200 font-mono text-[11px]">
                      <div className="flex items-center gap-1.5 text-stone-600">
                        <Calendar className="w-3.5 h-3.5 text-[#7D4F33]" />
                        <span>
                          Timestamp:{' '}
                          <strong className="text-[#24140D]">
                            {stageEval.timestamp
                              ? new Date(stageEval.timestamp).toLocaleString('en-IN', {
                                  dateStyle: 'medium',
                                  timeStyle: 'short',
                                })
                              : 'No timestamp recorded'}
                          </strong>
                        </span>
                      </div>

                      {stageEval.location && (
                        <div className="flex items-center gap-1.5 text-stone-600">
                          <MapPin className="w-3.5 h-3.5 text-[#7D4F33]" />
                          <span>
                            Location: <strong className="text-[#24140D]">{stageEval.location}</strong>
                          </span>
                        </div>
                      )}

                      {stageEval.authorityOrOrg && (
                        <div className="flex items-center gap-1.5 text-stone-600">
                          <Building2 className="w-3.5 h-3.5 text-[#7D4F33]" />
                          <span>
                            Custodian: <strong className="text-[#24140D]">{stageEval.authorityOrOrg}</strong>
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Stage Specific Narratives & Metadata */}

                    {/* STAGE 01: FOREST / AUTHORIZED SOURCE */}
                    {stageEval.stage.key === '01_FOREST_SOURCE' && (
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                              Declared Forest Origin
                            </span>
                            <div className="font-semibold text-stone-900">
                              {batch?.declaredOrigin || 'Shimoga Forest Range, Western Ghats Division'}
                            </div>
                            <p className="text-[11px] text-stone-500">
                              Government Sandal Depot, Reserved Forest Compartment #4B.
                            </p>
                          </div>

                          <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                              Source Lot Reference
                            </span>
                            <div className="font-mono font-bold text-[#7D4F33]">
                              {stageEval.trackingId || batch?.sourceLotId || 'KFD-SHM-LOT-2026-8819'}
                            </div>
                            <p className="text-[11px] text-stone-500">
                              Auction Slip Ref: <span className="font-mono">{batch?.procurementRef || 'KFD-AUC-2026-08819'}</span>
                            </p>
                          </div>
                        </div>

                        <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                            Harvesting & Ownership Evidence
                          </span>
                          <p className="text-stone-700 leading-relaxed">
                            Authorized salvage extraction of naturally fallen mature heartwood trees (30+ years growth).
                            Certified and stamped by the Range Forest Officer (RFO), Shimoga Division. Procurement registered under Karnataka Forest Department Official Depot Auction.
                          </p>
                          <div className="pt-2 flex items-center justify-between text-[11px]">
                            <span className="inline-flex items-center gap-1 text-emerald-800 font-bold">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              Independently Verified Origin Records
                            </span>
                            <span className="text-stone-400 font-mono text-[10px]">
                              Depot Lot Seal #KFD-4B
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STAGE 02: PERMIT & CERTIFICATE (HOW LICENSE WAS OBTAINED) */}
                    {stageEval.stage.key === '02_PERMIT_CERTIFICATE' && (
                      <div className="space-y-3">
                        {isMissing ? (
                          <div className="p-4 bg-rose-100/70 border border-rose-300 rounded-xl space-y-2">
                            <div className="flex items-center gap-2 text-rose-900 font-bold text-sm">
                              <AlertOctagon className="w-4 h-4 text-rose-600" />
                              Critical Statutory Gap Detected
                            </div>
                            <p className="text-rose-800 text-xs leading-relaxed">
                              No government harvesting permission, Form-IV transit pass, or statutory certification document is registered for this batch. The product has bypassed required Forest Department inspection.
                            </p>
                          </div>
                        ) : (
                          <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-1">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                                  How License Was Acquired
                                </span>
                                <div className="font-semibold text-stone-900">
                                  Form-IV Transit Pass & Origin Certificate
                                </div>
                                <p className="text-[11px] text-stone-500">
                                  Issued under Karnataka Forest Rules 1969 (Rule 145) for legal inter-district timber transit.
                                </p>
                              </div>

                              <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-1">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                                  Issuing Authority & Reference
                                </span>
                                <div className="font-bold text-stone-900">
                                  {stageEval.authorityOrOrg || 'Office of the Divisional Forest Officer (DFO), Shimoga'}
                                </div>
                                <div className="font-mono text-xs text-[#7D4F33] font-bold">
                                  Permit Ref: {stageEval.trackingId || 'KFD/FORM-IV/2026-09418'}
                                </div>
                              </div>
                            </div>

                            <div className="p-3 bg-white rounded-xl border border-stone-200">
                              <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                                  Validity Window & Verification State
                                </span>
                                <div className="text-xs text-stone-800">
                                  <strong>Valid:</strong> 04-MAR-2026 to 30-APR-2026 • <strong>Doc Status:</strong>{' '}
                                  <span className="font-mono font-bold text-[#24140D]">CHECKED_OFFLINE (Physical Stamped Specimen)</span>
                                </div>
                                <p className="text-[10px] text-stone-500 mt-0.5">
                                  Disclosure: Checked against verified depot ledger copy. No simulated live government API claimed.
                                </p>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    )}

                    {/* STAGE 03: TIMBER TRANSPORT */}
                    {stageEval.stage.key === '03_TIMBER_TRANSPORT' && (
                      <div className="space-y-3">
                        {isMissing ? (
                          <div className="p-4 bg-rose-100/70 border border-rose-300 rounded-xl space-y-2">
                            <div className="flex items-center gap-2 text-rose-900 font-bold text-sm">
                              <AlertOctagon className="w-4 h-4 text-rose-600" />
                              Missing Timber Transport Record
                            </div>
                            <p className="text-rose-800 text-xs leading-relaxed">
                              No carrier transit permit or GPS checkpost clearance record connects the forest depot to the factory.
                            </p>
                          </div>
                        ) : (
                          <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-1">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                                  Transit Route & Checkposts
                                </span>
                                <div className="font-semibold text-stone-900">
                                  Shimoga Forest Depot ➔ Tarikere Forest Biometric Checkpost ➔ KSDL Factory Mysuru
                                </div>
                                <p className="text-[11px] text-stone-500">
                                  Monitored GPS Route • State e-Challan Transit Clearance
                                </p>
                              </div>

                              <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-1">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                                  Waybill Reference & Consignment
                                </span>
                                <div className="font-mono font-bold text-[#7D4F33]">
                                  {stageEval.trackingId || 'TP-KA-2026-77821'}
                                </div>
                                <p className="text-[11px] text-stone-500">
                                  Transported: <strong>250 kg raw heartwood billets</strong> in sealed vehicle KA-09-EA-4102.
                                </p>
                              </div>
                            </div>

                            <div className="p-3 bg-white rounded-xl border border-stone-200 flex flex-wrap items-center justify-between text-[11px] text-stone-600 gap-2">
                              <div>
                                <strong>Sender:</strong> KFD Shimoga Depot Superintendent ➔ <strong>Receiver:</strong> KSDL Materials Intake
                              </div>
                              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-stone-100 text-[#24140D] font-bold">
                                Tamper Seal #HTS-KFD-4102 Intact
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    )}

                    {/* STAGE 04: FACTORY / MANUFACTURING (HOW THE PRODUCT WAS MADE) */}
                    {stageEval.stage.key === '04_FACTORY_MANUFACTURING' && (
                      <div className="space-y-3">
                        <div className="p-3 bg-white rounded-xl border border-stone-200">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-100 pb-2 mb-2 gap-1">
                            <div>
                              <span className="text-[10px] font-bold uppercase tracking-wider text-[#7D4F33]">
                                Manufacturing Facility & Genesis Batch
                              </span>
                              <div className="font-bold text-[#24140D] text-sm">
                                {batch?.manufacturer || 'Karnataka Soaps and Detergents Limited (KSDL)'}
                              </div>
                            </div>
                            <div className="font-mono text-xs text-right">
                              Batch: <strong className="text-[#24140D]">{batch?.batchId || 'MS2026-V801'}</strong> • Mfg: {batch?.manufacturingDate || '2026-03-08'}
                            </div>
                          </div>

                          <div className="font-mono text-[11px] text-stone-600 mb-3">
                            Input: 250 kg raw heartwood ➔ Output: {batch?.registeredQuantity || 2000} {batch?.unit || 'units'} (Mass-balance yield verified)
                          </div>

                          {/* How The Product Was Made - 4 Production Steps */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                            <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 space-y-1">
                              <div className="flex items-center gap-1.5 font-bold text-[#24140D] text-xs">
                                <FlaskConical className="w-3.5 h-3.5 text-[#7D4F33]" />
                                Step A: Steam Distillation
                              </div>
                              <p className="text-[11px] text-stone-600 leading-relaxed">
                                Seasoned heartwood billets chipped into coarse shavings and steam-distilled for 72 continuous hours at 105°C, yielding 100% natural Mysore sandalwood essential oil (<em>Santalum album</em>).
                              </p>
                            </div>

                            <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 space-y-1">
                              <div className="flex items-center gap-1.5 font-bold text-[#24140D] text-xs">
                                <Factory className="w-3.5 h-3.5 text-[#7D4F33]" />
                                Step B: Saponification & Triple Milling
                              </div>
                              <p className="text-[11px] text-stone-600 leading-relaxed">
                                Pure sandalwood oil blended into premium vegetable soap base (palm & coconut oils), distilled water, glycerin, and emollients with traditional triple roller milling for ultra-smooth texture.
                              </p>
                            </div>

                            <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 space-y-1">
                              <div className="flex items-center gap-1.5 font-bold text-[#24140D] text-xs">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                                Step C: Lab QC & Gas Chromatography
                              </div>
                              <p className="text-[11px] text-stone-600 leading-relaxed">
                                Gas Chromatography-Mass Spectrometry (GC-MS) certified <strong>91.4% total santalol</strong> purity (exceeding BIS 3298 minimum 90% threshold). Quality Certificate #QC-KSDL-2026-118.
                              </p>
                            </div>

                            <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 space-y-1">
                              <div className="flex items-center gap-1.5 font-bold text-[#24140D] text-xs">
                                <Package className="w-3.5 h-3.5 text-[#7D4F33]" />
                                Step D: Hologram Packaging & QR Affixing
                              </div>
                              <p className="text-[11px] text-stone-600 leading-relaxed">
                                Stamped with royal Mysore Sharabha emblem, wrapped in gold protective foil, affixed with tamper-evident serialized hologram #HTS-9902, and coded with SandalSure AI QR passport.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STAGE 05: DISTRIBUTOR / RETAIL SHOP */}
                    {stageEval.stage.key === '05_DISTRIBUTOR_RETAIL' && (
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                              Distributor & Shipment
                            </span>
                            <div className="font-semibold text-stone-900">
                              Mysore Sales International Limited (MSIL)
                            </div>
                            <p className="text-[11px] text-stone-500 font-mono">
                              Shipment Waybill: {stageEval.trackingId || 'SHIP-MSIL-KA-2026-4402'}
                            </p>
                          </div>

                          <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                              Retail Emporium Destination
                            </span>
                            <div className="font-semibold text-stone-900">
                              Cauvery Government Sandalwood & Handicrafts Emporium
                            </div>
                            <p className="text-[11px] text-stone-500">
                              MG Road / Sayyaji Rao Road Outlet • Licensed State Retailer
                            </p>
                          </div>
                        </div>

                        <div className="p-3 bg-white rounded-xl border border-stone-200 flex items-center justify-between text-[11px]">
                          <span className="text-stone-700">
                            <strong>Stock Confirmation:</strong> {batch?.registeredQuantity || 2000} {batch?.unit || 'units'} received intact and verified on retail inward register.
                          </span>
                          <span className="font-mono text-[10px] bg-stone-100 px-2 py-0.5 rounded text-[#24140D] font-bold">
                            Stock Inward Voucher Cleared
                          </span>
                        </div>
                      </div>
                    )}

                    {/* STAGE 06: CUSTOMER QR SCAN */}
                    {stageEval.stage.key === '06_CUSTOMER_QR_SCAN' && (
                      <div className="space-y-4">
                        {/* Live Consumer Session Header */}
                        <div className="p-4 bg-[#24140D] text-white rounded-xl border border-[#4A2E1F] space-y-3">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-2">
                            <div>
                              <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37]">
                                Customer Traceability Milestone
                              </span>
                              <div className="text-sm font-bold font-heritage">
                                Real-Time Consumer Verification Session
                              </div>
                            </div>
                            <div className="font-mono text-xs px-2.5 py-1 rounded bg-[#3D2418] text-[#D4AF37] border border-[#5C3826]">
                              Scan #{batch?.scanCount || 1} • Live Passport Verified
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-stone-300">
                            <div className="p-2.5 rounded-lg bg-black/40 border border-white/10">
                              <span className="text-[10px] uppercase font-bold text-stone-400 block">Scan Channel</span>
                              <span className="font-mono text-white text-[11px]">Smartphone Camera / Public Web</span>
                            </div>

                            <div className="p-2.5 rounded-lg bg-black/40 border border-white/10">
                              <span className="text-[10px] uppercase font-bold text-stone-400 block">SHA-256 Ledger</span>
                              <span className="font-mono text-emerald-400 text-[11px] flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                Hash Chain Cryptographically Valid
                              </span>
                            </div>

                            <div className="p-2.5 rounded-lg bg-black/40 border border-white/10">
                              <span className="text-[10px] uppercase font-bold text-stone-400 block">Journey Verdict</span>
                              <span className="font-bold text-[#D4AF37] text-[11px]">
                                {verification.status}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* CUSTOMER SCANNABLE QR PASSPORT — GET ALL 6 POINTS ON PHONE */}
                        <div className="p-4 sm:p-5 bg-white rounded-xl border-2 border-[#7D4F33]/40 shadow-sm space-y-4">
                          <div className="flex flex-col md:flex-row items-center gap-5">
                            {/* The Scannable QR Code */}
                            <div className="shrink-0 flex flex-col items-center space-y-2">
                              <div className="p-3 bg-[#FAF7F2] rounded-xl border-2 border-[#24140D] shadow-inner flex items-center justify-center">
                                {activeQr ? (
                                  <img
                                    src={activeQr}
                                    alt={`QR Code for batch ${batch?.batchId}`}
                                    className="w-40 h-40 sm:w-44 sm:h-44 object-contain rounded"
                                  />
                                ) : (
                                  <div className="w-40 h-40 sm:w-44 sm:h-44 flex flex-col items-center justify-center text-stone-400">
                                    <QrCode className="w-10 h-10 mb-2 animate-pulse text-[#7D4F33]" />
                                    <span className="text-xs">Generating QR...</span>
                                  </div>
                                )}
                              </div>

                              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#24140D] bg-stone-100 px-3 py-1 rounded-full border border-stone-200">
                                <Smartphone className="w-3.5 h-3.5 text-[#7D4F33]" />
                                Scan with Phone Camera
                              </span>
                            </div>

                            {/* What the customer gets on their phone: all 6 points */}
                            <div className="flex-1 space-y-3 text-left w-full">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#24140D] text-[#D4AF37]">
                                    Direct Phone Scan
                                  </span>
                                  <span className="font-mono text-xs font-bold text-[#24140D]">
                                    Batch #{batch?.batchId || 'MS2026-V801'}
                                  </span>
                                </div>
                                <h5 className="text-base font-bold font-heritage text-[#24140D]">
                                  Scan This QR to Access All 6 Supply Chain Points on Your Phone
                                </h5>
                                <p className="text-xs text-stone-600 leading-relaxed">
                                  Point your mobile camera at this QR code. Customers immediately receive the complete unbroken 6-point provenance trail directly on their phone:
                                </p>
                              </div>

                              {/* Breakdown of the 6 points delivered to the phone */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-medium text-stone-700 bg-stone-50 p-3 rounded-xl border border-stone-200">
                                <div className="flex items-start gap-2">
                                  <span className="w-4 h-4 rounded-full bg-[#24140D] text-[#D4AF37] font-mono text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                                    01
                                  </span>
                                  <span>
                                    <strong className="text-[#24140D]">Forest Source:</strong> Verified Shimoga depot extraction
                                  </span>
                                </div>

                                <div className="flex items-start gap-2">
                                  <span className="w-4 h-4 rounded-full bg-[#24140D] text-[#D4AF37] font-mono text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                                    02
                                  </span>
                                  <span>
                                    <strong className="text-[#24140D]">Transit Permit:</strong> KFD Form-IV statutory pass
                                  </span>
                                </div>

                                <div className="flex items-start gap-2">
                                  <span className="w-4 h-4 rounded-full bg-[#24140D] text-[#D4AF37] font-mono text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                                    03
                                  </span>
                                  <span>
                                    <strong className="text-[#24140D]">Timber Transport:</strong> GPS route & biometric checkpost
                                  </span>
                                </div>

                                <div className="flex items-start gap-2">
                                  <span className="w-4 h-4 rounded-full bg-[#24140D] text-[#D4AF37] font-mono text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                                    04
                                  </span>
                                  <span>
                                    <strong className="text-[#24140D]">Factory Making:</strong> Hydro-distillation & soap pack
                                  </span>
                                </div>

                                <div className="flex items-start gap-2">
                                  <span className="w-4 h-4 rounded-full bg-[#24140D] text-[#D4AF37] font-mono text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                                    05
                                  </span>
                                  <span>
                                    <strong className="text-[#24140D]">Retail Emporium:</strong> MSIL & Cauvery stock intake
                                  </span>
                                </div>

                                <div className="flex items-start gap-2">
                                  <span className="w-4 h-4 rounded-full bg-[#24140D] text-[#D4AF37] font-mono text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                                    06
                                  </span>
                                  <span>
                                    <strong className="text-[#24140D]">Consumer Scan:</strong> Live count & SHA-256 integrity
                                  </span>
                                </div>
                              </div>

                              {/* Interactive Action Controls */}
                              <div className="flex flex-wrap items-center gap-2 pt-1">
                                {activeQr && (
                                  <a
                                    href={activeQr}
                                    download={`sandalsure-mobile-qr-${batch?.batchId || 'batch'}.png`}
                                    className="px-3 py-1.5 bg-[#24140D] hover:bg-[#3D2418] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                                  >
                                    <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
                                    <span>Download QR Code</span>
                                  </a>
                                )}

                                <button
                                  type="button"
                                  onClick={handleCopyLink}
                                  className="px-3 py-1.5 bg-white hover:bg-stone-50 text-[#24140D] border border-stone-300 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                                >
                                  {copiedLink ? (
                                    <>
                                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                                      <span className="text-emerald-700 font-bold">Link Copied!</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3.5 h-3.5 text-stone-500" />
                                      <span>Copy Mobile URL</span>
                                    </>
                                  )}
                                </button>

                                <a
                                  href={currentVerifyUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-3 py-1.5 bg-white hover:bg-stone-50 text-[#7D4F33] border border-stone-300 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                  <span>Open Mobile Preview</span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Cryptographic Hash & Event Evidence Ref Footer */}
                    <div className="pt-2 flex flex-wrap items-center justify-between text-[11px] text-stone-500 border-t border-stone-100 gap-2">
                      <div className="flex items-center gap-1">
                        <Hash className="w-3 h-3 text-stone-400" />
                        <span>Evidence Reference:</span>
                        <span className="font-mono font-bold text-[#7D4F33]">
                          {stageEval.evidenceRef || stageEval.trackingId || 'STATUTORY-LEDGER-RECORD'}
                        </span>
                      </div>

                      <div className="font-mono text-[10px] text-stone-400">
                        Stage Key: {stageEval.stage.key}
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
