import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Send,
  FileDown,
  CheckCircle2,
  Calendar,
  Wallet,
  AlertCircle,
  TrendingDown,
  ArrowRight,
  Printer,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { Debtor } from '../types';

interface DossierDrawerProps {
  debtor: Debtor;
  isOpen: boolean;
  onClose: () => void;
  onAssignAo: (debtor: Debtor) => void;
}

export const DossierDrawer: React.FC<DossierDrawerProps> = ({
  debtor,
  isOpen,
  onClose,
  onAssignAo,
}) => {
  const [copiedNotification, setCopiedNotification] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);

  if (!isOpen) return null;

  const handleSendWhatsapp = () => {
    onAssignAo(debtor);
  };

  const handleExportPdf = () => {
    setDownloadingPdf(true);
    setTimeout(() => {
      setDownloadingPdf(false);
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 3500);
      window.print();
    }, 800);
  };

  const { dossier } = debtor;

  return (
    <>
      {/* Slide-over Backdrop on mobile/tablet */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/20 backdrop-blur-2xs z-40 lg:hidden animate-in fade-in duration-200"
        aria-hidden="true"
      />

      {/* Main Slide-Over Drawer */}
      <div
        id="slide-over-dossier-panel"
        className="fixed inset-y-0 right-0 z-50 w-full max-w-[500px] bg-white border-l border-slate-200/90 shadow-2xl flex flex-col font-sans overflow-hidden animate-in slide-in-from-right duration-250 ease-out"
      >
        {/* Sleek Top Header (Big SaaS Minimalist Style) */}
        <div className="p-4 sm:p-5 border-b border-slate-100 bg-white/95 backdrop-blur-xs sticky top-0 z-20">
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 text-[10.5px] font-semibold text-emerald-700 bg-emerald-50/90 border border-emerald-200/80 px-2 py-0.5 rounded-full">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <span>UU PDP CONSENTED DOSSIER</span>
              </span>
              <span className="text-[10px] font-mono font-medium text-slate-500 bg-slate-100/80 border border-slate-200/70 px-2 py-0.5 rounded-md">
                {debtor.pdpCode}-BPR
              </span>
            </div>

            <button
              id="btn-close-dossier"
              onClick={onClose}
              className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
              title="Tutup Dossier"
              aria-label="Tutup Dossier"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight font-display">
              {debtor.name}
            </h2>
            <div className="text-xs text-slate-500 mt-1 flex items-center gap-2 flex-wrap">
              <span>
                Debitur: <strong className="text-slate-800 font-semibold">{debtor.owner}</strong>
              </span>
              <span className="text-slate-300">•</span>
              <span>
                Plafon:{' '}
                <strong className="text-slate-800 font-semibold tnum">
                  Rp {debtor.plafon.toLocaleString('id-ID')}
                </strong>
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500">{debtor.market}</span>
            </div>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-xs bg-[#fafbfc]">
          {/* UU PDP Legal Guarantee Callout */}
          <div className="bg-blue-50/60 border border-blue-100/90 rounded-xl p-3.5 flex items-start gap-3 shadow-2xs">
            <div className="w-7 h-7 rounded-lg bg-blue-100/80 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-slate-900 text-xs leading-snug">
                Data Diproses Berdasarkan Persetujuan Digital Debitur (UU PDP No. 27/2022)
              </div>
              <div className="text-[11.5px] text-slate-600 leading-relaxed mt-1">
                Debitur memberikan hak audit arus kas mutasi bank &amp; buku piutang warung untuk asistensi pemeliharaan kredit Kol-1.
              </div>
            </div>
          </div>

          {/* FINANCIAL EVIDENCE: PROYEKSI 30 HARI */}
          <div className="border border-slate-200/80 rounded-xl p-4 bg-white shadow-2xs space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-3.5 bg-blue-600 rounded-full"></span>
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-tight">
                  Financial Evidence: Proyeksi 30 Hari
                </h3>
              </div>
              <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 border border-slate-200/70 px-2 py-0.5 rounded-full font-mono">
                SARIMA Model
              </span>
            </div>

            {/* 3 Metric Sub-Boxes */}
            <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
              <div className="bg-slate-50/80 border border-slate-200/70 rounded-lg p-2.5 text-center">
                <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide">
                  KAS SIAP PAKAI
                </div>
                <div className="text-xs font-bold text-slate-900 mt-1 tnum">
                  Rp {dossier.kasSiapPakai.toLocaleString('id-ID')}
                </div>
              </div>
              <div className="bg-rose-50/60 border border-rose-200/70 rounded-lg p-2.5 text-center">
                <div className="text-[10px] font-semibold text-rose-700 uppercase tracking-wide">
                  BUFFER LIKUIDITAS
                </div>
                <div className="text-xs font-bold text-rose-600 mt-1">
                  {dossier.bufferLikuiditas}
                </div>
              </div>
              <div className="bg-slate-50/80 border border-slate-200/70 rounded-lg p-2.5 text-center">
                <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide">
                  JATUH TEMPO BPR
                </div>
                <div className="text-xs font-bold text-slate-900 mt-1">
                  {dossier.jatuhTempoBpr}
                </div>
              </div>
            </div>

            {/* SARIMA Confidence Curve SVG Chart */}
            <div className="bg-[#0a121e] rounded-xl p-3.5 text-white relative overflow-hidden border border-slate-800 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-medium text-slate-300">
                  Kurva Solvensi SARIMA (P20–P80 Confidence Ribbon)
                </span>
                <span className="text-[10.5px] font-semibold text-rose-400 bg-rose-950/60 border border-rose-800/80 px-2 py-0.5 rounded">
                  Batas Kritis: Rp {dossier.batasKritis.toLocaleString('id-ID')}
                </span>
              </div>

              <div className="w-full h-36 relative mt-1">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 420 120" preserveAspectRatio="none">
                  <defs>
                    {/* Confidence Ribbon Gradient */}
                    <linearGradient id="ribbonGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.05" />
                    </linearGradient>
                    <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#60a5fa" />
                      <stop offset="60%" stopColor="#3b82f6" />
                      <stop offset="78%" stopColor="#ef4444" />
                      <stop offset="100%" stopColor="#dc2626" />
                    </linearGradient>
                  </defs>

                  {/* Grid Lines */}
                  <line x1="20" y1="20" x2="400" y2="20" stroke="#1e293b" strokeDasharray="3 3" />
                  <line x1="20" y1="60" x2="400" y2="60" stroke="#1e293b" strokeDasharray="3 3" />
                  <line x1="20" y1="90" x2="400" y2="90" stroke="#1e293b" strokeDasharray="3 3" />

                  {/* Batas Kritis Threshold Line (Horizontal Red Line) */}
                  <line
                    x1="20"
                    y1="75"
                    x2="400"
                    y2="75"
                    stroke="#ef4444"
                    strokeWidth="1.5"
                    strokeDasharray="4 2"
                  />

                  {/* P20–P80 Confidence Band (Ribbon Area) */}
                  <polygon
                    points="20,24 80,28 150,38 230,55 300,82 340,96 400,105 400,118 340,112 300,98 230,75 150,56 80,42 20,38"
                    fill="url(#ribbonGradient)"
                  />

                  {/* Primary Projection Curve */}
                  <path
                    d="M 20 30 Q 90 34 160 48 T 290 88 T 350 102 T 400 110"
                    fill="none"
                    stroke="url(#lineGrad)"
                    strokeWidth="2.5"
                  />

                  {/* Critical Dip Node at day 22 */}
                  <circle cx="308" cy="92" r="4.5" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />

                  {/* Callout Label for Deficit */}
                  <g transform="translate(308, 92)">
                    <rect x="-38" y="-22" width="76" height="17" rx="4" fill="#ef4444" />
                    <text
                      x="0"
                      y="-10"
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="9.5"
                      fontWeight="bold"
                    >
                      Defisit (22 Hari)
                    </text>
                  </g>
                </svg>
              </div>

              {/* X Axis Labels */}
              <div className="flex justify-between text-[10px] text-slate-400 mt-2 px-1 border-t border-slate-800/80 pt-1.5 font-mono">
                <span>Hari 0 (Hari Ini)</span>
                <span>Hari 10</span>
                <span className="text-amber-400 font-semibold">Hari 20 (Faktur Wings)</span>
                <span className="text-red-400 font-semibold">Hari 30 (Angsuran BPR)</span>
              </div>
            </div>

            <p className="text-[11.5px] text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200/70">
              {dossier.dropExplanation}
            </p>
          </div>

          {/* AGING SCHEDULE: PIUTANG WARUNG */}
          <div className="border border-slate-200/80 rounded-xl p-4 bg-white shadow-2xs space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-3.5 bg-emerald-600 rounded-full"></span>
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-tight">
                  Aging Schedule: Piutang Warung (Rp {dossier.totalPiutang.toLocaleString('id-ID')})
                </h3>
              </div>
              <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 border border-slate-200/70 px-2 py-0.5 rounded-full">
                {dossier.totalWarung} Warung Kelontong
              </span>
            </div>

            {/* Progress Breakdown Bars */}
            <div className="space-y-3">
              {dossier.agingCategories.map((cat, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-[11px] mb-1.5">
                    <span className="font-medium text-slate-700">{cat.range} ({cat.label})</span>
                    <span className="font-bold text-slate-900 tnum">
                      {cat.percent}% (Rp {cat.amount.toLocaleString('id-ID')})
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full ${cat.color} rounded-full transition-all duration-500`}
                      style={{ width: `${cat.percent}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-amber-50/70 border border-amber-200/80 rounded-lg p-3 text-[11px] text-amber-950 leading-relaxed flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>{dossier.quickRescueTarget}</span>
            </div>
          </div>

          {/* PRESCRIPTIVE BPR ACTION PROTOCOL */}
          <div className="border border-emerald-200 rounded-xl p-4 bg-emerald-50/40 shadow-2xs">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <h3 className="font-bold text-emerald-950 text-xs uppercase tracking-tight">
                Prescriptive BPR Action Protocol
              </h3>
            </div>
            <p className="text-[11.5px] text-emerald-950/90 leading-relaxed">
              {dossier.prescriptiveProtocol}
            </p>
          </div>

          {copiedNotification && (
            <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs p-3 rounded-lg flex items-center gap-2 animate-in fade-in duration-150">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Dokumen Dossier Komite telah disiapkan untuk dicetak/diekspor ke PDF.</span>
            </div>
          )}
        </div>

        {/* Footer CTA Buttons (Big SaaS Style) */}
        <div className="p-4 sm:p-5 border-t border-slate-200/80 bg-white space-y-2.5 sticky bottom-0 z-20 shadow-xs">
          <button
            id="btn-kirim-instruksi-wa"
            onClick={handleSendWhatsapp}
            className="w-full flex items-center justify-center gap-2 bg-[#005137] hover:bg-[#003d29] text-white text-xs font-bold py-2.5 px-4 rounded-lg transition-all shadow-2xs hover:shadow-xs cursor-pointer active:scale-[0.99]"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Kirim Instruksi ke AO via WhatsApp</span>
          </button>

          <button
            id="btn-ekspor-pdf-komite"
            onClick={handleExportPdf}
            disabled={downloadingPdf}
            className="w-full flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-xs font-semibold py-2.5 px-4 rounded-lg transition-all shadow-2xs hover:border-slate-300 cursor-pointer disabled:opacity-50 active:scale-[0.99]"
          >
            <FileDown className="w-3.5 h-3.5 text-slate-600" />
            <span>{downloadingPdf ? 'Mengekspor PDF Komite...' : 'Ekspor PDF Komite'}</span>
          </button>
        </div>
      </div>
    </>
  );
};
