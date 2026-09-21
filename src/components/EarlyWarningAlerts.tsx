/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AlertTriangle, AlertCircle, Info, Bell, X } from 'lucide-react';
import { EarlyWarningAlert } from '../types';

interface EarlyWarningAlertsProps {
  alerts: EarlyWarningAlert[];
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const getSeverityConfig = (severity: 'critical' | 'warning' | 'info') => {
  switch (severity) {
    case 'critical':
      return {
        icon: AlertTriangle,
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        textColor: 'text-red-900',
        labelColor: 'bg-red-100 text-red-800',
        badgeColor: 'bg-red-500',
      };
    case 'warning':
      return {
        icon: AlertCircle,
        bgColor: 'bg-amber-50',
        borderColor: 'border-amber-200',
        textColor: 'text-amber-900',
        labelColor: 'bg-amber-100 text-amber-800',
        badgeColor: 'bg-amber-500',
      };
    case 'info':
      return {
        icon: Info,
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        textColor: 'text-blue-900',
        labelColor: 'bg-blue-100 text-blue-800',
        badgeColor: 'bg-blue-500',
      };
  }
};

const getHorizonLabel = (horizon: '14-day-tactical' | '21-30-day-structural') => {
  return horizon === '14-day-tactical' ? '14 Hari (Taktis)' : '21–30 Hari (Struktural)';
};

export const EarlyWarningAlerts: React.FC<EarlyWarningAlertsProps> = ({ alerts }) => {
  const [dismissedAlerts, setDismissedAlerts] = useState<Set<string>>(new Set());
  const [expandedAlertId, setExpandedAlertId] = useState<string | null>(null);
  const [filterHorizon, setFilterHorizon] = useState<'all' | '14-day-tactical' | '21-30-day-structural'>(
    'all'
  );

  const filteredAlerts = alerts.filter(
    (a) => !dismissedAlerts.has(a.id) && (filterHorizon === 'all' || a.horizon === filterHorizon)
  );

  const criticalCount = filteredAlerts.filter((a) => a.severity === 'critical').length;
  const warningCount = filteredAlerts.filter((a) => a.severity === 'warning').length;

  const dismissAlert = (id: string) => {
    setDismissedAlerts((prev) => new Set(prev).add(id));
  };

  if (filteredAlerts.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Deteksi Dini & Anomali</h2>
          <div className="flex gap-2">
            <select
              value={filterHorizon}
              onChange={(e) =>
                setFilterHorizon(e.target.value as 'all' | '14-day-tactical' | '21-30-day-structural')
              }
              className="px-3 py-1 text-xs border border-slate-300 rounded-lg bg-white text-slate-900"
            >
              <option value="all">Semua Horizon</option>
              <option value="14-day-tactical">14 Hari (Taktis)</option>
              <option value="21-30-day-structural">21–30 Hari (Struktural)</option>
            </select>
          </div>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 text-center">
          <Bell className="w-12 h-12 text-emerald-600 mx-auto mb-2 opacity-50" />
          <p className="text-sm font-medium text-emerald-900">Tidak ada peringatan</p>
          <p className="text-xs text-emerald-700 mt-1">
            Kondisi finansial Anda stabil dan tidak ada sinyal anomali terdeteksi.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header & Controls */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Deteksi Dini & Anomali</h2>
          <p className="text-xs text-slate-500 mt-1">
            Dual-horizon alerts: Taktis (14 hari) & Struktural (21–30 hari)
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <div className="flex gap-3 bg-white rounded-lg border border-slate-200 p-2">
            {criticalCount > 0 && (
              <div className="flex items-center gap-1 px-2 py-1 bg-red-50 rounded text-xs font-semibold text-red-700">
                <div className="w-2 h-2 bg-red-500 rounded-full" />
                {criticalCount} Kritis
              </div>
            )}
            {warningCount > 0 && (
              <div className="flex items-center gap-1 px-2 py-1 bg-amber-50 rounded text-xs font-semibold text-amber-700">
                <div className="w-2 h-2 bg-amber-500 rounded-full" />
                {warningCount} Peringatan
              </div>
            )}
          </div>
          <select
            value={filterHorizon}
            onChange={(e) =>
              setFilterHorizon(e.target.value as 'all' | '14-day-tactical' | '21-30-day-structural')
            }
            className="px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white text-slate-900 font-medium"
          >
            <option value="all">Semua Horizon</option>
            <option value="14-day-tactical">14 Hari (Taktis)</option>
            <option value="21-30-day-structural">21–30 Hari (Struktural)</option>
          </select>
        </div>
      </div>

      {/* Alert List */}
      <div className="space-y-3">
        {filteredAlerts.map((alert) => {
          const config = getSeverityConfig(alert.severity);
          const IconComponent = config.icon;
          const isExpanded = expandedAlertId === alert.id;

          return (
            <div
              key={alert.id}
              className={`rounded-lg border transition-all ${config.bgColor} ${config.borderColor}`}
            >
              {/* Alert Header (always visible) */}
              <div
                className="p-4 cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() =>
                  setExpandedAlertId(isExpanded ? null : alert.id)
                }
              >
                <div className="flex items-start gap-3">
                  <IconComponent className={`w-5 h-5 shrink-0 mt-0.5 ${config.textColor}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className={`font-semibold text-sm ${config.textColor}`}>
                            {alert.title}
                          </h3>
                          <span className={`text-xs font-medium px-2 py-0.5 rounded ${config.labelColor}`}>
                            {getHorizonLabel(alert.horizon)}
                          </span>
                        </div>
                        <p className={`text-xs mt-1 ${config.textColor} opacity-80`}>
                          {alert.description}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-xs font-semibold text-slate-600">
                          {alert.daysUntilCritical > 0
                            ? `${alert.daysUntilCritical} Hari Lagi`
                            : 'Sudah Kritis'}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {alert.projectedDate}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Evidence Summary */}
                <div className="mt-2 ml-8 flex flex-wrap gap-4 text-xs">
                  <div>
                    <p className="text-slate-600">Nilai Saat Ini:</p>
                    <p className="font-semibold text-slate-900">
                      {formatCurrency(alert.evidenceTrigger.currentValue)}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-600">Batas Aman:</p>
                    <p className="font-semibold text-slate-900">
                      {formatCurrency(alert.evidenceTrigger.threshold)}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-600">Selisih:</p>
                    <p className={`font-semibold ${alert.evidenceTrigger.variance < 0 ? 'text-red-700' : 'text-emerald-700'}`}>
                      {alert.evidenceTrigger.variance < 0 ? '-' : '+'}
                      {formatCurrency(Math.abs(alert.evidenceTrigger.variance))}
                    </p>
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div className={`border-t ${config.borderColor} p-4 space-y-3 bg-opacity-50`}>
                  {/* Evidence Trigger Details */}
                  <div>
                    <h4 className={`text-xs font-semibold uppercase tracking-wide mb-2 ${config.textColor}`}>
                      Bukti Pemicu
                    </h4>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Metrik:</span>
                        <span className="font-mono font-semibold text-slate-900">
                          {alert.evidenceTrigger.metric}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Nilai Terkini:</span>
                        <span className="font-mono font-semibold text-slate-900">
                          {formatCurrency(alert.evidenceTrigger.currentValue)} {alert.evidenceTrigger.unit}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Batas Aman:</span>
                        <span className="font-mono font-semibold text-slate-900">
                          {formatCurrency(alert.evidenceTrigger.threshold)} {alert.evidenceTrigger.unit}
                        </span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-current border-opacity-20">
                        <span className="text-slate-600 font-medium">Varian:</span>
                        <span className={`font-mono font-bold ${alert.evidenceTrigger.variance < 0 ? 'text-red-700' : 'text-emerald-700'}`}>
                          {alert.evidenceTrigger.variance < 0 ? '−' : '+'}
                          {formatCurrency(Math.abs(alert.evidenceTrigger.variance))}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Affected Entity */}
                  {alert.affectedEntity && (
                    <div>
                      <h4 className={`text-xs font-semibold uppercase tracking-wide mb-1 ${config.textColor}`}>
                        Entitas Terdampak
                      </h4>
                      <p className="text-sm text-slate-900 font-mono">{alert.affectedEntity}</p>
                    </div>
                  )}

                  {/* Recommended Action */}
                  <div>
                    <h4 className={`text-xs font-semibold uppercase tracking-wide mb-2 ${config.textColor}`}>
                      Aksi yang Disarankan
                    </h4>
                    <p className="text-sm text-slate-900 leading-relaxed">
                      {alert.recommendedAction}
                    </p>
                  </div>

                  {/* Footer: Timestamp & Dismiss */}
                  <div className="flex items-center justify-between pt-3 border-t border-current border-opacity-20">
                    <p className="text-xs text-slate-500">
                      Dibuat: {alert.generatedAt}
                    </p>
                    <button
                      onClick={() => dismissAlert(alert.id)}
                      className={`px-3 py-1 text-xs font-medium rounded border transition-colors ${
                        config.borderColor
                      } text-slate-700 bg-white hover:bg-slate-50`}
                    >
                      Tutup
                    </button>
                  </div>
                </div>
              )}

              {/* Close Button (compact) */}
              {!isExpanded && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    dismissAlert(alert.id);
                  }}
                  className="absolute top-3 right-3 p-1 rounded hover:bg-black/10 transition-colors"
                  title="Tutup alert"
                >
                  <X className={`w-4 h-4 ${config.textColor}`} />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Deduplication Info */}
      {dismissedAlerts.size > 0 && (
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-600">
          <p>
            {dismissedAlerts.size} alert{dismissedAlerts.size > 1 ? 's' : ''} ditutup •
            <button
              onClick={() => setDismissedAlerts(new Set())}
              className="ml-2 font-semibold text-blue-600 hover:text-blue-700"
            >
              Tampilkan ulang
            </button>
          </p>
        </div>
      )}
    </div>
  );
};
