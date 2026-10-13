/**
 * SandalSure AI - Automated Test Harness & Measurement Engine
 * Ideathon 2026: Deterministic validation engine benchmarks
 */

import { TestCase, VerificationStatus } from '../types';
import { verifyBatchJourney } from './consistencyEngine';
import { dataStore } from '../services/dataStore';

export interface TestExecutionSummary {
  total: number;
  passed: number;
  failed: number;
  passRate: number;
  averageLatencyMs: number;
  minLatencyMs: number;
  maxLatencyMs: number;
  confusionMatrix: {
    truePositives: number; // Correctly flagged anomalies (SUSPICIOUS or UNVERIFIED)
    trueNegatives: number; // Correctly accepted authentic batches (VERIFIED)
    falsePositives: number; // Authentic falsely flagged as suspicious
    falseNegatives: number; // Suspicious falsely marked verified
    accuracy: number;
    sensitivity: number; // Recall
    specificity: number;
  };
  disclaimer: string;
  results: TestCase[];
}

export function runValidationTestSuite(): TestExecutionSummary {
  const batches = dataStore.getBatches();
  const testDefinitions: Omit<TestCase, 'actualStatus' | 'actualRiskScore' | 'pass' | 'latencyMs' | 'evaluatedAt' | 'details'>[] = [
    {
      id: 'TC-01',
      name: 'Authentic Golden Batch Verification',
      category: 'Positive Control',
      description: 'Fully consistent 7-stage supply chain from legal forest auction to retail receipt.',
      targetBatchId: 'MS2026-V801',
      expectedStatus: 'VERIFIED',
      expectedAnomaly: 'None (Unbroken hash chain & mass balance consistent)',
    },
    {
      id: 'TC-02',
      name: 'Missing Essential Transformation Detection',
      category: 'Negative Control - Stage Continuity',
      description: 'Batch reaches retail receipt skipping essential distillation/processing.',
      targetBatchId: 'MS2026-M402',
      expectedStatus: 'SUSPICIOUS',
      expectedAnomaly: 'ERR_MISSING_ESSENTIAL_STAGE',
    },
    {
      id: 'TC-03',
      name: 'Anachronistic Inverted Date Detection',
      category: 'Negative Control - Chronology',
      description: 'Processing event timestamp is dated earlier than preceding legal procurement.',
      targetBatchId: 'MS2026-D305',
      expectedStatus: 'SUSPICIOUS',
      expectedAnomaly: 'ERR_CHRONOLOGICAL_INVERSION',
    },
    {
      id: 'TC-04',
      name: 'Cryptographic Hash Tamper Detection',
      category: 'Negative Control - Data Integrity',
      description: 'Event ledger payload or hash was altered after commitment.',
      targetBatchId: 'MS2026-T904',
      expectedStatus: 'SUSPICIOUS',
      expectedAnomaly: 'ERR_HASH_CHAIN_TAMPERED',
    },
    {
      id: 'TC-05',
      name: 'Thermodynamic Mass Expansion Anomaly',
      category: 'Negative Control - Mass Balance',
      description: 'Input raw wood 12kg claimed to yield 85kg pure sandalwood artifact.',
      targetBatchId: 'MS2026-Q107',
      expectedStatus: 'SUSPICIOUS',
      expectedAnomaly: 'ERR_QUANTITY_MASS_EXPANSION',
    },
    {
      id: 'TC-06',
      name: 'Early Stage Insufficient Journey Handling',
      category: 'Boundary Condition - Early Custody',
      description: 'Batch with only single harvest event should remain unverified until subsequent steps.',
      targetBatchId: 'MS2026-U006',
      expectedStatus: 'UNVERIFIED',
      expectedAnomaly: 'WARN_INSUFFICIENT_JOURNEY_STAGES',
    },
    {
      id: 'TC-07',
      name: 'Unregistered Identifier Lookup',
      category: 'Negative Control - Unknown Query',
      description: 'Consumer searches for nonexistent batch ID (e.g. FAKE-KSDL-9999).',
      targetBatchId: 'NONEXISTENT-CODE-999',
      expectedStatus: 'UNVERIFIED',
      expectedAnomaly: 'ERR_BATCH_NOT_FOUND',
    },
    {
      id: 'TC-08',
      name: 'Genesis Root Anchor Integrity',
      category: 'Cryptographic Anchor',
      description: 'First event correctly links to zeroed genesis root.',
      targetBatchId: 'MS2026-V801',
      expectedStatus: 'VERIFIED',
      expectedAnomaly: 'None (Root Genesis verified)',
    },
  ];

  const results: TestCase[] = [];
  const latencies: number[] = [];

  let tp = 0; // Correctly flagged anomalies
  let tn = 0; // Correctly verified clean batches
  let fp = 0; // Clean marked as anomaly
  let fn = 0; // Anomaly marked as clean

  for (const def of testDefinitions) {
    const start = performance.now();
    const batch = dataStore.getBatchById(def.targetBatchId);
    const events = batch ? dataStore.getEventsForBatch(batch.batchId) : [];
    const evaluation = verifyBatchJourney(batch, events, batches);
    const end = performance.now();
    const latency = Number((end - start).toFixed(3));
    latencies.push(latency);

    const actualStatus: VerificationStatus = evaluation.status;
    const isPass = actualStatus === def.expectedStatus;

    // Calculate synthetic confusion metrics
    const isActuallyAnomalous = def.expectedStatus !== 'VERIFIED';
    const isPredictedAnomalous = actualStatus !== 'VERIFIED';

    if (isActuallyAnomalous && isPredictedAnomalous) tp++;
    else if (!isActuallyAnomalous && !isPredictedAnomalous) tn++;
    else if (!isActuallyAnomalous && isPredictedAnomalous) fp++;
    else if (isActuallyAnomalous && !isPredictedAnomalous) fn++;

    results.push({
      ...def,
      actualStatus,
      actualRiskScore: evaluation.riskScore,
      pass: isPass,
      latencyMs: latency,
      evaluatedAt: evaluation.evaluatedAt,
      details: evaluation.failedChecks[0]?.description || evaluation.humanExplanation,
    });
  }

  const passedCount = results.filter((r) => r.pass).length;
  const totalCount = results.length;
  const passRate = totalCount > 0 ? (passedCount / totalCount) * 100 : 0;
  const avgLatency =
    latencies.length > 0
      ? Number((latencies.reduce((a, b) => a + b, 0) / latencies.length).toFixed(3))
      : 0;

  const totalEvaluations = tp + tn + fp + fn;
  const accuracy = totalEvaluations > 0 ? Number(((tp + tn) / totalEvaluations) * 100) : 100;
  const sensitivity = tp + fn > 0 ? Number((tp / (tp + fn)) * 100) : 100;
  const specificity = tn + fp > 0 ? Number((tn / (tn + fp)) * 100) : 100;

  return {
    total: totalCount,
    passed: passedCount,
    failed: totalCount - passedCount,
    passRate: Number(passRate.toFixed(1)),
    averageLatencyMs: avgLatency,
    minLatencyMs: Math.min(...latencies),
    maxLatencyMs: Math.max(...latencies),
    confusionMatrix: {
      truePositives: tp,
      trueNegatives: tn,
      falsePositives: fp,
      falseNegatives: fn,
      accuracy,
      sensitivity,
      specificity,
    },
    disclaimer:
      'Synthetic benchmark results evaluate deterministic logic on controlled test data. Real-world counterfeit detection requires verified state forestry infrastructure and laboratory GC-MS testing.',
    results,
  };
}
