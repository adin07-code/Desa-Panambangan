import React from 'react';
import { keuanganData } from '@/data/keuanganData';
import KeuanganTable from '@/components/KeuanganTable';
import { Metadata } from 'next';
import { CircleDollarSign } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Laporan Keuangan - KKM 14 UMC Desa Panambangan',
  description: 'Laporan Keuangan Harian KKM Kelompok 14 UMC Desa Panambangan.',
};

export default function LaporanKeuanganPage() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="flex flex-col items-start gap-4 mb-10 animate-in fade-in slide-in-from-top-4 duration-700 ease-out">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100/80 text-emerald-700 text-sm font-semibold tracking-wide border border-emerald-200">
            <CircleDollarSign className="w-4 h-4" />
            <span>Rekapitulasi Dana</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Laporan Keuangan <span className="text-[#466651]">Harian</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
            Rincian seluruh transaksi arus kas harian (pemasukan dan pengeluaran) KKM Kelompok 14 UMC di Desa Panambangan secara real-time.
          </p>
        </div>

        {/* Content Section */}
        <KeuanganTable data={keuanganData} />
      </div>
    </div>
  );
}
