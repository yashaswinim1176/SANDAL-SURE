# SandalSure AI — Digital Sandalwood Traceability & Authenticity
**Ideathon 2026 | Problem Statement 2: Digital Sandalwood Traceability & Authenticity**  
*“The Product With a Story Nobody Could Verify”*


Live Demo : "https://sandalsure-ai-digital-sandalwood-traceability-aut.ai.studio"

---

## 1. Executive Summary

Karnataka Sandalwood (*Santalum album*) is among the most prized fragrant resources in the world, legally protected and processed primarily under Karnataka Soaps & Detergents Limited (KSDL). However, static printed QR codes on retail packaging are vulnerable to cloning, photocopy duplication, and fraudulent labeling.

**SandalSure AI** introduces the **Journey Consistency Engine**: instead of treating the static presence of a QR code as proof of authenticity, it mathematically verifies whether a batch’s chronological custody events, mass balance yield, and cryptographic SHA-256 event chains are internally consistent.

---

## 2. Core Features (The Completed 30% Prototype)

1. **Digital Sandalwood Passport (`/verify/:batchId`)**:
   - Scannable QR code and manual batch lookup.
   - Dynamic status classification: `VERIFIED`, `SUSPICIOUS`, or `UNVERIFIED`.
   - Explainable risk score (0 to 100) and human-readable audit findings.
   - Step-by-step custody milestone timeline with government transit e-challans and auction slips.
   - Clear disclosure distinguishing digital record consistency from physical laboratory GC-MS santalol testing.

2. **Deterministic Journey Consistency Engine**:
   - 11 rule-based checks:
     - Batch existence and uniqueness
     - Forward chronological timestamp sequencing
     - Mandatory transformation continuity (harvest cannot jump directly to retail without distillation/processing)
     - Thermodynamic mass-balance verification (output mass cannot expand by >5% in physical processing)
     - Cryptographic SHA-256 hash chaining back to Genesis root (`000000...0000`)
     - Karnataka Forest Department legal auction anchor verification

3. **Batch Registration & Genesis Block Minting**:
   - Operator workspace for registering new batches.
   - Form validation, duplicate collision prevention, and automatic generation of the initial `LEGAL_PROCUREMENT` event.
   - Instant downloadable and printable high-resolution QR label card.

4. **Supply Chain Event Management & Live Tamper Simulator**:
   - Allows operators to append subsequent custody milestones (`TRANSPORT`, `PROCESSING`, `MANUFACTURING`, `PACKAGING`, `DISTRIBUTION`, `RETAIL_RECEIPT`).
   - Live pre-commit SHA-256 preview showing parent hash and computed payload hash.
   - **Simulate Tampering Tool**: Enables judges and evaluators to modify an existing event payload and witness the Journey Consistency Engine immediately flag `ERR_HASH_CHAIN_TAMPERED`.

5. **Inspector Evidence Desk**:
   - Real-time fleetwide KPIs (Total batches, verified, suspicious, unverified, average risk score).
   - Flagged batch urgent triage queue.
   - Interactive forensic audit drawer showing raw cryptographic links.
   - Crowdsourced consumer incident report tracking.
   - One-click CSV and JSON audit ledger export.

6. **Reproducible Test Benchmarks Dashboard**:
   - 1-click test suite running 8 automated test cases across positive and negative controls.
   - Real-time millisecond execution latency measurement (<2ms average).
   - Synthetic confusion matrix: True Positives, True Negatives, False Positives, False Negatives, Sensitivity, Specificity, and Accuracy.

---

## 3. Seed Demonstration Scenarios

| Batch ID | Product Name | Expected Status | Seeded Anomaly Description |
| :--- | :--- | :--- | :--- |
| **`MS2026-V801`** | Mysore Sandal Gold Soap (125g) | **VERIFIED** | Golden authentic 7-stage chain from Shimoga auction to retail. |
| **`MS2026-M402`** | Pure Sandalwood Oil (25ml) | **SUSPICIOUS** | Missing essential stage: Raw timber jumps directly to retail. |
| **`MS2026-D305`** | Classic Agarbatti (50 sticks) | **SUSPICIOUS** | Anachronistic timeline: Milling dated 45 days prior to harvest. |
| **`MS2026-T904`** | Mysore Sandal Luxury Talc (300g) | **SUSPICIOUS** | Cryptographic hash tampered: Database payload altered post-signing. |
| **`MS2026-Q107`** | Heritage Carved Figurine | **SUSPICIOUS** | Mass balance anomaly: 12kg wood claims 85kg pure carved output (+608%). |
| **`MS2026-U006`** | KSDL Raw Distillation Lot | **UNVERIFIED** | Early custody stage: Only harvest recorded so far; factory pending. |
| **`NONEXISTENT`** | Any unknown identifier | **UNVERIFIED** | Unregistered batch handled safely with consumer warning. |

---

## 4. System Architecture

```text
[ Consumer Mobile / QR Scanner / Operator / Inspector ]
                         │
                         ▼
             [ SandalSure React SPA ]
                         │
                         ▼
        [ Deterministic Consistency Engine ]
      ┌──────────────────┴──────────────────┐
      ▼                                     ▼
[ SHA-256 Event Chain ]         [ Journey Rule Evaluator ]
- Canonical JSON Serialization  - Chronological Sequencing
- Genesis Hash Linking          - Mass Balance Yield Bounds
- Tamper-Evident Signatures     - Mandatory Stage Continuity
      └──────────────────┬──────────────────┘
                         ▼
           [ Risk Scoring & Status ]
            - VERIFIED (Low Risk)
            - SUSPICIOUS (High/Critical)
            - UNVERIFIED (Incomplete)
                         │
                         ▼
        [ Sandalwood Digital Passport ]
```

## 5. Setup & Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build for production
npm run build

# 4. Run type check and linter
npm run lint
```

---

## 6. Responsible Disclosures

- All demo records are clearly marked **DEMO SAMPLE** for Ideathon 2026 evaluation.
- The Digital Sandalwood Passport validates digital record consistency, not physical chemical purity or biological wood species DNA.
