/**
 * SandalSure AI - Official Sample Certificate Specimen
 * Stage 02: Permit & Certificate Supporting Evidence
 * Ideathon 2026 | Government Document Verification
 */

// Official SVG certificate data URL - renders instantly with zero network dependencies
export const OFFICIAL_SAMPLE_CERTIFICATE_DATA_URL = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1050" width="100%" height="100%" style="background:#FAF8F5; font-family: 'Times New Roman', serif;">
  <!-- Border & Guilloche Frame -->
  <rect x="25" y="25" width="750" height="1000" fill="#FFFDF9" stroke="#3D2418" stroke-width="4" rx="12"/>
  <rect x="35" y="35" width="730" height="980" fill="none" stroke="#D4AF37" stroke-width="1.5" stroke-dasharray="6,3" rx="8"/>
  <rect x="45" y="45" width="710" height="960" fill="none" stroke="#5C3A21" stroke-width="0.75"/>

  <!-- Watermark -->
  <g opacity="0.04" transform="translate(400, 520) scale(1.6)">
    <circle cx="0" cy="0" r="140" fill="#3D2418"/>
    <text x="0" y="20" font-size="32" font-weight="bold" text-anchor="middle" fill="#000">KFD TRANSIT</text>
  </g>

  <!-- Header Header -->
  <g transform="translate(400, 110)" text-anchor="middle">
    <!-- Emblem Icon -->
    <circle cx="0" cy="-35" r="28" fill="#3D2418"/>
    <path d="M-12,-42 L12,-42 L8,-25 L-8,-25 Z" fill="#D4AF37"/>
    <circle cx="0" cy="-34" r="6" fill="#FFF"/>
    
    <text x="0" y="10" font-size="14" letter-spacing="3" font-weight="bold" fill="#7D4F33">GOVERNMENT OF KARNATAKA</text>
    <text x="0" y="32" font-size="20" font-weight="bold" fill="#24140D">FOREST DEPARTMENT (KFD)</text>
    <text x="0" y="50" font-size="12" fill="#5C3A21">OFFICE OF THE DIVISIONAL FOREST OFFICER • SHIMOGA DIVISION</text>
    <line x1="-220" y1="62" x2="220" y2="62" stroke="#3D2418" stroke-width="1.5"/>
    <line x1="-180" y1="66" x2="180" y2="66" stroke="#D4AF37" stroke-width="0.75"/>
  </g>

  <!-- Document Title & Form Type -->
  <g transform="translate(400, 220)" text-anchor="middle">
    <rect x="-190" y="-18" width="380" height="34" fill="#3D2418" rx="6"/>
    <text x="0" y="5" font-size="13" font-weight="bold" fill="#FFF" letter-spacing="1.5">FORM-IV TRANSIT PASS &amp; ORIGIN CERTIFICATE</text>
    <text x="0" y="35" font-size="11" font-style="italic" fill="#555">[Issued under Karnataka Forest Rules 1969, Rule 145 / Karnataka Sandalwood Policy]</text>
  </g>

  <!-- Reference Strip -->
  <g transform="translate(70, 290)">
    <rect x="0" y="0" width="660" height="42" fill="#F4EDE4" stroke="#E0D5C7" rx="4"/>
    <text x="18" y="26" font-size="12" font-weight="bold" fill="#24140D">PERMIT REF: <tspan font-family="monospace" fill="#7D4F33">KFD/FORM-IV/2026-09418</tspan></text>
    <text x="440" y="26" font-size="12" font-weight="bold" fill="#24140D">LOT ID: <tspan font-family="monospace" fill="#7D4F33">KFD-SHM-LOT-2026-8819</tspan></text>
  </g>

  <!-- Certificate Body Metadata Grid -->
  <g transform="translate(70, 360)" font-size="12">
    <!-- Row 1 -->
    <text x="20" y="25" fill="#666">1. Issuing Forest Depot:</text>
    <text x="230" y="25" font-weight="bold" fill="#24140D">Shimoga Government Sandal Depot, Division #04</text>

    <!-- Row 2 -->
    <text x="20" y="60" fill="#666">2. Authorized Legal Consignee:</text>
    <text x="230" y="60" font-weight="bold" fill="#24140D">Karnataka Soaps &amp; Detergents Ltd (KSDL) - Mysore Unit</text>

    <!-- Row 3 -->
    <text x="20" y="95" fill="#666">3. Consignment Description:</text>
    <text x="230" y="95" font-weight="bold" fill="#24140D">Santalum album (Pure Heartwood Billets, Stamped Grade A)</text>

    <!-- Row 4 -->
    <text x="20" y="130" fill="#666">4. Certified Net Quantity:</text>
    <text x="230" y="130" font-weight="bold" font-family="monospace" fill="#24140D">250.00 KGS (Two Hundred &amp; Fifty Kilograms)</text>

    <!-- Row 5 -->
    <text x="20" y="165" fill="#666">5. Government Auction Allotment:</text>
    <text x="230" y="165" font-weight="bold" font-family="monospace" fill="#7D4F33">AUC-SHM-2026-0941 (Lot #42)</text>

    <!-- Row 6 -->
    <text x="20" y="200" fill="#666">6. Transit Route Authorized:</text>
    <text x="230" y="200" font-weight="bold" fill="#24140D">Shimoga Depot ➔ NH-206 ➔ Arsikere ➔ Mysuru KSDL Works</text>

    <!-- Row 7 -->
    <text x="20" y="235" fill="#666">7. Period of Transit Validity:</text>
    <text x="230" y="235" font-weight="bold" fill="#24140D">From: 04-MAR-2026 &nbsp;|&nbsp; Valid Until: 30-APR-2026</text>

    <!-- Row 8 -->
    <text x="20" y="270" fill="#666">8. Biometric Checkpost Seal:</text>
    <text x="230" y="270" font-weight="bold" font-family="monospace" fill="#1C4B27">KFD-E-CHECKPOST-VERIFIED-PASS-OK</text>
  </g>

  <!-- Security Seal & Stamps Section -->
  <g transform="translate(100, 680)">
    <!-- Official Round Stamp -->
    <circle cx="80" cy="80" r="65" fill="none" stroke="#1D4ED8" stroke-width="2.5" stroke-dasharray="8,3"/>
    <circle cx="80" cy="80" r="56" fill="none" stroke="#1D4ED8" stroke-width="1"/>
    <text x="80" y="45" font-size="8" font-weight="bold" text-anchor="middle" fill="#1D4ED8" letter-spacing="1.5">FOREST RANGE OFFICER</text>
    <text x="80" y="85" font-size="12" font-weight="bold" text-anchor="middle" fill="#1D4ED8">APPROVED</text>
    <text x="80" y="100" font-size="9" text-anchor="middle" fill="#1D4ED8">04 MAR 2026</text>
    <text x="80" y="118" font-size="8" font-weight="bold" text-anchor="middle" fill="#1D4ED8">SHIMOGA DEPOT</text>

    <!-- Digital QR Stamp Box -->
    <g transform="translate(420, 15)">
      <rect x="0" y="0" width="130" height="130" fill="#FFF" stroke="#3D2418" stroke-width="1.5" rx="6"/>
      <!-- QR Representation Pattern -->
      <rect x="15" y="15" width="30" height="30" fill="#3D2418"/>
      <rect x="20" y="20" width="20" height="20" fill="#FFF"/>
      <rect x="25" y="25" width="10" height="10" fill="#3D2418"/>
      <rect x="85" y="15" width="30" height="30" fill="#3D2418"/>
      <rect x="90" y="20" width="20" height="20" fill="#FFF"/>
      <rect x="95" y="25" width="10" height="10" fill="#3D2418"/>
      <rect x="15" y="85" width="30" height="30" fill="#3D2418"/>
      <rect x="20" y="90" width="20" height="20" fill="#FFF"/>
      <rect x="25" y="95" width="10" height="10" fill="#3D2418"/>
      <rect x="55" y="30" width="18" height="18" fill="#3D2418"/>
      <rect x="55" y="60" width="20" height="12" fill="#3D2418"/>
      <rect x="85" y="60" width="15" height="18" fill="#3D2418"/>
      <text x="65" y="145" font-size="8" font-family="monospace" text-anchor="middle" fill="#666">SCAN FOR PUBLIC LEDGER</text>
    </g>
  </g>

  <!-- Signatures Line -->
  <g transform="translate(100, 880)" font-size="11">
    <line x1="0" y1="0" x2="200" y2="0" stroke="#3D2418" stroke-width="1"/>
    <text x="100" y="16" text-anchor="middle" font-weight="bold" fill="#24140D">Range Forest Officer Signature</text>
    <text x="100" y="30" text-anchor="middle" fill="#666">Government Sandal Depot, Shimoga</text>

    <line x1="380" y1="0" x2="580" y2="0" stroke="#3D2418" stroke-width="1"/>
    <text x="480" y="16" text-anchor="middle" font-weight="bold" fill="#24140D">Authorized Receiver (KSDL)</text>
    <text x="480" y="30" text-anchor="middle" fill="#666">Materials Custody Superintendent</text>
  </g>

  <!-- Footer Disclaimer Bar -->
  <g transform="translate(400, 980)" text-anchor="middle">
    <rect x="-350" y="-15" width="700" height="30" fill="#EDE4D6" rx="4"/>
    <text x="0" y="4" font-size="9" font-weight="bold" fill="#5C3A21" letter-spacing="0.5">
      DEMONSTRATION SPECIMEN • IDEATHON 2026 DIGITAL SANDALWOOD TRACEABILITY &amp; AUTHENTICITY
    </text>
  </g>
</svg>
`)}`;
