'use client';

import React, { useMemo } from 'react';
import { RabItem } from '@/data/rabData';
import { Layers, FileText, Briefcase, Coffee, Home, CheckCircle2, DollarSign } from 'lucide-react';

interface RabTableProps {
  data: RabItem[];
}

export default function RabTable({ data }: RabTableProps) {
  // Group data by category
  const groupedData = useMemo(() => {
    return data.reduce((acc, item) => {
      if (!acc[item.kategori]) {
        acc[item.kategori] = [];
      }
      acc[item.kategori].push(item);
      return acc;
    }, {} as Record<string, RabItem[]>);
  }, [data]);

  // Calculate total overall
  const grandTotal = useMemo(() => {
    return data.reduce((sum, item) => sum + item.total, 0);
  }, [data]);

  // Helper to format currency
  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'Kesekretariatan': return <FileText className="w-5 h-5" />;
      case 'Program Kerja': return <Briefcase className="w-5 h-5" />;
      case 'Konsumsi': return <Coffee className="w-5 h-5" />;
      case 'Akomodasi & Transportasi': return <Home className="w-5 h-5" />;
      default: return <Layers className="w-5 h-5" />;
    }
  };

  return (
    <div className="w-full pb-12 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      
      {/* Grand Total Card */}
      <div className="bg-gradient-to-br from-[#466651] to-[#3a5643] rounded-3xl p-8 shadow-xl shadow-[#466651]/20 text-white relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between border border-white/10">
        <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-4 -translate-y-4">
          <DollarSign className="w-32 h-32" />
        </div>
        
        <div className="relative z-10 space-y-2">
          <h2 className="text-white/80 font-medium tracking-wide flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#b2d5bb]" />
            Total Rencana Anggaran Keseluruhan
          </h2>
          <div className="text-4xl md:text-5xl font-extrabold tracking-tight">
            {formatRupiah(grandTotal)}
          </div>
          <p className="text-white/70 text-sm mt-2 max-w-md">
            Estimasi total biaya yang dibutuhkan untuk seluruh kegiatan KKM Kelompok 14.
          </p>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-6">
        {Object.entries(groupedData).map(([category, items], index) => {
          const categoryTotal = items.reduce((sum, item) => sum + item.total, 0);
          
          return (
            <div 
              key={category} 
              className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Category Header */}
              <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-3 text-[#466651]">
                  <div className="bg-[#b2d5bb]/30 p-2.5 rounded-2xl">
                    {getCategoryIcon(category)}
                  </div>
                  <h3 className="text-lg font-bold tracking-tight">{category}</h3>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">Subtotal</span>
                  <span className="text-lg font-extrabold text-gray-800">{formatRupiah(categoryTotal)}</span>
                </div>
              </div>

              {/* Table wrapper for horizontal scroll on small devices */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="bg-white/50 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                      <th className="py-4 px-6 font-medium">Nama Barang</th>
                      <th className="py-4 px-6 font-medium text-right w-32">Kuantitas</th>
                      <th className="py-4 px-6 font-medium text-right w-40">Harga Satuan</th>
                      <th className="py-4 px-6 font-medium text-right w-40">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {items.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                        <td className="py-4 px-6">
                          <div className="font-semibold text-gray-800">{item.nama_barang}</div>
                          {item.keterangan && (
                            <div className="text-sm text-gray-500 mt-1 flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#466651] transition-colors"></span>
                              {item.keterangan}
                            </div>
                          )}
                        </td>
                        <td className="py-4 px-6 text-right">
                          <span className="inline-flex items-center gap-1.5 bg-gray-100 px-3 py-1 rounded-xl text-sm font-medium text-gray-700">
                            {item.jumlah} {item.satuan}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right text-gray-600 font-medium">
                          {formatRupiah(item.harga_satuan)}
                        </td>
                        <td className="py-4 px-6 text-right font-bold text-[#466651]">
                          {formatRupiah(item.total)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
      
    </div>
  );
}
