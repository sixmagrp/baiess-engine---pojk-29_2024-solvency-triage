/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AlertTriangle, Info, TrendingDown } from 'lucide-react';
import { CashFlowForecast as CashFlowForecastType } from '../types';

interface CashFlowForecastProps {
  forecast: CashFlowForecastType;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const getConfidenceColor = (confidence: 'high' | 'medium' | 'low') => {
  switch (confidence) {
    case 'high':
      return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    case 'medium':
      return 'text-amber-600 bg-amber-50 border-amber-200';
    case 'low':
      return 'text-red-600 bg-red-50 border-red-200';
  }
};

// Simple SVG Chart Component
const CashFlowChart: React.FC<{
  data: CashFlowForecastType['projections'];
}> = ({ data }) => {
  if (data.length === 0) return null;

  const padding = 40;
  const width = 600;
  const height = 300;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  // Find min/max values
  const allValues = data.flatMap((d) => [d.base, d.upperBound, d.lowerBound]);
  const minValue = Math.min(...allValues, 0);
  const maxValue = Math.max(...allValues);
  const valueRange = maxValue - minValue;

  // Scale functions
  const scaleX = (index: number) => {
    return padding + (index / (data.length - 1)) * chartWidth;
  };

  const scaleY = (value: number) => {
    return height - padding - ((value - minValue) / valueRange) * chartHeight;
  };

  // Generate paths
  const basePath = data
    .map((d, i) => {
      const x = scaleX(i);
      const y = scaleY(d.base);
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');

  const upperPath = data
    .map((d, i) => {
      const x = scaleX(i);
      const y = scaleY(d.upperBound);
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');

  const lowerPath = data
    .map((d, i) => {
      const x = scaleX(i);
      const y = scaleY(d.lowerBound);
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');

  // Confidence band as polygon
  const bandPath = [
    ...data.map((d, i) => {
      const x = scaleX(i);
      const y = scaleY(d.upperBound);
      return [x, y];
    }),
    ...data
      .slice()
      .reverse()
      .map((d, i) => {
        const x = scaleX(data.length - 1 - i);
        const y = scaleY(d.lowerBound);
        return [x, y];
      }),
  ]
    .map(([x, y]) => `${x},${y}`)
    .join(' ');

  return (
    <svg width={width} height={height} className="mx-auto">
      {/* Grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
        const y = height - padding - ratio * chartHeight;
        return (
          <line
            key={i}
            x1={padding}
            y1={y}
            x2={width - padding}
            y2={y}
            stroke="#e2e8f0"
            strokeWidth="1"
            strokeDasharray="4"
          />
        );
      })}

      {/* Confidence band */}
      <polygon points={bandPath} fill="#3b82f6" fillOpacity="0.1" stroke="none" />

      {/* Upper bound line */}
      <path d={upperPath} stroke="#3b82f6" strokeWidth="1" fill="none" strokeDasharray="4" />

      {/* Lower bound line */}
      <path d={lowerPath} stroke="#ef4444" strokeWidth="1" fill="none" strokeDasharray="4" />

      {/* Base line */}
      <path d={basePath} stroke="#06b6d4" strokeWidth="2.5" fill="none" />

      {/* Data points */}
      {data.map((d, i) => (
        <circle
          key={i}
          cx={scaleX(i)}
          cy={scaleY(d.base)}
          r="3"
          fill="#06b6d4"
          stroke="white"
          strokeWidth="1"
        />
      ))}

      {/* Y-axis labels */}
      {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
        const value = minValue + ratio * valueRange;
        const y = height - padding - ratio * chartHeight;
        return (
          <text
            key={i}
            x={padding - 5}
            y={y + 3}
            textAnchor="end"
            fontSize="11"
            fill="#64748b"
          >
            {formatCurrency(value)}
          </text>
        );
      })}

      {/* X-axis labels */}
      {data.map((d, i) => {
        if (i % Math.max(1, Math.floor(data.length / 7)) === 0) {
          return (
            <text
              key={i}
              x={scaleX(i)}
              y={height - padding + 15}
              textAnchor="middle"
              fontSize="11"
              fill="#64748b"
            >
              {d.dayNumber}
            </text>
          );
        }
      })}
    </svg>
  );
};

export const CashFlowForecast: React.FC<CashFlowForecastProps> = ({ forecast }) => {
  const [selectedHorizon, setSelectedHorizon] = useState<7 | 14 | 30>(7);
  const filteredData = forecast.projections.filter((p) => p.dayNumber <= selectedHorizon);

  const isLowConfidence = forecast.dataAge > 14;
  const hasCriticalBreach = forecast.criticalBreachDate !== null;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Peramalan Arus Kas Taktis
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Proyeksi likuiditas harian dengan bounds kepercayaan 80% & 20%
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-500">Model</p>
          <p className="text-sm font-mono text-slate-700 uppercase">
            {forecast.modelType === 'sarima' ? 'SARIMA' : 'Exp. Smoothing'}
          </p>
        </div>
      </div>

      {/* Low Confidence Warning */}
      {isLowConfidence && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-900">
              Confidence Status: Rendah / Membangun Baseline
            </p>
            <p className="text-xs text-amber-800 mt-1">
              Data transaksi historis kurang dari 14 hari. Saran peramalan preskriptif ditahan hingga
              baseline cukup.
            </p>
          </div>
        </div>
      )}

      {/* Critical Breach Alert */}
      {hasCriticalBreach && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
          <TrendingDown className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-red-900">
              ⚠️ Potensi Breach Buffer Kas: {forecast.criticalBreachDate}
            </p>
            <p className="text-xs text-red-800 mt-1">
              Proyeksi saldo kas akan menyentuh batas minimum aman. Pertimbangkan percepatan penagihan
              atau penyesuaian jadwal belanja.
            </p>
          </div>
        </div>
      )}

      {/* Horizon Selector */}
      <div className="flex gap-2 bg-white rounded-lg border border-slate-200 p-3 w-fit">
        <label className="text-xs font-medium text-slate-600 mr-2">Horizon:</label>
        {[7, 14, 30].map((days) => (
          <button
            key={days}
            onClick={() => setSelectedHorizon(days as 7 | 14 | 30)}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
              selectedHorizon === days
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {days} Hari
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm overflow-x-auto">
        <CashFlowChart data={filteredData} />
        <div className="flex gap-6 justify-center mt-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-cyan-500" />
            <span className="text-slate-600">Proyeksi Median (Base)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-blue-500 opacity-40" />
            <span className="text-slate-600">Upper Bound 80%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-red-500 opacity-40" />
            <span className="text-slate-600">Lower Bound 20%</span>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Hari</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Tanggal</th>
                <th className="px-4 py-3 text-right font-semibold text-slate-700">Base</th>
                <th className="px-4 py-3 text-right font-semibold text-slate-700">Upper (80%)</th>
                <th className="px-4 py-3 text-right font-semibold text-slate-700">Lower (20%)</th>
                <th className="px-4 py-3 text-center font-semibold text-slate-700">Kepercayaan</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Pembayaran Terjadwal</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((proj, idx) => (
                <tr
                  key={idx}
                  className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                >
                  <td className="px-4 py-3 font-mono text-slate-900">H+{proj.dayNumber}</td>
                  <td className="px-4 py-3 text-slate-600">{proj.date}</td>
                  <td className="px-4 py-3 text-right font-mono font-semibold text-slate-900">
                    {formatCurrency(proj.base)}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-blue-700">
                    {formatCurrency(proj.upperBound)}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-red-700">
                    {formatCurrency(proj.lowerBound)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-medium border ${getConfidenceColor(
                        proj.confidence
                      )}`}
                    >
                      {proj.confidence === 'high'
                        ? 'Tinggi'
                        : proj.confidence === 'medium'
                          ? 'Sedang'
                          : 'Rendah'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-600">
                    {proj.scheduledPayments.length > 0 ? (
                      <div className="space-y-1">
                        {proj.scheduledPayments.map((payment, pidx) => (
                          <div key={pidx} className="text-red-700 font-semibold">
                            {payment.name}: {formatCurrency(payment.amount)}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-slate-400">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Model Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
        <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div className="text-sm text-blue-900">
          <p className="font-medium">Model: {forecast.modelType === 'sarima' ? 'SARIMA' : 'Exponential Smoothing'}</p>
          <p className="text-xs mt-1">
            Data: {forecast.dataPoints} data point historis • Diperbarui: {forecast.generatedAt}
          </p>
        </div>
      </div>
    </div>
  );
};
