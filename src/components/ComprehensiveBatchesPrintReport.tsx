import React from 'react';
import { dataStore } from '../services/dataStore';
import { verifyBatchJourney } from '../utils/consistencyEngine';
import { VerificationResult } from '../types';

export const ComprehensiveBatchesPrintReport: React.FC = () => {
  const batches = dataStore.getBatches();
  
  // Compute evaluations for all batches
  const evaluations: Record<string, VerificationResult> = {};
  batches.forEach((b) => {
    const bEvents = dataStore.getEventsForBatch(b.batchId);
    evaluations[b.batchId] = verifyBatchJourney(b, bEvents, batches);
  });

  const totalBatches = batches.length;
  const verifiedCount = Object.values(evaluations).filter((v) => v.status === 'VERIFIED').length;
  const suspiciousCount = Object.values(evaluations).filter((v) => v.status === 'SUSPICIOUS').length;
  const unverifiedCount = Object.values(evaluations).filter((v) => v.status === 'UNVERIFIED').length;
  const averageRisk =
    totalBatches > 0
      ? Math.round(
          Object.values(evaluations).reduce((acc, curr) => acc + curr.riskScore, 0) / totalBatches
        )
      : 0;

  return (
    <div className="print-only p-4 text-black bg-white">
      <div className="mb-6 border-b border-stone-300 pb-4">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-xl font-bold font-serif tracking-tight text-black">
              KARNATAKA STATE DIGITAL SANDALWOOD REGISTRY (KSDL & KFD)
            </h1>
            <h2 className="text-sm font-semibold text-stone-700">
              Official Provenance Ledger — Comprehensive Product Batches Verification Report
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              System: SandalSure AI Journey Consistency Engine • Ideathon 2026
            </p>
          </div>
          <div className="text-right text-xs">
            <div>
              Printed:{' '}
              <strong>
                {new Date().toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </strong>
            </div>
            <div className="text-stone-500 font-mono text-[10px]">
              Cryptographic SHA-256 Ledger • White & Dark Brown Scheme
            </div>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2 mt-4 text-xs bg-stone-100 p-2.5 rounded border border-stone-300">
          <div>
            Total Batches: <strong>{totalBatches}</strong>
          </div>
          <div>
            Verified: <strong className="text-green-800">{verifiedCount}</strong>
          </div>
          <div>
            Suspicious Flagged: <strong className="text-amber-800">{suspiciousCount}</strong>
          </div>
          <div>
            Unverified: <strong>{unverifiedCount}</strong>
          </div>
          <div>
            Fleet Average Risk: <strong>{averageRisk}/100</strong>
          </div>
        </div>
      </div>

      <table className="w-full text-left text-[10px] border-collapse border border-stone-300">
        <thead>
          <tr className="bg-stone-200 text-black uppercase font-bold text-[9px]">
            <th className="p-2 border border-stone-300">Batch ID</th>
            <th className="p-2 border border-stone-300">Product Name</th>
            <th className="p-2 border border-stone-300">Category</th>
            <th className="p-2 border border-stone-300">Manufacturer</th>
            <th className="p-2 border border-stone-300">Declared Origin & Procurement Ref</th>
            <th className="p-2 border border-stone-300">Quantity</th>
            <th className="p-2 border border-stone-300">Stage</th>
            <th className="p-2 border border-stone-300 text-center">Status</th>
            <th className="p-2 border border-stone-300 text-center">Risk</th>
            <th className="p-2 border border-stone-300 text-center">Hash Integrity</th>
            <th className="p-2 border border-stone-300 text-center">Pins</th>
          </tr>
        </thead>
        <tbody>
          {batches.map((b) => {
            const ev = evaluations[b.batchId];
            const bEvents = dataStore.getEventsForBatch(b.batchId);
            return (
              <tr key={b.batchId} className="border-b border-stone-300">
                <td className="p-2 border border-stone-300 font-mono font-bold">{b.batchId}</td>
                <td className="p-2 border border-stone-300 font-semibold">{b.productName}</td>
                <td className="p-2 border border-stone-300">{b.category}</td>
                <td className="p-2 border border-stone-300">{b.manufacturer}</td>
                <td className="p-2 border border-stone-300">
                  <div>{b.declaredOrigin}</div>
                  <div className="font-mono text-[9px] text-stone-600">{b.procurementRef}</div>
                </td>
                <td className="p-2 border border-stone-300 whitespace-nowrap">
                  {b.registeredQuantity} {b.unit}
                </td>
                <td className="p-2 border border-stone-300 font-mono text-[9px]">{b.currentStage}</td>
                <td className="p-2 border border-stone-300 text-center font-bold">
                  <span
                    className={
                      ev?.status === 'VERIFIED'
                        ? 'text-green-800'
                        : ev?.status === 'SUSPICIOUS'
                        ? 'text-red-700 font-black'
                        : 'text-stone-700'
                    }
                  >
                    {ev?.status || 'UNKNOWN'}
                  </span>
                </td>
                <td className="p-2 border border-stone-300 text-center font-mono font-bold">
                  {ev?.riskScore ?? 0}
                </td>
                <td className="p-2 border border-stone-300 text-center font-mono">
                  {ev?.hashChainValid ? '✓ VALID' : '✕ BROKEN'}
                </td>
                <td className="p-2 border border-stone-300 text-center font-mono">
                  {bEvents.length}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="mt-6 pt-3 border-t border-stone-300 text-[9px] text-stone-600 flex justify-between items-center">
        <div>
          Official Government of Karnataka Sandalwood Authenticity Ledger Document. Evaluated by SandalSure AI Journey Consistency Engine.
        </div>
        <div>Page 1 of 1 • Tamper-Evident SHA-256 Provenance</div>
      </div>
    </div>
  );
};
