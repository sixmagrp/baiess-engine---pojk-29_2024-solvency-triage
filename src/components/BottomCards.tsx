import React from 'react';
import { Shield, ShieldCheck, Share2, ChevronRight, CheckCircle2 } from 'lucide-react';
import { AccountOfficer } from '../types';

interface BottomCardsProps {
  officers: AccountOfficer[];
  onOpenSkDireksi: () => void;
  onOpenPdpLogs: () => void;
  onOpenAoRoute: () => void;
}

export const BottomCards: React.FC<BottomCardsProps> = ({
  officers,
  onOpenSkDireksi,
  onOpenPdpLogs,
  onOpenAoRoute,
}) => {
  return (
    <div id="section-bottom-protocols" className="grid grid-cols-1 lg:grid-cols-3 gap-4 font-sans">
      {/* 1. ACTION PROTOCOL KOMITE */}
      <div
        id="card-action-protocol-komite"
        className="bg-white rounded-lg p-4 border border-slate-200 shadow-2xs flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-600" />
              <h3 className="text-xs font-bold text-slate-900 tracking-tight uppercase">
                Action Protocol Komite
              </h3>
            </div>
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          </div>

          <p className="text-xs text-slate-600 mb-3 leading-relaxed">
            Untuk mencegah pergeseran dari{' '}
            <span className="font-semibold text-slate-800">Kolektibilitas 1 (Lancar)</span> ke{' '}
            <span className="font-semibold text-slate-800">Kolektibilitas 2 (DPK)</span>, komite merekomendasikan:
          </p>

          <ol className="space-y-2 text-xs text-slate-700 pl-4 list-decimal leading-relaxed">
            <li>
              <span className="font-medium text-slate-800">
                Restrukturisasi penagihan warung
              </span>{' '}
              (fokus ke piutang &gt; Rp 2 Jt).
            </li>
            <li>
              <span className="font-medium text-slate-800">
                Fleksibilitas pembayaran bunga parsial 10 hari
              </span>{' '}
              tanpa denda.
            </li>
            <li>
              <span className="font-medium text-slate-800">
                Pendampingan Account Officer
              </span>{' '}
              langsung di Pasar Wonokromo.
            </li>
          </ol>
        </div>

        <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-500 font-medium">
            Estimasi Efisiensi:{' '}
            <span className="font-bold text-emerald-600">92% Kol-1</span>
          </span>
          <button
            id="btn-buat-sk-direksi"
            onClick={onOpenSkDireksi}
            className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-0.5 cursor-pointer text-xs"
          >
            <span>Buat SK Direksi</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. INTEGRITAS PERSETUJUAN PDP */}
      <div
        id="card-integritas-pdp"
        className="bg-white rounded-lg p-4 border border-slate-200 shadow-2xs flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <h3 className="text-xs font-bold text-slate-900 tracking-tight uppercase">
                Integritas Persetujuan PDP
              </h3>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          </div>

          <div className="flex items-baseline justify-between mb-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-slate-900 tnum tracking-tight font-display">
                390 / 500
              </span>
              <span className="text-[11px] text-slate-500">
                Debitur Menandatangani Digital
              </span>
            </div>
            <div className="text-right">
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                78.0% Terpenuhi
              </span>
              <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">
                Audit Lawful Basis: Valid
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded border border-slate-100 mb-2">
            Sesuai <span className="font-semibold text-slate-800">UU PDP No. 27/2022 Pasal 20</span>: Pemrosesan data transaksi bank &amp; kas UMKM dijamin dengan enkripsi end-to-end terisolasi.
          </p>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-500">110 Dalam Proses e-Sign</span>
          <button
            id="btn-lihat-log-audit-pdp"
            onClick={onOpenPdpLogs}
            className="text-blue-600 hover:text-blue-800 font-semibold hover:underline cursor-pointer text-xs"
          >
            Lihat Log Audit PDP
          </button>
        </div>
      </div>

      {/* 3. AO LAPANGAN WILAYAH SURABAYA */}
      <div
        id="card-ao-lapangan-surabaya"
        className="bg-white rounded-lg p-4 border border-slate-200 shadow-2xs flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <Share2 className="w-4 h-4 text-blue-600" />
              <h3 className="text-xs font-bold text-slate-900 tracking-tight uppercase">
                AO Lapangan Wilayah Surabaya
              </h3>
            </div>
            <button
              onClick={onOpenAoRoute}
              className="text-slate-400 hover:text-slate-600 cursor-pointer"
              title="Ekspor Rute AO"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2 mb-2">
            {officers.slice(0, 2).map((ao) => (
              <div
                key={ao.id}
                className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded bg-blue-600 text-white font-bold text-[11px] flex items-center justify-center">
                    {ao.initials}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 leading-tight">
                      {ao.name}
                    </div>
                    <div className="text-[10.5px] text-slate-500">
                      {ao.market}
                    </div>
                  </div>
                </div>
                <span
                  className={`text-[10.5px] font-semibold px-2 py-0.5 rounded border ${
                    ao.status === 'Aktif Lapangan'
                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  }`}
                >
                  {ao.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-500">Dispatch Dispatcher v1.9</span>
          <button
            id="btn-monitor-rute-ao"
            onClick={onOpenAoRoute}
            className="text-blue-600 hover:text-blue-800 font-semibold hover:underline cursor-pointer text-xs"
          >
            Monitor Rute AO
          </button>
        </div>
      </div>
    </div>
  );
};
