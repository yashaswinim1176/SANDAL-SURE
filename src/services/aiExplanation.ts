/**
 * SandalSure AI - Explainable AI Summary Service
 * Provides consumer-friendly explanations of deterministic verification findings.
 * Does not override deterministic engine results. Graceful offline fallback.
 */

import { VerificationResult, ProductBatch } from '../types';

export async function generateExplainableSummary(
  batch: ProductBatch | null | undefined,
  verification: VerificationResult
): Promise<string> {
  // If no batch
  if (!batch) {
    return 'Digital Ledger Lookup Notice: The scanned sandalwood identifier is completely absent from the registered state provenance database. We advise pausing this transaction immediately.';
  }

  // Fallback high-quality structured natural-language synthesizer
  if (verification.status === 'VERIFIED') {
    return `Digital Sandalwood Passport Verified: Batch ${batch.batchId} (${batch.productName}) has successfully validated all 7 custody stages. Cryptographic hash linkage is unbroken from the initial legal Karnataka Forest Department procurement (${batch.procurementRef}) to retail distribution. Material mass and dates reconcile with authorized KSDL standards.`;
  }

  if (verification.status === 'SUSPICIOUS') {
    const reasons = verification.failedChecks.map((f) => f.name).join(', ');
    return `High-Risk Anomaly Detected: Batch ${batch.batchId} failed consistency checks due to ${reasons}. The recorded supply chain diverges from standard legitimate custody practices. Please check with the retailer or Karnataka Forest Department before using or reselling this product.`;
  }

  return `Incomplete Journey Notice: Batch ${batch.batchId} is registered in the database, but currently lacks the minimum required intermediate custody events (such as processing or factory packaging) to confirm public authenticity.`;
}
