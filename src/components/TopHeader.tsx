import React, { useState, useEffect, useRef } from 'react';
import {
  Download,
  PanelRightClose,
  PanelRightOpen,
  PanelLeftClose,
  PanelLeftOpen,
  ShieldCheck,
  Bell,
  ChevronDown,
  Check,
  Activity,
  Users,
  Shield,
  MapPin,
  Compass,
  Home,
} from 'lucide-react';

interface TopHeaderProps {
  onToggleDossier: () => void;
  isDossierOpen: boolean;
  onDownloadReport: () => void;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  currentTab?: string;
  onTabChange?: (tab: string) => void;
  onOpenMerchantLogin?: () => void;
  onBackToLanding?: () => void;
  variant?: 'bpr' | 'merchant';
}

interface ScrollSection {
  id: string;
  label: string;
  shortLabel: string;
  icon: React.ElementType;
}

const SCROLL_SECTIONS: ScrollSection[] = [
  {
    id: 'section-solvency-zones',
    label: 'Zona Solvensi',
    shortLabel: 'Solvensi',
    icon: Activity,
  },
  {
    id: 'debtor-priority-intervention-section',
    label: 'Daftar Debitur',
    shortLabel: 'Debitur',
    icon: Users,
  },
  {
    id: 'card-action-protocol-komite',
    label: 'Protokol Komite',
    shortLabel: 'Protokol',
    icon: Shield,
  },
  {
    id: 'card-integritas-pdp',
    label: 'Audit PDP',
    shortLabel: 'Audit PDP',
    icon: ShieldCheck,
  },
  {
    id: 'card-ao-lapangan-surabaya',
    label: 'Monitoring AO',
    shortLabel: 'Rute AO',
    icon: MapPin,
  },
];

export const TopHeader: React.FC<TopHeaderProps> = ({
  onToggleDossier,
  isDossierOpen,
  onDownloadReport,
  isSidebarOpen,
  onToggleSidebar,
  currentTab,
  onTabChange,
  onOpenMerchantLogin,
  onBackToLanding,
  variant = 'bpr',
}) => {
  const [activeSectionId, setActiveSectionId] = useState<string>('section-solvency-zones');
  const [showSectionDropdown, setShowSectionDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const headerRef = useRef<HTMLElement>(null);

  // Close all open dropdowns when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setShowSectionDropdown(false);
        setShowNotifications(false);
        setShowProfileMenu(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowSectionDropdown(false);
        setShowNotifications(false);
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Smooth scroll handler targeting main dashboard container
  const handleScrollToSection = (targetId: string) => {
    setActiveSectionId(targetId);
    setShowSectionDropdown(false);

    // If currently on another tab, switch back to ledger first
    if (currentTab && currentTab !== 'ledger' && onTabChange) {
      onTabChange('ledger');
    }

    setTimeout(() => {
      const container = document.getElementById('main-dashboard-content');
      const target = document.getElementById(targetId);

      if (container && target) {
        const containerRect = container.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        const scrollOffset = targetRect.top - containerRect.top + container.scrollTop - 20;
        container.scrollTo({ top: Math.max(0, scrollOffset), behavior: 'smooth' });

        // Subtle target focus animation
        target.classList.add('ring-2', 'ring-blue-500/40', 'transition-all', 'duration-300');
        setTimeout(() => {
          target.classList.remove('ring-2', 'ring-blue-500/40');
        }, 1200);
      } else if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, currentTab && currentTab !== 'ledger' ? 80 : 0);
  };

  // Scroll spy listener using bounding client rect relative to container
  useEffect(() => {
    const container = document.getElementById('main-dashboard-content');
    if (!container) return;

    const handleScroll = () => {
      const containerRect = container.getBoundingClientRect();
      const scrollThreshold = container.scrollTop + 100;

      for (let i = SCROLL_SECTIONS.length - 1; i >= 0; i--) {
        const section = SCROLL_SECTIONS[i];
        const el = document.getElementById(section.id);
        if (el) {
          const elRect = el.getBoundingClientRect();
          const elementAbsoluteTop = elRect.top - containerRect.top + container.scrollTop;
          if (scrollThreshold >= elementAbsoluteTop - 30) {
            setActiveSectionId(section.id);
            return;
          }
        }
      }
      setActiveSectionId(SCROLL_SECTIONS[0].id);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      id="top-header-bar"
      className="h-14 bg-white/95 backdrop-blur-xs border-b border-slate-200/80 px-3 sm:px-4 lg:px-6 flex items-center justify-between sticky top-0 z-30 font-sans select-none"
    >
      {/* Left: Sidebar Toggle & Breadcrumbs */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0 shrink-0">
        {/* Autohide / Toggle Sidebar Button */}
        <button
          id="btn-toggle-sidebar"
          onClick={onToggleSidebar}
          className={`p-1.5 rounded-md transition-colors cursor-pointer flex items-center justify-center shrink-0 ${
            isSidebarOpen
              ? 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              : 'text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200'
          }`}
          title={isSidebarOpen ? 'Sembunyikan Sidebar (Autohide)' : 'Tampilkan Sidebar'}
          aria-label={isSidebarOpen ? 'Sembunyikan Sidebar' : 'Tampilkan Sidebar'}
        >
          {isSidebarOpen ? (
            <PanelLeftClose className="w-4 h-4 text-slate-600" />
          ) : (
            <PanelLeftOpen className="w-4 h-4 text-blue-600" />
          )}
        </button>

        {/* Workspace Path / Breadcrumbs */}
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 font-medium shrink-0">
          {onBackToLanding && (
            <>
              <button
                onClick={onBackToLanding}
                className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium transition-colors cursor-pointer px-1.5 py-0.5 rounded hover:bg-blue-50"
                title="Kembali ke Beranda & Profil Platform BAIESS"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Beranda BAIESS</span>
              </button>
              <span className="text-slate-300">/</span>
            </>
          )}
          <span className="text-slate-800 font-semibold tracking-tight">BPR Mitra Jatim</span>
          <span className="text-slate-300">/</span>
          <span 
            className="text-slate-600 cursor-pointer hover:text-blue-600 transition-colors"
            onClick={onOpenMerchantLogin}
          >
            Portofolio Mikro
          </span>
        </div>
      </div>

      {/* Middle: Section Navigation (Responsive Pills on desktop, Dropdown on smaller screens) */}
      {variant === 'bpr' && (
        <div className="flex items-center justify-center min-w-0 px-1 sm:px-2 flex-1">
        {/* Desktop / Laptop Segmented Pill Bar */}
        <nav
          id="header-scroll-navigation"
          aria-label="Navigasi Bagian Dashboard"
          className="hidden md:flex items-center gap-0.5 lg:gap-1 bg-slate-100/90 p-1 rounded-lg border border-slate-200/80 max-w-full overflow-x-auto scrollbar-none"
        >
          {SCROLL_SECTIONS.map((sec) => {
            const Icon = sec.icon;
            const isActive = activeSectionId === sec.id;
            return (
              <button
                key={sec.id}
                id={`btn-scroll-to-${sec.id}`}
                onClick={() => handleScrollToSection(sec.id)}
                className={`flex items-center gap-1.5 px-2 lg:px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-white text-blue-700 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
                title={`Gulir ke bagian: ${sec.label}`}
              >
                <Icon
                  className={`w-3.5 h-3.5 shrink-0 ${
                    isActive ? 'text-blue-600' : 'text-slate-400'
                  }`}
                />
                <span className="hidden xl:inline">{sec.label}</span>
                <span className="inline xl:hidden">{sec.shortLabel}</span>
              </button>
            );
          })}
        </nav>

        {/* Mobile / Tablet Compact Screen Dropdown Menu */}
        <div className="relative md:hidden">
          <button
            id="btn-mobile-scroll-menu"
            onClick={() => {
              setShowSectionDropdown(!showSectionDropdown);
              setShowNotifications(false);
              setShowProfileMenu(false);
            }}
            className="flex items-center gap-1.5 h-8 px-2.5 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-slate-700 rounded-md text-xs font-medium transition-colors cursor-pointer"
            title="Lompat ke Bagian Halaman"
          >
            <Compass className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span className="truncate max-w-[120px]">
              {SCROLL_SECTIONS.find((s) => s.id === activeSectionId)?.shortLabel || 'Bagian'}
            </span>
            <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
          </button>

          {showSectionDropdown && (
            <div className="absolute left-1/2 -translate-x-1/2 mt-1.5 w-52 bg-white rounded-lg shadow-xl border border-slate-200 py-1 text-xs z-50 animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                Lompat ke Bagian
              </div>
              {SCROLL_SECTIONS.map((sec) => {
                const Icon = sec.icon;
                const isActive = activeSectionId === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => handleScrollToSection(sec.id)}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon
                        className={`w-3.5 h-3.5 ${
                          isActive ? 'text-blue-600' : 'text-slate-400'
                        }`}
                      />
                      <span>{sec.label}</span>
                    </div>
                    {isActive && <Check className="w-3.5 h-3.5 text-blue-600" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>
        </div>
      )}

      {/* Right Controls & Profile */}
      <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-2.5 shrink-0">
        {variant === 'bpr' && (
          <>
            {/* Action: Unduh Laporan OJK */}
        <button
          id="btn-download-ojk-report"
          onClick={onDownloadReport}
          className="h-8 px-2 sm:px-2.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-md hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
          title="Unduh Berita Acara POJK 29/2024"
        >
          <Download className="w-3.5 h-3.5 text-slate-500" />
          <span className="hidden sm:inline">Laporan OJK</span>
        </button>

        {/* Action: Slide-Over Dossier Toggle */}
        <button
          id="btn-toggle-dossier"
          onClick={onToggleDossier}
          className={`h-8 px-2 sm:px-2.5 text-xs font-medium rounded-md transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer ${
            isDossierOpen
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'
          }`}
          title={isDossierOpen ? 'Tutup Panel Dossier' : 'Buka Panel Dossier'}
        >
          {isDossierOpen ? (
            <PanelRightClose className="w-3.5 h-3.5" />
          ) : (
            <PanelRightOpen className="w-3.5 h-3.5 text-slate-500" />
          )}
          <span className="hidden sm:inline">Dossier</span>
        </button>

        {/* Notifications Bell with subtle status indicator */}
        <div className="relative">
          <button
            id="btn-header-notifications"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
              setShowSectionDropdown(false);
            }}
            className="w-8 h-8 rounded-md border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer relative"
            title="Pemberitahuan Sistem"
          >
            <Bell className="w-3.5 h-3.5" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-blue-600 ring-2 ring-white"></span>
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-1.5 w-72 bg-white rounded-lg shadow-xl border border-slate-200 py-2 text-xs z-50 animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="px-3 py-1.5 font-bold text-slate-900 border-b border-slate-100 flex items-center justify-between">
                <span>Notifikasi Solvensi</span>
                <span className="text-[10px] bg-blue-50 text-blue-600 font-semibold px-1.5 py-0.5 rounded">
                  Baru
                </span>
              </div>
              <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto">
                <div className="p-3 hover:bg-slate-50 cursor-pointer">
                  <div className="font-semibold text-slate-800">
                    Grosir Berkah Barokah mendekati batas kritis
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Buffer kas tersisa 8 hari. Horizon 21-30 hari aktif.
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">10 menit lalu</div>
                </div>
                <div className="p-3 hover:bg-slate-50 cursor-pointer">
                  <div className="font-semibold text-slate-800">
                    Consent digital baru terverifikasi
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Toko Sembako Berkah menyelesaikan e-Sign UU PDP.
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">1 jam lalu</div>
                </div>
              </div>
            </div>
          )}
        </div>

          <div className="h-4 w-px bg-slate-200 mx-0.5 hidden sm:block"></div>
        </>
      )}

      {/* User Profile */}
        <div className="relative">
          <button
            id="user-profile-button"
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
              setShowSectionDropdown(false);
            }}
            className="flex items-center gap-2 p-1 pl-1.5 rounded-md hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="Pak Bambang"
                className="w-7 h-7 rounded-full object-cover border border-slate-200"
                referrerPolicy="no-referrer"
              />
              <span className="w-2 h-2 rounded-full bg-emerald-500 border border-white absolute -bottom-0.5 -right-0.5"></span>
            </div>

            <div className="text-left hidden xl:block leading-tight">
              <div className="text-xs font-semibold text-slate-800">Pak Bambang</div>
              <div className="text-[10.5px] text-slate-400">{variant === 'merchant' ? 'Bisnis Owner' : 'Risk Management'}</div>
            </div>

            <ChevronDown className="w-3 h-3 text-slate-400 hidden xl:block" />
          </button>

          {/* Profile Menu Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-1.5 w-52 bg-white rounded-lg shadow-xl border border-slate-200 py-1.5 text-xs z-50 animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="px-3 py-2 border-b border-slate-100">
                <div className="font-semibold text-slate-900">Pak Bambang</div>
                <div className="text-[11px] text-slate-500">Kadiv Manajemen Risiko</div>
                <div className="text-[10px] text-blue-600 font-mono mt-0.5">bambang@bpr-mitrajatim.id</div>
              </div>
              <div className="py-1">
                <button
                  onClick={() => setShowProfileMenu(false)}
                  className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-slate-700 flex items-center justify-between cursor-pointer"
                >
                  <span>Hak Akses Otoritas</span>
                  <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-mono">
                    Komite-1
                  </span>
                </button>
                <button
                  onClick={() => setShowProfileMenu(false)}
                  className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-slate-700 flex items-center justify-between cursor-pointer"
                >
                  <span>Sertifikat Token OJK</span>
                  <span className="text-emerald-600 flex items-center gap-1 text-[10px]">
                    <Check className="w-3 h-3" /> Valid
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
