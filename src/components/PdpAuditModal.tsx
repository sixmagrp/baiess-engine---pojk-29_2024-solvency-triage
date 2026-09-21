import React from 'react';
import { X, ShieldCheck, Lock, CheckCircle2, FileCode } from 'lucide-react';
import { PDP_AUDIT_LOGS } from '../data/debtors';

interface PdpAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PdpAuditModal: React.FC<PdpAuditModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      id="modal-pdp-audit-logs"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150"
    >
      <div className="bg-white rounded-xl border border-slate-200 w-full max-w-[620px] shadow-2xl overflow-hidden font-sans flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Log Audit Persetujuan Digital UU PDP No. 27/2022
              </h2>
              <p className="text-[11px] text-slate-500">
                Pasal 20 &amp; 22: Bukti Keabsahan Legal Pemrosesan Data Keuangan UMKM
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded hover:bg-slate-200 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto space-y-3 text-xs">
          {/* Lawful basis notice */}
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-lg p-3 text-[11.5px] text-emerald-950 flex items-start gap-2.5">
            <Lock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Lawful Basis: Explicit Digital Consent</span>.
              Setiap debitur menandatangani persetujuan digital bermaterai kriptografis dengan enkripsi end-to-end terisolasi. BPR hanya mengakses data kas mutasi untuk tujuan pemeliharaan Kolektibilitas 1 (Lancar).
            </div>
          </div>

          <div className="divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden bg-white">
            {PDP_AUDIT_LOGS.map((log) => (
              <div key={log.id} className="p-3 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-900 text-xs">{log.debtorName}</span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    {log.status}
                  </span>
                </div>
                <div className="text-slate-600 text-[11px] mb-1.5">{log.action}</div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono bg-slate-50 p-1.5 rounded border border-slate-100">
                  <span className="truncate max-w-[320px]">{log.hash}</span>
                  <span className="text-slate-500 shrink-0">{log.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
          <span className="text-slate-500">Total 390 Debitur Telah Terverifikasi Legal</span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-xs font-semibold bg-white hover:bg-slate-100 border border-slate-300 rounded cursor-pointer text-slate-700"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
