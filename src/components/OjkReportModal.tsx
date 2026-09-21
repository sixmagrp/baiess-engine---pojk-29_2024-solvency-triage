import React, { useState } from 'react';
import { X, FileText, Download, CheckCircle2, ShieldCheck, Printer } from 'lucide-react';
import { Debtor } from '../types';

interface OjkReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  debtors: Debtor[];
}

export const OjkReportModal: React.FC<OjkReportModalProps> = ({
  isOpen,
  onClose,
  debtors,
}) => {
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    setDownloaded(true);
    setTimeout(() => {
      window.print();
    }, 400);
  };

  return (
    <div
      id="modal-ojk-report"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150"
    >
      <div className="bg-white rounded-xl border border-slate-200 w-full max-w-[680px] shadow-2xl overflow-hidden font-sans flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-700" />
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Laporan Kepatuhan POJK 29/2024 &amp; Early-Warning Triage
              </h2>
              <p className="text-[11px] text-slate-500">
                Dokumen Resmi Pengawasan Internal BPR Mitra Jatim • Audit Ready
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

        {/* Document Preview */}
        <div className="p-6 flex-1 overflow-y-auto space-y-4 text-xs bg-slate-50">
          <div className="bg-white border border-slate-200 p-6 rounded-lg shadow-sm space-y-4 text-slate-800 font-sans">
            {/* Kop Surat */}
            <div className="border-b-2 border-slate-900 pb-3 text-center space-y-1">
              <div className="font-bold text-sm tracking-wider uppercase text-slate-900">
                PT BANK PEREKONOMIAN RAKYAT MITRA JATIM
              </div>
              <div className="text-[11px] text-slate-600">
                Anggota DPD Perbarindo Jawa Timur • Berizin &amp; Diawasi Otoritas Jasa Keuangan (OJK)
              </div>
              <div className="text-[10px] font-mono text-slate-500">
                No. Registrasi Pengawasan: POJK-29-BPR-2024-SURABAYA-8841 • Hash: 7f9a88ebpr41
              </div>
            </div>

            {/* Document Title */}
            <div className="text-center py-1">
              <h3 className="font-bold text-sm text-slate-900 underline">
                BERITA ACARA EARLY-WARNING SOLVENCY TRIAGE (HORIZON 21–30 HARI)
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Periode Pemantauan: September – Oktober 2026 • Cut-off Data: 21 September 2026
              </p>
            </div>

            {/* Executive Summary */}
            <div className="bg-slate-50 p-3 rounded border border-slate-200 space-y-1.5">
              <div className="font-bold text-slate-900 text-xs">Ringkasan Portofolio Mikro:</div>
              <ul className="list-disc pl-4 space-y-1 text-[11.5px] text-slate-700">
                <li>Total Debitur Terpantau: <strong>500 Debitur</strong> (Total Baki Debet: <strong>Rp 15.200.000.000</strong>)</li>
                <li>Debitur Zona Hijau (Solvensi Stabil, Buffer &gt; 25 Hari): <strong>385 Debitur (77%)</strong></li>
                <li>Debitur Zona Kuning (Waspada Likuiditas, Buffer 14–21 Hari): <strong>85 Debitur (17%)</strong></li>
                <li>Debitur Zona Merah (Intervensi Kritis Horizon 21–30 Hari): <strong>30 Debitur (6%)</strong></li>
                <li>Tingkat Kepatuhan Digital UU PDP No. 27/2022: <strong>78.0% (390 Debitur e-Sign Valid)</strong></li>
                <li>Potensi Non-Performing Loan (NPL) Dicegah MTD: <strong>Rp 56.000.000</strong></li>
              </ul>
            </div>

            {/* Debtor Critical Table */}
            <div>
              <div className="font-bold text-slate-900 text-xs mb-1.5">
                Daftar Debitur Prioritas Tindakan Mitigasi Kolektibilitas 1:
              </div>
              <table className="w-full text-left border border-slate-200 text-[11px]">
                <thead className="bg-slate-100 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-1.5 border-r border-slate-200">Debitur / ID</th>
                    <th className="p-1.5 border-r border-slate-200">Plafon</th>
                    <th className="p-1.5 border-r border-slate-200">Buffer Kas</th>
                    <th className="p-1.5 border-r border-slate-200">Estimasi Kritis</th>
                    <th className="p-1.5">Rekomendasi Komite</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {debtors.slice(0, 3).map((d) => (
                    <tr key={d.id}>
                      <td className="p-1.5 border-r border-slate-200">
                        <div className="font-bold">{d.name}</div>
                        <div className="text-[10px] text-slate-500">{d.owner} • {d.market}</div>
                      </td>
                      <td className="p-1.5 border-r border-slate-200 font-mono">
                        Rp {d.plafon.toLocaleString('id-ID')}
                      </td>
                      <td className="p-1.5 border-r border-slate-200 text-red-600 font-bold font-mono">
                        {d.bufferDays} Hari
                      </td>
                      <td className="p-1.5 border-r border-slate-200">
                        {d.estimasiKritisDate}
                      </td>
                      <td className="p-1.5 text-[10.5px]">
                        Restrukturisasi termin piutang warung &amp; pendampingan AO lapangan.
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Signatures */}
            <div className="pt-4 grid grid-cols-2 text-center text-xs">
              <div>
                <div className="text-slate-500">Disusun oleh:</div>
                <div className="font-bold mt-8 text-slate-900">Pak Bambang</div>
                <div className="text-[10.5px] text-slate-500">Kadiv Manajemen Risiko BPR</div>
              </div>
              <div>
                <div className="text-slate-500">Disetujui oleh:</div>
                <div className="font-bold mt-8 text-slate-900">Direksi Kepatuhan &amp; Kredit</div>
                <div className="text-[10.5px] text-slate-500">BPR Mitra Jatim</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Format Kepatuhan OJK Terverifikasi</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded cursor-pointer"
            >
              Tutup
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded transition-colors shadow-2xs cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak / Simpan PDF OJK</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
