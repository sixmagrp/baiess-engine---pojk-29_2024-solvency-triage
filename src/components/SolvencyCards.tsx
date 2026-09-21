import React from 'react';
import { Check, Eye, AlertCircle } from 'lucide-react';

interface SolvencyCardsProps {
  selectedZone: string | null;
  onSelectZone: (zone: string | null) => void;
}

export const SolvencyCards: React.FC<SolvencyCardsProps> = ({
  selectedZone,
  onSelectZone,
}) => {
  return (
    <div id="section-solvency-zones" className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* ZONA HIJAU */}
      <div
        id="card-zona-hijau"
        onClick={() => onSelectZone(selectedZone === 'safe' ? null : 'safe')}
        className={`bg-white rounded-lg p-4 border transition-all cursor-pointer shadow-2xs relative ${
          selectedZone === 'safe'
            ? 'ring-2 ring-emerald-500 border-emerald-500'
            : 'border-slate-200 hover:border-emerald-300'
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_6px_#10b981]"></span>
            <span className="text-xs font-bold text-slate-900 tracking-tight">
              ZONA HIJAU: SOLVENSI STABIL
            </span>
          </div>
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
            77% Portofolio
          </span>
        </div>

        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-3xl font-extrabold text-slate-900 tnum tracking-tight font-display">
            385
          </span>
          <span className="text-xs font-medium text-slate-600">
            Debitur Mikro Terverifikasi
          </span>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed mb-4 min-h-[38px]">
          Cadangan kas operasional <span className="font-semibold text-slate-800">≥ 25 hari</span> ke depan. Inflow harian stabil dengan rasio perputaran piutang (CCC) ≤ 12 hari.
        </p>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
          <span className="text-slate-500 font-medium">
            Proyeksi default: &lt; 0.4%
          </span>
          <span className="flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            <Check className="w-3 h-3 text-emerald-600" />
            Kualitas Kol-1
          </span>
        </div>
      </div>

      {/* ZONA KUNING */}
      <div
        id="card-zona-kuning"
        onClick={() => onSelectZone(selectedZone === 'warning' ? null : 'warning')}
        className={`bg-white rounded-lg p-4 border transition-all cursor-pointer shadow-2xs relative ${
          selectedZone === 'warning'
            ? 'ring-2 ring-amber-500 border-amber-500'
            : 'border-slate-200 hover:border-amber-300'
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_6px_#f59e0b]"></span>
            <span className="text-xs font-bold text-slate-900 tracking-tight">
              ZONA KUNING: WASPADA LIKUIDITAS
            </span>
          </div>
          <span className="text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
            17% Portofolio
          </span>
        </div>

        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-3xl font-extrabold text-slate-900 tnum tracking-tight font-display">
            85
          </span>
          <span className="text-xs font-medium text-slate-600">
            Debitur Butuh Monitoring
          </span>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed mb-4 min-h-[38px]">
          Kas tersisa <span className="font-semibold text-slate-800">14–21 hari</span>. Terdeteksi penurunan net inflow 10%–20% akibat piutang pelanggan warung yang mulai molor.
        </p>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
          <span className="text-slate-500 font-medium">
            Intervensi: Pengingat Halus PWA
          </span>
          <span className="flex items-center gap-1 text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
            <Eye className="w-3 h-3 text-amber-600" />
            Watchlist AO
          </span>
        </div>
      </div>

      {/* ZONA MERAH */}
      <div
        id="card-zona-merah"
        onClick={() => onSelectZone(selectedZone === 'critical' ? null : 'critical')}
        className={`bg-white rounded-lg p-4 border transition-all cursor-pointer shadow-2xs relative ${
          selectedZone === 'critical'
            ? 'ring-2 ring-red-500 border-red-500'
            : 'border-slate-200 hover:border-red-300'
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 shadow-[0_0_6px_#ef4444]"></span>
            <span className="text-xs font-bold text-slate-900 tracking-tight">
              ZONA MERAH: INTERVENSI KRITIS
            </span>
          </div>
          <span className="text-[11px] font-bold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
            6% Portofolio
          </span>
        </div>

        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-3xl font-extrabold text-slate-900 tnum tracking-tight font-display">
            30
          </span>
          <span className="text-xs font-medium text-slate-600">
            Debitur Membutuhkan Tindakan
          </span>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed mb-4 min-h-[38px]">
          Peringatan <span className="font-semibold text-red-600">Horizon 21–30 Hari</span>. Arus kas memproyeksikan defisit sebelum jatuh tempo angsuran bulanan BPR.
        </p>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
          <span className="text-slate-500 font-medium">
            Tindakan: Restrukturisasi / AO Push
          </span>
          <span className="flex items-center gap-1 text-red-700 font-semibold bg-red-50 px-2 py-0.5 rounded border border-red-200">
            <AlertCircle className="w-3 h-3 text-red-600" />
            Prioritas 1
          </span>
        </div>
      </div>
    </div>
  );
};
