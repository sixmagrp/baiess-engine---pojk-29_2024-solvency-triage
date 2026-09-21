/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Landmark,
  AlertTriangle,
  ShieldCheck,
  FileText,
  ChevronRight,
  PanelLeftClose,
  Wallet,
  BarChart3,
  Lightbulb,
  CheckSquare,
  Calendar,
  Info,
  Smartphone,
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
  // Menu untuk Merchant (Financial State Engine)
  const merchantMenuItems = [
    { id: 'financial-state', label: 'Kesehatan Keuangan', icon: Wallet },
    { id: 'cashflow-forecast', label: 'Proyeksi Kas', icon: BarChart3 },
    { id: 'early-warnings', label: 'Peringatan Dini', icon: AlertTriangle },
    { id: 'copilot', label: 'Asisten AI', icon: Lightbulb },
    { id: 'financing', label: 'Kesiapan Pembiayaan', icon: CheckSquare },
  ];

  // Menu untuk BPR
  const bprMenuItems = [
    { id: 'ledger', label: 'Solvency Ledger', icon: Landmark },
    { id: 'triage', label: 'Early-Warning Triage', icon: AlertTriangle, badge: criticalCount },
    { id: 'pdp', label: 'PDP Consent Registry', icon: ShieldCheck, badgeText: '72%' },
    { id: 'pojk', label: 'POJK Regulatory Audit', icon: FileText },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/30 backdrop-blur-2xs z-30 lg:hidden animate-in fade-in duration-200"
          aria-hidden="true"
        />
      )}

      {/* Main Sidebar */}
      <aside
        id="sidebar-nav-rail"
        className={`bg-white text-slate-800 shrink-0 h-screen sticky top-0 z-40 select-none font-sans shadow-xs transition-[width,opacity] duration-300 ease-in-out overflow-hidden ${
          isOpen
            ? 'w-[264px] opacity-100 border-r border-slate-200/90'
            : 'w-0 opacity-0 border-r-0 pointer-events-none'
        }`}
      >
        <div className="w-[264px] h-full flex flex-col justify-between overflow-y-auto overflow-x-hidden">
          <div>
            {/* Header */}
            <div className="p-4.5 border-b border-slate-100 flex items-start justify-between">
              <div className="flex items-start gap-3 min-w-0">
                <Landmark className="w-7 h-7 text-blue-600 shrink-0 mt-0.5" strokeWidth={2.2} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-900 tracking-tight text-[14.5px] font-display truncate">
                      {variant === 'merchant' ? 'Financial Engine' : 'BAIESS Engine'}
                    </span>
                    <span className="text-[10px] font-semibold bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded border border-blue-100 shrink-0">
                      v2.4
                    </span>
                  </div>
                  {variant === 'merchant' ? (
                    <>
                      <div className="text-[11px] font-medium text-slate-400 mt-0.5 truncate">
                        Merchant Dashboard
                      </div>
                      <div className="text-[10.5px] text-slate-400 truncate">
                        Real-time Financial State
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-[11px] font-medium text-slate-400 mt-0.5 truncate">
                        POJK 29/2024 DSS
                      </div>
                      <div className="text-[10.5px] text-slate-400 truncate">
                        BPR Mitra Jatim
                      </div>
                    </>
                  )}
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer shrink-0 ml-1"
                title="Sembunyikan Sidebar"
              >
                <PanelLeftClose className="w-4 h-4" />
              </button>
            </div>

            {/* Navigation */}
            <div className="px-3.5 py-4 space-y-5">
              {/* Merchant Navigation */}
              {variant === 'merchant' && (
                <div>
                  <div className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">
                    Financial State Engine
                  </div>
                  <nav className="space-y-1">
                    {merchantMenuItems.map((item) => {
                      const IconComponent = item.icon;
                      const isActive = currentTab === item.id;

                      return (
                        <button
                          key={item.id}
                          id={`nav-${item.id}`}
                          onClick={() => onTabChange(item.id)}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-[13px] font-medium transition-colors cursor-pointer ${
                            isActive
                              ? 'bg-blue-50/80 text-blue-600 font-bold'
                              : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <IconComponent
                              className={`w-4 h-4 shrink-0 ${
                                isActive ? 'text-blue-600' : 'text-slate-600'
                              }`}
                            />
                            <span className="truncate">{item.label}</span>
                          </div>
                          {isActive && <ChevronRight className="w-4 h-4 text-blue-600" />}
                        </button>
                      );
                    })}
                  </nav>
                </div>
              )}

              {/* BPR Navigation */}
              {variant === 'bpr' && (
                <div>
                  <div className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">
                    Solvency Intelligence
                  </div>
                  <nav className="space-y-1 mb-5">
                    <button
                      id="nav-solvency-ledger"
                      onClick={() => onTabChange('ledger')}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-[13px] font-medium transition-colors cursor-pointer ${
                        currentTab === 'ledger'
                          ? 'bg-blue-50/80 text-blue-600 font-bold'
                          : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Landmark
                          className={`w-4 h-4 shrink-0 ${
                            currentTab === 'ledger' ? 'text-blue-600' : 'text-slate-600'
                          }`}
                        />
                        <span className="truncate">Solvency Ledger</span>
                      </div>
                      {currentTab === 'ledger' && (
                        <ChevronRight className="w-4 h-4 text-blue-600" />
                      )}
                    </button>

                    <button
                      id="nav-early-warning-triage"
                      onClick={() => onTabChange('triage')}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-[13px] font-medium transition-colors cursor-pointer ${
                        currentTab === 'triage'
                          ? 'bg-blue-50/80 text-blue-600 font-bold'
                          : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <AlertTriangle
                          className={`w-4 h-4 shrink-0 ${
                            currentTab === 'triage' ? 'text-blue-600' : 'text-slate-700'
                          }`}
                        />
                        <span className="truncate">Early-Warning Triage</span>
                      </div>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-600 min-w-[24px] text-center shrink-0">
                        {criticalCount}
                      </span>
                    </button>
                  </nav>

                  {/* Manajemen Wilayah Section */}
                  <div className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">
                    Manajemen Wilayah
                  </div>
                  <nav className="space-y-1 mb-5">
                    <button
                      id="nav-merchant-monitoring"
                      onClick={() => onTabChange('merchant')}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-[13px] font-medium transition-colors cursor-pointer ${
                        currentTab === 'merchant'
                          ? 'bg-blue-50/80 text-blue-600 font-bold'
                          : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Calendar
                          className={`w-4 h-4 shrink-0 ${
                            currentTab === 'merchant' ? 'text-blue-600' : 'text-slate-600'
                          }`}
                        />
                        <span className="truncate">Merchant Monitoring</span>
                      </div>
                      {currentTab === 'merchant' && (
                        <ChevronRight className="w-4 h-4 text-blue-600" />
                      )}
                    </button>

                    <button
                      id="nav-pdp-consent"
                      onClick={() => onTabChange('pdp')}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-[13px] font-medium transition-colors cursor-pointer ${
                        currentTab === 'pdp'
                          ? 'bg-blue-50/80 text-blue-600 font-bold'
                          : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <ShieldCheck
                          className={`w-4 h-4 shrink-0 ${
                            currentTab === 'pdp' ? 'text-blue-600' : 'text-slate-700'
                          }`}
                        />
                        <span className="truncate">PDP Consent Registry</span>
                      </div>
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100/70 px-1.5 py-0.5 rounded shrink-0">
                        72%
                      </span>
                    </button>

                    <button
                      id="nav-pojk-audit"
                      onClick={() => onTabChange('pojk')}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-[13px] font-medium transition-colors cursor-pointer ${
                        currentTab === 'pojk'
                          ? 'bg-blue-50/80 text-blue-600 font-bold'
                          : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <FileText
                          className={`w-4 h-4 shrink-0 ${
                            currentTab === 'pojk' ? 'text-blue-600' : 'text-slate-700'
                          }`}
                        />
                        <span className="truncate">POJK Regulatory Audit</span>
                      </div>
                      {currentTab === 'pojk' && (
                        <ChevronRight className="w-4 h-4 text-blue-600" />
                      )}
                    </button>
                  </nav>

                  {/* PWA Sync Section */}
                  <div className="px-3 py-3 bg-blue-50 border border-blue-200 rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-slate-900">PWA SYNC SIMULATOR</p>
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">Live</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Uji antarmuka kas harian debitur UMKM Pasar Wonokromo secara real-time.
                    </p>
                    <button
                      onClick={onOpenPwa}
                      className="w-full py-2.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Smartphone className="w-4 h-4" />
                      Tinjau Live PWA Pedagang
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Footer Info */}
                  <div className="mt-5 pt-4 border-t border-slate-200 space-y-3 text-xs">
                    <div className="flex items-start gap-2">
                      <Info className="w-4 h-4 shrink-0 mt-0.5 text-blue-600" />
                      <div className="text-slate-600">
                        <p className="font-semibold text-slate-900">POJK 29/2024 Disclaimer</p>
                        <p className="text-[11px] mt-1">System ini adalah Internal Decision Support System (DSS) non-pemeringkat kredit independen. Keputusan kredit berada mutlak pada wewenang komite BPR.</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        <span className="font-semibold text-slate-900">Audit Trail: Aktif</span>
                      </div>
                      <span className="text-[10px] text-slate-500">v2.4.9</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-100 text-xs text-slate-500">
            <p>© 2026 BAIESS DSS</p>
          </div>
        </div>
      </aside>
    </>
  );
};
