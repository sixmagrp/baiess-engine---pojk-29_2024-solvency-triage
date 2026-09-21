import React, { useState, useMemo } from 'react';
import {
  AlertTriangle,
  Search,
  ArrowUpDown,
  FileText,
  UserPlus,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { Debtor } from '../types';

interface DebtorTableProps {
  debtors: Debtor[];
  selectedDebtor: Debtor;
  onSelectDebtor: (debtor: Debtor) => void;
  onOpenAssignAo: (debtor: Debtor) => void;
  activeZoneFilter: string | null;
}

export const DebtorTable: React.FC<DebtorTableProps> = ({
  debtors,
  selectedDebtor,
  onSelectDebtor,
  onOpenAssignAo,
  activeZoneFilter,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('ALL');
  const [selectedSector, setSelectedSector] = useState('ALL');
  const [sortByRisk, setSortByRisk] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;

  const filteredDebtors = useMemo(() => {
    return debtors
      .filter((d) => {
        // Zone filter from top cards
        if (activeZoneFilter && d.bufferStatus !== activeZoneFilter) {
          return false;
        }
        // Search query
        if (
          searchQuery &&
          !d.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !d.market.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !d.owner.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          return false;
        }
        // Region filter
        if (selectedRegion !== 'ALL' && d.city !== selectedRegion) {
          return false;
        }
        // Sector filter
        if (selectedSector !== 'ALL' && !d.sector.includes(selectedSector)) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortByRisk) {
          return b.riskScore - a.riskScore;
        }
        return a.bufferDays - b.bufferDays;
      });
  }, [debtors, activeZoneFilter, searchQuery, selectedRegion, selectedSector, sortByRisk]);

  const totalPages = Math.ceil(filteredDebtors.length / pageSize) || 1;
  const paginatedDebtors = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredDebtors.slice(start, start + pageSize);
  }, [filteredDebtors, currentPage, pageSize]);

  return (
    <section
      id="debtor-priority-intervention-section"
      className="bg-white rounded-lg border border-slate-200 shadow-2xs mb-6 overflow-hidden"
    >
      {/* Section Header */}
      <div className="p-4 border-b border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-600">
              <AlertTriangle className="w-4 h-4 text-red-600" />
            </span>
            <h2 className="text-sm font-bold text-slate-900 tracking-tight font-display">
              Daftar Debitur Prioritas Intervensi (Horizon 21–30 Hari)
            </h2>
            <span className="text-[11px] font-bold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
              3 Target Aktif Segera
            </span>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="mt-3.5 flex flex-wrap items-center gap-2.5">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              id="input-search-debtor"
              type="text"
              placeholder="Cari nama debitur / pasar..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
          </div>

          {/* Region Select */}
          <select
            id="select-filter-region"
            value={selectedRegion}
            onChange={(e) => {
              setSelectedRegion(e.target.value);
              setCurrentPage(1);
            }}
            className="text-xs bg-white border border-slate-300 rounded px-2.5 py-1.5 text-slate-700 focus:outline-none focus:border-blue-600 cursor-pointer"
          >
            <option value="ALL">Semua Wilayah (Surabaya, Sidoarjo, Gresik)</option>
            <option value="Surabaya">Surabaya</option>
            <option value="Sidoarjo">Sidoarjo</option>
            <option value="Gresik">Gresik</option>
          </select>

          {/* Sector Select */}
          <select
            id="select-filter-sector"
            value={selectedSector}
            onChange={(e) => {
              setSelectedSector(e.target.value);
              setCurrentPage(1);
            }}
            className="text-xs bg-white border border-slate-300 rounded px-2.5 py-1.5 text-slate-700 focus:outline-none focus:border-blue-600 cursor-pointer"
          >
            <option value="ALL">Semua Sektor (FMCG, Sembako, Pangan)</option>
            <option value="FMCG">FMCG Distributor</option>
            <option value="Sembako">Grosir Sembako</option>
            <option value="Pangan">Pangan Pokok</option>
          </select>

          {/* Sort Button */}
          <button
            id="btn-sort-risk"
            onClick={() => setSortByRisk(!sortByRisk)}
            className="flex items-center gap-1.5 text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 px-3 py-1.5 rounded transition-colors shadow-2xs cursor-pointer ml-auto"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
            <span>Urut Risiko Tertinggi</span>
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse font-sans">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <th className="py-2.5 px-4">IDENTITAS DEBITUR &amp; LOKASI</th>
              <th className="py-2.5 px-4">PLAFON &amp; ANGSURAN/BLN</th>
              <th className="py-2.5 px-4">KETAHANAN KAS</th>
              <th className="py-2.5 px-4 min-w-[280px]">DIAGNOSA ANOMALI DSS (SARIMA + PDP)</th>
              <th className="py-2.5 px-4">ESTIMASI KRITIS</th>
              <th className="py-2.5 px-4 text-center">AKSI INTERVENSI KOMITE</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {paginatedDebtors.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-500">
                  Tidak ada debitur yang cocok dengan kriteria filter.
                </td>
              </tr>
            ) : (
              paginatedDebtors.map((debtor) => {
                const isSelected = selectedDebtor.id === debtor.id;
                return (
                  <tr
                    key={debtor.id}
                    id={`debtor-row-${debtor.id.replace(/[^a-zA-Z0-9]/g, '')}`}
                    className={`hover:bg-slate-50/80 transition-colors ${
                      isSelected ? 'bg-blue-50/30' : ''
                    }`}
                  >
                    {/* Identitas Debitur */}
                    <td className="py-3.5 px-4 align-top">
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-9 h-9 rounded flex items-center justify-center font-bold text-xs shrink-0 border ${debtor.initialsBg}`}
                        >
                          {debtor.initials}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-slate-900 text-[13px] leading-tight hover:text-blue-600 cursor-pointer"
                              onClick={() => onSelectDebtor(debtor)}>
                              {debtor.name}
                            </span>
                            <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                              ID: {debtor.id}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1.5 flex-wrap">
                            <span>{debtor.owner}</span>
                            <span>•</span>
                            <span>{debtor.market}</span>
                            <span>•</span>
                            <span className="font-medium text-slate-600">
                              {debtor.sector}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Plafon & Angsuran */}
                    <td className="py-3.5 px-4 align-top">
                      <div className="font-bold text-slate-900 text-xs tnum">
                        Rp {debtor.plafon.toLocaleString('id-ID')}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5 tnum">
                        Angsuran:{' '}
                        <span className="font-semibold text-slate-700">
                          Rp {debtor.angsuran.toLocaleString('id-ID')}/bln
                        </span>
                      </div>
                    </td>

                    {/* Ketahanan Kas */}
                    <td className="py-3.5 px-4 align-top">
                      <div
                        className={`inline-block px-2 py-1 rounded text-center text-xs font-bold border tnum ${
                          debtor.bufferStatus === 'critical'
                            ? 'bg-red-50 text-red-700 border-red-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        Buffer {debtor.bufferDays} Hari
                      </div>
                      <div className="text-[10.5px] text-slate-500 mt-1">
                        Ambang aman: {debtor.safeDays} hari
                      </div>
                    </td>

                    {/* Diagnosa Anomali */}
                    <td className="py-3.5 px-4 align-top">
                      <p className="text-slate-700 text-xs leading-relaxed mb-1.5">
                        {debtor.diagnosa}
                      </p>
                      <div className="flex items-center gap-2 flex-wrap text-[11px]">
                        <span className="text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-emerald-600" />
                          PDP Verifikasi: {debtor.pdpCode}
                        </span>
                        <span className="text-slate-500 tnum">
                          Kas bersih:{' '}
                          <span className="font-semibold text-slate-700">
                            Rp {debtor.kasBersih.toLocaleString('id-ID')}
                          </span>
                        </span>
                      </div>
                    </td>

                    {/* Estimasi Kritis */}
                    <td className="py-3.5 px-4 align-top">
                      <div
                        className={`font-bold text-xs ${
                          debtor.bufferStatus === 'critical'
                            ? 'text-red-600'
                            : 'text-slate-900'
                        }`}
                      >
                        {debtor.estimasiKritisDate}
                      </div>
                      <div className="text-[11px] font-medium text-red-600 mt-0.5">
                        {debtor.isDueDateNote || `${debtor.estimasiKritisDays} Hari Lagi`}
                      </div>
                    </td>

                    {/* Aksi Intervensi */}
                    <td className="py-3.5 px-4 align-top text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          id={`btn-dossier-${debtor.id.replace(/[^a-zA-Z0-9]/g, '')}`}
                          onClick={() => onSelectDebtor(debtor)}
                          className="flex items-center gap-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-semibold px-2.5 py-1.5 rounded transition-colors shadow-2xs cursor-pointer"
                          title="Buka Lembar Dossier Finansial"
                        >
                          <FileText className="w-3.5 h-3.5 text-blue-600" />
                          <span>Dossier Finansial</span>
                        </button>
                        <button
                          id={`btn-tugaskan-ao-${debtor.id.replace(/[^a-zA-Z0-9]/g, '')}`}
                          onClick={() => onOpenAssignAo(debtor)}
                          className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded transition-colors shadow-2xs cursor-pointer ${
                            debtor.bufferStatus === 'critical'
                              ? 'bg-blue-600 hover:bg-blue-700 text-white'
                              : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-300'
                          }`}
                          title="Tugaskan Account Officer Lapangan"
                        >
                          <UserPlus className="w-3.5 h-3.5" />
                          <span>Tugaskan AO</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer & Pagination */}
      <div className="p-3 border-t border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-slate-500">
        <div>
          <span>Menampilkan </span>
          <span className="font-semibold text-slate-700">
            {paginatedDebtors.length}
          </span>
          <span> dari </span>
          <span className="font-semibold text-slate-700">30</span>
          <span> debitur berstatus perhatian khusus • </span>
          <span className="font-mono text-[10.5px] text-slate-400">
            POJK 29/2024 Audit Trace Hash: 7f9a88e...bpr41
          </span>
        </div>

        <div className="flex items-center gap-1 self-end sm:self-auto">
          <button
            id="btn-pagination-prev"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="px-2.5 py-1 rounded border border-slate-200 bg-white text-slate-600 text-xs disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 cursor-pointer flex items-center gap-1"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Sebelumnya</span>
          </button>

          {Array.from({ length: totalPages }).map((_, idx) => {
            const pageNum = idx + 1;
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-7 h-7 rounded text-xs font-semibold cursor-pointer ${
                  currentPage === pageNum
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            id="btn-pagination-next"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="px-2.5 py-1 rounded border border-slate-200 bg-white text-slate-600 text-xs disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 cursor-pointer flex items-center gap-1"
          >
            <span>Berikutnya</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
