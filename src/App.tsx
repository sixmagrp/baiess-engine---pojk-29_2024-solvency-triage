/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { RotateCw, CheckCircle2 } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';
import { SolvencyCards } from './components/SolvencyCards';
import { DebtorTable } from './components/DebtorTable';
import { BottomCards } from './components/BottomCards';
import { DossierDrawer } from './components/DossierDrawer';
import { PwaModal } from './components/PwaModal';
import { AssignAoModal } from './components/AssignAoModal';
import { OjkReportModal } from './components/OjkReportModal';
import { PdpAuditModal } from './components/PdpAuditModal';
import { SkDireksiModal } from './components/SkDireksiModal';
import { AoRouteModal } from './components/AoRouteModal';
import { MerchantLogin } from './components/MerchantLogin';
import { MerchantDashboard } from './components/MerchantDashboard';
import { LandingPage } from './components/LandingPage';
import { DEBTORS_DATA, ACCOUNT_OFFICERS } from './data/debtors';
import { Debtor } from './types';

export default function App() {
  // Navigation & Layout State
  const [activeView, setActiveView] = useState<'landing' | 'bpr' | 'login' | 'merchant' | 'portfolio-mikro'>('landing');
  const [currentTab, setCurrentTab] = useState('ledger');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Debtor Selection & Dossier Slide-Over
  const [selectedDebtor, setSelectedDebtor] = useState<Debtor>(DEBTORS_DATA[0]);
  const [isDossierOpen, setIsDossierOpen] = useState(true); // Open by default as in the screenshot

  // Filter by Solvency Zone (from the 3 metric cards)
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

  // Modals State
  const [isPwaModalOpen, setIsPwaModalOpen] = useState(false);
  const [isAssignAoModalOpen, setIsAssignAoModalOpen] = useState(false);
  const [isOjkReportOpen, setIsOjkReportOpen] = useState(false);
  const [isPdpLogsOpen, setIsPdpLogsOpen] = useState(false);
  const [isSkDireksiOpen, setIsSkDireksiOpen] = useState(false);
  const [isAoRouteOpen, setIsAoRouteOpen] = useState(false);

  // Sync Timestamp State
  const [syncTime, setSyncTime] = useState('Hari ini, 12:40 WIB');
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
      showToast('Data likuiditas mutasi bank & PWA debitur berhasil disinkronisasi.');
    }, 700);
  };

  const handleSelectDebtor = (debtor: Debtor) => {
    setSelectedDebtor(debtor);
    setIsDossierOpen(true);
  };

  const handleOpenAssignAo = (debtor: Debtor) => {
    setSelectedDebtor(debtor);
    setIsAssignAoModalOpen(true);
  };

  const handleConfirmAssign = (officerId: string, notes: string) => {
    showToast(`Instruksi intervensi untuk ${selectedDebtor.name} berhasil diteruskan ke Account Officer via WhatsApp.`);
  };

  if (activeView === 'landing') {
    return (
      <LandingPage
        onEnterBpr={() => setActiveView('bpr')}
        onEnterMerchant={() => setActiveView('portfolio-mikro')}
        onEnterLogin={() => setActiveView('login')}
      />
    );
  }

  if (activeView === 'login') {
    return (
      <MerchantLogin
        onComplete={() => setActiveView('portfolio-mikro')}
        onBack={() => setActiveView('landing')}
      />
    );
  }

  if (activeView === 'portfolio-mikro') {
    return (
      <MerchantDashboard
        onBackToBpr={() => setActiveView('bpr')}
        onBackToLanding={() => setActiveView('landing')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9ff] flex text-[#0b1c30] font-sans antialiased">
      {/* Left Autohide Navigation Rail */}
      <Sidebar
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          if (tab === 'pdp') setIsPdpLogsOpen(true);
          if (tab === 'penugasan') setIsAoRouteOpen(true);
          if (tab === 'pojk') setIsOjkReportOpen(true);
        }}
        onOpenPwa={() => setIsPwaModalOpen(true)}
        criticalCount={30}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onOpen={() => setIsSidebarOpen(true)}
        onBackToLanding={() => setActiveView('landing')}
      />

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header Bar */}
        <TopHeader
          isDossierOpen={isDossierOpen}
          onToggleDossier={() => setIsDossierOpen(!isDossierOpen)}
          onDownloadReport={() => setIsOjkReportOpen(true)}
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          currentTab={currentTab}
          onTabChange={setCurrentTab}
          onOpenMerchantLogin={() => setActiveView('portfolio-mikro')}
          onBackToLanding={() => setActiveView('landing')}
        />

        {/* Scrollable Dashboard Area */}
        <main
          id="main-dashboard-content"
          className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-7 max-w-[1700px] w-full mx-auto"
        >
          {/* View Title & Sync Status Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight font-display">
                  Early-Warning Solvency Triage
                </h1>
                <span className="text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                  POJK 29/2024 AUDIT READY
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed max-w-3xl">
                Pemantauan deteksi dini likuiditas debitur mikro dalam rentang horizon 21–30 hari sebelum tanggal angsuran kredit BPR.
              </p>
            </div>

            {/* Last Sync Indicator */}
            <div className="flex items-center gap-2 text-xs text-slate-500 self-start sm:self-center shrink-0">
              <span>
                Sinkronisasi Terakhir:{' '}
                <span className="font-semibold text-slate-700">{syncTime}</span>
              </span>
              <button
                id="btn-refresh-sync"
                onClick={handleRefreshSync}
                className="w-7 h-7 rounded border border-slate-200 bg-white hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
                title="Sinkronisasi Ulang Data Kas & PWA"
              >
                <RotateCw
                  className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-blue-600' : ''}`}
                />
              </button>
            </div>
          </div>

          {/* 3 Solvency Status Zone Cards */}
          <SolvencyCards
            selectedZone={selectedZone}
            onSelectZone={setSelectedZone}
          />

          {/* Priority Debtor Intervention Table */}
          <DebtorTable
            debtors={DEBTORS_DATA}
            selectedDebtor={selectedDebtor}
            onSelectDebtor={handleSelectDebtor}
            onOpenAssignAo={handleOpenAssignAo}
            activeZoneFilter={selectedZone}
          />

          {/* Bottom 3 Institutional Cards */}
          <BottomCards
            officers={ACCOUNT_OFFICERS}
            onOpenSkDireksi={() => setIsSkDireksiOpen(true)}
            onOpenPdpLogs={() => setIsPdpLogsOpen(true)}
            onOpenAoRoute={() => setIsAoRouteOpen(true)}
          />
        </main>
      </div>

      {/* Right Slide-Over Dossier Drawer */}
      <DossierDrawer
        debtor={selectedDebtor}
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
        onAssignAo={handleOpenAssignAo}
      />

      {/* Interactive Modals */}
      <PwaModal
        isOpen={isPwaModalOpen}
        onClose={() => setIsPwaModalOpen(false)}
        debtor={selectedDebtor}
        onSyncSuccess={() => {
          handleRefreshSync();
          showToast('Data transaksi PWA Pasar Wonokromo tersinkronisasi ke DSS BPR!');
        }}
      />

      <AssignAoModal
        isOpen={isAssignAoModalOpen}
        onClose={() => setIsAssignAoModalOpen(false)}
        debtor={selectedDebtor}
        officers={ACCOUNT_OFFICERS}
        onConfirmAssign={handleConfirmAssign}
      />

      <OjkReportModal
        isOpen={isOjkReportOpen}
        onClose={() => setIsOjkReportOpen(false)}
        debtors={DEBTORS_DATA}
      />

      <PdpAuditModal
        isOpen={isPdpLogsOpen}
        onClose={() => setIsPdpLogsOpen(false)}
      />

      <SkDireksiModal
        isOpen={isSkDireksiOpen}
        onClose={() => setIsSkDireksiOpen(false)}
        debtor={selectedDebtor}
      />

      <AoRouteModal
        isOpen={isAoRouteOpen}
        onClose={() => setIsAoRouteOpen(false)}
        officers={ACCOUNT_OFFICERS}
      />

      {/* Floating Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 z-60 bg-slate-900 text-white text-xs px-4 py-3 rounded-lg shadow-xl border border-slate-700 flex items-center gap-2.5 animate-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
