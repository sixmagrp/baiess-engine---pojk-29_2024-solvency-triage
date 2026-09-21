import React from 'react';
import {
  Landmark,
  AlertTriangle,
  Calendar,
  ShieldCheck,
  FileText,
  Users,
  TrendingUp,
  Smartphone,
  ChevronRight,
  Info,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  onOpenPwa: () => void;
  criticalCount: number;
  isOpen: boolean;
  onClose: () => void;
  onOpen?: () => void;
  variant?: 'bpr' | 'merchant';
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onTabChange,
  onOpenPwa,
  criticalCount,
  isOpen,
  onClose,
  onOpen,
  variant = 'bpr',
}) => {
  return (
    <>
      {/* Mobile Backdrop Overlay (auto-closes on tap outside) */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/30 backdrop-blur-2xs z-30 lg:hidden animate-in fade-in duration-200"
          aria-hidden="true"
        />
      )}

      {/* Main Collapsible Sidebar Nav Rail */}
      <aside
        id="sidebar-nav-rail"
        className={`bg-white text-slate-800 shrink-0 h-screen sticky top-0 z-40 select-none font-sans shadow-xs transition-[width,opacity] duration-300 ease-in-out overflow-hidden ${
          isOpen
            ? 'w-[264px] opacity-100 border-r border-slate-200/90'
            : 'w-0 opacity-0 border-r-0 pointer-events-none'
        }`}
      >
        {/* Fixed Width Inner Container ensures no layout reflow or wrapping while collapsing */}
        <div className="w-[264px] h-full flex flex-col justify-between overflow-y-auto overflow-x-hidden">
          <div>
            {/* Top Header & Brand */}
            <div id="brand-header" className="p-4.5 border-b border-slate-100 flex items-start justify-between">
              <div className="flex items-start gap-3 min-w-0">
                <Landmark className="w-7 h-7 text-blue-600 shrink-0 mt-0.5" strokeWidth={2.2} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-900 tracking-tight text-[14.5px] font-display truncate">
                      BAIESS Engine
                    </span>
                    <span className="text-[10px] font-semibold bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded border border-blue-100 shrink-0">
                      v2.4
                    </span>
                  </div>
                  <div className="text-[11px] font-medium text-slate-400 mt-0.5 truncate">
                    POJK 29/2024 DSS
                  </div>
                  <div className="text-[10.5px] text-slate-400 truncate">
                    BPR Mitra Jatim • DPD Perbarindo
                  </div>
                </div>
              </div>

              {/* Close / Autohide Toggle Button */}
              <button
                onClick={onClose}
                className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer shrink-0 ml-1"
                title="Sembunyikan Sidebar"
                aria-label="Sembunyikan Sidebar"
              >
                <PanelLeftClose className="w-4 h-4" />
              </button>
            </div>

            {/* Navigation Menus */}
            <div className="px-3.5 py-4 space-y-5">
              <div>
                <div className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Solvency Intelligence
                </div>
                <nav className="space-y-1">
                  {variant === 'bpr' && (
                    <>
                      {/* Solvency Ledger */}
                      <button
                    id="nav-solvency-ledger"
                    onClick={() => onTabChange('ledger')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-[13px] font-medium transition-colors cursor-pointer ${
                      currentTab === 'ledger'
                        ? 'bg-blue-50/80 text-blue-600 font-bold'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Landmark
                        className={`w-4 h-4 ${
                          currentTab === 'ledger' ? 'text-blue-600' : 'text-slate-600'
                        }`}
                      />
                      <span>Solvency Ledger</span>
                    </div>
                    {currentTab === 'ledger' && (
                      <ChevronRight className="w-4 h-4 text-blue-600" />
                    )}
                  </button>

                  {/* Early-Warning Triage */}
                  <button
                    id="nav-early-warning-triage"
                    onClick={() => onTabChange('triage')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-[13px] font-medium transition-colors cursor-pointer ${
                      currentTab === 'triage'
                        ? 'bg-blue-50/80 text-blue-600 font-bold'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <AlertTriangle
                        className={`w-4 h-4 ${
                          currentTab === 'triage' ? 'text-blue-600' : 'text-slate-700'
                        }`}
                      />
                      <span>Early-Warning Triage</span>
                    </div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-600 min-w-[20px] text-center">
                      {criticalCount}
                    </span>
                  </button>

                  {/* Merchant Monitoring */}
                  <button
                    id="nav-merchant-monitoring"
                    onClick={() => onTabChange('merchant')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-[13px] font-medium transition-colors cursor-pointer ${
                      currentTab === 'merchant'
                        ? 'bg-blue-50/80 text-blue-600 font-bold'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Calendar
                        className={`w-4 h-4 ${
                          currentTab === 'merchant' ? 'text-blue-600' : 'text-slate-700'
                        }`}
                      />
                      <span>Merchant Monitoring</span>
                    </div>
                  </button>

                  {/* PDP Consent Registry */}
                  <button
                    id="nav-pdp-consent"
                    onClick={() => onTabChange('pdp')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-[13px] font-medium transition-colors cursor-pointer ${
                      currentTab === 'pdp'
                        ? 'bg-blue-50/80 text-blue-600 font-bold'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <ShieldCheck
                        className={`w-4 h-4 ${
                          currentTab === 'pdp' ? 'text-blue-600' : 'text-slate-700'
                        }`}
                      />
                      <span>PDP Consent Registry</span>
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100/70 px-1.5 py-0.5 rounded">
                      72%
                    </span>
                  </button>

                  {/* POJK Regulatory Audit */}
                  <button
                    id="nav-pojk-audit"
                    onClick={() => onTabChange('pojk')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-[13px] font-medium transition-colors cursor-pointer ${
                      currentTab === 'pojk'
                        ? 'bg-blue-50/80 text-blue-600 font-bold'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <FileText
                        className={`w-4 h-4 ${
                          currentTab === 'pojk' ? 'text-blue-600' : 'text-slate-700'
                        }`}
                      />
                      <span>POJK Regulatory Audit</span>
                    </div>
                  </button>
                    </>
                  )}

                  {variant === 'merchant' && (
                    <>
                      {/* Financial State Engine */}
                      <button
                        id="nav-financial-state"
                        onClick={() => onTabChange('financial_state')}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-[13px] font-medium transition-colors cursor-pointer ${
                          currentTab === 'financial_state'
                            ? 'bg-blue-50/80 text-blue-600 font-bold'
                            : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <Landmark
                            className={`w-4 h-4 shrink-0 ${
                              currentTab === 'financial_state' ? 'text-blue-600' : 'text-slate-600'
                            }`}
                          />
                          <span className="truncate">Financial State Engine</span>
                        </div>
                      </button>

                      {/* Tactical Cashflow Forecasting */}
                      <button
                        id="nav-cashflow"
                        onClick={() => onTabChange('cashflow')}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-[13px] font-medium transition-colors cursor-pointer ${
                          currentTab === 'cashflow'
                            ? 'bg-blue-50/80 text-blue-600 font-bold'
                            : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <TrendingUp
                            className={`w-4 h-4 shrink-0 ${
                              currentTab === 'cashflow' ? 'text-blue-600' : 'text-slate-700'
                            }`}
                          />
                          <span className="truncate">Tactical Cashflow</span>
                        </div>
                      </button>

                      {/* Dual-Horizon Early Warning */}
                      <button
                        id="nav-early-warning"
                        onClick={() => onTabChange('early_warning')}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-[13px] font-medium transition-colors cursor-pointer ${
                          currentTab === 'early_warning'
                            ? 'bg-blue-50/80 text-blue-600 font-bold'
                            : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <AlertTriangle
                            className={`w-4 h-4 shrink-0 ${
                              currentTab === 'early_warning' ? 'text-blue-600' : 'text-slate-700'
                            }`}
                          />
                          <span className="truncate">Early Warning System</span>
                        </div>
                      </button>

                      {/* Financial Copilot */}
                      <button
                        id="nav-copilot"
                        onClick={() => onTabChange('copilot')}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-[13px] font-medium transition-colors cursor-pointer ${
                          currentTab === 'copilot'
                            ? 'bg-blue-50/80 text-blue-600 font-bold'
                            : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <Smartphone
                            className={`w-4 h-4 shrink-0 ${
                              currentTab === 'copilot' ? 'text-blue-600' : 'text-slate-700'
                            }`}
                          />
                          <span className="truncate">Financial Copilot</span>
                        </div>
                      </button>

                      {/* Internal Financing Readiness */}
                      <button
                        id="nav-financing-readiness"
                        onClick={() => onTabChange('financing_readiness')}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-[13px] font-medium transition-colors cursor-pointer ${
                          currentTab === 'financing_readiness'
                            ? 'bg-blue-50/80 text-blue-600 font-bold'
                            : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <ShieldCheck
                            className={`w-4 h-4 shrink-0 ${
                              currentTab === 'financing_readiness' ? 'text-blue-600' : 'text-slate-700'
                            }`}
                          />
                          <span className="truncate">Financing Readiness</span>
                        </div>
                      </button>
                    </>
                  )}
                </nav>
              </div>

              {/* MANAJEMEN WILAYAH */}
              <div>
                <div className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Manajemen Wilayah
                </div>
                <nav className="space-y-1">
                  <button
                    id="nav-penugasan-ao"
                    onClick={() => onTabChange('penugasan')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-[13px] font-medium transition-colors cursor-pointer ${
                      currentTab === 'penugasan'
                        ? 'bg-blue-50/80 text-blue-600 font-bold'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Users
                        className={`w-4 h-4 ${
                          currentTab === 'penugasan' ? 'text-blue-600' : 'text-slate-700'
                        }`}
                      />
                      <span>Penugasan AO Jatim</span>
                    </div>
                  </button>
                </nav>
              </div>

              {/* PWA Sync Simulator Card */}
              <div
                id="pwa-sync-simulator-card"
                className="bg-[#eef5ff] rounded-xl p-3.5 border border-blue-100/90 text-left"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                    <span className="text-[11px] font-bold text-slate-900 uppercase tracking-tight">
                      PWA Sync Simulator
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                    <span>Live 390px</span>
                  </span>
                </div>
                <p className="text-[11.5px] text-slate-600 leading-relaxed mb-3">
                  Uji antarmuka kas harian debitur UMKM Pasar Wonokromo secara real-time.
                </p>
                <button
                  id="btn-open-live-pwa"
                  onClick={onOpenPwa}
                  className="w-full flex items-center justify-between bg-[#1d4ed8] hover:bg-blue-700 text-white text-[12px] font-semibold py-2.5 px-3 rounded-lg transition-colors shadow-2xs cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-white" />
                    <span>Tinjau Live PWA Pedagang</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Footer & POJK Disclaimer Card */}
          <div className="p-3.5 border-t border-slate-100 space-y-3 w-[264px] shrink-0">
            {/* POJK Disclaimer Box */}
            <div
              id="pojk-disclaimer-box"
              className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-left"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-slate-800 font-bold text-xs">
                  <Info className="w-4 h-4 text-slate-700" />
                  <span>POJK 29/2024 Disclaimer</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <p className="text-[10.5px] text-slate-500 leading-relaxed mt-1.5">
                Sistem ini adalah Internal Decision Support System (DSS) non-pemeringkat kredit independen. Keputusan kredit berada mutlak pada wewenang komite BPR.
              </p>
            </div>

            {/* Audit Trail & Version */}
            <div className="flex items-center justify-between text-xs text-slate-500 px-1">
              <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                <ShieldCheck className="w-4 h-4 text-slate-700" />
                Audit Trail: Aktif
              </span>
              <span className="text-slate-400 font-mono text-[11px]">v2.4.9</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
