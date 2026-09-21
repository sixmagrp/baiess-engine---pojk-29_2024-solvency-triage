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
