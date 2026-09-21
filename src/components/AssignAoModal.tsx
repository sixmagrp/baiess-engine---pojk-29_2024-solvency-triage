import React, { useState } from 'react';
import {
  X,
  Send,
  UserCheck,
  Phone,
  Copy,
  CheckCircle2,
  Calendar,
  AlertTriangle,
} from 'lucide-react';
import { Debtor, AccountOfficer } from '../types';

interface AssignAoModalProps {
  isOpen: boolean;
  onClose: () => void;
  debtor: Debtor;
  officers: AccountOfficer[];
  onConfirmAssign: (officerId: string, notes: string) => void;
}

export const AssignAoModal: React.FC<AssignAoModalProps> = ({
  isOpen,
  onClose,
  debtor,
  officers,
  onConfirmAssign,
}) => {
  const [selectedOfficerId, setSelectedOfficerId] = useState(officers[0]?.id || 'AO-01');
  const [targetDate, setTargetDate] = useState('2026-09-22');
  const [customNotes, setCustomNotes] = useState(
    `Prioritaskan pendampingan penagihan ke Toko Barokah (Rp 2.500.000) dan Warung Mak Siti (Rp 1.200.000). Ajukan keringanan pembayaran bunga 10 hari jika diperlukan.`
  );
  const [copied, setCopied] = useState(false);
  const [dispatched, setDispatched] = useState(false);

  if (!isOpen) return null;

  const currentOfficer = officers.find((o) => o.id === selectedOfficerId) || officers[0];

  const waMessage = `*INSTRUKSI DISPATCH AO - BPR MITRA JATIM*
*POJK 29/2024 Solvency Protocol*
Kepada: ${currentOfficer?.name} (${currentOfficer?.market})
Debitur: ${debtor.name} (${debtor.owner})
Plafon: Rp ${debtor.plafon.toLocaleString('id-ID')} | Angsuran: Rp ${debtor.angsuran.toLocaleString('id-ID')}/bln
Ketahanan Kas: Buffer ${debtor.bufferDays} Hari (Kritis Horizon 21-30 Hari)
Estimasi Jatuh Tempo: ${debtor.estimasiKritisDate}

*Tindakan Wajib Lapangan:*
${customNotes}

Link Dossier Digital BPR:
https://bpr-mitrajatim.id/dossier/${debtor.id.replace('#', '')}`;

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(waMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendWa = () => {
    setDispatched(true);
    onConfirmAssign(selectedOfficerId, customNotes);
    // In real app or new tab:
    // window.open(`https://wa.me/${currentOfficer?.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(waMessage)}`, '_blank');
    setTimeout(() => {
      setDispatched(false);
      onClose();
    }, 1200);
  };

  return (
    <div
      id="modal-assign-ao"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150"
    >
      <div className="bg-white rounded-xl border border-slate-200 w-full max-w-[540px] shadow-2xl overflow-hidden font-sans">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-blue-600" />
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Tugaskan Account Officer (AO) Lapangan
              </h2>
              <p className="text-[11px] text-slate-500">
                Surat Perintah Intervensi Solvensi POJK 29/2024
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
        <div className="p-4 space-y-3.5 text-xs">
          {/* Target Debtor Info Box */}
          <div className="bg-blue-50/60 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-[13px]">
                {debtor.name} ({debtor.id})
              </span>
              <span className="text-[11px] font-bold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                Buffer {debtor.bufferDays} Hari
              </span>
            </div>
            <div className="text-[11px] text-slate-600 mt-1">
              {debtor.owner} • {debtor.market} • Angsuran Rp {debtor.angsuran.toLocaleString('id-ID')}/bln (Jatuh tempo: {debtor.estimasiKritisDate})
            </div>
          </div>

          {/* Select Officer */}
          <div>
            <label className="block text-slate-700 font-bold mb-1">
              Pilih Account Officer Bertugas:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {officers.map((ao) => (
                <div
                  key={ao.id}
                  onClick={() => setSelectedOfficerId(ao.id)}
                  className={`p-2.5 rounded border cursor-pointer transition-all flex items-center gap-2.5 ${
                    selectedOfficerId === ao.id
                      ? 'border-blue-600 bg-blue-50/50 ring-1 ring-blue-600'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="w-7 h-7 rounded bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    {ao.initials}
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-slate-900 truncate">{ao.name}</div>
                    <div className="text-[10.5px] text-slate-500 truncate">{ao.market}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Target Visit Date */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-slate-700 font-bold mb-1">
                Target Kunjungan Pasar:
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="w-full text-xs p-2 border border-slate-300 rounded focus:border-blue-600 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1">
                Kontak AO Terpilih:
              </label>
              <div className="p-2 border border-slate-200 rounded bg-slate-50 text-slate-700 flex items-center gap-1.5 text-xs font-mono">
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>{currentOfficer?.phone}</span>
              </div>
            </div>
          </div>

          {/* Action Protocol Notes */}
          <div>
            <label className="block text-slate-700 font-bold mb-1">
              Catatan Instruksi Khusus Komite:
            </label>
            <textarea
              rows={3}
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              className="w-full text-xs p-2.5 border border-slate-300 rounded focus:border-blue-600 focus:outline-none leading-relaxed"
            />
          </div>

          {/* WhatsApp Preview */}
          <div className="bg-slate-900 text-slate-200 p-3 rounded-lg font-mono text-[11px] relative">
            <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1 border-b border-slate-800 pb-1">
              <span>Preview Pesan WhatsApp ke AO</span>
              <button
                onClick={handleCopyMessage}
                className="text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer font-sans"
              >
                {copied ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Tersalin' : 'Salin Pesan'}</span>
              </button>
            </div>
            <pre className="whitespace-pre-wrap font-sans text-xs text-slate-300 max-h-24 overflow-y-auto">
              {waMessage}
            </pre>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded cursor-pointer"
          >
            Batal
          </button>
          <button
            onClick={handleSendWa}
            disabled={dispatched}
            className="flex items-center gap-1.5 bg-[#005137] hover:bg-[#003d29] text-white text-xs font-bold px-4 py-2 rounded transition-colors shadow-2xs cursor-pointer disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{dispatched ? 'Mengirim ke WhatsApp...' : 'Kirim Tugas & Buka WhatsApp'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
