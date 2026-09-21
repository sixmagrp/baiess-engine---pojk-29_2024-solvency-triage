import React, { useState } from 'react';
import { X, FileCheck, Printer, CheckCircle2, Shield } from 'lucide-react';
import { Debtor } from '../types';

interface SkDireksiModalProps {
  isOpen: boolean;
  onClose: () => void;
  debtor: Debtor;
}

export const SkDireksiModal: React.FC<SkDireksiModalProps> = ({ isOpen, onClose, debtor }) => {
  const [signed, setSigned] = useState(false);

  if (!isOpen) return null;

  return (
    <div
      id="modal-sk-direksi"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150"
    >
      <div className="bg-white rounded-xl border border-slate-200 w-full max-w-[580px] shadow-2xl overflow-hidden font-sans flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-700" />
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Draft Surat Keputusan (SK) Direksi BPR
              </h2>
              <p className="text-[11px] text-slate-500">
                Persetujuan Fleksibilitas Restrukturisasi Angsuran Kol-1
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
        <div className="p-6 overflow-y-auto space-y-4 text-xs bg-slate-50">
          <div className="bg-white p-5 border border-slate-200 rounded-lg shadow-2xs space-y-3">
            <div className="text-center border-b border-slate-200 pb-2">
              <div className="font-bold text-xs uppercase tracking-wider text-slate-900">
                SURAT KEPUTUSAN DIREKSI BPR MITRA JATIM
              </div>
              <div className="text-[11px] font-mono text-slate-500">
                Nomor: SK-DIR/BPR-MJ/POJK29/IX/2026/8841
              </div>
            </div>

            <p className="text-slate-700 leading-relaxed">
              Menindaklanjuti hasil rekomendasi <strong>Early-Warning Solvency Triage (POJK 29/2024)</strong> terhadap debitur:
            </p>

            <div className="bg-slate-50 p-2.5 rounded border border-slate-200 space-y-1 font-mono text-[11px]">
              <div>Nama Usaha : <strong>{debtor.name}</strong></div>
              <div>Pemilik : <strong>{debtor.owner}</strong></div>
              <div>Pasar / Wilayah: {debtor.market} ({debtor.city})</div>
              <div>Plafon Kredit : Rp {debtor.plafon.toLocaleString('id-ID')}</div>
              <div>Status Likuiditas : Buffer {debtor.bufferDays} Hari (Horizon Kritis 21-30 Hari)</div>
            </div>

            <div className="font-bold text-slate-900 text-xs pt-1">MEMUTUSKAN &amp; MENETAPKAN:</div>
            <ol className="list-decimal pl-4 space-y-1.5 text-[11.5px] text-slate-700 leading-relaxed">
              <li>
                <strong>Pemberian Relaksasi Angsuran Bunga 10 Hari:</strong> Menggeser jadwal jatuh tempo pembayaran angsuran bulanan sebesar Rp {debtor.angsuran.toLocaleString('id-ID')} tanpa pengenaan denda pinalti kredit.
              </li>
              <li>
                <strong>Pendampingan Penagihan Piutang:</strong> Menugaskan Account Officer wilayah untuk mendampingi penagihan piutang pedagang eceran sebesar Rp {debtor.dossier.totalPiutang.toLocaleString('id-ID')}.
              </li>
              <li>
                <strong>Pemeliharaan Kualitas Kredit:</strong> Kualitas debitur tetap dicatat sebagai <strong>Kolektibilitas 1 (Lancar)</strong> pada sistem pelaporan SLIK / OJK.
              </li>
            </ol>

            {signed && (
              <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 p-2.5 rounded text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>SK Direksi telah ditandatangani secara digital dengan token OJK-CERT.</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded cursor-pointer"
          >
            Tutup
          </button>
          {!signed ? (
            <button
              onClick={() => setSigned(true)}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded transition-colors shadow-2xs cursor-pointer"
            >
              <FileCheck className="w-3.5 h-3.5" />
              <span>Tandatangani &amp; Terbitkan SK</span>
            </button>
          ) : (
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded transition-colors shadow-2xs cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak SK Direksi</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
