import React from 'react';
import { rabData } from '@/data/rabData';
import RabTable from '@/components/RabTable';
import { Metadata } from 'next';
import { WalletCards, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'RAB - KKM 14 UMC Desa Panambangan',
  description: 'Rencana Anggaran Biaya KKM Kelompok 14 UMC Desa Panambangan.',
};

export default function RabPage() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-start gap-4 mb-10 animate-in fade-in slide-in-from-top-4 duration-700 ease-out">
          <Link href="/" className="w-12 h-12 flex items-center justify-center bg-white border border-[#466651]/20 rounded-full shadow-md hover:bg-gray-50 hover:scale-105 transition-all shrink-0 mt-1">
            <ArrowLeft className="w-5 h-5 text-[#466651]" />
          </Link>
          <div className="flex flex-col items-start gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#b2d5bb]/30 text-[#466651] text-sm font-semibold tracking-wide">
              <WalletCards className="w-4 h-4" />
              <span>Transparansi Dana</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
              Rencana Anggaran <span className="text-[#466651]">Biaya</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
              Daftar estimasi anggaran yang dibutuhkan untuk menunjang seluruh program kerja dan kegiatan harian KKM Kelompok 14 UMC di Desa Panambangan.
            </p>
          </div>
        </div>

        {/* Content Section */}
        <RabTable data={rabData} />
      </div>
    </div>
  );
}
