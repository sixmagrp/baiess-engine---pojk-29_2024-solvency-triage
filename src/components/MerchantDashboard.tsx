import React, { useState } from 'react';
import { RotateCw, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { TopHeader } from './TopHeader';
import { SolvencyCards } from './SolvencyCards';
import { DebtorTable } from './DebtorTable';
import { BottomCards } from './BottomCards';
import { DossierDrawer } from './DossierDrawer';
import { PwaModal } from './PwaModal';
import { AssignAoModal } from './AssignAoModal';
import { OjkReportModal } from './OjkReportModal';
import { PdpAuditModal } from './PdpAuditModal';
import { SkDireksiModal } from './SkDireksiModal';
import { AoRouteModal } from './AoRouteModal';
import { DEBTORS_DATA, ACCOUNT_OFFICERS } from '../data/debtors';
import { Debtor } from '../types';

interface MerchantDashboardProps {
  onBackToBpr: () => void;
}

export function MerchantDashboard({ onBackToBpr }: MerchantDashboardProps) {
  // Navigation & Layout State
  const [currentTab, setCurrentTab] = useState('financial_state');
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

  return (
    <div className="min-h-screen bg-[#f8f9ff] flex text-[#0b1c30] font-sans antialiased relative">
      
      {/* Floating Back Button */}
      <button 
        onClick={onBackToBpr}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-slate-900 text-white px-4 py-3 rounded-full shadow-xl shadow-slate-900/20 hover:bg-slate-800 transition-all font-medium text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        Kembali ke Login
      </button>

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
        variant="merchant"
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
          variant="merchant"
        />

        {/* Scrollable Dashboard Area */}
        <main
          id="main-dashboard-content"
          className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-7 max-w-[1700px] w-full mx-auto"
        >
          {currentTab === 'financial_state' ? (
            <>
              {/* View Title & Sync Status Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight font-display">
                  Merchant Dashboard View
                </h1>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                  ISOLATED VIEW
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed max-w-3xl">
                Tampilan dashboard independen setelah proses onboarding merchant selesai.
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
            </>
          ) : (
            <div className="w-full h-[80vh] bg-white rounded-xl shadow-xs border border-slate-100 flex items-center justify-center text-slate-300">
              {/* Blank state as requested */}
            </div>
          )}
        </main>
      </div>


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
        <div className="fixed bottom-20 right-6 z-60 bg-slate-900 text-white text-xs px-4 py-3 rounded-lg shadow-xl border border-slate-700 flex items-center gap-2.5 animate-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
