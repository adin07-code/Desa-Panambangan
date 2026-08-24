"use client";

import React, { useEffect, useState } from 'react';
import KeuanganTable from '@/components/KeuanganTable';
import { CircleDollarSign } from 'lucide-react';

export default function LaporanKeuanganPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKeuangan = async () => {
      try {
        const res = await fetch(`/api/keuangan?t=${new Date().getTime()}`, { cache: "no-store" });
        if (res.ok) {
          const result = await res.json();
          setData(result.data || []);
        }
      } catch (error) {
        console.error("Gagal mengambil data keuangan:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchKeuangan();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="flex flex-col items-start gap-4 mb-10 animate-in fade-in slide-in-from-top-4 duration-700 ease-out">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100/80 text-emerald-700 text-sm font-semibold tracking-wide border border-emerald-200">
            <CircleDollarSign className="w-4 h-4" />
            <span>Rekapitulasi Dana (Live dari Google Sheets)</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Laporan Keuangan <span className="text-[#466651]">Harian</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
            Rincian seluruh transaksi arus kas harian (pemasukan dan pengeluaran) KKM Kelompok 14 UMC di Desa Panambangan secara real-time.
          </p>
        </div>

        {/* Content Section */}
        {loading ? (
           <div className="p-16 text-center">
              <div className="w-8 h-8 border-4 border-[#466651] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-[#466651] font-semibold tracking-wider text-sm">Menghubungkan ke Google Sheets...</p>
           </div>
        ) : (
          <KeuanganTable data={data} />
        )}
      </div>
    </div>
  );
}
