import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Smartphone, KeyRound, CheckCircle2, FileText, UploadCloud, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import baiessLogo from '../assets/baiess-logo.svg';

type LoginStep = 'phone' | 'otp' | 'consent' | 'upload' | 'processing' | 'success';

interface MerchantLoginProps {
  onComplete: () => void;
  onBack?: () => void;
}

export function MerchantLogin({ onComplete, onBack }: MerchantLoginProps) {
  const [step, setStep] = useState<LoginStep>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length > 8) {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setStep('otp');
      }, 1000);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Auto advance
      if (value !== '' && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.every(d => d !== '')) {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setStep('consent');
      }, 1000);
    }
  };

  const handleConsent = () => {
    setStep('upload');
  };

  const handleUploadComplete = () => {
    setStep('processing');
    setTimeout(() => {
      setStep('success');
      setTimeout(() => {
        onComplete();
      }, 2500);
    }, 5000); // 5 seconds processing as per requirement
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4 sm:p-6 md:p-8 font-sans relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-100/40 blur-[100px]" />
        <div className="absolute top-[60%] -right-[10%] w-[40%] h-[40%] rounded-full bg-indigo-100/40 blur-[100px]" />
      </div>

      <div className="w-full max-w-md z-10">
        
        {/* Back Button */}
        {onBack && (
          <button
            onClick={onBack}
            className="mb-4 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white/80 hover:bg-white px-3 py-1.5 rounded-full border border-slate-200/80 shadow-xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Beranda BAIESS</span>
          </button>
        )}

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-500/20 mb-4 p-3">
            <img src={baiessLogo} alt="BAIESS" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 font-display">BAIESS</h1>
          <p className="text-slate-500 mt-2 text-sm">Financial Clarity for Greater Tomorrow</p>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden relative">
          
          <div className="p-8">
            <AnimatePresence mode="wait">
              
              {/* STEP 1: Phone Number */}
              {step === 'phone' && (
                <motion.div
                  key="step-phone"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-slate-800 mb-2">Masuk ke Akun Usaha</h2>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      Masukkan nomor WhatsApp Anda yang terdaftar pada BPR mitra.
                    </p>
                  </div>
                  
                  <form onSubmit={handlePhoneSubmit}>
                    <div className="mb-6">
                      <label className="block text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wider">
                        Nomor WhatsApp
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Smartphone className="h-5 w-5 text-slate-400" />
                          <span className="text-slate-500 font-medium ml-2 mr-1">+62</span>
                        </div>
                        <input
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                          className="w-full pl-[5.5rem] pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                          placeholder="812 3456 7890"
                          autoFocus
                        />
                      </div>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={phoneNumber.length < 8 || isProcessing}
                      className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-600/20 transition-all disabled:opacity-50 disabled:shadow-none flex justify-center items-center gap-2"
                    >
                      {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Kirim Kode OTP'}
                    </button>
                  </form>
                </motion.div>
              )}

              {/* STEP 2: OTP */}
              {step === 'otp' && (
                <motion.div
                  key="step-otp"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-6">
                    <button 
                      onClick={() => setStep('phone')}
                      className="text-blue-600 text-sm font-medium mb-4 flex items-center gap-1 hover:underline"
                    >
                      &larr; Ganti Nomor
                    </button>
                    <h2 className="text-xl font-bold text-slate-800 mb-2">Verifikasi OTP</h2>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      Masukkan 6 digit kode yang baru saja kami kirimkan ke WhatsApp +62 {phoneNumber}
                    </p>
                  </div>
                  
                  <form onSubmit={handleOtpSubmit}>
                    <div className="flex gap-2 justify-between mb-8">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          id={`otp-${index}`}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Backspace' && digit === '' && index > 0) {
                              const prevInput = document.getElementById(`otp-${index - 1}`);
                              prevInput?.focus();
                            }
                          }}
                          className="w-12 h-14 text-center text-xl font-bold bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                        />
                      ))}
                    </div>
                    
                    <button
                      type="submit"
                      disabled={!otp.every(d => d !== '') || isProcessing}
                      className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-600/20 transition-all disabled:opacity-50 disabled:shadow-none flex justify-center items-center gap-2"
                    >
                      {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Verifikasi & Lanjut'}
                    </button>
                    
                    <div className="mt-6 text-center">
                      <p className="text-sm text-slate-500">
                        Belum menerima kode? <button type="button" className="text-blue-600 font-semibold hover:underline">Kirim Ulang</button>
                      </p>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* STEP 3: Consent */}
              {step === 'consent' && (
                <motion.div
                  key="step-consent"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-6 text-center">
                    <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4 text-blue-600">
                      <ShieldCheck className="w-8 h-8" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800 mb-2">Persetujuan Izin Data</h2>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      Sesuai standar keamanan, kami memerlukan izin Anda untuk memproses data finansial.
                    </p>
                  </div>
                  
                  <div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-100">
                    <ul className="space-y-3">
                      <li className="flex gap-3 items-start">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-700">Membaca riwayat transaksi untuk analisis omzet.</span>
                      </li>
                      <li className="flex gap-3 items-start">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-700">Membagikan status kesehatan finansial kepada BPR.</span>
                      </li>
                      <li className="flex gap-3 items-start">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-700">Akses hanya digunakan untuk keperluan scoring & top-up.</span>
                      </li>
                    </ul>
                  </div>
                  
                  <button
                    onClick={handleConsent}
                    className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold shadow-lg shadow-slate-900/20 transition-all flex justify-center items-center gap-2"
                  >
                    Saya Setuju & Lanjutkan
                  </button>
                  <button className="w-full mt-3 py-3 text-slate-500 font-medium text-sm hover:text-slate-700 transition-colors">
                    Pelajari Kebijakan Privasi
                  </button>
                </motion.div>
              )}

              {/* STEP 4: First Data Import */}
              {step === 'upload' && (
                <motion.div
                  key="step-upload"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-slate-800 mb-2">Impor Data Pertama</h2>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      Unggah mutasi e-Statement bulan terakhir agar kami bisa langsung membuatkan profil finansial Anda.
                    </p>
                  </div>
                  
                  <div className="border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 p-8 text-center hover:bg-slate-100 hover:border-blue-400 transition-all cursor-pointer group mb-6">
                    <div className="mx-auto w-14 h-14 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 text-blue-500 group-hover:scale-110 transition-transform">
                      <UploadCloud className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-slate-700 mb-1">Unggah PDF/CSV Mutasi</h3>
                    <p className="text-xs text-slate-500">Mendukung file dari BCA, BRI, Mandiri, BNI.</p>
                  </div>

                  <div className="relative py-4 mb-2">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-200"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="bg-white px-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Atau Input Manual</span>
                    </div>
                  </div>

                  <button
                    onClick={handleUploadComplete}
                    className="w-full py-3.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-xl font-semibold transition-all mb-4"
                  >
                    Mulai dengan Saldo Awal (Manual)
                  </button>
                </motion.div>
              )}

              {/* STEP 5: Processing (Generasi Financial State) */}
              {step === 'processing' && (
                <motion.div
                  key="step-processing"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-8"
                >
                  <div className="relative mx-auto w-24 h-24 mb-8">
                    <svg className="animate-spin w-full h-full text-blue-200" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" strokeWidth="8" stroke="currentColor" strokeDasharray="70 200" strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-blue-600">
                      <Loader2 className="w-8 h-8 animate-spin" />
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-bold text-slate-800 mb-2">Menganalisis Transaksi...</h2>
                  <p className="text-slate-500 text-sm">
                    Sistem sedang memproses normalisasi data. Harap tunggu ±5 detik.
                  </p>
                  
                  <div className="mt-8 space-y-3 text-left">
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Mengekstrak riwayat transaksi...
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600 opacity-70">
                      <Loader2 className="w-4 h-4 text-blue-500 animate-spin" /> Menghitung posisi kas aman...
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600 opacity-40">
                      <div className="w-4 h-4 rounded-full border-2 border-slate-200" /> Membangun proyeksi 14 hari...
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 6: Success */}
              {step === 'success' && (
                <motion.div
                  key="step-success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    className="mx-auto w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-emerald-500/30 text-white"
                  >
                    <CheckCircle2 className="w-12 h-12" />
                  </motion.div>
                  
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">Kas Anda Aman!</h2>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">
                    Profil finansial berhasil dibuat. Saldo likuid siap pakai Anda mencukupi untuk operasional 7 hari ke depan.
                  </p>
                  
                  <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100 flex items-center justify-between text-left mb-6">
                    <div>
                      <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">Posisi Kas Efektif</p>
                      <p className="text-2xl font-bold text-slate-900">Rp 12.500.000</p>
                    </div>
                    <div className="w-10 h-10 bg-emerald-200/50 rounded-full flex items-center justify-center text-emerald-700">
                      <ArrowRight className="w-5 h-5 -rotate-45" />
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 font-medium animate-pulse">
                    Mengarahkan ke Dashboard...
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Progress Indicator */}
          {['phone', 'otp', 'consent', 'upload'].includes(step) && (
            <div className="bg-slate-50 border-t border-slate-100 px-8 py-4 flex justify-between items-center">
              <div className="flex gap-2">
                <div className={`w-2 h-2 rounded-full ${step === 'phone' ? 'bg-blue-600 w-6' : 'bg-blue-200'} transition-all`} />
                <div className={`w-2 h-2 rounded-full ${step === 'otp' ? 'bg-blue-600 w-6' : 'bg-blue-200'} transition-all`} />
                <div className={`w-2 h-2 rounded-full ${step === 'consent' ? 'bg-blue-600 w-6' : 'bg-blue-200'} transition-all`} />
                <div className={`w-2 h-2 rounded-full ${step === 'upload' ? 'bg-blue-600 w-6' : 'bg-blue-200'} transition-all`} />
              </div>
              <span className="text-xs font-semibold text-slate-400">
                Langkah {['phone', 'otp', 'consent', 'upload'].indexOf(step) + 1} dari 4
              </span>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-slate-400 font-medium">
            Terlindungi oleh enkripsi 256-bit • Mengikuti standar keamanan OJK
          </p>
        </div>
      </div>
    </div>
  );
}
