import React from 'react';
import { X, MapPin, Navigation, Phone, CheckCircle2, Clock } from 'lucide-react';
import { AccountOfficer } from '../types';

interface AoRouteModalProps {
  isOpen: boolean;
  onClose: () => void;
  officers: AccountOfficer[];
}

export const AoRouteModal: React.FC<AoRouteModalProps> = ({ isOpen, onClose, officers }) => {
  if (!isOpen) return null;

  return (
    <div
      id="modal-ao-route"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150"
    >
      <div className="bg-white rounded-xl border border-slate-200 w-full max-w-[620px] shadow-2xl overflow-hidden font-sans flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <Navigation className="w-5 h-5 text-blue-600" />
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Monitoring Dispatch Rute AO Lapangan Surabaya &amp; Sekitarnya
              </h2>
              <p className="text-[11px] text-slate-500">
                Pelacakan Posisi &amp; Penugasan Pendampingan Debitur Mikro
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded hover:bg-slate-200 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto space-y-4 text-xs">
          {/* Simulated Map Visual */}
          <div className="bg-slate-900 rounded-xl p-4 text-white relative overflow-hidden h-48 flex flex-col justify-between border border-slate-800">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>
            
            <div className="flex items-center justify-between relative z-10">
              <span className="text-xs font-bold text-blue-300 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-blue-400 animate-bounce" />
                Live Dispatch Cluster: Jawa Timur (Surabaya - Sidoarjo)
              </span>
              <span className="text-[10px] bg-emerald-900/80 text-emerald-300 border border-emerald-700 px-2 py-0.5 rounded font-semibold">
                2 AO On-Duty
              </span>
            </div>

            {/* Pins on map */}
            <div className="relative z-10 flex justify-around items-center my-auto">
              <div className="text-center">
                <div className="w-8 h-8 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center font-bold text-xs mx-auto shadow-lg">
                  AH
                </div>
                <div className="text-[10px] font-bold mt-1 text-slate-200">Agus Haryanto</div>
                <div className="text-[9px] text-emerald-400">Pasar Wonokromo</div>
              </div>

              <div className="text-center">
                <div className="w-8 h-8 rounded-full bg-indigo-600 border-2 border-white flex items-center justify-center font-bold text-xs mx-auto shadow-lg">
                  SR
                </div>
                <div className="text-[10px] font-bold mt-1 text-slate-200">Siti Rahayu</div>
                <div className="text-[9px] text-emerald-400">Pasar Pabean</div>
              </div>
            </div>

            <div className="relative z-10 text-[10px] text-slate-400 flex items-center justify-between border-t border-slate-800 pt-2">
              <span>Akurasi GPS: 5 meter (Geo-Fencing Pasar Aktif)</span>
              <span>Terakhir update: 2 menit lalu</span>
            </div>
          </div>

          {/* Officers List */}
          <div className="space-y-2">
            <div className="font-bold text-slate-800 text-xs">Daftar Account Officer Terverifikasi:</div>
            {officers.map((ao) => (
              <div
                key={ao.id}
                className="p-3 border border-slate-200 rounded-lg flex items-center justify-between bg-slate-50/60"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                    {ao.initials}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-xs">{ao.name}</div>
                    <div className="text-[11px] text-slate-500">
                      Penugasan: <span className="font-semibold text-slate-700">{ao.market}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10.5px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                    {ao.status}
                  </span>
                  <div className="text-[10px] text-slate-400 mt-1 font-mono">{ao.phone}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-xs font-semibold bg-white hover:bg-slate-100 border border-slate-300 rounded cursor-pointer text-slate-700"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
