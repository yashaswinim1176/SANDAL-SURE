/**
 * SandalSure AI - Core Domain Types
 * Ideathon 2026: Digital Sandalwood Traceability & Authenticity
 */

export type SupplyChainStage =
  | 'LEGAL_PROCUREMENT'
  | 'TRANSPORT'
  | 'PROCESSING'
  | 'MANUFACTURING'
  | 'PACKAGING'
  | 'DISTRIBUTION'
  | 'RETAIL_RECEIPT'
  | 'INSPECTION';

// Official 7-Stage End-to-End Supply Chain Journey (Upstream Tree Felling to Retail)
export type SevenStageKey =
  | '01_TREE_FELLING'
  | '02_FOREST_DEPOT'
  | '03_TRANSIT'
  | '04_FACTORY_INTAKE'
  | '05_PROCESSING'
  | '06_MANUFACTURING'
  | '07_DISTRIBUTION_RETAIL';

export interface SevenStageInfo {
  step: '01' | '02' | '03' | '04' | '05' | '06' | '07';
  key: SevenStageKey;
  name: string;
  stageName: string;
  dataToStore: string;
  govtProof: string;
  certificateAuthority: string;
  description: string;
}

export const OFFICIAL_SEVEN_STAGES: SevenStageInfo[] = [
  {
    step: '01',
    key: '01_TREE_FELLING',
    name: '1. Tree felling / harvest',
    stageName: 'Tree Felling / Harvest',
    dataToStore: 'Tree/lot ID, forest range, GPS coordinates, date, quantity (kg)',
    govtProof: 'Forest Dept felling permit no.',
    certificateAuthority: 'Karnataka Forest Department (KFD) - Division Silviculturist',
    description: 'Tree/lot ID, forest range, GPS coordinates, felling date, harvested heartwood weight (kg), and Forest Dept felling permit.',
  },
  {
    step: '02',
    key: '02_FOREST_DEPOT',
    name: '2. Forest depot / auction',
    stageName: 'Forest Depot / Auction',
    dataToStore: 'Auction lot no., buyer, weight',
    govtProof: 'Auction/sale certificate',
    certificateAuthority: 'Office of the Divisional Forest Officer (DFO) & Depot Custodian',
    description: 'Government timber depot inward lot no., authorized commercial buyer, verified weight, and statutory sale certificate.',
  },
  {
    step: '03',
    key: '03_TRANSIT',
    name: '3. Transit',
    stageName: 'Transit',
    dataToStore: 'Vehicle no., route, GPS log, dispatch and arrival time',
    govtProof: 'Transit permit no.',
    certificateAuthority: 'Divisional Forest Officer (DFO) Transit Authority - Form-IV',
    description: 'Escorted transport vehicle number, transit route, geo-fenced GPS log, dispatch/arrival timestamps, and statutory Form-IV transit permit.',
  },
  {
    step: '04',
    key: '04_FACTORY_INTAKE',
    name: '4. Distillery / factory intake',
    stageName: 'Distillery / Factory Intake',
    dataToStore: 'Received weight, heartwood grade',
    govtProof: 'Receipt/weighbridge slip',
    certificateAuthority: 'KSDL Factory Raw Material Custody & Weighbridge Station',
    description: 'Factory gate inward receipt, certified weighbridge weight slips, heartwood grade classification, and mass reconciler.',
  },
  {
    step: '05',
    key: '05_PROCESSING',
    name: '5. Processing (distillation, saponification)',
    stageName: 'Processing (Distillation & Saponification)',
    dataToStore: 'Input kg → output yield',
    govtProof: 'QC lab report',
    certificateAuthority: 'KSDL Chemical Testing Laboratory & State Analytical Bureau',
    description: 'Steam hydro-distillation logs, input wood kg → output oil yield ratio, saponification batch sheets, and GC-MS purity lab report.',
  },
  {
    step: '06',
    key: '06_MANUFACTURING',
    name: '6. Manufacturing / packaging',
    stageName: 'Manufacturing / Packaging',
    dataToStore: 'Batch ID, mfg date, location',
    govtProof: 'Quality certificate (GI Tag / BIS / Lab cert)',
    certificateAuthority: 'Bureau of Indian Standards (BIS 3298) & GI Registry (GI-KA-07)',
    description: 'Manufacturing date, Mysore factory location, tamper hologram serial, packaging verification, and BIS/GI compliance certificate.',
  },
  {
    step: '07',
    key: '07_DISTRIBUTION_RETAIL',
    name: '7. Distribution → Retail shop',
    stageName: 'Distribution → Retail Shop',
    dataToStore: 'Distributor, shop name, dates',
    govtProof: 'Invoice/GST ref',
    certificateAuthority: 'Commercial Taxes Dept & Licensed State Retail Network',
    description: 'Authorized distributor logistics, retail emporium outlet name, inward arrival date, and statutory GST e-way invoice ref.',
  },
];

export interface GovtCertificate {
  certificateId: string;
  stageKey: SevenStageKey | SixStageKey;
  stageName: string;
  issuingAuthority: string;
  issueDate: string;
  validityDate: string;
  documentType: string;
  verificationBadge: '✓ Govt Verified' | '✗ Unverified' | '✗ Revoked / Missing';
  status: 'VERIFIED' | 'MISSING' | 'TAMPERED';
  hash: string;
  apiVerified: boolean;
  notes?: string;
}

export type SixStageKey =
  | '01_FOREST_SOURCE'
  | '02_PERMIT_CERTIFICATE'
  | '03_TIMBER_TRANSPORT'
  | '04_FACTORY_MANUFACTURING'
  | '05_DISTRIBUTOR_RETAIL'
  | '06_CUSTOMER_QR_SCAN';

export interface OfficialStageInfo {
  step: '01' | '02' | '03' | '04' | '05' | '06';
  key: SixStageKey;
  name: string;
  title: string;
  purpose: string;
  description: string;
}

export const OFFICIAL_SIX_STAGES: OfficialStageInfo[] = [
  {
    step: '01',
    key: '01_FOREST_SOURCE',
    name: '01 — Forest / Authorized Source',
    title: 'Forest / Authorized Source',
    purpose: 'Origin and harvesting records',
    description:
      'Record the declared source of the sandalwood, forest or authorized supplier details, source/lot ID, origin location, harvesting records and relevant ownership or procurement evidence.',
  },
  {
    step: '02',
    key: '02_PERMIT_CERTIFICATE',
    name: '02 — Permit & Certificate',
    title: 'Permit & Certificate',
    purpose: 'Government document verification',
    description:
      'Record applicable government permissions, harvesting approvals, transit-related permissions where applicable, certificates and supporting documents.',
  },
  {
    step: '03',
    key: '03_TIMBER_TRANSPORT',
    name: '03 — Timber Transport',
    title: 'Timber Transport',
    purpose: 'Transit and batch tracking',
    description:
      'Record the transport reference, dispatch and receipt locations, dispatch and receipt dates, sender, receiver, transported quantity, source lot ID and applicable transit permit reference.',
  },
  {
    step: '04',
    key: '04_FACTORY_MANUFACTURING',
    name: '04 — Factory / Manufacturing',
    title: 'Factory / Manufacturing',
    purpose: 'Your existing prototype',
    description:
      'Manufacturer and factory details, raw-material source and lot IDs, material receipt and processing records, manufacturing batch ID, manufacturing date, input and output quantities, quality-control evidence, and packaging record with generated product QR code.',
  },
  {
    step: '05',
    key: '05_DISTRIBUTOR_RETAIL',
    name: '05 — Distributor / Retail Shop',
    title: 'Distributor / Retail Shop',
    purpose: 'Delivery and receipt records',
    description:
      'Record the distributor, shipment reference, destination, dispatch date, delivery date, quantity dispatched, quantity received, retailer details and receipt confirmation.',
  },
  {
    step: '06',
    key: '06_CUSTOMER_QR_SCAN',
    name: '06 — Customer QR Scan',
    title: 'Customer QR Scan',
    purpose: 'View the product\'s traceability history',
    description:
      'Generate a unique QR code for each registered product batch. When a customer scans the QR code using a smartphone camera, open the public product verification page with the complete available journey.',
  },
];

export type VerificationStatus = 'VERIFIED' | 'SUSPICIOUS' | 'UNVERIFIED';

export type RiskLevel = 'LOW' | 'ELEVATED' | 'CRITICAL' | 'INSUFFICIENT_DATA';

export type CheckSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'INFO';

export type CheckStatus = 'PASS' | 'FAIL' | 'WARNING';

export type UserRole = 'CONSUMER' | 'MANUFACTURER' | 'INSPECTOR';

export interface CheckDetail {
  code: string;
  name: string;
  severity: CheckSeverity;
  status: CheckStatus;
  description: string;
  evidence: string;
  remediation: string;
}

export interface VerificationResult {
  batchId: string;
  status: VerificationStatus;
  riskScore: number; // 0 (Prism authentic) to 100 (Critical anomaly)
  riskLevel: RiskLevel;
  reasonCodes: string[];
  humanExplanation: string;
  aiExplanation?: string;
  passedChecks: CheckDetail[];
  failedChecks: CheckDetail[];
  warningChecks: CheckDetail[];
  evidenceLimitations: string[];
  recommendedNextAction: string;
  hashChainValid: boolean;
  evaluatedAt: string;
}

export interface SupplyChainEvent {
  id: string;
  batchId: string;
  eventType: SupplyChainStage;
  previousStage: string;
  newStage: string;
  eventTimestamp: string;
  recordingTimestamp: string;
  responsibleOrg: string;
  role: string;
  location: string;
  inputQuantity?: number;
  outputQuantity?: number;
  quantityUnit?: string;
  evidenceRef: string;
  evidenceType:
    | 'GOVERNMENT_TRANSIT_PASS'
    | 'AUCTION_CERTIFICATE'
    | 'DISTILLATION_LOG'
    | 'BATCH_TEST_REPORT'
    | 'DEPOT_RECEIPT'
    | 'RETAIL_INVOICE'
    | 'OTHER';
  previousEventHash: string;
  currentEventHash: string;
  tamperedHash?: string;
  tamperedPayload?: boolean;
  validationResult: 'PASS' | 'WARNING' | 'FAIL';
  notes?: string;

  // Official Upstream & Seven-Stage Attributes
  sevenStageKey?: SevenStageKey;
  treeId?: string;
  forestRange?: string;
  gpsCoordinates?: string;
  fellingDate?: string;
  fellingPermitNo?: string;
  auctionLotNo?: string;
  auctionBuyer?: string;
  vehicleNo?: string;
  transitRoute?: string;
  transitPermitNo?: string;
  receivedWeightKg?: number;
  heartwoodGrade?: string;
  weighbridgeSlipNo?: string;
  inputKg?: number;
  outputYieldKgOrLitres?: number;
  distillationHours?: number;
  qcLabReportNo?: string;
  purityPercent?: number;
  qualityCertNo?: string;
  giTagRef?: string;
  bisCertNo?: string;
  invoiceGstRef?: string;
  certificateId?: string;
  certificateIssuer?: string;
  certificateValidityDate?: string;
  isGovtVerified?: boolean;

  // Official Six-Stage Workflow Attributes
  sixStageKey?: SixStageKey;
  // Stage 01: Forest / Authorized Source
  sourceLotId?: string;
  originLocation?: string;
  harvestDate?: string;
  harvestMethod?: string;
  isOriginIndependentlyVerified?: boolean;
  // Stage 02: Permit & Certificate
  permitNumber?: string;
  issuingAuthority?: string;
  permitIssueDate?: string;
  permitExpiryDate?: string;
  certificateImageUrl?: string;
  documentVerificationStatus?: 'UNVERIFIED_UPLOAD' | 'CHECKED_OFFLINE' | 'VERIFIED_OFFICIAL';
  // Stage 03: Timber Transport
  transportRef?: string;
  dispatchLocation?: string;
  receiptLocation?: string;
  dispatchDate?: string;
  receiptDate?: string;
  sender?: string;
  receiver?: string;
  transitPermitRef?: string;
  // Stage 04: Factory / Manufacturing
  factoryDetails?: string;
  qcResult?: string;
  packagingSealRef?: string;
  // Stage 05: Distributor / Retail Shop
  distributorName?: string;
  shipmentRef?: string;
  retailerName?: string;
  retailerLocation?: string;
  deliveryDate?: string;
  receiptConfirmed?: boolean;
}

export interface ProductBatch {
  id: string;
  batchId: string;
  productName: string;
  category:
    | 'Soap'
    | 'Essential Oil'
    | 'Carving/Artifact'
    | 'Incense'
    | 'Cosmetics'
    | 'Raw Heartwood';
  description: string;
  imageUrl: string;
  manufacturer: string;
  manufacturingDate: string;
  batchCreationTimestamp: string;
  declaredOrigin: string;
  procurementRef: string;
  registeredQuantity: number;
  unit: 'kg' | 'litres' | 'pieces' | 'units' | 'boxes';
  currentStage: SupplyChainStage;
  verificationStatus: VerificationStatus;
  riskScore: number;
  reasonCodes: string[];
  isPublic: boolean;
  scanCount: number;
  lastScannedAt?: string;
  expectedStages: SupplyChainStage[];
  notes?: string;

  // Upstream Provenance & Government Certificate Layer
  treeLotId?: string;
  forestRange?: string;
  gpsCoordinates?: string;
  fellingDate?: string;
  fellingPermitNo?: string;
  auctionLotNo?: string;
  transitPermitNo?: string;
  vehicleNo?: string;
  intakeWeightKg?: number;
  heartwoodGrade?: string;
  distillationYieldRatio?: string;
  massBalanceStatus?: 'PASS' | 'FAIL';
  qcCertNo?: string;
  giTagRef?: string;
  bisCertNo?: string;
  invoiceGstRef?: string;
  governmentCertificates?: GovtCertificate[];
  certCountVerified?: number;
  certCountTotal?: number;

  // Six-Stage Provenance Links
  sourceLotId?: string;
  originLocation?: string;
  harvestDate?: string;
  permitRef?: string;
  issuingAuthority?: string;
  permitIssueDate?: string;
  permitExpiryDate?: string;
  certificateImageUrl?: string;
  documentVerificationStatus?: 'UNVERIFIED_UPLOAD' | 'CHECKED_OFFLINE' | 'VERIFIED_OFFICIAL';
  transportRef?: string;
  distributorName?: string;
  retailerName?: string;
}

export interface TestCase {
  id: string;
  name: string;
  category: string;
  description: string;
  targetBatchId: string;
  expectedStatus: VerificationStatus;
  expectedAnomaly: string;
  actualStatus?: VerificationStatus;
  actualRiskScore?: number;
  pass?: boolean;
  latencyMs?: number;
  evaluatedAt?: string;
  details?: string;
}

export interface AnomalyReport {
  id: string;
  batchId: string;
  reportedAt: string;
  reporterType: 'CONSUMER' | 'INSPECTOR' | 'SYSTEM';
  issueType:
    | 'TAMPERED_SEAL'
    | 'DUPLICATE_CODE'
    | 'UNUSUAL_SMELL_OR_TEXTURE'
    | 'RETAIL_SUSPICION'
    | 'LOCATION_MISMATCH'
    | 'OTHER';
  description: string;
  retailLocation?: string;
  contactEmail?: string;
  status: 'PENDING_REVIEW' | 'INVESTIGATING' | 'RESOLVED';
}
