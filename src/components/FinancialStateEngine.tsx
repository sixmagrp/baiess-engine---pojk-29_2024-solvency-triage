/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle2 } from 'lucide-react';
import { FinancialState } from '../types';

interface FinancialStateEngineProps {
  financialState: FinancialState;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const FinancialStateEngine: React.FC<FinancialStateEngineProps> = ({
  financialState,
}) => {
  const getStatusColor = (status: 'safe' | 'warning' | 'critical') => {
    switch (status) {
      case 'safe':
        return 'bg-emerald-50 border-emerald-200 text-emerald-900';
      case 'warning':
        return 'bg-amber-50 border-amber-200 text-amber-900';
      case 'critical':
        return 'bg-red-50 border-red-200 text-red-900';
    }
  };

  const getStatusIcon = (status: 'safe' | 'warning' | 'critical') => {
    switch (status) {
      case 'safe':
        return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-amber-600" />;
      case 'critical':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Kondisi Finansial Berkelanjutan
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Diperbarui otomatis maksimal 5 detik setelah transaksi baru
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-500">Terakhir diupdate</p>
          <p className="text-sm font-mono text-slate-700">{financialState.lastUpdated}</p>
        </div>
      </div>

      {/* Grid 2x2 Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Metrik 1: Posisi Kas Efektif */}
        <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs font-medium text-slate-600 uppercase tracking-wide">
                Posisi Kas Efektif
              </p>
              <h3 className="text-2xl font-bold text-slate-900 mt-2">
                {formatCurrency(financialState.effectiveCash.availableForUse)}
              </h3>
            </div>
            <TrendingUp className="w-5 h-5 text-blue-600" />
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">Saldo Likuid Siap Pakai:</span>
              <span className="font-mono text-slate-900">
                {formatCurrency(financialState.effectiveCash.totalLiquid)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Alokasi Kewajiban Mendesak:</span>
              <span className="font-mono text-slate-900">
                {formatCurrency(financialState.effectiveCash.urgentObligation)}
              </span>
            </div>
          </div>
        </div>

        {/* Metrik 2: Batas Penyangga Kas Aman */}
        <div
          className={`rounded-lg border p-5 shadow-sm ${getStatusColor(
            financialState.cashBuffer.status
          )}`}
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide opacity-70">
                Buffer Kas Aman
              </p>
              <h3 className="text-2xl font-bold mt-2">
                {financialState.cashBuffer.bufferDays} Hari
              </h3>
            </div>
            {getStatusIcon(financialState.cashBuffer.status)}
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="opacity-75">Margin Penyangga:</span>
              <span className="font-mono font-semibold">
                {formatCurrency(financialState.cashBuffer.bufferMargin)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-75">Batas Minimum Aman:</span>
              <span className="font-mono font-semibold">
                {formatCurrency(financialState.cashBuffer.bufferThreshold)}
              </span>
            </div>
            <div className="mt-3 pt-3 border-t border-current border-opacity-20">
              <p className="text-xs font-semibold">
                Status: <span className="capitalize">{financialState.cashBuffer.status}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Metrik 3: Siklus Konversi Kas */}
        <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs font-medium text-slate-600 uppercase tracking-wide">
                Siklus Konversi Kas (CCC)
              </p>
              <h3 className="text-2xl font-bold text-slate-900 mt-2">
                {financialState.cashConversionCycle.ccc} Hari
              </h3>
            </div>
            {financialState.cashConversionCycle.ccc > 30 ? (
              <TrendingDown className="w-5 h-5 text-amber-600" />
            ) : (
              <TrendingUp className="w-5 h-5 text-emerald-600" />
            )}
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">DIO (Stok):</span>
              <span className="font-mono text-slate-900">{financialState.cashConversionCycle.dio} hari</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">DSO (Piutang Warung):</span>
              <span className="font-mono text-slate-900">{financialState.cashConversionCycle.dso} hari</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">DPO (Utang Prinsipal):</span>
              <span className="font-mono text-slate-900">{financialState.cashConversionCycle.dpo} hari</span>
            </div>
            <p className="text-xs text-slate-500 mt-2 pt-2 border-t border-slate-200">
              Formula: DIO + DSO - DPO
            </p>
          </div>
        </div>

        {/* Metrik 4: Buku Besar Piutang Aktif */}
        <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs font-medium text-slate-600 uppercase tracking-wide">
                Piutang Warung (AR)
              </p>
              <h3 className="text-2xl font-bold text-slate-900 mt-2">
                {formatCurrency(financialState.accountsReceivable.totalAr)}
              </h3>
            </div>
            {financialState.accountsReceivable.overdueCount > 0 ? (
              <AlertCircle className="w-5 h-5 text-red-600" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            )}
          </div>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">Piutang Lancar (0–7 hari):</span>
              <span className="font-mono text-emerald-700 font-semibold">
                {formatCurrency(
                  financialState.accountsReceivable.arAging[0]?.amount || 0
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Mulai Tertunda (8–14 hari):</span>
              <span className="font-mono text-amber-700 font-semibold">
                {formatCurrency(
                  financialState.accountsReceivable.arAging[1]?.amount || 0
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Macet (&gt;14 hari):</span>
              <span className="font-mono text-red-700 font-semibold">
                {formatCurrency(
                  financialState.accountsReceivable.arAging[2]?.amount || 0
                )}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* AR Aging Visualization */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-900 mb-4">Distribusi Umur Piutang</h3>
        <div className="space-y-3">
          {financialState.accountsReceivable.arAging.map((category, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-slate-600">{category.label}</span>
                <span className="text-xs font-semibold text-slate-900">{category.percent}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${category.color}`}
                  style={{ width: `${category.percent}%` }}
                />
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {formatCurrency(category.amount)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Audit Trail Preview */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-900 mb-4">
          Audit Trail Transaksi (5 Terbaru)
        </h3>
        <div className="space-y-2">
          {financialState.auditTrail.slice(-5).map((entry, idx) => (
            <div
              key={idx}
              className="flex items-start justify-between text-xs pb-2 border-b border-slate-100 last:border-b-0"
            >
              <div>
                <p className="font-mono text-slate-700">{entry.transactionId}</p>
                <p className="text-slate-500 text-xs mt-0.5">
                  {entry.timestamp} • {entry.description}
                </p>
              </div>
              <span
                className={`font-semibold whitespace-nowrap ml-2 ${
                  entry.category === 'inflow' ? 'text-emerald-700' : 'text-red-700'
                }`}
              >
                {entry.category === 'inflow' ? '+' : '-'}
                {formatCurrency(entry.amount)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
