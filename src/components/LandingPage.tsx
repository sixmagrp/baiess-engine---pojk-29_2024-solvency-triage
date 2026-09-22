import React, { useState } from 'react';
import {
  ShieldCheck,
  Building2,
  Store,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  FileCheck2,
  Sparkles,
  Zap,
  Lock,
  ChevronRight,
  CheckCircle2,
  BarChart3,
  Users2,
  Check,
  RotateCw,
  Smartphone,
  ExternalLink,
  Shield,
  HelpCircle,
  Clock,
  Briefcase
} from 'lucide-react';
import baiessLogo from '../assets/baiess-logo.png';

interface LandingPageProps {
  onEnterBpr: () => void;
  onEnterMerchant: () => void;
  onEnterLogin: () => void;
}

export function LandingPage({ onEnterBpr, onEnterMerchant, onEnterLogin }: LandingPageProps) {
  // Active tab for the ecosystem feature viewer
  const [activeEcosystemTab, setActiveEcosystemTab] = useState<'bpr' | 'merchant'>('bpr');

  // Interactive Solvency Triage Simulator State
  const [simKas, setSimKas] = useState<number>(3800000);
  const [simInflowDaily, setSimInflowDaily] = useState<number>(350000);
  const [simPiutangWarung, setSimPiutangWarung] = useState<number>(4500000);
  const [simAngsuran, setSimAngsuran] = useState<number>(2750000);
  const [simDaysToDue, setSimDaysToDue] = useState<number>(14);

  // Calculate buffer days & zone based on simulator inputs
  const estimatedCashAtDue = simKas + (simInflowDaily * simDaysToDue) + (simPiutangWarung * 0.4) - simAngsuran;
  const bufferDays = Math.max(0, Math.round(simKas / Math.max(simAngsuran / 30, 100000)));

  let simZone: 'safe' | 'warning' | 'critical' = 'safe';
  let simZoneTitle = 'Zona Hijau: Solvensi Stabil';
  let simZoneDesc = 'Cadangan kas operasional mencukupi kewajiban angsuran BPR dan likuiditas perputaran warung.';
  let simProtocol = 'Pertahankan perputaran stok. Debitur layak diusulkan peningkatan plafon modal kerja.';

  if (estimatedCashAtDue < 0 || bufferDays <= 8) {
    simZone = 'critical';
    simZoneTitle = 'Zona Merah: Intervensi Kritis Segera';
    simZoneDesc = 'Buffer likuiditas menipis dalam horizon 21–30 hari. Risiko defisit kas tinggi menjelang jatuh tempo angsuran.';
    simProtocol = 'Protokol Preskriptif Komite: Disposisi Account Officer via WhatsApp, percepat penagihan piutang warung, dan restrukturisasi tenor sesuai POJK 29/2024.';
  } else if (estimatedCashAtDue < simAngsuran * 0.5 || bufferDays <= 18) {
    simZone = 'warning';
    simZoneTitle = 'Zona Kuning: Pantauan Waspada';
    simZoneDesc = 'Buffer kas menipis. Arus kas harian melambat sementara jadwal angsuran kredit BPR mendekat.';
    simProtocol = 'Protokol Pendampingan: Aktifkan peringatan dini Financial Copilot & dampingi penagihan piutang.';
  }

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Apa itu BAIESS dan mengapa dirancang khusus untuk ekosistem BPR?',
      a: 'BAIESS (Bank-Assisted Intelligent Early-warning Solvency System) adalah Decision Support System (DSS) yang menjembatani Lembaga Keuangan (BPR) dan debitur mikro/pedagang pasar. BAIESS mendeteksi risiko defisit likuiditas dalam rentang 21–30 hari sebelum tanggal angsuran kredit, mencegah pemburukan dari Kol-1 ke Kol-2/NPL secara preventif.'
    },
    {
      q: 'Bagaimana kepatuhan BAIESS terhadap regulasi POJK No. 29/2024?',
      a: 'POJK No. 29/2024 mewajibkan BPR menerapkan manajemen risiko kredit berkelanjutan dan pemantauan kualitas aset proaktif. BAIESS mengotomatisasi kalkulasi rasio solvensi, rekomendasi restrukturisasi SK Direksi, serta laporan audit berkala yang siap diserahkan kepada pengawas Otoritas Jasa Keuangan (OJK).'
    },
    {
      q: 'Bagaimana privasi data debitur dilindungi sesuai UU PDP No. 27/2022?',
      a: 'Setiap data debitur dienkripsi dengan standar pseudonimisasi SHA-256. Data identitas sensitif (nama lengkap & NIK) disamarkan pada log publik, setiap aksi Account Officer tercatat pada immutable audit trail kriptografis, dan izin persetujuan (digital consent) debitur dapat dikelola secara transparan.'
    },
    {
      q: 'Apakah pelaku usaha mikro (pedagang pasar) membutuhkan pembukuan yang rumit?',
      a: 'Tidak perlu. Pelaku usaha cukup menggunakan aplikasi pencatatan kasir PWA Pasar sederhana atau menghubungkan mutasi rekening harian. BAIESS secara otomatis mengolah data menjadi metrik kas efektif, siklus konversi kas (CCC), dan proyeksi arus kas tanpa membebani debitur.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] font-sans antialiased selection:bg-blue-600 selection:text-white">
      
      {/* TOP HEADER BAR (Matching Dashboard Header Style) */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-2xs">
        <div className="max-w-[1700px] mx-auto px-4 md:px-6 lg:px-7 h-16 flex items-center justify-between">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3">
            <img src={baiessLogo} alt="BAIESS" className="w-24 h-18 object-contain shrink-0" />
            <div className="hidden sm:block h-6 w-px bg-slate-200 mx-1" />
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-800">
                Solvency Triage Platform
              </span>
              <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                POJK 29/2024 AUDIT READY
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/90 p-1 rounded-lg border border-slate-200/80 text-xs font-medium">
            <a
              href="#profil-baiess"
              className="px-3 py-1.5 rounded-md text-slate-600 hover:text-slate-900 hover:bg-white/70 transition-colors"
            >
              Tentang Platform
            </a>
            <a
              href="#solusi-dua-sisi"
              className="px-3 py-1.5 rounded-md text-slate-600 hover:text-slate-900 hover:bg-white/70 transition-colors"
            >
              Solusi 2 Sisi
            </a>
            <a
              href="#simulator-triase"
              className="px-3 py-1.5 rounded-md text-slate-600 hover:text-slate-900 hover:bg-white/70 transition-colors"
            >
              Simulator Triase
            </a>
            <a
              href="#kepatuhan-regulasi"
              className="px-3 py-1.5 rounded-md text-slate-600 hover:text-slate-900 hover:bg-white/70 transition-colors"
            >
              Regulasi & PDP
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2">
            <button
              onClick={onEnterMerchant}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors cursor-pointer"
            >
              <Store className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">Portal</span> Usahawan
            </button>
            <button
              onClick={onEnterBpr}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Akses Dashboard BPR</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-[1700px] mx-auto p-4 md:p-6 lg:p-7">
        
        {/* HERO SECTION */}
        <section className="mb-10 pt-2 pb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <span className="text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded">
                  EARLY-WARNING SOLVENCY TRIAGE & DECISION SUPPORT SYSTEM
                </span>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded flex items-center gap-1">
                  <Check className="w-3 h-3 text-emerald-600" /> UU PDP NO. 27/2022 COMPLIANT
                </span>
              </div>
              <h1 className="text-2xl md:text-4xl font-bold text-slate-900 tracking-tight font-display mb-3">
                Kejernihan Likuiditas Real-Time untuk BPR & Ekosistem Usaha Mikro
              </h1>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                <strong>BAIESS</strong> (<em>Bank-Assisted Intelligent Early-warning Solvency System</em>) mendeteksi 
                potensi defisit likuiditas debitur mikro dalam rentang horizon <strong>21–30 hari</strong> sebelum tanggal angsuran kredit BPR, 
                memungkinkan intervensi preskriptif cepat sebelum terjadi pemburukan kualitas kredit (NPL).
              </p>
            </div>

            {/* Quick Synchronized Metric Badge */}
            <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-2xs shrink-0 self-start lg:self-center min-w-[280px]">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <span>Status Sistem Engine</span>
                <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Aktif
                </span>
              </div>
              <div className="text-xs text-slate-700 space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Akurasi Prediksi SARIMA:</span>
                  <span className="font-semibold text-slate-900 font-mono">94.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Horizon Deteksi Dini:</span>
                  <span className="font-semibold text-blue-700 font-mono">21–30 Hari</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Standar Audit:</span>
                  <span className="font-semibold text-slate-900">POJK 29/2024</span>
                </div>
              </div>
            </div>
          </div>

          {/* DUAL GATEWAY CARDS (Matching SolvencyCards & BottomCards UI Style) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            
            {/* GATEWAY 1: INSTITUSI KEUANGAN (BPR) */}
            <div className="bg-white rounded-lg p-5 md:p-6 border border-slate-200 hover:border-blue-300 transition-all shadow-2xs flex flex-col justify-between relative">
              <div className="absolute top-4 right-4">
                <span className="text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded">
                  PORTAL INSTITUSI
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900">
                      Dashboard Manajemen Risiko BPR
                    </h2>
                    <p className="text-[11px] text-slate-500">Otoritas Komite Kredit & Account Officer</p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Dirancang untuk Direksi, Komite Kredit, dan Account Officer (AO). Pantau portofolio debitur mikro dalam 3 zona solvensi, eksekusi rekomendasi restrukturisasi SK Direksi, dan kirim rute penugasan AO via WhatsApp.
                </p>

                <div className="space-y-2 mb-6 pt-3 border-t border-slate-100 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>Early-Warning Solvency Triage 3-Zona (Hijau, Kuning, Merah)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>Kalkulasi Otomatis POJK 29/2024 Audit Ready</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>Smart Field Routing AO Lapangan Pasar Tradisional</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>Cryptographic Audit Trail UU PDP No. 27/2022 (SHA-256)</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">Akses BPR Mitra Jatim</span>
                <button
                  id="btn-enter-bpr-dashboard"
                  onClick={onEnterBpr}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
                >
                  <span>Buka Dashboard BPR</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* GATEWAY 2: PELAKU USAHA MIKRO (MERCHANT / DEBITUR) */}
            <div className="bg-white rounded-lg p-5 md:p-6 border border-slate-200 hover:border-emerald-300 transition-all shadow-2xs flex flex-col justify-between relative">
              <div className="absolute top-4 right-4">
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded">
                  PORTAL USAHAWAN
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center">
                    <Store className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900">
                      Portal Finansial Usahawan Mikro
                    </h2>
                    <p className="text-[11px] text-slate-500">Pemberdayaan Kas & Keputusan Keuangan AI</p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Dirancang khusus bagi pedagang pasar dan debitur mikro. Dapatkan visibilitas penuh terhadap posisi kas efektif siap pakai, buku piutang warung, proyeksi arus kas SARIMA, serta rekomendasi AI Financial Copilot.
                </p>

                <div className="space-y-2 mb-6 pt-3 border-t border-slate-100 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Monitoring Posisi Kas Efektif & Batas Penyangga Kas Aman</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Forecasting Arus Kas SARIMA Horizon 7, 14, dan 30 Hari</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>AI Financial Copilot & Template Tagih Piutang WhatsApp</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Financing Readiness Score untuk Pengajuan Modal Kerja</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  id="btn-login-merchant-otp"
                  onClick={onEnterLogin}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors cursor-pointer"
                >
                  <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Login WhatsApp OTP</span>
                </button>
                <button
                  id="btn-enter-merchant-direct"
                  onClick={onEnterMerchant}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
                >
                  <span>Buka Dashboard Usaha</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

          {/* 4 SUMMARY STAT CARDS (Identical to Dashboard SolvencyCards layout) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tight">Deteksi Dini</span>
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              </div>
              <div className="text-2xl font-bold text-slate-900 font-display">21–30 Hari</div>
              <p className="text-[11px] text-slate-600 mt-1">Sebelum tanggal jatuh tempo angsuran kredit BPR.</p>
            </div>

            <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tight">Akurasi Kas</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              </div>
              <div className="text-2xl font-bold text-slate-900 font-display">94.2%</div>
              <p className="text-[11px] text-slate-600 mt-1">Validasi model SARIMA & deteksi anomali likuiditas.</p>
            </div>

            <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tight">Kepatuhan OJK</span>
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              </div>
              <div className="text-2xl font-bold text-slate-900 font-display">100%</div>
              <p className="text-[11px] text-slate-600 mt-1">Sesuai POJK No. 29/2024 Manajemen Risiko Kredit.</p>
            </div>

            <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tight">Latensi Keputusan</span>
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
              </div>
              <div className="text-2xl font-bold text-slate-900 font-display">&lt; 1.2 Detik</div>
              <p className="text-[11px] text-slate-600 mt-1">Kalkulasi real-time klasifikasi zona & dossier SK.</p>
            </div>
          </div>
        </section>

        {/* SECTION: PROFIL BAIESS (Institutional Profile & Problem Solving) */}
        <section id="profil-baiess" className="mb-10 pt-4 border-t border-slate-200">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight font-display">
                Profil Platform BAIESS
              </h2>
              <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                CORE ARCHITECTURE
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Menjembatani kesenjangan informasi antara Lembaga Jasa Keuangan (BPR) dan pelaku usaha mikro di pasar tradisional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-lg p-5 border border-slate-200 shadow-2xs">
              <div className="w-8 h-8 rounded-lg bg-red-50 border border-red-200 text-red-700 flex items-center justify-center mb-3">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1.5">Tantangan Asimetri Likuiditas</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                BPR umumnya baru mendeteksi masalah setelah debitur menunggak angsuran. Sementara itu, pedagang pasar mikro mengalami kebuntuan kas akibat piutang pelanggan warung yang macet tanpa pencatatan umur piutang (AR aging).
              </p>
            </div>

            <div className="bg-white rounded-lg p-5 border border-slate-200 shadow-2xs">
              <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center mb-3">
                <Zap className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1.5">Triase Solvensi Preskriptif</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                BAIESS tidak sekadar menampilkan grafik, melainkan merumuskan langkah penyelamatan konkret: memicu penagihan piutang warung via template WhatsApp, menghitung skema restrukturisasi tenor, dan memandu Account Officer ke lokasi debitur.
              </p>
            </div>

            <div className="bg-white rounded-lg p-5 border border-slate-200 shadow-2xs">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mb-3">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1.5">Standar Regulasi POJK & PDP</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Memenuhi ketentuan <strong>POJK 29/2024</strong> untuk pemantauan berkelanjutan portofolio kredit mikro dan <strong>UU PDP No. 27/2022</strong> dengan enkripsi data nasabah sensitif dan audit trail yang tidak dapat dimanipulasi.
              </p>
            </div>
          </div>

          {/* Visi Misi Quote Banner */}
          <div className="bg-white rounded-lg p-5 border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Semboyan Platform</span>
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                  MISI SOSIAL-FINANSIAL
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 font-display">
                &ldquo;Financial Clarity for Greater Tomorrow&rdquo;
              </h3>
              <p className="text-xs text-slate-600 mt-1 max-w-3xl">
                Membangun ekosistem perbankan mikro yang tangguh di mana bank aman dari risiko NPL mendadak, dan pedagang pasar mendapatkan pendampingan keuangan yang objektif, transparan, dan terpercaya.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={onEnterBpr}
                className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
              >
                Masuk Dashboard BPR
              </button>
              <button
                onClick={onEnterMerchant}
                className="px-3.5 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors cursor-pointer"
              >
                Masuk Dashboard Usahawan
              </button>
            </div>
          </div>
        </section>

        {/* SECTION: SOLUSI DUA SISI (Tab Switcher like Dashboard Tabs) */}
        <section id="solusi-dua-sisi" className="mb-10 pt-4 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight font-display">
                  Solusi Ekosistem Dua Sisi
                </h2>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                  INTEGRATED MODULES
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Fitur-fitur modular yang disesuaikan secara presisi untuk institusi BPR maupun debitur usahawan mikro.
              </p>
            </div>

            {/* Segmented Switcher */}
            <div className="inline-flex bg-slate-100 p-1 rounded-lg border border-slate-200 shrink-0 self-start sm:self-center">
              <button
                onClick={() => setActiveEcosystemTab('bpr')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  activeEcosystemTab === 'bpr'
                    ? 'bg-white text-blue-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Building2 className="w-3.5 h-3.5 text-blue-600" />
                <span>Untuk Institusi BPR</span>
              </button>
              <button
                onClick={() => setActiveEcosystemTab('merchant')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  activeEcosystemTab === 'merchant'
                    ? 'bg-white text-emerald-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Store className="w-3.5 h-3.5 text-emerald-600" />
                <span>Untuk Usahawan Mikro</span>
              </button>
            </div>
          </div>

          {/* TAB CONTENT: BPR */}
          {activeEcosystemTab === 'bpr' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in duration-150">
              <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-900">Triase Solvensi 3-Zona</span>
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    Pengelompokan debitur mikro secara otomatis ke dalam Zona Hijau (Aman), Zona Kuning (Waspada), dan Zona Merah (Kritis) berdasar buffer hari kas.
                  </p>
                </div>
                <span className="text-[11px] font-semibold text-blue-600 flex items-center gap-1 pt-2 border-t border-slate-100">
                  Fitur A • Solvency Matrix <ChevronRight className="w-3 h-3" />
                </span>
              </div>

              <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-900">Dossier Restrukturisasi SK</span>
                    <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    Penyusunan berkas komite kredit siap cetak, usulan skema penyesuaian angsuran, serta justifikasi mitigasi risiko kredit sesuai SK Direksi.
                  </p>
                </div>
                <span className="text-[11px] font-semibold text-indigo-600 flex items-center gap-1 pt-2 border-t border-slate-100">
                  Fitur Komite • Preskriptif SK <ChevronRight className="w-3 h-3" />
                </span>
              </div>

              <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-900">Smart AO Field Routing</span>
                    <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    Disposisi penugasan Account Officer ke titik pasar debitur dengan rute optimal dan instruksi intervensi otomatis via pesan WhatsApp.
                  </p>
                </div>
                <span className="text-[11px] font-semibold text-teal-600 flex items-center gap-1 pt-2 border-t border-slate-100">
                  Fitur Penugasan • Rute Pasar <ChevronRight className="w-3 h-3" />
                </span>
              </div>

              <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-900">Audit Kepatuhan OJK & PDP</span>
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    Ekspor laporan pengawasan berkala POJK 29/2024 dan log audit trail bertanda tangan kriptografis SHA-256 untuk kepatuhan UU PDP No. 27/2022.
                  </p>
                </div>
                <span className="text-[11px] font-semibold text-purple-600 flex items-center gap-1 pt-2 border-t border-slate-100">
                  Fitur Audit • Immutable Logs <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          )}

          {/* TAB CONTENT: MERCHANT */}
          {activeEcosystemTab === 'merchant' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 animate-in fade-in duration-150">
              <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-2xs flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                    FITUR B
                  </span>
                  <h3 className="text-xs font-bold text-slate-900 mt-2 mb-1">Financial State Engine</h3>
                  <p className="text-[11.5px] text-slate-600 leading-relaxed">
                    Posisi kas efektif siap pakai, batas penyangga kas aman (buffer), dan siklus perputaran piutang (CCC).
                  </p>
                </div>
                <span className="text-[11px] font-semibold text-emerald-600 pt-2 border-t border-slate-100">Real-time Cash</span>
              </div>

              <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-2xs flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded">
                    FITUR C
                  </span>
                  <h3 className="text-xs font-bold text-slate-900 mt-2 mb-1">Tactical Forecast</h3>
                  <p className="text-[11.5px] text-slate-600 leading-relaxed">
                    Proyeksi arus kas model SARIMA horizon 7, 14, 30 hari dengan batas optimistis (80%) dan pesimistis (20%).
                  </p>
                </div>
                <span className="text-[11px] font-semibold text-teal-600 pt-2 border-t border-slate-100">SARIMA Horizon</span>
              </div>

              <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-2xs flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                    FITUR D
                  </span>
                  <h3 className="text-xs font-bold text-slate-900 mt-2 mb-1">Early Warning Alerts</h3>
                  <p className="text-[11.5px] text-slate-600 leading-relaxed">
                    Peringatan cerdas jika piutang warung mulai menumpuk atau penjualan harian mengalami tren anomali.
                  </p>
                </div>
                <span className="text-[11px] font-semibold text-amber-600 pt-2 border-t border-slate-100">Deteksi Anomali</span>
              </div>

              <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-2xs flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                    FITUR E
                  </span>
                  <h3 className="text-xs font-bold text-slate-900 mt-2 mb-1">AI Financial Copilot</h3>
                  <p className="text-[11.5px] text-slate-600 leading-relaxed">
                    Konsultasi keputusan finansial harian berbasis AI dengan draf pesan tagih ramah ke warung via WhatsApp.
                  </p>
                </div>
                <span className="text-[11px] font-semibold text-blue-600 pt-2 border-t border-slate-100">Gemini LLM Copilot</span>
              </div>

              <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-2xs flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded">
                    FITUR F
                  </span>
                  <h3 className="text-xs font-bold text-slate-900 mt-2 mb-1">Financing Readiness</h3>
                  <p className="text-[11.5px] text-slate-600 leading-relaxed">
                    Skor kesiapan kredit 0–100 dan estimasi modal kerja tanpa agunan keras untuk perluasan pinjaman BPR.
                  </p>
                </div>
                <span className="text-[11px] font-semibold text-purple-600 pt-2 border-t border-slate-100">Credit Scoring</span>
              </div>
            </div>
          )}
        </section>

        {/* SECTION: INTERACTIVE SOLVENCY SIMULATOR (Matching Dashboard Cards & Input Style) */}
        <section id="simulator-triase" className="mb-10 pt-4 border-t border-slate-200">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight font-display">
                Simulator Triase Solvensi Interaktif
              </h2>
              <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                LIVE DEMO WIDGET
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Uji coba bagaimana mesin BAIESS memproses data saldo kas, piutang, dan jadwal angsuran kredit secara real-time.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 bg-white rounded-lg p-5 md:p-6 border border-slate-200 shadow-2xs">
            
            {/* Left Controls */}
            <div className="lg:col-span-7 space-y-4">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex justify-between text-xs font-medium mb-1.5">
                  <span className="text-slate-700">Saldo Kas Siap Pakai Saat Ini:</span>
                  <span className="font-bold text-blue-700 font-mono">Rp {simKas.toLocaleString('id-ID')}</span>
                </div>
                <input
                  type="range"
                  min="500000"
                  max="12000000"
                  step="250000"
                  value={simKas}
                  onChange={(e) => setSimKas(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex justify-between text-xs font-medium mb-1.5">
                  <span className="text-slate-700">Estimasi Penjualan Tunai Harian:</span>
                  <span className="font-bold text-blue-700 font-mono">Rp {simInflowDaily.toLocaleString('id-ID')} / hari</span>
                </div>
                <input
                  type="range"
                  min="100000"
                  max="1200000"
                  step="50000"
                  value={simInflowDaily}
                  onChange={(e) => setSimInflowDaily(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex justify-between text-xs font-medium mb-1.5">
                  <span className="text-slate-700">Total Piutang Warung Aktif:</span>
                  <span className="font-bold text-blue-700 font-mono">Rp {simPiutangWarung.toLocaleString('id-ID')}</span>
                </div>
                <input
                  type="range"
                  min="500000"
                  max="10000000"
                  step="250000"
                  value={simPiutangWarung}
                  onChange={(e) => setSimPiutangWarung(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex justify-between text-xs font-medium mb-1.5">
                    <span className="text-slate-700">Angsuran BPR:</span>
                    <span className="font-bold text-amber-700 font-mono">Rp {simAngsuran.toLocaleString('id-ID')}</span>
                  </div>
                  <input
                    type="range"
                    min="1000000"
                    max="5000000"
                    step="250000"
                    value={simAngsuran}
                    onChange={(e) => setSimAngsuran(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                  />
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex justify-between text-xs font-medium mb-1.5">
                    <span className="text-slate-700">Sisa Hari Jatuh Tempo:</span>
                    <span className="font-bold text-indigo-700 font-mono">{simDaysToDue} Hari Lagi</span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="30"
                    step="1"
                    value={simDaysToDue}
                    onChange={(e) => setSimDaysToDue(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>
              </div>
            </div>

            {/* Right Result Card (Mirrors SolvencyCards visual token) */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div className={`rounded-lg p-5 border transition-all ${
                simZone === 'critical'
                  ? 'bg-red-50/70 border-red-300 text-red-950'
                  : simZone === 'warning'
                  ? 'bg-amber-50/70 border-amber-300 text-amber-950'
                  : 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${
                      simZone === 'critical'
                        ? 'bg-red-500 shadow-[0_0_6px_#ef4444]'
                        : simZone === 'warning'
                        ? 'bg-amber-500 shadow-[0_0_6px_#f59e0b]'
                        : 'bg-emerald-500 shadow-[0_0_6px_#10b981]'
                    }`}></span>
                    <span className="text-xs font-bold uppercase tracking-tight">
                      {simZoneTitle}
                    </span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                    simZone === 'critical'
                      ? 'text-red-700 bg-red-100 border-red-300'
                      : simZone === 'warning'
                      ? 'text-amber-700 bg-amber-100 border-amber-300'
                      : 'text-emerald-700 bg-emerald-100 border-emerald-300'
                  }`}>
                    {simZone === 'critical' ? 'KOL-2 WARNING' : simZone === 'warning' ? 'WATCHLIST' : 'KOL-1 LANCAR'}
                  </span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed mb-4">
                  {simZoneDesc}
                </p>

                <div className="space-y-2 p-3 bg-white/90 rounded-md border border-slate-200 text-xs mb-4">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Penyangga Kas (Buffer Days):</span>
                    <span className="font-bold text-slate-900 font-mono">{bufferDays} Hari</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Estimasi Kas H-Jatuh Tempo:</span>
                    <span className={`font-bold font-mono ${estimatedCashAtDue >= 0 ? 'text-emerald-700' : 'text-red-700'}`}>
                      Rp {estimatedCashAtDue.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Kepatuhan Regulasi:</span>
                    <span className="font-semibold text-blue-700">Pasal 14 POJK 29/2024</span>
                  </div>
                </div>

                <div className="p-2.5 rounded bg-white/80 border border-slate-200 text-[11px] text-slate-700 leading-relaxed">
                  <strong className="text-slate-900">Rekomendasi Preskriptif:</strong> {simProtocol}
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">Coba kalkulasi lebih detail di dashboard:</span>
                <button
                  onClick={onEnterBpr}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  Buka Dossier BPR <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION: ALUR KERJA SISTEM (4-Step Workflow) */}
        <section className="mb-10 pt-4 border-t border-slate-200">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight font-display">
                Alur Kerja Sistem Triase
              </h2>
              <span className="text-[10px] font-bold text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                END-TO-END WORKFLOW
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Integrasi data transaksi dari pasar tradisional hingga pengambilan keputusan komite kredit BPR.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-2xs">
              <div className="text-xs font-bold text-blue-600 font-mono mb-2">01. INGEST DATA RIIL</div>
              <h3 className="text-xs font-bold text-slate-900 mb-1.5">PWA Pasar & Mutasi Bank</h3>
              <p className="text-[11.5px] text-slate-600 leading-relaxed">
                Sinkronisasi pencatatan penjualan kasir PWA Pasar Wonokromo, saldo mutasi rekening BPR, dan buku piutang warung secara harian.
              </p>
            </div>

            <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-2xs">
              <div className="text-xs font-bold text-indigo-600 font-mono mb-2">02. ANALISIS MESIN</div>
              <h3 className="text-xs font-bold text-slate-900 mb-1.5">SARIMA & Likuiditas</h3>
              <p className="text-[11.5px] text-slate-600 leading-relaxed">
                Kalkulasi Siklus Konversi Kas (CCC), buffer margin, dan proyeksi kas 7–30 hari dengan batas keyakinan 80%/20%.
              </p>
            </div>

            <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-2xs">
              <div className="text-xs font-bold text-emerald-600 font-mono mb-2">03. TRIASE 3-ZONA</div>
              <h3 className="text-xs font-bold text-slate-900 mb-1.5">Early-Warning Matrix</h3>
              <p className="text-[11.5px] text-slate-600 leading-relaxed">
                Pengelompokan otomatis status solvensi debitur mikro 21–30 hari sebelum jatuh tempo dengan formulasi restrukturisasi SK Direksi.
              </p>
            </div>

            <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-2xs">
              <div className="text-xs font-bold text-teal-600 font-mono mb-2">04. AKSI LAPANGAN</div>
              <h3 className="text-xs font-bold text-slate-900 mb-1.5">AO WhatsApp Dispatch</h3>
              <p className="text-[11.5px] text-slate-600 leading-relaxed">
                Disposisi penugasan Account Officer ke klaster pasar terdekat via WhatsApp untuk mendampingi percepatan penagihan piutang debitur.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION: KEPATUHAN REGULASI & PDP AUDIT */}
        <section id="kepatuhan-regulasi" className="mb-10 pt-4 border-t border-slate-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            
            <div className="lg:col-span-7 bg-white rounded-lg p-5 md:p-6 border border-slate-200 shadow-2xs">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                <h2 className="text-base font-bold text-slate-900 font-display">
                  Kepatuhan Regulasi POJK 29/2024 & UU PDP No. 27/2022
                </h2>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                BAIESS dibangun dengan prinsip <em>Compliance by Design</em> dan <em>Privacy by Design</em>. Seluruh alur kerja telah diaudit untuk memenuhi tata kelola perbankan Indonesia dan melindungi data nasabah mikro.
              </p>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-start gap-2.5">
                  <FileCheck2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800">POJK No. 29/2024: Manajemen Risiko Kredit Berkelanjutan</span>
                    <p className="text-slate-600 mt-0.5">
                      Memenuhi kewajiban pemantauan dini debitur mikro secara terstruktur dan penyusunan laporan kolektibilitas yang terstandarisasi bagi pengawas OJK.
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-start gap-2.5">
                  <Lock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800">UU No. 27/2022: Perlindungan Data Pribadi (PDP)</span>
                    <p className="text-slate-600 mt-0.5">
                      Penyamaran identitas nasabah (pseudonymization), audit trail kriptografis SHA-256 yang tidak dapat dimanipulasi, dan pengelolaan digital consent transparan.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Audit Box */}
            <div className="lg:col-span-5 bg-white rounded-lg p-5 md:p-6 border border-slate-200 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-tight">
                    Audit Verification Status
                  </h3>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                    TERVERIFIKASI
                  </span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500">Status POJK 29/2024:</span>
                    <span className="font-semibold text-emerald-700 flex items-center gap-1">
                      <Check className="w-3 h-3 text-emerald-600" /> Audit Ready
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500">Enkripsi Log PDP:</span>
                    <span className="font-mono text-slate-800">SHA-256 Valid</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500">Consent Management:</span>
                    <span className="font-semibold text-emerald-700">Digital e-Sign Active</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-500">Mitra Implementasi:</span>
                    <span className="font-semibold text-slate-800">BPR Mitra Jatim</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Dokumen Audit Resmi</span>
                <span className="font-semibold text-slate-700">Tahun Buku 2026</span>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION: FAQ ACCORDION (Light Clean Style) */}
        <section className="mb-10 pt-4 border-t border-slate-200 max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight font-display">
              Pertanyaan Umum Seputar BAIESS
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Panduan ringkas mengenai implementasi operasional dan kepatuhan sistem.
            </p>
          </div>

          <div className="space-y-2.5">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-2xs transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full px-4 py-3 text-left font-semibold text-slate-800 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors cursor-pointer text-xs sm:text-sm"
                  >
                    <span>{faq.q}</span>
                    <span className={`text-slate-400 text-xs transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                      ▼
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-3.5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* FOOTER CALL TO ACTION (Matching Dashboard Bottom Card Style) */}
        <section className="bg-white rounded-lg p-6 border border-slate-200 shadow-2xs text-center mb-6">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 font-display mb-2">
            Mulai Akses Solvency Triage Platform
          </h2>
          <p className="text-xs text-slate-600 max-w-2xl mx-auto mb-5">
            Pilih portal sesuai peran Anda untuk mengakses sistem manajemen risiko BPR atau dasbor pendampingan usahawan mikro.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onEnterBpr}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Masuk Dashboard Institusi BPR</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onEnterMerchant}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
            >
              <Store className="w-3.5 h-3.5" />
              <span>Masuk Portal Usahawan Mikro</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>

      </main>

      {/* FOOTER (Matching Dashboard System Style) */}
      <footer className="bg-white border-t border-slate-200 py-6 text-xs text-slate-500">
        <div className="max-w-[1700px] mx-auto px-4 md:px-6 lg:px-7 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={baiessLogo} alt="BAIESS" className="w-20 h-14 object-contain" />
            <div className="text-[11px]">
              <span className="font-semibold text-slate-800">BAIESS Engine</span> — POJK 29/2024 Solvency Triage & DSS Likuiditas
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-slate-600 text-[11px]">
            <button onClick={onEnterBpr} className="hover:text-blue-600 transition-colors cursor-pointer">
              Dashboard BPR
            </button>
            <button onClick={onEnterMerchant} className="hover:text-emerald-600 transition-colors cursor-pointer">
              Dashboard Usahawan
            </button>
            <a href="#kepatuhan-regulasi" className="hover:text-slate-900 transition-colors">
              POJK No. 29/2024
            </a>
            <a href="#kepatuhan-regulasi" className="hover:text-slate-900 transition-colors">
              UU PDP No. 27/2022
            </a>
          </div>

          <p className="text-[11px] text-slate-400">
            © 2026 BAIESS • Financial Clarity for Greater Tomorrow
          </p>
        </div>
      </footer>

    </div>
  );
}
