/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { RotateCw, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { TopHeader } from './TopHeader';
import { FinancialStateEngine } from './FinancialStateEngine';
import { CashFlowForecast } from './CashFlowForecast';
import { EarlyWarningAlerts } from './EarlyWarningAlerts';
import { FinancialCopilot } from './FinancialCopilot';
import { FinancingReadinessModule } from './FinancingReadinessModule';
import { MERCHANT_CONTEXT } from '../data/debtors';

interface MerchantDashboardProps {
  onBackToBpr: () => void;
}

type TabType = 'financial-state' | 'cashflow-forecast' | 'early-warnings' | 'copilot' | 'financing';

export function MerchantDashboard({ onBackToBpr }: MerchantDashboardProps) {
  const [currentTab, setCurrentTab] = useState<TabType>('financial-state');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Sync Timestamp State
  const [syncTime, setSyncTime] = useState('Hari ini, 14:35 WIB');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleRefreshSync = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setSyncTime(`Hari ini, ${hours}:${minutes} WIB`);
      setIsRefreshing(false);
      showToast('Data likuiditas & PWA berhasil disinkronisasi dengan server BPR.');
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] flex text-[#0b1c30] font-sans antialiased relative">
      {/* Floating Back Button */}
      <button 
        onClick={onBackToBpr}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-slate-900 text-white px-4 py-3 rounded-full shadow-xl shadow-slate-900/20 hover:bg-slate-800 transition-all font-medium text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        Keluar
      </button>

      {/* Left Navigation Rail */}
      <Sidebar
        currentTab={currentTab as string}
        onTabChange={(tab) => setCurrentTab(tab as TabType)}
        onOpenPwa={() => {}}
        criticalCount={1}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onOpen={() => setIsSidebarOpen(true)}
        variant="merchant"
      />

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header Bar */}
        <div className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
          <div className="h-16 px-4 md:px-6 lg:px-7 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {!isSidebarOpen && (
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <span className="text-2xl">☰</span>
                </button>
              )}
              <div>
                <h2 className="text-sm font-semibold text-slate-900">
                  {MERCHANT_CONTEXT.owner} • {MERCHANT_CONTEXT.name}
                </h2>
                <p className="text-xs text-slate-500">{MERCHANT_CONTEXT.market}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500">Sinkronisasi Terakhir</p>
              <p className="text-sm font-mono text-slate-700">{syncTime}</p>
            </div>
          </div>
        </div>

        {/* Scrollable Dashboard Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-7 max-w-[1400px] w-full mx-auto flex flex-col">
          {/* View Title & Sync Status Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
                  Kondisi Finansial Berkelanjutan
                </h1>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                  REAL-TIME MERCHANT ENGINE
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed max-w-3xl">
                Pantau kesehatan keuangan usaha Anda dengan metrik real-time, proyeksi kas, dan panduan keputusan finansial berbasis AI yang disesuaikan dengan kondisi pasar Anda.
              </p>
            </div>

            {/* Sync Button */}
            <button
              onClick={handleRefreshSync}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 text-xs font-medium hover:bg-slate-50 transition-colors shrink-0"
            >
              <RotateCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-blue-600' : ''}`} />
              Sinkronisasi Ulang
            </button>
          </div>

          {/* Content Area - Full Height for Copilot */}
          <div className={`bg-white rounded-lg border border-slate-200 shadow-sm ${currentTab === 'copilot' ? 'flex-1 flex flex-col min-h-0' : ''}`}>
            {currentTab === 'financial-state' && (
              <div className="p-6">
                <FinancialStateEngine financialState={MERCHANT_CONTEXT.financialState} />
              </div>
            )}

            {currentTab === 'cashflow-forecast' && (
              <div className="p-6">
                <CashFlowForecast forecast={MERCHANT_CONTEXT.cashFlowForecast} />
              </div>
            )}

            {currentTab === 'early-warnings' && (
              <div className="p-6">
                <EarlyWarningAlerts alerts={MERCHANT_CONTEXT.earlyWarnings} />
              </div>
            )}

            {currentTab === 'copilot' && (
              <div className="flex-1 flex flex-col p-4">
                <FinancialCopilot recommendations={MERCHANT_CONTEXT.copilotRecommendations} />
              </div>
            )}

            {currentTab === 'financing' && (
              <div className="p-6">
                <FinancingReadinessModule readinessModule={MERCHANT_CONTEXT.financingReadiness} />
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Floating Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-60 bg-slate-900 text-white text-xs px-4 py-3 rounded-lg shadow-xl border border-slate-700 flex items-center gap-2.5 animate-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
