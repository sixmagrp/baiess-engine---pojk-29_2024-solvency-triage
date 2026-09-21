import React, { useState } from 'react';
import {
  X,
  Smartphone,
  CheckCircle2,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  ShieldCheck,
  RefreshCw,
  Clock,
} from 'lucide-react';
import { Debtor } from '../types';

interface PwaModalProps {
  isOpen: boolean;
  onClose: () => void;
  debtor: Debtor;
  onSyncSuccess?: () => void;
}

export const PwaModal: React.FC<PwaModalProps> = ({
  isOpen,
  onClose,
  debtor,
  onSyncSuccess,
}) => {
  const [inflowToday, setInflowToday] = useState(3850000);
  const [outflowToday, setOutflowToday] = useState(1200000);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'synced'>('synced');
  const [recentEntries, setRecentEntries] = useState([
    { id: 1, title: 'Warung Bu Siti (Bayar Piutang)', amount: 650000, type: 'in', time: '12:15 WIB' },
    { id: 2, title: 'Faktur Pengiriman Indomie PT Wings', amount: 1200000, type: 'out', time: '10:30 WIB' },
    { id: 3, title: 'Toko Barokah (Pelunasan Parsial)', amount: 1500000, type: 'in', time: '09:05 WIB' },
    { id: 4, title: 'Penjualan Beras Tunai Pasar', amount: 1700000, type: 'in', time: '07:45 WIB' },
  ]);
  const [showAddEntry, setShowAddEntry] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newAmount, setNewAmount] = useState('');

  if (!isOpen) return null;

  const handleTriggerSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncStatus('synced');
      if (onSyncSuccess) onSyncSuccess();
    }, 1000);
  };

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newAmount) return;
    const amountNum = parseInt(newAmount.replace(/[^0-9]/g, ''), 10) || 0;
    setRecentEntries([
      {
        id: Date.now(),
        title: newTitle,
        amount: amountNum,
        type: 'in',
        time: 'Baru saja',
      },
      ...recentEntries,
    ]);
    setInflowToday((prev) => prev + amountNum);
    setNewTitle('');
    setNewAmount('');
    setShowAddEntry(false);
    handleTriggerSync();
  };

  return (
    <div
      id="pwa-simulator-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200"
    >
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-[420px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Device Frame Header */}
        <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-bold tracking-tight">
              PWA Pedagang Pasar Wonokromo
            </span>
            <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-1.5 py-0.2 rounded font-mono">
              390x844px
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Viewport Screen (390px styled) */}
        <div className="bg-[#f8fafc] flex-1 overflow-y-auto p-4 space-y-3 font-sans text-slate-900">
          {/* Top Bar inside PWA */}
          <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[11px] text-slate-500 font-medium">Buku Kas Harian Pedagang</div>
                <div className="text-sm font-bold text-slate-900">{debtor.name}</div>
                <div className="text-[10.5px] text-slate-500">{debtor.owner} • {debtor.market}</div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  UU PDP Aktif
                </span>
                <div className="text-[9.5px] text-slate-400 mt-1">E2E Enkripsi BPR</div>
              </div>
            </div>
          </div>

          {/* Balance Cards */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-left">
              <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-800">
                <ArrowDownLeft className="w-3.5 h-3.5 text-emerald-600" />
                <span>Pemasukan Hari Ini</span>
              </div>
              <div className="text-sm font-bold text-emerald-900 mt-1 tnum">
                Rp {inflowToday.toLocaleString('id-ID')}
              </div>
            </div>
            <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 text-left">
              <div className="flex items-center gap-1 text-[11px] font-semibold text-rose-800">
                <ArrowUpRight className="w-3.5 h-3.5 text-rose-600" />
                <span>Pengeluaran Hari Ini</span>
              </div>
              <div className="text-sm font-bold text-rose-900 mt-1 tnum">
                Rp {outflowToday.toLocaleString('id-ID')}
              </div>
            </div>
          </div>

          {/* Live Sync Status Banner */}
          <div className="bg-blue-900 text-white rounded-xl p-3 flex items-center justify-between text-xs">
            <div>
              <div className="font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Terkoneksi BPR Mitra Jatim</span>
              </div>
              <div className="text-[10.5px] text-blue-200">
                POJK 29/2024 Audit Trace #CN-8841
              </div>
            </div>
            <button
              onClick={handleTriggerSync}
              disabled={isSyncing}
              className="bg-blue-700 hover:bg-blue-600 px-2.5 py-1 rounded text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Sync...' : 'Sync Kas'}</span>
            </button>
          </div>

          {/* Quick Add Form or Trigger */}
          {showAddEntry ? (
            <form onSubmit={handleAddEntry} className="bg-white p-3 rounded-xl border border-blue-200 shadow-2xs space-y-2">
              <div className="text-xs font-bold text-slate-800">Catat Pembayaran Piutang Warung</div>
              <input
                type="text"
                placeholder="Nama Warung / Keterangan (e.g. Warung Mak Siti)"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:border-blue-500"
                required
              />
              <input
                type="number"
                placeholder="Nominal Kas (Rp)"
                value={newAmount}
                onChange={(e) => setNewAmount(e.target.value)}
                className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:border-blue-500"
                required
              />
              <div className="flex gap-2 pt-1">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-1.5 rounded cursor-pointer"
                >
                  Simpan &amp; Sync BPR
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddEntry(false)}
                  className="px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold py-1.5 rounded cursor-pointer"
                >
                  Batal
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setShowAddEntry(true)}
              className="w-full bg-white hover:bg-slate-50 border border-slate-300 border-dashed rounded-xl py-2 px-3 text-xs font-semibold text-blue-700 flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Catat Pembayaran Piutang Pelanggan</span>
            </button>
          )}

          {/* Recent Ledger Entries in PWA */}
          <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-2xs">
            <div className="text-xs font-bold text-slate-900 mb-2 flex items-center justify-between">
              <span>Mutasi Kas Warung Hari Ini</span>
              <span className="text-[10px] text-slate-400 font-normal">Real-time</span>
            </div>
            <div className="divide-y divide-slate-100 text-xs">
              {recentEntries.map((item) => (
                <div key={item.id} className="py-2 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-slate-800 text-[11.5px]">{item.title}</div>
                    <div className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />
                      <span>{item.time}</span>
                    </div>
                  </div>
                  <div
                    className={`font-bold text-xs tnum ${
                      item.type === 'in' ? 'text-emerald-700' : 'text-rose-600'
                    }`}
                  >
                    {item.type === 'in' ? '+' : '-'} Rp {item.amount.toLocaleString('id-ID')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="bg-slate-950 p-3 text-center border-t border-slate-800 text-[11px] text-slate-400">
          Sinkronisasi PWA otomatis memperbarui kurva SARIMA &amp; buffer solvabilitas BPR.
        </div>
      </div>
    </div>
  );
};
