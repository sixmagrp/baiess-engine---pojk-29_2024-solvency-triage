/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CheckCircle2, AlertCircle, TrendingUp, FileText } from 'lucide-react';
import { FinancingReadinessModule as FinancingReadinessModuleType } from '../types';

interface FinancingReadinessModuleProps {
  readinessModule: FinancingReadinessModuleType;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const getScoreColor = (score: number) => {
  if (score >= 80) return { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-900', badge: 'bg-emerald-100 text-emerald-800' };
  if (score >= 60) return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-900', badge: 'bg-amber-100 text-amber-800' };
  return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-900', badge: 'bg-red-100 text-red-800' };
};

const getScoreLabel = (score: number) => {
  if (score >= 80) return 'Siap Lengkap';
  if (score >= 60) return 'Siap Sebagian';
  return 'Belum Siap';
};

export const FinancingReadinessModule: React.FC<FinancingReadinessModuleProps> = ({
  readinessModule,
}) => {
  const overallScoreConfig = getScoreColor(readinessModule.readinessScore.overallScore);
  const metricsScores = [
    { label: 'Kelengkapan Profil', score: readinessModule.readinessScore.profileCompleteness },
    { label: 'Konsistensi Transaksi', score: readinessModule.readinessScore.transactionConsistency },
    { label: 'Reliabilitas Pembayaran', score: readinessModule.readinessScore.paymentReliability },
    { label: 'Stabilitas Modal Kerja', score: readinessModule.readinessScore.workingCapitalStability },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Kesiapan Pembiayaan Internal BPR
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Pre-screening standardized evidence pack (POJK 29/2024 compliant)
        </p>
      </div>

      {/* Regulatory Note Warning */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
        <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div className="text-sm text-blue-900">
          <p className="font-semibold">⚠️ Catatan Regulasi</p>
          <p className="text-xs mt-1">
            Modul ini adalah <strong>Internal Decision Support Pack</strong> saja. 
            BUKAN skor kredit dan TIDAK menerbitkan rekomendasi Approve/Reject berdasarkan POJK 29/2024.
          </p>
        </div>
      </div>

      {/* Overall Score Card */}
      <div className={`rounded-lg border p-6 ${overallScoreConfig.bg} ${overallScoreConfig.border}`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Score Circle */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-32 h-32 rounded-full border-8 flex items-center justify-center bg-white bg-opacity-50" style={{
              borderColor: readinessModule.readinessScore.overallScore >= 80 ? '#10b981' : readinessModule.readinessScore.overallScore >= 60 ? '#f59e0b' : '#ef4444'
            }}>
              <div className="text-center">
                <p className="text-4xl font-bold text-slate-900">
                  {readinessModule.readinessScore.overallScore}
                </p>
                <p className="text-xs text-slate-600">/ 100</p>
              </div>
            </div>
            <div className={`mt-3 px-3 py-1 rounded text-xs font-semibold ${overallScoreConfig.badge}`}>
              {getScoreLabel(readinessModule.readinessScore.overallScore)}
            </div>
          </div>

          {/* Merchant Info */}
          <div className="flex flex-col justify-center space-y-2">
            <div>
              <p className="text-xs font-medium text-slate-600 uppercase">Nama Usaha</p>
              <p className="text-sm font-semibold text-slate-900">{readinessModule.merchant.name}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-600 uppercase">Pemilik</p>
              <p className="text-sm font-semibold text-slate-900">{readinessModule.merchant.owner}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-600 uppercase">Dinilai</p>
              <p className="text-sm font-mono text-slate-900">{readinessModule.lastAssessed}</p>
            </div>
          </div>

          {/* Key Metrics Summary */}
          <div className="space-y-2">
            <div>
              <p className="text-xs font-medium text-slate-600 uppercase">Rata-rata Perputaran Kas Bulanan</p>
              <p className="text-lg font-bold text-slate-900">
                {formatCurrency(readinessModule.financialMetrics.avgMonthlyCashTurnover)}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-600 uppercase">Saldo Akhir Rata-rata</p>
              <p className="text-lg font-bold text-slate-900">
                {formatCurrency(readinessModule.financialMetrics.avgDailyBalance)}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-600 uppercase">Stabilitas Saldo</p>
              <p className="text-lg font-bold text-slate-900">
                {(readinessModule.financialMetrics.balanceStability * 100).toFixed(1)}% Std Dev
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Component Scores */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-900 mb-4">Skor Komponen Kesiapan</h3>
        <div className="space-y-3">
          {metricsScores.map((metric, idx) => {
            const config = getScoreColor(metric.score);
            const isLow = metric.score < 60;
            
            return (
              <div key={idx}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-900">{metric.label}</span>
                    {isLow && <AlertCircle className="w-4 h-4 text-amber-600" />}
                  </div>
                  <span className={`text-sm font-bold ${config.text}`}>
                    {metric.score}/100
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full transition-all ${
                      metric.score >= 80
                        ? 'bg-emerald-500'
                        : metric.score >= 60
                          ? 'bg-amber-500'
                          : 'bg-red-500'
                    }`}
                    style={{ width: `${metric.score}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Financial Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* DSCR Proxy */}
        <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-xs font-medium text-slate-600 uppercase">DSCR Proxy</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                {readinessModule.financialMetrics.debtServiceCoverageProxy.toFixed(2)}x
              </p>
            </div>
            {readinessModule.financialMetrics.debtServiceCoverageProxy >= 1.25 ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            ) : (
              <AlertCircle className="w-5 h-5 text-amber-600" />
            )}
          </div>
          <p className="text-xs text-slate-600">
            Omzet / Angsuran BPR • 
            <span className="ml-1 font-semibold">
              {readinessModule.financialMetrics.debtServiceCoverageProxy >= 1.25
                ? 'Mampu Bayar'
                : 'Perlu Perhatian'}
            </span>
          </p>
        </div>

        {/* Working Capital Need */}
        <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-xs font-medium text-slate-600 uppercase">Kebutuhan Modal Kerja</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                {formatCurrency(readinessModule.financialMetrics.workingCapitalNeed)}
              </p>
            </div>
            <TrendingUp className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-xs text-slate-600">
            Berdasarkan siklus konversi kas (CCC)
          </p>
        </div>
      </div>

      {/* Documentation Status */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-900 mb-4">Status Dokumentasi</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 bg-slate-50 rounded">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-600" />
              <span className="text-sm text-slate-900">Umur Data Profil</span>
            </div>
            <span className="text-sm font-mono font-semibold text-slate-900">
              {readinessModule.documentation.profileAge} hari
            </span>
          </div>
          <div className="flex items-center justify-between p-2 bg-slate-50 rounded">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-600" />
              <span className="text-sm text-slate-900">Hari Data Transaksi</span>
            </div>
            <span className="text-sm font-mono font-semibold text-slate-900">
              {readinessModule.documentation.transactionDays} hari{' '}
              {readinessModule.documentation.transactionDays >= 60 ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 inline ml-1" />
              ) : (
                <AlertCircle className="w-4 h-4 text-amber-600 inline ml-1" />
              )}
            </span>
          </div>
          <div className="flex items-center justify-between p-2 bg-slate-50 rounded">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-600" />
              <span className="text-sm text-slate-900">Audit Trail Lengkap</span>
            </div>
            {readinessModule.documentation.auditableDrill ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600" />
            )}
          </div>
        </div>

        {/* Compliance Flags */}
        {readinessModule.documentation.complianceFlags.length > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-xs font-semibold text-slate-600 uppercase mb-2">Flags Compliance</p>
            <div className="space-y-1">
              {readinessModule.documentation.complianceFlags.map((flag, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-amber-700 bg-amber-50 p-2 rounded">
                  <AlertCircle className="w-3 h-3 shrink-0 mt-0.5" />
                  <span>{flag}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Review Schedule */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs">
        <p className="text-slate-600">
          <span className="font-semibold">Dinilai:</span> {readinessModule.lastAssessed} •{' '}
          <span className="font-semibold">Review Berikutnya:</span> {readinessModule.nextReviewDate}
        </p>
      </div>

      {/* Decision Support Caveats */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs text-slate-700 space-y-1">
        <p className="font-semibold text-slate-900">Catatan Penggunaan:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Modul ini membantu komite kredit BPR dalam memeriksa kelayakan debitur</li>
          <li>Keputusan Approve/Reject tetap di tangan komite kredit internal</li>
          <li>Bukan substitusi atas penilaian kredit formal atau credit scoring</li>
          <li>Compliance penuh dengan regulasi POJK 29/2024</li>
        </ul>
      </div>
    </div>
  );
};
