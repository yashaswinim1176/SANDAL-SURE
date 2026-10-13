/**
 * SandalSure AI - Data Store & Seed Scenarios
 * Ideathon 2026 | Digital Sandalwood Traceability & Authenticity
 * Official Six-Stage Supply-Chain Workflow Data Store
 */

import { ProductBatch, SupplyChainEvent, AnomalyReport, SixStageKey, GovtCertificate } from '../types';
import { generateEventHash, GENESIS_HASH } from '../utils/crypto';
import { OFFICIAL_SAMPLE_CERTIFICATE_DATA_URL } from '../utils/sampleCertificate';

const STORAGE_KEY_BATCHES = 'sandalsure_batches_v4';
const STORAGE_KEY_EVENTS = 'sandalsure_events_v4';
const STORAGE_KEY_REPORTS = 'sandalsure_reports_v4';

/**
 * Builds the initial pristine seed dataset with realistic sandalwood scenarios
 * adhering strictly to the official 6-stage workflow.
 */
function createInitialSeedData(): {
  batches: ProductBatch[];
  events: SupplyChainEvent[];
  reports: AnomalyReport[];
} {
  const events: SupplyChainEvent[] = [];

  // =========================================================================
  // BATCH 1: Golden Standard Complete Seven-Stage Verified Journey
  // MS2026-V801 | Mysore Sandal Gold Soap (125g) — DEMO SAMPLE
  // Extended upstream provenance from Tree Felling to Retail Emporium
  // 1 Tree Felling ➔ 2 Depot/Auction ➔ 3 Transit ➔ 4 Factory Intake ➔ 5 Processing ➔ 6 Manufacturing ➔ 7 Retail
  // =========================================================================
  const b1Certificates: GovtCertificate[] = [
    {
      certificateId: 'FD/KA-SHM/FEL-2026-8819',
      stageKey: '01_TREE_FELLING',
      stageName: 'Tree felling / harvest',
      issuingAuthority: 'Office of the Divisional Silviculturist, Karnataka Forest Department',
      issueDate: '2026-03-01',
      validityDate: 'Valid throughout harvest & transport',
      documentType: 'Forest Dept Felling Permit',
      verificationBadge: '✓ Govt Verified',
      status: 'VERIFIED',
      hash: 'sha256-4c7b91e921d...fd-permit',
      apiVerified: true,
      notes: 'Form-VI statutory felling permission issued under Karnataka Preservation of Trees Act.',
    },
    {
      certificateId: 'AUC-KFD-SHM-2026-0941',
      stageKey: '02_FOREST_DEPOT',
      stageName: 'Forest depot / auction',
      issuingAuthority: 'Office of the Divisional Forest Officer (DFO), Shimoga Sandal Depot #04',
      issueDate: '2026-03-04',
      validityDate: 'Certified on 04-MAR-2026',
      documentType: 'Government Auction Sale Certificate',
      verificationBadge: '✓ Govt Verified',
      status: 'VERIFIED',
      hash: 'sha256-8a39e102f4b...kfd-auction',
      apiVerified: true,
      notes: 'State auction sale certificate to KSDL. Hammer mark verified on wood billet ends.',
    },
    {
      certificateId: 'KFD/FORM-IV/2026-09418',
      stageKey: '03_TRANSIT',
      stageName: 'Transit',
      issuingAuthority: 'DFO Transit Permit Authority & Karnataka State Escort Bureau',
      issueDate: '2026-03-06',
      validityDate: '04-MAR-2026 to 30-APR-2026',
      documentType: 'Form-IV Government Transit Pass',
      verificationBadge: '✓ Govt Verified',
      status: 'VERIFIED',
      hash: 'sha256-55fa8901cb...kfd-form-iv',
      apiVerified: true,
      notes: 'Statutory transit permit with GPS-tracked vehicle route and checkpost biometric scan.',
    },
    {
      certificateId: 'QC-KSDL-MYS-2026-118',
      stageKey: '05_PROCESSING',
      stageName: 'Processing (distillation, saponification)',
      issuingAuthority: 'KSDL Central Analytical Laboratory & State Chemical Testing Board',
      issueDate: '2026-03-10',
      validityDate: 'Certified on 10-MAR-2026',
      documentType: 'GC-MS Purity Lab Certificate',
      verificationBadge: '✓ Govt Verified',
      status: 'VERIFIED',
      hash: 'sha256-bb921c40ea...ksdl-qc-lab',
      apiVerified: true,
      notes: 'Gas chromatography assay confirmed 91.4% alpha-santalol purity. Mass balance reconciled.',
    },
  ];

  const b1: ProductBatch = {
    id: 'batch-001-v801',
    batchId: 'MS2026-V801',
    productName: 'Mysore Sandal Gold Soap (125g)',
    category: 'Soap',
    description:
      'Super premium soap enriched with pure natural sandalwood oil and almond conditioner. Produced by Karnataka Soaps & Detergents Ltd (KSDL) from legally harvested Karnataka state forest wood.',
    imageUrl:
      'https://images.unsplash.com/photo-1607006314694-81498b58495a?w=800&auto=format&fit=crop&q=80',
    manufacturer: 'Karnataka Soaps & Detergents Ltd (KSDL) - Mysore Unit',
    manufacturingDate: '2026-03-12',
    batchCreationTimestamp: '2026-03-01T08:30:00Z',
    declaredOrigin: 'Shimoga Forest Division Government Sandal Depot, Karnataka',
    procurementRef: 'KFD/SHM/AUC/2026-0941',
    registeredQuantity: 1200,
    unit: 'boxes',
    currentStage: 'RETAIL_RECEIPT',
    verificationStatus: 'VERIFIED',
    riskScore: 0,
    reasonCodes: [],
    isPublic: true,
    scanCount: 14,
    lastScannedAt: '2026-04-02T11:20:00Z',
    expectedStages: [
      'LEGAL_PROCUREMENT',
      'TRANSPORT',
      'PROCESSING',
      'MANUFACTURING',
      'PACKAGING',
      'DISTRIBUTION',
      'RETAIL_RECEIPT',
    ],
    notes: 'Golden test sample with complete upstream origin: tree felling permit, depot auction, weighbridge intake, distillation yield, and retail invoice.',
    
    // Upstream Provenance & Government Certificate Layer
    treeLotId: 'SW-KA-0457',
    forestRange: 'Shimoga Forest Range (Div #04)',
    gpsCoordinates: '13.9299° N, 75.5681° E',
    fellingDate: '2026-03-01',
    fellingPermitNo: 'FD/KA-SHM/FEL-2026-8819',
    auctionLotNo: 'AUC-KFD-SHM-2026-0941',
    transitPermitNo: 'KFD/FORM-IV/2026-09418',
    vehicleNo: 'KA-09-EA-4102',
    intakeWeightKg: 250,
    heartwoodGrade: 'Grade A Superfine Mature Heartwood',
    distillationYieldRatio: '250 kg wood → 11.25 kg pure oil (4.5% yield)',
    massBalanceStatus: 'PASS',
    qcCertNo: 'QC-KSDL-MYS-2026-118',
    giTagRef: 'GI-KA-07 (Mysore Sandalwood)',
    bisCertNo: 'BIS 3298',
    invoiceGstRef: 'GSTIN-29AAACK1204M1Z5/INV-8891',
    governmentCertificates: b1Certificates,
    certCountVerified: 4,
    certCountTotal: 4,

    // Six-Stage Links
    sourceLotId: 'KFD-SHM-LOT-2026-8819',
    originLocation: 'Shimoga Government Sandal Depot, Division #04 (13.9299° N, 75.5681° E)',
    harvestDate: '2026-03-01',
    permitRef: 'KFD/FORM-IV/2026-09418',
    issuingAuthority: 'Office of the Divisional Forest Officer (DFO), Shimoga Division',
    permitIssueDate: '2026-03-04',
    permitExpiryDate: '2026-04-30',
    certificateImageUrl: OFFICIAL_SAMPLE_CERTIFICATE_DATA_URL,
    documentVerificationStatus: 'CHECKED_OFFLINE',
    transportRef: 'TP-KA-2026-77821',
    distributorName: 'Mysore Sales International Ltd (MSIL) - Central Logistics Division',
    retailerName: 'Cauvery Government Sandalwood & Handicrafts Emporium',
  };

  // Stage 01: Tree Felling / Harvest (Upstream Stage 1)
  const b1e1Data = {
    batchId: b1.batchId,
    eventType: 'LEGAL_PROCUREMENT' as const,
    eventTimestamp: '2026-03-01T08:00:00Z',
    responsibleOrg: 'Karnataka Forest Department (KFD) - Shimoga Silviculture Division',
    location: 'Shimoga Forest Range (GPS: 13.9299° N, 75.5681° E)',
    evidenceRef: 'Felling Permit #FD/KA-SHM/FEL-2026-8819',
    inputQuantity: 250,
    outputQuantity: 250,
  };
  const b1e1Hash = generateEventHash(b1e1Data, GENESIS_HASH);
  events.push({
    id: 'evt-001-1',
    batchId: b1.batchId,
    eventType: 'LEGAL_PROCUREMENT',
    previousStage: 'NATURAL_GROWTH',
    newStage: 'LEGAL_PROCUREMENT',
    eventTimestamp: b1e1Data.eventTimestamp,
    recordingTimestamp: '2026-03-01T08:30:00Z',
    responsibleOrg: b1e1Data.responsibleOrg,
    role: 'Division Silviculturist & Forest Range Officer',
    location: b1e1Data.location,
    inputQuantity: 250,
    outputQuantity: 250,
    quantityUnit: 'kg',
    evidenceRef: b1e1Data.evidenceRef,
    evidenceType: 'GOVERNMENT_TRANSIT_PASS',
    previousEventHash: GENESIS_HASH,
    currentEventHash: b1e1Hash,
    validationResult: 'PASS',
    notes: 'Tree Lot SW-KA-0457 harvested under statutory felling permit. Heartwood billets hammer-stamped by Forest Range Officer.',
    sixStageKey: '01_FOREST_SOURCE',
    sevenStageKey: '01_TREE_FELLING',
    sourceLotId: 'SW-KA-0457',
    treeId: 'SW-KA-0457',
    forestRange: 'Shimoga Forest Range (Div #04)',
    gpsCoordinates: '13.9299° N, 75.5681° E',
    fellingDate: '2026-03-01',
    fellingPermitNo: 'FD/KA-SHM/FEL-2026-8819',
    certificateId: 'FD/KA-SHM/FEL-2026-8819',
    certificateIssuer: 'Karnataka Forest Department (KFD)',
    isGovtVerified: true,
  });

  // Stage 02: Forest Depot / Auction (Upstream Stage 2)
  const b1e2Data = {
    batchId: b1.batchId,
    eventType: 'LEGAL_PROCUREMENT' as const,
    eventTimestamp: '2026-03-04T10:00:00Z',
    responsibleOrg: 'Shimoga Government Sandal Depot Custodian & DFO',
    location: 'Shimoga Government Sandal Depot #04, Karnataka',
    evidenceRef: 'Govt Auction Sale Certificate #AUC-KFD-SHM-2026-0941',
    inputQuantity: 250,
    outputQuantity: 250,
  };
  const b1e2Hash = generateEventHash(b1e2Data, b1e1Hash);
  events.push({
    id: 'evt-001-2',
    batchId: b1.batchId,
    eventType: 'LEGAL_PROCUREMENT',
    previousStage: '01_TREE_FELLING',
    newStage: '02_FOREST_DEPOT',
    eventTimestamp: b1e2Data.eventTimestamp,
    recordingTimestamp: '2026-03-04T10:30:00Z',
    responsibleOrg: b1e2Data.responsibleOrg,
    role: 'Divisional Forest Officer (DFO) & Depot Superintendent',
    location: b1e2Data.location,
    inputQuantity: 250,
    outputQuantity: 250,
    quantityUnit: 'kg',
    evidenceRef: b1e2Data.evidenceRef,
    evidenceType: 'AUCTION_CERTIFICATE',
    previousEventHash: b1e1Hash,
    currentEventHash: b1e2Hash,
    validationResult: 'PASS',
    notes: 'Auction lot AUC-KFD-SHM-2026-0941 allotted to Karnataka Soaps & Detergents Ltd (KSDL). Weight verified at 250 kg.',
    sixStageKey: '02_PERMIT_CERTIFICATE',
    sevenStageKey: '02_FOREST_DEPOT',
    auctionLotNo: 'AUC-KFD-SHM-2026-0941',
    auctionBuyer: 'Karnataka Soaps & Detergents Ltd (KSDL)',
    certificateId: 'AUC-KFD-SHM-2026-0941',
    certificateIssuer: 'Office of the Divisional Forest Officer (DFO), Shimoga',
    isGovtVerified: true,
  });

  // Stage 03: Transit (Upstream Stage 3)
  const b1e3Data = {
    batchId: b1.batchId,
    eventType: 'TRANSPORT' as const,
    eventTimestamp: '2026-03-06T08:00:00Z',
    responsibleOrg: 'DFO Transit Permit Authority & KSDL Logistics Fleet',
    location: 'Shimoga Sandal Depot ➔ Tarikere Checkpost ➔ NH-206 ➔ KSDL Factory Mysuru (Vehicle KA-09-EA-4102)',
    evidenceRef: 'Form-IV Transit Permit #KFD/FORM-IV/2026-09418',
    inputQuantity: 250,
    outputQuantity: 250,
  };
  const b1e3Hash = generateEventHash(b1e3Data, b1e2Hash);
  events.push({
    id: 'evt-001-3',
    batchId: b1.batchId,
    eventType: 'TRANSPORT',
    previousStage: '02_FOREST_DEPOT',
    newStage: '03_TRANSIT',
    eventTimestamp: b1e3Data.eventTimestamp,
    recordingTimestamp: '2026-03-06T08:30:00Z',
    responsibleOrg: b1e3Data.responsibleOrg,
    role: 'State Timber Transit Escort Officer',
    location: b1e3Data.location,
    inputQuantity: 250,
    outputQuantity: 250,
    quantityUnit: 'kg',
    evidenceRef: b1e3Data.evidenceRef,
    evidenceType: 'GOVERNMENT_TRANSIT_PASS',
    previousEventHash: b1e2Hash,
    currentEventHash: b1e3Hash,
    validationResult: 'PASS',
    notes: 'Transit cleared through Tarikere forest biometric checkpost. Vehicle KA-09-EA-4102 GPS route match confirmed.',
    sixStageKey: '03_TIMBER_TRANSPORT',
    sevenStageKey: '03_TRANSIT',
    vehicleNo: 'KA-09-EA-4102',
    transitRoute: 'Shimoga Sandal Depot ➔ Tarikere Checkpost ➔ NH-206 ➔ KSDL Factory Mysuru',
    transitPermitNo: 'KFD/FORM-IV/2026-09418',
    certificateId: 'KFD/FORM-IV/2026-09418',
    certificateIssuer: 'Divisional Forest Officer (DFO), Transit Division',
    certificateValidityDate: '04-MAR-2026 to 30-APR-2026',
    isGovtVerified: true,
  });

  // Stage 04: Factory Intake (Upstream Stage 4)
  const b1e4Data = {
    batchId: b1.batchId,
    eventType: 'MANUFACTURING' as const,
    eventTimestamp: '2026-03-08T09:30:00Z',
    responsibleOrg: 'KSDL Factory Raw Material Custody & Weighbridge Division',
    location: 'KSDL Central Sandalwood Complex, Mysuru, Karnataka',
    evidenceRef: 'Weighbridge Receipt Slip #WB-KSDL-MYS-2026-4412',
    inputQuantity: 250,
    outputQuantity: 250,
  };
  const b1e4Hash = generateEventHash(b1e4Data, b1e3Hash);
  events.push({
    id: 'evt-001-4',
    batchId: b1.batchId,
    eventType: 'MANUFACTURING',
    previousStage: '03_TRANSIT',
    newStage: '04_FACTORY_INTAKE',
    eventTimestamp: b1e4Data.eventTimestamp,
    recordingTimestamp: '2026-03-08T10:00:00Z',
    responsibleOrg: b1e4Data.responsibleOrg,
    role: 'Chief Weighbridge Inspector & Factory Gate Officer',
    location: b1e4Data.location,
    inputQuantity: 250,
    outputQuantity: 250,
    quantityUnit: 'kg',
    evidenceRef: b1e4Data.evidenceRef,
    evidenceType: 'DEPOT_RECEIPT',
    previousEventHash: b1e3Hash,
    currentEventHash: b1e4Hash,
    validationResult: 'PASS',
    notes: 'Received weight: 250 kg. Forest depot weight matches factory intake exactly (wood kg out of forest = wood kg received). Grade: Grade A Superfine Heartwood.',
    sixStageKey: '04_FACTORY_MANUFACTURING',
    sevenStageKey: '04_FACTORY_INTAKE',
    receivedWeightKg: 250,
    heartwoodGrade: 'Grade A Superfine Mature Heartwood',
    weighbridgeSlipNo: 'WB-KSDL-MYS-2026-4412',
    isGovtVerified: true,
  });

  // Stage 05: Processing (Distillation & Saponification) (Upstream Stage 5)
  const b1e5Data = {
    batchId: b1.batchId,
    eventType: 'PROCESSING' as const,
    eventTimestamp: '2026-03-10T14:00:00Z',
    responsibleOrg: 'KSDL Hydro-Distillation & Formulation Plant',
    location: 'KSDL Sandalwood Distillation Complex, Mysuru, Karnataka',
    evidenceRef: 'QC Lab Test Report #QC-KSDL-MYS-2026-118',
    inputQuantity: 250,
    outputQuantity: 11.25,
  };
  const b1e5Hash = generateEventHash(b1e5Data, b1e4Hash);
  events.push({
    id: 'evt-001-5',
    batchId: b1.batchId,
    eventType: 'PROCESSING',
    previousStage: '04_FACTORY_INTAKE',
    newStage: '05_PROCESSING',
    eventTimestamp: b1e5Data.eventTimestamp,
    recordingTimestamp: '2026-03-10T15:00:00Z',
    responsibleOrg: b1e5Data.responsibleOrg,
    role: 'Chief Chemical Technologist',
    location: b1e5Data.location,
    inputQuantity: 250,
    outputQuantity: 11.25,
    quantityUnit: 'kg',
    evidenceRef: b1e5Data.evidenceRef,
    evidenceType: 'DISTILLATION_LOG',
    previousEventHash: b1e4Hash,
    currentEventHash: b1e5Hash,
    validationResult: 'PASS',
    notes: 'Distillation: 250 kg wood → 11.25 kg pure oil (4.5% yield). Mass-balance check verified. GC-MS total santalol purity: 91.4% (exceeds BIS standard).',
    sixStageKey: '04_FACTORY_MANUFACTURING',
    sevenStageKey: '05_PROCESSING',
    inputKg: 250,
    outputYieldKgOrLitres: 11.25,
    distillationHours: 72,
    qcLabReportNo: 'QC-KSDL-MYS-2026-118',
    purityPercent: 91.4,
    certificateId: 'QC-KSDL-MYS-2026-118',
    certificateIssuer: 'KSDL Quality Assurance & Analytical Bureau',
    isGovtVerified: true,
  });

  // Stage 06: Manufacturing / Packaging (Upstream Stage 6)
  const b1e6Data = {
    batchId: b1.batchId,
    eventType: 'MANUFACTURING' as const,
    eventTimestamp: '2026-03-12T10:00:00Z',
    responsibleOrg: 'Karnataka Soaps & Detergents Ltd (KSDL) - Mysore Production Unit',
    location: 'KSDL Factory Campus, Kuvempunagar, Mysuru, Karnataka',
    evidenceRef: 'BIS Compliance Certificate #KSDL/BIS/QC-2026-9902',
    inputQuantity: 11.25,
    outputQuantity: 1200,
  };
  const b1e6Hash = generateEventHash(b1e6Data, b1e5Hash);
  events.push({
    id: 'evt-001-6',
    batchId: b1.batchId,
    eventType: 'MANUFACTURING',
    previousStage: '05_PROCESSING',
    newStage: '06_MANUFACTURING',
    eventTimestamp: b1e6Data.eventTimestamp,
    recordingTimestamp: '2026-03-12T10:30:00Z',
    responsibleOrg: b1e6Data.responsibleOrg,
    role: 'Factory Packaging Director',
    location: b1e6Data.location,
    inputQuantity: 11.25,
    outputQuantity: 1200,
    quantityUnit: 'boxes',
    evidenceRef: b1e6Data.evidenceRef,
    evidenceType: 'BATCH_TEST_REPORT',
    previousEventHash: b1e5Hash,
    currentEventHash: b1e6Hash,
    validationResult: 'PASS',
    notes: 'Batch MS2026-V801 stamped with GI-KA-07 tag and BIS 3298 quality emblem. Laser tamper hologram affixed with scannable phone QR passport.',
    sixStageKey: '04_FACTORY_MANUFACTURING',
    sevenStageKey: '06_MANUFACTURING',
    qualityCertNo: 'KSDL/BIS/QC-2026-9902',
    giTagRef: 'GI-KA-07',
    bisCertNo: 'BIS 3298',
    certificateId: 'KSDL/BIS/QC-2026-9902',
    certificateIssuer: 'Bureau of Indian Standards (BIS) & GI Registry',
    isGovtVerified: true,
  });

  // Stage 07: Distribution → Retail Shop (Upstream Stage 7)
  const b1e7Data = {
    batchId: b1.batchId,
    eventType: 'DISTRIBUTION' as const,
    eventTimestamp: '2026-03-20T11:00:00Z',
    responsibleOrg: 'Mysore Sales International Ltd (MSIL) & Cauvery Emporium',
    location: 'Cauvery Government Sandalwood & Handicrafts Emporium, Sayyaji Rao Road, Mysuru',
    evidenceRef: 'GST e-Way Reference #GSTIN-29AAACK1204M1Z5/INV-8891',
    inputQuantity: 1200,
    outputQuantity: 1200,
  };
  const b1e7Hash = generateEventHash(b1e7Data, b1e6Hash);
  events.push({
    id: 'evt-001-7',
    batchId: b1.batchId,
    eventType: 'DISTRIBUTION',
    previousStage: '06_MANUFACTURING',
    newStage: '07_DISTRIBUTION_RETAIL',
    eventTimestamp: b1e7Data.eventTimestamp,
    recordingTimestamp: '2026-03-20T11:20:00Z',
    responsibleOrg: b1e7Data.responsibleOrg,
    role: 'Retail Store Manager',
    location: b1e7Data.location,
    inputQuantity: 1200,
    outputQuantity: 1200,
    quantityUnit: 'boxes',
    evidenceRef: b1e7Data.evidenceRef,
    evidenceType: 'RETAIL_INVOICE',
    previousEventHash: b1e6Hash,
    currentEventHash: b1e7Hash,
    validationResult: 'PASS',
    notes: 'Distributor MSIL delivered 1,200 units to Cauvery Government Emporium. Inward stock verified intact on retail shelves.',
    sixStageKey: '05_DISTRIBUTOR_RETAIL',
    sevenStageKey: '07_DISTRIBUTION_RETAIL',
    invoiceGstRef: 'GSTIN-29AAACK1204M1Z5/INV-8891',
    certificateId: 'GSTIN-29AAACK1204M1Z5/INV-8891',
    certificateIssuer: 'Commercial Taxes Dept (GST e-Way Reference)',
    isGovtVerified: true,
  });

  // =========================================================================
  // BATCH 2: Demonstration Batch Broken on Purpose (SUSPICIOUS DEMO)
  // MS2026-M402 | Mysore Sandal Pure Sandalwood Oil (25ml)
  // Highlights exactly which stage broke:
  // - Stage 2: Missing Auction / Sale Certificate
  // - Stage 3: Missing Transit Permit (No Form-IV permit on record)
  // - Stage 4: Missing Factory Weighbridge Slip
  // - Stage 5: Missing Distillation Log & Mass-Balance Mismatch
  // Wood out of forest does NOT match factory intake!
  // =========================================================================
  const b2Certificates: GovtCertificate[] = [
    {
      certificateId: 'MISSING-DEPOT-AUC',
      stageKey: '02_FOREST_DEPOT',
      stageName: 'Forest depot / auction',
      issuingAuthority: 'Government Depot Custodian',
      issueDate: 'N/A',
      validityDate: 'N/A',
      documentType: 'Auction / Sale Certificate',
      verificationBadge: '✗ Revoked / Missing',
      status: 'MISSING',
      hash: 'N/A',
      apiVerified: false,
      notes: 'No auction certificate connecting harvest to purchaser.',
    },
    {
      certificateId: 'MISSING-FORM-IV',
      stageKey: '03_TRANSIT',
      stageName: 'Transit',
      issuingAuthority: 'Forest Dept Transit Authority',
      issueDate: 'N/A',
      validityDate: 'N/A',
      documentType: 'Form-IV Transit Permit',
      verificationBadge: '✗ Revoked / Missing',
      status: 'MISSING',
      hash: 'N/A',
      apiVerified: false,
      notes: 'CRITICAL: No government transit permit or vehicle GPS log exists for this consignment.',
    },
    {
      certificateId: 'MISSING-QC-LAB',
      stageKey: '05_PROCESSING',
      stageName: 'Processing (distillation, saponification)',
      issuingAuthority: 'QC Lab',
      issueDate: 'N/A',
      validityDate: 'N/A',
      documentType: 'GC-MS Purity Report',
      verificationBadge: '✗ Revoked / Missing',
      status: 'MISSING',
      hash: 'N/A',
      apiVerified: false,
      notes: 'Mass-balance conversion broke: raw wood was never logged into steam distillation.',
    },
  ];

  const b2: ProductBatch = {
    id: 'batch-002-m402',
    batchId: 'MS2026-M402',
    productName: 'Mysore Sandal Pure Sandalwood Oil (25ml)',
    category: 'Essential Oil',
    description:
      'High grade distilled essential oil marketed as 100% pure Santalum album. Demonstrates exact detection when government transit permits and distillation intake are missing.',
    imageUrl:
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&auto=format&fit=crop&q=80',
    manufacturer: 'Apex Fragrance Co - Contract Packager',
    manufacturingDate: '2026-02-20',
    batchCreationTimestamp: '2026-02-10T10:00:00Z',
    declaredOrigin: 'Dharwad Sandalwood Depot, Karnataka',
    procurementRef: 'KFD/DHW/2026-102',
    registeredQuantity: 300,
    unit: 'pieces',
    currentStage: 'RETAIL_RECEIPT',
    verificationStatus: 'SUSPICIOUS',
    riskScore: 85,
    reasonCodes: [
      'ERR_MISSING_STAGE_02_PERMIT',
      'ERR_MISSING_STAGE_03_TRANSPORT',
      'ERR_MASS_BALANCE_MISMATCH',
    ],
    isPublic: true,
    scanCount: 3,
    lastScannedAt: '2026-03-15T09:00:00Z',
    expectedStages: [
      'LEGAL_PROCUREMENT',
      'TRANSPORT',
      'PROCESSING',
      'MANUFACTURING',
      'PACKAGING',
      'RETAIL_RECEIPT',
    ],
    notes: 'BROKEN TRACEABILITY CHAIN: Tree felling claimed at Dharwad Depot, but missing Transit Permit (Form-IV), missing weighbridge intake, and missing distillation yield.',
    
    // Upstream Provenance & Government Certificate Layer
    treeLotId: 'SW-KA-0912',
    forestRange: 'Dharwad Sandalwood Depot Range',
    gpsCoordinates: '15.4589° N, 75.0078° E',
    fellingDate: '2026-02-10',
    fellingPermitNo: 'FD/KA-DHW/FEL-2026-102',
    auctionLotNo: 'UNVERIFIED-LOT',
    transitPermitNo: undefined, // DELIBERATELY MISSING
    vehicleNo: undefined, // DELIBERATELY MISSING
    intakeWeightKg: 0, // DELIBERATELY BROKEN
    heartwoodGrade: 'Unclassified',
    distillationYieldRatio: 'BROKEN (0 kg wood → 300 bottles claimed)',
    massBalanceStatus: 'FAIL',
    qcCertNo: undefined,
    giTagRef: undefined,
    bisCertNo: undefined,
    invoiceGstRef: 'UNOFFICIAL-CHALLAN-991',
    governmentCertificates: b2Certificates,
    certCountVerified: 1,
    certCountTotal: 4,

    // Six-Stage Links
    sourceLotId: 'KFD-DHW-LOT-2026-4401',
    originLocation: 'Dharwad Sandalwood Depot, Karnataka',
    harvestDate: '2026-02-10',
  };

  // Stage 01: Tree Felling / Harvest exists
  const b2e1Data = {
    batchId: b2.batchId,
    eventType: 'LEGAL_PROCUREMENT' as const,
    eventTimestamp: '2026-02-10T11:00:00Z',
    responsibleOrg: 'Karnataka Forest Department - Dharwad Depot',
    location: 'Dharwad Sandalwood Depot, Karnataka',
    evidenceRef: 'Govt Depot Allotment #KFD-DHW-102',
    inputQuantity: 100,
    outputQuantity: 100,
  };
  const b2e1Hash = generateEventHash(b2e1Data, GENESIS_HASH);
  events.push({
    id: 'evt-002-1',
    batchId: b2.batchId,
    eventType: 'LEGAL_PROCUREMENT',
    previousStage: 'FOREST_HARVEST',
    newStage: '01_TREE_FELLING',
    eventTimestamp: b2e1Data.eventTimestamp,
    recordingTimestamp: '2026-02-10T11:30:00Z',
    responsibleOrg: b2e1Data.responsibleOrg,
    role: 'Depot Assistant',
    location: b2e1Data.location,
    inputQuantity: 100,
    outputQuantity: 100,
    quantityUnit: 'kg',
    evidenceRef: b2e1Data.evidenceRef,
    evidenceType: 'AUCTION_CERTIFICATE',
    previousEventHash: GENESIS_HASH,
    currentEventHash: b2e1Hash,
    validationResult: 'PASS',
    sixStageKey: '01_FOREST_SOURCE',
    sevenStageKey: '01_TREE_FELLING',
    treeId: 'SW-KA-0912',
    sourceLotId: 'KFD-DHW-LOT-2026-4401',
    originLocation: 'Dharwad Sandalwood Depot, Karnataka',
    harvestDate: '2026-02-10',
    fellingPermitNo: 'FD/KA-DHW/FEL-2026-102',
    isGovtVerified: true,
  });

  // STAGE 2 (AUCTION), STAGE 3 (TRANSIT PERMIT), STAGE 4 (FACTORY INTAKE), AND STAGE 5 (DISTILLATION) ARE MISSING!
  // It leaps directly to contract bottling and retail, breaking mass-balance and statutory chain!

  const b2e2Data = {
    batchId: b2.batchId,
    eventType: 'PACKAGING' as const,
    eventTimestamp: '2026-02-20T14:00:00Z',
    responsibleOrg: 'Apex Fragrance Co - Packaging Line',
    location: 'Peenya Industrial Area, Bengaluru, Karnataka',
    evidenceRef: 'Internal Bottling Sheet #BTL-302',
    inputQuantity: 100,
    outputQuantity: 300,
  };
  const b2e2Hash = generateEventHash(b2e2Data, b2e1Hash);
  events.push({
    id: 'evt-002-2',
    batchId: b2.batchId,
    eventType: 'PACKAGING',
    previousStage: '01_TREE_FELLING',
    newStage: '06_MANUFACTURING',
    eventTimestamp: b2e2Data.eventTimestamp,
    recordingTimestamp: '2026-02-20T14:30:00Z',
    responsibleOrg: b2e2Data.responsibleOrg,
    role: 'Factory Supervisor',
    location: b2e2Data.location,
    inputQuantity: 100,
    outputQuantity: 300,
    quantityUnit: 'pieces',
    evidenceRef: b2e2Data.evidenceRef,
    evidenceType: 'BATCH_TEST_REPORT',
    previousEventHash: b2e1Hash,
    currentEventHash: b2e2Hash,
    validationResult: 'FAIL',
    notes: 'BROKEN STAGE DETECTED: Direct leap from forest harvest to retail packaging. Missing Transit Permit (Stage 3), missing factory intake weighbridge slip (Stage 4), and missing distillation log (Stage 5).',
    sixStageKey: '04_FACTORY_MANUFACTURING',
    sevenStageKey: '06_MANUFACTURING',
    isGovtVerified: false,
  });

  const b2e3Data = {
    batchId: b2.batchId,
    eventType: 'RETAIL_RECEIPT' as const,
    eventTimestamp: '2026-02-25T16:00:00Z',
    responsibleOrg: 'City Tourist Souvenir Stall',
    location: 'Brigade Road, Bengaluru, Karnataka',
    evidenceRef: 'Cash Sale Delivery Challan #DDC-991',
    inputQuantity: 300,
    outputQuantity: 300,
  };
  const b2e3Hash = generateEventHash(b2e3Data, b2e2Hash);
  events.push({
    id: 'evt-002-3',
    batchId: b2.batchId,
    eventType: 'RETAIL_RECEIPT',
    previousStage: '06_MANUFACTURING',
    newStage: '07_DISTRIBUTION_RETAIL',
    eventTimestamp: b2e3Data.eventTimestamp,
    recordingTimestamp: '2026-02-25T16:30:00Z',
    responsibleOrg: b2e3Data.responsibleOrg,
    role: 'Shopkeeper',
    location: b2e3Data.location,
    inputQuantity: 300,
    outputQuantity: 300,
    quantityUnit: 'pieces',
    evidenceRef: b2e3Data.evidenceRef,
    evidenceType: 'RETAIL_INVOICE',
    previousEventHash: b2e2Hash,
    currentEventHash: b2e3Hash,
    validationResult: 'FAIL',
    notes: 'Flagged by Consistency Engine: Missing Form-IV transit permit, missing factory intake slip, mass-balance conversion failed.',
    sixStageKey: '05_DISTRIBUTOR_RETAIL',
    sevenStageKey: '07_DISTRIBUTION_RETAIL',
    isGovtVerified: false,
  });

  // =========================================================================
  // BATCH 3: Invalid Date Sequence Anomaly (Time Anachronism)
  // MS2026-D305 | Mysore Sandal Classic Agarbatti (50 sticks) — DEMO SAMPLE
  // Event 2 is recorded with a timestamp earlier than Event 1!
  // =========================================================================
  const b3: ProductBatch = {
    id: 'batch-003-d305',
    batchId: 'MS2026-D305',
    productName: 'Mysore Sandal Classic Agarbatti (50 sticks) — DEMO SAMPLE',
    category: 'Incense',
    description:
      'Traditional hand-rolled incense sticks. Demonstrates detection of anachronistic backdated supply chain entries.',
    imageUrl:
      'https://images.unsplash.com/photo-1603569283847-aa295f0d016a?w=800&auto=format&fit=crop&q=80',
    manufacturer: 'Heritage Incense Crafters Ltd',
    manufacturingDate: '2026-03-01',
    batchCreationTimestamp: '2026-03-01T12:00:00Z',
    declaredOrigin: 'Marayoor Sandal Reserve, Border Range',
    procurementRef: 'KFD/MYR/2026-33',
    registeredQuantity: 500,
    unit: 'boxes',
    currentStage: 'PACKAGING',
    verificationStatus: 'SUSPICIOUS',
    riskScore: 70,
    reasonCodes: ['ERR_CHRONOLOGICAL_INVERSION'],
    isPublic: true,
    scanCount: 5,
    lastScannedAt: '2026-03-22T10:10:00Z',
    expectedStages: ['LEGAL_PROCUREMENT', 'TRANSPORT', 'PROCESSING', 'PACKAGING'],
    notes: 'Packaging timestamp predates raw timber harvest date by 45 days.',
    sourceLotId: 'KFD-MYR-LOT-33',
    permitRef: 'KFD/FORM-IV/2026-338',
  };

  const b3e1Data = {
    batchId: b3.batchId,
    eventType: 'LEGAL_PROCUREMENT' as const,
    eventTimestamp: '2026-03-15T09:00:00Z', // MARCH 15
    responsibleOrg: 'Forest Depot Procurement Authority',
    location: 'Marayoor Border Depot',
    evidenceRef: 'Govt Timber Pass #M-991',
    inputQuantity: 80,
    outputQuantity: 80,
  };
  const b3e1Hash = generateEventHash(b3e1Data, GENESIS_HASH);
  events.push({
    id: 'evt-003-1',
    batchId: b3.batchId,
    eventType: 'LEGAL_PROCUREMENT',
    previousStage: 'DEPOT',
    newStage: '01_FOREST_SOURCE',
    eventTimestamp: b3e1Data.eventTimestamp,
    recordingTimestamp: '2026-03-15T09:30:00Z',
    responsibleOrg: b3e1Data.responsibleOrg,
    role: 'Timber Inspector',
    location: b3e1Data.location,
    inputQuantity: 80,
    outputQuantity: 80,
    quantityUnit: 'kg',
    evidenceRef: b3e1Data.evidenceRef,
    evidenceType: 'AUCTION_CERTIFICATE',
    previousEventHash: GENESIS_HASH,
    currentEventHash: b3e1Hash,
    validationResult: 'PASS',
    sixStageKey: '01_FOREST_SOURCE',
  });

  // Invalid chronological order: February 02 (before March 15 procurement!)
  const b3e2Data = {
    batchId: b3.batchId,
    eventType: 'PROCESSING' as const,
    eventTimestamp: '2026-02-02T10:00:00Z', // FEBRUARY 02 (Anachronism!)
    responsibleOrg: 'Heritage Incense Crafters Milling Division',
    location: 'Nanjangud Industrial Area, Mysuru, Karnataka',
    evidenceRef: 'Powder Grinding Log #PGL-44',
    inputQuantity: 80,
    outputQuantity: 75,
  };
  const b3e2Hash = generateEventHash(b3e2Data, b3e1Hash);
  events.push({
    id: 'evt-003-2',
    batchId: b3.batchId,
    eventType: 'PROCESSING',
    previousStage: '01_FOREST_SOURCE',
    newStage: '04_FACTORY_MANUFACTURING',
    eventTimestamp: b3e2Data.eventTimestamp,
    recordingTimestamp: '2026-03-16T11:00:00Z',
    responsibleOrg: b3e2Data.responsibleOrg,
    role: 'Milling Manager',
    location: b3e2Data.location,
    inputQuantity: 80,
    outputQuantity: 75,
    quantityUnit: 'kg',
    evidenceRef: b3e2Data.evidenceRef,
    evidenceType: 'DISTILLATION_LOG',
    previousEventHash: b3e1Hash,
    currentEventHash: b3e2Hash,
    validationResult: 'FAIL',
    notes: 'Impossible timeline: Grinding recorded prior to raw timber auction date.',
    sixStageKey: '04_FACTORY_MANUFACTURING',
  });

  // =========================================================================
  // BATCH 4: Altered Event Record / Cryptographic Hash Tampered
  // MS2026-T904 | Mysore Sandal Luxury Talc (300g) — DEMO SAMPLE
  // Hash tampered in Stage 03 Timber Transport!
  // =========================================================================
  const b4: ProductBatch = {
    id: 'batch-004-t904',
    batchId: 'MS2026-T904',
    productName: 'Mysore Sandal Luxury Talc (300g) — DEMO SAMPLE',
    category: 'Cosmetics',
    description:
      'Fragrant sandalwood body talcum. Demonstrates real-time detection of a manipulated database record or fake cryptographic hash.',
    imageUrl:
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80',
    manufacturer: 'KSDL Mysore Cosmetics Plant',
    manufacturingDate: '2026-01-15',
    batchCreationTimestamp: '2026-01-10T08:00:00Z',
    declaredOrigin: 'Chamarajanagar Forest Division, Karnataka',
    procurementRef: 'KFD/CRN/2026-78',
    registeredQuantity: 800,
    unit: 'boxes',
    currentStage: 'PACKAGING',
    verificationStatus: 'SUSPICIOUS',
    riskScore: 90,
    reasonCodes: ['ERR_HASH_CHAIN_TAMPERED'],
    isPublic: true,
    scanCount: 19,
    lastScannedAt: '2026-02-18T14:40:00Z',
    expectedStages: ['LEGAL_PROCUREMENT', 'TRANSPORT', 'PROCESSING', 'PACKAGING'],
    notes: 'Database record altered after recording. Event hash fails cryptographic verification.',
    sourceLotId: 'KFD-CRN-LOT-78',
    permitRef: 'KFD/FORM-IV/2026-781',
  };

  const b4e1Data = {
    batchId: b4.batchId,
    eventType: 'LEGAL_PROCUREMENT' as const,
    eventTimestamp: '2026-01-10T09:00:00Z',
    responsibleOrg: 'Karnataka Forest Department - Chamarajanagar Depot',
    location: 'Chamarajanagar Depot, Karnataka',
    evidenceRef: 'Govt Forest Auction #CRN-78',
    inputQuantity: 120,
    outputQuantity: 120,
  };
  const b4e1Hash = generateEventHash(b4e1Data, GENESIS_HASH);
  events.push({
    id: 'evt-004-1',
    batchId: b4.batchId,
    eventType: 'LEGAL_PROCUREMENT',
    previousStage: 'DEPOT',
    newStage: '01_FOREST_SOURCE',
    eventTimestamp: b4e1Data.eventTimestamp,
    recordingTimestamp: '2026-01-10T09:30:00Z',
    responsibleOrg: b4e1Data.responsibleOrg,
    role: 'Range Forest Officer',
    location: b4e1Data.location,
    inputQuantity: 120,
    outputQuantity: 120,
    quantityUnit: 'kg',
    evidenceRef: b4e1Data.evidenceRef,
    evidenceType: 'AUCTION_CERTIFICATE',
    previousEventHash: GENESIS_HASH,
    currentEventHash: b4e1Hash,
    validationResult: 'PASS',
    sixStageKey: '01_FOREST_SOURCE',
  });

  // Event 2 in Stage 03 has an intentionally forged/tampered hash
  const b4e2Data = {
    batchId: b4.batchId,
    eventType: 'TRANSPORT' as const,
    eventTimestamp: '2026-01-12T11:00:00Z',
    responsibleOrg: 'Regional Freight Transport',
    location: 'Chamarajanagar to Mysuru Road',
    evidenceRef: 'Transit Waybill #WB-4410',
    inputQuantity: 120,
    outputQuantity: 120,
  };
  const forgedHash = 'deadbeef00000000000000000000000000000000000000000000000000000000';
  events.push({
    id: 'evt-004-2',
    batchId: b4.batchId,
    eventType: 'TRANSPORT',
    previousStage: '01_FOREST_SOURCE',
    newStage: '03_TIMBER_TRANSPORT',
    eventTimestamp: b4e2Data.eventTimestamp,
    recordingTimestamp: '2026-01-12T11:30:00Z',
    responsibleOrg: b4e2Data.responsibleOrg,
    role: 'Logistics Supervisor',
    location: b4e2Data.location,
    inputQuantity: 120,
    outputQuantity: 120,
    quantityUnit: 'kg',
    evidenceRef: b4e2Data.evidenceRef,
    evidenceType: 'GOVERNMENT_TRANSIT_PASS',
    previousEventHash: b4e1Hash,
    currentEventHash: forgedHash,
    tamperedHash: forgedHash,
    tamperedPayload: true,
    validationResult: 'FAIL',
    notes: 'TAMPER DETECTED: Hash signature does not match canonical payload SHA-256.',
    sixStageKey: '03_TIMBER_TRANSPORT',
  });

  // =========================================================================
  // BATCH 5: Mass-Balance Quantity Discrepancy
  // MS2026-Q107 | Sandalwood Heritage Carved Figurine — DEMO SAMPLE
  // Input: 12 kg raw heartwood -> Claims 85 kg finished output!
  // =========================================================================
  const b5: ProductBatch = {
    id: 'batch-005-q107',
    batchId: 'MS2026-Q107',
    productName: 'Sandalwood Heritage Carved Figurine — DEMO SAMPLE',
    category: 'Carving/Artifact',
    description:
      'Hand-carved deity figurine claimed to be carved solely from authentic Karnataka sandalwood heartwood.',
    imageUrl:
      'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80',
    manufacturer: 'Cauvery Crafts Heritage Studio',
    manufacturingDate: '2026-02-14',
    batchCreationTimestamp: '2026-02-01T10:00:00Z',
    declaredOrigin: 'Hunsur Forest Depot, Karnataka',
    procurementRef: 'KFD/HNS/2026-88',
    registeredQuantity: 15,
    unit: 'pieces',
    currentStage: 'MANUFACTURING',
    verificationStatus: 'SUSPICIOUS',
    riskScore: 70,
    reasonCodes: ['ERR_QUANTITY_MASS_EXPANSION'],
    isPublic: true,
    scanCount: 8,
    lastScannedAt: '2026-03-05T12:00:00Z',
    expectedStages: ['LEGAL_PROCUREMENT', 'TRANSPORT', 'MANUFACTURING'],
    notes: 'Input heartwood was 12kg, but stage claims to have produced 85kg of finished sandalwood.',
    sourceLotId: 'KFD-HNS-LOT-88',
  };

  const b5e1Data = {
    batchId: b5.batchId,
    eventType: 'LEGAL_PROCUREMENT' as const,
    eventTimestamp: '2026-02-01T10:30:00Z',
    responsibleOrg: 'Karnataka Forest Department - Hunsur Depot',
    location: 'Hunsur Sandal Depot, Karnataka',
    evidenceRef: 'Auction Slip #HNS-AUC-88',
    inputQuantity: 12,
    outputQuantity: 12,
  };
  const b5e1Hash = generateEventHash(b5e1Data, GENESIS_HASH);
  events.push({
    id: 'evt-005-1',
    batchId: b5.batchId,
    eventType: 'LEGAL_PROCUREMENT',
    previousStage: 'DEPOT',
    newStage: '01_FOREST_SOURCE',
    eventTimestamp: b5e1Data.eventTimestamp,
    recordingTimestamp: '2026-02-01T11:00:00Z',
    responsibleOrg: b5e1Data.responsibleOrg,
    role: 'Depot Manager',
    location: b5e1Data.location,
    inputQuantity: 12,
    outputQuantity: 12,
    quantityUnit: 'kg',
    evidenceRef: b5e1Data.evidenceRef,
    evidenceType: 'AUCTION_CERTIFICATE',
    previousEventHash: GENESIS_HASH,
    currentEventHash: b5e1Hash,
    validationResult: 'PASS',
    sixStageKey: '01_FOREST_SOURCE',
  });

  const b5e2Data = {
    batchId: b5.batchId,
    eventType: 'MANUFACTURING' as const,
    eventTimestamp: '2026-02-14T14:00:00Z',
    responsibleOrg: 'Cauvery Crafts Artisans Guild',
    location: 'Devaraja Market Artisan Quarter, Mysuru, Karnataka',
    evidenceRef: 'Artisan Guild Carving Log #AGL-201',
    inputQuantity: 12,
    outputQuantity: 85, // Impossible expansion in kg!
  };
  const b5e2Hash = generateEventHash(b5e2Data, b5e1Hash);
  events.push({
    id: 'evt-005-2',
    batchId: b5.batchId,
    eventType: 'MANUFACTURING',
    previousStage: '01_FOREST_SOURCE',
    newStage: '04_FACTORY_MANUFACTURING',
    eventTimestamp: b5e2Data.eventTimestamp,
    recordingTimestamp: '2026-02-14T15:00:00Z',
    responsibleOrg: b5e2Data.responsibleOrg,
    role: 'Master Craftsman',
    location: b5e2Data.location,
    inputQuantity: 12,
    outputQuantity: 85,
    quantityUnit: 'kg',
    evidenceRef: b5e2Data.evidenceRef,
    evidenceType: 'BATCH_TEST_REPORT',
    previousEventHash: b5e1Hash,
    currentEventHash: b5e2Hash,
    validationResult: 'FAIL',
    notes: 'Mass balance violation: 12 kg raw wood cannot produce 85 kg pure sandalwood carvings.',
    sixStageKey: '04_FACTORY_MANUFACTURING',
  });

  // =========================================================================
  // BATCH 6: Unverified Early Batch (Only 1–2 stages recorded so far)
  // MS2026-U006 | KSDL Raw Distillation Heartwood Lot — DEMO SAMPLE
  // =========================================================================
  const b6: ProductBatch = {
    id: 'batch-006-u006',
    batchId: 'MS2026-U006',
    productName: 'KSDL Raw Distillation Heartwood Lot — DEMO SAMPLE',
    category: 'Raw Heartwood',
    description:
      'Freshly procured raw sandalwood heartwood logs pending transport and oil distillation.',
    imageUrl:
      'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80',
    manufacturer: 'Karnataka Soaps & Detergents Ltd (KSDL)',
    manufacturingDate: '2026-04-01',
    batchCreationTimestamp: '2026-04-01T09:00:00Z',
    declaredOrigin: 'Sirsi Forest Division Government Sandal Depot, Karnataka',
    procurementRef: 'KFD/SRS/AUC/2026-014',
    registeredQuantity: 180,
    unit: 'kg',
    currentStage: 'LEGAL_PROCUREMENT',
    verificationStatus: 'UNVERIFIED',
    riskScore: 25,
    reasonCodes: ['WARN_INSUFFICIENT_JOURNEY_STAGES'],
    isPublic: true,
    scanCount: 1,
    lastScannedAt: '2026-04-01T10:00:00Z',
    expectedStages: [
      'LEGAL_PROCUREMENT',
      'TRANSPORT',
      'PROCESSING',
      'MANUFACTURING',
      'PACKAGING',
      'DISTRIBUTION',
      'RETAIL_RECEIPT',
    ],
    notes: 'Early stage intake batch. Only Forest Harvest and Permit issued. Factory stages pending.',
    sourceLotId: 'KFD-SRS-LOT-2026-014',
    permitRef: 'KFD/FORM-IV/2026-0149',
    issuingAuthority: 'Divisional Forest Officer, Sirsi Division',
    certificateImageUrl: OFFICIAL_SAMPLE_CERTIFICATE_DATA_URL,
    documentVerificationStatus: 'CHECKED_OFFLINE',
  };

  const b6e1Data = {
    batchId: b6.batchId,
    eventType: 'LEGAL_PROCUREMENT' as const,
    eventTimestamp: '2026-04-01T09:30:00Z',
    responsibleOrg: 'Karnataka Forest Department - Sirsi Division',
    location: 'Sirsi Sandalwood Depot, Uttara Kannada, Karnataka',
    evidenceRef: 'Forest Allotment Order #AUC-SRS-2026-014',
    inputQuantity: 180,
    outputQuantity: 180,
  };
  const b6e1Hash = generateEventHash(b6e1Data, GENESIS_HASH);
  events.push({
    id: 'evt-006-1',
    batchId: b6.batchId,
    eventType: 'LEGAL_PROCUREMENT',
    previousStage: 'FOREST_DEPOT_HARVEST',
    newStage: '01_FOREST_SOURCE',
    eventTimestamp: b6e1Data.eventTimestamp,
    recordingTimestamp: '2026-04-01T09:45:00Z',
    responsibleOrg: b6e1Data.responsibleOrg,
    role: 'Range Forest Officer',
    location: b6e1Data.location,
    inputQuantity: 180,
    outputQuantity: 180,
    quantityUnit: 'kg',
    evidenceRef: b6e1Data.evidenceRef,
    evidenceType: 'AUCTION_CERTIFICATE',
    previousEventHash: GENESIS_HASH,
    currentEventHash: b6e1Hash,
    validationResult: 'PASS',
    sixStageKey: '01_FOREST_SOURCE',
    sourceLotId: 'KFD-SRS-LOT-2026-014',
  });

  const b6e2Data = {
    batchId: b6.batchId,
    eventType: 'LEGAL_PROCUREMENT' as const,
    eventTimestamp: '2026-04-02T10:00:00Z',
    responsibleOrg: 'Divisional Forest Office, Sirsi Division',
    location: 'Sirsi, Karnataka',
    evidenceRef: 'Permit #KFD/FORM-IV/2026-0149',
    inputQuantity: 180,
    outputQuantity: 180,
  };
  const b6e2Hash = generateEventHash(b6e2Data, b6e1Hash);
  events.push({
    id: 'evt-006-2',
    batchId: b6.batchId,
    eventType: 'LEGAL_PROCUREMENT',
    previousStage: '01_FOREST_SOURCE',
    newStage: '02_PERMIT_CERTIFICATE',
    eventTimestamp: b6e2Data.eventTimestamp,
    recordingTimestamp: '2026-04-02T10:30:00Z',
    responsibleOrg: b6e2Data.responsibleOrg,
    role: 'Divisional Forest Officer',
    location: b6e2Data.location,
    inputQuantity: 180,
    outputQuantity: 180,
    quantityUnit: 'kg',
    evidenceRef: b6e2Data.evidenceRef,
    evidenceType: 'GOVERNMENT_TRANSIT_PASS',
    previousEventHash: b6e1Hash,
    currentEventHash: b6e2Hash,
    validationResult: 'PASS',
    sixStageKey: '02_PERMIT_CERTIFICATE',
    permitNumber: 'KFD/FORM-IV/2026-0149',
    certificateImageUrl: OFFICIAL_SAMPLE_CERTIFICATE_DATA_URL,
    documentVerificationStatus: 'CHECKED_OFFLINE',
  });

  const batches = [b1, b2, b3, b4, b5, b6];

  const reports: AnomalyReport[] = [
    {
      id: 'rep-001',
      batchId: 'MS2026-M402',
      reportedAt: '2026-03-24T14:30:00Z',
      reporterType: 'CONSUMER',
      issueType: 'UNUSUAL_SMELL_OR_TEXTURE',
      description:
        'Purchased 25ml sandalwood oil on Brigade Road. Scent dissipated after 20 minutes, oily residue remained with chemical kerosene odor. App flagged missing Stage 02 permit and missing transit tracking.',
      retailLocation: 'Souvenir stall, Brigade Road, Bengaluru',
      contactEmail: 'buyer.bengaluru@example.com',
      status: 'INVESTIGATING',
    },
    {
      id: 'rep-002',
      batchId: 'MS2026-T904',
      reportedAt: '2026-03-28T09:15:00Z',
      reporterType: 'INSPECTOR',
      issueType: 'TAMPERED_SEAL',
      description:
        'Routine retail audit at Cauvery Emporium franchise detected mismatch in SHA-256 event signature for Stage 03 transit event. Suspected database record tampering.',
      retailLocation: 'Cauvery Emporium Sub-outlet, Hubballi',
      contactEmail: 'inspector.kfd.hubballi@karnataka.gov.in',
      status: 'INVESTIGATING',
    },
  ];

  return { batches, events, reports };
}

class SandalSureDataStore {
  private batches: ProductBatch[] = [];
  private events: SupplyChainEvent[] = [];
  private reports: AnomalyReport[] = [];
  private listeners: Array<() => void> = [];

  constructor() {
    this.init();
  }

  private init() {
    try {
      const storedBatches = localStorage.getItem(STORAGE_KEY_BATCHES);
      const storedEvents = localStorage.getItem(STORAGE_KEY_EVENTS);
      const storedReports = localStorage.getItem(STORAGE_KEY_REPORTS);

      if (storedBatches && storedEvents) {
        this.batches = JSON.parse(storedBatches);
        this.events = JSON.parse(storedEvents);
        this.reports = storedReports ? JSON.parse(storedReports) : [];
      } else {
        this.resetToSeedData();
      }
    } catch {
      this.resetToSeedData();
    }
  }

  private notify() {
    this.listeners.forEach((listener) => {
      try {
        listener();
      } catch (err) {
        console.error('Error in dataStore listener:', err);
      }
    });
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private save() {
    try {
      localStorage.setItem(STORAGE_KEY_BATCHES, JSON.stringify(this.batches));
      localStorage.setItem(STORAGE_KEY_EVENTS, JSON.stringify(this.events));
      localStorage.setItem(STORAGE_KEY_REPORTS, JSON.stringify(this.reports));
    } catch (e) {
      console.warn('Unable to persist to localStorage:', e);
    }
    this.notify();
  }

  public resetToSeedData() {
    const seed = createInitialSeedData();
    this.batches = seed.batches;
    this.events = seed.events;
    this.reports = seed.reports;
    this.save();
  }

  public getBatches(): ProductBatch[] {
    return [...this.batches];
  }

  public getBatchById(batchIdOrRecordId: string): ProductBatch | undefined {
    const target = batchIdOrRecordId.trim().toLowerCase();
    return this.batches.find(
      (b) => b.batchId.toLowerCase() === target || b.id.toLowerCase() === target
    );
  }

  public getEventsForBatch(batchId: string): SupplyChainEvent[] {
    const target = batchId.trim().toLowerCase();
    return this.events.filter((e) => e.batchId.toLowerCase() === target);
  }

  public getAllEvents(): SupplyChainEvent[] {
    return [...this.events];
  }

  public incrementScanCount(batchId: string): void {
    const batch = this.getBatchById(batchId);
    if (batch) {
      batch.scanCount = (batch.scanCount || 0) + 1;
      batch.lastScannedAt = new Date().toISOString();
      this.save();
    }
  }

  public addBatch(newBatch: ProductBatch, initialEvent: SupplyChainEvent): { success: boolean; error?: string } {
    const exists = this.batches.some(
      (b) => b.batchId.trim().toLowerCase() === newBatch.batchId.trim().toLowerCase()
    );
    if (exists) {
      return { success: false, error: `Batch ID '${newBatch.batchId}' is already registered in the ledger.` };
    }

    this.batches.unshift(newBatch);
    this.events.push(initialEvent);
    this.save();
    return { success: true };
  }

  public updateBatch(updatedBatch: ProductBatch): { success: boolean; error?: string } {
    const idx = this.batches.findIndex(
      (b) => b.batchId.trim().toLowerCase() === updatedBatch.batchId.trim().toLowerCase()
    );
    if (idx === -1) {
      return { success: false, error: `Batch ID '${updatedBatch.batchId}' not found.` };
    }
    this.batches[idx] = { ...this.batches[idx], ...updatedBatch };
    this.save();
    return { success: true };
  }

  public addEvent(newEvent: SupplyChainEvent): { success: boolean; error?: string } {
    const batch = this.getBatchById(newEvent.batchId);
    if (!batch) {
      return { success: false, error: `Batch '${newEvent.batchId}' not found.` };
    }

    if (this.events.some((e) => e.id === newEvent.id)) {
      return { success: false, error: `Event ID '${newEvent.id}' already exists.` };
    }

    this.events.push(newEvent);
    batch.currentStage = newEvent.eventType;
    this.save();
    return { success: true };
  }

  public uploadCertificateImage(batchId: string, imageDataUrl: string): boolean {
    const batch = this.getBatchById(batchId);
    if (!batch) return false;
    batch.certificateImageUrl = imageDataUrl;
    batch.documentVerificationStatus = 'UNVERIFIED_UPLOAD';
    const batchEvents = this.getEventsForBatch(batchId);
    const stage02 = batchEvents.find((e) => e.sixStageKey === '02_PERMIT_CERTIFICATE');
    if (stage02) {
      stage02.certificateImageUrl = imageDataUrl;
      stage02.documentVerificationStatus = 'UNVERIFIED_UPLOAD';
    }
    this.save();
    return true;
  }

  public verifyCertificateOffline(batchId: string): boolean {
    const batch = this.getBatchById(batchId);
    if (!batch) return false;
    batch.documentVerificationStatus = 'CHECKED_OFFLINE';
    const batchEvents = this.getEventsForBatch(batchId);
    const stage02 = batchEvents.find((e) => e.sixStageKey === '02_PERMIT_CERTIFICATE');
    if (stage02) {
      stage02.documentVerificationStatus = 'CHECKED_OFFLINE';
    }
    this.save();
    return true;
  }

  public simulateTampering(eventId: string, newEvidenceRef: string): boolean {
    const event = this.events.find((e) => e.id === eventId);
    if (!event) return false;

    event.evidenceRef = newEvidenceRef;
    event.tamperedPayload = true;
    event.validationResult = 'FAIL';
    this.save();
    return true;
  }

  public submitReport(report: AnomalyReport): void {
    this.reports.unshift(report);
    this.save();
  }

  public getReports(): AnomalyReport[] {
    return [...this.reports];
  }
}

export const dataStore = new SandalSureDataStore();
