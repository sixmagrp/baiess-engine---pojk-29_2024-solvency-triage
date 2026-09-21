export interface Debtor {
  id: string; // e.g. "#BPR-8841"
  name: string;
  owner: string;
  market: string;
  city: string;
  sector: string;
  initials: string;
  initialsBg: string;
  plafon: number;
  angsuran: number;
  bufferDays: number;
  safeDays: number;
  bufferStatus: 'critical' | 'warning' | 'safe';
  diagnosa: string;
  pdpCode: string;
  kasBersih: number;
  estimasiKritisDate: string;
  estimasiKritisDays: number;
  isDueDateNote?: string;
  riskScore: number;
  dossier: {
    kasSiapPakai: number;
    bufferLikuiditas: string;
    jatuhTempoBpr: string;
    batasKritis: number;
    defisitDay: number;
    dropExplanation: string;
    totalPiutang: number;
    totalWarung: number;
    agingCategories: Array<{
      range: string;
      label: string;
      percent: number;
      amount: number;
      color: string;
    }>;
    quickRescueTarget: string;
    prescriptiveProtocol: string;
  };
}

export interface AccountOfficer {
  id: string;
  name: string;
  initials: string;
  market: string;
  debtorCount: number;
  status: 'Aktif Lapangan' | 'Terkonfirmasi' | 'Siaga';
  phone: string;
}

export interface PdpLogEntry {
  id: string;
  debtorName: string;
  timestamp: string;
  action: string;
  hash: string;
  status: 'Valid' | 'Proses';
}

// Financial State Engine - Fitur B
export interface FinancialState {
  // Metrik 1: Posisi Kas Efektif
  effectiveCash: {
    totalLiquid: number;
    urgentObligation: number;
    availableForUse: number;
  };
  
  // Metrik 2: Batas Penyangga Kas Aman
  cashBuffer: {
    bufferMargin: number;
    bufferDays: number;
    bufferThreshold: number;
    status: 'safe' | 'warning' | 'critical';
  };
  
  // Metrik 3: Siklus Konversi Kas (CCC)
  cashConversionCycle: {
    dio: number; // Days Inventory Outstanding (Stok)
    dso: number; // Days Sales Outstanding (Piutang Warung)
    dpo: number; // Days Payable Outstanding (Utang Prinsipal)
    ccc: number; // CCC = DIO + DSO - DPO
  };
  
  // Metrik 4: Buku Besar Piutang Aktif
  accountsReceivable: {
    totalAr: number;
    arAging: Array<{
      range: string;
      label: string;
      days: number;
      amount: number;
      percent: number;
      color: string;
    }>;
    overdueAmount: number;
    overdueCount: number;
  };
  
  // Metadata
  lastUpdated: string; // Timestamp
  updateLatency: number; // ms
  auditTrail: Array<{
    transactionId: string;
    timestamp: string;
    amount: number;
    category: 'inflow' | 'outflow' | 'ar-aging';
    description: string;
  }>;
}

// Tactical Cashflow Forecasting - Fitur C
export interface CashFlowForecast {
  generatedAt: string;
  horizon: number; // days (7, 14, 30)
  projections: Array<{
    date: string;
    dayNumber: number;
    base: number; // Median projection
    upperBound: number; // 80% confidence
    lowerBound: number; // 20% confidence (pessimistic)
    scheduledPayments: Array<{
      type: 'bpr-angsuran' | 'supplier-invoice' | 'warung-pelunasan';
      name: string;
      amount: number;
    }>;
    confidence: 'high' | 'medium' | 'low';
  }>;
  criticalBreachDate: string | null; // Tanggal kas akan mencapai buffer kritis
  dataPoints: number; // Historical data points used
  modelType: 'sarima' | 'exponential-smoothing';
  dataAge: number; // days (< 14 = rendah confidence)
}

// Early Warning System - Fitur D
export interface EarlyWarningAlert {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  horizon: '14-day-tactical' | '21-30-day-structural';
  title: string;
  description: string;
  evidenceTrigger: {
    metric: string;
    currentValue: number;
    threshold: number;
    variance: number;
    unit: string;
  };
  affectedEntity: string; // Warung name, Invoice ID, etc.
  projectedDate: string;
  daysUntilCritical: number;
  recommendedAction: string;
  generatedAt: string;
  isDuplicate: boolean; // For deduplication
  deduplicationGroupId: string; // Group similar alerts
}

// Financial Copilot - Fitur E
export interface CopilotRecommendation {
  id: string;
  scenario: 'low-cash-high-ar' | 'approaching-bpr-due' | 'slow-moving-inventory' | 'seasonal-opportunity';
  priority: 'high' | 'medium' | 'low';
  message: string; // Natural language recommendation
  rationale: {
    currentCashPosition: number;
    projectedCashPosition: number;
    constraint: string;
    actionItem: string;
    whatsappTemplate?: string; // Pre-filled WhatsApp message
  };
  generatedAt: string;
  expiresAt: string; // 24 hours
  guardrails: {
    isVerified: boolean;
    derivedFromModel: boolean;
    hasHallucinationCheck: boolean;
  };
}

// Internal Financing Readiness - Fitur F
export interface FinancingReadinessModule {
  merchant: {
    id: string;
    name: string;
    owner: string;
  };
  readinessScore: {
    profileCompleteness: number; // 0-100
    transactionConsistency: number; // 0-100
    paymentReliability: number; // 0-100
    workingCapitalStability: number; // 0-100
    overallScore: number; // 0-100
  };
  financialMetrics: {
    avgMonthlyCashTurnover: number;
    avgDailyBalance: number;
    balanceStability: number; // std dev
    debtServiceCoverageProxy: number; // Omzet / Angsuran
    workingCapitalNeed: number; // Based on CCC
  };
  documentation: {
    profileAge: number; // days
    transactionDays: number; // >= 60
    auditableDrill: boolean;
    complianceFlags: string[];
  };
  regulatoryNote: string; // "INTERNAL DECISION SUPPORT ONLY - NOT A CREDIT SCORE"
  lastAssessed: string;
  nextReviewDate: string;
}

// Merchant Context (for dashboard)
export interface MerchantContext {
  id: string;
  name: string;
  owner: string;
  market: string;
  city: string;
  sector: string;
  phone: string;
  bprCredential: {
    plafon: number;
    angsuran: number;
    dueDate: string;
    dueDaysRemaining: number;
  };
  financialState: FinancialState;
  cashFlowForecast: CashFlowForecast;
  earlyWarnings: EarlyWarningAlert[];
  copilotRecommendations: CopilotRecommendation[];
  financingReadiness: FinancingReadinessModule;
}
