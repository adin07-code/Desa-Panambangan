'use client';

import React, { useMemo } from 'react';
import { KeuanganItem } from '@/data/keuanganData';
import { TrendingDown, TrendingUp, Wallet, CheckCircle2 } from 'lucide-react';

interface KeuanganTableProps {
  data: KeuanganItem[];
}

export default function KeuanganTable({ data }: KeuanganTableProps) {
  // Calculate running balance and totals
  const { processedData, totalPemasukan, totalPengeluaran, saldoAkhir } = useMemo(() => {
    let currentSaldo = 0;
    let tPemasukan = 0;
    let tPengeluaran = 0;

    const processed = data.map(item => {
      if (item.tipe === 'Pemasukan') {
        currentSaldo += item.jumlah;
        tPemasukan += item.jumlah;
      } else {
        currentSaldo -= item.jumlah;
        tPengeluaran += item.jumlah;
      }
      return {
        ...item,
        saldo: currentSaldo
      };
    });

    return {
      processedData: processed,
      totalPemasukan: tPemasukan,
      totalPengeluaran: tPengeluaran,
      saldoAkhir: currentSaldo
    };
  }, [data]);

  // Helper to format currency
  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="w-full pb-12 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Pemasukan Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-100 flex items-center gap-5">
          <div className="bg-emerald-100 p-4 rounded-2xl text-emerald-600">
            <TrendingUp className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Total Pemasukan</p>
            <p className="text-2xl font-bold text-emerald-600">{formatRupiah(totalPemasukan)}</p>
          </div>
        </div>

        {/* Pengeluaran Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-rose-100 flex items-center gap-5">
          <div className="bg-rose-100 p-4 rounded-2xl text-rose-600">
            <TrendingDown className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Total Pengeluaran</p>
            <p className="text-2xl font-bold text-rose-600">{formatRupiah(totalPengeluaran)}</p>
          </div>
        </div>

        {/* Saldo Akhir Card */}
        <div className="bg-gradient-to-br from-[#466651] to-[#3a5643] rounded-3xl p-6 shadow-xl shadow-[#466651]/20 flex items-center gap-5 text-white border border-white/10 relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-10 transform translate-x-4 -translate-y-4">
             <Wallet className="w-24 h-24" />
          </div>
          <div className="bg-[#b2d5bb]/30 p-4 rounded-2xl text-white relative z-10">
            <Wallet className="w-8 h-8" />
          </div>
          <div className="relative z-10">
            <p className="text-sm font-semibold text-white/80 uppercase tracking-wider">Saldo Akhir</p>
            <p className="text-2xl font-extrabold">{formatRupiah(saldoAkhir)}</p>
          </div>
        </div>

      </div>

      {/* Main Ledger Table */}
      <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
        <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-5 border-b border-gray-100 flex items-center gap-3">
          <div className="bg-[#b2d5bb]/30 p-2.5 rounded-2xl text-[#466651]">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-[#466651] tracking-tight">Rincian Transaksi Harian</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-white/50 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                <th className="py-4 px-6 font-medium w-32">Tanggal</th>
                <th className="py-4 px-6 font-medium">Keterangan</th>
                <th className="py-4 px-6 font-medium text-right w-40">Pemasukan</th>
                <th className="py-4 px-6 font-medium text-right w-40">Pengeluaran</th>
                <th className="py-4 px-6 font-medium text-right w-44">Saldo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {processedData.map((item, idx) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-semibold text-gray-800">{item.tanggal}</div>
                    <div className="text-xs text-gray-500">{item.hari}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-700 font-medium">{item.keterangan}</span>
                  </td>
                  
                  {/* Pemasukan */}
                  <td className="py-4 px-6 text-right">
                    {item.tipe === 'Pemasukan' ? (
                      <span className="text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg inline-block">
                        + {formatRupiah(item.jumlah)}
                      </span>
                    ) : (
                      <span className="text-gray-300">-</span>
                    )}
                  </td>
                  
                  {/* Pengeluaran */}
                  <td className="py-4 px-6 text-right">
                    {item.tipe === 'Pengeluaran' ? (
                      <span className="text-rose-600 font-bold bg-rose-50 px-2.5 py-1 rounded-lg inline-block">
                        - {formatRupiah(item.jumlah)}
                      </span>
                    ) : (
                      <span className="text-gray-300">-</span>
                    )}
                  </td>

                  {/* Saldo */}
                  <td className="py-4 px-6 text-right">
                    <span className="font-extrabold text-[#466651]">
                      {formatRupiah(item.saldo)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
}
